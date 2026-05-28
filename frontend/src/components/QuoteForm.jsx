import { Send } from 'lucide-react';
import { useState } from 'react';
import { submitQuote } from '../lib/api';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: 'Logistics',
  origin: '',
  destination: '',
  preferred_date: '',
  cargo_or_need: '',
  message: '',
};

export default function QuoteForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [loading, setLoading] = useState(false);

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      await submitQuote(form);
      setForm(initialForm);
      setStatus({ type: 'success', message: 'Quote request received. We will follow up with pricing and availability.' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to submit the quote request. Please confirm the Django API is running.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Name</span>
          <input name="name" value={form.name} onChange={update} className="input-field" required />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Email</span>
          <input name="email" type="email" value={form.email} onChange={update} className="input-field" required />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Phone</span>
          <input name="phone" value={form.phone} onChange={update} className="input-field" />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Service</span>
          <select name="service" value={form.service} onChange={update} className="input-field">
            <option>Logistics</option>
            <option>Car Hire</option>
            <option>Real Estate</option>
            <option>Recovery Services</option>
            <option>General Transport</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Origin</span>
          <input name="origin" value={form.origin} onChange={update} className="input-field" placeholder="Pickup / source location" />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Destination</span>
          <input name="destination" value={form.destination} onChange={update} className="input-field" placeholder="Drop-off / delivery location" />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Preferred Date</span>
          <input name="preferred_date" type="date" value={form.preferred_date} onChange={update} className="input-field" />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Cargo / Need</span>
          <input name="cargo_or_need" value={form.cargo_or_need} onChange={update} className="input-field" placeholder="Truck type, vehicle, cargo or property need" />
        </label>
      </div>
      <label className="mt-4 flex flex-1 flex-col">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Additional Notes</span>
        <textarea name="message" value={form.message} onChange={update} className="input-field min-h-36 flex-1" />
      </label>
      {status.message && (
        <div className={`mt-5 rounded-2xl px-4 py-3 text-sm font-bold ${status.type === 'success' ? 'bg-limebrand/20 text-moss' : 'bg-red-50 text-red-700'}`}>
          {status.message}
        </div>
      )}
      <button disabled={loading} type="submit" className="btn-dark mt-6 w-full md:w-auto">
        {loading ? 'Submitting...' : 'Request Quote'} <Send size={18} />
      </button>
    </form>
  );
}
