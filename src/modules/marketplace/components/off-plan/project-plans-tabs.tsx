"use client";

import { useState } from "react";
import Image from "next/image";
import type { OffPlanProject } from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";

type Copy = {
  tabFloorPlans: string;
  tabPayment: string;
  view2d: string;
  view3d: string;
  paymentIntro: string;
  installment: string;
};

type Props = {
  project: OffPlanProject;
  locale: Locale;
  copy: Copy;
};

export function ProjectPlansTabs({ project, locale, copy }: Props) {
  const [tab, setTab] = useState<"plans" | "payment">("plans");
  const [activePlan, setActivePlan] = useState(0);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");

  const plan = project.floorPlans[activePlan];
  const planImage =
    viewMode === "3d" && plan?.view3d ? plan.view3d : plan?.image ?? project.images.main;
  const planLabel = plan
    ? locale === "ar"
      ? plan.labelAr
      : plan.labelEn
    : "";

  return (
    <section className="ruwaq-offplan-plans-section">
      <div className="ruwaq-offplan-tabs">
        <button
          type="button"
          className={tab === "plans" ? "ruwaq-offplan-tab is-active" : "ruwaq-offplan-tab"}
          onClick={() => setTab("plans")}
        >
          {copy.tabFloorPlans}
        </button>
        <button
          type="button"
          className={tab === "payment" ? "ruwaq-offplan-tab is-active" : "ruwaq-offplan-tab"}
          onClick={() => setTab("payment")}
        >
          {copy.tabPayment}
        </button>
      </div>

      {tab === "plans" ? (
        <div className="ruwaq-offplan-plans-panel">
          <div className="ruwaq-offplan-plan-nav">
            {project.floorPlans.map((fp, idx) => (
              <button
                key={fp.slug}
                type="button"
                className={
                  idx === activePlan ? "ruwaq-offplan-plan-chip is-active" : "ruwaq-offplan-plan-chip"
                }
                onClick={() => setActivePlan(idx)}
              >
                {locale === "ar" ? fp.labelAr : fp.labelEn}
              </button>
            ))}
          </div>
          <div className="ruwaq-offplan-plan-toolbar">
            <button
              type="button"
              className={viewMode === "2d" ? "ruwaq-offplan-view-toggle is-active" : "ruwaq-offplan-view-toggle"}
              onClick={() => setViewMode("2d")}
            >
              {copy.view2d}
            </button>
            {plan?.view3d ? (
              <button
                type="button"
                className={viewMode === "3d" ? "ruwaq-offplan-view-toggle is-active" : "ruwaq-offplan-view-toggle"}
                onClick={() => setViewMode("3d")}
              >
                {copy.view3d}
              </button>
            ) : null}
          </div>
          <div className="ruwaq-offplan-plan-viewer">
            <Image
              src={planImage}
              alt={planLabel}
              width={1400}
              height={900}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="ruwaq-offplan-payment-panel">
          <p className="ruwaq-offplan-payment-intro">{copy.paymentIntro}</p>
          <table className="ruwaq-offplan-payment-table">
            <thead>
              <tr>
                <th>{copy.installment}</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {project.paymentSchedule.map((row) => (
                <tr key={row.labelEn}>
                  <td>{locale === "ar" ? row.labelAr : row.labelEn}</td>
                  <td>{row.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
