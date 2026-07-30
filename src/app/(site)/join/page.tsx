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
    <div className="ruwaq-pro-directory">
      <header className="ruwaq-pro-directory-header">
        <p className="ruwaq-pro-eyebrow text-neutral-500">{copy.eyebrow}</p>
        <h1 className="ruwaq-pro-directory-title">{copy.title}</h1>
        <p className="ruwaq-pro-directory-meta mt-3 normal-case tracking-normal">{copy.subtitle}</p>
      </header>
      <div className="mx-auto mt-10 max-w-xl">
        <JoinDirectoryForm
          copy={copy}
          locale={locale}
          initialCity={parseCitySlug(searchParams.city)}
          initialCategory={parseCategorySlug(searchParams.category)}
        />
      </div>
    </div>
  );
}
