import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Construction, Mail } from 'lucide-react';
import Seo from '../components/Seo';
import { contact } from '../data/siteContent';

/**
 * Generic "coming soon" page for features that are planned but not yet built.
 * Usage in App.jsx routes:
 *   { path: 'fleet-gallery',     element: <ComingSoon title="Fleet Gallery" /> }
 *   { path: 'track-shipments',   element: <ComingSoon title="Shipment Tracking" /> }
 *
 * Optional props:
 *   title          What the user was trying to reach (default: "This page")
 *   eta            Optional rough timeline ("Q3 2026", "soon", etc.)
 *   description    Override the default description
 */
export default function ComingSoon({
  title = 'This page',
  eta,
  description,
}) {
  const { pathname } = useLocation();

  const finalDescription =
    description ||
    `${title} is part of our roadmap — we're building it now. In the meantime, our team is on hand to help directly.`;

  return (
    <>
      <Seo
        title={`${title} — Coming Soon`}
        description={finalDescription}
        noindex
      />

      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink px-6 py-24 text-white md:py-32">
        {/* Decorative grid background — matches the brand chrome */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(168,220,47,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,220,47,1) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        {/* Animated pulse glow — subtle, communicates "active work in progress" */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(168,220,47,0.12) 0%, transparent 65%)',
          }}
        />

        <div className="relative mx-auto max-w-2xl text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-limebrand/30 bg-limebrand/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-limebrand">
            <Construction size={14} strokeWidth={2.2} />
            Under construction
          </div>

          {/* Title */}
          <h1 className="mt-8 font-display text-5xl font-black tracking-[-0.04em] md:text-7xl">
            {title}
            <span className="block text-limebrand">is on the way.</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
            {finalDescription}
          </p>

          {/* Optional ETA */}
          {eta && (
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-white/50">
              Expected · {eta}
            </p>
          )}

          {/* Actions */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink transition hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <ArrowLeft size={16} strokeWidth={2.4} />
              Back to home
            </Link>
            <a
              href={`mailto:${contact.email}?subject=Enquiry about ${encodeURIComponent(title)}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/5"
            >
              <Mail size={16} strokeWidth={2.2} />
              Email us instead
            </a>
          </div>

          {/* Subtle footnote */}
          <p className="mt-12 text-xs text-white/40">
            You arrived here from{' '}
            <code className="font-mono text-white/60">{pathname}</code>
          </p>
        </div>
      </section>
    </>
  );
}