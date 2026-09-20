import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { allProducts, productHref, visualFor } from "@/data/products";
import { pageSeo } from "@/data/seo";
import { absoluteUrl } from "@/lib/seo";

/** Last modification time of the newest source file behind a page (real dates, not "now"). */
function modified(...files: string[]): Date | undefined {
  let latest = 0;
  for (const file of files) {
    try {
      // (the sitemap is generated once at build time, so this must not pull the whole project
      // into the server bundle – hence the Turbopack ignore hint)
      latest = Math.max(latest, fs.statSync(path.join(/* turbopackIgnore: true */ process.cwd(), file)).mtimeMs);
    } catch {
      /* file missing in this environment – ignore */
    }
  }
  return latest ? new Date(latest) : undefined;
}

type Entry = MetadataRoute.Sitemap[number];

/** /sitemap.xml – every indexable page with its share of importance and its photos. */
export default function sitemap(): MetadataRoute.Sitemap {
  const shared = ["src/data/site.ts", "src/data/seo.ts"];

  const staticPages: Entry[] = [
    {
      url: absoluteUrl(pageSeo.home.path),
      lastModified: modified("src/app/page.tsx", "src/components/sections/Hero.tsx", ...shared),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl(pageSeo.software.path),
      lastModified: modified("src/app/software/page.tsx", "src/data/products.ts", ...shared),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(pageSeo.iotProducts.path),
      lastModified: modified("src/app/iot-products/page.tsx", "src/data/products.ts", ...shared),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const productPages: Entry[] = allProducts.map((product) => ({
    url: absoluteUrl(productHref(product)),
    lastModified: modified("src/data/products.ts", "src/components/sections/ProductDetailPage.tsx", ...shared),
    changeFrequency: "monthly",
    priority: 0.9,
    images: [absoluteUrl(visualFor(product).image)],
  }));

  const otherPages: Entry[] = [
    { key: "contact", file: "src/app/contact/page.tsx", priority: 0.8, changeFrequency: "yearly" },
    { key: "about", file: "src/app/about/page.tsx", priority: 0.7, changeFrequency: "yearly" },
    { key: "solutions", file: "src/app/solutions/page.tsx", priority: 0.7, changeFrequency: "monthly" },
    { key: "projects", file: "src/app/projects/page.tsx", priority: 0.7, changeFrequency: "monthly" },
    { key: "support", file: "src/app/support/page.tsx", priority: 0.6, changeFrequency: "yearly" },
    { key: "privacy", file: "src/app/privacy-policy/page.tsx", priority: 0.3, changeFrequency: "yearly" },
    { key: "terms", file: "src/app/terms-and-conditions/page.tsx", priority: 0.3, changeFrequency: "yearly" },
    { key: "sitemap", file: "src/app/sitemap/page.tsx", priority: 0.2, changeFrequency: "monthly" },
  ].map(({ key, file, priority, changeFrequency }) => ({
    url: absoluteUrl(pageSeo[key as keyof typeof pageSeo].path),
    lastModified: modified(file, ...shared),
    changeFrequency: changeFrequency as Entry["changeFrequency"],
    priority,
  }));

  return [...staticPages, ...productPages, ...otherPages];
}
