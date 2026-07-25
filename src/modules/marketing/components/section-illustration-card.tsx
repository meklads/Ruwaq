import type {
  FeatureIllustrationId,
  PillarIllustrationId,
} from "@/modules/marketing/components/landing-illustrations";
import {
  FEATURE_ILLUSTRATIONS,
  PILLAR_ILLUSTRATIONS,
} from "@/modules/marketing/components/landing-illustrations";

type Base = { title: string; body: string };

type Props =
  | (Base & { variant?: "feature"; illustration: FeatureIllustrationId })
  | (Base & { variant: "pillar"; illustration: PillarIllustrationId });

function CardContent({
  Ill,
  title,
  body,
}: {
  Ill: (props: { className?: string }) => React.ReactElement;
  title: string;
  body: string;
}) {
  return (
    <article className="ruwaq-illustration-card group">
      <div className="ruwaq-illustration-card-art">
        <Ill className="ruwaq-illustration-card-svg" />
      </div>
      <h3 className="ruwaq-illustration-card-title">{title}</h3>
      <p className="ruwaq-illustration-card-body">{body}</p>
    </article>
  );
}

/** Centered landing card with premium SVG illustration. */
export function SectionIllustrationCard(props: Props) {
  const { title, body } = props;

  if (props.variant === "pillar") {
    const Ill = PILLAR_ILLUSTRATIONS[props.illustration];
    return <CardContent Ill={Ill} title={title} body={body} />;
  }

  const Ill = FEATURE_ILLUSTRATIONS[props.illustration];
  return <CardContent Ill={Ill} title={title} body={body} />;
}
