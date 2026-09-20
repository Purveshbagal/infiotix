import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  /** Blue-gradient tail of the heading */
  highlight?: string;
  description: ReactNode;
  /** Trail after "Home" */
  breadcrumbs: Crumb[];
  actions?: ReactNode;
  /** Right-hand visual (stacks under the copy on small screens) */
  visual?: ReactNode;
  /** Extra content under the buttons, e.g. chips */
  children?: ReactNode;
};

/**
 * Shared header block for every inner page: breadcrumb, eyebrow, big heading, intro copy and
 * calls to action over the same navy glow the home hero uses.
 */
export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  breadcrumbs,
  actions,
  visual,
  children,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-title"
      className="relative isolate overflow-hidden border-b border-white/[0.06]"
    >
      {/* backdrop: colour glows, blueprint grid, fade into the page */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_26rem_at_84%_-12%,rgba(37,99,235,0.3),transparent_70%),radial-gradient(38rem_20rem_at_4%_112%,rgba(14,165,233,0.16),transparent_70%)]" />
        <div className="bg-grid-faint absolute inset-0 opacity-70 [mask-image:radial-gradient(75%_100%_at_72%_0%,#000,transparent_78%)]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy-950/80 to-transparent" />
      </div>

      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 xl:px-[5rem]">
        <div
          className={cn(
            "grid items-center gap-10 py-10 sm:py-14 xl:py-[3.4rem]",
            !!visual && "xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] xl:gap-[3.5rem]",
          )}
        >
          <div>
            <Breadcrumbs items={breadcrumbs} className="animate-fade-up" />

            <p className="eyebrow animate-fade-up mt-[1.4rem] text-[#3b9bff] [animation-delay:60ms]">
              {eyebrow}
            </p>

            <h1
              id="page-title"
              className="animate-fade-up mt-[0.6rem] text-[clamp(2rem,7.8vw,2.9rem)] leading-[1.08] font-bold tracking-[-0.01em] text-balance text-white [animation-delay:120ms] xl:fs-330 xl:leading-[1.06]"
            >
              {title}
              {highlight && (
                <>
                  {" "}
                  <span className="text-gradient-brand">{highlight}</span>
                </>
              )}
            </h1>

            <p className="animate-fade-up mt-[1rem] max-w-[38rem] fs-105 leading-[1.7] text-[#b3c2df] [animation-delay:180ms] xl:fs-108">
              {description}
            </p>

            {actions && (
              <div className="animate-fade-up mt-[1.7rem] flex flex-wrap items-center gap-[0.9rem] [animation-delay:240ms]">
                {actions}
              </div>
            )}

            {children && (
              <div className="animate-fade-up mt-[1.6rem] [animation-delay:300ms]">{children}</div>
            )}
          </div>

          {visual && <div className="animate-fade-up [animation-delay:200ms]">{visual}</div>}
        </div>
      </div>
    </section>
  );
}
