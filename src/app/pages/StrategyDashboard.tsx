import { useState } from "react";
import { Card, CardTitle } from "../components/ui/Card";
import PageHeader from "../components/PageHeader";

const strategyImage = "https://via.placeholder.com/1200x400?text=Strategy+Dashboard";

export default function StrategyDashboard() {
  return (
    <div>
      <PageHeader
        label="Dashboard · Strategy"
        title="Strategy Dashboard"
        description="Monitor strategic initiatives, goals, and business objectives."
        backgroundGradient="orange"
        image={strategyImage}
      />
      
      <div className="px-12 py-10">
        <Card>
          <CardTitle>Strategic Planning</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)]">
            Strategy tools loading...
          </p>
        </Card>
      </div>
    </div>
  );
}
