import { useState } from "react";
import { Card, CardTitle } from "../components/ui/Card";
import PageHeader from "../components/PageHeader";

// Use placeholder image
const competitorImage = "https://via.placeholder.com/1200x400?text=Competitor+Intelligence";

export default function CompetitorIntelligence() {
  return (
    <div>
      <PageHeader
        label="Intelligence · Competitors"
        title="Competitor Intelligence Hub"
        description="Track competitor activities, pricing strategies, and market positioning."
        backgroundGradient="indigo"
        image={competitorImage}
      />
      
      <div className="px-12 py-10">
        <Card>
          <CardTitle>Competitor Intelligence</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)]">
            Competitor tracking tools loading...
          </p>
        </Card>
      </div>
    </div>
  );
}
