import { Link } from 'react-router-dom';

export default function BrandLogo({ dark = false, className = '' }) {
  if (dark) {
    return (
      <Link to="/" className={`inline-flex items-center ${className}`} aria-label="Ngwasuma Investments home">
        <img
          src="/assets/ngwasuma-logo-all-black.png"
          alt="Ngwasuma Investments"
          className="h-11 w-auto max-w-[230px] object-contain"
          loading="eager"
        />
      </Link>
    );
  }

  return (
    <Link to="/" className={`group inline-flex items-center gap-3 ${className}`} aria-label="Ngwasuma Investments home">
      <img
        src="/assets/ngwasuma-logo-mark-lime.png"
        alt=""
        aria-hidden="true"
        className="h-9 w-9 object-contain transition duration-300 group-hover:scale-105"
        loading="eager"
      />
      <span className="font-display text-xl font-black tracking-[-0.08em] text-white">ngwasuma</span>
    </Link>
  );
}
