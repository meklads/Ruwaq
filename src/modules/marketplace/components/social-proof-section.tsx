import type { Messages } from "@/shared/i18n/messages/types";

type Props = {
  copy: Messages["marketplace"]["socialProof"];
};

export function SocialProofSection({ copy }: Props) {
  return (
    <section className="border-t border-neutral-200 bg-[var(--ruwaq-pro-offwhite)] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="ruwaq-pro-directory-title text-2xl md:text-3xl">{copy.title}</h2>
        <p className="ruwaq-pro-directory-meta mt-3">{copy.subtitle}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.items.map((item) => (
            <blockquote
              key={item.quote.slice(0, 40)}
              className="border border-neutral-200 bg-white p-6 text-start"
            >
              <p className="text-sm leading-relaxed text-neutral-700">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-4 text-xs uppercase tracking-wider text-neutral-500">
                {item.role} · {item.city}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
