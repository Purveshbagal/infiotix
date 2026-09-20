import { homeFaqs, pageSeo, productSeo } from "@/data/seo";
import { allProducts, productHref, visualFor, type ProductDetail } from "@/data/products";
import { company } from "@/data/site";
import {
  absoluteUrl,
  BRAND_ALIASES,
  SITE_LANG,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/lib/seo";

/** schema.org / JSON-LD builders. Only facts that are already true and visible on the site. */

type Node = Record<string, unknown>;

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

const PHONE_INTL = "+91 70584 09290";

const graph = (nodes: Node[]): Node => ({ "@context": "https://schema.org", "@graph": nodes });

/* ------------------------------------------------------------------ */
/*  Site-wide: organisation + website                                  */
/* ------------------------------------------------------------------ */

export function organizationNode(): Node {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: [...BRAND_ALIASES],
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: absoluteUrl("/images/logo-tight.png"),
      contentUrl: absoluteUrl("/images/logo-tight.png"),
      width: 388,
      height: 390,
      caption: SITE_NAME,
    },
    image: absoluteUrl("/og/home"),
    description: pageSeo.home.description,
    slogan: company.tagline,
    email: company.email,
    telephone: PHONE_INTL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: PHONE_INTL,
        email: company.email,
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: PHONE_INTL,
        email: company.email,
        availableLanguage: "English",
      },
    ],
    knowsAbout: [
      "Software development",
      "Hospital management software",
      "School management software",
      "Gym management software",
      "Custom software development",
      "Internet of Things",
      "Smart door locks",
      "Water tank level monitoring",
      "Home automation",
      "Smart video door bells",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software and IoT solutions",
      itemListElement: allProducts.map((product) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": productSeo[product.slug]?.schemaType ?? "Product",
          name: product.name,
          url: absoluteUrl(productHref(product)),
        },
      })),
    },
    ...(SOCIAL_PROFILES.length > 0 && { sameAs: SOCIAL_PROFILES }),
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: absoluteUrl("/"),
    name: SITE_NAME,
    alternateName: [...BRAND_ALIASES],
    description: pageSeo.home.description,
    inLanguage: SITE_LANG,
    publisher: { "@id": ORG_ID },
  };
}

/** Emitted once from the root layout, so every page carries the brand entity. */
export const siteGraph = (): Node => graph([organizationNode(), websiteNode()]);

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

export function webPageNode(options: {
  path: string;
  name: string;
  description: string;
  type?: PageType;
  /** @id of the thing the page is about (defaults to the organisation) */
  aboutId?: string;
  /** Absolute URL of the page's main image */
  image?: string;
  mainEntity?: Node;
}): Node {
  const url = absoluteUrl(options.path);
  return {
    "@type": options.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    inLanguage: SITE_LANG,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": options.aboutId ?? ORG_ID },
    ...(options.image && {
      primaryImageOfPage: { "@type": "ImageObject", url: options.image },
    }),
    ...(options.mainEntity && { mainEntity: options.mainEntity }),
  };
}

export function breadcrumbSchema(items: { label: string; href?: string }[]): Node {
  const trail = [{ label: "Home", href: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      // the current page (last crumb) has no link, which schema.org allows
      ...(crumb.href && index < trail.length - 1 && { item: absoluteUrl(crumb.href) }),
    })),
  };
}

export function faqNode(path: string, items: { q: string; a: string }[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function itemListNode(name: string, items: { name: string; path: string }[]): Node {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

/** A whole page's graph: the WebPage node plus anything extra (FAQ, list, product ...). */
export const pageGraph = (nodes: Node[]): Node => graph(nodes);

/* ------------------------------------------------------------------ */
/*  Ready-made graphs for the standard pages                           */
/* ------------------------------------------------------------------ */

type PageKey = keyof typeof pageSeo;

/** WebPage (or AboutPage / ContactPage) for a page listed in data/seo.ts, plus optional extras. */
export function simplePageGraph(key: PageKey, type: PageType = "WebPage", extra: Node[] = []): Node {
  const seo = pageSeo[key];
  return pageGraph([
    webPageNode({ path: seo.path, name: seo.title, description: seo.description, type }),
    ...extra,
  ]);
}

/** A listing page (all software, all IoT products ...) with its ItemList and optional FAQ. */
export function listingGraph(
  key: PageKey,
  listName: string,
  products: ProductDetail[],
  faqs?: { q: string; a: string }[],
): Node {
  const seo = pageSeo[key];
  return pageGraph([
    webPageNode({
      path: seo.path,
      name: seo.title,
      description: seo.description,
      type: "CollectionPage",
      mainEntity: itemListNode(
        listName,
        products.map((product) => ({ name: product.name, path: productHref(product) })),
      ),
    }),
    ...(faqs?.length ? [faqNode(seo.path, faqs)] : []),
  ]);
}

/* ------------------------------------------------------------------ */
/*  Home                                                               */
/* ------------------------------------------------------------------ */

export function homeGraph(): Node {
  return pageGraph([
    webPageNode({
      path: "/",
      name: pageSeo.home.title,
      description: pageSeo.home.description,
      image: absoluteUrl("/og/home"),
    }),
    faqNode("/", homeFaqs),
  ]);
}

/* ------------------------------------------------------------------ */
/*  Product pages                                                      */
/* ------------------------------------------------------------------ */

export function productGraph(product: ProductDetail): Node {
  const seo = productSeo[product.slug];
  const path = productHref(product);
  const url = absoluteUrl(path);
  const productId = `${url}#product`;
  const image = absoluteUrl(visualFor(product).image);

  const common = {
    "@id": productId,
    name: product.name,
    alternateName: seo?.alternateNames,
    description: seo?.description ?? product.summary,
    url,
    image: [image],
    mainEntityOfPage: { "@id": `${url}#webpage` },
  };

  let mainNode: Node;
  if (seo?.schemaType === "SoftwareApplication") {
    mainNode = {
      "@type": "SoftwareApplication",
      ...common,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      featureList: product.features.map((feature) => feature.title),
      audience: { "@type": "Audience", audienceType: product.audience.join(", ") },
      provider: { "@id": ORG_ID },
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
    };
  } else if (seo?.schemaType === "Service") {
    mainNode = {
      "@type": "Service",
      ...common,
      serviceType: product.name,
      audience: { "@type": "Audience", audienceType: product.audience.join(", ") },
      provider: { "@id": ORG_ID },
    };
  } else {
    mainNode = {
      "@type": "Product",
      ...common,
      brand: { "@type": "Brand", name: "Infiotix" },
      manufacturer: { "@id": ORG_ID },
      category: "IoT & smart home devices",
      audience: { "@type": "Audience", audienceType: product.audience.join(", ") },
      additionalProperty: product.features.map((feature) => ({
        "@type": "PropertyValue",
        name: "Feature",
        value: feature.title,
      })),
    };
  }

  return pageGraph([
    webPageNode({
      path,
      name: seo?.title ?? product.name,
      description: seo?.description ?? product.summary,
      aboutId: productId,
      image,
    }),
    mainNode,
    faqNode(path, product.faqs),
  ]);
}
