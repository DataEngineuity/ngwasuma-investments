import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PageIntro({ title, body, ctaLabel = 'Get a Quote', ctaHref = '/quote' }) {
  return (
    <section className="bg-fog py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="eyebrow"><span className="eyebrow-dot" />Services</p>
          <h2 className="section-title mt-5">{title}</h2>
          <p className="mt-4 text-sm font-semibold text-slate-500">Navigate global trade with experts in modern logistic systems that timely deliver.</p>
          {ctaLabel && (
            <Link to={ctaHref} className="btn-dark mt-8">
              {ctaLabel} <ArrowRight size={18} />
            </Link>
          )}
        </div>
        <div className="rounded-[2rem] bg-white p-7 text-slate-600 shadow-soft md:p-10">
          <p className="section-copy">{body}</p>
        </div>
      </div>
    </section>
  );
}
