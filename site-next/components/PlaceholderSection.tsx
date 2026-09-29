interface Props {
  id: string;
  label: string;
  name: string;
  num: string;
}

export default function PlaceholderSection({ id, label, name, num }: Props) {
  return (
    <section id={id} className="placeholder">
      <div className="stack-card">
        <span className="placeholder-label">{label}</span>
        <span className="placeholder-name">{name}</span>
        <span className="placeholder-num">{num}</span>
      </div>
    </section>
  );
}
