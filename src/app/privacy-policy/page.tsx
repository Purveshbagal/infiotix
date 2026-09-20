import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import LegalPage from "@/components/sections/LegalPage";
import { company } from "@/data/site";

export const metadata: Metadata = pageMetadata("privacy");

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      highlight="Policy"
      crumb="Privacy Policy"
      updated="September 2026"
      intro="Your privacy matters to us. This page explains what information we collect through this website, how we use it and the choices you have."
      sections={[
        {
          heading: "Who we are",
          body: (
            <p>
              {company.name} is a software and IoT company based in {company.location}. In this policy,
              &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to {company.name}.
            </p>
          ),
        },
        {
          heading: "Information we collect",
          body: (
            <>
              <p>We only receive the information you choose to share with us, such as when you:</p>
              <ul>
                <li>call us, message us on WhatsApp or send us an email;</li>
                <li>
                  fill in an enquiry or support form on this website. These forms open WhatsApp or your email app
                  with your message ready to send, and the details you type are not stored on our servers.
                </li>
              </ul>
              <p>This may include your name, phone number, email address and the details of your enquiry.</p>
            </>
          ),
        },
        {
          heading: "How we use your information",
          body: (
            <ul>
              <li>To reply to your enquiries and provide quotes or consultations.</li>
              <li>To deliver, install and support our software and IoT products.</li>
              <li>To improve our website, products and services.</li>
            </ul>
          ),
        },
        {
          heading: "Sharing your information",
          body: (
            <p>
              We do not sell your personal information. We may share it with trusted service providers who help
              us deliver our services, or when the law requires us to do so.
            </p>
          ),
        },
        {
          heading: "Cookies and third-party services",
          body: (
            <p>
              This website uses only what is needed to work properly. Links to WhatsApp, email and social media
              take you to services run by other companies, which have their own privacy policies.
            </p>
          ),
        },
        {
          heading: "Keeping your information safe",
          body: (
            <p>
              We take reasonable steps to protect the information we hold. No method of transmission or storage
              is completely secure, so we cannot guarantee absolute security.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You can ask us to access, correct or delete the personal information we hold about you by contacting
              us at <a href={`mailto:${company.email}`}>{company.email}</a>.
            </p>
          ),
        },
        {
          heading: "Changes to this policy",
          body: (
            <p>
              We may update this policy from time to time. The latest version will always be available on this
              page, along with the date it was last updated.
            </p>
          ),
        },
        {
          heading: "Contact us",
          body: (
            <p>
              Questions about this policy? Email <a href={`mailto:${company.email}`}>{company.email}</a> or call{" "}
              <a href={company.phoneHref}>{company.phone}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
