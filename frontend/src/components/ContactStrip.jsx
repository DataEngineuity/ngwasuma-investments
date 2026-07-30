import { Building2, CalendarCheck2, CarFront, Mail, MessageCircle, Phone, Send, Truck } from 'lucide-react';
import { useState } from 'react';
import { contact, services } from '../data/siteContent';
import { submitQuote } from '../lib/api';

const serviceOptions = ['Logistics', 'Car Hire', 'Real Estate', 'General Support'];

const defaultForm = (service) => ({
  name: '',
  email: '',
  phone: '',
  service,
  message: '',
});

function getServiceIcon(service) {
  if (service === 'Logistics' || service === 'Recovery Services') return Truck;
  if (service === 'Car Hire' || service === 'General Transport') return CarFront;
  if (service === 'Real Estate') return Building2;
  return MessageCircle;
}

export default function ContactStrip({
  eyebrow = 'Request assistance',
  title = 'Let’s get you moving.',
  accent = 'Talk to our team today.',
  body = 'Tell us what you need and our team will respond with the right next step for logistics, car hire, real estate or general support.',
  defaultService = 'General Support',
  buttonLabel = 'Request Assistance',
  messagePlaceholder = 'Briefly describe your route, vehicle, cargo, property or support need...',
}) {
  const [form, setForm] = useState(() => defaultForm(defaultService));
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [loading, setLoading] = useState(false);
  const Icon = getServiceIcon(form.service);

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      await submitQuote({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        origin: '',
        destination: '',
        preferred_date: '',
        cargo_or_need: `${form.service} lead request`,
        message: form.message,
      });
      setForm(defaultForm(defaultService));
      setStatus({ type: 'success', message: 'Thank you. Our team will review your request and contact you shortly.' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to submit the request. Please confirm the Django API is running.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-fog pt-14 pb-6 md:pt-16 md:pb-8">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white shadow-soft md:p-10 lg:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-limebrand/20 blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.25fr] lg:items-stretch">
            <div className="flex h-full flex-col">
              <p className="eyebrow text-limebrand"><span className="eyebrow-dot" />{eyebrow}</p>
              <h2 className="mt-5 font-display text-5xl font-black leading-[0.94] tracking-[-0.07em] md:text-6xl">
                {title} <span className="text-limebrand">{accent}</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/72">{body}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-auto lg:grid-cols-1">
                <a href={`tel:${contact.phone.replaceAll(' ', '')}`} className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-limebrand/50 hover:bg-white/10">
                  <Phone className="text-limebrand" size={20} />
                  <span className="mt-3 block text-sm font-black">Call / WhatsApp</span>
                  <span className="mt-1 block whitespace-nowrap text-sm text-white/70">{contact.phone}</span>
                </a>
                <a href={`mailto:${contact.email}`} className="min-w-0 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-limebrand/50 hover:bg-white/10">
                  <Mail className="text-limebrand" size={20} />
                  <span className="mt-3 block text-sm font-black">Email operations</span>
                  <span className="mt-1 block truncate text-[13px] text-white/70 sm:text-sm" title={contact.email}>{contact.email}</span>
                </a>
              </div>
            
            </div>

            <form onSubmit={handleSubmit} className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white p-5 text-ink shadow-glow md:p-6">
              <div className="mb-5 flex items-center gap-4 rounded-3xl bg-fog p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-limebrand text-ink">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-moss">Lead request</p>
                  <p className="text-sm font-bold text-slate-600">Share a few details so we can route your request quickly.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Name</span>
                  <input name="name" value={form.name} onChange={update} className="input-field" placeholder="Your name" required />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Phone / WhatsApp</span>
                  <input name="phone" value={form.phone} onChange={update} className="input-field" placeholder="+260 ..." required />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Email</span>
                  <input name="email" type="email" value={form.email} onChange={update} className="input-field" placeholder="you@example.com" required />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Service needed</span>
                  <select name="service" value={form.service} onChange={update} className="input-field" required>
                    {services.map((service) => <option key={service.slug}>{service.title}</option>)}
                  </select>
                </label>
              </div>

              <label className="mt-4 flex flex-1 flex-col">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">What do you need?</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={update}
                  className="input-field min-h-28 flex-1 resize-y lg:min-h-[150px]"
                  placeholder={messagePlaceholder}
                  required
                />
              </label>

              {status.message && (
                <div className={`mt-5 rounded-2xl px-4 py-3 text-sm font-bold ${status.type === 'success' ? 'bg-limebrand/20 text-moss' : 'bg-red-50 text-red-700'}`}>
                  {status.message}
                </div>
              )}

              <button disabled={loading} type="submit" className="btn-dark mt-5 w-full">
                {loading ? 'Submitting...' : buttonLabel} <Send size={18} />
              </button>

              <p className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500">
                <CalendarCheck2 size={16} className="text-moss" /> Response routed to the right service team.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
