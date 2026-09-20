import { useId } from "react";

/**
 * Decorative "connected city on a glowing planet" illustration for the footer.
 * Everything is generated from a seeded PRNG at module load, so server and
 * client markup are always identical (no hydration mismatch).
 */

const W = 470;
const H = 170;
const R = 405; // planet radius
const CX = 235;
const TOP = 112; // y of the planet's highest point
const CY = TOP + R;

const arcY = (x: number) => CY - Math.sqrt(R * R - (x - CX) * (x - CX));

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

type Light = { x: number; y: number; c: string; o: number };
type Building = {
  x: number;
  w: number;
  top: number;
  base: number;
  spire: number;
  lights: Light[];
};
type Dot = { x: number; y: number; r: number; o: number; c: string };

const rand = mulberry32(2026);

/* ---- skyline ---------------------------------------------------- */
const buildings: Building[] = [];
for (let x = 132; x < 410; ) {
  const w = 6 + rand() * 12;
  const mid = x + w / 2;
  const peak = Math.max(0, 1 - Math.abs(mid - 262) / 132);
  const h = 9 + Math.pow(peak, 1.1) * 82 * (0.45 + rand() * 0.75);
  const base = arcY(mid) + 4;
  const top = base - h;

  const lights: Light[] = [];
  if (w > 7.5 && h > 22) {
    for (let wy = top + 5; wy < base - 5; wy += 4.4) {
      for (let wx = x + 2; wx < x + w - 2.4; wx += 3.3) {
        if (rand() < 0.26) {
          lights.push({
            x: r2(wx),
            y: r2(wy),
            c: rand() < 0.72 ? "#9fe6ff" : "#ffe2a0",
            o: r2(0.4 + rand() * 0.55),
          });
        }
      }
    }
  }

  buildings.push({
    x: r2(x),
    w: r2(w),
    top: r2(top),
    base: r2(base),
    spire: peak > 0.55 && rand() > 0.55 ? r2(6 + rand() * 15) : 0,
    lights,
  });
  x += w + 0.5 + rand() * 2.2;
}

/* ---- city lights on the planet surface ------------------------- */
const cityLights: Dot[] = [];
const palette = ["#7fe4ff", "#ffd98a", "#ffffff", "#5aa8ff"];
for (let i = 0; i < 110; i++) {
  const x = 26 + rand() * 420;
  const depth = 3 + rand() * 44;
  const y = arcY(x) + depth;
  if (y > H) continue;
  cityLights.push({
    x: r2(x),
    y: r2(y),
    r: r2(0.45 + rand() * 0.85),
    o: r2(0.3 + rand() * 0.6),
    c: palette[Math.floor(rand() * palette.length)],
  });
}

/* ---- stars ----------------------------------------------------- */
const stars: Dot[] = [];
for (let i = 0; i < 30; i++) {
  const x = rand() * W;
  stars.push({
    x: r2(x),
    y: r2(rand() * Math.max(6, arcY(x) - 24)),
    r: r2(0.35 + rand() * 0.7),
    o: r2(0.2 + rand() * 0.5),
    c: "#bcd8ff",
  });
}

export default function GlobeSkyline({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (n: string) => `${uid}-${n}`;
  const arcPath = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <radialGradient id={id("planet")} cx={CX} cy={TOP} r="250" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0e3d8c" />
          <stop offset="0.3" stopColor="#081d47" />
          <stop offset="1" stopColor="#040a1c" />
        </radialGradient>
        <linearGradient id={id("rim")} x1="0" y1="0" x2={W} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2f6bff" stopOpacity="0" />
          <stop offset="0.25" stopColor="#3aa8ff" stopOpacity="0.85" />
          <stop offset="0.55" stopColor="#d5f5ff" />
          <stop offset="0.8" stopColor="#3a86ff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#2f6bff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("bld")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d5fc0" />
          <stop offset="0.45" stopColor="#0d2f6c" />
          <stop offset="1" stopColor="#071633" />
        </linearGradient>
        <linearGradient id={id("edge")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8e8ff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#5aa8ff" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id={id("bloom")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#4cb6ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#4cb6ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("fade")} x1="0" y1="0" x2={W} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0.22" stopColor="#000" />
          <stop offset="0.36" stopColor="#fff" />
          <stop offset="0.86" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id={id("mask")}>
          <rect width={W} height={H} fill={`url(#${id("fade")})`} />
        </mask>
        <filter id={id("blur")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={id("blur-sm")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      {/* stars */}
      {stars.map((s, i) => (
        <circle key={`s${i}`} cx={s.x} cy={s.y} r={s.r} fill={s.c} opacity={s.o} />
      ))}

      {/* soft bloom behind the skyline */}
      <ellipse cx="268" cy="86" rx="150" ry="62" fill={`url(#${id("bloom")})`} />

      {/* planet body */}
      <path
        d={`${arcPath} L ${CX + R} ${H + 400} L ${CX - R} ${H + 400} Z`}
        fill={`url(#${id("planet")})`}
      />

      {/* glowing rim */}
      <path
        d={arcPath}
        stroke={`url(#${id("rim")})`}
        strokeWidth="8"
        fill="none"
        opacity="0.55"
        filter={`url(#${id("blur-sm")})`}
      />
      <path d={arcPath} stroke={`url(#${id("rim")})`} strokeWidth="1.5" fill="none" />

      {/* city lights across the surface */}
      {cityLights.map((d, i) => (
        <circle key={`l${i}`} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={d.o} />
      ))}

      <g mask={`url(#${id("mask")})`}>
        {/* skyline glow */}
        <g filter={`url(#${id("blur")})`} opacity="0.5">
          {buildings.map((b, i) => (
            <rect key={`g${i}`} x={b.x} y={b.top} width={b.w} height={r2(b.base - b.top)} fill="#39a2ff" />
          ))}
        </g>

        {/* towers */}
        {buildings.map((b, i) => {
          const height = r2(b.base - b.top);
          const cx = r2(b.x + b.w / 2);
          return (
            <g key={`b${i}`}>
              <rect
                x={b.x}
                y={b.top}
                width={b.w}
                height={height}
                fill={`url(#${id("bld")})`}
                stroke={`url(#${id("edge")})`}
                strokeWidth="0.6"
              />
              <rect x={b.x} y={b.top} width={b.w} height="1.2" fill="#c9f0ff" opacity="0.95" />
              {b.spire > 0 && (
                <rect
                  x={r2(cx - 0.55)}
                  y={r2(b.top - b.spire)}
                  width="1.1"
                  height={b.spire}
                  fill="#a6e6ff"
                  opacity="0.9"
                />
              )}
              {b.lights.map((l, j) => (
                <rect key={j} x={l.x} y={l.y} width="1.3" height="1.7" fill={l.c} opacity={l.o} />
              ))}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
