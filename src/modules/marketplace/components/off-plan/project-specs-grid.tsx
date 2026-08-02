import type { OffPlanProject } from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";

type Copy = {
  delivery: string;
  location: string;
  paymentPlan: string;
  propertyTypes: string;
  ownership: string;
};

type Props = {
  project: OffPlanProject;
  locale: Locale;
  copy: Copy;
};

export function ProjectSpecsGrid({ project, locale, copy }: Props) {
  const delivery = locale === "ar" ? project.deliveryDateAr : project.deliveryDateEn;
  const location = locale === "ar" ? project.locationAr : project.locationEn;
  const payment = locale === "ar" ? project.paymentPlanAr : project.paymentPlanEn;
  const types = locale === "ar" ? project.propertyTypesAr.join(" / ") : project.propertyTypesEn.join(" / ");
  const ownership = locale === "ar" ? project.ownershipAr : project.ownershipEn;

  const items = [
    { icon: "📅", label: copy.delivery, value: delivery },
    { icon: "📍", label: copy.location, value: location },
    { icon: "💳", label: copy.paymentPlan, value: payment },
    { icon: "🏠", label: copy.propertyTypes, value: types },
    { icon: "📜", label: copy.ownership, value: ownership },
  ];

  return (
    <div className="ruwaq-offplan-specs-grid">
      {items.map((item) => (
        <div key={item.label} className="ruwaq-offplan-spec-item">
          <span className="ruwaq-offplan-spec-icon" aria-hidden>
            {item.icon}
          </span>
          <div>
            <p className="ruwaq-offplan-spec-label">{item.label}</p>
            <p className="ruwaq-offplan-spec-value">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
