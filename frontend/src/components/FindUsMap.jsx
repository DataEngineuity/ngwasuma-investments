import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

const LIME = '#A8DC2F';
const LIME_DEEP = '#8FBC1E';
const EMERALD = '#0E2B26';

const ADDRESS = {
  line1: 'Plot #1613, Off Chipandwe Road',
  line2: 'Ibex Meanwood, Lusaka',
  line3: 'Lusaka Province, Zambia',
  phone: '+260 770 51 51 96',
  phoneHref: 'tel:+260770515196',
  email: 'info@ngwasumainvestments.com',
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Plot+%231613+Off+Chipandwe+Road+Ibex+Meanwood+Lusaka+Zambia',
};

export default function FindUs({ embedSrc, eyebrow = '07 / Find us', compact = false }) {
  return (
    <section
      className={`px-6 md:px-12 ${compact ? 'py-12' : 'py-20 md:py-28'}`}
      style={{ backgroundColor: '#fff' }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          {/* Left column: heading + address + CTA */}
          <div className="md:col-span-5">
            <div
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em]"
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                color: 'rgba(10,26,23,0.55)',
              }}
            >
              <span style={{ color: LIME_DEEP, fontSize: 10 }}>●</span>
              {eyebrow}
            </div>

            <h2
              className="mt-6"
              style={{
                fontFamily: '"Onest", system-ui, sans-serif',
                fontSize: 'clamp(40px, 4.8vw, 72px)',
                lineHeight: 0.92,
                fontWeight: 300,
                letterSpacing: '-0.035em',
                color: EMERALD,
              }}
            >
              Come{' '}
              <span
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontStyle: 'italic',
                  color: LIME_DEEP,
                }}
              >
                through.
              </span>
            </h2>

            <p
              className="mt-6 text-[15.5px] leading-relaxed"
              style={{ color: 'rgba(10,26,23,0.7)' }}
            >
              Our offices are in Ibex Meanwood, just off Chipandwe Road. Drop in during
              business hours, or call ahead to schedule a meeting.
            </p>

            <div className="mt-8 space-y-4 text-[14px]">
              <div className="flex items-start gap-3" style={{ color: EMERALD }}>
                <MapPin
                  size={16}
                  color={LIME_DEEP}
                  className="mt-0.5 flex-shrink-0"
                  strokeWidth={1.8}
                />
                <div>
                  <div className="font-semibold">{ADDRESS.line1}</div>
                  <div style={{ color: 'rgba(10,26,23,0.7)' }}>{ADDRESS.line2}</div>
                  <div style={{ color: 'rgba(10,26,23,0.7)' }}>{ADDRESS.line3}</div>
                </div>
              </div>

              <div className="flex items-center gap-3" style={{ color: EMERALD }}>
                <Phone size={16} color={LIME_DEEP} strokeWidth={1.8} />
                <a href={ADDRESS.phoneHref} className="hover:underline">
                  {ADDRESS.phone}
                </a>
              </div>

              <div className="flex items-center gap-3" style={{ color: EMERALD }}>
                <Mail size={16} color={LIME_DEEP} strokeWidth={1.8} />
                <a href={`mailto:${ADDRESS.email}`} className="hover:underline">
                  {ADDRESS.email}
                </a>
              </div>
            </div>


              href={ADDRESS.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[14px] font-semibold transition-transform active:scale-[0.97]"
              style={{ backgroundColor: EMERALD, color: '#fff' }}
            >
              Get directions
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ backgroundColor: LIME }}
              >
                <ArrowUpRight size={14} color={EMERALD} strokeWidth={2.6} />
              </span>
            </a>
          </div>

          {/* Right column: embedded map */}
          <div className="md:col-span-7">
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-[6px] border"
              style={{ borderColor: 'rgba(14,43,38,0.12)' }}
            >
              {embedSrc ? (
                <iframe
                  title="Ngwasuma Investments — office location"
                  src={embedSrc}
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center text-[13px]"
                  style={{ backgroundColor: '#F5F5F0', color: 'rgba(10,26,23,0.5)' }}
                >
                  Map embed URL not set — pass the <code className="mx-1">embedSrc</code> prop.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}