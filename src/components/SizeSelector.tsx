export default function SizeSelector({
  sizes,
  value,
  onChange,
}: {
  sizes: string[];
  value: string | undefined;
  onChange: (s: string) => void;
}) {
  return (
    <div>
      {sizes.map((s) => (
        <button key={s} disabled={s === value} onClick={() => onChange(s)}>
          {s}
        </button>
      ))}
    </div>
  );
}
