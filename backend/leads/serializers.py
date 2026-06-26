"""
Serializers for the public lead-creation endpoints.

These are deliberately strict about which fields the client may write.
Server-side metadata (IP, user agent, source, handled state) is set in
the view from request data, never trusted from the JSON body.

A honeypot field named ``website`` is checked on both serializers.
Bots tend to fill in every visible field; humans see nothing because
the frontend never renders it. If a submission arrives with this field
populated, we reject it silently as spam.
"""

from rest_framework import serializers

from .models import ContactMessage, QuoteRequest


class HoneypotMixin:
    """
    Reject submissions where the hidden ``website`` field is filled in.

    The field is *not* declared as a serializer field — we don't want
    DRF to surface it in browsable API output or echo it back in error
    responses. We just inspect ``initial_data`` directly during
    validation, which is where the raw incoming payload lives.
    """

    def validate(self, attrs):
        attrs = super().validate(attrs)
        honeypot = (self.initial_data or {}).get('website', '')
        if honeypot and str(honeypot).strip():
            raise serializers.ValidationError('Invalid submission.')
        return attrs


class ContactMessageSerializer(HoneypotMixin, serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            'id',
            'name',
            'email',
            'phone',
            'service',
            'message',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
        extra_kwargs = {
            'name': {'trim_whitespace': True},
            'message': {'trim_whitespace': True},
        }


class QuoteRequestSerializer(HoneypotMixin, serializers.ModelSerializer):
    # Accept null for preferred_date because the frontend may send '' or
    # nothing at all when the user hasn't picked a date.
    preferred_date = serializers.DateField(required=False, allow_null=True)

    class Meta:
        model = QuoteRequest
        fields = [
            'id',
            'name',
            'email',
            'phone',
            'service',
            'origin',
            'destination',
            'preferred_date',
            'cargo_or_need',
            'message',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
        extra_kwargs = {
            'name': {'trim_whitespace': True},
            'message': {'trim_whitespace': True, 'required': False, 'allow_blank': True},
            'phone': {'required': False, 'allow_blank': True},
            'origin': {'required': False, 'allow_blank': True},
            'destination': {'required': False, 'allow_blank': True},
            'cargo_or_need': {'required': False, 'allow_blank': True},
        }

    def to_internal_value(self, data):
        # The frontend sends preferred_date as '' when empty, but DRF
        # wants a real null. Normalise before the field validator runs.
        if isinstance(data, dict) and data.get('preferred_date') == '':
            data = data.copy()
            data['preferred_date'] = None
        return super().to_internal_value(data)
