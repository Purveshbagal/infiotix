import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import LegalPage from "@/components/sections/LegalPage";
import { company } from "@/data/site";

export const metadata: Metadata = pageMetadata("terms");

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms &"
      highlight="Conditions"
      crumb="Terms & Conditions"
      updated="September 2026"
      intro="Please read these terms before using our website or engaging our services. By using this website you agree to them."
      sections={[
        {
          heading: "Using this website",
          body: (
            <p>
              You may browse this website and use its contact options for lawful purposes only. Please do not
              misuse the site, try to disrupt it or attempt to access it in unauthorised ways.
            </p>
          ),
        },
        {
          heading: "Information on this website",
          body: (
            <p>
              We work to keep the information here accurate, but it is provided for general information and may
              change without notice. Descriptions of products and features are a guide, and the final scope of
              any project is agreed with you in writing.
            </p>
          ),
        },
        {
          heading: "Our services and quotes",
          body: (
            <ul>
              <li>Project scope, timelines and fees are discussed and agreed before work begins.</li>
              <li>Quotes are valid for the period stated in the quote.</li>
              <li>Any additional work outside the agreed scope is discussed with you first.</li>
            </ul>
          ),
        },
        {
          heading: "Support and maintenance",
          body: (
            <p>
              Support is provided as described in your agreement with us. Ongoing maintenance and priority
              support may be offered as a separate plan.
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              The content of this website, including the {company.name} name, logo, text, graphics and images, is
              owned by or licensed to us. Please do not copy or reuse it without our written permission.
            </p>
          ),
        },
        {
          heading: "Limitation of liability",
          body: (
            <p>
              To the extent permitted by law, we are not liable for any loss arising from your use of this
              website or from relying on the information on it. Nothing in these terms limits liability that
              cannot be limited by law.
            </p>
          ),
        },
        {
          heading: "Third-party links",
          body: (
            <p>
              This website may link to services run by others, such as WhatsApp or social media. We are not
              responsible for their content or practices.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: <p>These terms are governed by the laws of India.</p>,
        },
        {
          heading: "Changes and contact",
          body: (
            <p>
              We may update these terms from time to time, and the latest version will be shown on this page. For
              any questions, email <a href={`mailto:${company.email}`}>{company.email}</a> or call{" "}
              <a href={company.phoneHref}>{company.phone}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
