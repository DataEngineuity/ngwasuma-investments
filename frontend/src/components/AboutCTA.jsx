import { ArrowRight, Handshake, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutCTA() {
  return (
    <section className="bg-fog py-20 md:py-24">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden bg-ink p-8 text-white md:p-12 lg:p-14">
            <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-limebrand/12 blur-3xl" />

            <div className="relative">
              <p className="eyebrow text-limebrand">
                <span className="eyebrow-dot" />
                Partner with us
              </p>

              <h2 className="mt-6 font-display text-5xl font-black leading-[0.94] tracking-[-0.065em] md:text-6xl">
                Ready to work with a dependable partner?
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-white/70">
                Talk to us about your operational needs, partnership
                opportunity or upcoming project. We will connect you with the
                right team.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-limebrand text-ink">
              <Handshake size={25} />
            </div>

            <h3 className="mt-6 text-3xl font-black tracking-[-0.04em] text-ink">
              Start the conversation
            </h3>

            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              Contact us for partnerships, project discussions, general
              enquiries or support. For defined service requirements and
              pricing, use the quotation form.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-dark">
                Contact Our Team
                <MessageCircle size={18} />
              </Link>

              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-fog px-6 py-4 text-sm font-black text-ink transition hover:border-limebrand hover:bg-limebrand"
              >
                Request a Quote
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}