"""
Database models for incoming leads.

  * ``ContactMessage`` — short general enquiries from the contact page.
  * ``QuoteRequest``   — the parent record for a structured quote request.
    Holds only fields common to every service (contact details, quote
    number, free-text notes).
  * ``LogisticsDetail`` / ``CarHireDetail`` / ``RealEstateDetail`` — one
    of these attaches to a QuoteRequest via a one-to-one link, holding
    only the fields relevant to *that* service. A logistics request never
    has vehicle-type or bedroom columns; a car hire request never has
    cargo-weight or budget columns. Each table's fields mirror the
    per-service ``fields`` arrays in the frontend's QuoteForm.jsx
    ``serviceConfigs`` object exactly, so the mapping is 1:1 and requires
    no runtime guessing about which frontend field means what.

``ContactMessage`` and ``QuoteRequest`` share a small abstract base class
providing operational metadata (IP, user agent, source page, handled
state) — see LeadBase below. This is a Python-level convenience only;
it does not create a shared database table, so ContactMessage and
QuoteRequest remain two independent tables with no foreign key between
them.
"""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models, transaction
from django.utils import timezone


# ─────────────────────────────────────────────────────────────────────
# Service choices — kept in code rather than a lookup table because they
# rarely change and need to match the frontend dropdowns exactly. If
# this list grows beyond a handful, promote to a Service model.
# ─────────────────────────────────────────────────────────────────────
SERVICE_CHOICES = [
    ('Logistics', 'Logistics'),
    ('Car Hire', 'Car Hire'),
    ('Real Estate', 'Real Estate'),
    ('General Support', 'General Support'),
]


class LeadBase(models.Model):
    """Abstract base for any inbound lead. Holds shared operational metadata."""

    # ── What the visitor sent ────────────────────────────────────────
    name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    service = models.CharField(max_length=80, choices=SERVICE_CHOICES)
    message = models.TextField()

    # ── Operational metadata (set server-side, not by the client) ────
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=512, blank=True)
    source = models.CharField(
        max_length=120,
        blank=True,
        help_text='Page or component that originated this lead (e.g. /services/logistics).',
    )

    # ── Workflow state for the team ──────────────────────────────────
    is_handled = models.BooleanField(
        default=False,
        help_text='Tick once a team member has responded to or actioned this lead.',
    )
    handled_notes = models.TextField(
        blank=True,
        help_text='Internal notes — outcome of follow-up, next steps, etc. Not visible to the customer.',
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} · {self.service} · {self.created_at:%Y-%m-%d}'


class ContactMessage(LeadBase):
    """A general enquiry submitted via the Contact form."""

    class Meta(LeadBase.Meta):
        verbose_name = 'contact message'
        verbose_name_plural = 'contact messages'


class QuoteNumberSequence(models.Model):
    """
    Backs the atomic generation of human-facing quote numbers, one counter
    per calendar year (e.g. NGW-2026-00001, NGW-2026-00002, ... resetting
    to 00001 when the year rolls over).

    This is a separate table — rather than counting existing QuoteRequest
    rows — so that two requests arriving in the same instant can't race
    each other into computing the same number. See generate_quote_number()
    below, which locks a row here for the duration of the increment.
    """

    year = models.PositiveIntegerField(unique=True)
    last_number = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'quote number sequence'
        verbose_name_plural = 'quote number sequences'

    def __str__(self):
        return f'{self.year} → last issued: {self.last_number:05d}'


def generate_quote_number():
    """
    Atomically reserve and return the next quote number for the current
    year, formatted as NGW-{year}-{5-digit sequence}, e.g. NGW-2026-00042.

    select_for_update() locks the sequence row for this year until the
    surrounding transaction commits, so concurrent requests are serialised
    at the database level rather than racing in application code.
    """
    year = timezone.now().year
    with transaction.atomic():
        sequence, _ = (
            QuoteNumberSequence.objects.select_for_update().get_or_create(year=year)
        )
        sequence.last_number += 1
        sequence.save(update_fields=['last_number'])
        return f'NGW-{year}-{sequence.last_number:05d}'


class QuoteRequest(LeadBase):
    """
    Parent record for a structured quote request. Holds only fields that
    apply regardless of service — everything service-specific lives on
    the matching LogisticsDetail / CarHireDetail / RealEstateDetail row,
    linked one-to-one below.
    """

    # Human-facing reference code, e.g. NGW-2026-00042. Generated server-side
    # on first save — never accepted from the client. Safe to give to a
    # customer over the phone or in an email subject line.
    quote_number = models.CharField(
        max_length=32,
        unique=True,
        editable=False,
        blank=True,
        db_index=True,
        help_text='Auto-generated reference code, e.g. NGW-2026-00042.',
    )

    class Meta(LeadBase.Meta):
        verbose_name = 'quote request'
        verbose_name_plural = 'quote requests'

    def save(self, *args, **kwargs):
        if not self.quote_number:
            self.quote_number = generate_quote_number()
        super().save(*args, **kwargs)

    @property
    def detail(self):
        """
        Return whichever service-specific detail row belongs to this quote
        (or None if it hasn't been attached — shouldn't happen in practice
        since the serializer always creates one alongside the parent).
        Convenience accessor for admin/templates so callers don't need to
        know which of the three reverse relations to check.
        """
        for related_name in ('logistics_detail', 'car_hire_detail', 'real_estate_detail'):
            try:
                return getattr(self, related_name)
            except ObjectDoesNotExist:
                continue
        return None


class ServiceDetailBase(models.Model):
    """
    Abstract base for the three per-service detail tables. Each concrete
    subclass links back to its QuoteRequest via a required OneToOneField
    (declared on each subclass individually, so the ``related_name`` can
    differ per service — see below).
    """

    request_type = models.CharField(
        max_length=80,
        blank=True,
        help_text='Sub-category the visitor selected, e.g. "Long Haulage", "Self Drive".',
    )

    class Meta:
        abstract = True

    def __str__(self):
        return f'{self._meta.verbose_name} for {self.quote.quote_number}'


class LogisticsDetail(ServiceDetailBase):
    """Fields specific to a Logistics quote request. Mirrors serviceConfigs.Logistics.fields in QuoteForm.jsx."""

    quote = models.OneToOneField(
        QuoteRequest, on_delete=models.CASCADE, related_name='logistics_detail'
    )
    origin = models.CharField(max_length=180, blank=True)
    destination = models.CharField(max_length=180, blank=True)
    cargo_type = models.CharField(max_length=180, blank=True)
    cargo_weight = models.CharField(
        max_length=80,
        blank=True,
        help_text='Free-text estimate, e.g. "2 tonnes", "500kg", "unknown".',
    )
    preferred_date = models.DateField(null=True, blank=True, help_text='Preferred pickup date.')

    class Meta:
        verbose_name = 'logistics detail'
        verbose_name_plural = 'logistics details'


class CarHireDetail(ServiceDetailBase):
    """Fields specific to a Car Hire quote request. Mirrors serviceConfigs['Car Hire'].fields in QuoteForm.jsx."""

    quote = models.OneToOneField(
        QuoteRequest, on_delete=models.CASCADE, related_name='car_hire_detail'
    )
    vehicle_type = models.CharField(max_length=120, blank=True)
    pickup_location = models.CharField(max_length=180, blank=True)
    return_location = models.CharField(max_length=180, blank=True)
    pickup_date = models.DateField(null=True, blank=True)
    return_date = models.DateField(null=True, blank=True)
    passengers = models.CharField(
        max_length=80,
        blank=True,
        help_text='Free-text count, e.g. "1", "4", "12", "staff team".',
    )

    class Meta:
        verbose_name = 'car hire detail'
        verbose_name_plural = 'car hire details'


class RealEstateDetail(ServiceDetailBase):
    """Fields specific to a Real Estate quote request. Mirrors serviceConfigs['Real Estate'].fields in QuoteForm.jsx."""

    quote = models.OneToOneField(
        QuoteRequest, on_delete=models.CASCADE, related_name='real_estate_detail'
    )
    property_type = models.CharField(max_length=120, blank=True)
    preferred_area = models.CharField(max_length=180, blank=True)
    bedrooms = models.CharField(max_length=40, blank=True)
    budget = models.CharField(
        max_length=80,
        blank=True,
        help_text='Free-text budget, e.g. "K8,000/month".',
    )
    preferred_date = models.DateField(null=True, blank=True, help_text='Preferred viewing date.')

    class Meta:
        verbose_name = 'real estate detail'
        verbose_name_plural = 'real estate details'


# Maps the SERVICE_CHOICES value to (related_name, model class) — used by
# the serializer to pick which child table to write into, and by the
# QuoteRequest.detail property above to look it up on read.
SERVICE_DETAIL_MAP = {
    'Logistics': ('logistics_detail', LogisticsDetail),
    'Car Hire': ('car_hire_detail', CarHireDetail),
    'Real Estate': ('real_estate_detail', RealEstateDetail),
}
