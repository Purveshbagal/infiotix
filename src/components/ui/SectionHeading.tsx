import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  /** Heading text before the highlighted part */
  title: string;
  /** Highlighted (blue gradient) tail of the heading */
  highlight?: string;
  eyebrowClassName?: string;
  /** Right-aligned content: short description + action button */
  aside?: ReactNode;
  className?: string;
};

export default function SectionHeading({
  id,
  eyebrow,
  title,
  highlight,
  eyebrowClassName,
  aside,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8",
        className,
      )}
    >
      <div>
        <p className={cn("eyebrow text-[#3b9bff]", eyebrowClassName)}>{eyebrow}</p>
        <h2
          id={id}
          className="mt-[0.55rem] fs-165 leading-[1.2] font-bold tracking-[-0.005em] text-white sm:fs-200 xl:fs-202 xl:whitespace-nowrap"
        >
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-gradient-brand">{highlight}</span>
            </>
          )}
        </h2>
      </div>
      {aside && <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:mb-[0.2rem]">{aside}</div>}
    </div>
  );
}
