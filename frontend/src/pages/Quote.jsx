import Hero from '../components/Hero';
import QuoteForm from '../components/QuoteForm';
import SectionHeading from '../components/SectionHeading';

export default function Quote() {
  return (
    <>
      <Hero
        compact
        image="/assets/hero-home.webp"
        eyebrow="Get a quote"
        title="Request a"
        titleAccent="Quote"
        body="Tell us what you need and our team will respond with availability, pricing guidance or the next step."
        primary={null}
        secondary={null}
      />

      <section className="bg-fog py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="flex h-full flex-col">
            <SectionHeading
              eyebrow="Quote request"
              title="Tell us what you need. We’ll route it to the right team."
              body="Share a few details about your logistics, car hire, real estate or transport request. Our operations team will review it and respond with the next step, availability or pricing guidance."
            />

            <div className="mt-8 flex flex-1 flex-col rounded-[2rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-soft">
              <p className="font-black text-ink">What happens next?</p>

              <ul className="mt-4 space-y-3">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-limebrand" />
                  <span>Your request is sent to the relevant service team.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-limebrand" />
                  <span>We confirm the key details by phone or email.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-limebrand" />
                  <span>You receive guidance on pricing, availability or next steps.</span>
                </li>
              </ul>

              <div className="mt-auto rounded-2xl bg-fog p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Urgent request?</p>
                <p className="mt-2 font-black text-ink">Call / WhatsApp</p>
                <a href="tel:+260770515196" className="mt-1 block font-bold text-moss transition hover:text-ink">
                  +260 770 51 51 96
                </a>
              </div>
            </div>
          </div>

          <QuoteForm />
        </div>
      </section>
    </>
  );
}
