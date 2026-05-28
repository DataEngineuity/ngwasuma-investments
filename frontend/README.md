# Ngwasuma Investments - React Vite Frontend

A professionally designed React + Vite + Tailwind CSS frontend for Ngwasuma Investments. The app is built as the public website and client-side entry point for a Django / Django REST Framework backend.

## Features

- Vite React single page app with React Router
- Tailwind CSS design system using the Ngwasuma dark green and lime brand palette
- Page-level embedded JSX/HTML for:
  - Home
  - Services
  - Logistics
  - Real Estate
  - Car Hire
  - About Us
  - Contact
  - Get a Quote
- Optimized image assets extracted from the provided website design document
- Contact form posting to `/api/contact/`
- Quote form posting to `/api/quotes/`
- Context-aware pre-footer lead capture CTAs for logistics, car hire, real estate and general support
- Footer Follow Us social media section with configurable social URLs
- API base URL configured through `VITE_API_BASE_URL`
- Responsive navigation, hero sections, service cards, metrics, CTA blocks and footer

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

Open the local Vite URL shown in your terminal, usually:

```bash
http://localhost:5173
```

## Environment

Create `.env` from `.env.example`:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_FACEBOOK_URL=
VITE_LINKEDIN_URL=
VITE_X_URL=
VITE_INSTAGRAM_URL=
```

In production, point it at your deployed Django API domain:

```bash
VITE_API_BASE_URL=https://api.ngwasumainvestments.com
```


## Social Media Links

The footer includes a Follow Us section for Facebook, LinkedIn, X and Instagram. Add the verified URLs to `.env` before deployment:

```bash
VITE_FACEBOOK_URL=https://facebook.com/your-page
VITE_LINKEDIN_URL=https://linkedin.com/company/your-company
VITE_X_URL=https://x.com/your-handle
VITE_INSTAGRAM_URL=https://instagram.com/your-handle
```

If a URL is left blank, the icon remains visible but disabled so the layout is implemented without sending users to incorrect accounts.

## Django API Contract

The frontend expects these JSON endpoints:

### Contact

`POST /api/contact/`

```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "+260 ...",
  "service": "Logistics",
  "message": "Message details"
}
```

### Quote and pre-footer lead capture

`POST /api/quotes/`

```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "+260 ...",
  "service": "Car Hire",
  "origin": "Lusaka",
  "destination": "Ndola",
  "preferred_date": "2026-06-01",
  "cargo_or_need": "Executive SUV for two days",
  "message": "Additional notes"
}
```

### Services, optional

`GET /api/services/`

The app contains local embedded service content, but an optional API client method is included in `src/lib/api.js` for future dynamic service loading.

## Django CORS Reminder

For local development, install and configure `django-cors-headers` in Django:

```python
INSTALLED_APPS = [
    "corsheaders",
    # ...
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    # ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

## Build

```bash
npm run build
npm run preview
```

The production output will be generated in `dist/`.

## Project Structure

```text
src/
  components/      Reusable UI blocks
  data/            Embedded content from the design document
  lib/             Django API client
  pages/           Route pages with embedded JSX/HTML content
  App.jsx          Router configuration
  main.jsx         React entry point
public/assets/     Optimized website imagery
```

## Windows install note

If `npm install` tries to download from an internal OpenAI `applied-caas-gateway` URL or fails with `EPERM` cleanup errors, close any running dev server/editor terminals, delete `node_modules`, and run:

```bash
npm config set registry https://registry.npmjs.org/
npm install
```

This package includes a public-registry `.npmrc` and a patched lockfile so npm should use the public npm registry.
