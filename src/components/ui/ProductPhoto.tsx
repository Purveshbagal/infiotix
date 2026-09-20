import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type ProductPhotoProps = {
  src: string;
  alt: string;
  /** object-position, tuned per photo to keep the subject in frame */
  position?: string;
  /** Extra zoom + anchor, used to crop text that is baked into a photo */
  scale?: number;
  origin?: string;
  sizes: string;
  /** Above-the-fold photos load immediately */
  eager?: boolean;
  className?: string;
};

/**
 * One product photo cropped the way the home-page cards crop it. The parent gives it a size
 * (position: relative, plus `group` if it should zoom on hover) and the photo fills that box.
 * It clips itself, because the extra `scale` would otherwise spill out of the box.
 */
export default function ProductPhoto({
  src,
  alt,
  position = "50% 50%",
  scale = 1,
  origin = "50% 50%",
  sizes,
  eager = false,
  className,
}: ProductPhotoProps) {
  return (
    <span className="absolute inset-0 block overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className={cn("zoom-img object-cover", className)}
        style={
          {
            objectPosition: position,
            transformOrigin: origin,
            "--img-scale": scale,
          } as CSSProperties
        }
      />
    </span>
  );
}
