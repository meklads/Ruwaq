import { getMessages } from "@/shared/i18n";
import { getLocale } from "@/shared/i18n/server";
import {
  getFeaturedTodaysStory,
  getSecondaryTodaysStories,
} from "@/content/todays-stories";
import { TodaysStoryCard } from "@/modules/marketplace/components/todays-story-card";

export async function TodaysStoriesSection() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const copy = t.marketplace.homeMagazine;
  const featured = getFeaturedTodaysStory();
  const secondary = getSecondaryTodaysStories();

  return (
    <section
      className="ruwaq-ad-section ruwaq-todays-stories border-t border-neutral-200 bg-white"
      id="todays-stories"
      aria-labelledby="todays-stories-title"
    >
      <div className="ruwaq-ad-content">
        <header className="ruwaq-ad-section-header">
          <div>
            <p className="ruwaq-ad-eyebrow">{copy.todaysStoriesEyebrow}</p>
            <h2 id="todays-stories-title" className="ruwaq-ad-section-title">
              {copy.todaysStoriesTitle}
            </h2>
            <p className="ruwaq-ad-section-lead">{copy.todaysStoriesLead}</p>
          </div>
        </header>

        <div className="ruwaq-todays-stories-grid mt-10">
          <TodaysStoryCard story={featured} locale={locale} variant="featured" />
          {secondary.map((story) => (
            <TodaysStoryCard key={story.id} story={story} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
