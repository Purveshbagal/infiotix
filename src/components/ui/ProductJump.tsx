import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

type JumpItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  /** Icon tint; defaults to the brand blue */
  color?: string;
};

/** Glass panel of quick links to every product on a listing page (used as the hero visual). */
export default function ProductJump({ heading, items }: { heading: string; items: JumpItem[] }) {
  return (
    <div className="surface-glass rounded-[1.4rem] p-[1.2rem] shadow-[0_30px_70px_-36px_rgba(40,100,255,0.6)] xl:p-[1.5rem]">
      <p className="eyebrow px-1 text-[#7b85ff]">{heading}</p>
      <ul className="mt-[0.9rem] grid gap-[0.6rem]">
        {items.map(({ title, href, icon: Icon, color = "#6fb0ff" }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex items-center gap-[0.9rem] rounded-[0.9rem] border border-white/[0.07] bg-white/[0.03] px-[1rem] py-[0.8rem] transition-all duration-300 hover:border-[rgba(130,175,255,0.5)] hover:bg-white/[0.06]"
            >
              <span
                className="grid size-[2.4rem] shrink-0 place-items-center rounded-[0.7rem]"
                style={{ color, background: `${color}1f`, boxShadow: `inset 0 0 0 1px ${color}55` }}
              >
                <Icon className="size-[1.2rem]" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="flex-1 fs-105 font-medium text-white">{title}</span>
              <ArrowRight
                className="size-4 text-[#7f93bd] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
