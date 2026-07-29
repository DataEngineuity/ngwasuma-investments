"""
Serializers for the public lead-creation endpoints.

QuoteRequestSerializer is the interesting one: it accepts a flat "detail"
object whose shape depends on the chosen ``service``, and routes it to the
matching child table (LogisticsDetail / CarHireDetail / RealEstateDetail)
at creation time. Only the fields relevant to the selected service are
ever written — there is no row anywhere with another service's columns
sitting blank.
"""

from rest_framework import serializers

from .models import (
    CarHireDetail,
    ContactMessage,
    LogisticsDetail,
    QuoteRequest,
    RealEstateDetail,
    SERVICE_DETAIL_MAP,
)


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


# ─────────────────────────────────────────────────────────────────────
# Per-service detail serializers — field lists mirror QuoteForm.jsx's
# serviceConfigs exactly, so the frontend can send its `details` object
# through with no remapping.
# ─────────────────────────────────────────────────────────────────────
class LogisticsDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogisticsDetail
        fields = [
            'request_type',
            'origin',
            'destination',
            'cargo_type',
            'cargo_weight',
            'preferred_date',
        ]

    def to_internal_value(self, data):
        if isinstance(data, dict) and data.get('preferred_date') == '':
            data = data.copy()
            data['preferred_date'] = None
        return super().to_internal_value(data)


class CarHireDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarHireDetail
        fields = [
            'request_type',
            'vehicle_type',
            'pickup_location',
            'return_location',
            'pickup_date',
            'return_date',
            'passengers',
        ]

    def to_internal_value(self, data):
        if isinstance(data, dict):
            data = data.copy()
            for date_field in ('pickup_date', 'return_date'):
                if data.get(date_field) == '':
                    data[date_field] = None
        return super().to_internal_value(data)


class RealEstateDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealEstateDetail
        fields = [
            'request_type',
            'property_type',
            'preferred_area',
            'bedrooms',
            'budget',
            'preferred_date',
        ]

    def to_internal_value(self, data):
        if isinstance(data, dict) and data.get('preferred_date') == '':
            data = data.copy()
            data['preferred_date'] = None
        return super().to_internal_value(data)


DETAIL_SERIALIZER_MAP = {
    'Logistics': LogisticsDetailSerializer,
    'Car Hire': CarHireDetailSerializer,
    'Real Estate': RealEstateDetailSerializer,
}


class QuoteRequestSerializer(HoneypotMixin, serializers.ModelSerializer):
    # Write-only nested payload — key must match the chosen `service`.
    # e.g. service="Logistics" pairs with a `details` object shaped like
    # LogisticsDetailSerializer's fields. Optional at the field level so
    # validate() can raise a clearer error when it's missing or mismatched.
    details = serializers.DictField(required=False, write_only=True)

    class Meta:
        model = QuoteRequest
        fields = [
            'id',
            'quote_number',
            'name',
            'email',
            'phone',
            'service',
            'message',
            'details',
            'created_at',
        ]
        read_only_fields = ['id', 'quote_number', 'created_at']
        extra_kwargs = {
            'name': {'trim_whitespace': True},
            'message': {'trim_whitespace': True, 'required': False, 'allow_blank': True},
        }

    def validate(self, attrs):
        attrs = super().validate(attrs)

        service = attrs.get('service')
        detail_serializer_class = DETAIL_SERIALIZER_MAP.get(service)

        if detail_serializer_class is None:
            # "General Support" (or any future service without a detail
            # table) simply has no structured detail — that's fine, drop
            # whatever was sent under `details` and move on.
            attrs.pop('details', None)
            return attrs

        raw_details = attrs.get('details') or {}
        detail_serializer = detail_serializer_class(data=raw_details)
        detail_serializer.is_valid(raise_exception=True)

        # Stash the validated (not raw) detail data for create() to use.
        attrs['details'] = detail_serializer.validated_data
        return attrs

    def create(self, validated_data):
        details = validated_data.pop('details', None)
        service = validated_data.get('service')

        quote = QuoteRequest.objects.create(**validated_data)

        mapping = SERVICE_DETAIL_MAP.get(service)
        if mapping and details:
            _related_name, detail_model = mapping
            detail_model.objects.create(quote=quote, **details)

        return quote
