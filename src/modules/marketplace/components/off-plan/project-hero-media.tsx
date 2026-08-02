"use client";

import { useState } from "react";
import Image from "next/image";
import type { OffPlanProject } from "@/content/off-plan-projects";
import {
  formatOffPlanPrice,
  projectTitle,
} from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";
import { BrochureLeadTrigger } from "@/modules/marketplace/components/off-plan/brochure-lead-modal";

type Copy = {
  underConstruction: string;
  delivery: string;
  watchFilm: string;
  downloadBrochure: string;
  masterPlan: string;
  interior: string;
  closeModal: string;
  leadForm: {
    title: string;
    subtitle: string;
    fullName: string;
    whatsApp: string;
    email: string;
    role: string;
    roleEndBuyer: string;
    roleInvestor: string;
    roleBroker: string;
    submit: string;
    submitting: string;
    success: string;
    validation: string;
    invalidPhone: string;
  };
};

type Props = {
  project: OffPlanProject;
  locale: Locale;
  copy: Copy;
};

export function ProjectHeroMedia({ project, locale, copy }: Props) {
  const [videoOpen, setVideoOpen] = useState(false);
  const title = projectTitle(project, locale);
  const statusLabel = copy.underConstruction;
  const deliveryLabel = `${copy.delivery}: ${project.deliveryQuarter}`;

  return (
    <>
      <div className="ruwaq-offplan-hero-grid">
        <div className="ruwaq-offplan-hero-main">
          <Image
            src={project.images.main}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="ruwaq-offplan-hero-badges">
            <span className="ruwaq-offplan-status-pill">
              {statusLabel} | {deliveryLabel}
            </span>
          </div>
          <div className="ruwaq-offplan-hero-actions">
            {project.heroVideo ? (
              <button
                type="button"
                className="ruwaq-offplan-hero-action-btn"
                onClick={() => setVideoOpen(true)}
              >
                🎬 {copy.watchFilm}
              </button>
            ) : null}
            <BrochureLeadTrigger
              project={project}
              locale={locale}
              copy={copy.leadForm}
              closeLabel={copy.closeModal}
              triggerLabel={`📥 ${copy.downloadBrochure}`}
              triggerClassName="ruwaq-offplan-hero-action-btn"
              variant="ghost"
            />
          </div>
          {project.heroVideo ? (
            <button
              type="button"
              className="ruwaq-offplan-play-btn"
              onClick={() => setVideoOpen(true)}
              aria-label={copy.watchFilm}
            >
              ▶
            </button>
          ) : null}
        </div>

        <div className="ruwaq-offplan-hero-side">
          <figure className="ruwaq-offplan-hero-thumb">
            <Image
              src={project.images.masterPlan}
              alt={copy.masterPlan}
              fill
              className="object-cover"
              sizes="400px"
            />
            <figcaption>{copy.masterPlan}</figcaption>
          </figure>
          <figure className="ruwaq-offplan-hero-thumb">
            <Image
              src={project.images.interior}
              alt={copy.interior}
              fill
              className="object-cover"
              sizes="400px"
            />
            <figcaption>{copy.interior}</figcaption>
          </figure>
        </div>
      </div>

      {videoOpen && project.heroVideo ? (
        <dialog
          open
          className="ruwaq-offplan-dialog"
          onClick={() => setVideoOpen(false)}
        >
          <div className="ruwaq-offplan-video-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ruwaq-offplan-dialog-close"
              onClick={() => setVideoOpen(false)}
              aria-label={copy.closeModal}
            >
              ✕
            </button>
            <video
              src={project.heroVideo}
              poster={project.heroVideoPoster}
              controls
              autoPlay
              playsInline
              className="w-full rounded-xl"
            />
          </div>
        </dialog>
      ) : null}
    </>
  );
}
