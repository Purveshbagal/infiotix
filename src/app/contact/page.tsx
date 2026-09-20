import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { simplePageGraph } from "@/lib/schema";
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import Button from "@/components/ui/Button";
import GlobeSkyline from "@/components/ui/GlobeSkyline";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Steps from "@/components/ui/Steps";
import { interestOptions } from "@/data/products";
import { company } from "@/data/site";

export const metadata: Metadata = pageMetadata("contact");

const details: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  color: string;
}[] = [
  { icon: Phone, label: "Call us", value: company.phone, href: company.phoneHref, color: "#4f8cff" },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with our team",
    href: company.whatsappHref,
    external: true,
    color: "#2dd4a7",
  },
  { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}`, color: "#a78bfa" },
  { icon: MapPin, label: "Location", value: company.location, color: "#f472b6" },
  { icon: Clock, label: "Support hours", value: "24/7 support for customers", color: "#f5a524" },
];

const steps = [
  {
    title: "We review your enquiry",
    text: "Our team reads your message and gets back to you as soon as possible.",
  },
  {
    title: "A free consultation",
    text: "We talk through your goals, users and budget, and answer your questions.",
  },
  {
    title: "A clear plan and quote",
    text: "You receive a simple plan, timeline and quote, with no obligation.",
  },
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { interest } = await searchParams;
  const defaultInterest = typeof interest === "string" ? interest : "";

  return (
    <>
      <JsonLd data={simplePageGraph("contact", "ContactPage")} />
      <PageHero
        eyebrow="Contact"
        title="Let's Talk About"
        highlight="Your Project"
        breadcrumbs={[{ label: "Contact" }]}
        description="Tell us what you have in mind. We will come back with the right solution and a clear plan, and your first consultation is free."
        actions={
          <>
            <Button href={company.phoneHref} size="md">
              <Phone className="size-[1rem]" aria-hidden="true" />
              Call {company.phone}
            </Button>
            <Button href={company.whatsappHref} variant="outline" size="md" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-[1rem] text-[#2dd4a7]" aria-hidden="true" />
              WhatsApp
            </Button>
          </>
        }
        visual={
          <div className="relative h-[15rem] overflow-hidden rounded-[1.5rem] border border-[rgba(110,160,255,0.3)] bg-[linear-gradient(180deg,rgba(14,30,72,0.6),rgba(4,8,20,0.9))] shadow-[0_36px_80px_-40px_rgba(40,100,255,0.8)] sm:h-[18rem] xl:h-[19rem]">
            <GlobeSkyline className="absolute inset-0 size-full" />
            <div className="absolute top-[1.3rem] left-[1.5rem]">
              <p className="flex items-center gap-2 fs-95 text-[#c3d2ef]">
                <MapPin className="size-4 text-brand-cyan" aria-hidden="true" />
                {company.location}
              </p>
              <p className="mt-[0.6rem] fs-160 leading-[1.25] font-light text-white">
                Let&apos;s Connect
                <br />
                for a Smarter Tomorrow
              </p>
            </div>
          </div>
        }
      />

      {/* -------------------------------------------------------- */}
      {/*  Details + form                                            */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="enquiry-title">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-[3rem]">
          <div>
            <SectionTitle
              id="enquiry-title"
              eyebrow="Get in touch"
              title="We'd love to"
              highlight="hear from you"
              description="Reach us the way you prefer, or send an enquiry with the form and we will take it from there."
            />
            <ul className="mt-6 grid gap-[0.8rem] xl:mt-[1.8rem]">
              {details.map((item) => {
                const Icon = item.icon;
                const body = (
                  <>
                    <span
                      className="grid size-[2.7rem] shrink-0 place-items-center rounded-[0.8rem] border bg-white/[0.03]"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}66`,
                        boxShadow: `0 0 18px -6px ${item.color}99, inset 0 0 10px ${item.color}1f`,
                      }}
                    >
                      <Icon className="size-[1.25rem]" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block fs-82 tracking-[0.06em] text-[#8ea2c8] uppercase">{item.label}</span>
                      <span className="mt-[0.15rem] block fs-105 font-semibold break-words text-white">
                        {item.value}
                      </span>
                    </span>
                  </>
                );
                const rowClass =
                  "surface-glass flex items-center gap-[1rem] rounded-[1.1rem] px-[1.1rem] py-[0.9rem] transition-colors";

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`${rowClass} hover:border-[rgba(130,175,255,0.5)]`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={rowClass}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="surface-glass self-start rounded-[1.4rem] p-[1.3rem] shadow-[0_30px_70px_-40px_rgba(40,100,255,0.6)] sm:p-[1.8rem] xl:p-[2.1rem]">
            <h3 className="fs-150 leading-tight font-bold text-white">Send us an enquiry</h3>
            <p className="mt-[0.4rem] mb-[1.3rem] fs-95 leading-[1.6] text-[#9db0d0]">
              Fields marked with * are required.
            </p>
            <ContactForm mode="contact" interests={interestOptions} defaultInterest={defaultInterest} />
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  What happens next                                         */}
      {/* -------------------------------------------------------- */}
      <Section tone="panel" labelledBy="next-title">
        <SectionTitle
          id="next-title"
          eyebrow="What happens next"
          title="From hello to"
          highlight="a clear plan"
        />
        <div className="mt-8 xl:mt-[2.2rem]">
          <Steps steps={steps} />
        </div>
      </Section>
    </>
  );
}
