import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import { JoinDirectoryForm } from "@/modules/marketplace/components/join-directory-form";
import {
  parseCategorySlug,
  parseCitySlug,
} from "@/modules/marketplace/lib/marketplace-slugs";

type Props = {
  searchParams: { city?: string; category?: string };
};

export default async function JoinDirectoryPage({ searchParams }: Props) {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.join;

  return (
    <div className="ruwaq-ad-page">
      <div className="ruwaq-join-editorial">
        <aside className="ruwaq-join-editorial-aside">
          <p className="ruwaq-ad-eyebrow">{copy.eyebrow}</p>
          <h1 className="ruwaq-ad-section-title mt-3">{copy.title}</h1>
          <p className="ruwaq-ad-section-lead mt-4">{copy.subtitle}</p>

          <div className="mt-10 border-t border-neutral-200 pt-8">
            <h2 className="ruwaq-ad-card-title text-base">{copy.trustTitle}</h2>
            <ul className="mt-4 space-y-3">
              {copy.trustItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-neutral-600">
                  <span className="text-neutral-950" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="ruwaq-join-editorial-form">
          <JoinDirectoryForm
            copy={copy}
            locale={locale}
            initialCity={parseCitySlug(searchParams.city)}
            initialCategory={parseCategorySlug(searchParams.category)}
            variant="editorial"
          />
        </div>
      </div>
    </div>
  );
}
