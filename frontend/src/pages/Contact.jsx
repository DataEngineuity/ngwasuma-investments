import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import Hero from '../components/Hero';
import { contact } from '../data/siteContent';

export default function Contact() {
  return (
    <>
      <Hero
        compact
        image="/assets/hero-contact.webp"
        eyebrow="Contact us today"
        title="Get in"
        titleAccent="Touch"
        body="We are always ready to help you and answer your questions."
        primary={{ label: 'Send an Email', href: 'mailto:info@ngwasumainvestments.com' }}
      />
      <section className="bg-ink py-24 text-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <aside className="flex h-full flex-col">
            <p className="eyebrow text-limebrand"><span className="eyebrow-dot" />Ngwasuma Investments</p>
            <h2 className="mt-5 font-display text-5xl font-black tracking-[-0.07em] md:text-6xl">
              Get in <span className="text-limebrand">Touch</span>
            </h2>
            <p className="mt-5 max-w-md text-white/70">We are always ready to help you and answer your questions.</p>
            <div className="mt-10 space-y-5 lg:mt-auto">
              <a href={`mailto:${contact.email}`} className="flex min-w-0 gap-4 rounded-2xl bg-white/5 p-5 transition hover:bg-white/10">
                <Mail className="shrink-0 text-limebrand" />
                <span className="min-w-0"><strong className="block">Email</strong><span className="block truncate text-white/70" title={contact.email}>{contact.email}</span></span>
              </a>
              <a href={`tel:${contact.phone.replaceAll(' ', '')}`} className="flex min-w-0 gap-4 rounded-2xl bg-white/5 p-5 transition hover:bg-white/10">
                <Phone className="shrink-0 text-limebrand" />
                <span className="min-w-0"><strong className="block">Phone</strong><span className="block whitespace-nowrap text-white/70">{contact.phone}</span></span>
              </a>
              <div className="flex min-w-0 gap-4 rounded-2xl bg-white/5 p-5">
                <MapPin className="shrink-0 text-limebrand" />
                <span className="min-w-0"><strong className="block">Address</strong><span className="text-white/70">{contact.address}</span></span>
              </div>
            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
