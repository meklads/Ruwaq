type Props = { className?: string };

type Ill = (props: Props) => React.ReactElement;

/** Three input fields — minimal form. */
export const IllThreeInputs: Ill = ({ className }) => (
  <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
    <rect x="20" y="18" width="48" height="10" rx="5" stroke="#0F172A" strokeWidth="2" />
    <rect x="20" y="36" width="48" height="10" rx="5" stroke="#0F172A" strokeWidth="2" />
    <rect x="20" y="54" width="32" height="10" rx="5" stroke="#C9A063" strokeWidth="2" />
    <path d="M58 59h10" stroke="#C9A063" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="68" cy="59" r="4" fill="#C9A063" />
  </svg>
);

/** Assumptions & exclusions — shield on document. */
export const IllShieldDoc: Ill = ({ className }) => (
  <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
    <rect x="22" y="14" width="44" height="56" rx="5" stroke="#0F172A" strokeWidth="2" />
    <path d="M32 30h24M32 40h18" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M44 52c-5 0-8-3-8-7v-3l8-4 8 4v3c0 4-3 7-8 7z"
      stroke="#C9A063"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M41 50l2 2 4-4" stroke="#0F172A" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

/** Company-branded PDF. */
export const IllBrandPdf: Ill = ({ className }) => (
  <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
    <rect x="24" y="16" width="40" height="52" rx="4" stroke="#0F172A" strokeWidth="2" />
    <circle cx="44" cy="32" r="8" stroke="#C9A063" strokeWidth="2" />
    <path d="M34 48h20M34 56h14" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    <rect x="52" y="52" width="16" height="20" rx="3" fill="#F5F0E6" stroke="#C9A063" strokeWidth="1.75" />
    <path d="M56 60h8M56 66h6" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Preliminary estimate — clipboard. */
export const IllEstimate: Ill = ({ className }) => (
  <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
    <rect x="26" y="22" width="36" height="48" rx="4" stroke="#0F172A" strokeWidth="2" />
    <path d="M36 18h16a4 4 0 014 4v2H32v-2a4 4 0 014-4z" stroke="#0F172A" strokeWidth="2" />
    <path d="M34 38h20M34 46h16M34 54h12" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    <circle cx="58" cy="58" r="10" fill="#F5F0E6" stroke="#C9A063" strokeWidth="2" />
    <path d="M55 58h6M58 55v6" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** Arabic & English — bilingual. */
export const IllBilingual: Ill = ({ className }) => (
  <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
    <rect x="16" y="28" width="26" height="32" rx="6" stroke="#0F172A" strokeWidth="2" />
    <path d="M22 38h14M22 46h10" stroke="#C9A063" strokeWidth="2" strokeLinecap="round" />
    <rect x="46" y="28" width="26" height="32" rx="6" stroke="#0F172A" strokeWidth="2" />
    <path d="M52 38h14M52 46h10" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    <path d="M38 44h12" stroke="#C9A063" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
  </svg>
);

/** Instant start — play / launch. */
export const IllInstant: Ill = ({ className }) => (
  <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
    <circle cx="44" cy="44" r="26" stroke="#0F172A" strokeWidth="2" />
    <path d="M38 32l20 12-20 12V32z" fill="#F5F0E6" stroke="#C9A063" strokeWidth="2" strokeLinejoin="round" />
    <path d="M20 44H14M74 44h-6M44 20v-6M44 74v-6" stroke="#C9A063" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

/** Partnership — handshake abstract. */
export const IllPartner: Ill = ({ className }) => (
  <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
    <path d="M18 48c8-8 16-10 26-8 6 1 10 4 14 8" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    <path d="M70 48c-8-8-16-10-26-8-6 1-10 4-14 8" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    <rect x="30" y="46" width="28" height="14" rx="4" fill="#F5F0E6" stroke="#C9A063" strokeWidth="2" />
    <path d="M36 53h16" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** Regulations — scroll with seal. */
export const IllRegulations: Ill = ({ className }) => (
  <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
    <path d="M28 16h24v56H28V16z" stroke="#0F172A" strokeWidth="2" />
    <path d="M52 22c6 2 10 6 10 12v38H52V22z" stroke="#0F172A" strokeWidth="2" />
    <path d="M34 30h12M34 40h12M34 50h8" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    <circle cx="44" cy="62" r="8" stroke="#C9A063" strokeWidth="2" />
    <path d="M41 62l2 2 4-4" stroke="#0F172A" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

/** Verified reference — stamped document. */
export const IllVerified: Ill = ({ className }) => (
  <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden>
    <path d="M24 16h32l10 10v46H24V16z" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
    <path d="M56 16v10h10" stroke="#0F172A" strokeWidth="2" />
    <path d="M32 36h24M32 46h18" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    <circle cx="58" cy="58" r="12" fill="#F5F0E6" stroke="#C9A063" strokeWidth="2" />
    <path d="M54 58l3 3 7-8" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export type FeatureIllustrationId =
  | "inputs"
  | "shield"
  | "brand"
  | "estimate"
  | "bilingual"
  | "instant";

export type PillarIllustrationId = "partner" | "protection" | "regulations" | "verified";

export const FEATURE_ILLUSTRATIONS: Record<FeatureIllustrationId, Ill> = {
  inputs: IllThreeInputs,
  shield: IllShieldDoc,
  brand: IllBrandPdf,
  estimate: IllEstimate,
  bilingual: IllBilingual,
  instant: IllInstant,
};

export const PILLAR_ILLUSTRATIONS: Record<PillarIllustrationId, Ill> = {
  partner: IllPartner,
  protection: IllShieldDoc,
  regulations: IllRegulations,
  verified: IllVerified,
};
