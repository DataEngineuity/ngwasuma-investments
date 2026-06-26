"""ASGI config for the Ngwasuma backend."""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ngwasuma.settings')

application = get_asgi_application()
