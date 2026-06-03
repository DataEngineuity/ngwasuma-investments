import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function checkVisibility() {
      const scrollablePage = document.documentElement.scrollHeight > window.innerHeight + 900;
      const pastThreshold = window.scrollY > 650;

      setVisible(scrollablePage && pastThreshold);
    }

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 hidden h-12 w-12 items-center justify-center rounded-full bg-limebrand text-ink shadow-2xl ring-1 ring-ink/10 transition hover:-translate-y-1 hover:bg-white md:flex"
      aria-label="Return to top"
    >
      <ArrowUp size={21} strokeWidth={2.8} />
    </button>
  );
}