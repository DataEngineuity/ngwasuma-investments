# Scripts

## og-image.html

Template for generating the social-share preview image (1200×630).
The exported JPG is referenced by the `<Seo />` component and shown as the
link preview on WhatsApp, LinkedIn, Facebook, Slack, etc.

### How to regenerate

1. Open `og-image.html` in Chrome.
2. Press `F12` to open DevTools.
3. In the Elements panel, find the `<div class="og">` element.
4. Right-click it → "Capture node screenshot".
5. The downloaded PNG is your new OG image.
6. Convert to JPG (any image tool) and save as `public/og-image.jpg`.
7. Commit the new image to git.

### Per-route variants

To make a variant for a specific service page, duplicate this file
(e.g. `og-logistics.html`) and edit the headline text. Then export
as `public/og-logistics.jpg` and reference it on the page:

```jsx
<Seo
  title="Logistics — Precision Beyond Borders"
  image="https://ngwasumainvestments.com/og-logistics.jpg"
/>
```