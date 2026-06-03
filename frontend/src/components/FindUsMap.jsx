import { ArrowUpRight, MapPin } from 'lucide-react';
import { contact } from '../data/siteContent';

export default function FindUsMap() {
  const hasMap = Boolean(contact.mapEmbedSrc);

  return (
    <section
      id="office-location"
      className="relative isolate scroll-mt-28 overflow-hidden bg-fog py-14 text-ink md:scroll-mt-32 md:py-16"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-limebrand/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-ink/5 blur-3xl" />

      <div className="container-page">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-ink/60">
              <span className="eyebrow-dot" />
              Find us
            </p>

            <h2 className="mt-4 font-display text-4xl font-black leading-none tracking-[-0.06em] md:text-5xl">
              Visit our <span className="text-limebrand">office</span>.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Our offices are in Ibex Meanwood, just off Chipandwe Road. Use the map
              below or open directions in Google Maps.
            </p>
          </div>

          {contact.directionsUrl && (
            <a
              href={contact.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-limebrand hover:text-ink"
            >
              Get directions
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-limebrand text-ink transition group-hover:bg-ink group-hover:text-white">
                <ArrowUpRight size={14} strokeWidth={2.8} />
              </span>
            </a>
          )}
        </div>

        <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft lg:grid-cols-[0.45fr_0.55fr]">
          <div className="flex flex-col justify-center p-6 md:p-8 lg:min-h-[360px]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-limebrand text-ink">
              <MapPin size={22} />
            </div>

            <h3 className="mt-5 text-lg font-black text-ink">
              {contact.company || 'Ngwasuma Investments Limited'}
            </h3>

            <address className="mt-3 not-italic text-sm leading-7 text-slate-600">
              <span className="block">Plot #1613, Off Chipandwe Road,</span>
              <span className="block">Ibex Meanwood, Lusaka,</span>
              <span className="block">Lusaka Province, Zambia</span>
            </address>

            {contact.directionsUrl && (
              <a
                href={contact.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-black text-moss transition hover:text-ink"
              >
                Open in Google Maps
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>

          <div className="min-h-[320px] overflow-hidden border-t border-slate-200 lg:min-h-[360px] lg:border-l lg:border-t-0">
            {hasMap ? (
              <iframe
                title={`${contact.company} office location`}
                src={contact.mapEmbedSrc}
                className="h-[320px] w-full lg:h-[390px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="flex h-[320px] items-center justify-center px-5 text-center text-sm text-slate-500 lg:h-[360px]">
                Map location is not configured.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}