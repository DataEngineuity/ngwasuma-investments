import ContactStrip from '../components/ContactStrip';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/siteContent';
import Seo from '../components/Seo';

export default function Services() {
  return (
    <>
      <Seo
        title="Our Services"
        description="Three disciplines, one operating standard: logistics, residential leasing, and car hire. Explore Ngwasuma's full range of services across Zambia and the SADC region."
      />
      <Hero
        compact
        image="/assets/hero-logistics.webp"
        eyebrow="Precision meets reliability"
        title="Our"
        titleAccent="Services"
        body="A portfolio of logistics, car hire and residential leasing services designed to create seamless movement and dependable support."
      />
      <section className="bg-fog py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Ngwasuma solutions"
            title="One partner for transport, property and operational support."
            body="Our diverse approach is anchored on logistics and warehousing value chains with local, SADC and global sourcing experience."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>
      <ContactStrip
        eyebrow="Find the right solution"
        title="Need logistics, transport or leasing support?"
        accent="Speak to us."
        defaultService="General Support"
        buttonLabel="Request Assistance"
      />
    </>
  );
}
