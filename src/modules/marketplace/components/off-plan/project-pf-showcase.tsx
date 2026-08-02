"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShowcaseProject } from "@/content/showcase-projects";
import {
  formatLaunchPrice,
  getOffPlanGallery,
  getProjectYoutubeEmbedUrl,
  projectAboutParagraphs,
  projectDeveloperName,
  projectHasVideo,
  projectHighlights,
  projectLocation,
  projectSummary,
  projectTitle,
} from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";
import { ProjectPlansTabs } from "@/modules/marketplace/components/off-plan/project-plans-tabs";

type Copy = {
  completedLabel: string;
  offPlan: string;
  startingFrom: string;
  launchPrice: string;
  priceDisclaimer: string;
  delivery: string;
  paymentPlanLabel: string;
  developer: string;
  tabFloorPlans: string;
  tabPayment: string;
  view2d: string;
  view3d: string;
  paymentIntro: string;
  installment: string;
  gallery: string;
  video: string;
  videoButton: string;
  watchFilm: string;
  photos: string;
  viewAllPhotos: string;
  masterPlan: string;
  sitePlan: string;
  interior: string;
  closeModal: string;
  badgeUnderConstruction: string;
  badgeExclusive: string;
  keyInformation: string;
  deliveryDate: string;
  locationLabel: string;
  propertyTypesLabel: string;
  ownershipLabel: string;
  unitsCountLabel: string;
  aboutProject: string;
  downloadBrochure: string;
  viewDeveloperProjects: string;
  viewOtherProjects: string;
  contactSoon: string;
  requestQuoteCta: string;
  completedCompletionLabel: string;
  completedScopeLabel: string;
  completedAreaLabel: string;
  requestSimilarCta: string;
  livingRoomLabel: string;
  kitchenLabel: string;
  homeTourStoryLabel: string;
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
  const aboutParagraphs = projectAboutParagraphs(project, locale);
  const price = formatLaunchPrice(project, locale);
  const gallery = useMemo(() => getOffPlanGallery(project), [project]);
  const hasVideo = projectHasVideo(project);
  const youtubeEmbedUrl = getProjectYoutubeEmbedUrl(project);
  const youtubeThumb = project.heroVideoYoutubeId
    ? `https://img.youtube.com/vi/${project.heroVideoYoutubeId}/hqdefault.jpg`
    : null;

  const badgeLabel = isLaunch
    ? project.badge === "exclusive_3d"
      ? copy.badgeExclusive
      : copy.badgeUnderConstruction
    : copy.completedLabel;
  const types = locale === "ar" ? project.propertyTypesAr.join(" · ") : project.propertyTypesEn.join(" · ");
  const ownership = locale === "ar" ? project.ownershipAr : project.ownershipEn;
  const delivery = locale === "ar" ? project.deliveryDateAr : project.deliveryDateEn;
  const payment = locale === "ar" ? project.paymentPlanAr : project.paymentPlanEn;
  const hasPlans = isLaunch && project.floorPlans.length > 0;
  const hasPaymentSchedule = isLaunch && project.paymentSchedule.length > 0;
  const hasPlansSection = hasPlans || hasPaymentSchedule;

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

  const keyInfo = isLaunch
    ? [
        { label: copy.deliveryDate, value: delivery },
        { label: copy.locationLabel, value: location },
        ...(project.unitsCount
          ? [{ label: copy.unitsCountLabel, value: String(project.unitsCount) }]
          : []),
        { label: copy.propertyTypesLabel, value: types },
        { label: copy.ownershipLabel, value: ownership },
        { label: copy.paymentPlanLabel, value: payment },
      ]
    : [
        { label: copy.completedCompletionLabel, value: delivery },
        { label: copy.locationLabel, value: location },
        ...(project.unitsCount
          ? [
              {
                label: copy.completedAreaLabel,
                value: locale === "ar" ? `${project.unitsCount} م²` : `${project.unitsCount} m²`,
              },
            ]
          : []),
        { label: copy.propertyTypesLabel, value: types },
        { label: copy.completedScopeLabel, value: payment },
      ];

  const developerLink = project.developerUrl ? (
    <a href={project.developerUrl} target="_blank" rel="noopener noreferrer" className="ruwaq-pf-developer-strip__link">
      {copy.viewDeveloperProjects}
    </a>
  ) : (
    <Link href="/tours" className="ruwaq-pf-developer-strip__link">
      {copy.viewOtherProjects}
    </Link>
  );

  return (
    <>
      {/* PF hero — side column (video + plans) + main render with overlay CTAs */}
      <section id="pf-gallery" className="ruwaq-pf-gallery-section ruwaq-pf-gallery-section--lead">
        <div className="ruwaq-pf-hero-grid ruwaq-pf-hero-grid--pf">
          <div className="ruwaq-pf-hero-side">
            {hasVideo ? (
              <button
                type="button"
                className="ruwaq-pf-hero-side-item ruwaq-pf-hero-side-item--video"
                onClick={() => setVideoOpen(true)}
                aria-label={copy.watchFilm}
              >
                {youtubeThumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={youtubeThumb} alt="" className="ruwaq-pf-hero-video-thumb" />
                ) : (
                  <Image
                    src={project.heroVideoPoster}
                    alt=""
                    fill
                    className="object-cover opacity-50"
                    sizes="400px"
                  />
                )}
                <span className="ruwaq-pf-hero-play" aria-hidden>
                  ▶
                </span>
                <span>{copy.videoButton}</span>
              </button>
            ) : null}
            <button type="button" className="ruwaq-pf-hero-side-item" onClick={() => openLightbox(1)}>
              <Image
                src={gallery[1] ?? project.images.masterPlan}
                alt={isLaunch ? copy.masterPlan : copy.livingRoomLabel}
                fill
                className="object-cover"
                sizes="400px"
              />
              <span>{isLaunch ? copy.masterPlan : copy.livingRoomLabel}</span>
            </button>
            <button type="button" className="ruwaq-pf-hero-side-item" onClick={() => openLightbox(2)}>
              <Image
                src={gallery[2] ?? project.images.interior}
                alt={isLaunch ? copy.sitePlan : copy.kitchenLabel}
                fill
                className="object-cover"
                sizes="400px"
              />
              <span>{isLaunch ? copy.sitePlan : copy.kitchenLabel}</span>
            </button>
          </div>

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
              {isLaunch && project.deliveryQuarter ? (
                <span className="ruwaq-pf-badge ruwaq-pf-badge--muted">
                  {copy.delivery}: {project.deliveryQuarter}
                </span>
              ) : null}
            </div>
            {isLaunch ? (
              <div className="ruwaq-pf-hero-actions" onClick={(e) => e.stopPropagation()} role="presentation">
                {project.brochurePdf ? (
                  <a
                    href={project.brochurePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ruwaq-pf-hero-action-btn"
                  >
                    ↓ {copy.downloadBrochure}
                  </a>
                ) : null}
                {hasVideo ? (
                  <button type="button" className="ruwaq-pf-hero-action-btn" onClick={() => setVideoOpen(true)}>
                    ▶ {copy.videoButton}
                  </button>
                ) : null}
              </div>
            ) : null}
          </button>
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

      {/* PF: sidebar + main — title, developer strip, key info, gallery */}
      <div className="ruwaq-pf-detail-layout ruwaq-pf-detail-layout--pf">
        <aside className="ruwaq-pf-detail-sidebar">
          <div className="ruwaq-pf-sidebar-card ruwaq-pf-sidebar-card--cta">
            <p className="ruwaq-pf-sidebar-contact-soon">
              {isLaunch ? copy.contactSoon : copy.requestSimilarCta}
            </p>
            <Link href="/request-quote" className="ruwaq-pro-btn-solid w-full justify-center px-4 py-3 text-sm">
              {copy.requestQuoteCta}
            </Link>
            {isLaunch && project.brochurePdf ? (
              <a
                href={project.brochurePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="ruwaq-pro-btn-outline mt-3 w-full justify-center px-4 py-3 text-sm"
              >
                {copy.downloadBrochure}
              </a>
            ) : null}
            {hasVideo ? (
              <button
                type="button"
                className="ruwaq-pro-btn-outline mt-3 w-full justify-center px-4 py-3 text-sm"
                onClick={() => setVideoOpen(true)}
              >
                ▶ {copy.videoButton}
              </button>
            ) : null}
            <Link href="/tours" className="ruwaq-pf-sidebar-other-projects mt-4 inline-block text-sm">
              {copy.viewOtherProjects}
            </Link>
          </div>
        </aside>

        <div className="ruwaq-pf-detail-main">
          <header className="ruwaq-pf-project-header ruwaq-pf-project-header--inline">
            <span className="ruwaq-pf-badge">{badgeLabel}</span>
            <h1 className="ruwaq-pf-project-title">{title}</h1>
            {!isLaunch && summary ? (
              <p className="ruwaq-pf-project-summary ruwaq-pf-project-summary--editorial">{summary}</p>
            ) : null}
            {isLaunch ? (
              <>
                <p className="ruwaq-pf-launch-price">
                  {copy.launchPrice} <strong>{price}</strong>
                  {project.startingPrice > 0 ? <span className="ruwaq-pf-price-asterisk">*</span> : null}
                </p>
                <p className="ruwaq-pf-price-disclaimer">{copy.priceDisclaimer}</p>
              </>
            ) : null}
          </header>

          <div className="ruwaq-pf-developer-strip">
            <div className="ruwaq-pf-developer-strip__brand">
              {project.developer.logo ? (
                <Image
                  src={project.developer.logo}
                  alt={developer}
                  width={56}
                  height={56}
                  className="ruwaq-pf-developer-strip__logo"
                />
              ) : null}
              <div>
                <p className="ruwaq-pf-developer-strip__label">{copy.developer}</p>
                <p className="ruwaq-pf-developer-strip__name">{developer}</p>
              </div>
            </div>
            {developerLink}
          </div>

          <nav className="ruwaq-pf-section-nav" aria-label="Project sections">
            <button type="button" className="ruwaq-pf-section-nav__link is-active" onClick={() => scrollTo("pf-gallery")}>
              {copy.gallery}
            </button>
            <button type="button" className="ruwaq-pf-section-nav__link" onClick={() => scrollTo("pf-about")}>
              {isLaunch ? copy.aboutProject : copy.homeTourStoryLabel}
            </button>
            {hasPlansSection ? (
              <button type="button" className="ruwaq-pf-section-nav__link" onClick={() => scrollTo("pf-plans")}>
                {hasPlans ? copy.tabFloorPlans : copy.tabPayment}
              </button>
            ) : null}
            {hasVideo ? (
              <button type="button" className="ruwaq-pf-section-nav__link" onClick={() => scrollTo("pf-video")}>
                {copy.video}
              </button>
            ) : null}
          </nav>

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

          {(summary || aboutParagraphs.length > 0 || highlights.length > 0) ? (
            <section id="pf-about" className="ruwaq-pf-about scroll-mt-24">
              <h2 className="ruwaq-pf-section-heading">
                {isLaunch ? copy.aboutProject : copy.homeTourStoryLabel}
              </h2>
              {isLaunch && summary ? <p className="ruwaq-pf-about-text">{summary}</p> : null}
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="ruwaq-pf-about-text">
                  {paragraph}
                </p>
              ))}
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

          {hasPlansSection ? (
            <section id="pf-plans" className="ruwaq-pf-plans-section scroll-mt-24">
              <h2 className="ruwaq-pf-section-heading">
                {hasPlans && hasPaymentSchedule
                  ? `${copy.tabFloorPlans} · ${copy.tabPayment}`
                  : hasPlans
                    ? copy.tabFloorPlans
                    : copy.tabPayment}
              </h2>
              <ProjectPlansTabs
                project={project}
                locale={locale}
                copy={{
                  tabFloorPlans: copy.tabFloorPlans,
                  tabPayment: copy.tabPayment,
                  view2d: copy.view2d,
                  view3d: copy.view3d,
                  paymentIntro: copy.paymentIntro,
                  installment: copy.installment,
                }}
              />
            </section>
          ) : null}

          {hasVideo ? (
            <section id="pf-video" className="ruwaq-pf-video-section scroll-mt-24">
              <h2 className="ruwaq-pf-section-heading">{copy.video}</h2>
              <div className="ruwaq-pf-video-wrap">
                {youtubeEmbedUrl ? (
                  <iframe
                    src={youtubeEmbedUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="ruwaq-pf-video-embed"
                  />
                ) : project.heroVideo ? (
                  <video
                    src={project.heroVideo}
                    poster={project.heroVideoPoster}
                    controls
                    playsInline
                    preload="metadata"
                    className="ruwaq-pf-video-player"
                  />
                ) : null}
              </div>
            </section>
          ) : null}
        </div>
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

      {videoOpen && hasVideo ? (
        <dialog open className="ruwaq-offplan-dialog" onClick={() => setVideoOpen(false)}>
          <div className="ruwaq-offplan-video-panel ruwaq-offplan-video-panel--wide" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="ruwaq-offplan-dialog-close" onClick={() => setVideoOpen(false)} aria-label={copy.closeModal}>
              ✕
            </button>
            {youtubeEmbedUrl ? (
              <iframe
                src={`${youtubeEmbedUrl}&autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="ruwaq-pf-video-embed w-full rounded-xl"
              />
            ) : project.heroVideo ? (
              <video src={project.heroVideo} poster={project.heroVideoPoster} controls autoPlay playsInline className="w-full rounded-xl" />
            ) : null}
          </div>
        </dialog>
      ) : null}
    </>
  );
}
