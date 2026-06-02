import { Card, CardTitle, MetricCard, AIInsightCard } from "../../components/ui/Card";
import { FilterBar, StatGrid } from "../../components/ui/Filters";
import PageHeader from "../../components/PageHeader";

export default function SocialReport() {
  return (
    <div>
      <PageHeader
        label="Reports · Social Media"
        title="Social Media Performance Report"
        description="Organic social performance across Instagram, TikTok, Pinterest, and Facebook. Engagement metrics, content analysis, and audience growth tracking."
        backgroundGradient="green"
        stats={[
          { label: "Total Followers", value: "124K" },
          { label: "Avg Engagement", value: "4.8%" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        <FilterBar showChannel={false} />

        <StatGrid columns={4}>
          <MetricCard
            label="Total Followers"
            value="124,280"
            change="+8,420"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Engagement Rate"
            value="4.8%"
            change="+0.6%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Total Reach"
            value="2.4M"
            change="+18.2%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Content Posts"
            value="284"
            change="+12.4%"
            changeType="positive"
            trend="up"
          />
        </StatGrid>

        <AIInsightCard
          title="AI Social Insight"
          content="TikTok drives highest engagement rate (8.2%) and fastest follower growth. Behind-the-scenes content outperforms product-only posts by 3.4x. Optimal posting times: Instagram 6-8PM, TikTok 9-11AM. Recommendation: increase TikTok content from 20% to 35% of social mix."
        />

        <Card>
          <CardTitle>6-Month Social Performance Summary</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Organic social media metrics across platforms</p>
          <div className="space-y-6 text-[14px] text-[var(--text-secondary)]">
            <p>Comprehensive social media performance including follower growth, engagement analysis, content performance, and platform-specific insights.</p>
            <p>Full report includes: Platform breakdown, top performing content, audience demographics, hashtag performance, Stories/Reels analytics, and competitive benchmarking.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
