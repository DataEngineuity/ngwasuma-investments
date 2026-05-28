export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const FRONTEND_ONLY =
  import.meta.env.VITE_FRONTEND_ONLY !== 'false';

function saveLocally(type, payload) {
  const entry = {
    id: `${type}-${Date.now()}`,
    type,
    payload,
    created_at: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    const key = 'ngwasuma_form_submissions';
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([entry, ...current]));
  }

  console.info(`[Ngwasuma frontend-only submission]`, entry);

  return Promise.resolve({
    ok: true,
    frontend_only: true,
    message: 'Submission captured locally for frontend testing.',
    data: entry,
  });
}

async function postToApi(path, payload, type) {
  if (FRONTEND_ONLY || !API_BASE_URL) {
    return saveLocally(type, payload);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === 'string'
        ? data
        : data.detail || data.message || 'Request failed';

    throw new Error(message);
  }

  return data;
}

export function submitContact(payload) {
  return postToApi('/api/contact/', payload, 'contact');
}

export function submitQuote(payload) {
  return postToApi('/api/quotes/', payload, 'quote');
}

export function getServices() {
  if (FRONTEND_ONLY || !API_BASE_URL) {
    return Promise.resolve([]);
  }

  return fetch(`${API_BASE_URL}/api/services/`).then((response) => {
    if (!response.ok) {
      throw new Error('Unable to load services.');
    }

    return response.json();
  });
}