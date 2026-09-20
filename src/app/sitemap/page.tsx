import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { iotDetails, productHref, softwareDetails } from "@/data/products";
import { footerLinks, navItems } from "@/data/site";

export const metadata: Metadata = pageMetadata("sitemap");

const groups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Main pages",
    links: navItems.map((item) => ({ label: item.label, href: item.href })),
  },
  {
    title: "Software",
    links: softwareDetails.map((product) => ({ label: product.name, href: productHref(product) })),
  },
  {
    title: "IoT products",
    links: iotDetails.map((product) => ({ label: product.name, href: productHref(product) })),
  },
  {
    title: "Capabilities",
    links: footerLinks.services.map((link) => ({ label: link.label, href: link.href })),
  },
  {
    title: "Legal",
    links: footerLinks.legal.filter((link) => link.href !== "/sitemap").map((link) => ({ label: link.label, href: link.href })),
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title="Find Your Way"
        highlight="Around"
        breadcrumbs={[{ label: "Sitemap" }]}
        description="Every page on the Infiotix Technologies website, in one place."
      />

      <Section labelledBy="sitemap-heading">
        <h2 id="sitemap-heading" className="sr-only">
          All pages
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[1.2rem]">
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="surface-glass rounded-[1.2rem] p-[1.4rem]">
              <h3 className="eyebrow text-[#7b85ff]">{group.title}</h3>
              <ul className="mt-[0.9rem] grid gap-[0.2rem]">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 rounded-[0.6rem] px-2 py-[0.45rem] fs-100 text-[#c3d2ef] transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <ChevronRight
                        className="size-[0.9rem] text-brand-cyan transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Section>
    </>
  );
}
