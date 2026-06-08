const env = import.meta.env || {};

export const contact = {
  company: 'Ngwasuma Investments Limited',
  email: 'info@ngwasumainvestments.com',
  phone: '+260 770 51 51 96',
  address: 'Plot #1613, Off Chipandwe Road, Ibex Meanwood, Lusaka, Lusaka Province, Zambia',
  locationLabel: 'Ibex Meanwood, Lusaka',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-15.407471,28.429363',
  mapEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d5163.62834883761!2d28.429363275122153!3d-15.407470685180217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTXCsDI0JzI2LjkiUyAyOMKwMjUnNTUuMCJF!5e1!3m2!1sen!2szm!4v1780480714245!5m2!1sen!2szm',
};

export const seo = {
  siteName: 'Ngwasuma Investments',
  legalName: 'Ngwasuma Investments Limited',
  siteUrl: 'https://ngwasumainvestments.com',
  defaultTitle: 'Ngwasuma Investments Limited — Logistics, Real Estate & Car Hire in Zambia and the SADC region.',
  titleTemplate: '%s — Ngwasuma Investments',
  defaultDescription:
    'Ngwasuma Investments Limited delivers reliable logistics, residential leasing, and car hire across Zambia and the SADC region. Precision meets reliability.',
  defaultImage: 'https://ngwasumainvestments.com/og-image.jpg',
  locale: 'en_ZM',
  twitterHandle: '@ngwasumainvests',
};

export const socialLinks = [
  { label: 'Facebook', href: env.VITE_FACEBOOK_URL || '#' },
  { label: 'LinkedIn', href: env.VITE_LINKEDIN_URL || '#' },
  { label: 'X', href: env.VITE_X_URL || '#' },
  { label: 'Instagram', href: env.VITE_INSTAGRAM_URL || '#' },
];

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Logistics', href: '/services/logistics' },
  { label: 'Real Estate', href: '/services/real-estate' },
  { label: 'Car Hire', href: '/services/car-hire' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const services = [
  {
    slug: 'logistics',
    title: 'Logistics',
    kicker: 'Precision Beyond Borders',
    image: '/assets/service-logistics.webp',
    href: '/services/logistics',
    summary:
      'Reliable movement of goods, long-haulage, recovery and value-chain solutions across Zambia, the SADC region and global supply networks.',
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    kicker: 'Curating Better Structures',
    image: '/assets/service-real-estate.webp',
    href: '/services/real-estate',
    summary:
      'Professional residential leasing and property coordination for tenants and owners who value trust, comfort and transparent management.',
  },
  {
    slug: 'car-hire',
    title: 'Car Hire',
    kicker: 'Let’s Get You Moving',
    image: '/assets/service-car-hire.webp',
    href: '/services/car-hire',
    summary:
      'Flexible economy, executive, chauffeur, airport, staff, event and long-distance passenger transport solutions.',
  },
];

export const stats = [
  { value: 'SADC', label: 'Regional Footprint', detail: 'Zambia and the SADC region' },
  { value: '85%+', label: 'Fleet Utilization', detail: 'Target uptime and availability' },
  { value: '90%', label: 'Client Satisfaction', detail: 'Service response target' },
  { value: 'GPS', label: 'Equipped Fleet', detail: 'Tracked and maintained assets' },
];

export const valueProps = [
  { title: 'Reliable Fleet', body: 'GPS-equipped and well-maintained vehicles for dependable operations.' },
  { title: 'Experienced Team', body: 'People committed to service excellence, safety and operational discipline.' },
  { title: 'Client-Centric', body: 'Flexible, tailored solutions built around each client’s operational needs.' },
  { title: 'Multi-Sector', body: 'Transport, logistics, real estate and support across diverse sectors.' },
  { title: 'On-Time Delivery', body: 'Punctuality, uptime and clear communication from dispatch to completion.' },
  { title: 'Technology-Driven', body: 'Dispatch coordination, tracking and proactive communication for visibility.' },
];

export const carHireServices = [
  {
    title: 'Economy & Executive',
    body: 'Small cars for day-to-day movement and executive sedans, 4x4s or pick-ups for out-of-town and heavy errands.',
    image: '/assets/vehicle-suv.webp',
  },
  {
    title: 'Chauffeur & Airport',
    body: 'Airport pick-ups, drop-offs and itinerary-led chauffeur movement for conferences, tourism and executive travel.',
    image: '/assets/chauffeur.webp',
  },
  {
    title: 'Staff Transport',
    body: 'Secure and versatile transport options for teams, including 24-hour economy shift requirements.',
    image: '/assets/group-transport.webp',
  },
  {
    title: 'Guest & Event Transport',
    body: 'Smooth guest movement for work events, weddings and celebrations where comfort and timing matter.',
    image: '/assets/event-car.webp',
  },
  {
    title: 'Long Distance Passenger',
    body: 'Dependable inter-provincial and rural transport backed by diverse all-terrain fleet capabilities.',
    image: '/assets/vehicle-sedan.webp',
  },
];

export const logisticsServices = [
  {
    title: 'Long Haulage',
    body: 'Secure, timely overland transport across regional and international routes with experienced drivers, modern fleets and strict safety standards.',
    image: '/assets/long-haulage.webp',
  },
  {
    title: 'Recovery Services',
    body: 'Fast, professional recovery for vehicles, equipment and assets, delivered with compliance, care and operational urgency.',
    image: '/assets/recovery-truck.webp',
  },
];

export const residentialImages = [
  '/assets/real-estate-home.webp',
  '/assets/real-estate-leasing.webp',
  '/assets/real-estate-apartments.webp',
];

export const quoteLinks = {
  default: '/quote',
  logistics: '/quote?service=logistics',
  realEstate: '/quote?service=real-estate',
  carHire: '/quote?service=car-hire',
};