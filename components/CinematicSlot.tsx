interface Props {
  label?: string;
  ratio?: string;
  tone?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function CinematicSlot({ label, ratio = '21/9', tone = 'hero', children, style }: Props) {
  return (
    <div className={`dt-cine dt-cine-${tone}`} style={{ aspectRatio: ratio, ...style }}>
      {children}
      <div className="dt-cine-grade" />
      <div className="dt-cine-figure" aria-hidden />
      <div className="dt-cine-grain" />
      {label && <div className="dt-cine-label">— {label}</div>}
    </div>
  );
}
