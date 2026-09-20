import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import CtaBanner from "@/components/sections/CtaBanner";
import Button from "@/components/ui/Button";
import Faq from "@/components/ui/Faq";
import FeatureCard from "@/components/ui/FeatureCard";
import PageHero from "@/components/ui/PageHero";
import ProductPhoto from "@/components/ui/ProductPhoto";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Steps from "@/components/ui/Steps";
import { company } from "@/data/site";
import { findBySlug, productHref, visualFor, type ProductDetail } from "@/data/products";
import { cn } from "@/lib/cn";
import JsonLd from "@/components/seo/JsonLd";
import { productSeo } from "@/data/seo";
import { productGraph } from "@/lib/schema";

const kindMeta = {
  software: {
    eyebrow: "Software Solutions",
    parent: "Software",
    parentHref: "/software",
    featuresEyebrow: "Key modules",
    featuresTitle: "Everything you need,",
    featuresHighlight: "in one system",
    primaryCta: "Request a Demo",
  },
  iot: {
    eyebrow: "IoT Products",
    parent: "IoT Products",
    parentHref: "/iot-products",
    featuresEyebrow: "Features",
    featuresTitle: "Smart features,",
    featuresHighlight: "simple to use",
    primaryCta: "Get a Quote",
  },
} as const;

/** Product page used by both /software/[slug] and /iot-products/[slug]. */
export default function ProductDetailPage({ product }: { product: ProductDetail }) {
  const meta = kindMeta[product.kind];
  const seo = productSeo[product.slug];
  const visual = visualFor(product);
  const interestHref = `/contact?interest=${encodeURIComponent(product.name)}`;
  const related = product.related
    .map((slug) => findBySlug(slug))
    .filter((item): item is ProductDetail => Boolean(item));

  return (
    <>
      <JsonLd data={productGraph(product)} />
      <PageHero
        eyebrow={meta.eyebrow}
        title={product.name}
        breadcrumbs={[{ label: meta.parent, href: meta.parentHref }, { label: product.name }]}
        description={
          <>
            <span className="mb-[0.5rem] block fs-115 font-semibold text-brand-cyan">{product.tagline}</span>
            {product.summary}
          </>
        }
        actions={
          <>
            <Button href={interestHref} size="md">
              {meta.primaryCta}
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button href={company.phoneHref} variant="outline" size="md">
              <Phone className="size-[1rem] text-brand-cyan" aria-hidden="true" />
              {company.phone}
            </Button>
          </>
        }
        visual={
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2.2rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(47,107,255,0.35),transparent_75%)] blur-2xl"
            />
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-[rgba(110,160,255,0.35)] bg-[#07112a] shadow-[0_40px_90px_-40px_rgba(40,100,255,0.85)]">
              <ProductPhoto
                src={visual.image}
                alt={visual.alt}
                position={visual.position}
                scale={visual.scale}
                origin={visual.origin}
                sizes="(min-width: 1280px) 46vw, 100vw"
                eager
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,20,0)_58%,rgba(4,8,20,0.6)_100%)]" />

              {/* key points along the bottom edge, clear of the subject of the photo */}
              <ul className="absolute inset-x-[0.9rem] bottom-[0.9rem] flex flex-wrap gap-[0.5rem]">
                {product.chips.map((chip) => (
                  <li
                    key={chip}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[rgba(6,12,30,0.72)] px-[0.9rem] py-[0.4rem] fs-86 font-medium text-white backdrop-blur-md"
                  >
                    <span className="size-[0.4rem] rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(34,200,245,0.9)]" />
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      />

      {/* -------------------------------------------------------- */}
      {/*  Overview (crawlable description of the product)           */}
      {/* -------------------------------------------------------- */}
      {seo && (
        <Section labelledBy="overview-title">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-[3rem]">
            <SectionTitle id="overview-title" eyebrow="Overview" title="About the" highlight={product.name} />
            <div className="grid gap-[1rem]">
              {seo.overview.map((paragraph) => (
                <p key={paragraph} className="fs-105 leading-[1.75] text-[#b3c2df]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* -------------------------------------------------------- */}
      {/*  Features                                                  */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="features-title">
        <SectionTitle
          id="features-title"
          eyebrow={meta.featuresEyebrow}
          title={meta.featuresTitle}
          highlight={meta.featuresHighlight}
        />
        <ul
          className={cn(
            "mt-8 grid gap-4 sm:grid-cols-2 xl:mt-[2.2rem] xl:gap-[1.2rem]",
            product.features.length % 3 === 0 ? "xl:grid-cols-3" : "xl:grid-cols-4",
          )}
        >
          {product.features.map((feature) => (
            <li key={feature.title}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                text={feature.text}
                color={visual.accent}
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Benefits + audience                                       */}
      {/* -------------------------------------------------------- */}
      <Section tone="panel" labelledBy="benefits-title">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:gap-[3rem]">
          <div>
            <SectionTitle
              id="benefits-title"
              eyebrow="Why choose it"
              title="Built to make"
              highlight="your day easier"
            />
            <ul className="mt-6 grid gap-[0.85rem] sm:grid-cols-2 xl:mt-[1.8rem]">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-[0.75rem]">
                  <span className="mt-[0.15rem] grid size-[1.4rem] shrink-0 place-items-center rounded-full bg-[rgba(34,200,245,0.14)] text-brand-cyan ring-1 ring-[rgba(34,200,245,0.4)]">
                    <Check className="size-[0.85rem]" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  <span className="fs-100 leading-[1.6] text-[#c3d2ef]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="surface-glass self-start rounded-[1.3rem] p-[1.4rem] xl:p-[1.8rem]">
            <p className="eyebrow text-[#7b85ff]">Built for</p>
            <ul className="mt-[0.9rem] flex flex-wrap gap-[0.55rem]">
              {product.audience.map((who) => (
                <li
                  key={who}
                  className="rounded-full border border-[rgba(110,160,255,0.3)] bg-[rgba(37,99,235,0.14)] px-[0.95rem] py-[0.4rem] fs-92 text-[#d5e2ff]"
                >
                  {who}
                </li>
              ))}
            </ul>
            <p className="mt-[1.3rem] fs-96 leading-[1.65] text-[#9db0d0]">
              Not sure it fits your case? Tell us about it and we will suggest the right setup. If you need
              something different, we also build{" "}
              <Link
                href="/software/custom-software-development"
                className="font-medium text-brand-cyan underline-offset-4 hover:underline"
              >
                custom solutions
              </Link>
              .
            </p>
            <Button href="/contact" variant="outline" size="sm" className="mt-[1.1rem]">
              Talk to our team
              <ArrowRight className="size-[0.9rem] transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </Button>
          </aside>
        </div>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Process                                                   */}
      {/* -------------------------------------------------------- */}
      <Section labelledBy="process-title">
        <SectionTitle
          id="process-title"
          eyebrow="How it works"
          title="Simple from"
          highlight="start to finish"
          description="We handle the details, so you always know what happens next."
        />
        <div className="mt-8 xl:mt-[2.2rem]">
          <Steps steps={product.steps} />
        </div>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  FAQ                                                       */}
      {/* -------------------------------------------------------- */}
      <Section tone="panel" labelledBy="faq-title">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-[3rem]">
          <SectionTitle
            id="faq-title"
            eyebrow="FAQ"
            title="Good to"
            highlight="know"
            description={`Common questions about the ${product.name}. Anything else? Just ask.`}
          />
          <Faq items={product.faqs} />
        </div>
      </Section>

      {/* -------------------------------------------------------- */}
      {/*  Related                                                   */}
      {/* -------------------------------------------------------- */}
      {related.length > 0 && (
        <Section labelledBy="related-title">
          <SectionTitle id="related-title" eyebrow="Explore more" title="You might also" highlight="like" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:mt-[2.2rem] xl:grid-cols-3 xl:gap-[1.2rem]">
            {related.map((item) => {
              const itemVisual = visualFor(item);
              return (
                <li key={item.slug}>
                  <Link
                    href={productHref(item)}
                    className="card-frame group block overflow-hidden rounded-[1.1rem] bg-[#0a1a3a]"
                  >
                    <span className="relative block h-[11rem] overflow-hidden">
                      <ProductPhoto
                        src={itemVisual.image}
                        alt=""
                        position={itemVisual.position}
                        scale={itemVisual.scale}
                        origin={itemVisual.origin}
                        sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,26,58,0)_40%,#0a1a3a_100%)]" />
                    </span>
                    <span className="block px-[1.3rem] pt-[0.2rem] pb-[1.2rem]">
                      <span className="block fs-120 leading-tight font-semibold text-white">{item.name}</span>
                      <span className="mt-[0.3rem] block fs-92 leading-[1.55] text-[#9db0d0]">
                        {item.tagline}
                      </span>
                      <span className="mt-[0.8rem] inline-flex items-center gap-2 fs-90 font-semibold text-brand-cyan">
                        View details
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
        </Section>
      )}

      <CtaBanner
        title={`Interested in ${product.name}?`}
        text="Talk to our team for a free consultation and a clear, no-obligation quote."
        secondaryLabel={meta.primaryCta}
        secondaryHref={interestHref}
      />
    </>
  );
}
