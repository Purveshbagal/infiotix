import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  /** Names the section for assistive tech when it has no visible heading id */
  labelledBy?: string;
  /** "panel" adds a faint band behind the section so long pages get some rhythm */
  tone?: "plain" | "panel";
  className?: string;
  children: ReactNode;
};

/** Standard inner-page section: consistent vertical rhythm and the site's content width. */
export default function Section({ id, labelledBy, tone = "plain", className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-12 sm:py-14 xl:py-[3.6rem]",
        tone === "panel" &&
          "border-y border-white/[0.05] bg-[linear-gradient(180deg,rgba(12,24,58,0.42),rgba(6,12,30,0.18))]",
        className,
      )}
    >
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 xl:px-[5rem]">{children}</div>
    </section>
  );
}
