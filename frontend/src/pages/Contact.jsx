import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import FindUsMap from '../components/FindUsMap';
import Hero from '../components/Hero';
import { contact } from '../data/siteContent';
import Seo from '../components/Seo';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Ngwasuma Investments. Email info@ngwasumainvestments.com, call +260 770 51 51 96, or visit us at Plot #1613, Ibex Meanwood, Lusaka."
      />
      <Hero
        compact
        image="/assets/hero-contact.webp"
        eyebrow="Contact us today"
        title="Get in"
        titleAccent="Touch"
        body="We are always ready to help you and answer your questions."
        primary={{ label: 'Send an Email', href: `mailto:${contact.email}` }}
      />

      <section className="bg-ink py-16 text-white md:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <aside>
              <p className="eyebrow text-limebrand">
                <span className="eyebrow-dot" />
                Ngwasuma Investments Limited
              </p>

              <h2 className="mt-5 font-display text-5xl font-black leading-none tracking-[-0.07em] md:text-6xl">
                Speak to <span className="text-limebrand">our team</span>.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                Send us a message, call ahead, or visit our office in Ibex Meanwood.
                We will route your request to the right team.
              </p>

              <div className="mt-8 grid gap-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex min-w-0 gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-limebrand/50 hover:bg-white/10"
                >
                  <Mail className="mt-1 shrink-0 text-limebrand" size={21} />
                  <span className="min-w-0">
                    <strong className="block text-sm text-white">Email</strong>
                    <span className="mt-1 block truncate text-sm text-white/70" title={contact.email}>
                      {contact.email}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${contact.phone.replaceAll(' ', '')}`}
                  className="flex min-w-0 gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-limebrand/50 hover:bg-white/10"
                >
                  <Phone className="mt-1 shrink-0 text-limebrand" size={21} />
                  <span className="min-w-0">
                    <strong className="block text-sm text-white">Phone / WhatsApp</strong>
                    <span className="mt-1 block whitespace-nowrap text-sm text-white/70">
                      {contact.phone}
                    </span>
                  </span>
                </a>

                <a
                  href="#office-location"
                  className="flex min-w-0 gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-limebrand/50 hover:bg-white/10"
                >
                  <MapPin className="mt-1 shrink-0 text-limebrand" size={21} />
                  <span className="min-w-0">
                    <strong className="block text-sm text-white">Address</strong>
                    <address className="mt-1 not-italic text-sm leading-6 text-white/70">
                      Plot #1613, Off Chipandwe Road,<br />
                      Ibex Meanwood, Lusaka,<br />
                      Lusaka Province, Zambia
                    </address>
                  </span>
                </a>
              </div>
            </aside>

            <ContactForm />
          </div>
        </div>
      </section>

      <FindUsMap />
    </>
  );
}