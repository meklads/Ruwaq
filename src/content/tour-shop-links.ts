export type TourShopLink = {
  slug: string;
  labelAr: string;
  labelEn: string;
  href: string;
};

/** Curated supplier links — "Shop the Tour" affiliate layer to Ruwaq PRO partners. */
export const TOUR_SHOP_LINKS: Record<string, TourShopLink[]> = {
  "north-jeddah-villa-fitout": [
    {
      slug: "turriva",
      labelAr: "توريفا — تشطيب فاخر",
      labelEn: "Turriva — luxury fit-out",
      href: "/listing/turriva-fitout-jeddah",
    },
    {
      slug: "gh",
      labelAr: "Graphics House — تصور 3D",
      labelEn: "Graphics House — 3D CGI",
      href: "/listing/graphics-house-visualization-jeddah",
    },
    {
      slug: "marble",
      labelAr: "تاج الرخام — رخام وجرانيت",
      labelEn: "Marble Crown — marble & granite",
      href: "/listing/marble-crown-jeddah",
    },
    {
      slug: "kitchen",
      labelAr: "الأركان — مطابخ مخصصة",
      labelEn: "Arkan — bespoke kitchens",
      href: "/listing/arkan-kitchens-jeddah",
    },
  ],
  "jeddah-coastal-apartment-renovation": [
    {
      slug: "turriva",
      labelAr: "توريفا — تجديد تشطيب",
      labelEn: "Turriva — renovation fit-out",
      href: "/listing/turriva-fitout-jeddah",
    },
    {
      slug: "kitchen",
      labelAr: "الأركان — مطابخ",
      labelEn: "Arkan — kitchens",
      href: "/listing/arkan-kitchens-jeddah",
    },
    {
      slug: "hvac",
      labelAr: "صروح الغربية — تكييف",
      labelEn: "Sorouh — HVAC",
      href: "/listing/sorouh-gharbiya-hvac-jeddah",
    },
  ],
  "makkah-serviced-tower-fitout": [
    {
      slug: "namat",
      labelAr: "نمط المعمار — تشطيب ضيافة",
      labelEn: "Namat Al-Mi'mar — hospitality fit-out",
      href: "/listing/namat-mimar-makkah",
    },
    {
      slug: "hvac",
      labelAr: "نسيم الحرم — تكييف",
      labelEn: "Haram Breeze — HVAC",
      href: "/listing/haram-breeze-hvac-makkah",
    },
  ],
};

export function getTourShopLinks(tourSlug: string): TourShopLink[] {
  return TOUR_SHOP_LINKS[tourSlug] ?? [];
}
