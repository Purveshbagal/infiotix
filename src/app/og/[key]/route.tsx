import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { ogCards } from "@/data/seo";
import { OG_SIZE, SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * Share cards (1200x630) used for Open Graph / Twitter / WhatsApp / LinkedIn previews:
 * /og/home, /og/software, /og/hospital-management-system ...
 *
 * Only keys listed in `ogCards` exist, and they are generated once at build time, so nobody
 * can make the site render arbitrary text.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(ogCards).map((key) => ({ key }));
}

const logo = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "public/images/logo-tight.png"))
  .toString("base64")}`;

const host = SITE_URL.replace(/^https?:\/\//, "");

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const card = ogCards[key];
  if (!card) return new Response("Not found", { status: 404 });

  const titleSize = card.title.length > 42 ? 58 : card.title.length > 28 ? 68 : 78;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#ffffff",
          backgroundColor: "#040814",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(47,107,255,0.55) 0%, rgba(47,107,255,0) 46%), radial-gradient(circle at 6% 104%, rgba(34,200,245,0.28) 0%, rgba(34,200,245,0) 42%), linear-gradient(135deg, #040814 0%, #081a44 100%)",
        }}
      >
        {/* brand */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={76} height={76} alt="" />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 22 }}>
            <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: -0.5 }}>{SITE_NAME}</div>
            <div style={{ fontSize: 22, color: "#8ea6d6", marginTop: 2 }}>Innovating Connected Lives</div>
          </div>
        </div>

        {/* message */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 22px",
              borderRadius: 999,
              border: "2px solid rgba(34,200,245,0.6)",
              color: "#22c8f5",
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {card.label}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1,
              maxWidth: 1040,
            }}
          >
            {card.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 32,
              lineHeight: 1.35,
              color: "#b3c2df",
              maxWidth: 940,
            }}
          >
            {card.subtitle}
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: "#8ea6d6",
          }}
        >
          <div style={{ display: "flex", color: "#22c8f5" }}>{host}</div>
          <div style={{ display: "flex" }}>Software · IoT · Pune, India</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" },
    },
  );
}
