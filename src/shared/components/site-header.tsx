import { getLocale } from "@/shared/i18n/server";
import { LocaleSwitcher } from "@/shared/i18n/locale-switcher";
import { RuwaqLogo } from "@/shared/components/ruwaq-logo";
import { HeaderNav } from "@/shared/components/header-nav";
import { getSiteCopy } from "@/modules/site/copy";
import { getContentCopy } from "@/modules/site/content/copy";
import { sectionAvailability } from "@/modules/site/content/loader";

export async function SiteHeader() {
  const locale = await getLocale();
  const c = getSiteCopy(locale).header;
  const nav = getContentCopy(locale).nav;
  const has = sectionAvailability();
  const status = (on: boolean) => (on ? ("available" as const) : ("soon" as const));

  return (
    <header className="rw rw-header">
      <a href="#main" className="rw-skip">{locale === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}</a>
      <div className="rw-wrap rw-header__bar">
        <RuwaqLogo href="/" variant="editorial" className="rw-header__logo" />
        <HeaderNav
          labels={{ knowledge: c.knowledge, menu: c.menu, openMenu: c.openMenu, closeMenu: c.closeMenu, soon: c.soon, available: c.available, subscribers: c.subscribers }}
          knowledge={[
            { href: "/updates", label: nav.updates, status: status(has.updates) },
            { href: "/insights", label: nav.insights, status: status(has.insights) },
            { href: "/specialists", label: nav.specialists, status: status(has.specialists) },
          ]}
          links={[
            { href: "/proposals", label: c.nasaq },
            { href: "/radar", label: c.radar },
            { href: "/about", label: c.about },
            { href: "/contact", label: c.contact },
          ]}
          subscribersHref="/subscribers"
          localeSwitcher={<LocaleSwitcher />}
        />
      </div>
    </header>
  );
}
