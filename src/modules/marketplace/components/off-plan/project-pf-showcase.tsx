"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { ShowcaseProject } from "@/content/showcase-projects";
import {
  formatOffPlanPrice,
  getOffPlanGallery,
  projectDeveloperName,
  projectHighlights,
  projectLocation,
  projectSummary,
  projectTitle,
} from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";

type Copy = {
  completedLabel: string;
  offPlan: string;
  startingFrom: string;
  launchPrice: string;
  priceDisclaimer: string;
  delivery: string;
  developer: string;
  gallery: string;
  video: string;
  watchFilm: string;
  photos: string;
  viewAllPhotos: string;
  masterPlan: string;
  interior: string;
  closeModal: string;
  badgeUnderConstruction: string;
  badgeExclusive: string;
  keyInformation: string;
  deliveryDate: string;
  locationLabel: string;
  propertyTypesLabel: string;
  ownershipLabel: string;
  aboutProject: string;
  downloadBrochure: string;
};

type Props = {
  project: ShowcaseProject;
  locale: Locale;
  copy: Copy;
};

export function ProjectPfShowcase({ project, locale, copy }: Props) {
  const isLaunch = project.showcaseKind === "launch";
  const title = projectTitle(project, locale);
  const location = projectLocation(project, locale);
  const developer = projectDeveloperName(project, locale);
  const summary = projectSummary(project, locale);
  const highlights = projectHighlights(project, locale);
  const price = formatOffPlanPrice(project.startingPrice, locale);
  const gallery = useMemo(() => getOffPlanGallery(project), [project]);
  const badgeLabel = isLaunch
    ? project.badge === "exclusive_3d"
      ? copy.badgeExclusive
      : copy.badgeUnderConstruction
    : copy.completedLabel;
  const types = locale === "ar" ? project.propertyTypesAr.join(" · ") : project.propertyTypesEn.join(" · ");
  const ownership = locale === "ar" ? project.ownershipAr : project.ownershipEn;
  const delivery = locale === "ar" ? project.deliveryDateAr : project.deliveryDateEn;
  const payment = locale === "ar" ? project.paymentPlanAr : project.paymentPlanEn;

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const activeImage = gallery[activeIndex] ?? project.images.main;

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const stepLightbox = useCallback(
    (delta: number) => {
      setActiveIndex((current) => {
        const next = current + delta;
        if (next < 0) return gallery.length - 1;
        if (next >= gallery.length) return 0;
        return next;
      });
    },
    [gallery.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") stepLightbox(locale === "ar" ? -1 : 1);
      if (e.key === "ArrowLeft") stepLightbox(locale === "ar" ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, locale, stepLightbox]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const keyInfo = [
    { label: copy.deliveryDate, value: delivery },
    { label: copy.locationLabel, value: location },
    { label: copy.propertyTypesLabel, value: types },
    { label: copy.ownershipLabel, value: ownership },
    { label: copy.delivery, value: payment },
  ];

  return (
    <>
      {/* PF: gallery first — full width */}
      <section id="pf-gallery" className="ruwaq-pf-gallery-section ruwaq-pf-gallery-section--lead">
        <div className="ruwaq-pf-hero-grid">
          <button
            type="button"
            className="ruwaq-pf-hero-main"
            onClick={() => openLightbox(activeIndex)}
            aria-label={copy.viewAllPhotos}
          >
            <Image
              src={activeImage}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
            <div className="ruwaq-pf-hero-main-badges">
              <span className={`ruwaq-pf-badge ${isLaunch ? "ruwaq-pf-badge--offplan" : "ruwaq-pf-badge--completed"}`}>
                {isLaunch ? copy.offPlan : copy.completedLabel}
              </span>
              {isLaunch ? (
                <span className="ruwaq-pf-badge ruwaq-pf-badge--muted">
                  {copy.delivery}: {project.deliveryQuarter}
                </span>
              ) : null}
            </div>
            {isLaunch && project.heroVideo ? (
              <span
                className="ruwaq-pf-hero-video-chip"
                onClick={(e) => {
                  e.stopPropagation();
                  setVideoOpen(true);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    setVideoOpen(true);
                  }
                }}
              >
                ▶ {copy.watchFilm}
              </span>
            ) : null}
          </button>

          <div className="ruwaq-pf-hero-side">
            <button type="button" className="ruwaq-pf-hero-side-item" onClick={() => openLightbox(1)}>
              <Image
                src={gallery[1] ?? project.images.masterPlan}
                alt={copy.masterPlan}
                fill
                className="object-cover"
                sizes="400px"
              />
              <span>{copy.masterPlan}</span>
            </button>
            <button type="button" className="ruwaq-pf-hero-side-item" onClick={() => openLightbox(2)}>
              <Image
                src={gallery[2] ?? project.images.interior}
                alt={copy.interior}
                fill
                className="object-cover"
                sizes="400px"
              />
              <span>{copy.interior}</span>
            </button>
          </div>
        </div>

        <div className="ruwaq-pf-thumb-strip" aria-label={copy.photos}>
          {gallery.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              className={index === activeIndex ? "ruwaq-pf-thumb ruwaq-pf-thumb--active" : "ruwaq-pf-thumb"}
              onClick={() => setActiveIndex(index)}
              aria-label={`${copy.photos} ${index + 1}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      </section>

      {/* PF: sticky section nav */}
      <nav className="ruwaq-pf-section-nav" aria-label="Project sections">
        <button type="button" className="ruwaq-pf-section-nav__link is-active" onClick={() => scrollTo("pf-gallery")}>
          {copy.gallery}
        </button>
        <button type="button" className="ruwaq-pf-section-nav__link" onClick={() => scrollTo("pf-about")}>
          {copy.aboutProject}
        </button>
        {project.heroVideo ? (
          <button type="button" className="ruwaq-pf-section-nav__link" onClick={() => scrollTo("pf-video")}>
            {copy.video}
          </button>
        ) : null}
      </nav>

      {/* PF: two-column — content + sticky sidebar */}
      <div className="ruwaq-pf-detail-layout">
        <div className="ruwaq-pf-detail-main">
          <header className="ruwaq-pf-project-header ruwaq-pf-project-header--inline">
            <span className="ruwaq-pf-badge">{badgeLabel}</span>
            <h1 className="ruwaq-pf-project-title">{title}</h1>
            {isLaunch ? (
              <>
                <p className="ruwaq-pf-launch-price">
                  {copy.launchPrice} <strong>{price}</strong>
                  <span className="ruwaq-pf-price-asterisk">*</span>
                </p>
                <p className="ruwaq-pf-price-disclaimer">{copy.priceDisclaimer}</p>
              </>
            ) : null}
          </header>

          <section className="ruwaq-pf-key-info">
            <h2 className="ruwaq-pf-section-heading">{copy.keyInformation}</h2>
            <dl className="ruwaq-pf-key-info-grid">
              {keyInfo.map((item) => (
                <div key={item.label} className="ruwaq-pf-key-info-item">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {summary ? (
            <section id="pf-about" className="ruwaq-pf-about scroll-mt-24">
              <h2 className="ruwaq-pf-section-heading">{copy.aboutProject}</h2>
              <p className="ruwaq-pf-about-text">{summary}</p>
              {highlights.length > 0 ? (
                <ul className="ruwaq-pf-project-highlights">
                  {highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ) : null}

          <div className="ruwaq-pf-gallery-grid ruwaq-pf-gallery-grid--compact">
            {gallery.slice(3).map((src, index) => (
              <button
                key={`grid-${src}-${index}`}
                type="button"
                className="ruwaq-pf-gallery-item"
                onClick={() => openLightbox(index + 3)}
              >
                <Image
                  src={src}
                  alt={`${title} — ${index + 4}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </button>
            ))}
          </div>

          {project.heroVideo ? (
            <section id="pf-video" className="ruwaq-pf-video-section scroll-mt-24">
              <h2 className="ruwaq-pf-section-heading">{copy.video}</h2>
              <div className="ruwaq-pf-video-wrap">
                <video
                  src={project.heroVideo}
                  poster={project.heroVideoPoster}
                  controls
                  playsInline
                  preload="metadata"
                  className="ruwaq-pf-video-player"
                />
              </div>
            </section>
          ) : null}
        </div>

        <aside className="ruwaq-pf-detail-sidebar">
          <div className="ruwaq-pf-sidebar-card">
            <p className="ruwaq-pf-sidebar-label">{copy.developer}</p>
            {project.developer.logo ? (
              <Image
                src={project.developer.logo}
                alt={developer}
                width={72}
                height={72}
                className="ruwaq-pf-sidebar-logo"
              />
            ) : null}
            <p className="ruwaq-pf-sidebar-developer">{developer}</p>
            <p className="ruwaq-pf-sidebar-location">{location}</p>
            {isLaunch ? (
              <>
                <p className="ruwaq-pf-sidebar-price">
                  {copy.startingFrom} <strong>{price}</strong>
                </p>
                {project.brochurePdf ? (
                  <a
                    href={project.brochurePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ruwaq-pro-btn-outline w-full justify-center px-4 py-3 text-sm"
                  >
                    {copy.downloadBrochure}
                  </a>
                ) : null}
              </>
            ) : null}
            {project.heroVideo ? (
              <button
                type="button"
                className="ruwaq-pro-btn-solid mt-3 w-full px-4 py-3 text-sm"
                onClick={() => setVideoOpen(true)}
              >
                ▶ {copy.watchFilm}
              </button>
            ) : null}
          </div>
        </aside>
      </div>

      {lightboxOpen ? (
        <dialog open className="ruwaq-pf-lightbox" onClick={() => setLightboxOpen(false)}>
          <div className="ruwaq-pf-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="ruwaq-pf-lightbox-close" onClick={() => setLightboxOpen(false)} aria-label={copy.closeModal}>
              ✕
            </button>
            <button type="button" className="ruwaq-pf-lightbox-nav ruwaq-pf-lightbox-nav--prev" onClick={() => stepLightbox(-1)} aria-label="Previous">
              ‹
            </button>
            <div className="ruwaq-pf-lightbox-image">
              <Image
                src={gallery[activeIndex] ?? project.images.main}
                alt={title}
                width={1600}
                height={1000}
                className="max-h-[85vh] w-auto max-w-full object-contain"
              />
            </div>
            <button type="button" className="ruwaq-pf-lightbox-nav ruwaq-pf-lightbox-nav--next" onClick={() => stepLightbox(1)} aria-label="Next">
              ›
            </button>
            <p className="ruwaq-pf-lightbox-counter">
              {activeIndex + 1} / {gallery.length}
            </p>
          </div>
        </dialog>
      ) : null}

      {videoOpen && project.heroVideo ? (
        <dialog open className="ruwaq-offplan-dialog" onClick={() => setVideoOpen(false)}>
          <div className="ruwaq-offplan-video-panel" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="ruwaq-offplan-dialog-close" onClick={() => setVideoOpen(false)} aria-label={copy.closeModal}>
              ✕
            </button>
            <video src={project.heroVideo} poster={project.heroVideoPoster} controls autoPlay playsInline className="w-full rounded-xl" />
          </div>
        </dialog>
      ) : null}
    </>
  );
}
