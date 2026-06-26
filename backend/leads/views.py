"""
Public API endpoints. Both are create-only — leads are written but never
read or listed via the public API. To browse/edit, use the Django admin.
"""

from rest_framework import generics
from rest_framework.permissions import AllowAny

from .emails import send_contact_notifications, send_quote_notifications
from .models import ContactMessage, QuoteRequest
from .serializers import ContactMessageSerializer, QuoteRequestSerializer


# ─────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────
def _client_ip(request):
    """Best-effort client IP extraction, respecting reverse-proxy headers."""
    forwarded = request.META.get('HTTP_X_FORWARDED_FOR', '')
    if forwarded:
        # The header may contain multiple IPs (client, proxy1, proxy2…).
        # The first entry is the original client.
        return forwarded.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR') or None


def _client_metadata(request):
    """Return the operational fields we want to stamp on every lead."""
    return {
        'ip_address': _client_ip(request),
        'user_agent': (request.META.get('HTTP_USER_AGENT') or '')[:512],
        # Optional ``source`` field — the frontend can pass this in the
        # body to record which page the user came from. We honour it if
        # present but never trust it for security decisions.
        'source': (request.data.get('source') or '')[:120] if hasattr(request, 'data') else '',
    }


# ─────────────────────────────────────────────────────────────────────
# Endpoints
# ─────────────────────────────────────────────────────────────────────
class ContactMessageCreateView(generics.CreateAPIView):
    """POST /api/contact/  — create a contact message."""

    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        instance = serializer.save(**_client_metadata(self.request))
        send_contact_notifications(instance)


class QuoteRequestCreateView(generics.CreateAPIView):
    """POST /api/quotes/  — create a quote request."""

    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        instance = serializer.save(**_client_metadata(self.request))
        send_quote_notifications(instance)
