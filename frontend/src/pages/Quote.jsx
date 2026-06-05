import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import QuoteForm from '../components/QuoteForm';
import SectionHeading from '../components/SectionHeading';
import Seo from '../components/Seo';
import { contact } from '../data/siteContent';

export default function Quote() {
    const location = useLocation();

    const defaultService = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const service = params.get('service');

        const serviceMap = {
            logistics: 'Logistics',
            'real-estate': 'Real Estate',
            realestate: 'Real Estate',
            carhire: 'Car Hire',
            'car-hire': 'Car Hire',
        };

        return serviceMap[service?.toLowerCase()] || 'Logistics';
    }, [location.search]);
  return (
    <>
      <Seo
        title="Request a Quote"
        description="Request a tailored quote for logistics, car hire, or real estate services. We respond with availability, pricing guidance, or the next step."
      />

      <Hero
        compact
        image="/assets/hero-home.webp"
        eyebrow="Get a quote"
        title="Request a"
        titleAccent="Quote"
        body="Tell us what you need and our team will respond with availability, pricing guidance or the next step."
        primary={null}
        secondary={null}
      />

      <section className="bg-fog py-20 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="flex h-full flex-col">
            <SectionHeading
              eyebrow="Quote request"
              title="Select a service. We’ll ask the right questions."
              body="Choose logistics, car hire, or real estate and the form will adjust to collect the details our team needs to prepare the right response."
            />

            <div className="mt-8 flex flex-1 flex-col rounded-[2rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-soft">
              <p className="font-black text-ink">How it works</p>

              <ul className="mt-4 space-y-3">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-limebrand" />
                  <span>Select the service you need: logistics, car hire, or real estate.</span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-limebrand" />
                  <span>The form will show fields relevant to that service.</span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-limebrand" />
                  <span>Our team reviews your request and confirms the next step by phone or email.</span>
                </li>
              </ul>

              <div className="mt-8 rounded-2xl bg-fog p-5 lg:mt-auto">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                  Urgent request?
                </p>

                <p className="mt-2 font-black text-ink">Call / WhatsApp</p>

                <a
                  href={`tel:${contact.phone.replaceAll(' ', '')}`}
                  className="mt-1 block font-bold text-moss transition hover:text-ink"
                >
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>

          <QuoteForm defaultService={defaultService}/>
        </div>
      </section>
    </>
  );
}