"""
Django settings for the Ngwasuma Investments backend.

All values that change between environments (secrets, database URL, allowed
hosts, CORS origins, email config) are read from environment variables via
python-decouple. Drop a .env file in the project root for local dev; in
production these are typically set by the hosting platform.
"""

from pathlib import Path

import dj_database_url
from decouple import Csv, config

# ─────────────────────────────────────────────────────────────────────
# Paths & core
# ─────────────────────────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='dev-only-secret-do-not-use-in-prod')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=Csv())


# ─────────────────────────────────────────────────────────────────────
# Application definition
# ─────────────────────────────────────────────────────────────────────
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third party
    'rest_framework',
    'corsheaders',

    # Local
    'leads',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # WhiteNoise serves collected static files in production.
    'whitenoise.middleware.WhiteNoiseMiddleware',
    # CORS must come before CommonMiddleware to add headers to all responses.
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ngwasuma.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ngwasuma.wsgi.application'
ASGI_APPLICATION = 'ngwasuma.asgi.application'


# ─────────────────────────────────────────────────────────────────────
# Database
# ─────────────────────────────────────────────────────────────────────
# Default: SQLite for local dev. Production: set DATABASE_URL to a
# Postgres URL and uncomment psycopg in requirements.txt.
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL', default=f'sqlite:///{BASE_DIR / "db.sqlite3"}'),
        conn_max_age=600,
    ),
}


# ─────────────────────────────────────────────────────────────────────
# Password validation
# ─────────────────────────────────────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ─────────────────────────────────────────────────────────────────────
# Internationalization
# ─────────────────────────────────────────────────────────────────────
LANGUAGE_CODE = 'en-zm'
TIME_ZONE = 'Africa/Lusaka'
USE_I18N = True
USE_TZ = True


# ─────────────────────────────────────────────────────────────────────
# Static & media files
# ─────────────────────────────────────────────────────────────────────
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ─────────────────────────────────────────────────────────────────────
# Django REST Framework
# ─────────────────────────────────────────────────────────────────────
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        # BrowsableAPIRenderer is added in dev below for convenience.
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'leads.throttling.BurstAnonThrottle',
        'leads.throttling.SustainedAnonThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        # These keys are referenced by the throttle classes in leads/throttling.py.
        'anon_burst': '5/min',
        'anon_sustained': '30/hour',
    },
}

if DEBUG:
    # The browsable API is enormously helpful in development for inspecting
    # endpoints — but turn it off in production to reduce surface area.
    REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'].append(
        'rest_framework.renderers.BrowsableAPIRenderer'
    )


# ─────────────────────────────────────────────────────────────────────
# CORS
# ─────────────────────────────────────────────────────────────────────
# Only allow the configured frontend origins to call this API from a browser.
# Set CORS_ALLOWED_ORIGINS in the .env file (comma-separated).
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:5173,http://127.0.0.1:5173',
    cast=Csv(),
)

# Restricting methods to what the frontend actually uses keeps the surface tight.
CORS_ALLOW_METHODS = ['GET', 'POST', 'OPTIONS']


# ─────────────────────────────────────────────────────────────────────
# Email
# ─────────────────────────────────────────────────────────────────────
# In dev (EMAIL_BACKEND=console) emails print to stdout instead of being
# sent — handy for inspecting payloads without spamming inboxes. In
# production set EMAIL_BACKEND=smtp and fill in the EMAIL_HOST_* values.
_email_choice = config('EMAIL_BACKEND', default='console').lower()
if _email_choice == 'smtp':
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
else:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

EMAIL_HOST = config('EMAIL_HOST', default='')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')

DEFAULT_FROM_EMAIL = config(
    'DEFAULT_FROM_EMAIL',
    default='Ngwasuma Investments <no-reply@ngwasumainvestments.com>',
)

# Where to send notifications when a new lead arrives. Defaults to info@.
LEAD_NOTIFICATION_EMAIL = config(
    'LEAD_NOTIFICATION_EMAIL',
    default='info@ngwasumainvestments.com',
)


# ─────────────────────────────────────────────────────────────────────
# Security hardening for production
# ─────────────────────────────────────────────────────────────────────
# These only kick in when DEBUG is False. Locally they'd break dev over http.
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 60 * 60 * 24 * 30  # 30 days
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'
    X_FRAME_OPTIONS = 'DENY'
