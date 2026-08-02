import type { Locale } from "@/shared/i18n/locale";

type Copy = {
  line: string;
  disclaimer: string;
};

type Props = {
  locale: Locale;
  copy: Copy;
};

export function ProjectCoBrandFooter({ copy }: Props) {
  return (
    <footer className="ruwaq-offplan-cobrand">
      <p className="ruwaq-offplan-cobrand-text">{copy.line}</p>
      <p className="ruwaq-offplan-cobrand-disclaimer">{copy.disclaimer}</p>
    </footer>
  );
}
