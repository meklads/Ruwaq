type Props = { className?: string };

type IllustrationComponent = (props: Props) => React.ReactElement;

/** Scope of work — document with shield checkmarks. */
export function TicketIllustrationScope({ className }: Props) {
  return (
    <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
      <rect x="18" y="12" width="52" height="64" rx="6" stroke="#0F172A" strokeWidth="2" />
      <path d="M28 28h32M28 38h24M28 48h28" stroke="#C9A063" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M44 58c-6 0-10-3.5-10-8v-4l10-5 10 5v4c0 4.5-4 8-10 8z"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M40 56l2.5 2.5L49 52" stroke="#C9A063" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Timeline — calendar with progress arc. */
export function TicketIllustrationTimeline({ className }: Props) {
  return (
    <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
      <rect x="16" y="20" width="56" height="52" rx="6" stroke="#0F172A" strokeWidth="2" />
      <path d="M16 34h56" stroke="#0F172A" strokeWidth="2" />
      <path d="M32 20v10M56 20v10" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="48" r="3" fill="#C9A063" />
      <circle cx="44" cy="48" r="3" fill="#C9A063" />
      <circle cx="58" cy="48" r="3" fill="#C9A063" />
      <path d="M24 62h40" stroke="#C9A063" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 62h16" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M62 62l6 6" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Payments — structured payment bars with coin. */
export function TicketIllustrationPayments({ className }: Props) {
  return (
    <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
      <rect x="14" y="48" width="14" height="24" rx="3" fill="#F5F0E6" stroke="#0F172A" strokeWidth="1.75" />
      <rect x="32" y="38" width="14" height="34" rx="3" fill="#F5F0E6" stroke="#0F172A" strokeWidth="1.75" />
      <rect x="50" y="28" width="14" height="44" rx="3" fill="#F5F0E6" stroke="#C9A063" strokeWidth="2" />
      <rect x="68" y="18" width="14" height="54" rx="3" fill="#F5F0E6" stroke="#0F172A" strokeWidth="1.75" />
      <circle cx="44" cy="22" r="14" stroke="#C9A063" strokeWidth="2" />
      <path d="M44 16v12M38 22h12" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** PDF export — document ready to send. */
export function TicketIllustrationPdf({ className }: Props) {
  return (
    <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
      <path
        d="M22 14h34l12 12v48H22V14z"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M56 14v12h12" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
      <rect x="30" y="36" width="28" height="4" rx="1" fill="#C9A063" />
      <path d="M30 46h20M30 54h24M30 62h16" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="62" cy="62" r="12" fill="#C9A063" fillOpacity="0.2" stroke="#C9A063" strokeWidth="2" />
      <path d="M58 62l3 3 6-7" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type TicketIllustrationId = "scope" | "timeline" | "payments" | "pdf";

export const TICKET_ILLUSTRATIONS: Record<TicketIllustrationId, IllustrationComponent> = {
  scope: TicketIllustrationScope,
  timeline: TicketIllustrationTimeline,
  payments: TicketIllustrationPayments,
  pdf: TicketIllustrationPdf,
};
