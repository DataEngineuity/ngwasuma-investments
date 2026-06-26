"""
Email notifications fired when a new lead arrives.

Each helper sends two messages:

  1. **Business notification** — alerts the team that there's a new lead,
     with full details for follow-up.
  2. **Customer confirmation** — reassures the submitter their message
     was received and tells them when to expect a reply.

Failures are logged but never raise — we don't want a transient SMTP
problem to surface as a 500 to the user. The lead is already saved.
"""

import logging

from django.conf import settings
from django.core.mail import EmailMessage

logger = logging.getLogger(__name__)


# ─────────────────────────────────────────────────────────────────────
# Public API — called from views.py after a successful create.
# ─────────────────────────────────────────────────────────────────────
def send_contact_notifications(contact):
    """Notify the team and confirm receipt to the customer."""
    _safe_send(
        _build_business_email(
            subject=f'New contact message — {contact.service}',
            body=_contact_business_body(contact),
        )
    )
    _safe_send(
        _build_customer_email(
            to=contact.email,
            subject='We received your message — Ngwasuma Investments',
            body=_customer_confirmation_body(
                name=contact.name,
                summary=f'your {contact.service.lower()} enquiry',
            ),
        )
    )


def send_quote_notifications(quote):
    """Notify the team and confirm receipt to the customer."""
    _safe_send(
        _build_business_email(
            subject=f'New quote request — {quote.service}',
            body=_quote_business_body(quote),
        )
    )
    _safe_send(
        _build_customer_email(
            to=quote.email,
            subject='We received your quote request — Ngwasuma Investments',
            body=_customer_confirmation_body(
                name=quote.name,
                summary=f'your {quote.service.lower()} quote request',
            ),
        )
    )


# ─────────────────────────────────────────────────────────────────────
# Internals
# ─────────────────────────────────────────────────────────────────────
def _build_business_email(subject, body):
    return EmailMessage(
        subject=subject,
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[settings.LEAD_NOTIFICATION_EMAIL],
    )


def _build_customer_email(to, subject, body):
    return EmailMessage(
        subject=subject,
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[to],
        # Reply-to is the business inbox so the customer's reply lands
        # somewhere a human reads.
        reply_to=[settings.LEAD_NOTIFICATION_EMAIL],
    )


def _safe_send(email):
    try:
        email.send(fail_silently=False)
    except Exception:
        logger.exception('Failed to send notification email (subject=%r)', email.subject)


def _contact_business_body(contact):
    lines = [
        'A new contact message was submitted on the website.',
        '',
        f'Name:    {contact.name}',
        f'Email:   {contact.email}',
        f'Phone:   {contact.phone or "—"}',
        f'Service: {contact.service}',
        '',
        'Message:',
        contact.message or '—',
        '',
        '── Metadata ─────────────────',
        f'Source:     {contact.source or "—"}',
        f'IP:         {contact.ip_address or "—"}',
        f'User agent: {contact.user_agent or "—"}',
        f'Submitted:  {contact.created_at:%Y-%m-%d %H:%M %Z}',
        '',
        f'View in admin: /admin/leads/contactmessage/{contact.pk}/change/',
    ]
    return '\n'.join(lines)


def _quote_business_body(quote):
    lines = [
        'A new quote request was submitted on the website.',
        '',
        f'Name:           {quote.name}',
        f'Email:          {quote.email}',
        f'Phone:          {quote.phone or "—"}',
        f'Service:        {quote.service}',
        f'Origin:         {quote.origin or "—"}',
        f'Destination:    {quote.destination or "—"}',
        f'Preferred date: {quote.preferred_date or "—"}',
        f'Cargo / need:   {quote.cargo_or_need or "—"}',
        '',
        'Details / message:',
        quote.message or '—',
        '',
        '── Metadata ─────────────────',
        f'Source:     {quote.source or "—"}',
        f'IP:         {quote.ip_address or "—"}',
        f'User agent: {quote.user_agent or "—"}',
        f'Submitted:  {quote.created_at:%Y-%m-%d %H:%M %Z}',
        '',
        f'View in admin: /admin/leads/quoterequest/{quote.pk}/change/',
    ]
    return '\n'.join(lines)


def _customer_confirmation_body(name, summary):
    return (
        f'Hi {name},\n\n'
        f'Thank you for getting in touch with Ngwasuma Investments. '
        f'We have received {summary} and a member of our team will be in '
        f'touch within one business day.\n\n'
        f'If your enquiry is urgent, you can also reach us directly:\n'
        f'  Phone: +260 770 5151 96\n'
        f'  Email: {settings.LEAD_NOTIFICATION_EMAIL}\n\n'
        f'— The Ngwasuma Investments team\n'
        f'Plot #1613, Off Chipandwe Road, Ibex Meanwood, Lusaka\n'
    )
