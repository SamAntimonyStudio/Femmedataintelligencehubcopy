import React, { createContext, useContext, useState, ReactNode } from "react";

type DateRange = "today" | "7d" | "30d" | "90d" | "mtd" | "ytd" | "custom";
type Channel = "all" | "organic" | "paid-social" | "email" | "google" | "direct";
type Comparison = "none" | "prior-period" | "prior-year";

interface FilterContextType {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  channel: Channel;
  setChannel: (channel: Channel) => void;
  comparison: Comparison;
  setComparison: (comparison: Comparison) => void;
  getMultiplier: () => number;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [channel, setChannel] = useState<Channel>("all");
  const [comparison, setComparison] = useState<Comparison>("none");

  const getMultiplier = () => {
    const multipliers: Record<DateRange, number> = {
      today: 0.033, // 1/30
      "7d": 0.233, // 7/30
      "30d": 1,
      "90d": 3,
      mtd: 0.5, // Roughly half month
      ytd: 3.5, // Roughly 3.5 months
      custom: 1,
    };
    return multipliers[dateRange];
  };

  return (
    <FilterContext.Provider
      value={{
        dateRange,
        setDateRange,
        channel,
        setChannel,
        comparison,
        setComparison,
        getMultiplier,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
