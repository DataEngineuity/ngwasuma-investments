"""
Author: Data Engineuity
Models Module
"""

from django.conf import settings
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SiteSettings(TimeStampedModel):
    company_name = models.CharField(max_length=120)
    tagline = models.CharField(max_length=220)
    primary_email = models.EmailField()
    primary_phone = models.CharField(max_length=40)
    head_office = models.CharField(max_length=120)
    hero_eyebrow = models.CharField(max_length=80)
    hero_title = models.CharField(max_length=180)
    hero_description = models.TextField()
    mission = models.TextField(blank=True)

    def __str__(self):
        return self.company_name


class Page(TimeStampedModel):
    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    hero_title = models.CharField(max_length=180)
    hero_text = models.TextField()
    body = models.TextField()
    cta_text = models.CharField(max_length=120, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)

    def __str__(self):
        return self.title


class Service(TimeStampedModel):
    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    summary = models.CharField(max_length=220)
    body = models.TextField()
    is_featured = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'title']

    def __str__(self):
        return self.title


class Article(TimeStampedModel):
    title = models.CharField(max_length=180)
    slug = models.SlugField(unique=True)
    excerpt = models.CharField(max_length=260)
    body = models.TextField()
    category = models.CharField(max_length=80)
    published_at = models.DateField()
    is_featured = models.BooleanField(default=False)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="articles",
    )
    class Meta:
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title


class LeadFormSubmission(TimeStampedModel):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    company_name = models.CharField(max_length=150, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    consent_given = models.BooleanField(default=False)

    class LeadStatus(models.TextChoices):
        CLOSED = "closed", "Closed"
        SPAM = "spam", "Spam"
        NEW = "new", "New"
        CONTACTED = "contacted", "Contacted"

    status = models.CharField(
        max_length=30,
        default="new"
    )

    class Meta:
        ordering = ['-created_at']

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def submitted_at(self):
        return self.created_at
