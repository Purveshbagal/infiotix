import type { Metadata, Viewport } from "next";
import { Inter, Mrs_Saint_Delafield } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";
import { pageSeo } from "@/data/seo";
import { siteGraph } from "@/lib/schema";
import { absoluteUrl, buildMetadata, SITE_LANG, SITE_NAME, SITE_URL } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const script = Mrs_Saint_Delafield({
  variable: "--font-mrs",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  // canonical + Open Graph + Twitter for the home page; every other page brings its own
  ...buildMetadata(pageSeo.home),
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: pageSeo.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: absoluteUrl("/") },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Search Console / Bing Webmaster ownership tags – set the env vars in the hosting dashboard
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#040814",
  colorScheme: "dark",
  // Use each device's actual CSS width. This lets the responsive layouts reflow instead of
  // shrinking the desktop canvas on phones and tablets.
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Browser extensions often inject attributes on <html> before hydration.
    // data-scroll-behavior keeps in-page anchors smooth but makes page changes jump straight to the top.
    <html
      lang={SITE_LANG}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${script.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <JsonLd data={siteGraph()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
