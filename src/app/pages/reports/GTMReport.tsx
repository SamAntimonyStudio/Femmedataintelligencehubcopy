import { Card, CardTitle, MetricCard, AIInsightCard } from "../../components/ui/Card";
import { FilterBar, StatGrid } from "../../components/ui/Filters";
import PageHeader from "../../components/PageHeader";

export default function GTMReport() {
  return (
    <div>
      <PageHeader
        label="Reports · Go-To-Market"
        title="GTM Strategy Performance Report"
        description="Quarterly GTM execution summary. Campaign performance, strategic initiative progress, market expansion results, and overall growth metrics."
        backgroundGradient="green"
        stats={[
          { label: "Q1 Revenue", value: "$1.24M" },
          { label: "Initiatives Complete", value: "8/12" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        <FilterBar showChannel={false} showComparison={false} />

        <StatGrid columns={4}>
          <MetricCard
            label="Q1 Revenue"
            value="$1,242,840"
            change="+22.4%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Campaign ROAS"
            value="4.8x"
            change="+0.6x"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="New Customers"
            value="4,284"
            change="+18.2%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Initiatives"
            value="8/12"
            change="67% complete"
            changeType="positive"
            trend="up"
          />
        </StatGrid>

        <AIInsightCard
          title="AI GTM Insight"
          content="Q1 exceeded revenue targets by 12%. TikTok growth initiative delivered 3.2x expected ROI. Mother's Day campaign on track for $42K revenue (vs $35K target). SMS channel launch delayed but projected +$18K/month once live. Recommendation: accelerate SMS rollout and expand TikTok budget by 40%."
        />

        <Card>
          <CardTitle>Q1 2026 GTM Performance Summary</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Strategic initiative and campaign performance</p>
          <div className="space-y-6 text-[14px] text-[var(--text-secondary)]">
            <p>Comprehensive GTM strategy performance including campaign execution results, strategic initiative progress, market expansion metrics, and growth channel analysis.</p>
            <p>Full report includes: Campaign pipeline performance, initiative status tracking, channel investment ROI, competitive positioning analysis, and Q4/2026 strategic recommendations.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
