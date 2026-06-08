import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/**
 * A lightweight CTA strip directing visitors to the full quote form.
 * Use on Logistics, RealEstate, CarHire, About pages.
 *
 * Props:
 *   service       e.g. "logistics" | "real-estate" | "car-hire"
 *   title         Headline ("Ready to ship with us?")
 *   subtitle      Optional supporting line
 */
export default function QuoteCTA({ service, title, subtitle }) {
  return (
    <section className="bg-ink py-20 text-white md:py-24">
      <div className="container-page text-center">
        <p className="eyebrow text-limebrand">
          <span className="eyebrow-dot" />
          Get a quote
        </p>
        <h2 className="mt-5 mx-auto max-w-3xl font-display text-4xl font-black tracking-[-0.05em] md:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-5 mx-auto max-w-xl text-white/70">{subtitle}</p>
        )}
        <Link
          to={`/quote?service=${service}`}
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-limebrand px-7 py-4 text-sm font-bold text-ink transition active:scale-[0.97] hover:-translate-y-0.5"
        >
          Request a quote
          <ArrowUpRight size={16} strokeWidth={2.6} />
        </Link>
      </div>
    </section>
  );
}