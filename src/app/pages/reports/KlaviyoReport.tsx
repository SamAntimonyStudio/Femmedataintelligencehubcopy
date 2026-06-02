import { Card, CardTitle, MetricCard, AIInsightCard } from "../../components/ui/Card";
import { FilterBar, StatGrid } from "../../components/ui/Filters";
import PageHeader from "../../components/PageHeader";

export default function KlaviyoReport() {
  return (
    <div>
      <PageHeader
        label="Reports · Email & CRM"
        title="Klaviyo Performance Report"
        description="Monthly email marketing and automation performance. Campaign analytics, flow conversions, list health, and subscriber engagement metrics."
        backgroundGradient="buff"
        stats={[
          { label: "6M Email Revenue", value: "$231K" },
          { label: "Avg Open Rate", value: "32.4%" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        <FilterBar showChannel={false} />

        <StatGrid columns={4}>
          <MetricCard
            label="Total Email Revenue"
            value="$231,840"
            change="+16.2%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Average Open Rate"
            value="32.4%"
            change="+3.1%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="List Growth"
            value="+7,684"
            change="+22.8%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Flow Revenue"
            value="$168K"
            change="+18.4%"
            changeType="positive"
            trend="up"
          />
        </StatGrid>

        <AIInsightCard
          title="AI Email Insight"
          content="Your automated flows generate 72% of total email revenue. Abandoned cart flow is the top performer. Consider expanding welcome series from 3 to 5 emails and testing SMS integration for cart recovery (projected +$12K/month)."
        />

        <Card>
          <CardTitle>6-Month Email Performance Summary</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Campaign and flow metrics</p>
          <div className="space-y-6 text-[14px] text-[var(--text-secondary)]">
            <p>Detailed Klaviyo performance metrics including campaign sends, automation flows, segmentation performance, and subscriber lifecycle analysis.</p>
            <p>Full report includes: Flow conversion rates, A/B test results, deliverability metrics, revenue attribution by segment, and subscriber engagement scoring.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
