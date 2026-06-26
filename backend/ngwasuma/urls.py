"""URL configuration for the Ngwasuma backend."""

from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def health(_request):
    """Lightweight health check endpoint for uptime monitoring."""
    return JsonResponse({'status': 'ok'})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('healthz/', health, name='health'),

    # All public API endpoints live under /api/.
    path('api/', include('leads.urls')),
]


# Admin site branding — appears in the admin header and browser title.
admin.site.site_header = 'Ngwasuma Investments — Admin'
admin.site.site_title = 'Ngwasuma Admin'
admin.site.index_title = 'Operations dashboard'
