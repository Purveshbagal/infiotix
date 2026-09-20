import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { cn } from "@/lib/cn";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = {
  label: string;
  /** Omit on the current page */
  href?: string;
};

/** "Home / Software / Hospital Management System" trail. Home is always the first crumb. */
export default function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <BreadcrumbTrail items={items} className={className} />
    </>
  );
}

function BreadcrumbTrail({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 fs-86 text-[#8ea2c8]">
        <li>
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
        </li>
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-2">
              <ChevronRight className="size-[0.85rem] opacity-60" aria-hidden="true" />
              {crumb.href && !isLast ? (
                <Link href={crumb.href} className="transition-colors hover:text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className={cn(isLast && "text-white")}>
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
