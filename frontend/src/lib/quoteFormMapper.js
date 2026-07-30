const DETAIL_FIELD_MAP = {
  Logistics: {
    request_type: 'requestType',
    origin: 'origin',
    destination: 'destination',
    cargo_type: 'cargoType',
    cargo_weight: 'cargoWeight',
    preferred_date: 'preferredDate',
  },

  'Car Hire': {
    request_type: 'requestType',
    vehicle_type: 'vehicleType',
    pickup_location: 'pickupLocation',
    return_location: 'returnLocation',
    pickup_date: 'pickupDate',
    return_date: 'returnDate',
    passengers: 'passengers',
  },

  'Real Estate': {
    request_type: 'requestType',
    property_type: 'propertyType',
    preferred_area: 'preferredArea',
    bedrooms: 'bedrooms',
    budget: 'budget',
    preferred_date: 'preferredDate',
  },
};

function cleanValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function mapDetails(service, details = {}) {
  const fieldMap = DETAIL_FIELD_MAP[service];

  if (!fieldMap) {
    return {};
  }

  return Object.entries(fieldMap).reduce((mapped, [backendField, frontendField]) => {
    const value = cleanValue(details[frontendField]);

    if (value) {
      mapped[backendField] = value;
    }

    return mapped;
  }, {});
}

function humanizeFieldName(name) {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replaceAll('_', ' ')
    .replace(/^./, (character) => character.toUpperCase());
}

function buildQuoteMessage(service, details = {}, notes = '') {
  const detailLines = Object.entries(details)
    .filter(([, value]) => cleanValue(value))
    .map(([key, value]) => `${humanizeFieldName(key)}: ${value}`);

  return [
    `${service} quote request`,
    '',
    ...detailLines,
    '',
    'Additional notes:',
    cleanValue(notes) || 'None provided',
  ].join('\n');
}

export function transformQuoteForm(form) {
  return {
    name: cleanValue(form.name),
    email: cleanValue(form.email),
    phone: cleanValue(form.phone),
    service: form.service,

    message: buildQuoteMessage(form.service, form.details, form.notes),

    details: mapDetails(form.service, form.details),

    // Honeypot field used by your Django serializer.
    website: form.website || '',

    // Optional source page; your Django view can stamp this into the lead.
    source: window.location.pathname + window.location.search,
  };
}