import {
  BadgeCheck,
  Banknote,
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  Eye,
  EyeOff,
  FileQuestion,
  FileSearch,
  FileSignature,
  KeyRound,
  Layers,
  ListX,
  Lock,
  Scale,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Wallet,
  Building2,
  type LucideIcon,
} from "lucide-react";

/** Icon sets keyed by position in the matching copy arrays (site-copy.ts). */
export const FEAR_ICONS: LucideIcon[] = [Wallet, FileQuestion, ListX, EyeOff];
export const SERVICE_ICONS: LucideIcon[] = [FileSearch, Layers, ShieldCheck];
export const MEASURE_ICONS: LucideIcon[] = [Eye, BadgeCheck, Scale, FileSignature, Banknote, ClipboardCheck, KeyRound];
export const CONTRACTOR_ICONS: LucideIcon[] = [ClipboardList, UserCheck, CalendarCheck, TrendingUp];
export const PRINCIPLE_ICONS: LucideIcon[] = [UserCheck, Lock, Eye, Scale];
export const CHECK_ICONS: LucideIcon[] = [ClipboardList, FileQuestion, Scale, Banknote, CalendarCheck, ShieldCheck];
export const GROUP_ICONS: LucideIcon[] = [Building2, Layers];

export function iconAt(list: LucideIcon[], i: number): LucideIcon {
  return list[i] ?? Eye;
}

export function CardIcon({ icon, tone = "ink" }: { icon: LucideIcon | undefined; tone?: "ink" | "mark" }) {
  const Icon = icon ?? Eye;
  return (
    <span className={`rw-card__icon${tone === "mark" ? " rw-card__icon--mark" : ""}`} aria-hidden="true">
      <Icon size={20} strokeWidth={1.6} />
    </span>
  );
}
