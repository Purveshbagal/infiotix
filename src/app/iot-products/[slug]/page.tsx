import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/sections/ProductDetailPage";
import { findProduct, iotDetails, productHref } from "@/data/products";
import { productMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return iotDetails.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/iot-products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct("iot", slug);
  if (!product) return {};
  return productMetadata(product.slug, productHref(product));
}

export default async function IoTProductPage({ params }: PageProps<"/iot-products/[slug]">) {
  const { slug } = await params;
  const product = findProduct("iot", slug);
  if (!product) notFound();
  return <ProductDetailPage product={product} />;
}
