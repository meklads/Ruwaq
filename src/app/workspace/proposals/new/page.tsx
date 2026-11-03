import { cookies } from "next/headers";
import { NewProposalForm } from "@/modules/proposal/components/new-proposal-form";
import { getLeadProposalPrefill } from "@/modules/marketplace/server/lead-prefill.actions";
import {
  LETTERHEAD_FRAME_PREF_COOKIE,
  LETTERHEAD_PALETTE_PREF_COOKIE,
  parseLetterheadFrameId,
} from "@/modules/proposal/export/letterhead-frames";
import { getSession } from "@/modules/auth/server/session";
import { db } from "@/shared/lib/db";
import { lookFromSearchParams, sanitizeLook } from "@/modules/proposal/lib/proposal-look";
import { TEMPLATE_PALETTES } from "@/modules/proposal/export/template-palettes";

type Props = {
  searchParams: { matchId?: string; frame?: string; palette?: string; template?: string; c1?: string; c2?: string; c3?: string };
};

function parsePaletteId(value: string | null | undefined): string {
  if (value && value in TEMPLATE_PALETTES) return value;
  return "gold_sand";
}

export default async function NewProposalPage({ searchParams }: Props) {
  const prefill = searchParams.matchId
    ? await getLeadProposalPrefill(searchParams.matchId)
    : null;

  const jar = await cookies();
  const frameId = parseLetterheadFrameId(
    searchParams.frame ?? jar.get(LETTERHEAD_FRAME_PREF_COOKIE)?.value
  );
  const paletteId = parsePaletteId(
    searchParams.palette ?? jar.get(LETTERHEAD_PALETTE_PREF_COOKIE)?.value
  );

  // Persist gallery choice onto company profile when signed in.
  const session = await getSession();
  if (session?.user?.id && (searchParams.frame || searchParams.palette)) {
    try {
      await db.companyProfile.upsert({
        where: { userId: session.user.id },
        update: {
          letterheadFrameId: frameId,
          paletteId,
        },
        create: {
          userId: session.user.id,
          letterheadFrameId: frameId,
          paletteId,
        },
      });
    } catch {
      // Columns may not exist until db push finishes — ignore soft-fail.
    }
  }

  // The look travels with the proposal (stored on it when created), so it survives reopening.
  const look = sanitizeLook({
    ...(lookFromSearchParams(searchParams) ?? {}),
    frameId: searchParams.frame ?? jar.get(LETTERHEAD_FRAME_PREF_COOKIE)?.value,
    ...(lookFromSearchParams(searchParams)?.primary
      ? {}
      : { paletteId: searchParams.palette ?? jar.get(LETTERHEAD_PALETTE_PREF_COOKIE)?.value }),
  });

  return <NewProposalForm variant="page" prefill={prefill} look={look} />;
}
