import { useId } from "react";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import { company } from "@/data/site";
import { publicAssetExists } from "@/lib/assets";

/** Drop a photo here (public/images/cta-banner.png) and it is picked up automatically. */
const CTA_PHOTO = "/images/cta-banner.png";

/** Designed stand-in that is shown until the banner photo is added. */
function HoloHeadset() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(120%_120%_at_25%_30%,#1c4fb8_0%,#0b1c4a_55%,#0a1330_100%)]">
      {/* soft light blooms */}
      <div className="absolute -top-16 -left-10 size-[15rem] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.5),transparent_65%)]" />
      <div className="absolute top-2 left-24 size-[11rem] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.4),transparent_65%)]" />
      {/* city glow along the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-[repeating-linear-gradient(90deg,rgba(94,190,255,0.5)_0_2px,transparent_2px_9px)] opacity-40 [mask-image:linear-gradient(0deg,#000,transparent)]" />

      <svg viewBox="0 0 200 110" className="absolute top-1/2 left-[1.6rem] hidden w-[10.5rem] -translate-y-1/2 xl:block" fill="none">
        <defs>
          <linearGradient id={`${uid}-shell`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#b8c8e6" />
          </linearGradient>
          <linearGradient id={`${uid}-lens`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1b3a86" />
            <stop offset="1" stopColor="#070d22" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <ellipse cx="100" cy="55" rx="70" ry="34" fill="#38bdf8" opacity="0.35" filter={`url(#${uid}-glow)`} />
        <path d="M38 46 C18 46 10 60 12 78" stroke="#6f86b8" strokeWidth="9" strokeLinecap="round" />
        <path d="M162 46 C182 46 190 60 188 78" stroke="#6f86b8" strokeWidth="9" strokeLinecap="round" />
        <rect x="34" y="26" width="132" height="58" rx="24" fill={`url(#${uid}-shell)`} />
        <rect x="44" y="36" width="112" height="38" rx="17" fill={`url(#${uid}-lens)`} />
        <path d="M58 44 C86 38 120 38 146 46" stroke="#7fd3ff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <circle cx="100" cy="58" r="3" fill="#38bdf8" opacity="0.9" />
      </svg>
    </div>
  );
}

type CtaBannerProps = {
  title?: string;
  text?: string;
  /** Label + target of the outlined button (the filled one always dials the office) */
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CtaBanner({
  title = "Let's Build a Smarter Tomorrow Together",
  text = "Discuss your project with our team and get the best solution for your needs.",
  secondaryLabel = "Request a Call",
  secondaryHref = "/contact",
}: CtaBannerProps = {}) {
  const hasPhoto = publicAssetExists(CTA_PHOTO);

  return (
    <section
      id="cta"
      aria-labelledby="cta-title"
      className="px-4 pt-10 sm:px-6 xl:px-[2.8rem] xl:pt-[1.7rem]"
    >
      <div className="relative mx-auto max-w-[110rem] overflow-hidden rounded-[1.1rem] border border-[rgba(90,140,255,0.3)] bg-[linear-gradient(90deg,#0b1d47_0%,#0a1432_42%,#0a1a3c_74%,#0a2a3e_100%)] shadow-[0_24px_60px_-30px_rgba(40,100,255,0.5)]">
        {/* colour blooms on the right, as in the design */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(28rem_12rem_at_96%_20%,rgba(16,185,129,0.2),transparent_70%),radial-gradient(26rem_12rem_at_72%_85%,rgba(79,70,229,0.26),transparent_70%)]"
        />

        {/* left visual */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-full opacity-25 xl:w-[21rem] xl:opacity-100"
        >
          {hasPhoto ? (
            <Image
              src={CTA_PHOTO}
              alt=""
              fill
              sizes="(min-width: 1280px) 21rem, 100vw"
              className="object-cover object-[30%_25%]"
            />
          ) : (
            <HoloHeadset />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_30%,rgba(10,20,50,0.7)_72%,#0a1432_100%)]" />
        </div>

        <div className="relative flex flex-col gap-6 px-6 py-8 sm:px-8 xl:h-[6.6rem] xl:flex-row xl:items-center xl:justify-between xl:gap-8 xl:py-0 xl:pr-[1.6rem] xl:pl-[20rem]">
          <div>
            <h2
              id="cta-title"
              className="fs-135 leading-tight font-bold tracking-[-0.01em] text-white sm:fs-150 xl:fs-130"
            >
              {title}
            </h2>
            <p className="mt-[0.4rem] fs-88 leading-[1.5] text-[#a9b7d4] xl:fs-85">{text}</p>
          </div>

          <div className="flex flex-wrap items-center gap-[1.1rem]">
            <Button href={company.phoneHref} size="lg" className="rounded-[0.8rem] px-[2rem] font-bold">
              <Phone className="size-[1.1rem]" strokeWidth={2.2} aria-hidden="true" />
              {company.phone}
            </Button>
            <Button href={secondaryHref} variant="outline" size="lg" className="rounded-[0.8rem] px-[1.9rem]">
              {secondaryLabel}
              <ArrowRight className="size-[1rem] transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
