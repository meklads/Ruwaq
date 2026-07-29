type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Renders Schema.org JSON-LD for crawlers (Google KSA indexing). */
export function JsonLdScript({ data }: Props) {
  const payload = Array.isArray(data) ? data : [data];
  const serialized = JSON.stringify(payload.length === 1 ? payload[0] : payload);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
