"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { ChevronDown, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { company } from "@/data/site";
import { cn } from "@/lib/cn";

type Mode = "contact" | "support";

type ContactFormProps = {
  mode: Mode;
  /** Options for the product / interest dropdown */
  interests: string[];
  /** Pre-selected interest, e.g. coming from a "Request a demo" button */
  defaultInterest?: string;
};

const supportTopics = [
  "Report an issue",
  "Ask a question",
  "Request a feature",
  "Training or guidance",
  "Something else",
];

const fieldClass =
  "w-full rounded-[0.8rem] border border-white/[0.14] bg-[rgba(8,16,40,0.7)] px-4 py-[0.7rem] fs-100 text-white " +
  "placeholder:text-[#6f82a8] transition-colors focus:border-[rgba(110,150,255,0.9)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(47,107,255,0.4)]";

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-[0.4rem] block fs-88 font-medium text-[#b9c7e6]">
        {label}
        {required && (
          <span className="text-[#ff7a90]" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

/**
 * Enquiry / support form without a backend: it builds the message and hands it to WhatsApp or the
 * visitor's email app, so nothing is stored on a server and nothing can get lost.
 */
export default function ContactForm({ mode, interests, defaultInterest = "" }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [notice, setNotice] = useState("");
  const isSupport = mode === "support";

  function compose() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return null;

    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const details = [
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      ...(get("email") ? [`Email: ${get("email")}`] : []),
      isSupport ? `Product: ${get("interest")}` : `Interested in: ${get("interest")}`,
      ...(isSupport ? [`Topic: ${get("topic")}`] : []),
    ];

    const text = [
      isSupport ? "Hello Infiotix Support," : "Hello Infiotix Technologies,",
      "",
      ...details,
      "",
      isSupport ? "Details:" : "Message:",
      get("message"),
    ].join("\n");

    const subject = isSupport
      ? `Support request: ${get("topic")} (${get("interest")})`
      : `Enquiry: ${get("interest")}`;

    return { text, subject };
  }

  function sendWhatsApp(event?: FormEvent) {
    event?.preventDefault();
    const message = compose();
    if (!message) return;
    window.open(
      `${company.whatsappHref}?text=${encodeURIComponent(message.text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setNotice("WhatsApp is opening with your message ready to send.");
  }

  function sendEmail() {
    const message = compose();
    if (!message) return;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      message.subject,
    )}&body=${encodeURIComponent(message.text)}`;
    setNotice("Your email app is opening with your message ready to send.");
  }

  return (
    <form ref={formRef} onSubmit={sendWhatsApp} className="grid gap-[1rem] sm:grid-cols-2">
      <Field label="Your name" required>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Full name"
          className={fieldClass}
        />
      </Field>

      <Field label="Phone number" required>
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          minLength={8}
          placeholder="e.g. 70584 09290"
          className={fieldClass}
        />
      </Field>

      <Field label="Email (optional)" className="sm:col-span-2">
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={fieldClass}
        />
      </Field>

      <Field label={isSupport ? "Which product?" : "I'm interested in"} required>
        <span className="relative block">
          <select
            name="interest"
            required
            defaultValue={interests.includes(defaultInterest) ? defaultInterest : ""}
            className={cn(fieldClass, "appearance-none pr-10")}
          >
            <option value="" disabled>
              Select an option
            </option>
            {isSupport && <option value="Not sure">Not sure</option>}
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-3 size-[1.1rem] -translate-y-1/2 text-[#7f93bd]"
            aria-hidden="true"
          />
        </span>
      </Field>

      {isSupport ? (
        <Field label="Topic" required>
          <span className="relative block">
            <select name="topic" required defaultValue="" className={cn(fieldClass, "appearance-none pr-10")}>
              <option value="" disabled>
                Select a topic
              </option>
              {supportTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-3 size-[1.1rem] -translate-y-1/2 text-[#7f93bd]"
              aria-hidden="true"
            />
          </span>
        </Field>
      ) : (
        <div className="hidden sm:block" aria-hidden="true" />
      )}

      <Field label={isSupport ? "Describe the issue" : "Tell us about your project"} required className="sm:col-span-2">
        <textarea
          name="message"
          required
          rows={5}
          placeholder={
            isSupport
              ? "What happened, and what did you expect to happen?"
              : "What would you like to build or improve?"
          }
          className={cn(fieldClass, "resize-y")}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-[0.8rem] sm:col-span-2">
        <button
          type="submit"
          className="group/btn inline-flex h-[3rem] items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#1c64f2_0%,#3b5bff_55%,#5b3df5_100%)] px-7 fs-95 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(59,91,255,0.75),inset_0_1px_0_rgba(255,255,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-px"
        >
          <WhatsAppIcon className="size-[1.25rem]" />
          Send on WhatsApp
        </button>
        <button
          type="button"
          onClick={sendEmail}
          className="inline-flex h-[3rem] items-center justify-center gap-2 rounded-full border border-[rgba(88,110,255,0.55)] bg-[rgba(12,22,58,0.55)] px-6 fs-95 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(130,160,255,0.95)] hover:bg-[rgba(34,56,130,0.5)] active:translate-y-px"
        >
          <Mail className="size-[1.1rem]" aria-hidden="true" />
          Send by Email
        </button>
      </div>

      <p role="status" className="fs-86 leading-[1.6] text-[#8ea2c8] sm:col-span-2">
        {notice ||
          "This opens WhatsApp or your email app with your message filled in. Nothing you type here is stored on our servers."}
      </p>
    </form>
  );
}
