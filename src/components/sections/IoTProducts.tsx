import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { iotProducts } from "@/data/site";

export default function IoTProducts() {
  return (
    <section id="iot" aria-labelledby="iot-title" className="pt-12 xl:pt-[2.3rem]">
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 xl:px-[2.8rem]">
        <SectionHeading
          id="iot-title"
          eyebrow="IoT Products"
          title="Smart Devices for a"
          highlight="Connected World"
          className="xl:px-[2.2rem]"
          aside={
            <>
              <p className="fs-88 leading-[1.55] text-[#a7b6d3] xl:whitespace-nowrap">
                Innovative IoT products for home, office, industry and agriculture.
              </p>
              <Button href="/iot-products" variant="outline" size="pill">
                View All IoT Products
                <ArrowRight className="size-[0.95rem]" aria-hidden="true" />
              </Button>
            </>
          }
        />

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:mt-[1rem] xl:grid-cols-4 xl:gap-[0.8rem]">
          {iotProducts.map((product) => {
            const Icon = product.icon;
            return (
              <li key={product.id} className="group">
                <article className="card-frame relative h-[24rem] overflow-hidden rounded-[1.1rem] bg-[#07112a] xl:h-[20rem]">
                  {/* photo (top ~2/3) that fades into the card body */}
                  <div className="absolute inset-x-0 top-0 h-[74%] overflow-hidden">
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
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,42,0)_32%,rgba(7,17,42,0.55)_54%,rgba(7,17,42,0.92)_72%,#07112a_88%)]" />

                  {/* floating labels drawn over the photo (Smart Door Lock) */}
                  {product.callouts && (
                    <ul
                      aria-hidden="true"
                      className="absolute top-[2.2rem] left-[61%] hidden flex-col gap-[0.95rem] fs-86 leading-none text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.75)] sm:flex"
                    >
                      {product.callouts.map((label) => (
                        <li key={label} className="flex items-center gap-[0.55rem]">
                          <span className="size-[0.28rem] rounded-full bg-white/60" />
                          {label}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* title + feature list */}
                  <div className="absolute inset-x-0 bottom-0 px-[1.4rem] pb-[1rem]">
                    <span className="mb-[0.75rem] grid size-10 place-items-center rounded-[0.8rem] bg-[rgba(37,99,235,0.38)] text-[#7cb6ff] shadow-[0_0_26px_-2px_rgba(47,107,255,0.75)] ring-1 ring-[rgba(110,170,255,0.5)] backdrop-blur-sm">
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="fs-120 leading-tight font-bold text-white">{product.title}</h3>
                    <ul className="mt-[0.5rem]">
                      {product.features.map((feature) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <li
                            key={feature.label}
                            className="flex h-[1.6rem] items-center gap-[0.7rem] fs-88 text-[#cfe0f5]"
                          >
                            <FeatureIcon
                              className="size-[1.05rem] shrink-0 text-[#2fd6b4]"
                              strokeWidth={1.8}
                              aria-hidden="true"
                            />
                            {feature.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* whole card opens the product page */}
                  <Link
                    href={product.href}
                    aria-label={`${product.title} – view details`}
                    className="absolute inset-0 z-20 rounded-[1.1rem]"
                  />
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
