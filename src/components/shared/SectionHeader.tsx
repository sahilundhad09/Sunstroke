import { FadeIn } from "@/components/motion/FadeIn";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  accentColor?: "cyan" | "gold" | "pink" | "green";
}

const badgeBgMap = {
  cyan: "bg-[#00d4ff] text-black",
  gold: "bg-[#ff9f0a] text-black",
  pink: "bg-[#ff90e8] text-black",
  green: "bg-[#00e599] text-black",
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  className = "",
  accentColor = "gold",
}: SectionHeaderProps) {
  const badgeClass = badgeBgMap[accentColor] || badgeBgMap.gold;

  return (
    <FadeIn className={`mb-12 md:mb-16 ${centered ? "text-center" : ""} ${className}`}>
      {badge && (
        <span className={`mb-4 inline-block rounded-lg border-2 border-black ${badgeClass} px-4 py-1 text-xs font-heading font-black tracking-widest uppercase shadow-gumroad-sm`}>
          {badge}
        </span>
      )}
      <h2 className="mt-2 font-heading font-black tracking-tight text-black text-3xl sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base font-bold text-zinc-800 sm:text-lg">
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}
