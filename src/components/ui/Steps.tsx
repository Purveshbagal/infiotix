import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type Step = { title: string; text: string };

/** Numbered process cards (four across on desktop) with a small arrow between them. */
export default function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol
      className={cn(
        "grid gap-4 sm:grid-cols-2 xl:gap-[1.2rem]",
        steps.length === 3 ? "xl:grid-cols-3" : "xl:grid-cols-4",
      )}
    >
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="surface-glass relative rounded-[1.1rem] p-[1.3rem] xl:p-[1.5rem]"
        >
          <span className="grid size-[2.6rem] place-items-center rounded-full border border-[rgba(110,170,255,0.5)] bg-[rgba(37,99,235,0.22)] fs-100 font-bold text-white shadow-[0_0_22px_-4px_rgba(47,107,255,0.7)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-[1rem] fs-120 leading-tight font-semibold text-white">{step.title}</h3>
          <p className="mt-[0.4rem] fs-96 leading-[1.65] text-[#9db0d0]">{step.text}</p>

          {i < steps.length - 1 && (
            <ChevronRight
              className="absolute top-[1.55rem] -right-[0.95rem] z-10 hidden size-5 text-[#4f7dff] xl:block"
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
}
