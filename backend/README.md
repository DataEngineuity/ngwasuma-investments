# Ngwasuma Investments — Backend

Django + Django REST Framework backend for the Ngwasuma Investments
website. Handles two public endpoints — contact messages and quote
requests — plus an admin interface for browsing and actioning leads.

The frontend is a separate Vite + React app and talks to this backend
over JSON. See `../frontend/src/lib/api.js` for the client side.

---

## Quick start (local dev)

Requires **Python 3.11 or newer**.

```bash
# 1. Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Set up environment variables
cp .env.example .env
#   Edit .env if you want — defaults work for local dev with SQLite.

# 4. Run migrations to create the database schema
python manage.py migrate

# 5. Create an admin user (so you can browse leads in /admin/)
python manage.py createsuperuser

# 6. Start the dev server
python manage.py runserver
```

API now serves at `http://127.0.0.1:8000/`. Verify with:

```bash
curl http://127.0.0.1:8000/healthz/
# → {"status": "ok"}
```

---

## Connecting the frontend

In the frontend project's `.env`:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_FRONTEND_ONLY=false
```

The `VITE_FRONTEND_ONLY=false` flag tells the frontend's `api.js` to
post to the real backend instead of saving submissions to localStorage.

CORS is already configured to allow `http://localhost:5173` and
`http://127.0.0.1:5173` (the Vite dev defaults). If you change the
frontend's dev port, update `CORS_ALLOWED_ORIGINS` in `.env`.

---

## API surface

| Method | Path                | Purpose                  |
| ------ | ------------------- | ------------------------ |
| POST   | `/api/contact/`     | Submit a contact message |
| POST   | `/api/quotes/`      | Submit a quote request   |
| GET    | `/healthz/`         | Health check             |
| GET    | `/admin/`           | Django admin (auth only) |

### Request bodies

**POST `/api/contact/`**

```json
{
  "name":    "Alice Banda",
  "email":   "alice@example.com",
  "phone":   "+260 770 …",
  "service": "Logistics",
  "message": "Need to ship a container from Lusaka to Ndola."
}
```

**POST `/api/quotes/`**

```json
{
  "name":           "Bashir Mwale",
  "email":          "bashir@example.com",
  "phone":          "+260 770 …",
  "service":        "Logistics",
  "origin":         "Lusaka",
  "destination":    "Dar es Salaam",
  "preferred_date": "2026-08-12",
  "cargo_or_need":  "Container, 20ft",
  "message":        "Standard dry container, no special handling."
}
```

Empty optional fields can be omitted or sent as empty strings — the
serializer handles both. `preferred_date` accepts `null` or `""`.

### Responses

* **201 Created** on success — returns the saved record.
* **400 Bad Request** on validation errors — returns `{ "field": ["message"] }`.
* **429 Too Many Requests** when the rate limit is hit.

### Anti-spam

Every form includes a hidden `website` field as a honeypot. If a bot
fills it in, the request is rejected at the serializer level. Add a
matching hidden input on the frontend forms when you're ready — bots
don't read JSX comments, so an empty hidden field labelled "website"
catches most basic scrapers.

Rate limits (anonymous, per IP):

| Throttle    | Rate       |
| ----------- | ---------- |
| `anon_burst`     | 5 per minute  |
| `anon_sustained` | 30 per hour   |

Tune in `settings.py` → `REST_FRAMEWORK['DEFAULT_THROTTLE_RATES']`.

---

## Email notifications

When a lead is created, two emails fire:

1. **To `LEAD_NOTIFICATION_EMAIL`** (default: `info@ngwasumainvestments.com`) —
   internal alert with the full payload and a link to the admin record.
2. **To the customer** — short confirmation that the message was received,
   with contact details for urgent follow-up.

In dev (`EMAIL_BACKEND=console`) both emails print to the terminal so
you can inspect them without an SMTP server. In production set
`EMAIL_BACKEND=smtp` and fill in the `EMAIL_HOST_*` variables.

---

## Running tests

```bash
python manage.py test leads
```

Tests live in `leads/tests.py`. They cover the happy path for both
endpoints plus validation and honeypot rejection. Throttling and email
sending are mocked via `override_settings`.

---

## Production deployment

A short checklist for going live. Specifics depend on the host
(Railway, Fly.io, DigitalOcean, AWS, etc.).

### 1. Set production environment variables

| Variable                  | Example value                             |
| ------------------------- | ----------------------------------------- |
| `SECRET_KEY`              | (random 50+ chars — see `.env.example`)   |
| `DEBUG`                   | `False`                                   |
| `ALLOWED_HOSTS`           | `api.ngwasumainvestments.com`             |
| `DATABASE_URL`            | `postgres://user:pass@host:5432/dbname`   |
| `CORS_ALLOWED_ORIGINS`    | `https://ngwasumainvestments.com`         |
| `EMAIL_BACKEND`           | `smtp`                                    |
| `EMAIL_HOST` / `_PORT` / `_USER` / `_PASSWORD` | (provider-specific) |
| `LEAD_NOTIFICATION_EMAIL` | `info@ngwasumainvestments.com`            |

### 2. Switch to Postgres

Uncomment `psycopg[binary]` in `requirements.txt`, reinstall, and set
`DATABASE_URL` to your Postgres connection string. Then:

```bash
python manage.py migrate
```

### 3. Collect static files

The admin and DRF browsable interface need their CSS/JS collected once
per release:

```bash
python manage.py collectstatic --noinput
```

WhiteNoise (already in middleware) serves them from `/static/` with
gzip + cache-busting hashes — no separate nginx config needed.

### 4. Serve with gunicorn

```bash
gunicorn ngwasuma.wsgi:application --bind 0.0.0.0:8000 --workers 3
```

Adjust workers based on CPU count: `(2 × cores) + 1` is the usual rule.

### 5. Verify

```bash
curl https://api.ngwasumainvestments.com/healthz/
# → {"status": "ok"}
```

Submit a test form from the live frontend and check it lands in the
admin and that the notification email arrives.

---

## Project layout

```
backend/
├── .env.example              # Template for environment variables
├── .gitignore
├── manage.py
├── requirements.txt
├── README.md
│
├── ngwasuma/                 # Django project (settings, root URLs, WSGI)
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
└── leads/                    # The lead-intake app
    ├── __init__.py
    ├── admin.py              # Admin interface for browsing leads
    ├── apps.py
    ├── emails.py             # Notification helpers
    ├── migrations/
    ├── models.py             # ContactMessage, QuoteRequest
    ├── serializers.py        # DRF serializers (incl. honeypot)
    ├── tests.py
    ├── throttling.py         # Per-IP rate limits
    ├── urls.py
    └── views.py              # CreateAPIView endpoints
```

---

## Extending it

A few obvious next steps when needed:

* **Add a `GET /api/services/` endpoint** if the frontend ever wants
  to fetch the service list dynamically. See `getServices()` in the
  frontend's `lib/api.js` — it's already wired but currently returns
  `[]` because no Django Service model exists yet.
* **Add a Property model** when real estate listings become real (with
  photos, status, lease terms, etc.).
* **Pipe notifications to Slack or WhatsApp Business** in addition to
  email — slot a new helper into `leads/emails.py` and call it from
  `perform_create`.
* **Add export-to-CSV** as an admin action for sales reporting.
