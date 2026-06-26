"""Public API URL routes for the leads app."""

from django.urls import path

from .views import ContactMessageCreateView, QuoteRequestCreateView

urlpatterns = [
    path('contact/', ContactMessageCreateView.as_view(), name='contact-create'),
    path('quotes/', QuoteRequestCreateView.as_view(), name='quote-create'),
]
