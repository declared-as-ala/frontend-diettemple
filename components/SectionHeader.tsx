interface Props {
  eyebrow: string;
  title: React.ReactNode;
  kicker?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ eyebrow, title, kicker, align = 'left' }: Props) {
  return (
    <div className={`dt-sec-head dt-sec-head-${align} dt-reveal`}>
      <div className="dt-eyebrow">— {eyebrow}</div>
      <h2 className="dt-sec-title">{title}</h2>
      {kicker && <p className="dt-sec-kicker">{kicker}</p>}
    </div>
  );
}
