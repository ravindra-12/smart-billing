import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  subtitleClassName?: string;
  subtitle?: string;
  showSubtitle?: boolean;
  showText?: boolean;
  size?: number;
}

export default function BrandLogo({
  className = "",
  imageClassName = "",
  textClassName = "",
  subtitleClassName = "",
  subtitle = "AI Powered Billing App",
  showSubtitle = true,
  showText = true,
  size = 40,
}: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
        <Image
          src="/Smart_Billing_Lite_Logo.png"
          alt="Smart Billing Lite logo"
          width={size}
          height={size}
          className={`h-auto w-auto object-contain ${imageClassName}`}
        />
      </div>

      {showText ? (
        <div>
          <div className={`font-display text-lg font-semibold leading-none text-ink ${textClassName}`}>
            Smart Billing <span className="text-accent">Lite</span>
          </div>
          {showSubtitle ? (
            <div className={`mt-1 text-[11px] font-medium text-ink-faint ${subtitleClassName}`}>
              {subtitle}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
