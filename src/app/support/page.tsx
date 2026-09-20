import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { simplePageGraph, faqNode } from "@/lib/schema";
import {
  Activity,
  Bug,
  GraduationCap,
  Lightbulb,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  RefreshCw,
} from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import CtaBanner from "@/components/sections/CtaBanner";
import Button from "@/components/ui/Button";
import Faq from "@/components/ui/Faq";
import FeatureCard from "@/components/ui/FeatureCard";
import PageHero from "@/components/ui/PageHero";
import Robot from "@/components/ui/Robot";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Steps from "@/components/ui/Steps";
import { interestOptions } from "@/data/products";
import { company } from "@/data/site";

export const metadata: Metadata = pageMetadata("support");

const channels = [
  {
    icon: Phone,
    title: "Call us",
    text: "Talk to an engineer about anything urgent.",
    action: company.phone,
    href: company.phoneHref,
    color: "#4f8cff",
  },
  {
    icon: MessageCircle,
    title: "Chat on WhatsApp",
    text: "Send a message, photo or screenshot and we will reply.",
    action: "Start a chat",
    href: company.whatsappHref,
    color: "#2dd4a7",
  },
  {
    icon: Mail,
    title: "Email us",
    text: "Share the details and any files for a written follow-up.",
    action: company.email,
    href: `mailto:${company.email}`,
    color: "#a78bfa",
  },
];

const covers = [
  {
    icon: Bug,
    title: "Issue Resolution",
    text: "Quick diagnosis and fixes when something in your software or devices is not working.",
    color: "#f472b6",
  },
  {
    icon: MonitorSmartphone,
    title: "Remote Troubleshooting",
    text: "Many problems can be solved remotely, which saves you time and travel.",
    color: "#4f8cff",
  },
  {
    icon: RefreshCw,
    title: "Updates & Upgrades",
    text: "Keep your software current with improvements and new features.",
    color: "#22c8f5",
  },
  {
    icon: GraduationCap,
    title: "Training & Guidance",
    text: "Help for new team members and refreshers whenever you need them.",
    color: "#f5a524",
  },
  {
    icon: Activity,
    title: "Health Checks",
    text: "With a maintenance plan, regular checks catch small problems before they grow.",
    color: "#2dd4a7",
  },
  {
    icon: Lightbulb,
    title: "Feature Requests",
    text: "Tell us what would make your work easier and we will plan it in.",
    color: "#a78bfa",
  },
];

const steps = [
  {
    title: "Reach out",
    text: "Call, message us on WhatsApp, email or send the request form below. Use whichever is easiest.",
  },
  {
    title: "We look into it",
    text: "Our team understands the problem and, where possible, fixes it remotely.",
  },
  {
    title: "We follow up",
    text: "We confirm that everything is working and make sure you are comfortable.",
  },
];

const faqs = [
  {
    q: "How quickly will I get a response?",
    a: "We aim to respond as quickly as possible, and urgent issues are handled first. For anything critical, please call us directly.",
  },
  {
    q: "What should I share when I raise an issue?",
    a: "Your name and phone number, the product you use and a short description or screenshot of the problem. The more detail you share, the faster we can help.",
  },
  {
    q: "Do you support systems you did not build?",
    a: "Tell us about your setup and we will let you know how we can help.",
  },
  {
    q: "Do you visit on site?",
    a: "Where a problem cannot be solved remotely, we will discuss on-site options with you.",
  },
  {
    q: "Can I get a maintenance plan?",
    a: "Yes. Ask us about annual maintenance so that updates, checks and priority support are covered.",
  },
];

export default function SupportPage() {
  return (
    <>
      <JsonLd data={simplePageGraph("support", "WebPage", [faqNode("/support", faqs)])} />
      <PageHero
        eyebrow="Support"
        title="Support That's Always"
        highlight="With You"
        breadcrumbs={[{ label: "Support" }]}
        description="Questions, issues or new ideas? Our team is here around the clock to keep your software and devices running smoothly."
        actions={
          <>
            <Button href={company.phoneHref} size="md">
              <Phone className="size-[1rem]" aria-hidden="true" />
              Call {company.phone}
            </Button>
            <Button href={company.whatsappHref} variant="outline" size="md" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-[1rem] text-[#2dd4a7]" aria-hidden="true" />
              Chat on WhatsApp
            </Button>
          </>
        }
        visual={
          <div className="relative mx-auto w-full max-w-[30rem] xl:mr-0">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2.2rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(47,107,255,0.3),transparent_75%)] blur-2xl"
            />
            <div className="surface-glass relative rounded-[1.5rem] p-[1.3rem] shadow-[0_36px_80px_-40px_rgba(40,100,255,0.8)] xl:p-[1.6rem]">
              <div className="flex items-center gap-[0.9rem]">
                <Robot className="w-[2.6rem] shrink-0" />
                <div>
                  <p className="fs-110 leading-tight font-semibold text-white">Infiotix Support</p>
                  <p className="mt-[0.2rem] flex items-center gap-[0.45rem] fs-82 text-[#8fe9b6]">
                    <span className="size-[0.5rem] rounded-full bg-[#27e26f] shadow-[0_0_10px_rgba(39,226,111,0.9)]" />
                    Available 24/7
                  </p>
                </div>
              </div>

              <div className="mt-[1.2rem] space-y-[0.7rem]">
                <p className="max-w-[86%] rounded-[1rem] rounded-tl-[0.3rem] bg-white/[0.07] px-[1rem] py-[0.7rem] fs-95 leading-[1.5] text-[#dbe6fb]">
                  Hi! How can we help you today?
                </p>
                <p className="ml-auto max-w-[86%] rounded-[1rem] rounded-tr-[0.3rem] bg-[linear-gradient(90deg,#1c64f2,#5b3df5)] px-[1rem] py-[0.7rem] fs-95 leading-[1.5] text-white">
                  My smart lock app is not connecting.
                </p>
                <p className="max-w-[86%] rounded-[1rem] rounded-tl-[0.3rem] bg-white/[0.07] px-[1rem] py-[0.7rem] fs-95 leading-[1.5] text-[#dbe6fb]">
                  Sure. Share a few details and our team will get right on it.
                </p>
              </div>
            </div>
          </div>
        }
      />

      {/* -------------------------------------------------------- */}
      {/*  Channels                                                  */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="channels-title">
        <SectionTitle
          id="channels-title"
          eyebrow="Get in touch"
          title="Choose the way that's"
          highlight="easiest for you"
        />
        <ul className="mt-8 grid gap-4 md:grid-cols-3 xl:mt-[2.2rem] xl:gap-[1.2rem]">
          {channels.map((channel) => (
            <li key={channel.title}>
              <FeatureCard icon={channel.icon} title={channel.title} text={channel.text} color={channel.color}>
                <a
                  href={channel.href}
                  {...(channel.href.startsWith("https") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-[1rem] inline-block fs-105 font-semibold break-all text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-brand-cyan hover:decoration-brand-cyan"
                >
                  {channel.action}
                </a>
              </FeatureCard>
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  What support covers                                       */}
      {/* -------------------------------------------------------- */}
      <Section tone="panel" labelledBy="covers-title">
        <SectionTitle
          id="covers-title"
          eyebrow="What we help with"
          title="Help for everything after"
          highlight="go-live"
          description="Support is part of how we work, not an afterthought."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:mt-[2.2rem] xl:grid-cols-3 xl:gap-[1.2rem]">
          {covers.map((item) => (
            <li key={item.title}>
              <FeatureCard icon={item.icon} title={item.title} text={item.text} color={item.color} />
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Steps                                                     */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="support-steps-title">
        <SectionTitle
          id="support-steps-title"
          eyebrow="How it works"
          title="Getting help is"
          highlight="simple"
        />
        <div className="mt-8 xl:mt-[2.2rem]">
          <Steps steps={steps} />
        </div>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Request form                                              */}
      {/* -------------------------------------------------------- */}
      <Section id="request" tone="panel" labelledBy="request-title">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-[3rem]">
          <SectionTitle
            id="request-title"
            eyebrow="Support request"
            title="Tell us what's"
            highlight="going on"
            description="Fill in the form and send it on WhatsApp or by email. The more detail you give, the faster we can help."
          />
          <div className="surface-glass rounded-[1.4rem] p-[1.3rem] shadow-[0_30px_70px_-40px_rgba(40,100,255,0.6)] sm:p-[1.8rem] xl:p-[2rem]">
            <ContactForm mode="support" interests={interestOptions} />
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  FAQ                                                       */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="support-faq-title">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-[3rem]">
          <SectionTitle
            id="support-faq-title"
            eyebrow="FAQ"
            title="Support questions,"
            highlight="answered"
          />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBanner
        title="Need a Hand Right Now?"
        text="Our team is available round the clock. Call us and we will help you get going."
        secondaryLabel="Contact Us"
      />
    </>
  );
}
