export default function SectionHeading({ eyebrow, title, body, align = 'left' }) {
  const isCenter = align === 'center';
  return (
    <div className={isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && (
        <p className={`eyebrow ${isCenter ? 'justify-center' : ''}`}>
          <span className="eyebrow-dot" />
          {eyebrow}
        </p>
      )}
      <h2 className="section-title mt-5">{title}</h2>
      {body && <p className="section-copy mt-6">{body}</p>}
    </div>
  );
}
