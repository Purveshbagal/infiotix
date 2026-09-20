import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import GlobeSkyline from "@/components/ui/GlobeSkyline";
import Logo from "@/components/ui/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/ui/BrandIcons";
import { company, footerLinks } from "@/data/site";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com", Icon: LinkedInIcon },
  { label: "YouTube", href: "https://www.youtube.com", Icon: YouTubeIcon },
  { label: "Instagram", href: "https://www.instagram.com", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com", Icon: FacebookIcon },
];

const linkClass = "fs-86 text-[#b5c2dd] transition-colors duration-200 hover:text-white";
const headingClass = "fs-92 font-semibold text-white";
const contactClass =
  "fs-86 text-[#dbe4f6] transition-colors duration-200 hover:text-white";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative mt-4 overflow-hidden border-t border-white/[0.07] bg-[linear-gradient(180deg,rgba(7,14,32,0.7),#040814_60%)] xl:mt-[1rem]"
    >
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 xl:px-[4rem]">
        <div className="grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-4 xl:h-[14.15rem] xl:grid-cols-[21.25rem_9.75rem_12.4rem_13.4rem_minmax(0,1fr)] xl:gap-0 xl:py-0">
          {/* Brand */}
          {/* pt matches the link columns so the (taller) logo lines up with their headings */}
          <div className="xl:pt-[1.7rem]">
            <Link href="/" aria-label="Infiotix Technologies – home" className="inline-block">
              <Logo variant="footer" />
            </Link>
            <p className="mt-[1.05rem] fs-95 text-[#c5d0e8]">{company.tagline}</p>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="xl:pt-[1.7rem]">
            <h2 className={headingClass}>Quick Links</h2>
            <ul className="mt-[0.55rem]">
              {footerLinks.quick.map((link) => (
                <li key={link.label} className="h-[1.43rem]">
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Our services" className="xl:pt-[1.7rem]">
            <h2 className={headingClass}>Our Services</h2>
            <ul className="mt-[0.55rem]">
              {footerLinks.services.map((link) => (
                <li key={link.label} className="h-[1.43rem]">
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="xl:pt-[1.7rem]">
            <h2 className={headingClass}>Contact Us</h2>
            <ul className="mt-[0.7rem]">
              <li className="flex h-[1.75rem] items-center gap-[0.8rem]">
                <Phone className="size-[1.1rem] shrink-0 text-white" strokeWidth={2} aria-hidden="true" />
                <a href={company.phoneHref} className={contactClass}>
                  {company.phone}
                </a>
              </li>
              <li className="flex h-[1.75rem] items-center gap-[0.8rem]">
                <Mail className="size-[1.1rem] shrink-0 text-white" strokeWidth={2} aria-hidden="true" />
                <a href={`mailto:${company.email}`} className={contactClass}>
                  {company.email}
                </a>
              </li>
              <li className="flex h-[1.75rem] items-center gap-[0.8rem]">
                <MapPin className="size-[1.1rem] shrink-0 text-white" strokeWidth={2} aria-hidden="true" />
                <span className="fs-86 whitespace-nowrap text-[#dbe4f6]">{company.location}</span>
              </li>
            </ul>

            <ul className="mt-[1.3rem] flex items-center gap-[0.95rem]">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Infiotix on ${label}`}
                    className="block transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110"
                  >
                    <Icon className="size-[1.8rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connected-city visual (desktop) */}
          <div aria-hidden="true" className="relative hidden xl:-mr-[4rem] xl:block">
            {/* fixed-size stage pinned to the right so it never outgrows the text on ultra-wide screens */}
            <div className="absolute right-0 bottom-0 w-[29.25rem] max-w-full">
              <p className="absolute top-[-1.2rem] right-[4.7rem] text-center fs-95 leading-[1.45] font-light tracking-[0.01em] text-[#b9c6e0]">
                Let&apos;s Connect
                <br />
                for a Smarter Tomorrow
              </p>
              <GlobeSkyline className="block h-auto w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-[110rem] flex-col gap-3 px-5 py-5 fs-83 text-[#a5b3cf] sm:px-8 md:flex-row md:items-center md:justify-between xl:h-[4.4rem] xl:px-[4rem] xl:py-0">
          <p>© {new Date().getFullYear()} Infiotix Technologies. All Rights Reserved.</p>
          <ul className="flex flex-wrap items-center">
            {footerLinks.legal.map((link, i) => (
              <li
                key={link.label}
                className={i > 0 ? "ml-[1.3rem] border-l border-white/20 pl-[1.3rem]" : ""}
              >
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
