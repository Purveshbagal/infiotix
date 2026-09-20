import { processSteps } from "@/data/site";

export default function ProcessStrip() {
  return (
    <section
      id="process"
      aria-label="How we work"
      className="relative z-10 px-4 sm:px-6 xl:px-[2.8rem]"
    >
      <div className="mx-auto max-w-[110rem] rounded-[1.4rem] border border-[rgba(80,130,255,0.24)] bg-[linear-gradient(180deg,rgba(14,28,64,0.55),rgba(7,14,34,0.6))] p-3 shadow-[0_24px_60px_-30px_rgba(40,100,255,0.45)] backdrop-blur-md sm:p-4 xl:rounded-[1.6rem] xl:px-[2.15rem] xl:py-[1.3rem]">
        <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-[1.3rem]">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="surface-glass flex h-[4.6rem] items-center gap-[0.95rem] rounded-[1rem] px-[1.35rem] transition-colors duration-300 hover:border-[rgba(130,175,255,0.5)] xl:h-[4.9rem]"
                style={i === 1 ? { background: "linear-gradient(180deg, rgba(34,62,124,0.5), rgba(12,26,58,0.6))" } : undefined}
              >
                <Icon
                  className="size-[2.15rem] shrink-0"
                  style={{ color: step.color, filter: `drop-shadow(0 0 8px ${step.color}66)` }}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <h3 className="fs-100 leading-tight font-semibold text-white">{step.title}</h3>
                  <p className="mt-[0.28rem] fs-83 leading-tight text-[#93a7cc]">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
