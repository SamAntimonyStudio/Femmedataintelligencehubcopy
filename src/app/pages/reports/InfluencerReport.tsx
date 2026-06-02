import { Card, CardTitle, MetricCard, AIInsightCard } from "../../components/ui/Card";
import { FilterBar, StatGrid } from "../../components/ui/Filters";
import PageHeader from "../../components/PageHeader";

export default function InfluencerReport() {
  return (
    <div>
      <PageHeader
        label="Reports · Influencer Marketing"
        title="Influencer Performance Report"
        description="Influencer partnership performance tracking. Campaign ROI, creator performance, EMV (Earned Media Value) analysis, and content impact metrics."
        backgroundGradient="pink"
        stats={[
          { label: "Total EMV", value: "$124K" },
          { label: "Active Creators", value: "28" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        <FilterBar showChannel={false} />

        <StatGrid columns={4}>
          <MetricCard
            label="Total EMV"
            value="$124,280"
            change="+32.4%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Active Creators"
            value="28"
            change="+8"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Total Reach"
            value="842K"
            change="+24.6%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Avg Engagement"
            value="6.4%"
            change="+1.2%"
            changeType="positive"
            trend="up"
          />
        </StatGrid>

        <AIInsightCard
          title="AI Influencer Insight"
          content="Micro-influencers (50K-150K followers) deliver 4.2x better ROI than macro-influencers. TikTok partnerships drive 3.8x more conversions than Instagram. Video content outperforms static posts by 5.6x. Recommendation: shift 60% of budget to micro-influencers and prioritize TikTok collaborations."
        />

        <Card>
          <CardTitle>6-Month Influencer Performance Summary</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Creator partnership and campaign metrics</p>
          <div className="space-y-6 text-[14px] text-[var(--text-secondary)]">
            <p>Comprehensive influencer marketing performance including campaign ROI, creator-level analytics, content performance, and earned media value tracking.</p>
            <p>Full report includes: Creator tier analysis, platform breakdown, content type performance, affiliate revenue attribution, discount code usage, and partnership engagement metrics.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
