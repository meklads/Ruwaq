import Image from "next/image";
import Link from "next/link";
import type { GuideBlock } from "@/content/guides/types";
import type { Messages } from "@/shared/i18n/messages/types";

type Props = {
  blocks: GuideBlock[];
  copy: Messages["marketplace"]["guides"];
};

function directoryHrefFromQuote(href: string): string | null {
  const match = href.match(/\/request-quote\?([^#]+)/);
  if (!match) return null;
  const params = new URLSearchParams(match[1]);
  const city = params.get("city") ?? "jeddah";
  const category = params.get("category");
  if (!category) return null;
  return `/${city}/${category}`;
}

export function GuideArticleBody({ blocks, copy }: Props) {
  return (
    <div className="ruwaq-guide-body">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "p":
            return <p key={key}>{block.text}</p>;
          case "h2":
            return (
              <h2 key={key} className="ruwaq-guide-h2">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={key} className="ruwaq-guide-h3">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={key} className="ruwaq-guide-list">
                {block.items.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="ruwaq-guide-list ruwaq-guide-list--ordered">
                {block.items.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ol>
            );
          case "image":
            return (
              <figure key={key} className="ruwaq-guide-figure">
                <div className="ruwaq-guide-figure__frame">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={1200}
                    height={675}
                    className="ruwaq-guide-figure__img"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="ruwaq-guide-figure__caption">{block.caption}</figcaption>
                ) : null}
              </figure>
            );
          case "table":
            return (
              <figure key={key} className="ruwaq-guide-table-wrap">
                <div className="ruwaq-guide-table-scroll">
                  <table className="ruwaq-guide-table">
                    <thead>
                      <tr>
                        {block.headers.map((header) => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row) => (
                        <tr key={row.join("-").slice(0, 48)}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${cellIndex}-${cell.slice(0, 24)}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption ? (
                  <figcaption className="ruwaq-guide-table__caption">{block.caption}</figcaption>
                ) : null}
              </figure>
            );
          case "chart":
            return (
              <figure key={key} className="ruwaq-guide-chart">
                {block.items.map((item) => {
                  const max = item.max ?? Math.max(...block.items.map((i) => i.value), 1);
                  const pct = Math.round((item.value / max) * 100);
                  return (
                    <div key={item.label} className="ruwaq-guide-chart__row">
                      <div className="ruwaq-guide-chart__label">{item.label}</div>
                      <div className="ruwaq-guide-chart__track" aria-hidden>
                        <div className="ruwaq-guide-chart__bar" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="ruwaq-guide-chart__value">
                        {item.value}
                        {block.unit ? ` ${block.unit}` : ""}
                      </div>
                    </div>
                  );
                })}
                {block.caption ? (
                  <figcaption className="ruwaq-guide-chart__caption">{block.caption}</figcaption>
                ) : null}
              </figure>
            );
          case "callout":
            return (
              <aside key={key} className={`ruwaq-guide-callout ruwaq-guide-callout--${block.variant}`}>
                <p className="ruwaq-guide-callout__title">{block.title}</p>
                <p className="ruwaq-guide-callout__text">{block.text}</p>
              </aside>
            );
          case "cta": {
            const secondaryHref =
              block.secondaryHref ?? directoryHrefFromQuote(block.href) ?? undefined;
            const secondaryLabel = block.secondaryLabel ?? copy.ctaDirectory;
            return (
              <div key={key} className="ruwaq-guide-cta">
                {block.lead ? <p className="ruwaq-guide-cta__lead">{block.lead}</p> : null}
                <div className="ruwaq-guide-cta__actions">
                  <Link href={block.href} className="ruwaq-guide-cta__btn">
                    {block.label || copy.ctaQuote}
                  </Link>
                  {secondaryHref ? (
                    <Link href={secondaryHref} className="ruwaq-guide-cta__btn-secondary">
                      {secondaryLabel}
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          }
          case "sources":
            return (
              <section key={key} className="ruwaq-guide-sources" aria-label={block.title}>
                <h2 className="ruwaq-guide-h3">{block.title}</h2>
                <ul className="ruwaq-guide-sources__list">
                  {block.items.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
