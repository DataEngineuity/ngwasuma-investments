import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center bg-ink pt-20 text-white">
      <div className="container-page py-24">
        <p className="eyebrow text-limebrand"><span className="eyebrow-dot" />404</p>
        <h1 className="mt-5 font-display text-7xl font-black tracking-[-0.08em]">Page not found.</h1>
        <p className="mt-5 max-w-xl text-white/70">The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="btn-primary mt-8">Back Home</Link>
      </div>
    </section>
  );
}
