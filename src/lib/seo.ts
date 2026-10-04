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
 * The company's own public profiles, in one place.
 *
 * Two things read this list: the footer icons and the Organization `sameAs` structured data.
 * `sameAs` pointing at verified profiles is the strongest signal Google has for treating
 * "Infiotix Technologies" as its own company rather than a misspelling of a similar brand,
 * so filling this in is the highest-value item left on the SEO list.
 *
 * Rules:
 *  - Only ever add a URL that really belongs to Infiotix Technologies and opens the company's
 *    own page. A link to a platform's home page (e.g. https://www.linkedin.com) is worse than
 *    no link: it is a dead end for visitors and tells search engines nothing.
 *  - `platform` picks the footer icon. Supported: "LinkedIn" | "YouTube" | "Instagram" | "Facebook".
 *  - Anything without an icon (a Google Business Profile, for example) can still be listed with
 *    `footer: false`; it is then used for structured data only.
 *
 * Example once the accounts exist:
 *   { platform: "LinkedIn", url: "https://www.linkedin.com/company/infiotix" },
 *   { platform: "Instagram", url: "https://www.instagram.com/infiotix" },
 *   { url: "https://www.google.com/maps/place/?q=place_id:<your-place-id>", footer: false },
 */
export type SocialProfile = {
  /** Picks the footer icon. Omit for a profile that should only appear in structured data. */
  platform?: "LinkedIn" | "YouTube" | "Instagram" | "Facebook";
  url: string;
  /** Set false to keep a profile out of the footer but still declare it to search engines. */
  footer?: boolean;
};

export const socialProfiles: SocialProfile[] = [];

/** Profile URLs for the Organization `sameAs` list. */
export const SOCIAL_PROFILES: string[] = socialProfiles.map((profile) => profile.url);

/** Profiles that have an icon and should be shown in the footer. */
export const footerSocialProfiles = socialProfiles.filter(
  (profile): profile is SocialProfile & { platform: NonNullable<SocialProfile["platform"]> } =>
    profile.footer !== false && !!profile.platform,
);

/**
 * Business details that search engines use but that must never be guessed.
 *
 * Everything here is optional and empty by default. The Organization structured data only
 * emits a field once it has a real value, so leaving a blank is always safe – it simply means
 * that detail is not claimed. Fill a value in only when it is the verified, public truth.
 *
 * Why it matters:
 *  - `streetAddress` + `postalCode` complete the PostalAddress. Once both are set, the address
 *    in the structured data matches the address on a Google Business Profile, which is what
 *    links the website to the map listing. Until then only the city is claimed, which is
 *    accurate and carries no risk.
 *  - `foundingDate` ("2020" or "2020-06-01") gives the company entity an age. The home page
 *    already shows "5+ Years Experience", so this should be the real founding year.
 *
 * IMPORTANT: do not enable `localBusiness` until `streetAddress` and `postalCode` are both
 * real. LocalBusiness schema with an incomplete or invented address can earn a manual action
 * in Google Search Console.
 */
export const BUSINESS_PROFILE: {
  streetAddress: string;
  postalCode: string;
  foundingDate: string;
  localBusiness: boolean;
} = {
  /** e.g. "Office 204, Example Business Park, Baner Road" – leave "" until verified. */
  streetAddress: "",
  /** e.g. "411045" – leave "" until verified. */
  postalCode: "",
  /** e.g. "2020" or "2020-06-01" – leave "" until known. */
  foundingDate: "",
  /**
   * Turn on only when streetAddress AND postalCode above hold the real, verified address.
   * See LOCAL_SEO_CHECKLIST.md for the steps before and after flipping this.
   */
  localBusiness: false,
};

/** The places Infiotix Technologies serves. Already stated in the visible site copy. */
export const AREAS_SERVED = [
  { type: "City", name: "Pune" },
  { type: "AdministrativeArea", name: "Maharashtra" },
  { type: "Country", name: "India" },
] as const;

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
