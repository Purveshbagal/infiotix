type JsonLdProps = {
  /** A schema.org object, or an array of them */
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/**
 * Structured data (JSON-LD) for search engines. Rendered as a plain <script> in the page
 * body, which is the approach recommended by Next.js. `<` is escaped so text inside the
 * data can never close the script tag.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
