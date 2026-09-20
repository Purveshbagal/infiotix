import fs from "node:fs";
import path from "node:path";

/**
 * Server-side check for an optional file inside /public.
 * Lets a section render its photo when the file exists and a designed
 * fallback otherwise, instead of shipping a broken <img>.
 */
export function publicAssetExists(publicPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}

/**
 * `/videos/hero-loop.mp4` -> `/videos/hero-loop.mp4?v=<file modified time>`.
 *
 * Big media files are cached hard by the browser. Tying the URL to the file's modified time
 * means replacing the file (same name) automatically gives visitors – and you – the new one,
 * instead of a stale copy from the cache.
 */
export function versionedPublicUrl(publicPath: string): string {
  try {
    const { mtimeMs } = fs.statSync(path.join(process.cwd(), "public", publicPath));
    return `${publicPath}?v=${Math.floor(mtimeMs)}`;
  } catch {
    return publicPath;
  }
}
