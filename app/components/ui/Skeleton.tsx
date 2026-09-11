export default function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-paper-dim ${className}`}
      style={style}
    />
  );
}
