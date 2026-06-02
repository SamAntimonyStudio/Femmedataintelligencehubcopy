import { useFilters } from "../context/FilterContext";
import { ExternalLink } from "lucide-react";

interface PageHeaderProps {
  label: string;
  title: string;
  description: string;
  backgroundGradient?: "pink" | "green" | "terra" | "buff" | "multi";
  externalLinks?: Array<{
    name: string;
    url: string;
  }>;
  stats?: Array<{
    label: string;
    value: string;
  }>;
  image?: string;
}

export default function PageHeader({
  label,
  title,
  description,
  backgroundGradient = "multi",
  externalLinks,
  stats,
  image,
}: PageHeaderProps) {
  const { dateRange, channel } = useFilters();

  const dateRangeLabels: Record<string, string> = {
    today: "Today",
    "7d": "Last 7 Days",
    "30d": "Last 30 Days",
    "90d": "Last 90 Days",
    mtd: "Month to Date",
    ytd: "Year to Date",
    custom: "Custom",
  };

  const channelLabels: Record<string, string> = {
    all: "All Channels",
    organic: "Organic",
    "paid-social": "Paid Social",
    email: "Email",
    google: "Google Ads",
    direct: "Direct",
  };

  const gradientStyles = {
    pink: "from-[var(--green)] to-[var(--pink-dark)]",
    green: "from-[var(--green)] to-[var(--green-dark)]",
    terra: "from-[var(--green)] to-[var(--terra)]",
    buff: "from-[var(--green)] to-[var(--buff-dark)]",
    multi: "from-[var(--green)] via-[var(--green)] to-[var(--green-dark)]",
  };

  return (
    <div className={`bg-gradient-to-br ${gradientStyles[backgroundGradient]} text-white relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute top-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full bg-[var(--pink)] opacity-10" />
      <div className="absolute bottom-[-60px] left-[30%] w-[240px] h-[240px] rounded-full bg-[var(--terra)] opacity-12" />
      {backgroundGradient === "multi" && (
        <div className="absolute top-[40%] right-[20%] w-[180px] h-[180px] rounded-full bg-[var(--buff)] opacity-8" />
      )}

      <div className="relative px-12 py-12">
        <div className={`flex ${image ? "justify-between items-center" : "flex-col"} gap-8`}>
          <div className="flex-1">
            {/* Label */}
            <div
              className="text-[11px] tracking-[0.18em] uppercase mb-3"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--pink)",
              }}
            >
              {label}
            </div>

            {/* Title */}
            <h1
              className="text-[3rem] font-medium mb-3 leading-[1.1]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {title}
            </h1>

            {/* Description */}
            <p
              className="text-[1.15rem] mb-6 max-w-3xl leading-relaxed"
              style={{
                color: "var(--buff)",
                fontWeight: 400,
              }}
            >
              {description}
            </p>

            {/* Context Info */}
            <div className="flex gap-8 text-[13px] text-white/55 mb-6">
              <div>
                Period <span className="text-white/80">{dateRangeLabels[dateRange]}</span>
              </div>
              <div>
                Channel <span className="text-white/80">{channelLabels[channel]}</span>
              </div>
              <div>
                Updated <span className="text-white/80">Apr 27, 2026 • 14:35</span>
              </div>
            </div>

            {/* External Links */}
            {externalLinks && externalLinks.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {externalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[13px] font-medium transition-colors border border-white/20"
                  >
                    {link.name}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="flex gap-8 mt-6">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-[11px] uppercase tracking-wider text-white/50 mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      {stat.label}
                    </div>
                    <div className="text-[1.5rem] font-medium" style={{ fontFamily: "var(--font-serif)" }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Optional Image */}
          {image && (
            <div className="w-[280px] h-[280px] rounded-2xl overflow-hidden ring-4 ring-white/20 flex-shrink-0">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                style={{ objectPosition: "center top" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
