from rest_framework import serializers
from .models import Article, Page, Service, SiteSettings, LeadFormSubmission


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class LeadSerializer(serializers.ModelSerializer):
    submitted_at = serializers.DateTimeField(source="created_at", read_only=True)

    class Meta:
        model = LeadFormSubmission
        fields = [
            "id",
            "first_name",
            "last_name",
            "company_name",
            "email",
            "phone",
            "subject",
            "message",
            "consent_given",
            "status",
            "submitted_at",
        ]

    def validate(self, attrs):
        if not attrs.get('consent_given'):
            raise serializers.ValidationError('Consent is required before submitting the form.')
        return attrs
