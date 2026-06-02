import React, { useState } from "react";
import { useFilters } from "../../context/FilterContext";
import { Calendar, X } from "lucide-react";

interface FilterBarProps {
  className?: string;
  showDateRange?: boolean;
  showChannel?: boolean;
  showComparison?: boolean;
  customChannelLabel?: string;
  customChannels?: Array<{ value: string; label: string }>;
}

export function FilterBar({
  className = "",
  showDateRange = true,
  showChannel = true,
  showComparison = true,
  customChannelLabel,
  customChannels
}: FilterBarProps) {
  const { dateRange, setDateRange, channel, setChannel, comparison, setComparison } = useFilters();
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  const handleCustomDateApply = () => {
    if (customStartDate && customEndDate) {
      setDateRange("custom");
      setShowCustomDatePicker(false);
    }
  };

  return (
    <div className={`flex flex-wrap gap-6 mb-8 ${className}`}>
      {showDateRange && (
        <FilterGroup label="Date Range">
        <FilterButton 
          active={dateRange === "today"} 
          onClick={() => setDateRange("today")}
        >
          Today
        </FilterButton>
        <FilterButton 
          active={dateRange === "7d"} 
          onClick={() => setDateRange("7d")}
        >
          Last 7D
        </FilterButton>
        <FilterButton 
          active={dateRange === "30d"} 
          onClick={() => setDateRange("30d")}
        >
          Last 30D
        </FilterButton>
        <FilterButton 
          active={dateRange === "90d"} 
          onClick={() => setDateRange("90d")}
        >
          Last 90D
        </FilterButton>
        <FilterButton 
          active={dateRange === "mtd"} 
          onClick={() => setDateRange("mtd")}
        >
          MTD
        </FilterButton>
        <FilterButton
          active={dateRange === "ytd"}
          onClick={() => setDateRange("ytd")}
        >
          YTD
        </FilterButton>
        <FilterButton
          active={dateRange === "custom"}
          onClick={() => setShowCustomDatePicker(true)}
        >
          <Calendar className="w-3.5 h-3.5 inline-block mr-1" />
          Custom
        </FilterButton>
        {showComparison && (
          <>
            <FilterButton
              variant="accent"
              active={comparison === "prior-period"}
              onClick={() => setComparison(comparison === "prior-period" ? "none" : "prior-period")}
            >
              vs. Prior Period
            </FilterButton>
            <FilterButton
              variant="accent"
              active={comparison === "prior-year"}
              onClick={() => setComparison(comparison === "prior-year" ? "none" : "prior-year")}
            >
              vs. Prior Year
            </FilterButton>
          </>
        )}
      </FilterGroup>
      )}

      {showChannel && (
        <FilterGroup label={customChannelLabel || "Channel"}>
        {customChannels ? (
          customChannels.map((ch) => (
            <FilterButton
              key={ch.value}
              active={channel === ch.value}
              onClick={() => setChannel(ch.value)}
            >
              {ch.label}
            </FilterButton>
          ))
        ) : (
          <>
            <FilterButton
              active={channel === "all"}
              onClick={() => setChannel("all")}
            >
              All Channels
            </FilterButton>
            <FilterButton
              active={channel === "organic"}
              onClick={() => setChannel("organic")}
            >
              Organic
            </FilterButton>
            <FilterButton
              active={channel === "paid-social"}
              onClick={() => setChannel("paid-social")}
            >
              Paid Social
            </FilterButton>
            <FilterButton
              active={channel === "email"}
              onClick={() => setChannel("email")}
            >
              Email
            </FilterButton>
            <FilterButton
              active={channel === "google"}
              onClick={() => setChannel("google")}
            >
              Google Ads
            </FilterButton>
            <FilterButton
              active={channel === "direct"}
              onClick={() => setChannel("direct")}
            >
              Direct
            </FilterButton>
          </>
        )}
      </FilterGroup>
      )}

      {/* Custom Date Picker Modal */}
      {showCustomDatePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[var(--radius-lg)] p-6 w-[400px] shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Custom Date Range</h3>
              <button
                onClick={() => setShowCustomDatePicker(false)}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCustomDatePicker(false)}
                className="px-4 py-2 text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomDateApply}
                className="px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface FilterGroupProps {
  label: string;
  children: React.ReactNode;
}

function FilterGroup({ label, children }: FilterGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <div 
        className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

interface FilterButtonProps {
  children: React.ReactNode;
  active?: boolean;
  variant?: "default" | "accent";
  onClick?: () => void;
}

function FilterButton({ children, active = false, variant = "default", onClick }: FilterButtonProps) {
  const baseStyles = "px-4 py-2 text-[12.5px] rounded-[var(--radius-sm)] transition-colors cursor-pointer";
  
  let variantStyles = "";
  if (active && variant === "default") {
    variantStyles = "bg-[var(--green)] text-white border border-[var(--green)]";
  } else if (variant === "accent") {
    variantStyles = "bg-[var(--pink-light)] text-[var(--pink-dark)] border border-[var(--pink)]";
  } else {
    variantStyles = "bg-white text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--border-strong)]";
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles}`}
    >
      {children}
    </button>
  );
}

interface StatGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatGrid({ children, columns = 3, className = "" }: StatGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {children}
    </div>
  );
}

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  tag?: { label: string; variant?: "pink" | "green" | "terra" };
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({ title, subtitle, tag, children, className = "" }: ChartContainerProps) {
  return (
    <div className={`bg-white border border-[var(--border-color)] rounded-[var(--radius-lg)] p-6 ${className}`}>
      <div className="mb-6">
        {tag && (
          <div className="mb-3">
            <Tag variant={tag.variant}>{tag.label}</Tag>
          </div>
        )}
        <h3 
          className="text-[1.25rem] font-semibold text-[var(--green)] mb-1 leading-[1.2]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h3>
        {subtitle && (
          <p className="text-[13px] text-[var(--text-secondary)]">
            {subtitle}
          </p>
        )}
      </div>
      <div className="min-h-[300px]">
        {children}
      </div>
    </div>
  );
}

function Tag({ children, variant = "pink" }: { children: React.ReactNode; variant?: "pink" | "green" | "terra" }) {
  const variantStyles = {
    pink: "bg-[var(--pink-light)] text-[var(--pink-dark)]",
    green: "bg-[var(--green-light)] text-[var(--green)]",
    terra: "bg-[var(--terra-light)] text-[#8a3a22]",
  };

  return (
    <span 
      className={`inline-block text-[10.5px] px-2.5 py-1 rounded-full uppercase tracking-wider font-medium ${variantStyles[variant]}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </span>
  );
}