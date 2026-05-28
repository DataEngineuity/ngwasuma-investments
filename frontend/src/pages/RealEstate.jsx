import { CheckCircle2 } from 'lucide-react';
import ContactStrip from '../components/ContactStrip';
import Hero from '../components/Hero';
import PageIntro from '../components/PageIntro';
import SectionHeading from '../components/SectionHeading';
import { residentialImages } from '../data/siteContent';

const bullets = [
  'Tenant placement and lease coordination',
  'Quality residential homes and apartments',
  'Transparent communication for owners and tenants',
  'Smooth lease management focused on trust and convenience',
];

export default function RealEstate() {
  return (
    <>
      <Hero
        compact
        image="/assets/hero-real-estate.webp"
        eyebrow="Residential leasing"
        title="Curating Better"
        titleAccent="Structures"
        body="Quality homes and professional property coordination for tenants and residential property owners."
      />
      <PageIntro
        title="Real Estate Services"
        body="Our Residential Leasing services are dedicated to connecting tenants with quality homes while providing property owners with reliable and professional management of their rental properties."
      />
      <section className="bg-white py-24">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Leasing made simple"
              title="Homes managed with professionalism and trust."
              body="We specialize in residential leasing, offering well-maintained homes and apartments that meet comfort, safety and lifestyle needs."
            />
            <ul className="mt-8 grid gap-4">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-fog p-4 text-sm font-bold text-slate-700">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-limebrand" size={20} /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {residentialImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt="Residential leasing visual"
                className={`h-64 w-full rounded-[2rem] object-cover shadow-soft ${index === 0 ? 'sm:col-span-2' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>
      <ContactStrip
        eyebrow="Residential leasing"
        title="Looking for a home or tenant?"
        accent="Schedule a viewing."
        defaultService="Real Estate"
        buttonLabel="Schedule Viewing"
        messagePlaceholder="Tell us the type of home, preferred location, budget range and viewing date..."
      />
    </>
  );
}
