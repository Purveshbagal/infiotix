import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { listingGraph } from "@/lib/schema";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Factory,
  Headset,
  House,
  Network,
  Smartphone,
  Sprout,
  Wrench,
} from "lucide-react";
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
import { iotDetails, iotSteps, productHref, visualFor } from "@/data/products";

export const metadata: Metadata = pageMetadata("iotProducts");

const whyUs = [
  {
    icon: Wrench,
    title: "Easy Installation",
    text: "Our team installs and sets up every device, and shows you how to use it.",
    color: "#2dd4a7",
  },
  {
    icon: Smartphone,
    title: "Control from Anywhere",
    text: "One simple mobile app to monitor, control and get alerts wherever you are.",
    color: "#4f8cff",
  },
  {
    icon: Network,
    title: "Works Together",
    text: "Locks, door bells, automation and monitors can be combined into one connected setup.",
    color: "#a78bfa",
  },
  {
    icon: Headset,
    title: "Backed by Support",
    text: "Friendly help from the people who built it, whenever you need it.",
    color: "#f5a524",
  },
];

const useCases = [
  {
    icon: House,
    title: "Home",
    text: "Keyless entry, video door bells and automation for comfort and safety.",
    color: "#fbbf24",
    href: "/iot-products/home-automation",
    link: "Home Automation",
  },
  {
    icon: Building2,
    title: "Office",
    text: "Controlled access and smart entry for offices, shops and PGs.",
    color: "#38bdf8",
    href: "/iot-products/smart-door-lock",
    link: "Smart Door Lock",
  },
  {
    icon: Factory,
    title: "Industry",
    text: "Level and status monitoring that saves time and prevents wastage.",
    color: "#c4b5fd",
    href: "/iot-products/water-tank-level-monitor",
    link: "Water Tank Level Monitor",
  },
  {
    icon: Sprout,
    title: "Agriculture",
    text: "Water monitoring that helps farms use every drop wisely.",
    color: "#4ade80",
    href: "/iot-products/water-tank-level-monitor",
    link: "Water Tank Level Monitor",
  },
];

const faqs = [
  {
    q: "Do the devices need an internet connection?",
    a: "App control, remote access and alerts need a connection. We will confirm what your setup needs during the consultation.",
  },
  {
    q: "Can I combine several devices?",
    a: "Yes. A lock, door bell, home automation and water monitoring can work together, and you can start with one device and add more later.",
  },
  {
    q: "Do you install the devices?",
    a: "Yes. Our team handles installation and set-up, and shows you how to use the app.",
  },
  {
    q: "What if something stops working?",
    a: "Contact our support team. We will help you get it working again as quickly as possible.",
  },
];

export default function IoTProductsPage() {
  return (
    <>
      <JsonLd data={listingGraph("iotProducts", "IoT products", iotDetails, faqs)} />
      <PageHero
        eyebrow="IoT Products"
        title="Smart Devices for a"
        highlight="Connected World"
        breadcrumbs={[{ label: "IoT Products" }]}
        description="Innovative IoT products for home, office, industry and agriculture. Smart locks, water monitors, home automation and video door bells, installed and supported by our team."
        actions={
          <>
            <Button href="/contact" size="md">
              Get a Free Quote
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button href="#how-it-works" variant="outline" size="md">
              How It Works
            </Button>
          </>
        }
        visual={
          <ProductJump
            heading="Explore our devices"
            items={iotDetails.map((detail) => {
              const visual = visualFor(detail);
              return { title: detail.name, href: productHref(detail), icon: visual.icon, color: visual.accent };
            })}
          />
        }
      />

      {/* -------------------------------------------------------- */}
      {/*  Devices                                                   */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="iot-list-title">
        <SectionTitle
          id="iot-list-title"
          eyebrow="Our devices"
          title="Make every space"
          highlight="smarter and safer"
          description="Each product comes with the app, set-up and support, so you can start using it right away."
        />

        <ProductShowcase products={iotDetails} secondaryLabel="Get a Quote" />
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Why our IoT                                               */}
      {/* -------------------------------------------------------- */}
      <Section tone="panel" labelledBy="iot-why-title">
        <SectionTitle
          id="iot-why-title"
          eyebrow="Why Infiotix"
          title="Devices that are easy to"
          highlight="live with"
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
      {/*  Where they fit                                            */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="iot-fit-title">
        <SectionTitle
          id="iot-fit-title"
          eyebrow="Where they fit"
          title="One family of devices,"
          highlight="many places"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:mt-[2.2rem] xl:grid-cols-4 xl:gap-[1.2rem]">
          {useCases.map((item) => (
            <li key={item.title}>
              <FeatureCard icon={item.icon} title={item.title} text={item.text} color={item.color}>
                <Link
                  href={item.href}
                  className="mt-[0.9rem] inline-flex items-center gap-2 fs-88 font-semibold text-brand-cyan hover:underline"
                >
                  {item.link}
                  <ArrowRight className="size-[0.85rem]" aria-hidden="true" />
                </Link>
              </FeatureCard>
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Process                                                   */}
      {/* -------------------------------------------------------- */}
      <Section id="how-it-works" tone="panel" labelledBy="iot-process-title">
        <SectionTitle
          id="iot-process-title"
          eyebrow="How it works"
          title="From first call to"
          highlight="a working device"
          description="We take care of the technical parts, so you can simply enjoy the result."
        />
        <div className="mt-8 xl:mt-[2.2rem]">
          <Steps steps={iotSteps} />
        </div>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  FAQ                                                       */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="iot-faq-title">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-[3rem]">
          <SectionTitle
            id="iot-faq-title"
            eyebrow="FAQ"
            title="Questions,"
            highlight="answered"
            description="Need help choosing the right device? Talk to our team."
          />
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBanner
        title="Ready to Make Your Space Smarter?"
        text="Tell us what you would like to automate and we will recommend the right devices."
        secondaryLabel="Get a Free Quote"
      />
    </>
  );
}
