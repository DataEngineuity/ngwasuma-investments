import { Send } from 'lucide-react';
import { useState } from 'react';
import { submitContact } from '../lib/api';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: 'Logistics',
  message: '',
};

export default function ContactForm({ compact = false }) {
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
      await submitContact(form);
      setForm(initialForm);
      setStatus({ type: 'success', message: 'Your message has been sent. Our team will contact you shortly.' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to reach the API. Please check your Django server and CORS settings.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex h-full flex-col rounded-[2rem] bg-white p-6 shadow-soft ${compact ? '' : 'md:p-8'}`}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Name</span>
          <input name="name" value={form.name} onChange={update} className="input-field" placeholder="Your name" required />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Email</span>
          <input name="email" type="email" value={form.email} onChange={update} className="input-field" placeholder="you@example.com" required />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Phone</span>
          <input name="phone" value={form.phone} onChange={update} className="input-field" placeholder="+260 ..." />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Service</span>
          <select name="service" value={form.service} onChange={update} className="input-field" required>
            <option>Logistics</option>
            <option>Car Hire</option>
            <option>Real Estate</option>
            <option>General Support</option>
          </select>
        </label>
      </div>
      <label className="mt-4 flex flex-1 flex-col">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={update}
          className="input-field min-h-36 flex-1 resize-y"
          placeholder="Tell us what you need..."
          required
        />
      </label>
      {status.message && (
        <div
          className={`mt-5 rounded-2xl px-4 py-3 text-sm font-bold ${
            status.type === 'success' ? 'bg-limebrand/20 text-moss' : 'bg-red-50 text-red-700'
          }`}
        >
          {status.message}
        </div>
      )}
      <button type="submit" disabled={loading} className="btn-dark mt-6 w-full md:w-auto">
        {loading ? 'Sending...' : 'Send Message'} <Send size={18} />
      </button>
    </form>
  );
}
