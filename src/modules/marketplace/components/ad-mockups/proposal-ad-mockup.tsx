/** AD-style device pair — proposal PDF preview (CSS only). */
export function ProposalAdMockup() {
  return (
    <div className="ruwaq-ad-featured-devices" aria-hidden>
      <div className="ruwaq-ad-featured-device ruwaq-ad-featured-device--tablet">
        <div className="ruwaq-ad-featured-screen ruwaq-ad-featured-screen--pdf">
          <div className="ruwaq-ad-featured-pdf-header">
            <span className="ruwaq-ad-featured-pdf-logo">RUWAQ</span>
          </div>
          <div className="ruwaq-ad-featured-pdf-line ruwaq-ad-featured-pdf-line--title" />
          <div className="ruwaq-ad-featured-pdf-line" />
          <div className="ruwaq-ad-featured-pdf-line" />
          <div className="ruwaq-ad-featured-pdf-line ruwaq-ad-featured-pdf-line--short" />
          <div className="ruwaq-ad-featured-pdf-block" />
        </div>
      </div>
      <div className="ruwaq-ad-featured-device ruwaq-ad-featured-device--phone">
        <div className="ruwaq-ad-featured-screen ruwaq-ad-featured-screen--pdf">
          <div className="ruwaq-ad-featured-pdf-header">
            <span className="ruwaq-ad-featured-pdf-logo ruwaq-ad-featured-pdf-logo--sm">PDF</span>
          </div>
          <div className="ruwaq-ad-featured-pdf-line" />
          <div className="ruwaq-ad-featured-pdf-line ruwaq-ad-featured-pdf-line--short" />
          <div className="ruwaq-ad-featured-pdf-line" />
        </div>
      </div>
    </div>
  );
}
