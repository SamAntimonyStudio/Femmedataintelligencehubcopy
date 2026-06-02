import { Card, CardTitle, MetricCard, AIInsightCard } from "../../components/ui/Card";
import { FilterBar, StatGrid } from "../../components/ui/Filters";
import PageHeader from "../../components/PageHeader";

export default function MetaReport() {
  return (
    <div>
      <PageHeader
        label="Reports · Meta Advertising"
        title="Meta Ads Performance Report"
        description="Facebook and Instagram advertising performance. Campaign results, creative insights, audience performance, and ROAS analysis across Meta platforms."
        backgroundGradient="pink"
        stats={[
          { label: "6M Ad Spend", value: "$84.2K" },
          { label: "Avg ROAS", value: "4.6x" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        <FilterBar showChannel={false} />

        <StatGrid columns={4}>
          <MetricCard
            label="Total Ad Spend"
            value="$84,240"
            change="+8.4%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Total Revenue"
            value="$387,504"
            change="+12.6%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="ROAS"
            value="4.6x"
            change="+0.4x"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Conversions"
            value="3,842"
            change="+14.2%"
            changeType="positive"
            trend="up"
          />
        </StatGrid>

        <AIInsightCard
          title="AI Meta Insight"
          content="Carousel ads outperform single image ads by 2.3x. Instagram Stories ads have lowest CPA ($42 vs $68 average). Lookalike audiences from VIP customers show 5.8x ROAS. Recommendation: increase Stories budget and expand Lookalike testing."
        />

        <Card>
          <CardTitle>6-Month Meta Performance Summary</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Facebook & Instagram advertising metrics</p>
          <div className="space-y-6 text-[14px] text-[var(--text-secondary)]">
            <p>Comprehensive Meta advertising performance including campaign-level results, ad set optimisation, creative performance analysis, and audience insights.</p>
            <p>Full report includes: Platform breakdown (Facebook vs Instagram), placement performance, demographic insights, creative fatigue analysis, and conversion funnel metrics.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
