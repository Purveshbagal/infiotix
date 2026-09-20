import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { simplePageGraph } from "@/lib/schema";
import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  CodeXml,
  Compass,
  Cpu,
  CircuitBoard,
  HeartHandshake,
  Headset,
  Layers,
  MapPin,
  ScanEye,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import CtaBanner from "@/components/sections/CtaBanner";
import Button from "@/components/ui/Button";
import FeatureCard from "@/components/ui/FeatureCard";
import PageHero from "@/components/ui/PageHero";
import ProductPhoto from "@/components/ui/ProductPhoto";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Steps from "@/components/ui/Steps";
import { heroStats } from "@/data/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata("about");

const facts: { icon: LucideIcon; text: string }[] = [
  { icon: MapPin, text: "Based in Pune, Maharashtra" },
  { icon: Layers, text: "Software and IoT under one roof" },
  { icon: Headset, text: "24/7 support for every customer" },
];

const capabilities: {
  icon: LucideIcon;
  title: string;
  text: string;
  color: string;
  href: string;
}[] = [
  {
    icon: CodeXml,
    title: "Software Development",
    text: "Hospital, school and gym management systems and fully custom software built around your workflow.",
    color: "#4f8cff",
    href: "/software",
  },
  {
    icon: CircuitBoard,
    title: "IoT & Automation",
    text: "Smart door locks, water tank monitors, home automation and video door bells.",
    color: "#f5a524",
    href: "/iot-products",
  },
  {
    icon: ScanEye,
    title: "AI & Computer Vision",
    text: "Camera-based intelligence that turns video into useful, actionable information.",
    color: "#3aa0ff",
    href: "/solutions#ai-computer-vision",
  },
  {
    icon: Cpu,
    title: "Embedded Systems",
    text: "Firmware and hardware integration for reliable, purpose-built devices.",
    color: "#a78bfa",
    href: "/solutions#embedded-systems",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    text: "Secure hosting, monitoring and smooth releases for apps and device fleets.",
    color: "#22c8f5",
    href: "/solutions#cloud-devops",
  },
  {
    icon: Headset,
    title: "Maintenance & Support",
    text: "Updates, fixes and round-the-clock help long after go-live.",
    color: "#2dd4a7",
    href: "/support",
  },
];

const steps = [
  {
    title: "Consult & Plan",
    text: "We listen first. A free consultation to understand your goals, users and constraints, followed by a clear plan.",
  },
  {
    title: "Design & Develop",
    text: "Modern technologies, clean design and regular demos, so you see real progress early and often.",
  },
  {
    title: "Deploy & Integrate",
    text: "Seamless implementation: installation, data set-up, integrations and hands-on training for your team.",
  },
  {
    title: "Support & Grow",
    text: "Always with you. Updates, new features and 24/7 support as your needs grow.",
  },
];

const values: { icon: LucideIcon; title: string; text: string; color: string }[] = [
  {
    icon: ShieldCheck,
    title: "Reliable Solutions",
    text: "Well-tested systems built to run smoothly, day in and day out.",
    color: "#4f8cff",
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    text: "Current, proven tools that keep your solution fast, secure and ready for the future.",
    color: "#a78bfa",
  },
  {
    icon: Headset,
    title: "Expert Support",
    text: "A responsive team that answers quickly and fixes things properly.",
    color: "#22c8f5",
  },
  {
    icon: HeartHandshake,
    title: "Client Focused",
    text: "Your goals set the roadmap. We measure our success by your results.",
    color: "#f472b6",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={simplePageGraph("about", "AboutPage")} />
      <PageHero
        eyebrow="About Infiotix"
        title="We Build Technology That"
        highlight="Connects Lives"
        breadcrumbs={[{ label: "About" }]}
        description="Infiotix Technologies is a Pune-based software and IoT company. We turn everyday business and home challenges into smart, reliable and connected solutions, from hospital software to smart door locks."
        actions={
          <>
            <Button href="/contact" size="md">
              Talk to Our Team
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button href="/projects" variant="outline" size="md">
              See Our Work
            </Button>
          </>
        }
        visual={
          <div className="relative grid h-[21rem] grid-cols-2 gap-3 sm:h-[25rem] xl:h-[27rem] xl:gap-[0.9rem]">
            <div className="relative row-span-2 overflow-hidden rounded-[1.3rem] border border-[rgba(110,160,255,0.3)] shadow-[0_30px_70px_-36px_rgba(40,100,255,0.7)]">
              <ProductPhoto
                src="/images/software-hospital.png"
                alt="Doctor beside a hospital management dashboard"
                position="78% 30%"
                sizes="(min-width: 1280px) 22vw, 50vw"
                eager
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,20,0)_55%,rgba(4,8,20,0.75)_100%)]" />
            </div>
            <div className="relative overflow-hidden rounded-[1.3rem] border border-[rgba(110,160,255,0.3)] shadow-[0_30px_70px_-36px_rgba(40,100,255,0.7)]">
              <ProductPhoto
                src="/images/iot-door-lock.png"
                alt="Fingerprint smart door lock"
                position="0% 40%"
                sizes="(min-width: 1280px) 22vw, 50vw"
                eager
              />
            </div>
            <div className="relative overflow-hidden rounded-[1.3rem] border border-[rgba(110,160,255,0.3)] shadow-[0_30px_70px_-36px_rgba(40,100,255,0.7)]">
              <ProductPhoto
                src="/images/software-gym.png"
                alt="Trainer using a gym management dashboard"
                position="82% 30%"
                sizes="(min-width: 1280px) 22vw, 50vw"
                eager
              />
            </div>

            <div className="absolute bottom-[0.9rem] left-[0.9rem] rounded-[0.9rem] border border-white/20 bg-[rgba(6,12,30,0.78)] px-[1rem] py-[0.7rem] backdrop-blur-md">
              <p className="fs-165 leading-none font-bold text-gradient-brand">50+</p>
              <p className="mt-[0.3rem] fs-82 leading-none text-[#c3d2ef]">Projects Delivered</p>
            </div>
          </div>
        }
      />

      {/* -------------------------------------------------------- */}
      {/*  Story + mission / vision                                  */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="story-title">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-[3.5rem]">
          <div>
            <SectionTitle
              id="story-title"
              eyebrow="Our story"
              title="Ideas, technology and"
              highlight="a better tomorrow"
              className="max-w-none"
            />
            <div className="mt-6 space-y-4 fs-105 leading-[1.8] text-[#b3c2df] xl:mt-[1.6rem]">
              <p>
                Infiotix Technologies began with a simple belief: technology should make everyday life simpler,
                safer and more connected. From our base in Pune, Maharashtra, we design and build software and
                IoT products that solve real problems for hospitals, schools, gyms, homes and growing
                businesses.
              </p>
              <p>
                Today we bring software engineering, embedded hardware and cloud know-how together in one
                team. That means one partner who can build your management system, connect your devices and
                keep everything running, from the first consultation to long after go-live.
              </p>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-[1.6rem] gap-y-[0.8rem] xl:mt-[1.6rem]">
              {facts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-[0.6rem] fs-95 text-[#d5e2ff]">
                  <Icon className="size-[1.1rem] text-brand-cyan" strokeWidth={1.8} aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid content-start gap-4 xl:gap-[1.2rem]">
            <FeatureCard
              icon={Target}
              title="Our Mission"
              text="To deliver smart, reliable and affordable software and IoT solutions that simplify operations and improve everyday life for our clients."
              color="#4f8cff"
            />
            <FeatureCard
              icon={Compass}
              title="Our Vision"
              text="To be a trusted technology partner for a smarter, safer and more connected world."
              color="#22c8f5"
            />
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Numbers                                                   */}
      {/* -------------------------------------------------------- */}
      <Section tone="panel" labelledBy="numbers-title">
        <h2 id="numbers-title" className="sr-only">
          Infiotix in numbers
        </h2>
        <dl className="grid grid-cols-2 gap-y-8 xl:grid-cols-4">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn("flex flex-col items-center text-center", i > 0 && "xl:border-l xl:border-white/[0.1]")}
            >
              {/* label first in the DOM (dt), shown under the number */}
              <dt className="order-2 mt-[0.6rem] fs-100 text-[#a7b6d3]">{stat.label}</dt>
              <dd className="order-1 fs-330 leading-none font-bold text-gradient-brand xl:fs-350">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  What we do                                                */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="capabilities-title">
        <SectionTitle
          id="capabilities-title"
          eyebrow="What we do"
          title="One team for"
          highlight="software, devices and support"
          description="Everything you need to take an idea from a sketch to a working, supported solution."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:mt-[2.2rem] xl:grid-cols-3 xl:gap-[1.2rem]">
          {capabilities.map((item) => (
            <li key={item.title}>
              <FeatureCard icon={item.icon} title={item.title} text={item.text} color={item.color}>
                <Link
                  href={item.href}
                  className="mt-[0.9rem] inline-flex items-center gap-2 fs-88 font-semibold text-brand-cyan hover:underline"
                >
                  Learn more
                  <ArrowRight className="size-[0.85rem]" aria-hidden="true" />
                </Link>
              </FeatureCard>
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  How we work                                               */}
      {/* -------------------------------------------------------- */}
      <Section tone="panel" id="how-we-work" labelledBy="process-title">
        <SectionTitle
          id="process-title"
          eyebrow="How we work"
          title="A clear path from"
          highlight="idea to impact"
          description="Four simple steps, the same for every project, big or small."
        />
        <div className="mt-8 xl:mt-[2.2rem]">
          <Steps steps={steps} />
        </div>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Values                                                    */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="values-title">
        <SectionTitle
          id="values-title"
          eyebrow="Why Infiotix"
          title="What you can"
          highlight="expect from us"
          align="center"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:mt-[2.2rem] xl:grid-cols-4 xl:gap-[1.2rem]">
          {values.map((item) => (
            <li key={item.title}>
              <FeatureCard icon={item.icon} title={item.title} text={item.text} color={item.color} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        title="Let's Build Something Great Together"
        text="Share your idea with our team and let's turn it into a real, working solution."
        secondaryLabel="Talk to Our Team"
      />
    </>
  );
}
