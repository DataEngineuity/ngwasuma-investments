import { useHead } from '@unhead/react';
import { useLocation } from 'react-router-dom';
import { seo } from '../data/siteContent';

/**
 * Per-page SEO component.
 *
 * @param {string} title         Page-specific title (will be wrapped in template)
 * @param {string} description   1-2 sentence description for search snippet
 * @param {string} [image]       Absolute URL of social-share image (1200×630 recommended)
 * @param {string} [type]        OG type: 'website' (default) or 'article'
 * @param {object} [jsonLd]      Optional structured-data object (e.g. Service, LocalBusiness)
 * @param {boolean} [noindex]    Set true to hide the page from search engines
 */
export default function Seo({
  title,
  description,
  image,
  type = 'website',
  jsonLd,
  noindex = false,
}) {
  const { pathname } = useLocation();
  const url = `${seo.siteUrl}${pathname}`;
  const finalTitle = title ? seo.titleTemplate.replace('%s', title) : seo.defaultTitle;
  const finalDescription = description || seo.defaultDescription;
  const finalImage = image || seo.defaultImage;

  useHead({
    title: finalTitle,
    meta: [
      { name: 'description', content: finalDescription },
      ...(noindex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),

      // Open Graph (WhatsApp, Facebook, LinkedIn, Slack, Discord)
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: seo.siteName },
      { property: 'og:title', content: finalTitle },
      { property: 'og:description', content: finalDescription },
      { property: 'og:url', content: url },
      { property: 'og:image', content: finalImage },
      { property: 'og:locale', content: seo.locale },

      // Twitter / X
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: seo.twitterHandle },
      { name: 'twitter:title', content: finalTitle },
      { name: 'twitter:description', content: finalDescription },
      { name: 'twitter:image', content: finalImage },
    ],
    link: [
      { rel: 'canonical', href: url },
    ],
    script: jsonLd
      ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }]
      : [],
  });

  return null;
}