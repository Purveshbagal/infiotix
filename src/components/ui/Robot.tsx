import { useId } from "react";

/** Friendly assistant mascot used in the hero chat card. */
export default function Robot({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-body`} cx="45%" cy="25%" r="85%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c3d0ea" />
        </radialGradient>
        <radialGradient id={`${uid}-eye`} cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#b8f0ff" />
          <stop offset="1" stopColor="#25b5ff" />
        </radialGradient>
        <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      {/* antenna */}
      <rect x="31" y="7" width="2" height="7" rx="1" fill="#c3d0ea" />
      <circle cx="32" cy="5.5" r="3.2" fill="#5fb0ff" />
      {/* ear pieces */}
      <rect x="2" y="27" width="8" height="15" rx="4" fill="#2f6bff" />
      <rect x="54" y="27" width="8" height="15" rx="4" fill="#2f6bff" />
      {/* head */}
      <rect x="7" y="13" width="50" height="38" rx="17" fill={`url(#${uid}-body)`} />
      {/* visor */}
      <rect x="13" y="21" width="38" height="22" rx="11" fill="#0a1226" />
      {/* eyes (glow + core) */}
      <g filter={`url(#${uid}-glow)`} opacity="0.85">
        <ellipse cx="24" cy="32" rx="4.6" ry="5.2" fill="#3fd0ff" />
        <ellipse cx="40" cy="32" rx="4.6" ry="5.2" fill="#3fd0ff" />
      </g>
      <ellipse cx="24" cy="32" rx="3.6" ry="4.4" fill={`url(#${uid}-eye)`} />
      <ellipse cx="40" cy="32" rx="3.6" ry="4.4" fill={`url(#${uid}-eye)`} />
      {/* body */}
      <path
        d="M17 55 C17 51 47 51 47 55 L49 70 C49 78 15 78 15 70 Z"
        fill={`url(#${uid}-body)`}
      />
      <circle cx="32" cy="63" r="3.2" fill="#2f8bff" />
      {/* arms */}
      <ellipse cx="11" cy="63" rx="4.2" ry="7.5" fill={`url(#${uid}-body)`} />
      <ellipse cx="53" cy="63" rx="4.2" ry="7.5" fill={`url(#${uid}-body)`} />
    </svg>
  );
}
