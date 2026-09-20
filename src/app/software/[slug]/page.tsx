import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/sections/ProductDetailPage";
import { findProduct, productHref, softwareDetails } from "@/data/products";
import { productMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return softwareDetails.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/software/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct("software", slug);
  if (!product) return {};
  return productMetadata(product.slug, productHref(product));
}

export default async function SoftwareProductPage({ params }: PageProps<"/software/[slug]">) {
  const { slug } = await params;
  const product = findProduct("software", slug);
  if (!product) notFound();
  return <ProductDetailPage product={product} />;
}
