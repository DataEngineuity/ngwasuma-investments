# Suggested Django REST Framework API

These snippets show one straightforward way to connect the frontend forms to Django REST Framework. Adjust app names and email handling to match your backend.

## Models

```python
from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    service = models.CharField(max_length=80)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service}"

class QuoteRequest(models.Model):
    name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    service = models.CharField(max_length=80)
    origin = models.CharField(max_length=180, blank=True)
    destination = models.CharField(max_length=180, blank=True)
    preferred_date = models.DateField(null=True, blank=True)
    cargo_or_need = models.CharField(max_length=240, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service}"
```

## Serializers

```python
from rest_framework import serializers
from .models import ContactMessage, QuoteRequest

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"
        read_only_fields = ["created_at"]

class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = "__all__"
        read_only_fields = ["created_at"]
```

## Views

```python
from rest_framework import generics
from .models import ContactMessage, QuoteRequest
from .serializers import ContactMessageSerializer, QuoteRequestSerializer

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class QuoteRequestCreateView(generics.CreateAPIView):
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer
```

## URLs

```python
from django.urls import path
from .views import ContactMessageCreateView, QuoteRequestCreateView

urlpatterns = [
    path("api/contact/", ContactMessageCreateView.as_view(), name="contact-create"),
    path("api/quotes/", QuoteRequestCreateView.as_view(), name="quote-create"),
]
```

## Pre-footer Lead Capture

The contextual pre-footer CTA posts into the same quote endpoint as a lightweight lead request. It sends the standard `QuoteRequest` shape with optional routing fields left blank and `cargo_or_need` set to the selected service context. This keeps the frontend simple while allowing the backend/admin team to treat every CTA submission as a sales or operations lead.

Example payload:

```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "+260 ...",
  "service": "Car Hire",
  "origin": "",
  "destination": "",
  "preferred_date": "",
  "cargo_or_need": "Car Hire lead request",
  "message": "Need an executive SUV from Friday to Sunday."
}
```
