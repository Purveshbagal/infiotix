import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  id: string;
  eyebrow: string;
  title: string;
  /** Blue-gradient tail of the heading */
  highlight?: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Eyebrow + heading (+ intro) that opens a section. Wraps normally, unlike the home-page heading. */
export default function SectionTitle({
  id,
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  className,
}: SectionTitleProps) {
  const centered = align === "center";
  return (
    <div className={cn(centered && "mx-auto text-center", "max-w-[46rem]", className)}>
      <p className="eyebrow text-[#3b9bff]">{eyebrow}</p>
      <h2
        id={id}
        className="mt-[0.55rem] fs-170 leading-[1.18] font-bold tracking-[-0.005em] text-balance text-white sm:fs-200 xl:fs-220"
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient-brand">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="mt-[0.8rem] fs-100 leading-[1.7] text-[#9db0d0] xl:fs-105">{description}</p>
      )}
    </div>
  );
}
