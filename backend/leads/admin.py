"""
Admin configuration for the leads app.

The admin is the team's primary interface for browsing and actioning
leads, so it's worth investing in nice list views, useful filters, and
a couple of bulk actions.
"""

from django.contrib import admin, messages

from .models import (
    CarHireDetail,
    ContactMessage,
    LogisticsDetail,
    QuoteNumberSequence,
    QuoteRequest,
    RealEstateDetail,
)


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
# Quote number sequence — read-only visibility for auditing. The team
# never edits this directly; it's maintained by generate_quote_number().
# ─────────────────────────────────────────────────────────────────────
@admin.register(QuoteNumberSequence)
class QuoteNumberSequenceAdmin(admin.ModelAdmin):
    list_display = ('year', 'last_number')
    ordering = ('-year',)

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


# ─────────────────────────────────────────────────────────────────────
# Quote requests
# ─────────────────────────────────────────────────────────────────────
class LogisticsDetailInline(admin.StackedInline):
    model = LogisticsDetail
    can_delete = False
    extra = 1
    max_num = 1


class CarHireDetailInline(admin.StackedInline):
    model = CarHireDetail
    can_delete = False
    extra = 1
    max_num = 1


class RealEstateDetailInline(admin.StackedInline):
    model = RealEstateDetail
    can_delete = False
    extra = 1
    max_num = 1


_INLINE_BY_SERVICE = {
    'Logistics': LogisticsDetailInline,
    'Car Hire': CarHireDetailInline,
    'Real Estate': RealEstateDetailInline,
}


@admin.register(QuoteRequest)
class QuoteRequestAdmin(LeadAdminBase):
    list_display = ('quote_number',) + LeadAdminBase.list_display
    list_display_links = ('quote_number',)
    search_fields = ('quote_number',) + LeadAdminBase.search_fields
    readonly_fields = LeadAdminBase.readonly_fields + ('quote_number',)

    fieldsets = (
        ('Reference', {
            'fields': ('quote_number',),
        }),
        ('Customer', {
            'fields': ('name', 'email', 'phone', 'service'),
        }),
        ('Additional notes', {
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

    def get_inline_instances(self, request, obj=None):
        """
        Show only the detail inline matching this quote's service — a
        Logistics request never displays empty Car Hire or Real Estate
        fields, in admin or anywhere else. New (unsaved) objects get no
        inline at all, since the service hasn't been chosen yet.
        """
        if obj is None:
            return []
        inline_class = _INLINE_BY_SERVICE.get(obj.service)
        if inline_class is None:
            return []
        return [inline_class(self.model, self.admin_site)]
