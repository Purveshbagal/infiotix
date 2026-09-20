import type { Metadata } from "next";
import BrandIntro from "@/components/sections/BrandIntro";
import CtaBanner from "@/components/sections/CtaBanner";
import Hero from "@/components/sections/Hero";
import JsonLd from "@/components/seo/JsonLd";
import { homeGraph } from "@/lib/schema";
import Industries from "@/components/sections/Industries";
import IoTProducts from "@/components/sections/IoTProducts";
import ProcessStrip from "@/components/sections/ProcessStrip";
import SoftwareSolutions from "@/components/sections/SoftwareSolutions";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("home");

/** Home page. The header, footer and WhatsApp button live in the root layout. */
export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <Hero />
      <ProcessStrip />
      <SoftwareSolutions />
      <IoTProducts />
      <Industries />
      <BrandIntro />
      <CtaBanner />
    </>
  );
}
