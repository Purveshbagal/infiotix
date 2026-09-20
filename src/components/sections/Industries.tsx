import { Fragment } from "react";
import { industries, whyChoose } from "@/data/site";

export default function Industries() {
  return (
    <section
      id="industries"
      aria-label="Industries we serve and why choose Infiotix"
      className="pt-10 xl:pt-[1.9rem]"
    >
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 xl:px-[3.7rem]">
        <div className="grid items-end gap-10 xl:grid-cols-[minmax(0,1fr)_30rem] xl:gap-[2.2rem]">
          {/* ---------------- Industries ---------------- */}
          <div>
            <p className="eyebrow text-[#dfe6f7]">Industries We Serve</p>
            <h2 className="mt-[0.35rem] fs-160 leading-tight font-bold tracking-[-0.005em] text-white xl:fs-170">
              Technology for Every Industry
            </h2>

            <ul className="mt-[0.75rem] flex flex-wrap items-center gap-x-[0.9rem] gap-y-3 xl:gap-x-[0.85rem]">
              {industries.map((industry, i) => {
                const Icon = industry.icon;
                return (
                  <Fragment key={industry.label}>
                    {/* subtle dotted divider before the last tile, as in the design */}
                    {i === industries.length - 1 && (
                      <li
                        aria-hidden="true"
                        className="mx-[0.2rem] hidden h-[3.1rem] border-l border-dotted border-white/25 xl:block"
                      />
                    )}
                    <li className="group flex h-[4.25rem] min-w-[4.3rem] flex-col items-center justify-center gap-[0.42rem] rounded-[0.9rem] border border-[rgba(90,140,255,0.2)] bg-[linear-gradient(180deg,rgba(24,44,92,0.35),rgba(8,16,38,0.5))] px-[0.4rem] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(130,175,255,0.5)] sm:px-[0.6rem] xl:px-[0.4rem]">
                      <Icon
                        className="size-[1.65rem] transition-transform duration-300 group-hover:scale-110"
                        style={{ color: industry.color, filter: `drop-shadow(0 0 7px ${industry.color}55)` }}
                        fill={industry.color}
                        fillOpacity={0.22}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                      <span className="fs-63 leading-none whitespace-nowrap text-[#cdd8ee]">
                        {industry.label}
                      </span>
                    </li>
                  </Fragment>
                );
              })}
            </ul>
          </div>

          {/* ---------------- Why choose ---------------- */}
          <div id="why-choose">
            <p className="eyebrow text-[#7b85ff]">Why Choose Infiotix</p>
            <ul className="mt-[0.7rem] grid grid-cols-2 gap-[0.55rem] sm:grid-cols-4">
              {whyChoose.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.lines.join(" ")}
                    className="group flex h-[6.7rem] flex-col items-center justify-center gap-[0.6rem] rounded-[1.1rem] border border-[rgba(90,120,255,0.22)] bg-[linear-gradient(180deg,rgba(20,34,84,0.4),rgba(8,14,36,0.55))] text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(130,160,255,0.55)]"
                  >
                    <Icon
                      className="size-[1.8rem] text-[#5b7cff] transition-transform duration-300 group-hover:scale-110"
                      style={{ filter: "drop-shadow(0 0 8px rgba(91,124,255,0.5))" }}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="fs-82 leading-[1.35] text-[#b9c7e6]">
                      {item.lines[0]}
                      <br />
                      {item.lines[1]}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
