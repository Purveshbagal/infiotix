import { preload } from "react-dom";
import { ArrowRight, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import HeroVideo from "@/components/ui/HeroVideo";
import Robot from "@/components/ui/Robot";
import { versionedPublicUrl } from "@/lib/assets";
import { heroFeatures, heroStats, heroTags } from "@/data/site";
import { cn } from "@/lib/cn";

export default function Hero() {
  const videoSrc = versionedPublicUrl("/videos/hero-loop.mp4");
  const posterSrc = versionedPublicUrl("/videos/hero-poster.jpg");
  // The poster is the biggest thing painted above the fold (Largest Contentful Paint, a Core Web
  // Vitals ranking signal), so ask the browser to fetch it first instead of discovering it late.
  preload(posterSrc, { as: "image", fetchPriority: "high" });

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate -mt-16 min-h-[44rem] overflow-hidden pt-16 xl:min-h-0 xl:-mt-[4.25rem] xl:pt-[4.25rem]"
    >
      {/* ---------------------------------------------------------- */}
      {/*  Background photo + readability overlays                    */}
      {/* ---------------------------------------------------------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        {/*
          Desktop: the video is fitted to the hero height and pinned to the right, so the
          whole scene stays visible. Its left edge is dissolved with a plain gradient overlay
          (a CSS mask on a playing video would force a re-composite every frame).
        */}
        <div className="absolute inset-y-0 right-0 w-full bg-navy-950 xl:w-[63rem]">
          <HeroVideo
            src={videoSrc}
            poster={posterSrc}
            className="size-full transform-gpu object-contain object-center xl:object-cover xl:object-[65%_50%]"
          />
          <div className="absolute inset-y-0 left-0 hidden w-[42%] bg-gradient-to-r from-navy-950 via-navy-950/55 to-transparent xl:block" />
        </div>
        {/* dims the footage slightly and keeps the copy readable */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,20,0.55)_0%,rgba(4,8,20,0.3)_45%,rgba(4,8,20,0.16)_100%)] max-xl:bg-navy-950/75" />
        {/* top: blends the photo under the translucent header */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950/70 to-transparent" />
        {/* bottom: melts into the page background */}
        <div className="absolute inset-x-0 bottom-0 h-[10rem] bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent" />
      </div>

      {/* ---------------------------------------------------------- */}
      {/*  Copy                                                       */}
      {/* ---------------------------------------------------------- */}
      <div className="mx-auto max-w-[110rem] px-5 [--type-scale:0.84] sm:px-8 xl:px-[5rem] xl:[--type-scale:0.86]">
        <div className="pt-10 pb-14 sm:pt-14 xl:pt-[3.3rem] xl:pb-[2.4rem]">
          <p className="eyebrow animate-fade-up bg-gradient-to-r from-[#4f8cff] to-[#8a7bff] bg-clip-text fs-62 tracking-[0.2em] text-transparent sm:fs-72 sm:tracking-[0.32em]">
            Ideas × Technology × A Better Tomorrow
          </p>

          <h1
            id="hero-title"
            className="animate-fade-up mt-[0.75rem] text-[clamp(1.65rem,7vw,2.25rem)] leading-[1.04] font-bold tracking-[-0.005em] text-white [animation-delay:90ms] xl:fs-350 xl:leading-[1] xl:tracking-[0.004em]"
          >
            Smart Software
            <br />
            <span className="text-gradient-brand">Smarter</span> Solutions
          </h1>

          <p className="animate-fade-up mt-[0.8rem] max-w-[34rem] fs-102 leading-[1.55] text-slate-200/95 [animation-delay:170ms] xl:max-w-none xl:fs-108 xl:leading-[1.46]">
            We build intelligent software and IoT solutions
            <br className="hidden sm:block" /> for a smarter, safer and more connected world.
          </p>

          {/* feature chips */}
          <ul className="animate-fade-up mt-[1.9rem] flex flex-wrap items-center gap-x-[1.3rem] gap-y-4 [animation-delay:240ms]">
            {heroFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <li
                  key={feature.lines.join(" ")}
                  className={cn(
                    "flex items-center gap-[0.7rem]",
                    i < heroFeatures.length - 1 && "xl:border-r xl:border-white/[0.1] xl:pr-[1.3rem]",
                  )}
                >
                  <span
                    className="grid size-9 shrink-0 place-items-center rounded-[0.6rem] border bg-white/[0.03]"
                    style={{
                      borderColor: `${feature.color}99`,
                      color: feature.color,
                      boxShadow: `0 0 18px -5px ${feature.color}88, inset 0 0 10px ${feature.color}18`,
                    }}
                  >
                    <Icon className="size-[1.15rem]" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="fs-72 leading-[1.3] text-slate-200">
                    {feature.lines.map((line) => (
                      <span key={line} className="block whitespace-nowrap">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* calls to action */}
          <div className="animate-fade-up mt-[1.95rem] flex flex-wrap items-center gap-[0.9rem] [animation-delay:310ms]">
            <Button href="/contact" size="md" className="xl:px-[1.9rem]">
              Get a Free Consultation
              <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button href="/projects" variant="outline" size="md" className="border-[rgba(96,84,240,0.7)] xl:px-[1.7rem]">
              <span className="grid size-[1.3rem] place-items-center rounded-full border border-white/85">
                <Play className="size-[0.55rem] translate-x-px fill-white text-white" aria-hidden="true" />
              </span>
              Our Work
            </Button>
          </div>

          {/* stats */}
          <dl className="animate-fade-up mt-[1.7rem] flex flex-wrap gap-y-5 [animation-delay:380ms]">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col pr-[1.5rem] pl-[1.5rem] first:pl-0 xl:pr-[1.9rem] xl:pl-[1.9rem]",
                  i > 0 && "border-l border-white/[0.1]",
                  i === 2 && "max-sm:border-l-0 max-sm:pl-0",
                )}
              >
                <dt className="order-2 mt-[0.4rem] fs-72 leading-none text-slate-300">{stat.label}</dt>
                <dd className="order-1 fs-125 leading-none font-bold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/*  Right-hand decoration (desktop only)                        */}
      {/* ---------------------------------------------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
        {/* handwritten tagline */}
        <div className="animate-fade-up absolute top-[6.2rem] left-[52%] -rotate-[13deg] font-script text-white [animation-delay:450ms]">
          <span className="block fs-235 leading-[0.95]">Innovating</span>
          <span className="relative mt-[0.05rem] block pl-[2.2rem] fs-235 leading-[0.95]">
            Connected Lives
            <svg
              viewBox="0 0 190 22"
              className="absolute -bottom-[0.85rem] left-[2.7rem] w-[8.6rem]"
              fill="none"
            >
              <path
                d="M2 19 C50 12 110 6 188 2"
                stroke="url(#swoosh)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="swoosh" x1="0" y1="0" x2="190" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
                  <stop offset="0.5" stopColor="#fff" stopOpacity="0.95" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>

        {/* vertical keyword list */}
        <div className="animate-fade-up absolute top-[6.9rem] left-[86.6%] [animation-delay:520ms]">
          <ul className="space-y-[0.8rem] border-l border-white/[0.2] pl-[1.15rem] fs-64 leading-none font-medium tracking-[0.3em] text-slate-100 uppercase">
            {heroTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="mt-[2rem] ml-[1.15rem] h-[2px] w-[7.6rem] bg-white/[0.14]">
            <span className="block h-full w-[36%] bg-brand-cyan shadow-[0_0_10px_rgba(34,200,245,0.8)]" />
          </div>
        </div>

        {/* assistant chat card */}
        <div className="animate-fade-up absolute top-[25.4rem] right-[4.5rem] [animation-delay:600ms]">
          {/* no backdrop-blur here: blurring a playing video every frame is needlessly expensive */}
          <div className="animate-float relative flex w-[13.3rem] items-center justify-between gap-2 rounded-[0.95rem] border border-white/[0.12] bg-[rgba(8,16,36,0.84)] py-[0.9rem] pr-[0.9rem] pl-[1.15rem] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)]">
            <p className="fs-78 leading-[1.7] whitespace-nowrap text-slate-100">
              Turn your ideas
              <br />
              into real solutions.
              <br />
              Let&apos;s build together!
            </p>
            <Robot className="w-[2.55rem] shrink-0" />
            <span className="absolute -top-[0.4rem] -right-[0.4rem] size-[1rem] rounded-full bg-[#27e26f] ring-[4px] ring-[#27e26f]/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
