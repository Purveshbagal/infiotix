import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  text: ReactNode;
  /** Icon colour; defaults to the brand blue */
  color?: string;
  className?: string;
  children?: ReactNode;
};

/** Glass card with a glowing icon tile: the workhorse card for feature / capability grids. */
export default function FeatureCard({
  icon: Icon,
  title,
  text,
  color = "#6fb0ff",
  className,
  children,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "surface-glass group flex h-full flex-col rounded-[1.1rem] p-[1.3rem] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(130,175,255,0.5)] xl:p-[1.4rem]",
        className,
      )}
    >
      <span
        className="grid size-[2.8rem] place-items-center rounded-[0.85rem] border bg-white/[0.03]"
        style={{
          color,
          borderColor: `${color}66`,
          boxShadow: `0 0 20px -6px ${color}99, inset 0 0 12px ${color}1f`,
        }}
      >
        <Icon className="size-[1.35rem]" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <h3 className="mt-[1rem] fs-120 leading-tight font-semibold text-white">{title}</h3>
      <p className="mt-[0.4rem] fs-96 leading-[1.65] text-[#9db0d0]">{text}</p>
      {/* extra content (links, lists) sits at the bottom so cards in a row line up */}
      {children && <div className="mt-auto">{children}</div>}
    </div>
  );
}
