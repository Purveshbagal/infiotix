import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { softwareProducts } from "@/data/site";

export default function SoftwareSolutions() {
  return (
    <section
      id="software"
      aria-labelledby="software-title"
      className="pt-12 xl:pt-[1.7rem]"
    >
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 xl:px-[2.8rem]">
        <SectionHeading
          id="software-title"
          eyebrow="Software Solutions"
          title="Powering Businesses with"
          highlight="Smart Software"
          className="xl:px-[2.2rem]"
          aside={
            <>
              <p className="fs-88 leading-[1.55] text-[#a7b6d3] xl:whitespace-pre-line">
                {"Digital solutions to simplify operations\nand improve productivity."}
              </p>
              <Button href="/software" variant="outline" size="pill">
                View All Software
                <ArrowRight className="size-[0.95rem]" aria-hidden="true" />
              </Button>
            </>
          }
        />

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:mt-[0.8rem] xl:grid-cols-4 xl:gap-[0.8rem]">
          {softwareProducts.map((product) => {
            const Icon = product.icon;
            return (
              <li key={product.id} className="group">
                <article className="card-frame flex h-full flex-col overflow-hidden rounded-[1.1rem] bg-[#0a1a3a]">
                  {/* photo */}
                  <div className="relative h-[11.5rem] shrink-0 overflow-hidden xl:h-[10.9rem]">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="zoom-img object-cover"
                      style={
                        {
                          objectPosition: product.position,
                          transformOrigin: product.origin ?? "50% 50%",
                          "--img-scale": product.scale ?? 1,
                        } as CSSProperties
                      }
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,26,58,0)_42%,rgba(10,26,58,0.65)_76%,#0a1a3a_100%)]" />
                  </div>

                  {/* copy */}
                  <div className="flex flex-1 flex-col px-[1.4rem] pb-[1rem]">
                    <h3 className="fs-110 leading-[1.3] font-semibold text-white">
                      {product.title}
                    </h3>
                    <p className="mt-[0.35rem] fs-88 leading-[1.55] whitespace-pre-line text-[#9db0d0]">
                      {product.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-[0.85rem]">
                      <Icon
                        className="size-[1.1rem] shrink-0"
                        style={{ color: product.accent }}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                      <Button href={product.cta.href} variant="outline" size="sm">
                        {product.cta.label}
                        <ArrowRight
                          className="size-[0.9rem] transition-transform group-hover/btn:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
