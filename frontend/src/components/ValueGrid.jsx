import { CheckCircle2, Clock3, Crosshair, RadioTower, Truck, UsersRound } from 'lucide-react';
import { valueProps } from '../data/siteContent';

const icons = [Truck, UsersRound, Crosshair, CheckCircle2, Clock3, RadioTower];

export default function ValueGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {valueProps.map((item, index) => {
        const Icon = icons[index] || CheckCircle2;
        return (
          <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur">
            <Icon className="text-limebrand" size={28} />
            <h3 className="mt-6 text-xl font-black">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/68">{item.body}</p>
          </article>
        );
      })}
    </div>
  );
}
