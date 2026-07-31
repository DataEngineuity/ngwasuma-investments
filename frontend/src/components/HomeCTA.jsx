import { ArrowRight, FileText, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomeCTA() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] bg-ink text-white shadow-soft">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative p-8 md:p-12 lg:p-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(142,239,0,0.18),transparent_34%),radial-gradient(circle_at_90%_80%,rgba(142,239,0,0.12),transparent_30%)]" />

              <div className="relative">
                <p className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-limebrand">
                  <span className="h-3 w-3 rounded-full bg-limebrand" />
                  Ready to move forward
                </p>

                <h2 className="max-w-2xl text-4xl font-black leading-tight md:text-6xl">
                  Need pricing, availability or just a quick answer?
                </h2>

                <p className="mt-6 max-w-xl text-base leading-8 text-white/75">
                  Request a tailored quote for logistics, car hire or real estate support.
                  If you are not ready for a quote yet, contact our team and we will guide
                  you to the right next step.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to="/quote" className="btn-lime">
                    Get a Quote
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:bg-white hover:text-ink"
                  >
                    Contact Us
                    <MessageCircle size={18} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 text-ink md:p-8 lg:p-10">
              <div className="grid h-full gap-4">
                <div className="rounded-3xl bg-fog p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-limebrand text-ink">
                    <FileText size={22} />
                  </div>

                  <h3 className="text-xl font-black">
                    Request a quote
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Best for pricing, availability, service planning, route details,
                    vehicle hire, property viewing, or formal quotation requests.
                  </p>

                  <Link
                    to="/quote"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-black text-moss transition hover:text-ink"
                  >
                    Start quote request
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-limebrand">
                    <MessageCircle size={22} />
                  </div>

                  <h3 className="text-xl font-black">
                    Just need to talk?
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Use the contact page for general enquiries, partnerships, directions,
                    follow-ups, or questions that do not need a quotation yet.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-sm font-black text-moss transition hover:text-ink"
                    >
                      Send a message
                      <ArrowRight size={16} />
                    </Link>

                    <a
                      href="tel:+260770515196"
                      className="inline-flex items-center gap-2 text-sm font-black text-slate-500 transition hover:text-ink"
                    >
                      <Phone size={16} />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}