"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { company, navItems } from "@/data/site";
import { cn } from "@/lib/cn";

/** Each nav item is its own page. Child pages count too: /software/x keeps "Software" lit. */
function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Give the bar a stronger fill once the page has scrolled.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // A drawer should keep the page behind it still, especially on small touch screens.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Growing into the desktop layout closes the mobile menu.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 80rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        // At the top the header sits over the hero video: a plain translucent fill is far cheaper
        // than blurring moving video every frame. Blur is only used once the page has scrolled.
        scrolled || open
          ? "border-white/[0.08] bg-[rgba(4,8,20,0.82)] backdrop-blur-md"
          : "border-white/[0.06] bg-[rgba(4,8,20,0.58)]",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[110rem] items-center justify-between gap-6 px-5 sm:px-8 xl:h-[4.25rem] xl:px-[5rem]">
        <Link href="/" aria-label="Infiotix Technologies – home" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden h-full xl:ml-[3.2rem] xl:block">
          <ul className="flex h-full items-center gap-[1.85rem]">
            {navItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);
              return (
                <li key={item.label} className="h-full">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative flex h-full items-center fs-90 font-medium transition-colors duration-200",
                      isActive ? "font-semibold text-white" : "text-slate-300 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute -bottom-px left-1/2 h-[2px] w-[130%] -translate-x-1/2 rounded-full",
                        "bg-[linear-gradient(90deg,transparent,#22c8f5_35%,#22c8f5_65%,transparent)] shadow-[0_0_14px_2px_rgba(34,200,245,0.55)]",
                        "origin-center transition-[opacity,transform] duration-300",
                        isActive ? "scale-x-100 opacity-100" : "scale-x-50 opacity-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Desktop phone pill */}
          <a
            href={company.phoneHref}
            className={cn(
              "hidden items-center gap-[0.6rem] rounded-full border border-[rgba(60,105,255,0.75)] xl:inline-flex",
              "h-[2.8rem] bg-[rgba(8,18,50,0.7)] px-[2.2rem] fs-103 font-semibold text-white",
              "shadow-[0_0_22px_-4px_rgba(47,107,255,0.55),inset_0_0_14px_rgba(47,107,255,0.14)]",
              "transition-all duration-300 hover:border-[rgba(110,150,255,1)] hover:shadow-[0_0_30px_-2px_rgba(47,107,255,0.8),inset_0_0_16px_rgba(47,107,255,0.22)]",
            )}
          >
            <Phone className="size-[1.15rem] text-brand-cyan" strokeWidth={2.2} aria-hidden="true" />
            {company.phone}
          </a>

          {/* Mobile / tablet actions */}
          <a
            href={company.phoneHref}
            aria-label={`Call ${company.phone}`}
            className="inline-flex size-10 items-center justify-center rounded-full border border-[rgba(60,105,255,0.6)] bg-[rgba(8,18,50,0.7)] text-brand-cyan xl:hidden"
          >
            <Phone className="size-[1.05rem]" aria-hidden="true" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-colors hover:bg-white/10 xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet navigation: a right-side drawer, never a dropdown below the header. */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[60] xl:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/55 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          aria-label="Mobile navigation"
          inert={!open}
          className={cn(
            "absolute top-0 right-0 flex h-dvh w-[min(21rem,88vw)] flex-col border-l border-white/[0.12] bg-navy-900 p-5 shadow-[-24px_0_60px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
            <span className="fs-105 font-semibold text-white">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid size-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-5 overflow-y-auto">
            <ul className="grid gap-1">
              {navItems.map((item) => {
                const isActive = isActivePath(pathname, item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-3 fs-95 font-medium transition-colors",
                        isActive
                          ? "bg-brand/15 text-white"
                          : "text-slate-300 hover:bg-white/[0.06] hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </div>
    </header>
  );
}
