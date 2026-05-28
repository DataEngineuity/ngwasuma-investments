import { useEffect, useMemo, useRef, useState } from 'react';
import { stats } from '../data/siteContent';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function splitMetricValue(value) {
  const rawValue = String(value);
  const match = rawValue.match(/^([^0-9.-]*)(-?\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return { isNumeric: false, text: rawValue };
  }

  const [, prefix, number, suffix] = match;
  const decimals = number.includes('.') ? number.split('.')[1].length : 0;

  return {
    isNumeric: true,
    prefix,
    target: Number(number),
    suffix,
    decimals,
  };
}

function useCountUp(target, shouldRun, { duration = 1400, startAt = 0, decimals = 0 } = {}) {
  const [value, setValue] = useState(startAt);

  useEffect(() => {
    if (!shouldRun) {
      setValue(startAt);
      return undefined;
    }

    if (prefersReducedMotion()) {
      setValue(target);
      return undefined;
    }

    let frameId;
    let startTime;

    const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const nextValue = startAt + (target - startAt) * eased;

      setValue(Number(nextValue.toFixed(decimals)));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [target, shouldRun, duration, startAt, decimals]);

  return value;
}

function AnimatedMetric({ value, active, index }) {
  const metric = useMemo(() => splitMetricValue(value), [value]);

  if (!metric.isNumeric) {
    return (
      <span
        className={`inline-block transition duration-700 ${
          active ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 90}ms` }}
      >
        {metric.text}
      </span>
    );
  }

  const currentValue = useCountUp(metric.target, active, {
    duration: 1200 + index * 140,
    startAt: 0,
    decimals: metric.decimals,
  });

  const displayValue =
    metric.decimals > 0 ? currentValue.toFixed(metric.decimals) : Math.round(currentValue);

  return (
    <span aria-label={value}>
      {metric.prefix}
      {displayValue}
      {metric.suffix}
    </span>
  );
}

export default function StatsGrid({ variant = 'default' }) {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const element = sectionRef.current;
    if (!element) return undefined;

    if (!('IntersectionObserver' in window)) {
      setActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const isCompact = variant === 'compact';

  const gridClass = isCompact
    ? 'grid gap-4 sm:grid-cols-2'
    : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4';

  const cardClass = isCompact
    ? 'rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-2xl'
    : 'rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-2xl';

  const metricClass = isCompact
    ? 'font-display text-4xl font-black leading-none tracking-[-0.06em] text-limebrand xl:text-5xl'
    : 'font-display text-5xl font-black tracking-[-0.07em] text-limebrand';

  return (
    <div ref={sectionRef} className={gridClass}>
      {stats.map((item, index) => (
        <div key={item.label} className={cardClass}>
          <p className={metricClass}>
            <AnimatedMetric value={item.value} active={active} index={index} />
          </p>
          <h3 className="mt-5 text-base font-black leading-snug text-ink sm:text-lg">
            {item.label}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}