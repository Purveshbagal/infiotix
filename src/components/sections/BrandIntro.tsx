import Link from "next/link";
import Faq from "@/components/ui/Faq";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { iotDetails, productHref, softwareDetails } from "@/data/products";
import { homeAbout, homeFaqs } from "@/data/seo";

/** Descriptive link text (what people actually search for) for each product page. */
const anchors: Record<string, string> = {
  "hospital-management-system": "Hospital management software",
  "school-management-system": "School management software",
  "gym-management-system": "Gym management software",
  "custom-software-development": "Custom software development",
  "smart-door-lock": "Smart door lock",
  "water-tank-level-monitor": "Water tank level monitor",
  "home-automation": "Home automation system",
  "smart-door-bell": "Smart video door bell",
};

const groups = [
  { title: "Software", products: softwareDetails },
  { title: "IoT products", products: iotDetails },
];

/**
 * Plain, readable text about who Infiotix is and what it sells, with links into every product
 * page and a matching FAQ. Search engines rank pages by their visible words, so the home page
 * needs a proper description of the company and its products (the FAQ is also sent as FAQPage
 * structured data).
 */
export default function BrandIntro() {
  return (
    <Section id="about-infiotix" labelledBy="about-infiotix-title" className="pb-4 xl:pb-[1.5rem]">
      <div className="grid gap-8 xl:grid-cols-2 xl:gap-[3rem]">
        <div>
          <SectionTitle
            id="about-infiotix-title"
            eyebrow="About Infiotix"
            title="Software & IoT solutions from"
            highlight="Infiotix Technologies, Pune"
          />
          <div className="mt-[1.2rem] grid gap-[0.9rem]">
            {homeAbout.paragraphs.map((paragraph) => (
              <p key={paragraph} className="fs-100 leading-[1.75] text-[#b3c2df] xl:fs-105">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-[1.6rem] grid gap-[1.4rem] sm:grid-cols-2">
            {groups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className="eyebrow text-[#7b85ff]">{group.title}</h3>
                <ul className="mt-[0.7rem] grid gap-[0.45rem]">
                  {group.products.map((product) => (
                    <li key={product.slug}>
                      <Link
                        href={productHref(product)}
                        className="fs-98 font-medium text-[#c3d2ef] underline decoration-white/20 underline-offset-4 transition-colors hover:text-brand-cyan hover:decoration-brand-cyan"
                      >
                        {anchors[product.slug] ?? product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <Faq items={homeFaqs} />
      </div>
    </Section>
  );
}
