import {
  ArrowRight,
  Building2,
  CarFront,
  FileText,
  Handshake,
  Headphones,
  MapPin,
  MessageCircle,
  Truck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomeCTA() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container-page">
        <div className="overflow-hidden rounded-[2rem] bg-ink text-white shadow-soft">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Introductory panel */}
            <div className="relative flex flex-col justify-center overflow-hidden p-8 md:p-12 lg:p-14">
              <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-limebrand/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-limebrand/10 blur-3xl" />

              <div className="relative">
                <p className="eyebrow text-limebrand">
                  <span className="eyebrow-dot" />
                  Ready to move forward
                </p>

                <h2 className="mt-6 max-w-2xl font-display text-5xl font-black leading-[0.94] tracking-[-0.065em] md:text-6xl">
                  Need pricing, availability or just a quick answer?
                </h2>

                <p className="mt-7 max-w-xl text-base leading-8 text-white/72">
                  Choose the option that best matches what you need. Request a
                  tailored quotation for logistics, car hire or real estate, or
                  contact our team for guidance, support or a general enquiry.
                </p>

                <div className="mt-8 flex items-start gap-3 text-sm font-bold text-white/55">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-limebrand" />
                  <span>
                    Your request will be routed to the right team.
                  </span>
                </div>
              </div>
            </div>

            {/* Decision area */}
            <div className="bg-white p-6 text-ink md:p-8 lg:p-10">
              <div className="grid h-full gap-5 md:grid-cols-2">
                {/* Quote card */}
                <Link
                  to="/quote"
                  className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-fog p-6 transition duration-300 hover:-translate-y-1 hover:border-limebrand/60 hover:shadow-soft md:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-limebrand text-ink">
                    <FileText size={22} />
                  </div>

                  <h3 className="mt-6 text-2xl font-black tracking-[-0.03em]">
                    Request a Quote
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Best when you need pricing, availability, service planning,
                    booking support or a formal quotation.
                  </p>

                  <div className="mt-6 grid gap-3 text-sm font-bold text-slate-700">
                    <span className="flex items-center gap-3">
                      <Truck size={17} className="text-limebrand" />
                      Logistics
                    </span>

                    <span className="flex items-center gap-3">
                      <CarFront size={17} className="text-limebrand" />
                      Car Hire
                    </span>

                    <span className="flex items-center gap-3">
                      <Building2 size={17} className="text-limebrand" />
                      Real Estate
                    </span>
                  </div>

                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-black text-moss">
                    Start quote request
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>

                {/* Contact card */}
                <Link
                  to="/contact"
                  className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-limebrand/60 hover:shadow-soft md:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-limebrand">
                    <MessageCircle size={22} />
                  </div>

                  <h3 className="mt-6 text-2xl font-black tracking-[-0.03em]">
                    Contact Our Team
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Best for questions, follow-ups, partnerships, directions or
                    support before requesting a quote.
                  </p>

                  <div className="mt-6 grid gap-3 text-sm font-bold text-slate-700">
                    <span className="flex items-center gap-3">
                      <Handshake size={17} className="text-limebrand" />
                      Partnerships
                    </span>

                    <span className="flex items-center gap-3">
                      <Headphones size={17} className="text-limebrand" />
                      General Support
                    </span>

                    <span className="flex items-center gap-3">
                      <MapPin size={17} className="text-limebrand" />
                      Office Directions
                    </span>
                  </div>

                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-black text-moss">
                    Contact our team
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}