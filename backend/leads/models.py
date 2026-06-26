"""
Database models for incoming leads.

Two models, one per form on the marketing site:

  * ``ContactMessage`` — short general enquiries from the contact page.
  * ``QuoteRequest``   — detailed quote requests from the /quote page or
    one of the service-specific QuoteCTA buttons.

Both share a small base class providing operational metadata that's
useful in admin (IP, user agent, source page, handled state, internal
notes) and a created/updated timestamp pair.
"""

from django.db import models


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


class QuoteRequest(LeadBase):
    """A structured quote request with optional routing/timing fields."""

    # The QuoteForm collapses many service-specific fields into this flat
    # shape. See lib/api.js and components/QuoteForm.jsx on the frontend
    # for how each per-service field maps in.
    origin = models.CharField(max_length=180, blank=True)
    destination = models.CharField(max_length=180, blank=True)
    preferred_date = models.DateField(null=True, blank=True)
    cargo_or_need = models.CharField(
        max_length=240,
        blank=True,
        help_text='Cargo description, vehicle type, property type — whatever the visitor selected.',
    )

    class Meta(LeadBase.Meta):
        verbose_name = 'quote request'
        verbose_name_plural = 'quote requests'
