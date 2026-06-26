"""
Smoke tests for the public lead endpoints.

Run with:  python manage.py test leads
"""

from django.core import mail
from django.test import override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import ContactMessage, QuoteRequest


@override_settings(
    EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
    REST_FRAMEWORK={'DEFAULT_THROTTLE_CLASSES': []},
)
class ContactEndpointTests(APITestCase):
    url = '/api/contact/'

    def test_valid_submission_creates_record_and_sends_emails(self):
        payload = {
            'name': 'Alice Banda',
            'email': 'alice@example.com',
            'phone': '+260770000001',
            'service': 'Logistics',
            'message': 'Need to ship 2 tonnes from Lusaka to Ndola next Friday.',
        }
        response = self.client.post(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)

        # One email to the business, one confirmation to the customer.
        self.assertEqual(len(mail.outbox), 2)
        recipients = {addr for msg in mail.outbox for addr in msg.to}
        self.assertIn('alice@example.com', recipients)

    def test_missing_required_fields_returns_400(self):
        response = self.client.post(self.url, {'email': 'a@b.com'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_honeypot_rejects_spam(self):
        payload = {
            'name': 'Bot McSpam',
            'email': 'bot@example.com',
            'service': 'Logistics',
            'message': 'definitely real human',
            'website': 'http://spammer.example/',  # bots fill this in
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ContactMessage.objects.count(), 0)


@override_settings(
    EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
    REST_FRAMEWORK={'DEFAULT_THROTTLE_CLASSES': []},
)
class QuoteEndpointTests(APITestCase):
    url = '/api/quotes/'

    def test_full_quote_payload_creates_record(self):
        payload = {
            'name': 'Bashir Mwale',
            'email': 'bashir@example.com',
            'phone': '+260770000002',
            'service': 'Logistics',
            'origin': 'Lusaka',
            'destination': 'Dar es Salaam',
            'preferred_date': '2026-08-12',
            'cargo_or_need': 'Container, 20ft',
            'message': 'Standard dry container, no special handling.',
        }
        response = self.client.post(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(QuoteRequest.objects.count(), 1)

        quote = QuoteRequest.objects.first()
        self.assertEqual(quote.origin, 'Lusaka')
        self.assertEqual(str(quote.preferred_date), '2026-08-12')

    def test_empty_preferred_date_is_accepted(self):
        """Frontend sends '' for blank dates — must not be rejected."""
        payload = {
            'name': 'Chanda Phiri',
            'email': 'chanda@example.com',
            'phone': '+260770000003',
            'service': 'Car Hire',
            'origin': '',
            'destination': '',
            'preferred_date': '',
            'cargo_or_need': 'Executive sedan, 3 days',
            'message': 'Pickup from airport, return same location.',
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIsNone(QuoteRequest.objects.first().preferred_date)
