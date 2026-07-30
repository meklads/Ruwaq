/** AD-style device pair — interior / architectural preview (CSS only). */
export function VisualizationAdMockup() {
  return (
    <div className="ruwaq-ad-featured-devices" aria-hidden>
      <div className="ruwaq-ad-featured-device ruwaq-ad-featured-device--tablet">
        <div className="ruwaq-ad-featured-screen ruwaq-ad-featured-screen--interior">
          <div className="ruwaq-ad-featured-interior-wall" />
          <div className="ruwaq-ad-featured-interior-art" />
          <div className="ruwaq-ad-featured-interior-bed" />
          <div className="ruwaq-ad-featured-interior-canopy" />
        </div>
      </div>
      <div className="ruwaq-ad-featured-device ruwaq-ad-featured-device--phone">
        <div className="ruwaq-ad-featured-screen ruwaq-ad-featured-screen--interior">
          <div className="ruwaq-ad-featured-interior-wall" />
          <div className="ruwaq-ad-featured-interior-art ruwaq-ad-featured-interior-art--sm" />
          <div className="ruwaq-ad-featured-interior-bed ruwaq-ad-featured-interior-bed--sm" />
        </div>
      </div>
    </div>
  );
}
