"""
Smoke tests for the public lead endpoints.

Run with:  python manage.py test leads
"""

from django.core import mail
from django.core.cache import cache
from django.test import override_settings
from rest_framework import status
from rest_framework.test import APITestCase

from .models import (
    CarHireDetail,
    ContactMessage,
    LogisticsDetail,
    QuoteNumberSequence,
    QuoteRequest,
    generate_quote_number,
)


@override_settings(
    EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
    REST_FRAMEWORK={'DEFAULT_THROTTLE_CLASSES': []},
)
class ContactEndpointTests(APITestCase):
    url = '/api/contact/'

    def setUp(self):
        # DRF throttling counters live in the cache backend, which persists
        # across tests (unlike the DB, which rolls back per test). Without
        # this, enough POSTs across the file trip the 5/min burst limit and
        # later tests fail with 429 instead of exercising real behaviour.
        cache.clear()

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

    def setUp(self):
        cache.clear()

    def test_logistics_quote_creates_matching_detail_row_only(self):
        payload = {
            'name': 'Bashir Mwale',
            'email': 'bashir@example.com',
            'phone': '+260770000002',
            'service': 'Logistics',
            'message': 'Standard dry container, no special handling.',
            'details': {
                'request_type': 'Long Haulage',
                'origin': 'Lusaka',
                'destination': 'Dar es Salaam',
                'cargo_type': 'Container, 20ft',
                'cargo_weight': '18 tonnes',
                'preferred_date': '2026-08-12',
            },
        }
        response = self.client.post(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(QuoteRequest.objects.count(), 1)

        quote = QuoteRequest.objects.first()
        self.assertTrue(LogisticsDetail.objects.filter(quote=quote).exists())
        self.assertFalse(CarHireDetail.objects.filter(quote=quote).exists())

        detail = quote.logistics_detail
        self.assertEqual(detail.origin, 'Lusaka')
        self.assertEqual(detail.cargo_weight, '18 tonnes')
        self.assertEqual(str(detail.preferred_date), '2026-08-12')

    def test_car_hire_quote_creates_only_car_hire_detail(self):
        payload = {
            'name': 'Chanda Phiri',
            'email': 'chanda@example.com',
            'phone': '+260770000003',
            'service': 'Car Hire',
            'message': 'Pickup from airport, return same location.',
            'details': {
                'request_type': 'Self Drive',
                'vehicle_type': 'SUV / 4x4',
                'pickup_location': 'Kenneth Kaunda International Airport.',
                'return_location': '',
                'pickup_date': '',
                'return_date': '2026-09-01',
                'passengers': '4',
            },
        }
        response = self.client.post(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        quote = QuoteRequest.objects.first()

        # Only the car hire row exists — no logistics row was created,
        # so there is no "blank origin/destination" sitting anywhere.
        self.assertTrue(hasattr(quote, 'car_hire_detail'))
        self.assertFalse(hasattr(quote, 'logistics_detail'))
        self.assertFalse(hasattr(quote, 'real_estate_detail'))

        # Empty-string dates were normalised to null, not rejected.
        self.assertIsNone(quote.car_hire_detail.pickup_date)
        self.assertEqual(str(quote.car_hire_detail.return_date), '2026-09-01')

    def test_quote_number_is_generated_and_returned(self):
        payload = {
            'name': 'Doreen Zulu',
            'email': 'doreen@example.com',
            'phone': '+260770000004',
            'service': 'Real Estate',
            'message': 'Looking to move in by September.',
            'details': {
                'request_type': 'Residential Leasing',
                'property_type': 'Apartment',
                'preferred_area': 'Kabulonga',
                'bedrooms': '2 Bedrooms',
                'budget': 'K8,000/month',
            },
        }
        response = self.client.post(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        quote_number = response.data['quote_number']

        # Format: NGW-<year>-<5 digit sequence>
        self.assertRegex(quote_number, r'^NGW-\d{4}-\d{5}$')

        quote = QuoteRequest.objects.get(pk=response.data['id'])
        self.assertEqual(quote.quote_number, quote_number)
        self.assertEqual(quote.real_estate_detail.preferred_area, 'Kabulonga')

    def test_quote_numbers_increment_sequentially_per_year(self):
        first = generate_quote_number()
        second = generate_quote_number()

        first_seq = int(first.split('-')[-1])
        second_seq = int(second.split('-')[-1])

        self.assertEqual(second_seq, first_seq + 1)
        self.assertEqual(QuoteNumberSequence.objects.count(), 1)

    def test_client_cannot_override_quote_number(self):
        """quote_number must be server-generated even if the client sends one."""
        payload = {
            'name': 'Spoofer',
            'email': 'spoof@example.com',
            'service': 'Logistics',
            'message': 'test',
            'quote_number': 'NGW-1999-99999',
            'details': {'origin': 'Lusaka'},
        }
        response = self.client.post(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertNotEqual(response.data['quote_number'], 'NGW-1999-99999')
        self.assertRegex(response.data['quote_number'], r'^NGW-\d{4}-\d{5}$')

    def test_missing_service_specific_field_still_creates_detail_row(self):
        """
        Detail fields are all optional at the model level (blank=True) —
        a visitor who skips a field shouldn't block the whole submission.
        """
        payload = {
            'name': 'Grace Mumba',
            'email': 'grace@example.com',
            'service': 'Logistics',
            'message': 'Not sure of exact weight yet.',
            'details': {'origin': 'Ndola', 'destination': 'Lusaka'},
        }
        response = self.client.post(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        quote = QuoteRequest.objects.first()
        self.assertEqual(quote.logistics_detail.cargo_weight, '')

    def test_general_support_has_no_detail_row(self):
        """Services without a detail table (General Support) just skip it."""
        payload = {
            'name': 'Henry Tembo',
            'email': 'henry@example.com',
            'service': 'General Support',
            'message': 'General question about your services.',
        }
        response = self.client.post(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        quote = QuoteRequest.objects.first()
        self.assertIsNone(quote.detail)
