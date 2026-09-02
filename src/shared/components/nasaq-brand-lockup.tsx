type Props = {
  name: string;
  tagline: string;
  className?: string;
};

export function NasaqBrandLockup({ name, tagline, className = "" }: Props) {
  return (
    <div className={`ruwaq-nasaq-lockup ${className}`.trim()}>
      <p className="ruwaq-nasaq-lockup__name">{name}</p>
      <p className="ruwaq-nasaq-lockup__tagline">{tagline}</p>
    </div>
  );
}
