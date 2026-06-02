import { Card, CardTitle, MetricCard, AIInsightCard } from "../../components/ui/Card";
import { FilterBar, StatGrid } from "../../components/ui/Filters";
import PageHeader from "../../components/PageHeader";

export default function YotpoReport() {
  return (
    <div>
      <PageHeader
        label="Reports · Loyalty & Reviews"
        title="Yotpo Performance Report"
        description="Loyalty program performance, customer reviews, ratings analysis, and UGC (user-generated content) impact. Member retention and reward redemption metrics."
        backgroundGradient="buff"
        stats={[
          { label: "Loyalty Members", value: "11.3K" },
          { label: "Avg Review Rating", value: "4.6★" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        <FilterBar showChannel={false} />

        <StatGrid columns={4}>
          <MetricCard
            label="Loyalty Members"
            value="11,267"
            change="+1,842"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Member LTV"
            value="$542"
            change="+$84"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Total Reviews"
            value="2,840"
            change="+420"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Avg Rating"
            value="4.6★"
            change="+0.1"
            changeType="positive"
            trend="up"
          />
        </StatGrid>

        <AIInsightCard
          title="AI Loyalty Insight"
          content="Gold tier members (7.5% of base) drive 43% of total revenue. Reviews with photos generate 2.8x more conversions than text-only. Points-for-reviews program has 68% participation rate. Recommendation: launch VIP tier with exclusive early access and increase review photo incentives."
        />

        <Card>
          <CardTitle>6-Month Loyalty & Reviews Summary</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Yotpo loyalty and review performance</p>
          <div className="space-y-6 text-[14px] text-[var(--text-secondary)]">
            <p>Comprehensive loyalty and review analytics including member tier performance, points activity, reward redemptions, review collection rates, and UGC impact.</p>
            <p>Full report includes: Tier distribution, member lifetime value by segment, review sentiment analysis, photo review performance, referral program metrics, and at-risk member alerts.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
