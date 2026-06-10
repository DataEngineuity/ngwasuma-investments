import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

function SmartLink({ href, className, children }) {
  const isExternal =
    href?.startsWith('http') ||
    href?.startsWith('mailto:') ||
    href?.startsWith('tel:');

  if (isExternal) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

export default function Hero({
  eyebrow = 'Precision meets reliability',
  title,
  titleAccent,
  body,
  image,
  imageAlt = '',
  primary = { label: 'Get a Quote', href: '/quote' },
  secondary = { label: 'View Services', href: '/services' },
  compact = false,
  variant = 'overlay',
}) {
  if (variant === 'split') {
    return (
      <section className="relative overflow-hidden bg-[#adadad] text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/12 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/8 to-transparent" />

        <div className="container-page relative grid items-center gap-8 pb-16 pt-20 md:min-h-[720px] md:pt-36 lg:min-h-[690px] lg:grid-cols-[0.38fr_0.62fr] lg:gap-4 lg:pt-38 xl:min-h-[740px]">

          {/* TEXT BLOCK — second on mobile, first on lg */}
          <div className="order-2 max-w-[31rem] lg:order-1">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/45 bg-white/35 px-4 py-2 text-sm font-bold text-ink/85 shadow-sm backdrop-blur">
              <ShieldCheck size={17} className="text-limebrand" />
              {eyebrow}
            </div>

            <h1 className="font-display text-[clamp(4rem,5.7vw,6.2rem)] font-light leading-[0.9] tracking-[-0.075em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)]">
              {title}
              {titleAccent && (
                <span className="block font-black text-limebrand">
                  {titleAccent}
                </span>
              )}
            </h1>

            {body && (
              <p className="mt-8 max-w-[30rem] text-lg leading-8 text-white/95 md:text-xl">
                {body}
              </p>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {primary && (
                <SmartLink href={primary.href} className="btn-primary">
                  {primary.label} <ArrowRight size={18} />
                </SmartLink>
              )}

              {secondary && (
                <SmartLink
                  href={secondary.href}
                  className="btn-secondary !border-white/45 !bg-white/35 !text-ink shadow-sm backdrop-blur hover:!bg-white/60"
                >
                  {secondary.label}
                </SmartLink>
              )}
            </div>
          </div>

          {/* IMAGE BLOCK — first on mobile, second on lg */}
          <div className="order-1 flex items-center justify-end lg:order-2 lg:pl-2">
            <img
              src={image}
              alt={imageAlt}
              className="w-full max-w-[980px] object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.14)] lg:translate-x-3 xl:translate-x-6"
            />
          </div>

        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative isolate overflow-hidden bg-ink text-white ${
        compact ? 'min-h-[58vh]' : 'min-h-screen'
      }`}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/82 to-ink/25" />
      <div className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:42px_42px] opacity-20" />
      <div className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-limebrand/20 blur-3xl" />

      <div className="container-page flex min-h-[inherit] items-center pb-24 pt-32">
        <div className="max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/85 backdrop-blur">
            <ShieldCheck size={17} className="text-limebrand" />
            {eyebrow}
          </div>

          <h1 className="font-display text-6xl font-black leading-[0.86] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
            {title}
            {titleAccent && (
              <span className="block text-limebrand">
                {titleAccent}
              </span>
            )}
          </h1>

          {body && (
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/76 md:text-xl">
              {body}
            </p>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {primary && (
              <SmartLink href={primary.href} className="btn-primary">
                {primary.label} <ArrowRight size={18} />
              </SmartLink>
            )}

            {secondary && (
              <SmartLink href={secondary.href} className="btn-secondary">
                {secondary.label}
              </SmartLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}