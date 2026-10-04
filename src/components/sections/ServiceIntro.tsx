import Link from "next/link";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

export type IntroLink = { label: string; href: string };

type ServiceIntroProps = {
  /** Anchor + aria target, e.g. "about-software" */
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  paragraphs: string[];
  /** Descriptive links out of this page; the label is what a visitor would search for. */
  links: IntroLink[];
  linksHeading: string;
  tone?: "plain" | "panel";
};

/**
 * A short block of readable prose plus descriptive internal links, used on the listing pages.
 *
 * The listing pages are mostly cards and icons. Cards are good for people but give a search
 * engine very little to read, so this adds a few plain sentences that say who the company is
 * and what it builds, with links whose text matches what people actually search for.
 */
export default function ServiceIntro({
  id,
  eyebrow,
  title,
  highlight,
  paragraphs,
  links,
  linksHeading,
  tone = "plain",
}: ServiceIntroProps) {
  return (
    <Section id={id} tone={tone} labelledBy={`${id}-title`}>
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] xl:gap-[3rem]">
        <div>
          <SectionTitle id={`${id}-title`} eyebrow={eyebrow} title={title} highlight={highlight} />
          <div className="mt-[1.2rem] grid gap-[0.9rem]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="fs-100 leading-[1.75] text-[#b3c2df] xl:fs-105">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <nav aria-label={linksHeading} className="self-start">
          <h3 className="eyebrow text-[#7b85ff]">{linksHeading}</h3>
          <ul className="mt-[0.7rem] grid gap-[0.45rem]">
            {links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="fs-98 font-medium text-[#c3d2ef] underline decoration-white/20 underline-offset-4 transition-colors hover:text-brand-cyan hover:decoration-brand-cyan"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Section>
  );
}
