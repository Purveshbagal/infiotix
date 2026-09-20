import type { ReactNode } from "react";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";

export type LegalSection = { heading: string; body: ReactNode };

type LegalPageProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  intro: string;
  crumb: string;
  updated: string;
  sections: LegalSection[];
};

/** Shared layout for the privacy policy and terms pages: hero plus a readable numbered article. */
export default function LegalPage({
  eyebrow,
  title,
  highlight,
  intro,
  crumb,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        breadcrumbs={[{ label: crumb }]}
        description={intro}
      >
        <p className="fs-88 text-[#8ea2c8]">Last updated: {updated}</p>
      </PageHero>

      <Section labelledBy="legal-heading">
        <h2 id="legal-heading" className="sr-only">
          {crumb}
        </h2>
        <div className="mx-auto max-w-[52rem] space-y-[2rem] xl:space-y-[2.4rem]">
          {sections.map((section, i) => (
            <section key={section.heading} aria-labelledby={`legal-${i}`}>
              <h3 id={`legal-${i}`} className="flex items-baseline gap-[0.8rem] fs-135 leading-tight font-semibold text-white">
                <span className="fs-90 font-bold text-brand-cyan">{String(i + 1).padStart(2, "0")}</span>
                {section.heading}
              </h3>
              <div className="mt-[0.7rem] space-y-[0.8rem] fs-102 leading-[1.8] text-[#a7b6d3] [&_a]:font-medium [&_a]:text-brand-cyan [&_a]:underline-offset-4 hover:[&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
