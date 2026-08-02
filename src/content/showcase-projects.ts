import type { ProjectTour } from "@/content/project-tours";
import { getProjectTour, PROJECT_TOURS } from "@/content/project-tours";
import type { OffPlanProject } from "@/content/off-plan-projects";
import { getOffPlanProject, OFF_PLAN_PROJECTS } from "@/content/off-plan-projects";
import { getCityBySlug } from "@/shared/constants/marketplace-taxonomy";

/** Unified marketing/showcase project — off-plan launches + editorial tours. */
export type ShowcaseProject = OffPlanProject & {
  showcaseKind: "launch" | "completed";
};

function tourToShowcase(tour: ProjectTour): ShowcaseProject {
  const city = getCityBySlug(tour.citySlug);
  const locationAr = city ? city.nameAr : tour.citySlug;
  const locationEn = city ? city.nameEn : tour.citySlug;
  const developer = tour.developer ?? { nameAr: "Ruwaq PRO", nameEn: "Ruwaq PRO" };

  return {
    id: `tour-${tour.slug}`,
    slug: tour.slug,
    titleAr: tour.titleAr,
    titleEn: tour.titleEn,
    summaryAr: tour.subtitleAr,
    summaryEn: tour.subtitleEn,
    aboutParagraphsAr: tour.storyAr,
    aboutParagraphsEn: tour.storyEn,
    highlightsAr: tour.highlightsAr,
    highlightsEn: tour.highlightsEn,
    developer,
    citySlug: tour.citySlug,
    locationAr: `${locationAr} — شمال المدينة`,
    locationEn: `${locationEn} — North district`,
    startingPrice: 0,
    deliveryDateAr: tour.completionDateAr,
    deliveryDateEn: tour.completionDateEn,
    deliveryQuarter: "",
    paymentPlanAr: tour.scopeAr,
    paymentPlanEn: tour.scopeEn,
    propertyTypesAr: ["فيلا · تشطيب داخلي فاخر"],
    propertyTypesEn: ["Villa · Luxury interior fit-out"],
    propertyTypeSlugs: ["villa"],
    ownershipAr: "تملك حر",
    ownershipEn: "Freehold",
    status: "under_construction",
    badge: "under_construction",
    showcaseKind: "completed",
    heroVideoPoster: tour.heroImage,
    brochurePdf: "",
    images: {
      main: tour.heroImage,
      masterPlan: tour.gallery[0] ?? tour.heroImage,
      interior: tour.gallery[1] ?? tour.heroImage,
    },
    gallery: [tour.heroImage, ...tour.gallery],
    floorPlans: [],
    paymentSchedule: [],
    featured: true,
    unitsCount: tour.areaSqm,
  };
}

export function getShowcaseProject(slug: string): ShowcaseProject | undefined {
  const offPlan = getOffPlanProject(slug);
  if (offPlan) return { ...offPlan, showcaseKind: "launch" };
  const tour = getProjectTour(slug);
  if (tour) return tourToShowcase(tour);
  return undefined;
}

/** Marketing launches first, then completed editorial tours. */
export function getAllShowcaseProjects(): ShowcaseProject[] {
  const launches = OFF_PLAN_PROJECTS.map((p) => ({ ...p, showcaseKind: "launch" as const }));
  const completed = PROJECT_TOURS.map(tourToShowcase);
  return [...launches, ...completed];
}

export function getMarketingShowcaseProjects(): ShowcaseProject[] {
  return OFF_PLAN_PROJECTS.map((p) => ({ ...p, showcaseKind: "launch" as const }));
}

export function getFlagshipShowcaseProject(): ShowcaseProject {
  const flagship = OFF_PLAN_PROJECTS.find((p) => p.flagship) ?? OFF_PLAN_PROJECTS[0];
  return { ...flagship!, showcaseKind: "launch" };
}
