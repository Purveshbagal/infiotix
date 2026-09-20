import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { simplePageGraph } from "@/lib/schema";
import Link from "next/link";
import { ArrowRight, Check, Cloud, Cpu, ScanEye, type LucideIcon } from "lucide-react";
import CtaBanner from "@/components/sections/CtaBanner";
import Button from "@/components/ui/Button";
import FeatureCard from "@/components/ui/FeatureCard";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { industries, whyChoose } from "@/data/site";

export const metadata: Metadata = pageMetadata("solutions");

/** Copy + related product links for each industry tile, in the same order as `industries`. */
const industryInfo: Record<string, { text: string; links: { label: string; href: string }[] }> = {
  Healthcare: {
    text: "Hospital and clinic software that connects patients, doctors, labs and pharmacy.",
    links: [{ label: "Hospital Management", href: "/software/hospital-management-system" }],
  },
  Education: {
    text: "Admissions, fees, attendance and exams for schools and institutes.",
    links: [{ label: "School Management", href: "/software/school-management-system" }],
  },
  "Fitness & Wellness": {
    text: "Memberships, biometric attendance and payments for gyms and studios.",
    links: [{ label: "Gym Management", href: "/software/gym-management-system" }],
  },
  "Homes & Buildings": {
    text: "Smart locks, door bells and automation for secure, comfortable living.",
    links: [
      { label: "Smart Door Lock", href: "/iot-products/smart-door-lock" },
      { label: "Home Automation", href: "/iot-products/home-automation" },
      { label: "Smart Door Bell", href: "/iot-products/smart-door-bell" },
    ],
  },
  Agriculture: {
    text: "Water monitoring that helps farms save effort, energy and water.",
    links: [{ label: "Water Tank Monitor", href: "/iot-products/water-tank-level-monitor" }],
  },
  "Retail & Business": {
    text: "Custom software that streamlines billing, inventory and day-to-day operations.",
    links: [{ label: "Custom Software", href: "/software/custom-software-development" }],
  },
  Government: {
    text: "Reliable, secure digital systems for public services and institutions.",
    links: [{ label: "Custom Software", href: "/software/custom-software-development" }],
  },
  "Custom Domains": {
    text: "Do not see your field? We build tailor-made solutions for any domain.",
    links: [{ label: "Tell us your idea", href: "/contact" }],
  },
};

const capabilities: {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
  color: string;
  points: string[];
}[] = [
  {
    id: "ai-computer-vision",
    icon: ScanEye,
    title: "AI & Computer Vision",
    text: "Camera-based intelligence that turns video and images into useful decisions.",
    color: "#3aa0ff",
    points: [
      "Face recognition for attendance and access",
      "People and object counting",
      "Safety checks such as helmet and uniform detection",
      "Number-plate recognition for gates and parking",
      "Custom vision models for your own use case",
    ],
  },
  {
    id: "embedded-systems",
    icon: Cpu,
    title: "Embedded Systems",
    text: "Purpose-built devices designed for reliability, from prototype to production.",
    color: "#a78bfa",
    points: [
      "Firmware for sensors, controllers and smart devices",
      "Custom circuit and hardware integration",
      "Wireless connectivity such as Wi-Fi and Bluetooth",
      "Device-to-cloud and mobile app integration",
      "Prototyping through to production support",
    ],
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud & DevOps",
    text: "Solid foundations that keep your apps and device fleets fast, secure and available.",
    color: "#22c8f5",
    points: [
      "Secure cloud hosting with regular backups",
      "Automated deployments and smooth updates",
      "Monitoring and alerts for apps and devices",
      "Scaling to more users and more devices",
      "Cost-aware infrastructure choices",
    ],
  },
];

const whyText: Record<string, string> = {
  "Reliable Solutions": "Well-tested systems built to run smoothly, day in and day out.",
  "Modern Technology": "Current, proven tools that keep your solution secure and future-ready.",
  "Expert Support": "A responsive team that answers quickly and fixes things properly.",
  "Client Focused": "Your goals set the roadmap and your results define our success.",
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={simplePageGraph("solutions")} />
      <PageHero
        eyebrow="Solutions"
        title="Technology for"
        highlight="Every Industry"
        breadcrumbs={[{ label: "Solutions" }]}
        description="Whatever your field, we shape software and IoT to fit it. Explore the industries we serve and the capabilities behind every solution."
        actions={
          <>
            <Button href="/contact" size="md">
              Get a Free Consultation
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button href="#capabilities" variant="outline" size="md">
              Our Capabilities
            </Button>
          </>
        }
        visual={
          <ul className="grid grid-cols-2 gap-[0.7rem] sm:grid-cols-4 xl:gap-[0.8rem]">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <li
                  key={industry.label}
                  className="flex h-[6rem] flex-col items-center justify-center gap-[0.55rem] rounded-[1rem] border border-[rgba(90,140,255,0.22)] bg-[linear-gradient(180deg,rgba(24,44,92,0.4),rgba(8,16,38,0.55))] px-2 text-center shadow-[0_20px_40px_-28px_rgba(40,100,255,0.6)] xl:h-[6.6rem]"
                >
                  <Icon
                    className="size-[1.8rem]"
                    style={{ color: industry.color, filter: `drop-shadow(0 0 7px ${industry.color}55)` }}
                    fill={industry.color}
                    fillOpacity={0.22}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <span className="fs-80 leading-tight text-[#cdd8ee]">{industry.label}</span>
                </li>
              );
            })}
          </ul>
        }
      />

      {/* -------------------------------------------------------- */}
      {/*  Industries                                                */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="industries-title">
        <SectionTitle
          id="industries-title"
          eyebrow="Industries we serve"
          title="Solutions shaped by"
          highlight="your industry"
          description="We start from how your field really works, then build or adapt the software and devices around it."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:mt-[2.2rem] xl:grid-cols-4 xl:gap-[1.2rem]">
          {industries.map((industry) => {
            const info = industryInfo[industry.label];
            return (
              <li key={industry.label}>
                <FeatureCard
                  icon={industry.icon}
                  title={industry.label}
                  text={info?.text ?? ""}
                  color={industry.color}
                >
                  {info && (
                    <ul className="mt-[1rem] flex flex-wrap gap-[0.45rem]">
                      {info.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] px-[0.75rem] py-[0.3rem] fs-80 text-[#c3d2ef] transition-colors hover:border-[rgba(130,175,255,0.6)] hover:text-white"
                          >
                            {link.label}
                            <ArrowRight className="size-[0.75rem]" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </FeatureCard>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Capabilities                                              */}
      {/* -------------------------------------------------------- */}
      <Section id="capabilities" tone="panel" labelledBy="capabilities-title">
        <SectionTitle
          id="capabilities-title"
          eyebrow="Capabilities"
          title="The technology behind"
          highlight="every solution"
          description="Beyond ready-made software and devices, our team builds these specialised capabilities for your project."
        />
        <ul className="mt-8 grid gap-4 xl:mt-[2.2rem] xl:grid-cols-3 xl:gap-[1.2rem]">
          {capabilities.map((item) => (
            <li key={item.id} id={item.id}>
              <FeatureCard icon={item.icon} title={item.title} text={item.text} color={item.color}>
                <ul className="mt-[1.1rem] grid gap-[0.6rem]">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-[0.65rem] fs-95 leading-[1.55] text-[#c3d2ef]">
                      <Check
                        className="mt-[0.2rem] size-[1rem] shrink-0"
                        style={{ color: item.color }}
                        strokeWidth={2.4}
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </FeatureCard>
            </li>
          ))}
        </ul>

        <p className="mt-6 fs-100 text-[#9db0d0] xl:mt-[1.6rem]">
          Looking for ready-made products instead? See our{" "}
          <Link href="/software" className="font-medium text-brand-cyan underline-offset-4 hover:underline">
            software
          </Link>{" "}
          and{" "}
          <Link href="/iot-products" className="font-medium text-brand-cyan underline-offset-4 hover:underline">
            IoT products
          </Link>
          .
        </p>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Why choose                                                */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="why-title">
        <SectionTitle
          id="why-title"
          eyebrow="Why choose Infiotix"
          title="A partner you can"
          highlight="count on"
          align="center"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:mt-[2.2rem] xl:grid-cols-4 xl:gap-[1.2rem]">
          {whyChoose.map((item) => {
            const title = item.lines.join(" ");
            return (
              <li key={title}>
                <FeatureCard icon={item.icon} title={title} text={whyText[title] ?? ""} color="#5b7cff" />
              </li>
            );
          })}
        </ul>
      </Section>

      <CtaBanner
        title="Tell Us About Your Industry"
        text="Share your challenge and we will suggest the right solution and a clear plan."
        secondaryLabel="Get a Free Consultation"
      />
    </>
  );
}
