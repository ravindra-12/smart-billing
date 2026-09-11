import type { LucideIcon } from "lucide-react";

type Tone = "accent" | "ink" | "inverse";
type Size = "sm" | "md" | "lg";

const tones: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent-dark",
  ink: "bg-paper-dim text-ink",
  inverse: "bg-white/10 text-paper",
};

const sizes: Record<Size, { box: string; icon: number }> = {
  sm: { box: "h-10 w-10 rounded-xl", icon: 18 },
  md: { box: "h-12 w-12 rounded-2xl", icon: 22 },
  lg: { box: "h-14 w-14 rounded-2xl", icon: 26 },
};

export default function IconTile({
  icon: Icon,
  tone = "accent",
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  const { box, icon } = sizes[size];

  return (
    <div className={`flex shrink-0 items-center justify-center ${box} ${tones[tone]} ${className}`}>
      <Icon size={icon} strokeWidth={2} />
    </div>
  );
}
