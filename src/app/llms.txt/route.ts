import { allProducts, iotDetails, productHref, softwareDetails } from "@/data/products";
import { company } from "@/data/site";
import { pageSeo, productSeo } from "@/data/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

export const dynamic = "force-static";

const line = (name: string, path: string, note: string) => `- [${name}](${absoluteUrl(path)}): ${note}`;

/**
 * /llms.txt – a short, plain-text map of the site for AI assistants and answer engines
 * (an emerging convention, https://llmstxt.org). Generated from the same data as the pages.
 */
export function GET() {
  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${pageSeo.home.description}`,
    "",
    `${SITE_NAME} (also known as Infiotix or Infiotix Technology) is a software and IoT company based in ${company.location}. ` +
      `Contact: ${company.phone}, ${company.email}.`,
    "",
    "## Software",
    ...softwareDetails.map((p) => line(p.name, productHref(p), productSeo[p.slug]?.description ?? p.summary)),
    "",
    "## IoT products",
    ...iotDetails.map((p) => line(p.name, productHref(p), productSeo[p.slug]?.description ?? p.summary)),
    "",
    "## Company",
    line("About", pageSeo.about.path, pageSeo.about.description),
    line("Solutions by industry", pageSeo.solutions.path, pageSeo.solutions.description),
    line("Projects", pageSeo.projects.path, pageSeo.projects.description),
    line("Support", pageSeo.support.path, pageSeo.support.description),
    line("Contact", pageSeo.contact.path, pageSeo.contact.description),
    "",
    `Products covered: ${allProducts.map((p) => p.name).join(", ")}.`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
