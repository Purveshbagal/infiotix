import type { Metadata } from "next";
import { pageSeo, productSeo, type SeoEntry } from "@/data/seo";

/* ------------------------------------------------------------------ */
/*  Site identity                                                      */
/* ------------------------------------------------------------------ */

/**
 * Public address of the live website (no trailing slash).
 * Set NEXT_PUBLIC_SITE_URL in the hosting environment if the domain is not infiotix.com
 * (for example https://www.infiotix.com) – canonical links, the sitemap, robots.txt,
 * share images and structured data all follow it.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://infiotix.com").replace(/\/+$/, "");

export const SITE_NAME = "Infiotix Technologies";
/** Other names people search for; used in structured data so search engines connect them */
export const BRAND_ALIASES = ["Infiotix", "Infiotix Technology"] as const;
export const SITE_LANG = "en-IN";
export const SITE_LOCALE = "en_IN";

/**
 * Real public profile URLs (LinkedIn page, YouTube channel, Instagram, Facebook, Google
 * Business Profile ...). They are added to the Organization structured data as `sameAs`,
 * which helps Google connect the brand's accounts. Leave empty until they exist – wrong
 * URLs would do more harm than none.
 */
export const SOCIAL_PROFILES: string[] = [];

export const OG_SIZE = { width: 1200, height: 630 } as const;

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  // the home page is written without a trailing slash everywhere (canonical, sitemap, schema)
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ogImageUrl = (key: string) => absoluteUrl(`/og/${key}`);

/* ------------------------------------------------------------------ */
/*  Per-page metadata                                                  */
/* ------------------------------------------------------------------ */

type MetadataInput = Pick<SeoEntry, "title" | "description" | "keywords" | "og"> & {
  path: string;
  noindex?: boolean;
};

/**
 * Full, self-consistent metadata for one page: title, description, keywords, canonical URL,
 * Open Graph + Twitter cards (with the generated share image) and robots directives.
 *
 * `openGraph` / `twitter` are replaced (not merged) per page by Next.js, so every page
 * has to supply them completely – that is what this helper is for.
 */
export function buildMetadata(entry: MetadataInput): Metadata {
  const url = absoluteUrl(entry.path);
  const image = {
    url: ogImageUrl(entry.og.key),
    width: OG_SIZE.width,
    height: OG_SIZE.height,
    alt: `${entry.og.title} – ${SITE_NAME}`,
  };

  return {
    title: { absolute: entry.title },
    description: entry.description,
    keywords: entry.keywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      title: entry.title,
      description: entry.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: [{ url: image.url, alt: image.alt }],
    },
    robots: {
      index: !entry.noindex,
      follow: true,
      googleBot: {
        index: !entry.noindex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/** Metadata for a static page listed in `data/seo.ts`. */
export const pageMetadata = (key: keyof typeof pageSeo, options?: { noindex?: boolean }): Metadata =>
  buildMetadata({ ...pageSeo[key], ...options });

/** Metadata for a product detail page (`/software/<slug>` or `/iot-products/<slug>`). */
export function productMetadata(slug: string, path: string): Metadata {
  const seo = productSeo[slug];
  if (!seo) return {};
  return buildMetadata({ ...seo, path });
}
