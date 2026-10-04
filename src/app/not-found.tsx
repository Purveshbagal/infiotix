import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { SITE_NAME } from "@/lib/seo";

/**
 * Without this, the 404 page inherits the root layout's metadata – including the home page's
 * title, description and `rel="canonical"`. A canonical pointing at the home page tells search
 * engines that every mistyped URL *is* the home page, so it is cleared here. `alternates: {}`
 * removes the inherited canonical (metadata is merged shallowly, one key at a time).
 */
export const metadata: Metadata = {
  title: { absolute: `Page not found | ${SITE_NAME}` },
  description: "This page could not be found. Browse our software, IoT products and support pages instead.",
  alternates: {},
  robots: { index: false, follow: true },
};

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Software", href: "/software" },
  { label: "IoT Products", href: "/iot-products" },
  { label: "Projects", href: "/projects" },
  { label: "Support", href: "/support" },
];

export default function NotFound() {
  return (
    <Section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50rem_24rem_at_50%_0%,rgba(37,99,235,0.28),transparent_70%)]"
      />
      <div className="mx-auto max-w-[36rem] py-[2rem] text-center xl:py-[3rem]">
        <p className="eyebrow text-[#3b9bff]">Error 404</p>
        <p className="mt-[0.8rem] text-[clamp(4.5rem,20vw,8rem)] leading-none font-bold text-gradient-brand">404</p>
        <h1 className="mt-[1rem] fs-200 font-bold text-white xl:fs-220">This page could not be found</h1>
        <p className="mt-[0.8rem] fs-105 leading-[1.7] text-[#a7b6d3]">
          The page you are looking for may have moved or no longer exists. Let&apos;s get you back on track.
        </p>

        <div className="mt-[1.6rem] flex flex-wrap items-center justify-center gap-[0.9rem]">
          <Button href="/" size="md">
            Back to Home
            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
          </Button>
          <Button href="/contact" variant="outline" size="md">
            Contact Us
          </Button>
        </div>

        <ul className="mt-[2rem] flex flex-wrap items-center justify-center gap-x-[1.4rem] gap-y-[0.6rem]">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="fs-95 text-[#9db0d0] transition-colors hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
