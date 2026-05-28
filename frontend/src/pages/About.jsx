import ContactStrip from '../components/ContactStrip';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import StatsGrid from '../components/StatsGrid';
import ValueGrid from '../components/ValueGrid';

export default function About() {
  return (
    <>
      <Hero
        compact
        image="/assets/hero-about.webp"
        eyebrow="About Ngwasuma"
        title="Possibility in Every"
        titleAccent="Direction"
        body="A client-centered company supporting logistics, real estate and transportation with experience, network proficiency and organized delivery."
      />
      <section className="bg-white py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="About Ngwasuma"
            title="Precision, reliability and operational discipline."
            body="Our logistics and transport services provide reliable and efficient movement of goods to support businesses and supply chains. We combine experienced personnel with well-managed transport operations to help clients streamline distribution and maintain smooth, dependable logistics services."
          />
          <StatsGrid variant="compact"/>
        </div>
      </section>
      <section className="bg-ink py-24 text-white">
        <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow text-limebrand"><span className="eyebrow-dot" />Why choose us</p>
            <h2 className="mt-5 font-display text-5xl font-black leading-none tracking-[-0.07em] md:text-7xl">
              A Client-<span className="text-limebrand">Centric</span> Partner
            </h2>
            <p className="mt-7 text-base leading-8 text-white/70">
              We professionally deliver support and availability for effective resolution with flexible approaches to cases
              across multiple business sectors.
            </p>
          </div>
          <ValueGrid />
        </div>
      </section>
      <ContactStrip
        eyebrow="Partner with us"
        title="Ready for a dependable partner?"
        accent="Let’s talk."
        defaultService="General Support"
        buttonLabel="Start Conversation"
      />
    </>
  );
}
