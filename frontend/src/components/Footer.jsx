import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contact, services, socialLinks } from '../data/siteContent';
import BrandLogo from './BrandLogo';

function SocialIcon({ label }) {
  if (label === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M14.2 8.4V6.7c0-.8.5-1 1.1-1h1.6V2.9c-.8-.1-1.6-.2-2.4-.2-2.4 0-4 1.5-4 4.1v1.6H7.9v3.1h2.6v7.8h3.2v-7.8h2.6l.4-3.1h-3Z" />
      </svg>
    );
  }

  if (label === 'LinkedIn') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M6.6 8.7H3.4v10.6h3.2V8.7ZM5 7.2A1.9 1.9 0 1 0 5 3.4a1.9 1.9 0 0 0 0 3.8Zm14.8 6.3c0-3.2-1.7-5-4.3-5a3.7 3.7 0 0 0-3.3 1.8V8.7H9v10.6h3.2v-5.4c0-1.4.8-2.5 2.1-2.5 1.2 0 2 .8 2 2.5v5.4h3.5v-5.8Z" />
      </svg>
    );
  }

  if (label === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[2]">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <circle cx="16.8" cy="7.3" r=".6" className="fill-current stroke-none" />
      </svg>
    );
  }

  return <span className="text-sm font-black leading-none">X</span>;
}

export default function Footer() {
  return (
    <footer className="bg-white pt-8 pb-12 text-ink md:pt-10 md:pb-14">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2.2fr]">
          <div>
            <BrandLogo dark />
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
              Industries thrive on sustainable supply solutions. We champion precision and functionality across logistics,
              real estate and transportation with local and global network proficiency.
            </p>
            <div className="mt-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Follow Us</h3>
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map((item) => {
                  const hasUrl = item.href && item.href !== '#';
                  return (
                    <a
                      key={item.label}
                      href={hasUrl ? item.href : '#'}
                      target={hasUrl ? '_blank' : undefined}
                      rel={hasUrl ? 'noreferrer' : undefined}
                      onClick={(event) => {
                        if (!hasUrl) event.preventDefault();
                      }}
                      title={hasUrl ? `Follow Ngwasuma on ${item.label}` : `Add ${item.label} URL in src/data/siteContent.js or .env`}
                      aria-disabled={!hasUrl}
                      aria-label={hasUrl ? `Follow Ngwasuma on ${item.label}` : `${item.label} social link not configured`}
                      className={`flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-slate-200 transition ${
                        hasUrl
                          ? 'bg-ink text-white hover:-translate-y-0.5 hover:bg-limebrand hover:text-ink hover:ring-limebrand'
                          : 'cursor-not-allowed bg-slate-100 text-slate-400'
                      }`}
                    >
                      <SocialIcon label={item.label} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid min-w-0 gap-8 sm:grid-cols-2 lg:grid-cols-[0.9fr_0.95fr_1.35fr]">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Solutions</h3>
              <ul className="mt-5 space-y-3 text-sm font-bold text-slate-600">
                <li><Link to="/services">Services</Link></li>
                {services.map((item) => (
                  <li key={item.slug}><Link to={item.href}>{item.title}</Link></li>
                ))}
                <li><Link to="/about">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Support</h3>
              <ul className="mt-5 space-y-3 text-sm font-bold text-slate-600">
                <li><Link to="/services">Fleet Gallery</Link></li>
                <li><Link to="/contact">How to track shipments</Link></li>
                <li><Link to="/contact">Support</Link></li>
              </ul>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Contact</h3>
              <ul className="mt-5 space-y-4 text-sm text-slate-600">
                <li className="flex min-w-0 items-start gap-3">
                  <Mail size={17} className="mt-0.5 shrink-0 text-limebrand" />
                  <a href={`mailto:${contact.email}`} title={contact.email} className="min-w-0 flex-1 truncate transition hover:text-ink">
                    {contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={17} className="mt-0.5 shrink-0 text-limebrand" />
                  <a href={`tel:${contact.phone.replaceAll(' ', '')}`} className="whitespace-nowrap transition hover:text-ink">
                    {contact.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-limebrand" />
                  <address className="not-italic leading-6 text-slate-600">
                    <span className="block">Plot #1613, Off Chipandwe Road,</span>
                    <span className="block">Ibex Meanwood, Lusaka,</span>
                    <span className="block">Lusaka Province, Zambia</span>
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-xs font-bold text-slate-400">
          2026 All Rights Reserved. Ngwasuma Investments Limited
        </div>
      </div>
    </footer>
  );
}
