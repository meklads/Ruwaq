import projectsData from "../../data/projects.json";
import type { MarketplaceCitySlug } from "@/shared/constants/marketplace-taxonomy";

export type OffPlanPropertyTypeSlug =
  | "villa"
  | "apartment"
  | "duplex"
  | "townhouse";

export type OffPlanProjectBadge = "exclusive_3d" | "under_construction";

export type OffPlanFloorPlan = {
  slug: string;
  labelAr: string;
  labelEn: string;
  image: string;
  view3d?: string;
};

export type OffPlanPaymentMilestone = {
  labelAr: string;
  labelEn: string;
  percentage: number;
};

export type OffPlanProject = {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  developer: {
    nameAr: string;
    nameEn: string;
    logo?: string;
  };
  citySlug: MarketplaceCitySlug | "riyadh";
  locationAr: string;
  locationEn: string;
  startingPrice: number;
  deliveryDateAr: string;
  deliveryDateEn: string;
  deliveryQuarter: string;
  paymentPlanAr: string;
  paymentPlanEn: string;
  propertyTypesAr: string[];
  propertyTypesEn: string[];
  propertyTypeSlugs: OffPlanPropertyTypeSlug[];
  ownershipAr: string;
  ownershipEn: string;
  status: "under_construction";
  badge: OffPlanProjectBadge;
  heroVideo?: string;
  heroVideoPoster: string;
  brochurePdf: string;
  images: {
    main: string;
    masterPlan: string;
    interior: string;
  };
  floorPlans: OffPlanFloorPlan[];
  paymentSchedule: OffPlanPaymentMilestone[];
  featured: boolean;
};

export const OFF_PLAN_PROJECTS: OffPlanProject[] = projectsData.projects as OffPlanProject[];

export const OFF_PLAN_FILTER_CITIES = [
  { slug: "jeddah", nameAr: "جدة", nameEn: "Jeddah" },
  { slug: "riyadh", nameAr: "الرياض", nameEn: "Riyadh" },
  { slug: "makkah", nameAr: "مكة", nameEn: "Makkah" },
] as const;

export const OFF_PLAN_FILTER_PROPERTY_TYPES = [
  { slug: "villa" as const, nameAr: "فيلل", nameEn: "Villas" },
  { slug: "apartment" as const, nameAr: "شقق", nameEn: "Apartments" },
  { slug: "duplex" as const, nameAr: "دوبلكس", nameEn: "Duplex" },
  { slug: "townhouse" as const, nameAr: "تاون هاوس", nameEn: "Townhouse" },
] as const;

export const OFF_PLAN_PRICE_RANGES = [
  { slug: "under-2m", min: 0, max: 2_000_000, nameAr: "أقل من 2M", nameEn: "Under 2M SAR" },
  { slug: "2m-3m", min: 2_000_000, max: 3_000_000, nameAr: "2M – 3M", nameEn: "2M – 3M SAR" },
  { slug: "3m-plus", min: 3_000_000, max: Infinity, nameAr: "3M+", nameEn: "3M+ SAR" },
] as const;

export function getOffPlanProject(slug: string): OffPlanProject | undefined {
  return OFF_PLAN_PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedOffPlanProjects(): OffPlanProject[] {
  return OFF_PLAN_PROJECTS.filter((p) => p.featured);
}

export function formatOffPlanPrice(amount: number, locale: "ar" | "en"): string {
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-SA", {
    maximumFractionDigits: 0,
  }).format(amount);
  return locale === "ar" ? `${formatted} ر.س` : `SAR ${formatted}`;
}

export function projectTitle(project: OffPlanProject, locale: "ar" | "en"): string {
  return locale === "ar" ? project.titleAr : project.titleEn;
}

export function projectLocation(project: OffPlanProject, locale: "ar" | "en"): string {
  return locale === "ar" ? project.locationAr : project.locationEn;
}

export function projectDeveloperName(project: OffPlanProject, locale: "ar" | "en"): string {
  return locale === "ar" ? project.developer.nameAr : project.developer.nameEn;
}

export function matchesOffPlanFilters(
  project: OffPlanProject,
  filters: {
    city?: string;
    propertyType?: string;
    priceRange?: string;
  }
): boolean {
  if (filters.city && filters.city !== "all" && project.citySlug !== filters.city) {
    return false;
  }
  if (
    filters.propertyType &&
    filters.propertyType !== "all" &&
    !project.propertyTypeSlugs.includes(filters.propertyType as OffPlanPropertyTypeSlug)
  ) {
    return false;
  }
  if (filters.priceRange && filters.priceRange !== "all") {
    const range = OFF_PLAN_PRICE_RANGES.find((r) => r.slug === filters.priceRange);
    if (range && (project.startingPrice < range.min || project.startingPrice >= range.max)) {
      return false;
    }
  }
  return true;
}
