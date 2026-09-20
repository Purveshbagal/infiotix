import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { listingGraph } from "@/lib/schema";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CtaBanner from "@/components/sections/CtaBanner";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import ProductPhoto from "@/components/ui/ProductPhoto";
import ProjectFilter from "@/components/ui/ProjectFilter";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Steps from "@/components/ui/Steps";
import { allProducts, iotDetails, productHref, softwareDetails, softwareSteps, visualFor } from "@/data/products";
import { company, heroStats } from "@/data/site";

export const metadata: Metadata = pageMetadata("projects");

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={listingGraph("projects", "Projects", allProducts)} />
      <PageHero
        eyebrow="Our work"
        title="Projects Built for"
        highlight="Real-World Needs"
        breadcrumbs={[{ label: "Projects" }]}
        description="From hospital software to smart home devices, explore the systems we design, build and support for organisations and families."
        actions={
          <>
            <Button href="/contact" size="md">
              Start a Project
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button href={company.phoneHref} variant="outline" size="md">
              Call {company.phone}
            </Button>
          </>
        }
        visual={
          <dl className="grid grid-cols-2 gap-[0.8rem] xl:gap-[1rem]">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="surface-glass flex flex-col rounded-[1.2rem] px-[1.4rem] py-[1.3rem] shadow-[0_24px_50px_-32px_rgba(40,100,255,0.6)] xl:py-[1.6rem]"
              >
                <dt className="order-2 mt-[0.5rem] fs-95 text-[#a7b6d3]">{stat.label}</dt>
                <dd className="order-1 fs-330 leading-none font-bold text-gradient-brand xl:fs-350">{stat.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* -------------------------------------------------------- */}
      {/*  Gallery                                                   */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="gallery-title">
        <SectionTitle
          id="gallery-title"
          eyebrow="Portfolio"
          title="Solutions we build,"
          highlight="install and support"
          description="Every solution can be tailored to your needs. Pick one to see what it does and how it works."
        />

        <div className="mt-8 xl:mt-[2rem]">
          <ProjectFilter
            counts={{ all: allProducts.length, software: softwareDetails.length, iot: iotDetails.length }}
          >
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-[1.2rem]">
              {allProducts.map((product) => {
                const visual = visualFor(product);
                return (
                  <li key={product.slug} data-cat={product.kind}>
                    <Link
                      href={productHref(product)}
                      className="card-frame group flex h-full flex-col overflow-hidden rounded-[1.1rem] bg-[#0a1a3a]"
                    >
                      <span className="relative block h-[11.5rem] shrink-0 overflow-hidden xl:h-[11rem]">
                        <ProductPhoto
                          src={visual.image}
                          alt={visual.alt}
                          position={visual.position}
                          scale={visual.scale}
                          origin={visual.origin}
                          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                        />
                        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,26,58,0)_45%,#0a1a3a_100%)]" />
                        <span className="absolute top-[0.8rem] left-[0.8rem] rounded-full border border-white/20 bg-[rgba(6,12,30,0.72)] px-[0.75rem] py-[0.25rem] fs-72 font-semibold tracking-[0.08em] text-white uppercase backdrop-blur-md">
                          {product.kind === "software" ? "Software" : "IoT"}
                        </span>
                      </span>

                      <span className="flex flex-1 flex-col px-[1.3rem] pb-[1.2rem]">
                        <span className="fs-115 leading-tight font-semibold text-white">{product.name}</span>
                        <span className="mt-[0.35rem] fs-90 leading-[1.55] text-[#9db0d0]">{product.tagline}</span>
                        <span className="mt-auto inline-flex items-center gap-2 pt-[0.9rem] fs-88 font-semibold text-brand-cyan">
                          View project
                          <ArrowRight
                            className="size-[0.9rem] transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </ProjectFilter>
        </div>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Process                                                   */}
      {/* -------------------------------------------------------- */}
      <Section tone="panel" labelledBy="projects-process-title">
        <SectionTitle
          id="projects-process-title"
          eyebrow="How every project runs"
          title="The same clear process,"
          highlight="every time"
        />
        <div className="mt-8 xl:mt-[2.2rem]">
          <Steps steps={softwareSteps} />
        </div>
      </Section>

      <CtaBanner
        title="Have a Project in Mind?"
        text="Tell us what you would like to build and we will come back with a clear plan."
        secondaryLabel="Start a Project"
      />
    </>
  );
}
