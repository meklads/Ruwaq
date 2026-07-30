/** AD-style device pair — architectural visualization preview (CSS only). */
export function VisualizationAdMockup() {
  return (
    <div className="ruwaq-ad-featured-devices" aria-hidden>
      <div className="ruwaq-ad-featured-device ruwaq-ad-featured-device--tablet">
        <div className="ruwaq-ad-featured-screen ruwaq-ad-featured-screen--viz">
          <div className="ruwaq-ad-featured-viz-sky" />
          <div className="ruwaq-ad-featured-viz-tower" />
          <div className="ruwaq-ad-featured-viz-ground" />
        </div>
      </div>
      <div className="ruwaq-ad-featured-device ruwaq-ad-featured-device--phone">
        <div className="ruwaq-ad-featured-screen ruwaq-ad-featured-screen--viz">
          <div className="ruwaq-ad-featured-viz-sky" />
          <div className="ruwaq-ad-featured-viz-tower ruwaq-ad-featured-viz-tower--sm" />
        </div>
      </div>
    </div>
  );
}
