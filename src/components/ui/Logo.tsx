import Image from "next/image";
import { company } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * The official Infiotix logo (stacked: hexagon mark, "Infiotix" wordmark, "TECHNOLOGIES").
 *
 * `/images/logo-tight.png` is `/images/logoo.png` cropped to its visible pixels. The original
 * has ~40 % transparent padding, which would make the logo render far smaller than its box.
 * `width` / `height` are the tight file's real pixel size and only give the aspect ratio –
 * the on-screen size comes from the classes below.
 */
const LOGO = { src: "/images/logo-tight.png", width: 388, height: 390 } as const;

/** "Innovating Connected Lives" -> "Innovating" / "Connected Lives" for the two-line tagline. */
const [taglineTop, ...taglineRest] = company.tagline.split(" ");
const taglineBottom = taglineRest.join(" ");

type LogoProps = {
  className?: string;
  /** "header" fits inside the sticky bar, "footer" is the larger brand block */
  variant?: "header" | "footer";
};

export default function Logo({ className, variant = "header" }: LogoProps) {
  const isHeader = variant === "header";

  return (
    <span
      className={cn(
        "flex items-center select-none",
        // The logo is much narrower than the wide wordmark the design was drawn with. Keep
        // reserving that width in the header so the nav stays exactly where the design has it.
        isHeader && "xl:w-[14.25rem]",
        className,
      )}
    >
      <Image
        src={LOGO.src}
        width={LOGO.width}
        height={LOGO.height}
        alt="Infiotix Technologies"
        // Never rendered wider than ~96px, so don't let the browser fetch a bigger file.
        sizes="96px"
        loading={isHeader ? "eager" : "lazy"}
        draggable={false}
        className={cn(
          "block w-auto",
          isHeader ? "h-[3.25rem] xl:h-[3.5rem]" : "h-[5.25rem] xl:h-[5.5rem]",
        )}
      />

      {/*
        Header only: a small tagline fills the room beside the narrow logo. The footer already
        prints the tagline under its logo, and phones keep just the logo next to the buttons.
      */}
      {isHeader && (
        <span className="ml-[0.85rem] hidden border-l border-white/[0.16] py-[0.15rem] pl-[0.85rem] fs-64 leading-[1.6] font-medium tracking-[0.18em] whitespace-nowrap uppercase sm:block">
          <span className="block text-slate-300">{taglineTop}</span>
          <span className="block text-brand-cyan">{taglineBottom}</span>
        </span>
      )}
    </span>
  );
}
