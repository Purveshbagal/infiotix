import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline";
type Size = "sm" | "pill" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap " +
  "transition-all duration-300 ease-out active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(90deg,#1c64f2_0%,#3b5bff_55%,#5b3df5_100%)] text-white " +
    "shadow-[0_10px_30px_-8px_rgba(59,91,255,0.75),inset_0_1px_0_rgba(255,255,255,0.28)] " +
    "hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_14px_36px_-8px_rgba(59,91,255,0.9),inset_0_1px_0_rgba(255,255,255,0.3)]",
  outline:
    "border border-[rgba(88,110,255,0.55)] bg-[rgba(12,22,58,0.55)] text-white backdrop-blur-sm " +
    "hover:-translate-y-0.5 hover:border-[rgba(130,160,255,0.95)] hover:bg-[rgba(34,56,130,0.5)]",
};

const sizes: Record<Size, string> = {
  sm: "h-[2.55rem] px-[1.15rem] fs-86",
  /** compact outlined pill used next to section headings */
  pill: "h-[2.6rem] px-[1.45rem] fs-86",
  md: "h-11 px-6 fs-90",
  lg: "h-[3.05rem] px-7 fs-95",
};

type ButtonProps = Omit<ComponentProps<"a">, "href" | "children"> & {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

const isExternal = (href: string) => /^(tel:|mailto:|https?:)/.test(href);

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (isExternal(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
