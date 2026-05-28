import ContactStrip from '../components/ContactStrip';
import Hero from '../components/Hero';
import PageIntro from '../components/PageIntro';
import SectionHeading from '../components/SectionHeading';
import { logisticsServices } from '../data/siteContent';

export default function Logistics() {
  return (
    <>
      <Hero
        compact
        image="/assets/efficient-delivery-2x.webp"
        eyebrow="Logistics services"
        title="Precision Beyond"
        titleAccent="Borders"
        body="Client-centered logistics and transport services for secure, timely movement across regional and international routes."
      />
      <PageIntro
        title="Logistics Services"
        body="Our Logistics and Transport services provide reliable and efficient movement of goods to support businesses and supply chains. We specialize in safe transportation, handling and timely delivery of cargo, ensuring that goods reach their destinations securely and on schedule."
      />
      <section className="bg-white py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we deliver"
            title="Value-chain logistics with regional reach."
            body="We combine experienced personnel, well-managed operations and trusted partner networks to streamline distribution and maintain dependable logistics services."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {logisticsServices.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-[2rem] bg-fog shadow-soft">
                <img src={item.image} alt="" className="h-72 w-full object-center object-cover"/>
                <div className="p-7 md:p-9">
                  <p className="eyebrow"><span className="eyebrow-dot" />Service</p>
                  <h3 className="mt-4 font-display text-4xl font-black tracking-[-0.06em] text-ink">{item.title}</h3>
                  <p className="mt-4 text-base leading-8 text-slate-600">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactStrip
        eyebrow="Logistics quote"
        title="Need cargo moved?"
        accent="Get a logistics quote."
        defaultService="Logistics"
        buttonLabel="Get Logistics Quote"
        messagePlaceholder="Tell us the cargo type, route, timing and any handling requirements..."
      />
    </>
  );
}
