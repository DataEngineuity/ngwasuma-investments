import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesCTA() {
  return (
    <section className="bg-fog py-20 md:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-12 text-white shadow-soft md:px-12 lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-limebrand/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-limebrand/10 blur-3xl" />

          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow text-limebrand">
                <span className="eyebrow-dot" />
                Your next step
              </p>

              <h2 className="mt-6 max-w-3xl font-display text-5xl font-black leading-[0.94] tracking-[-0.065em] md:text-6xl">
                Found the right solution?
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
                Request a tailored quotation for logistics, car hire or real
                estate. If you are unsure which service fits your need, speak
                to our team and we will guide you.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link to="/quote" className="btn-primary whitespace-nowrap">
                Request a Quote
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:bg-white hover:text-ink"
              >
                Speak to Our Team
                <MessageCircle size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}