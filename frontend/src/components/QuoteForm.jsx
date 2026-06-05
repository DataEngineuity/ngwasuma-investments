import { Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { services } from '../data/siteContent';
import { submitQuote } from '../lib/api';

const fallbackServices = ['Logistics', 'Car Hire', 'Real Estate'];

const serviceConfigs = {
  Logistics: {
    intro: 'Tell us about the cargo, route and handling requirements.',
    needLabel: 'Cargo / Logistics need',
    notesPlaceholder: 'Describe cargo type, weight, dimensions, handling requirements, delivery timing or recovery needs...',
    fields: [
      {
        name: 'requestType',
        label: 'Request type',
        type: 'select',
        options: ['Long Haulage', 'Recovery Services', 'General Logistics'],
      },
      {
        name: 'origin',
        label: 'Origin',
        type: 'text',
        placeholder: 'Pickup / source location',
      },
      {
        name: 'destination',
        label: 'Destination',
        type: 'text',
        placeholder: 'Drop-off / delivery location',
      },
      {
        name: 'cargoType',
        label: 'Cargo type',
        type: 'text',
        placeholder: 'Goods, equipment, vehicle, container...',
      },
      {
        name: 'cargoWeight',
        label: 'Estimated weight',
        type: 'text',
        placeholder: 'e.g. 2 tonnes, 500kg, unknown',
      },
      {
        name: 'preferredDate',
        label: 'Preferred pickup date',
        type: 'date',
      },
    ],
  },

  'Car Hire': {
    intro: 'Tell us about the vehicle, dates and movement requirements.',
    needLabel: 'Vehicle / transport need',
    notesPlaceholder: 'Describe the trip, vehicle preference, passenger count, chauffeur need or special movement requirements...',
    fields: [
      {
        name: 'requestType',
        label: 'Request type',
        type: 'select',
        options: ['Self Drive', 'Chauffeur Service', 'Airport Transfer', 'Staff Transport', 'Event Transport', 'General Transport'],
      },
      {
        name: 'vehicleType',
        label: 'Vehicle type',
        type: 'select',
        options: ['Economy Car', 'Executive Sedan', 'SUV / 4x4', 'Pickup', 'Bus / Group Transport', 'Not Sure'],
      },
      {
        name: 'pickupLocation',
        label: 'Pickup location',
        type: 'text',
        placeholder: 'Where should the vehicle start from?',
      },
      {
        name: 'returnLocation',
        label: 'Return / drop-off location',
        type: 'text',
        placeholder: 'Same as pickup or another location',
      },
      {
        name: 'pickupDate',
        label: 'Pickup date',
        type: 'date',
      },
      {
        name: 'returnDate',
        label: 'Return date',
        type: 'date',
      },
      {
        name: 'passengers',
        label: 'Passengers',
        type: 'text',
        placeholder: 'e.g. 1, 4, 12, staff team',
      },
    ],
  },

  'Real Estate': {
    intro: 'Tell us what kind of residential leasing support you need.',
    needLabel: 'Property / leasing need',
    notesPlaceholder: 'Describe your preferred property, area, budget, move-in timing or viewing requirements...',
    fields: [
      {
        name: 'requestType',
        label: 'Request type',
        type: 'select',
        options: ['Residential Leasing', 'Schedule Viewing', 'Tenant Inquiry', 'Property Owner Inquiry'],
      },
      {
        name: 'propertyType',
        label: 'Property type',
        type: 'select',
        options: ['House', 'Apartment', 'Townhouse', 'Flat', 'Not Sure'],
      },
      {
        name: 'preferredArea',
        label: 'Preferred area',
        type: 'text',
        placeholder: 'Ibex, Meanwood, Roma, Kabulonga...',
      },
      {
        name: 'bedrooms',
        label: 'Bedrooms',
        type: 'select',
        options: ['1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4+ Bedrooms', 'Flexible'],
      },
      {
        name: 'budget',
        label: 'Monthly budget',
        type: 'text',
        placeholder: 'e.g. K8,000/month',
      },
      {
        name: 'preferredDate',
        label: 'Preferred viewing date',
        type: 'date',
      },
    ],
  },
};

const baseForm = {
  name: '',
  email: '',
  phone: '',
  service: 'Logistics',
  details: {},
  notes: '',
};

function buildMessage(service, details, notes) {
  const lines = Object.entries(details)
    .filter(([, value]) => String(value || '').trim())
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (char) => char.toUpperCase());

      return `${label}: ${value}`;
    });

  return [
    `${service} quote request`,
    '',
    ...lines,
    '',
    'Additional notes:',
    notes || 'None provided',
  ].join('\n');
}

function Field({ field, value, onChange }) {
  const commonClass = 'input-field';

  if (field.type === 'select') {
    return (
      <label className="block">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          {field.label}
        </span>
        <select
          name={field.name}
          value={value || ''}
          onChange={(event) => onChange(field.name, event.target.value)}
          className={commonClass}
          required
        >
          <option value="">Select option</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
        {field.label}
      </span>
      <input
        name={field.name}
        type={field.type}
        value={value || ''}
        onChange={(event) => onChange(field.name, event.target.value)}
        className={commonClass}
        placeholder={field.placeholder || ''}
        required
      />
    </label>
  );
}

export default function QuoteForm() {
  const serviceOptions = useMemo(() => {
    const titles = services?.map((service) => service.title).filter(Boolean) || [];
    return titles.length ? titles : fallbackServices;
  }, []);

  const [form, setForm] = useState(() => ({
    ...baseForm,
    service: serviceOptions[0] || 'Logistics',
  }));

  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [loading, setLoading] = useState(false);

  const config = serviceConfigs[form.service] || serviceConfigs.Logistics;

  function updateBase(event) {
    const { name, value } = event.target;

    setForm((current) => {
      if (name === 'service') {
        return {
          ...current,
          service: value,
          details: {},
          notes: '',
        };
      }

      return {
        ...current,
        [name]: value,
      };
    });
  }

  function updateDetail(name, value) {
    setForm((current) => ({
      ...current,
      details: {
        ...current.details,
        [name]: value,
      },
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    const details = form.details;

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,

      // Normalized fields for current/future backend compatibility
      origin: details.origin || details.pickupLocation || details.preferredArea || '',
      destination: details.destination || details.returnLocation || '',
      preferred_date: details.preferredDate || details.pickupDate || '',
      cargo_or_need:
        details.cargoType ||
        details.vehicleType ||
        details.propertyType ||
        details.requestType ||
        '',

      message: buildMessage(form.service, details, form.notes),
    };

    try {
      await submitQuote(payload);

      setForm({
        ...baseForm,
        service: serviceOptions[0] || 'Logistics',
      });

      setStatus({
        type: 'success',
        message: 'Thank you. Your quote request has been received. Our team will contact you shortly.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to submit your quote request. Please try again or contact us directly.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 text-ink shadow-soft md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            Name
          </span>
          <input
            name="name"
            value={form.name}
            onChange={updateBase}
            className="input-field"
            placeholder="Your name"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            Email
          </span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateBase}
            className="input-field"
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            Phone
          </span>
          <input
            name="phone"
            value={form.phone}
            onChange={updateBase}
            className="input-field"
            placeholder="+260 ..."
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            Service
          </span>
          <select
            name="service"
            value={form.service}
            onChange={updateBase}
            className="input-field"
            required
          >
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-3xl bg-fog p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-moss">
          {form.service} details
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {config.intro}
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {config.fields.map((field) => (
          <Field
            key={`${form.service}-${field.name}`}
            field={field}
            value={form.details[field.name]}
            onChange={updateDetail}
          />
        ))}
      </div>

      <label className="mt-6 block">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          Additional notes
        </span>
        <textarea
          name="notes"
          value={form.notes}
          onChange={updateBase}
          className="input-field min-h-[150px] resize-y"
          placeholder={config.notesPlaceholder}
        />
      </label>

      {status.message && (
        <div
          className={`mt-5 rounded-2xl px-4 py-3 text-sm font-bold ${
            status.type === 'success'
              ? 'bg-limebrand/20 text-moss'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {status.message}
        </div>
      )}

      <button disabled={loading} type="submit" className="btn-dark mt-6 w-full">
        {loading ? 'Submitting...' : 'Request Quote'}
        <Send size={18} />
      </button>
    </form>
  );
}