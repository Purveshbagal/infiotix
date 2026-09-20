import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

/** Accordion built on native <details>: works without JavaScript and is keyboard accessible. */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="surface-glass divide-y divide-white/[0.08] overflow-hidden rounded-[1.2rem]">
      {items.map((item) => (
        <details key={item.q} className="group open:bg-white/[0.03]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[1.3rem] py-[1.05rem] fs-105 leading-snug font-semibold text-white transition-colors hover:text-[#bcd6ff] xl:px-[1.6rem] [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown
              className="size-5 shrink-0 text-brand-cyan transition-transform duration-300 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="px-[1.3rem] pb-[1.2rem] fs-98 leading-[1.7] text-[#a7b6d3] xl:px-[1.6rem]">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
