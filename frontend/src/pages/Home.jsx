import Seo from '../components/Seo';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactStrip from '../components/ContactStrip';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import StatsGrid from '../components/StatsGrid';
import ValueGrid from '../components/ValueGrid';
import { services } from '../data/siteContent';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://ngwasumainvestments.com/#business',
  name: 'Ngwasuma Investments Limited',
  url: 'https://ngwasumainvestments.com',
  telephone: '+260770515196',
  email: 'info@ngwasumainvestments.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot #1613, Off Chipandwe Road, Ibex Meanwood',
    addressLocality: 'Lusaka',
    addressRegion: 'Lusaka Province',
    addressCountry: 'ZM',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -15.407471,
    longitude: 28.429363,
  },
  sameAs: [
    'https://instagram.com/ngwasumainvestments',
    'https://x.com/ngwasumainvests',
    'https://www.linkedin.com/in/ngwasuma-investments-613988409',
  ],
  areaServed: [
    { '@type': 'Country', name: 'Zambia' },
    { '@type': 'Place', name: 'SADC Region' },
  ],
};

export default function Home() {
  return (
    <>
      <Seo
        title="Delivering the World to You"
        description="Ngwasuma Investments Limited delivers reliable logistics, residential leasing, and car hire across Zambia and the SADC region. Precision meets reliability."
        jsonLd={homeJsonLd}
      />

      <Hero
        variant="split"
        image="/assets/hero-truck-cutout.png"
        imageAlt="Ngwasuma branded truck"
        eyebrow="Precision meets reliability."
        title="Delivering the World to"
        titleAccent="You."
        body="Logistics, transport, car hire and residential leasing solutions across Zambia and the SADC region."
      />

      <section className="bg-white py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" />Logistics</p>
            <h2 className="section-title mt-5">Precision meets Reliability</h2>
            <p className="section-copy mt-6">
              Our logistics and transport services provide reliable and efficient movement of goods to support businesses
              and supply chains. We specialize in safe transportation, careful handling and timely delivery that keeps
              operations moving securely and on schedule.
            </p>
            <Link to="/services/logistics" className="btn-dark mt-8">
              Explore logistics <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-limebrand/30 blur-2xl" />
            <img src="/assets/brand-truck.webp" alt="Ngwasuma branded truck" className="relative rounded-[2rem] bg-ink p-4 shadow-soft" />
          </div>
        </div>
      </section>

      <section className="bg-fog py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Services"
            title="Solutions built for movement, property and people."
            body="Ngwasuma brings a diversified approach anchored on logistics, warehousing, car hire and residential leasing value chains."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Certified Excellence"
            title="Measurable operations, dependable service."
            body="Targets and operating standards keep the fleet visible, maintained and ready for client work."
          />
          <div className="mt-12">
            <StatsGrid />
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-white">
        <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow text-limebrand"><span className="eyebrow-dot" />Why Choose Us</p>
            <h2 className="mt-5 font-display text-5xl font-black leading-none tracking-[-0.07em] md:text-7xl">
              A Client-<span className="text-limebrand">Centric</span> Partner
            </h2>
            <p className="mt-7 text-base leading-8 text-white/70">
              We have a flexible approach to every case, supporting clients with professional availability, effective
              resolution and measurable KPIs across multiple sectors.
            </p>
          </div>
          <ValueGrid />
        </div>
      </section>

{/*       <ContactStrip */}
{/*         eyebrow="Ready to move forward" */}
{/*         title="Let's get you moving." */}
{/*         accent="Request a quote today." */}
{/*         defaultService="Logistics" */}
{/*         buttonLabel="Request a Quote" */}
{/*       /> */}
    </>
  );
}