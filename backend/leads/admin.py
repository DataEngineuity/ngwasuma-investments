"""
Admin configuration for the leads app.

The admin is the team's primary interface for browsing and actioning
leads, so it's worth investing in nice list views, useful filters, and
a couple of bulk actions.
"""

from django.contrib import admin, messages

from .models import ContactMessage, QuoteRequest


# ─────────────────────────────────────────────────────────────────────
# Shared base — both lead types share most admin behaviour.
# ─────────────────────────────────────────────────────────────────────
class LeadAdminBase(admin.ModelAdmin):
    list_display = ('name', 'email', 'service', 'created_at', 'is_handled')
    list_filter = ('service', 'is_handled', 'created_at')
    search_fields = ('name', 'email', 'phone', 'message')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    list_per_page = 50
    actions = ('mark_handled', 'mark_unhandled')

    # Operational metadata is read-only — never edited, just stamped at
    # creation. Surfacing in the form lets the team see context but not
    # tamper with it.
    readonly_fields = (
        'ip_address',
        'user_agent',
        'source',
        'created_at',
        'updated_at',
    )

    @admin.action(description='Mark selected as handled')
    def mark_handled(self, request, queryset):
        updated = queryset.update(is_handled=True)
        self.message_user(
            request,
            f'Marked {updated} lead(s) as handled.',
            level=messages.SUCCESS,
        )

    @admin.action(description='Mark selected as unhandled')
    def mark_unhandled(self, request, queryset):
        updated = queryset.update(is_handled=False)
        self.message_user(
            request,
            f'Marked {updated} lead(s) as unhandled.',
            level=messages.SUCCESS,
        )


# ─────────────────────────────────────────────────────────────────────
# Contact messages
# ─────────────────────────────────────────────────────────────────────
@admin.register(ContactMessage)
class ContactMessageAdmin(LeadAdminBase):
    fieldsets = (
        ('Customer', {
            'fields': ('name', 'email', 'phone', 'service'),
        }),
        ('Message', {
            'fields': ('message',),
        }),
        ('Handling', {
            'fields': ('is_handled', 'handled_notes'),
        }),
        ('Metadata', {
            'classes': ('collapse',),
            'fields': ('source', 'ip_address', 'user_agent', 'created_at', 'updated_at'),
        }),
    )


# ─────────────────────────────────────────────────────────────────────
# Quote requests
# ─────────────────────────────────────────────────────────────────────
@admin.register(QuoteRequest)
class QuoteRequestAdmin(LeadAdminBase):
    list_display = LeadAdminBase.list_display + ('preferred_date',)
    list_filter = LeadAdminBase.list_filter + ('preferred_date',)
    search_fields = LeadAdminBase.search_fields + ('origin', 'destination', 'cargo_or_need')

    fieldsets = (
        ('Customer', {
            'fields': ('name', 'email', 'phone', 'service'),
        }),
        ('Request', {
            'fields': ('origin', 'destination', 'preferred_date', 'cargo_or_need', 'message'),
        }),
        ('Handling', {
            'fields': ('is_handled', 'handled_notes'),
        }),
        ('Metadata', {
            'classes': ('collapse',),
            'fields': ('source', 'ip_address', 'user_agent', 'created_at', 'updated_at'),
        }),
    )
