"""WSGI config for the Ngwasuma backend. Used by gunicorn in production."""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ngwasuma.settings')

application = get_wsgi_application()
