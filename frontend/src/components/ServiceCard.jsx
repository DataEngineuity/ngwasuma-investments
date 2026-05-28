import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <Link
      to={service.href}
      className="group relative min-h-[430px] overflow-hidden rounded-[2rem] bg-ink shadow-soft"
    >
      <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/58 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-7 text-white">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-limebrand">{service.kicker}</p>
        <div className="mt-4 flex items-end justify-between gap-5">
          <div>
            <h3 className="font-display text-4xl font-black tracking-[-0.06em]">{service.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/72">{service.summary}</p>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-limebrand text-ink transition group-hover:-translate-y-1 group-hover:translate-x-1">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </div>
    </Link>
  );
}
