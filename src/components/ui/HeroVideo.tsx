"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = {
  /** H.264 MP4, no audio track, cross-dissolved so the last frame flows into the first */
  src: string;
  /** Still of the first frame – shown until the video starts and whenever playback is not allowed */
  poster: string;
  className?: string;
};

/**
 * Full-bleed looping background video.
 *
 * - The loop is seamless because the file itself is prepared that way
 *   (no audio track → no end-of-loop freeze, last frames dissolve into the first).
 * - Plays only while it is on screen and the tab is visible, so it never competes with
 *   scrolling or other tabs for the GPU/CPU.
 * - Honours `prefers-reduced-motion` (poster only) and degrades to the poster if the
 *   browser blocks autoplay.
 */
export default function HeroVideo({ src, poster, className }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React does not reliably emit the `muted` attribute in server HTML, and browsers
    // only autoplay muted media – so set it explicitly before the first play().
    video.muted = true;
    video.defaultMuted = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = true;
    let tabVisible = !document.hidden;

    const sync = () => {
      const shouldPlay = onScreen && tabVisible && !reduceMotion.matches;
      if (shouldPlay && video.paused) {
        // A rejected promise just means autoplay was blocked – the poster stays visible.
        video.play().catch(() => {});
      } else if (!shouldPlay && !video.paused) {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);

    const onVisibility = () => {
      tabVisible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", sync);

    sync();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
