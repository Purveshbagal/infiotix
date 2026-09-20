import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { company } from "@/data/site";

/** Floating "chat on WhatsApp" button, pinned to the bottom-right corner. */
export default function WhatsAppButton() {
  return (
    <a
      href={company.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Infiotix on WhatsApp"
      className="group fixed right-4 bottom-4 z-50 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_32px_-6px_rgba(37,211,102,0.75)] ring-[3px] ring-white/25 transition-transform duration-300 hover:scale-110 sm:right-6 sm:bottom-6 xl:size-[4.2rem]"
    >
      <span
        aria-hidden="true"
        className="animate-ping-slow absolute inset-0 rounded-full bg-[#25d366]/55"
      />
      <WhatsAppIcon className="relative size-8 xl:size-[2.5rem]" />
    </a>
  );
}
