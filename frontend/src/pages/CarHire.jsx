import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactStrip from '../components/ContactStrip';
import Hero from '../components/Hero';
import PageIntro from '../components/PageIntro';
import SectionHeading from '../components/SectionHeading';
import { carHireServices } from '../data/siteContent';
import Seo from '../components/Seo';

export default function CarHire() {
  return (
    <>
      <Seo
        title="Car Hire & Transport — Let's Get You Moving"
        description="Economy and executive car hire from K650/day. Chauffeur, airport transfers, group transport, and long-distance passenger services across Zambia."
      />
      <Hero
        compact
        image="/assets/hero-car-hire.webp"
        eyebrow="Transportation services"
        title="Let’s Get You"
        titleAccent="Moving"
        body="Economy, executive, chauffeur, staff and group transportation options for daily, corporate and long-distance travel."
        primary={{ label: 'See Pricing', href: '/quote' }}
      />
      <PageIntro
        title="Transportation Services"
        body="Our culture is built around people and travel. We understand day-to-day and long-term car hire needs and provide flexible costs for economical, executive and business tailored car hire solutions."
        ctaLabel="See Pricing"
      />
      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Car hire and general transport"
            title="Flexible movement for people, teams and events."
            body="From airport pick-ups and executive errands to staff transport and long-distance passenger movement, we tailor availability around your schedule."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {carHireServices.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-[2rem] bg-fog shadow-soft">
                <img src={item.image} alt="" className="h-60 w-full object-cover" />
                <div className="p-7">
                  <h3 className="font-display text-2xl font-black tracking-[-0.04em] text-ink">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 rounded-[2rem] bg-ink p-8 text-white md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="eyebrow text-limebrand"><span className="eyebrow-dot" />Rates</p>
                <h3 className="mt-4 font-display text-4xl font-black tracking-[-0.06em]">Economy rates start from K650/day.</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">Executive hire starts from K1,400/day depending on vehicle class, route and requirements.</p>
              </div>
              <Link to="/quote" className="btn-primary">
                Request Availability <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ContactStrip
        eyebrow="Vehicle availability"
        title="Need reliable transport?"
        accent="Check availability."
        defaultService="Car Hire"
        buttonLabel="Check Availability"
        messagePlaceholder="Tell us your dates, vehicle preference, pickup location and passenger count..."
      />
    </>
  );
}
