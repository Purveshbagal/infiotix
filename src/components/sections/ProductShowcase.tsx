import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import ProductPhoto from "@/components/ui/ProductPhoto";
import { productHref, visualFor, type ProductDetail } from "@/data/products";
import { cn } from "@/lib/cn";

type ProductShowcaseProps = {
  products: ProductDetail[];
  /** Label of the outlined button next to "View Details", e.g. "Request a Demo" or "Get a Quote" */
  secondaryLabel: string;
};

/**
 * The product list used by both /software and /iot-products: one wide row per product, photo on
 * one side and copy on the other, flipping sides row by row. Keeping it in one place means the
 * two pages always look and behave the same.
 */
export default function ProductShowcase({ products, secondaryLabel }: ProductShowcaseProps) {
  return (
    <ul className="mt-8 space-y-6 xl:mt-[2.2rem] xl:space-y-[1.8rem]">
      {products.map((product, i) => {
        const visual = visualFor(product);
        const Icon = visual.icon;
        const flip = i % 2 === 1;

        return (
          <li key={product.slug}>
            <article className="group surface-glass grid overflow-hidden rounded-[1.4rem] shadow-[0_28px_70px_-40px_rgba(40,100,255,0.6)] transition-colors duration-300 hover:border-[rgba(130,175,255,0.5)] xl:grid-cols-2">
              <div className={cn("relative min-h-[15rem] sm:min-h-[19rem] xl:min-h-[22rem]", flip && "xl:order-2")}>
                <ProductPhoto
                  src={visual.image}
                  alt={visual.alt}
                  position={visual.position}
                  scale={visual.scale}
                  origin={visual.origin}
                  sizes="(min-width: 1280px) 50vw, 100vw"
                />
                {/* fades the photo into the copy panel next to it (below it on small screens) */}
                <div
                  className={cn(
                    "absolute inset-0 max-xl:bg-[linear-gradient(180deg,rgba(10,22,52,0)_55%,rgba(10,22,52,0.9)_100%)]",
                    flip
                      ? "bg-[linear-gradient(270deg,rgba(10,22,52,0)_55%,rgba(10,22,52,0.85)_100%)]"
                      : "bg-[linear-gradient(90deg,rgba(10,22,52,0)_55%,rgba(10,22,52,0.85)_100%)]",
                  )}
                />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 xl:p-[2.5rem]">
                <span
                  className="grid size-[2.8rem] place-items-center rounded-[0.85rem] border bg-white/[0.03]"
                  style={{
                    color: visual.accent,
                    borderColor: `${visual.accent}66`,
                    boxShadow: `0 0 20px -6px ${visual.accent}99, inset 0 0 12px ${visual.accent}1f`,
                  }}
                >
                  <Icon className="size-[1.35rem]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="mt-[1rem] fs-170 leading-tight font-bold text-white xl:fs-190">{product.name}</h3>
                <p className="mt-[0.3rem] fs-105 font-medium text-brand-cyan">{product.tagline}</p>
                <p className="mt-[0.7rem] fs-100 leading-[1.7] text-[#a7b6d3]">{product.summary}</p>

                <ul className="mt-[1.1rem] flex flex-wrap gap-[0.5rem]">
                  {product.features.slice(0, 6).map((feature) => (
                    <li
                      key={feature.title}
                      className="rounded-full border border-white/[0.1] bg-white/[0.04] px-[0.8rem] py-[0.3rem] fs-82 text-[#c3d2ef]"
                    >
                      {feature.title}
                    </li>
                  ))}
                </ul>

                <div className="mt-[1.5rem] flex flex-wrap items-center gap-[0.8rem]">
                  <Button href={productHref(product)} size="sm">
                    View Details
                    <ArrowRight
                      className="size-[0.9rem] transition-transform group-hover/btn:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Button>
                  <Button
                    href={`/contact?interest=${encodeURIComponent(product.name)}`}
                    variant="outline"
                    size="sm"
                  >
                    {secondaryLabel}
                  </Button>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
