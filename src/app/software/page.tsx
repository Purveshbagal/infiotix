import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { listingGraph } from "@/lib/schema";
import { ArrowRight, Headset, Puzzle, ShieldCheck, Smartphone } from "lucide-react";
import CtaBanner from "@/components/sections/CtaBanner";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Button from "@/components/ui/Button";
import Faq from "@/components/ui/Faq";
import FeatureCard from "@/components/ui/FeatureCard";
import PageHero from "@/components/ui/PageHero";
import ProductJump from "@/components/ui/ProductJump";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Steps from "@/components/ui/Steps";
import { productHref, softwareDetails, softwareSteps, visualFor } from "@/data/products";

export const metadata: Metadata = pageMetadata("software");

const whyUs = [
  {
    icon: Puzzle,
    title: "Tailored to You",
    text: "Modules, user roles and reports follow your workflow instead of forcing you to change it.",
    color: "#2dd4a7",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    text: "Role-based access and sensible security practices, with help planning hosting and backups.",
    color: "#4f8cff",
  },
  {
    icon: Smartphone,
    title: "Web & Mobile Ready",
    text: "Use it on desktops, tablets and phones, so your team is productive wherever they are.",
    color: "#a78bfa",
  },
  {
    icon: Headset,
    title: "Support That Stays",
    text: "Training at go-live, then updates and 24/7 support as your needs grow.",
    color: "#f5a524",
  },
];

const faqs = [
  {
    q: "Can the software be customised for my business?",
    a: "Yes. Every product can be adapted. We tailor modules, forms, user roles, reports and invoice formats during the consultation so the software matches how you already work.",
  },
  {
    q: "Can I see a demo before deciding?",
    a: "Yes. Book a free consultation and we will walk you through the software and show how it would fit your workflow.",
  },
  {
    q: "How long does implementation take?",
    a: "It depends on the modules and the amount of data to set up. After the consultation we share a clear plan and timeline before any work begins.",
  },
  {
    q: "Do you only work with customers in Pune?",
    a: "We are based in Pune, Maharashtra, and work with clients remotely as well as on site where needed.",
  },
];

export default function SoftwarePage() {
  return (
    <>
      <JsonLd data={listingGraph("software", "Software solutions", softwareDetails, faqs)} />
      <PageHero
        eyebrow="Software Solutions"
        title="Powering Businesses with"
        highlight="Smart Software"
        breadcrumbs={[{ label: "Software" }]}
        description="Hospital, school and gym management systems, plus fully custom software. Digital solutions built to simplify your operations and improve productivity."
        actions={
          <>
            <Button href="/contact" size="md">
              Get a Free Consultation
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button href="#how-we-work" variant="outline" size="md">
              How We Work
            </Button>
          </>
        }
        visual={
          <ProductJump
            heading="Explore our software"
            items={softwareDetails.map((detail) => {
              const visual = visualFor(detail);
              return {
                title: detail.name,
                href: productHref(detail),
                icon: visual.icon,
                color: visual.accent,
              };
            })}
          />
        }
      />

      {/* -------------------------------------------------------- */}
      {/*  Product showcase                                          */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="software-list-title">
        <SectionTitle
          id="software-list-title"
          eyebrow="What we build"
          title="Software for every"
          highlight="kind of organisation"
          description="Ready-to-use systems that we set up around your needs, plus custom development when nothing off the shelf fits."
        />

        <ProductShowcase products={softwareDetails} secondaryLabel="Request a Demo" />
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Why our software                                          */}
      {/* -------------------------------------------------------- */}
      <Section tone="panel" labelledBy="software-why-title">
        <SectionTitle
          id="software-why-title"
          eyebrow="Why Infiotix"
          title="Software that fits,"
          highlight="and keeps fitting"
          align="center"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:mt-[2.2rem] xl:grid-cols-4 xl:gap-[1.2rem]">
          {whyUs.map((item) => (
            <li key={item.title}>
              <FeatureCard icon={item.icon} title={item.title} text={item.text} color={item.color} />
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Process                                                   */}
      {/* -------------------------------------------------------- */}
      <Section id="how-we-work" labelledBy="software-process-title">
        <SectionTitle
          id="software-process-title"
          eyebrow="How we work"
          title="From first call to"
          highlight="go-live and beyond"
          description="A clear, four-step process so you always know what happens next."
        />
        <div className="mt-8 xl:mt-[2.2rem]">
          <Steps steps={softwareSteps} />
        </div>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  FAQ                                                       */}
      {/* -------------------------------------------------------- */}
      <Section tone="panel" labelledBy="software-faq-title">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-[3rem]">
          <SectionTitle
            id="software-faq-title"
            eyebrow="FAQ"
            title="Questions,"
            highlight="answered"
            description="Still unsure? Talk to our team and we will help you pick the right approach."
          />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBanner
        title="Ready to Digitise Your Business?"
        text="Tell us about your workflow and we will suggest the right software and a clear plan."
        secondaryLabel="Get a Free Consultation"
      />
    </>
  );
}
