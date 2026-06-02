import React, { useMemo, useState } from "react";
import { Card, CardTitle, MetricCard, AIInsightCard, Tag } from "../components/ui/Card";
import { FilterBar, StatGrid, ChartContainer } from "../components/ui/Filters";
import { useFilters } from "../context/FilterContext";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Search, ShoppingBag, Target, TrendingUp, Sparkles, X, AlertCircle, CheckCircle, TrendingDown } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { AIWidget } from "../components/AIWidget";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import { DetailedBriefModal, DetailedBriefData } from "../components/DetailedBriefModal";

const baseCampaignData = [
  {
    name: "Search — Brand Terms",
    type: "Search",
    spend: 2840,
    clicks: 1420,
    conversions: 86,
    roas: 6.8,
    cpc: 2.00,
    status: "active"
  },
  {
    name: "Shopping — Spring Collection",
    type: "Shopping",
    spend: 4280,
    clicks: 2140,
    conversions: 128,
    roas: 5.2,
    cpc: 2.00,
    status: "active"
  },
  {
    name: "Performance Max — All Products",
    type: "PMax",
    spend: 5620,
    clicks: 2680,
    conversions: 142,
    roas: 4.8,
    cpc: 2.10,
    status: "active"
  },
  {
    name: "Search — Category Terms",
    type: "Search",
    spend: 3180,
    clicks: 1680,
    conversions: 94,
    roas: 5.4,
    cpc: 1.89,
    status: "active"
  },
  {
    name: "Display — Retargeting",
    type: "Display",
    spend: 1840,
    clicks: 3680,
    conversions: 56,
    roas: 3.2,
    cpc: 0.50,
    status: "active"
  },
];

const basePerformanceTrend = [
  { week: "Week 1", spend: 3420, revenue: 16280, clicks: 1720, conversions: 88 },
  { week: "Week 2", spend: 3680, revenue: 18420, clicks: 1860, conversions: 96 },
  { week: "Week 3", spend: 3540, revenue: 17160, clicks: 1780, conversions: 92 },
  { week: "Week 4", spend: 4120, revenue: 21840, clicks: 2080, conversions: 112 },
];

const searchTerms = [
  { term: "femme connection", impressions: 8420, clicks: 642, ctr: 7.6, conversions: 42, position: 1.2 },
  { term: "sustainable fashion women", impressions: 12680, clicks: 380, ctr: 3.0, conversions: 28, position: 2.8 },
  { term: "silk midi dress", impressions: 18240, clicks: 548, ctr: 3.0, conversions: 38, position: 3.2 },
  { term: "luxury women's clothing", impressions: 24800, clicks: 744, ctr: 3.0, conversions: 48, position: 2.4 },
  { term: "ethical fashion brand", impressions: 9640, clicks: 289, ctr: 3.0, conversions: 22, position: 3.6 },
];

// AI Insights Data
const aiInsights = {
  googleAds: {
    title: "Google Ads Performance Analysis",
    overview: "Your brand search campaigns deliver highest ROAS (6.8x) with strong conversion rates. Performance Max is underperforming vs. dedicated Shopping campaigns — consider reducing PMax budget by 20% and reallocating to Shopping + Search. CPC trending down — good sign of improving Quality Scores.",
    details: [
      {
        finding: "Brand Search Excellence",
        impact: "High - Best performing campaign type",
        description: "Brand search campaigns achieve 6.8x ROAS with $2.00 CPC and 6.1% conversion rate. Position 1.2 for brand terms ensures dominance. Quality Score averaging 9.2/10 indicates strong ad relevance and landing page experience.",
        recommendation: "Maintain aggressive bidding on brand terms to protect against competitors. Consider expanding brand keyword variations and testing branded Shopping campaigns to capture high-intent brand searches with product imagery.",
      },
      {
        finding: "Performance Max Underperformance",
        impact: "Critical - Inefficient budget allocation",
        description: "PMax campaigns deliver 4.8x ROAS vs 5.2x for dedicated Shopping campaigns, despite 32% higher spend ($5.6K vs $4.3K). Asset group performance is inconsistent — 2 groups drive 78% of conversions while 4 groups underperform.",
        recommendation: "Reduce PMax budget by 20% ($1.1K). Pause bottom 2 asset groups. Reallocate saved budget to Shopping campaigns which show better product-level control and ROAS. Monitor for 2 weeks before further optimisation.",
      },
      {
        finding: "Quality Score Improvements",
        impact: "Positive - Lowering CPCs organically",
        description: "Average Quality Score improved from 7.8 to 8.4 over 30 days. CPC declined from $2.18 to $2.00 (8% reduction) without bid changes. Ad relevance and expected CTR components showing strongest gains.",
        recommendation: "Continue current optimisation strategy. Expand ad copy testing to maintain relevance improvements. Add 3-5 new responsive search ad variations per ad group to further boost expected CTR scores.",
      },
    ],
    recommendations: [
      "Reduce Performance Max budget by $1.1K, reallocate to Shopping campaigns",
      "Pause bottom 2 PMax asset groups, focus budget on top performers",
      "Maintain aggressive brand term bidding to protect market position",
      "Add 15+ new responsive search ad variations to improve Quality Scores",
      "Test branded Shopping campaigns to capture visual brand searches",
    ],
  },
  optimisation: {
    title: "Campaign Optimisation Opportunities",
    overview: "'Silk midi dress' keyword shows strong volume (18K impressions) but position 3.2. Increase bids by 15% to target position 1.5-2.0. Expected impact: +24 conversions/month. Also recommend adding negative keywords: 'cheap', 'affordable', 'discount' to improve audience quality.",
    details: [
      {
        finding: "High-Volume Keyword Position Gap",
        impact: "High - $3.2K monthly revenue opportunity",
        description: "Keywords in positions 2.5-4.0 have 18% lower CTR than positions 1.0-2.0. 'Silk midi dress' (18K monthly impressions, position 3.2) and 'luxury women's clothing' (24.8K impressions, position 2.4) are underperforming due to position.",
        recommendation: "Increase bids on these 2 keywords by 15-20% to improve to position 1.5-2.0. Estimated impact: +24 conversions/month (+$3.2K revenue). Monitor for 7 days, adjust if positions overshoot to 1.0 (diminishing returns).",
      },
      {
        finding: "Negative Keyword Gaps",
        impact: "Medium - Reducing wasted spend by $840/month",
        description: "Search term report shows 124 clicks on 'cheap silk dress', 'affordable women's clothing', 'discount fashion' with 0 conversions. These terms drive high volume (2.8K impressions) but wrong audience intent, wasting $620/month.",
        recommendation: "Add negative keywords: 'cheap', 'affordable', 'discount', 'budget', 'sale', 'clearance' at campaign level. Expected savings: $840/month in wasted clicks. Reallocate saved budget to high-intent category terms.",
      },
      {
        finding: "Display Retargeting Efficiency",
        impact: "Medium - Lower CPC but conversion opportunity",
        description: "Display retargeting has excellent $0.50 CPC (75% lower than Search) but only 3.2x ROAS vs 6.8x for Search. Frequency capping at 5 impressions/week may be too aggressive — users seeing ads but not converting due to insufficient touchpoints.",
        recommendation: "Test frequency cap increase to 8-10 impressions/week for cart abandoners segment. Add sequential messaging: days 1-3 product reminder, days 4-7 social proof, days 8+ discount offer. Expected ROAS lift to 4.2x.",
      },
    ],
    recommendations: [
      "Increase bids 15% on 'silk midi dress' and 'luxury women's clothing' keywords",
      "Add negative keyword list: cheap, affordable, discount, budget, sale, clearance",
      "Increase display frequency cap from 5 to 8-10 impressions for cart abandoners",
      "Implement sequential display messaging with discount escalation",
      "Reallocate $840 saved from negative keywords to high-intent category terms",
    ],
  },
};

// Insight Modal Component
function InsightModal({ show, onClose, insight, icon, color }: {
  show: boolean;
  onClose: () => void;
  insight: {
    title: string;
    overview: string;
    details: Array<{
      finding: string;
      impact: string;
      description: string;
      recommendation: string;
    }>;
    recommendations: string[];
  };
  icon: React.ReactNode;
  color: string;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-lg)] max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
              {icon}
            </div>
            <div>
              <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                {insight.title}
              </h2>
              <p className="text-[13px] text-[var(--text-secondary)]">Google Ads Performance Analysis</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Overview */}
          <div>
            <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
              Overview
            </h3>
            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
              {insight.overview}
            </p>
          </div>

          {/* Detailed Findings */}
          <div>
            <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
              Detailed Findings
            </h3>
            <div className="space-y-4">
              {insight.details.map((detail, idx) => (
                <div key={idx} className="p-4 border border-[var(--border-color)] rounded-[var(--radius-lg)]">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">{detail.finding}</h4>
                    <Tag variant={detail.impact.startsWith("Critical") || detail.impact.startsWith("High") ? "pink" : detail.impact.startsWith("Medium") ? "terra" : detail.impact.startsWith("Positive") ? "green" : "buff"}>
                      {detail.impact}
                    </Tag>
                  </div>
                  <div className="mb-3">
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      Analysis
                    </div>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{detail.description}</p>
                  </div>
                  <div className="p-3 rounded-[var(--radius-sm)]" style={{ backgroundColor: `${color}20` }}>
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      Recommendation
                    </div>
                    <p className="text-[13px]" style={{ color }}>{detail.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Plan */}
          <div className="p-5 rounded-[var(--radius-lg)] border-l-4" style={{ backgroundColor: `${color}20`, borderColor: color }}>
            <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
              <Sparkles className="w-4 h-4" />
              AI-Recommended Action Plan
            </h3>
            <ul className="space-y-2">
              {insight.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13px] leading-relaxed" style={{ color }}>
                  <span className="mt-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GoogleAds() {
  const { getMultiplier, dateRange } = useFilters();
  const multiplier = getMultiplier();
  const [productType, setProductType] = useState<string>("all");
  const [showGoogleAdsInsight, setShowGoogleAdsInsight] = useState(false);
  const [showOptimizationInsight, setShowOptimizationInsight] = useState(false);
  const [showSilverBulletModal, setShowSilverBulletModal] = useState(false);
  const [showLowHangingFruitModal, setShowLowHangingFruitModal] = useState(false);

  const productTypes = [
    { value: "all", label: "All Products" },
    { value: "Shopping", label: "Google Shopping" },
    { value: "Search", label: "Search Ads" },
    { value: "PMax", label: "Performance Max" },
    { value: "Display", label: "Display Ads" },
  ];

  const filteredCampaigns = useMemo(() => {
    if (productType === "all") return baseCampaignData;
    return baseCampaignData.filter(campaign => campaign.type === productType);
  }, [productType]);

  const metrics = useMemo(() => {
    const campaigns = productType === "all" ? baseCampaignData : filteredCampaigns;
    const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const avgRoas = campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length;
    const avgCpc = campaigns.reduce((sum, c) => sum + c.cpc, 0) / campaigns.length;

    return {
      totalSpend: Math.round(totalSpend * multiplier),
      roas: (avgRoas * (0.9 + multiplier * 0.1)).toFixed(1),
      conversions: Math.round(totalConversions * multiplier),
      avgCpc: (avgCpc * (1.1 - multiplier * 0.1)).toFixed(2),
    };
  }, [multiplier, productType, filteredCampaigns]);

  const campaignData = useMemo(() => {
    return filteredCampaigns.map(item => ({
      ...item,
      spend: Math.round(item.spend * multiplier),
      clicks: Math.round(item.clicks * multiplier),
      conversions: Math.round(item.conversions * multiplier),
    }));
  }, [multiplier, filteredCampaigns]);

  const performanceTrend = useMemo(() => {
    return basePerformanceTrend.map(item => ({
      ...item,
      spend: Math.round(item.spend * multiplier),
      revenue: Math.round(item.revenue * multiplier),
      clicks: Math.round(item.clicks * multiplier),
      conversions: Math.round(item.conversions * multiplier),
    }));
  }, [multiplier]);

  const dateRangeLabels: Record<string, string> = {
    today: "Today",
    "7d": "Last 7 Days",
    "30d": "Last 30 Days",
    "90d": "Last 90 Days",
    mtd: "Month to Date",
    ytd: "Year to Date",
    custom: "Custom",
  };

  // Action Strip Data
  const actionStripData: ActionStripData = {
    silverBullet: {
      action: "Shift budget from Display ($2.1K) to Shopping campaigns (5.2x ROAS)",
      impactLine: "Estimated: +$8,400 at Shopping's proven conversion rate",
      channel: "Google Shopping · Budget Reallocation"
    },
    lowHangingFruit: {
      action: "Pause underperforming Search keywords with CPC > $1.50",
      effortChip: "Easy · 1 day",
      impact: "Save $840/month · Reallocate to high-performers",
      channelChip: "Search Ads · Quick Win"
    },
    frameworkTasks: [
      { task: "Performance Max campaign expansion", status: "In Progress" },
      { task: "Shopping feed optimisation", status: "Planned" },
      { task: "Brand keyword protection audit", status: "On Track" }
    ]
  };

  const silverBulletBrief: DetailedBriefData = {
    title: "Display to Shopping Budget Reallocation",
    category: "Silver Bullet · Budget Optimization",
    overview: "Reallocate $2,100 from underperforming Display (3.2x ROAS) to Shopping (5.2x ROAS) for +$8,400 incremental revenue.",
    goals: ["Shift $2,100 Display budget to Shopping", "Generate +$8,400 incremental revenue", "Improve blended ROAS 5.1x to 5.6x", "Validate Shopping as primary channel"],
    detailedBrief: { challenge: "Display showing diminishing returns at 3.2x ROAS. Shopping outperforming at 5.2x ROAS with room to scale.", approach: "Week 1: Reduce Display $70→$35 daily. Week 2: Increase Shopping budget, monitor CPC. Week 3: Complete reallocation if performance stable.", timeline: "3-week phased rollout", budget: "$2,100 reallocation (zero incremental)" },
    nextSteps: [{ step: "Reduce Display Budget", description: "Cut Display daily budget 50%, monitor performance stability.", owner: "Paid Search Manager" }, { step: "Scale Shopping Campaigns", description: "Increase Shopping budget, expand product groups, monitor ROAS.", owner: "E-commerce Lead" }],
    potentialOutcomes: { bestCase: "+$12,200 revenue at 5.8x ROAS", expected: "+$8,400 revenue, ROAS 5.1x→5.6x", metrics: ["Shopping ROAS", "Display impact", "Blended CAC", "Revenue delta"] }
  };

  const lowHangingFruitBrief: DetailedBriefData = {
    title: "Underperforming Search Keyword Elimination",
    category: "Low Hanging Fruit · Waste Reduction",
    overview: "Pause 38 keywords with CPC >$1.50 and CVR <2.5% to save $840/month and reallocate to high-performers.",
    goals: ["Pause 38 wasteful keywords", "Save $840/month ad spend", "Improve Search ROAS 5.4x to 6.2x", "Build negative keyword list"],
    detailedBrief: { challenge: "Keywords with 'cheap', 'affordable', 'discount' attract low-intent traffic at high CPC. $840/month wasted on 1.9% CVR vs 5.6% average.", approach: "Audit last 60 days, pause keywords CPC >$1.50 AND CVR <2.5%. Add negative keyword list. Reallocate budget to brand/product keywords.", timeline: "1-day implementation", budget: "$840 savings reallocated" },
    nextSteps: [{ step: "Audit & Pause Keywords", description: "Identify 38 underperformers, pause immediately, track impact.", owner: "Paid Search Analyst" }, { step: "Build Negative List", description: "Create negative keyword list: cheap, affordable, discount, budget, etc.", owner: "Search Strategy Lead" }],
    potentialOutcomes: { bestCase: "$840 savings + $3,200 incremental from reallocation", expected: "$840 waste eliminated, Search ROAS 5.4x→6.2x", metrics: ["Monthly spend reduction", "Search ROAS improvement", "Impression share gains"] }
  };

  return (
    <div>
      <PageHeader
        label="Channels · Google Ads"
        title="Google Ads Intelligence"
        description="Search, Shopping, Performance Max, and Display campaign performance. Keyword analysis, ROAS tracking, and campaign optimisation managed by Salt & FuseLab."
        backgroundGradient="terra"
        externalLinks={[
          { name: "Google Ads", url: "https://ads.google.com" },
          { name: "Google Analytics", url: "https://analytics.google.com" },
        ]}
        stats={[
          { label: "Total Spend", value: `$${(metrics.totalSpend / 1000).toFixed(1)}K` },
          { label: "ROAS", value: `${metrics.roas}x` },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        {/* AI Widget */}
        <AIWidget
          insightLabel="Google Ads Optimisation"
          insightText="Shopping campaigns delivering 5.2x ROAS vs Display at 2.8x. Brand keyword CPC rising 18% (now $1.12 avg). Recommendation: reallocate $2.1K from Display to Shopping, pause keywords with CPC > $1.50, expand Performance Max."
        />

        <FilterBar showChannel={false} />

        {/* Google Product Type Toggle */}
        <div className="flex flex-col gap-2">
          <div
            className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-tertiary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Google Product
          </div>
          <div className="flex flex-wrap gap-2">
            {productTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setProductType(type.value)}
                className={`px-4 py-2 text-[12.5px] rounded-[var(--radius-sm)] transition-colors cursor-pointer ${
                  productType === type.value
                    ? "bg-[var(--terra)] text-white border border-[var(--terra)]"
                    : "bg-white text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--border-strong)]"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

      <StatGrid columns={4}>
        <MetricCard
          label="Total Ad Spend"
          value={`$${metrics.totalSpend.toLocaleString()}`}
          change="+8.4%"
          changeType="neutral"
          trend="up"
        />
        <MetricCard
          label="Blended ROAS"
          value={`${metrics.roas}x`}
          change="+0.3x"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="Conversions"
          value={metrics.conversions.toString()}
          change="+12.8%"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="Avg CPC"
          value={`$${metrics.avgCpc}`}
          change="-$0.18"
          changeType="positive"
          trend="down"
        />
      </StatGrid>

      {/* AI Insights */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[var(--terra)]" />
            <CardTitle>AI Google Ads Insight</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
            Your brand search campaigns deliver highest ROAS (6.8x) with strong conversion rates. Performance Max is underperforming vs. dedicated Shopping campaigns — consider reducing PMax budget by 20% and reallocating to Shopping + Search. CPC trending down — good sign of improving Quality Scores.
          </p>
          <button
            onClick={() => setShowGoogleAdsInsight(true)}
            className="w-full px-4 py-2 bg-[var(--terra)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Deep Dive: Google Ads Strategy
          </button>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[var(--green)]" />
            <CardTitle>Optimisation Opportunity</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
            "Silk midi dress" keyword shows strong volume (18K impressions) but position 3.2. Increase bids by 15% to target position 1.5-2.0. Expected impact: +24 conversions/month. Also recommend adding negative keywords: "cheap", "affordable", "discount" to improve audience quality.
          </p>
          <button
            onClick={() => setShowOptimizationInsight(true)}
            className="w-full px-4 py-2 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Deep Dive: Optimisation Plan
          </button>
        </Card>
      </div>

      {/* Shopping-Specific Widgets */}
      {productType === "Shopping" && (
        <>
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-5 h-5 text-[var(--green)]" />
                <CardTitle>Product Performance by Category</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Shopping campaign breakdown — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-3">
                {[
                  { category: "Dresses", spend: 1840, revenue: 9568, conversions: 52, roas: 5.2, impressions: 18200 },
                  { category: "Tops & Blouses", spend: 1260, revenue: 6048, conversions: 38, roas: 4.8, impressions: 14600 },
                  { category: "Bottoms", spend: 840, revenue: 3780, conversions: 24, roas: 4.5, impressions: 9400 },
                  { category: "Outerwear", spend: 340, revenue: 2040, conversions: 14, roas: 6.0, impressions: 4200 },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[14px] font-medium text-[var(--text-primary)]">{item.category}</span>
                      <Tag variant={item.roas >= 5.0 ? "green" : item.roas >= 4.5 ? "buff" : "terra"}>
                        {item.roas}x ROAS
                      </Tag>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-[11px]">
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Spend</div>
                        <div className="font-medium text-[var(--text-primary)]">${Math.round(item.spend * multiplier).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Revenue</div>
                        <div className="font-medium text-[var(--green)]">${Math.round(item.revenue * multiplier).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Conv</div>
                        <div className="font-medium text-[var(--text-primary)]">{Math.round(item.conversions * multiplier)}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Impr</div>
                        <div className="font-medium text-[var(--text-primary)]">{(item.impressions * multiplier / 1000).toFixed(1)}K</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-[var(--green)]" />
                <CardTitle>Shopping Feed Health</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Merchant Center status & optimisation — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-4">
                <div className="p-4 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--green)]" />
                      <span className="text-[13px] font-semibold text-[var(--green)]">Active Products</span>
                    </div>
                    <span className="text-[16px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>1,247</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">All products approved and serving</p>
                </div>

                <div className="p-4 bg-[var(--buff)] rounded-[var(--radius-md)]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[var(--buff-dark)]" />
                      <span className="text-[13px] font-semibold text-[var(--buff-dark)]">Missing Data</span>
                    </div>
                    <span className="text-[16px] font-semibold text-[var(--buff-dark)]" style={{ fontFamily: "var(--font-serif)" }}>24</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">Products missing GTIN or brand attributes</p>
                </div>

                <div className="p-4 bg-white border border-[var(--border-color)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] font-semibold text-[var(--text-primary)] mb-3">Feed Quality Score</div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-[28px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>94%</span>
                    <span className="text-[13px] text-[var(--text-secondary)] mb-1">Excellent</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--green)]" style={{ width: "94%" }}></div>
                  </div>
                </div>

                <div className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] font-semibold text-[var(--text-primary)] mb-2">Optimisation Opportunities</div>
                  <ul className="space-y-1 text-[11px] text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--green)] mt-0.5">•</span>
                      <span>Add custom labels for seasonal products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--green)] mt-0.5">•</span>
                      <span>Enhance product descriptions with keywords</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--green)] mt-0.5">•</span>
                      <span>Add lifestyle images for top products</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[var(--buff-dark)]" />
                <CardTitle>Product Price Competitiveness</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Benchmark pricing analysis — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-3">
                {[
                  { product: "Silk Midi Dress - Spring Collection", yourPrice: 186, avgCompPrice: 198, benchmark: "Below Avg", performance: "excellent", impressionShare: "82%" },
                  { product: "Sustainable Cotton Blouse", yourPrice: 89, avgCompPrice: 85, benchmark: "Above Avg", performance: "good", impressionShare: "64%" },
                  { product: "Linen Wide Leg Pants", yourPrice: 124, avgCompPrice: 118, benchmark: "At Market", performance: "good", impressionShare: "71%" },
                  { product: "Wool Blend Overcoat", yourPrice: 298, avgCompPrice: 275, benchmark: "Above Avg", performance: "fair", impressionShare: "58%" },
                ].map((item, index) => (
                  <div key={index} className="p-3 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-[12px] font-medium text-[var(--text-primary)] mb-1 line-clamp-1">{item.product}</div>
                        <div className="flex items-center gap-3 text-[11px]">
                          <div>
                            <span className="text-[var(--text-tertiary)]">Your Price: </span>
                            <span className="font-medium text-[var(--text-primary)]">${item.yourPrice}</span>
                          </div>
                          <div>
                            <span className="text-[var(--text-tertiary)]">Avg: </span>
                            <span className="font-medium text-[var(--text-secondary)]">${item.avgCompPrice}</span>
                          </div>
                        </div>
                      </div>
                      <Tag variant={item.benchmark === "Below Avg" ? "green" : item.benchmark === "At Market" ? "buff" : "terra"}>
                        {item.benchmark}
                      </Tag>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[var(--text-tertiary)]">Impression Share: {item.impressionShare}</span>
                      <span className={`font-medium ${item.performance === 'excellent' ? 'text-[var(--green)]' : item.performance === 'good' ? 'text-[var(--buff-dark)]' : 'text-[var(--terra)]'}`}>
                        {item.performance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-[var(--pink)]" />
                <CardTitle>Merchant Center Alerts</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Product disapprovals & warnings — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-4">
                <div className="p-4 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-[var(--green)]" />
                    <span className="text-[13px] font-semibold text-[var(--green)]">Feed Sync Status</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">Last sync: 2 hours ago • Next: In 22 hours</p>
                </div>

                <div className="p-4 bg-[var(--buff)] rounded-[var(--radius-md)]">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-[var(--buff-dark)]" />
                    <span className="text-[13px] font-semibold text-[var(--buff-dark)]">Image Quality Warnings</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mb-2">8 products with image quality warnings</p>
                  <div className="text-[10px] text-[var(--text-tertiary)]">
                    Images below 800x800px resolution. Update to improve ad quality.
                  </div>
                </div>

                <div className="p-4 bg-white border border-[var(--border-color)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] font-semibold text-[var(--text-primary)] mb-2">Recent Actions</div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--green)] mt-1.5"></div>
                      <div className="flex-1">
                        <div className="text-[var(--text-primary)]">Fixed 12 missing GTIN errors</div>
                        <div className="text-[var(--text-tertiary)]">2 days ago</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--green)] mt-1.5"></div>
                      <div className="flex-1">
                        <div className="text-[var(--text-primary)]">Added brand attributes to 38 products</div>
                        <div className="text-[var(--text-tertiary)]">5 days ago</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--buff-dark)] mt-1.5"></div>
                      <div className="flex-1">
                        <div className="text-[var(--text-primary)]">Updated 24 product titles</div>
                        <div className="text-[var(--text-tertiary)]">1 week ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Search-Specific Widgets */}
      {productType === "Search" && (
        <>
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-[var(--pink)]" />
                <CardTitle>Top Converting Keywords</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Highest value search terms — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-3">
                {[
                  { keyword: "femme connection", conversions: 42, convRate: "8.4%", cpa: 28, roas: 6.8, matchType: "Exact" },
                  { keyword: "sustainable fashion women", conversions: 28, convRate: "6.2%", cpa: 38, roas: 5.4, matchType: "Phrase" },
                  { keyword: "silk midi dress", conversions: 38, convRate: "5.8%", cpa: 32, roas: 5.8, matchType: "Phrase" },
                  { keyword: "luxury women's clothing", conversions: 48, convRate: "5.2%", cpa: 42, roas: 4.6, matchType: "Broad" },
                  { keyword: "ethical fashion brand", conversions: 22, convRate: "7.1%", cpa: 34, roas: 5.2, matchType: "Phrase" },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-medium text-[var(--text-primary)]">{item.keyword}</span>
                      <Tag variant={item.matchType === "Exact" ? "green" : item.matchType === "Phrase" ? "buff" : "terra"}>
                        {item.matchType}
                      </Tag>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-[11px]">
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Conv</div>
                        <div className="font-medium text-[var(--text-primary)]">{Math.round(item.conversions * multiplier)}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Conv Rate</div>
                        <div className="font-medium text-[var(--green)]">{item.convRate}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">CPA</div>
                        <div className="font-medium text-[var(--text-primary)]">${item.cpa}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">ROAS</div>
                        <div className="font-medium text-[var(--green)]">{item.roas}x</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-[var(--green)]" />
                <CardTitle>Branded vs Non-Branded</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Campaign performance split — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-4">
                <div className="p-4 bg-[var(--green-light)] rounded-[var(--radius-lg)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[var(--green)]" />
                      <span className="text-[15px] font-semibold text-[var(--green)]">Branded Search</span>
                    </div>
                    <Tag variant="green">6.8x ROAS</Tag>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Spend</div>
                      <div className="text-[15px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                        ${Math.round(2840 * multiplier).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Conversions</div>
                      <div className="text-[15px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {Math.round(86 * multiplier)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Conv Rate</div>
                      <div className="text-[15px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                        6.1%
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded-[var(--radius-sm)] text-[10px] text-[var(--text-secondary)]">
                    <strong>Performance:</strong> Excellent brand protection with low CPC ($2.00) and high conversion rates
                  </div>
                </div>

                <div className="p-4 bg-[var(--buff)] rounded-[var(--radius-lg)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[var(--buff-dark)]" />
                      <span className="text-[15px] font-semibold text-[var(--buff-dark)]">Non-Branded Search</span>
                    </div>
                    <Tag variant="buff">5.1x ROAS</Tag>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Spend</div>
                      <div className="text-[15px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                        ${Math.round(3180 * multiplier).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Conversions</div>
                      <div className="text-[15px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {Math.round(94 * multiplier)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Conv Rate</div>
                      <div className="text-[15px] font-semibold text-[var(--buff-dark)]" style={{ fontFamily: "var(--font-serif)" }}>
                        5.6%
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded-[var(--radius-sm)] text-[10px] text-[var(--text-secondary)]">
                    <strong>Opportunity:</strong> Category keywords driving good volume. Test position improvements on top terms
                  </div>
                </div>

                <div className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] font-semibold text-[var(--text-primary)] mb-2">Strategy Insights</div>
                  <ul className="space-y-1 text-[11px] text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--green)] mt-0.5">•</span>
                      <span>Branded search protects 47% of total search revenue at 25% lower CPA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--buff-dark)] mt-0.5">•</span>
                      <span>Non-branded campaigns scale well — increase budget to capture more category traffic</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[var(--terra)]" />
                <CardTitle>Geographic Performance</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Top performing regions — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-3">
                {[
                  { location: "New York, NY", spend: 1240, conversions: 64, roas: 6.2, convRate: "7.8%" },
                  { location: "Los Angeles, CA", spend: 1080, conversions: 52, roas: 5.8, convRate: "6.4%" },
                  { location: "San Francisco, CA", spend: 940, conversions: 48, roas: 5.4, convRate: "6.1%" },
                  { location: "Chicago, IL", spend: 720, conversions: 34, roas: 5.1, convRate: "5.8%" },
                  { location: "Miami, FL", spend: 620, conversions: 28, roas: 4.8, convRate: "5.2%" },
                  { location: "Seattle, WA", spend: 520, conversions: 24, roas: 5.6, convRate: "6.6%" },
                ].map((item, index) => (
                  <div key={index} className="p-3 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-medium text-[var(--text-primary)]">{item.location}</span>
                      <Tag variant={item.roas >= 6.0 ? "green" : item.roas >= 5.5 ? "buff" : "terra"}>
                        {item.roas}x ROAS
                      </Tag>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-[11px]">
                      <div>
                        <span className="text-[var(--text-tertiary)]">Spend: </span>
                        <span className="font-medium text-[var(--text-primary)]">${Math.round(item.spend * multiplier).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[var(--text-tertiary)]">Conv: </span>
                        <span className="font-medium text-[var(--text-primary)]">{Math.round(item.conversions * multiplier)}</span>
                      </div>
                      <div>
                        <span className="text-[var(--text-tertiary)]">Rate: </span>
                        <span className="font-medium text-[var(--green)]">{item.convRate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[var(--buff-dark)]" />
                <CardTitle>Search Query Intent Analysis</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">User intent categorization — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-4">
                {[
                  { intent: "High Intent (Buy Now)", queries: 84, convRate: "8.2%", avgCpa: 28, share: "32%", color: "green" },
                  { intent: "Mid Intent (Research)", queries: 126, convRate: "5.4%", avgCpa: 38, share: "48%", color: "buff" },
                  { intent: "Low Intent (Browse)", queries: 52, convRate: "2.8%", avgCpa: 62, share: "20%", color: "terra" },
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-[var(--radius-lg)]" style={{ backgroundColor: `var(--${item.color}-light)` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[14px] font-semibold" style={{ color: `var(--${item.color})` }}>{item.intent}</span>
                      <Tag variant={item.color as any}>{item.share} of traffic</Tag>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-[11px] mb-3">
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Queries</div>
                        <div className="font-medium text-[var(--text-primary)]">{Math.round(item.queries * multiplier)}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Conv Rate</div>
                        <div className="font-medium" style={{ color: `var(--${item.color})` }}>{item.convRate}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Avg CPA</div>
                        <div className="font-medium text-[var(--text-primary)]">${item.avgCpa}</div>
                      </div>
                    </div>
                    <div className="p-2 bg-white rounded-[var(--radius-sm)] text-[10px] text-[var(--text-secondary)]">
                      {index === 0 && <span><strong>Action:</strong> Increase bids on buy-intent queries ("buy", "purchase", "shop")</span>}
                      {index === 1 && <span><strong>Action:</strong> Add remarketing lists to research queries for follow-up</span>}
                      {index === 2 && <span><strong>Action:</strong> Consider pausing low-intent queries or moving to lower bid strategy</span>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Performance Max-Specific Widgets */}
      {productType === "PMax" && (
        <>
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-[var(--terra)]" />
                <CardTitle>Asset Group Performance</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Individual asset group results — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-3">
                {[
                  { name: "Spring Dresses", spend: 1420, conversions: 68, roas: 6.2, status: "excellent", budgetUtil: "98%" },
                  { name: "Sustainable Collection", spend: 1280, conversions: 54, roas: 5.8, status: "good", budgetUtil: "94%" },
                  { name: "Luxury Outerwear", spend: 980, conversions: 12, roas: 2.8, status: "poor", budgetUtil: "86%" },
                  { name: "Tops & Blouses", spend: 840, conversions: 6, roas: 1.8, status: "poor", budgetUtil: "72%" },
                  { name: "Seasonal Basics", spend: 680, conversions: 2, roas: 1.2, status: "poor", budgetUtil: "54%" },
                  { name: "Premium Accessories", spend: 420, conversions: 0, roas: 0.0, status: "paused", budgetUtil: "12%" },
                ].map((item, index) => (
                  <div key={index} className="p-3 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-medium text-[var(--text-primary)]">{item.name}</span>
                        {item.status === "excellent" && <CheckCircle className="w-4 h-4 text-[var(--green)]" />}
                        {item.status === "poor" && <AlertCircle className="w-4 h-4 text-[var(--terra)]" />}
                        {item.status === "paused" && <TrendingDown className="w-4 h-4 text-[var(--pink)]" />}
                      </div>
                      <Tag variant={
                        item.status === "excellent" ? "green" :
                        item.status === "good" ? "buff" :
                        item.status === "poor" ? "terra" : "pink"
                      }>
                        {item.roas}x ROAS
                      </Tag>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-[10px]">
                      <div>
                        <span className="text-[var(--text-tertiary)]">Spend: </span>
                        <span className="font-medium text-[var(--text-primary)]">${Math.round(item.spend * multiplier).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[var(--text-tertiary)]">Conv: </span>
                        <span className="font-medium text-[var(--text-primary)]">{Math.round(item.conversions * multiplier)}</span>
                      </div>
                      <div>
                        <span className="text-[var(--text-tertiary)]">Budget: </span>
                        <span className="font-medium text-[var(--text-primary)]">{item.budgetUtil}</span>
                      </div>
                      <div>
                        <span className="font-medium" style={{
                          color: item.status === 'excellent' ? 'var(--green)' :
                                 item.status === 'good' ? 'var(--buff-dark)' :
                                 item.status === 'poor' ? 'var(--terra)' : 'var(--pink)'
                        }}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[var(--green)]" />
                <CardTitle>Creative Performance Analysis</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Asset effectiveness ratings — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-4">
                <div>
                  <div className="text-[11px] font-semibold text-[var(--text-primary)] mb-3">Headlines</div>
                  <div className="space-y-2">
                    {[
                      { text: "Sustainable Luxury Fashion for Modern Women", rating: "Best", impressions: 18400 },
                      { text: "Ethically Made, Beautifully Crafted", rating: "Good", impressions: 14200 },
                      { text: "Shop Femme Connection Spring Collection", rating: "Good", impressions: 12800 },
                      { text: "Premium Women's Clothing & Accessories", rating: "Low", impressions: 6400 },
                    ].map((item, index) => (
                      <div key={index} className="p-2 bg-[var(--surface)] rounded-[var(--radius-sm)] hover:bg-[var(--border-color)] transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] text-[var(--text-primary)] flex-1 line-clamp-1">{item.text}</span>
                          <Tag variant={item.rating === "Best" ? "green" : item.rating === "Good" ? "buff" : "terra"}>
                            {item.rating}
                          </Tag>
                        </div>
                        <div className="text-[10px] text-[var(--text-tertiary)]">{(item.impressions * multiplier / 1000).toFixed(1)}K impressions</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-[var(--text-primary)] mb-3">Images</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { type: "Lifestyle (Model)", rating: "Best", ctr: "4.2%" },
                      { type: "Product on White", rating: "Good", ctr: "3.8%" },
                      { type: "Editorial Flat Lay", rating: "Good", ctr: "3.4%" },
                      { type: "Detail Close-up", rating: "Low", ctr: "2.1%" },
                    ].map((item, index) => (
                      <div key={index} className="p-2 bg-[var(--surface)] rounded-[var(--radius-sm)]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-[var(--text-primary)]">{item.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Tag variant={item.rating === "Best" ? "green" : item.rating === "Good" ? "buff" : "terra"}>
                            {item.rating}
                          </Tag>
                          <span className="text-[10px] font-medium text-[var(--green)]">{item.ctr} CTR</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[var(--buff)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] font-semibold text-[var(--text-primary)] mb-2">Optimisation Actions</div>
                  <ul className="space-y-1 text-[10px] text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--green)] mt-0.5">•</span>
                      <span>Replace low-performing headline with sustainability messaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--green)] mt-0.5">•</span>
                      <span>Add more lifestyle images with models wearing products</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[var(--buff-dark)]" />
                <CardTitle>Audience Signals Performance</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Signal effectiveness analysis — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-3">
                {[
                  { signal: "Your Data - Past Purchasers", impressions: 24800, conversions: 84, roas: 7.2, status: "Strong Signal" },
                  { signal: "In-Market: Sustainable Fashion", impressions: 32400, conversions: 68, roas: 5.8, status: "Strong Signal" },
                  { signal: "Custom Intent: Luxury Clothing", impressions: 18600, conversions: 42, roas: 4.8, status: "Moderate" },
                  { signal: "Demographics: Women 25-44, High Income", impressions: 42200, conversions: 52, roas: 3.6, status: "Moderate" },
                  { signal: "Affinity: Fashion & Style Enthusiasts", impressions: 28400, conversions: 24, roas: 2.4, status: "Weak Signal" },
                ].map((item, index) => (
                  <div key={index} className="p-3 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[12px] font-medium text-[var(--text-primary)] flex-1">{item.signal}</span>
                      <Tag variant={
                        item.status === "Strong Signal" ? "green" :
                        item.status === "Moderate" ? "buff" : "terra"
                      }>
                        {item.status}
                      </Tag>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-[11px]">
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-0.5">Impressions</div>
                        <div className="font-medium text-[var(--text-primary)]">{(item.impressions * multiplier / 1000).toFixed(1)}K</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-0.5">Conv</div>
                        <div className="font-medium text-[var(--text-primary)]">{Math.round(item.conversions * multiplier)}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-0.5">ROAS</div>
                        <div className="font-medium text-[var(--green)]">{item.roas}x</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-5 h-5 text-[var(--pink)]" />
                <CardTitle>Product Feed Contribution</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Performance by product category — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={[
                      { category: "Dresses", contribution: 42, roas: 6.2 },
                      { category: "Tops", contribution: 28, roas: 4.8 },
                      { category: "Bottoms", contribution: 18, roas: 4.2 },
                      { category: "Outerwear", contribution: 8, roas: 2.8 },
                      { category: "Accessories", contribution: 4, roas: 1.8 },
                    ]}
                    id="pmax-product-feed-chart"
                  >
                    <CartesianGrid key="grid-feed" strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis key="xaxis-feed" dataKey="category" stroke="var(--text-tertiary)" style={{ fontSize: '10px' }} />
                    <YAxis key="yaxis-feed" stroke="var(--text-tertiary)" style={{ fontSize: '10px' }} />
                    <Tooltip
                      key="tooltip-feed"
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '11px'
                      }}
                    />
                    <Bar key="bar-contribution" dataKey="contribution" fill="var(--terra)" name="% Contribution" id="bar-contribution" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="space-y-2">
                  {[
                    { category: "Dresses", products: 284, topSku: "Spring Midi Dress - Silk", sales: 64 },
                    { category: "Tops & Blouses", products: 186, topSku: "Sustainable Cotton Blouse", sales: 38 },
                    { category: "Bottoms", products: 124, topSku: "Linen Wide Leg Pants", sales: 24 },
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[12px] font-medium text-[var(--text-primary)]">{item.category}</span>
                        <span className="text-[10px] text-[var(--text-tertiary)]">{item.products} products</span>
                      </div>
                      <div className="text-[10px] text-[var(--text-secondary)] mb-1">
                        <strong>Top SKU:</strong> {item.topSku}
                      </div>
                      <div className="text-[10px] text-[var(--green)]">
                        {Math.round(item.sales * multiplier)} conversions this period
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Display-Specific Widgets */}
      {productType === "Display" && (
        <>
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[var(--buff-dark)]" />
                <CardTitle>Placement Performance</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Top performing display placements — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-3">
                {[
                  { placement: "vogue.com", impressions: 84200, clicks: 1684, ctr: "2.0%", conversions: 28, roas: 4.2 },
                  { placement: "elle.com", impressions: 62400, clicks: 1248, ctr: "2.0%", conversions: 22, roas: 3.8 },
                  { placement: "instyle.com", impressions: 48600, clicks: 972, ctr: "2.0%", conversions: 18, roas: 3.6 },
                  { placement: "harpersbazaar.com", impressions: 38200, clicks: 764, ctr: "2.0%", conversions: 14, roas: 3.2 },
                  { placement: "whowhatwear.com", impressions: 28400, clicks: 568, ctr: "2.0%", conversions: 10, roas: 2.8 },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-medium text-[var(--text-primary)]">{item.placement}</span>
                      <Tag variant={item.roas >= 4.0 ? "green" : item.roas >= 3.5 ? "buff" : "terra"}>
                        {item.roas}x ROAS
                      </Tag>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-[11px]">
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Impr</div>
                        <div className="font-medium text-[var(--text-primary)]">{(item.impressions * multiplier / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">CTR</div>
                        <div className="font-medium text-[var(--green)]">{item.ctr}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Clicks</div>
                        <div className="font-medium text-[var(--text-primary)]">{Math.round(item.clicks * multiplier).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Conv</div>
                        <div className="font-medium text-[var(--text-primary)]">{Math.round(item.conversions * multiplier)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[var(--green)]" />
                <CardTitle>Creative Format Performance</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Ad format effectiveness — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-4">
                {[
                  { format: "Responsive Display Ads", impressions: 164200, ctr: "2.2%", conversions: 48, roas: 4.2, spend: 820 },
                  { format: "Image Ads (300x250)", impressions: 84600, ctr: "1.8%", conversions: 24, roas: 3.4, spend: 420 },
                  { format: "Image Ads (728x90)", impressions: 62400, ctr: "1.6%", conversions: 16, roas: 2.8, spend: 310 },
                  { format: "Native Ads", impressions: 42800, ctr: "2.4%", conversions: 12, roas: 3.6, spend: 210 },
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-[var(--radius-lg)]" style={{
                    backgroundColor: item.roas >= 4.0 ? 'var(--green-light)' : item.roas >= 3.5 ? 'var(--buff)' : 'var(--terra-light)'
                  }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[14px] font-semibold text-[var(--text-primary)]">{item.format}</span>
                      <Tag variant={item.roas >= 4.0 ? "green" : item.roas >= 3.5 ? "buff" : "terra"}>
                        {item.roas}x ROAS
                      </Tag>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-[11px] mb-2">
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Impressions</div>
                        <div className="font-medium text-[var(--text-primary)]">{(item.impressions * multiplier / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">CTR</div>
                        <div className="font-medium" style={{ color: item.roas >= 4.0 ? 'var(--green)' : 'var(--buff-dark)' }}>{item.ctr}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Conv</div>
                        <div className="font-medium text-[var(--text-primary)]">{Math.round(item.conversions * multiplier)}</div>
                      </div>
                      <div>
                        <div className="text-[var(--text-tertiary)] mb-1">Spend</div>
                        <div className="font-medium text-[var(--text-primary)]">${Math.round(item.spend * multiplier)}</div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] font-semibold text-[var(--text-primary)] mb-2">Format Insights</div>
                  <ul className="space-y-1 text-[11px] text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--green)] mt-0.5">•</span>
                      <span>Responsive Display Ads deliver highest ROAS — allocate 60% of budget</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--green)] mt-0.5">•</span>
                      <span>Native ads have best CTR (2.4%) — consider increasing investment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-[var(--pink)]" />
                <CardTitle>Remarketing Audience Performance</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Retargeting campaign results — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-3">
                {[
                  { audience: "Cart Abandoners (1-3 days)", users: 2840, conversions: 42, convRate: "12.4%", roas: 5.8, frequency: 4.2 },
                  { audience: "Product Page Viewers (7 days)", users: 4620, conversions: 38, convRate: "8.2%", roas: 4.6, frequency: 3.8 },
                  { audience: "Homepage Visitors (14 days)", users: 8420, conversions: 24, convRate: "2.8%", roas: 2.4, frequency: 2.4 },
                  { audience: "Past Purchasers (30 days)", users: 1240, conversions: 18, convRate: "14.5%", roas: 6.4, frequency: 5.2 },
                  { audience: "Email Subscribers (90 days)", users: 3680, conversions: 12, convRate: "3.3%", roas: 2.8, frequency: 2.8 },
                ].map((item, index) => (
                  <div key={index} className="p-3 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[12px] font-medium text-[var(--text-primary)] flex-1">{item.audience}</span>
                      <Tag variant={item.roas >= 5.0 ? "green" : item.roas >= 4.0 ? "buff" : "terra"}>
                        {item.roas}x ROAS
                      </Tag>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-[10px]">
                      <div>
                        <span className="text-[var(--text-tertiary)]">Users: </span>
                        <span className="font-medium text-[var(--text-primary)]">{(item.users * multiplier).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[var(--text-tertiary)]">Conv: </span>
                        <span className="font-medium text-[var(--text-primary)]">{Math.round(item.conversions * multiplier)}</span>
                      </div>
                      <div>
                        <span className="text-[var(--text-tertiary)]">Rate: </span>
                        <span className="font-medium text-[var(--green)]">{item.convRate}</span>
                      </div>
                      <div>
                        <span className="text-[var(--text-tertiary)]">Freq: </span>
                        <span className="font-medium text-[var(--text-primary)]">{item.frequency}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[var(--terra)]" />
                <CardTitle>Display Network Reach</CardTitle>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-6">Network distribution & performance — {dateRangeLabels[dateRange]}</p>

              <div className="space-y-4">
                <div className="p-4 bg-[var(--green-light)] rounded-[var(--radius-lg)]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] font-semibold text-[var(--green)]">Premium Publishers</span>
                    <Tag variant="green">4.2x ROAS</Tag>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Impressions</div>
                      <div className="text-[15px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {(248000 * multiplier / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Conversions</div>
                      <div className="text-[15px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {Math.round(38 * multiplier)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-1">CPM</div>
                      <div className="text-[15px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                        $12.40
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded-[var(--radius-sm)] text-[10px] text-[var(--text-secondary)]">
                    <strong>Sites:</strong> Vogue, Elle, Harper's Bazaar, InStyle, Who What Wear
                  </div>
                </div>

                <div className="p-4 bg-[var(--buff)] rounded-[var(--radius-lg)]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] font-semibold text-[var(--buff-dark)]">GDN Automatic Placements</span>
                    <Tag variant="buff">2.8x ROAS</Tag>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Impressions</div>
                      <div className="text-[15px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {(186000 * multiplier / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Conversions</div>
                      <div className="text-[15px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {Math.round(18 * multiplier)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-1">CPM</div>
                      <div className="text-[15px] font-semibold text-[var(--buff-dark)]" style={{ fontFamily: "var(--font-serif)" }}>
                        $6.80
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded-[var(--radius-sm)] text-[10px] text-[var(--text-secondary)]">
                    <strong>Strategy:</strong> Lower CPM but broader reach. Good for awareness, moderate for conversions
                  </div>
                </div>

                <div className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] font-semibold text-[var(--text-primary)] mb-2">Network Optimisation</div>
                  <ul className="space-y-1 text-[11px] text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--green)] mt-0.5">•</span>
                      <span>Increase budget for premium publishers by 40% — best ROAS and brand alignment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--buff-dark)] mt-0.5">•</span>
                      <span>Review automatic placements — exclude low-performing sites to improve efficiency</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-6">
        <ChartContainer
          title="Revenue vs. Spend"
          subtitle="4-week performance tracking"
          tag={{ label: "Performance", variant: "pink" }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrend} id="google-ads-revenue-chart">
              <CartesianGrid key="grid-revenue" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="xaxis-revenue" dataKey="week" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <YAxis key="yaxis-revenue" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <Tooltip
                key="tooltip-revenue"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}
              />
              <Legend key="legend-revenue" wrapperStyle={{ fontSize: '12px' }} />
              <Line key="line-revenue" type="monotone" dataKey="revenue" stroke="var(--pink)" strokeWidth={3} name="Revenue ($)" id="line-revenue" />
              <Line key="line-spend" type="monotone" dataKey="spend" stroke="var(--terra)" strokeWidth={3} name="Spend ($)" id="line-spend" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer
          title="Click & Conversion Trend"
          subtitle="Weekly performance metrics"
          tag={{ label: "Engagement", variant: "green" }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceTrend} id="google-ads-clicks-chart">
              <CartesianGrid key="grid-clicks" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="xaxis-clicks" dataKey="week" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <YAxis key="yaxis-clicks" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <Tooltip
                key="tooltip-clicks"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}
              />
              <Legend key="legend-clicks" wrapperStyle={{ fontSize: '12px' }} />
              <Bar key="bar-clicks" dataKey="clicks" fill="var(--green-mid)" name="Clicks" id="bar-clicks" />
              <Bar key="bar-conversions" dataKey="conversions" fill="var(--buff)" name="Conversions" id="bar-conversions" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <Card>
        <CardTitle>Campaign Performance</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Active campaigns — {dateRangeLabels[dateRange]}</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Campaign</th>
                <th className="text-center py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Type</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Spend</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Clicks</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>CPC</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Conv</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>ROAS</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((campaign, index) => (
                <tr key={index} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--surface)] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {campaign.type === "Search" && <Search className="w-4 h-4 text-[var(--pink)]" />}
                      {campaign.type === "Shopping" && <ShoppingBag className="w-4 h-4 text-[var(--green)]" />}
                      {campaign.type === "PMax" && <Target className="w-4 h-4 text-[var(--terra)]" />}
                      {campaign.type === "Display" && <TrendingUp className="w-4 h-4 text-[var(--buff-dark)]" />}
                      <span className="text-[14px] font-medium text-[var(--text-primary)]">{campaign.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Tag variant={
                      campaign.type === "Search" ? "pink" :
                      campaign.type === "Shopping" ? "green" :
                      campaign.type === "PMax" ? "terra" : "buff"
                    }>
                      {campaign.type}
                    </Tag>
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    ${campaign.spend.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    {campaign.clicks.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    ${campaign.cpc.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    {campaign.conversions}
                  </td>
                  <td className="py-3 px-4 text-right text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {campaign.roas.toFixed(1)}x
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardTitle>Top Search Terms</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Highest performing keywords — {dateRangeLabels[dateRange]}</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Search Term</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Impressions</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Clicks</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>CTR</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Conv</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Avg Pos</th>
              </tr>
            </thead>
            <tbody>
              {searchTerms.map((term, index) => (
                <tr key={index} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--surface)] transition-colors">
                  <td className="py-3 px-4 text-[14px] font-medium text-[var(--text-primary)]">
                    {term.term}
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    {(term.impressions * multiplier).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    {Math.round(term.clicks * multiplier)}
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    {term.ctr}%
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    {Math.round(term.conversions * multiplier)}
                  </td>
                  <td className="py-3 px-4 text-right text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {term.position}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Enhanced Performance Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--pink-light)] flex items-center justify-center">
                <Search className="w-5 h-5 text-[var(--pink)]" />
              </div>
              <CardTitle>Search Performance</CardTitle>
            </div>
            <CheckCircle className="w-5 h-5 text-[var(--green)]" />
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">{dateRangeLabels[dateRange]}</p>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Impressions</span>
              <span className="text-[15px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                {Math.round(284000 * multiplier).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Avg CTR</span>
              <span className="text-[15px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>4.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Quality Score</span>
              <span className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>8.4/10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Conversion Rate</span>
              <span className="text-[15px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>6.1%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Avg CPC</span>
              <span className="text-[15px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>$1.95</span>
            </div>
          </div>

          <div className="p-3 bg-[var(--green-light)] rounded-[var(--radius-md)] mb-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[var(--green)] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-semibold text-[var(--green)] mb-1">Excellent Performance</div>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Quality Score 8.4/10 is above benchmark. CTR and conversion rates strong. Maintain current strategy.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[var(--text-tertiary)]">
            <strong>Action:</strong> Continue quality score optimisation. Test new ad variations to maintain CTR.
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--green-light)] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[var(--green)]" />
              </div>
              <CardTitle>Shopping Campaigns</CardTitle>
            </div>
            <CheckCircle className="w-5 h-5 text-[var(--green)]" />
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">{dateRangeLabels[dateRange]}</p>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Product Views</span>
              <span className="text-[15px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                {Math.round(42800 * multiplier).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Add to Cart</span>
              <span className="text-[15px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                {Math.round(2840 * multiplier).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Cart-to-Conv</span>
              <span className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>48.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">ROAS</span>
              <span className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>5.2x</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Avg Order Value</span>
              <span className="text-[15px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>$186</span>
            </div>
          </div>

          <div className="p-3 bg-[var(--green-light)] rounded-[var(--radius-md)] mb-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[var(--green)] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-semibold text-[var(--green)] mb-1">Strong Performance</div>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Shopping ROAS (5.2x) outperforms PMax. Cart conversion rate excellent at 48.2%. Scale budget.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[var(--text-tertiary)]">
            <strong>Action:</strong> Increase Shopping budget by 20%. Add seasonal product groups for spring collection.
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--terra-light)] flex items-center justify-center">
                <Target className="w-5 h-5 text-[var(--terra)]" />
              </div>
              <CardTitle>Performance Max</CardTitle>
            </div>
            <AlertCircle className="w-5 h-5 text-[var(--terra)]" />
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">{dateRangeLabels[dateRange]}</p>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Asset Groups</span>
              <span className="text-[15px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Avg ROAS</span>
              <span className="text-[15px] font-medium text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>4.8x</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Budget Util</span>
              <span className="text-[15px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Top 2 Groups</span>
              <span className="text-[15px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>78% Conv</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Bottom 2 Groups</span>
              <span className="text-[15px] font-medium text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>2.1x ROAS</span>
            </div>
          </div>

          <div className="p-3 bg-[var(--terra-light)] rounded-[var(--radius-md)] mb-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[var(--terra)] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-semibold text-[var(--terra)] mb-1">Needs Optimisation</div>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  ROAS (4.8x) below Shopping (5.2x). Bottom asset groups dragging performance. Reduce budget.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[var(--text-tertiary)]">
            <strong>Action:</strong> Pause bottom 2 asset groups. Reduce PMax budget 20%, reallocate to Shopping campaigns.
          </div>
        </Card>
      </div>

      {/* Additional Campaign-Specific Widgets */}
      <div className="grid grid-cols-2 gap-6">
        {/* Keyword Position Analysis */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>Keyword Position Analysis</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Average position by keyword performance — {dateRangeLabels[dateRange]}</p>

          <div className="space-y-4">
            {[
              { range: "Position 1.0-1.5", keywords: 12, avgCtr: "8.2%", avgConv: "7.4%", status: "excellent" },
              { range: "Position 1.6-2.5", keywords: 18, avgCtr: "5.8%", avgConv: "6.1%", status: "good" },
              { range: "Position 2.6-4.0", keywords: 8, avgCtr: "3.2%", avgConv: "4.8%", status: "needs-attention" },
              { range: "Position 4.0+", keywords: 4, avgCtr: "1.8%", avgConv: "2.2%", status: "poor" },
            ].map((item, index) => (
              <div key={index} className="p-3 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-[var(--text-primary)]">{item.range}</span>
                    {item.status === "excellent" && <CheckCircle className="w-4 h-4 text-[var(--green)]" />}
                    {item.status === "needs-attention" && <AlertCircle className="w-4 h-4 text-[var(--terra)]" />}
                    {item.status === "poor" && <TrendingDown className="w-4 h-4 text-[var(--pink)]" />}
                  </div>
                  <Tag variant={
                    item.status === "excellent" ? "green" :
                    item.status === "good" ? "buff" :
                    item.status === "needs-attention" ? "terra" : "pink"
                  }>
                    {item.keywords} keywords
                  </Tag>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-[var(--text-tertiary)]">Avg CTR: </span>
                    <span className="font-medium text-[var(--text-primary)]">{item.avgCtr}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-tertiary)]">Avg Conv: </span>
                    <span className="font-medium text-[var(--text-primary)]">{item.avgConv}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Ad Copy Performance */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-[var(--green)]" />
            <CardTitle>Ad Copy Performance</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Top performing ad variations — {dateRangeLabels[dateRange]}</p>

          <div className="space-y-3">
            {[
              { headline: "Sustainable Fashion | Femme Connection", impressions: 42800, ctr: "8.4%", conversions: 124, roas: 6.2 },
              { headline: "Luxury Women's Clothing - Ethical & Chic", impressions: 38600, ctr: "7.2%", conversions: 96, roas: 5.8 },
              { headline: "Premium Silk Dresses | Free Shipping", impressions: 32400, ctr: "6.8%", conversions: 86, roas: 5.4 },
              { headline: "Femme Connection - Autumn Collection 2026", impressions: 28200, ctr: "5.2%", conversions: 64, roas: 4.8 },
            ].map((ad, index) => (
              <div key={index} className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors">
                <div className="text-[12px] font-medium text-[var(--text-primary)] mb-2 line-clamp-1">{ad.headline}</div>
                <div className="grid grid-cols-4 gap-2 text-[10px]">
                  <div>
                    <div className="text-[var(--text-tertiary)] mb-0.5">Impressions</div>
                    <div className="font-medium text-[var(--text-primary)]">{(ad.impressions * multiplier / 1000).toFixed(1)}K</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-tertiary)] mb-0.5">CTR</div>
                    <div className="font-medium text-[var(--green)]">{ad.ctr}</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-tertiary)] mb-0.5">Conv</div>
                    <div className="font-medium text-[var(--text-primary)]">{Math.round(ad.conversions * multiplier)}</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-tertiary)] mb-0.5">ROAS</div>
                    <div className="font-medium text-[var(--green)]">{ad.roas}x</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Device Performance & Audience Insights */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[var(--terra)]" />
            <CardTitle>Device Performance Breakdown</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Performance by device type — {dateRangeLabels[dateRange]}</p>

          <div className="space-y-4">
            {[
              { device: "Desktop", spend: 6840, conversions: 218, roas: 5.8, convRate: "8.2%", share: "40%" },
              { device: "Mobile", spend: 8420, conversions: 254, roas: 4.6, convRate: "5.4%", share: "49%" },
              { device: "Tablet", spend: 1880, conversions: 34, roas: 3.8, convRate: "4.2%", share: "11%" },
            ].map((device, index) => (
              <div key={index} className="p-4 bg-[var(--surface)] rounded-[var(--radius-lg)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-medium text-[var(--text-primary)]">{device.device}</span>
                    <Tag variant="buff">{device.share} traffic</Tag>
                  </div>
                  <span className="text-[16px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {device.roas}x ROAS
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-[11px]">
                  <div>
                    <div className="text-[var(--text-tertiary)] mb-1">Spend</div>
                    <div className="font-medium text-[var(--text-primary)]">${Math.round(device.spend * multiplier).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-tertiary)] mb-1">Conversions</div>
                    <div className="font-medium text-[var(--text-primary)]">{Math.round(device.conversions * multiplier)}</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-tertiary)] mb-1">Conv Rate</div>
                    <div className="font-medium text-[var(--green)]">{device.convRate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-[var(--buff)] rounded-[var(--radius-md)]">
            <div className="text-[11px] text-[var(--text-secondary)]">
              <strong>Insight:</strong> Desktop has highest ROAS (5.8x) but mobile drives most volume. Consider mobile bid adjustments to improve conv rate from 5.4% to 6.5% target.
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[var(--buff-dark)]" />
            <CardTitle>Audience Segment Performance</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">RLSA & Customer Match results — {dateRangeLabels[dateRange]}</p>

          <div className="space-y-3">
            {[
              { segment: "Past Purchasers", spend: 2140, conversions: 128, roas: 8.4, status: "excellent" },
              { segment: "Cart Abandoners", spend: 3280, conversions: 164, roas: 6.8, status: "good" },
              { segment: "Site Visitors (30d)", spend: 4820, conversions: 186, roas: 5.2, status: "good" },
              { segment: "Customer Match List", spend: 1640, conversions: 82, roas: 7.2, status: "excellent" },
              { segment: "Similar Audiences", spend: 2260, conversions: 68, roas: 3.8, status: "fair" },
            ].map((segment, index) => (
              <div key={index} className="p-3 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-medium text-[var(--text-primary)]">{segment.segment}</span>
                  <div className="flex items-center gap-2">
                    <Tag variant={
                      segment.status === "excellent" ? "green" :
                      segment.status === "good" ? "buff" : "terra"
                    }>
                      {segment.roas}x ROAS
                    </Tag>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <span className="text-[var(--text-tertiary)]">Spend: </span>
                    <span className="font-medium text-[var(--text-primary)]">${Math.round(segment.spend * multiplier).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-tertiary)]">Conv: </span>
                    <span className="font-medium text-[var(--text-primary)]">{Math.round(segment.conversions * multiplier)}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-tertiary)]">Status: </span>
                    <span className={`font-medium ${segment.status === 'excellent' ? 'text-[var(--green)]' : segment.status === 'good' ? 'text-[var(--buff-dark)]' : 'text-[var(--terra)]'}`}>
                      {segment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Budget Allocation & Negative Keywords */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[var(--green)]" />
            <CardTitle>Budget Allocation Recommendations</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Optimise spend across campaign types</p>

          <div className="space-y-4">
            <div className="p-4 bg-[var(--green-light)] rounded-[var(--radius-md)]">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-[var(--green)]" />
                <span className="text-[13px] font-semibold text-[var(--green)]">Increase Shopping Budget</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mb-2">
                Shopping campaigns deliver 5.2x ROAS, outperforming PMax (4.8x). Increase budget by $1,200/month.
              </p>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-[var(--text-tertiary)]">Current:</span>
                <span className="font-medium text-[var(--text-primary)]">$4,280</span>
                <span className="text-[var(--text-tertiary)]">→ Recommended:</span>
                <span className="font-medium text-[var(--green)]">$5,480</span>
              </div>
            </div>

            <div className="p-4 bg-[var(--terra-light)] rounded-[var(--radius-md)]">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-[var(--terra)]" />
                <span className="text-[13px] font-semibold text-[var(--terra)]">Reduce Performance Max</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mb-2">
                PMax underperforming with inconsistent asset groups. Reduce budget by 20% and reallocate.
              </p>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-[var(--text-tertiary)]">Current:</span>
                <span className="font-medium text-[var(--text-primary)]">$5,620</span>
                <span className="text-[var(--text-tertiary)]">→ Recommended:</span>
                <span className="font-medium text-[var(--terra)]">$4,496</span>
              </div>
            </div>

            <div className="p-4 bg-[var(--pink-light)] rounded-[var(--radius-md)]">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-[var(--pink)]" />
                <span className="text-[13px] font-semibold text-[var(--pink)]">Maintain Search Campaigns</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mb-2">
                Brand search delivers 6.8x ROAS with excellent Quality Scores. Maintain current spend levels.
              </p>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-[var(--text-tertiary)]">Current:</span>
                <span className="font-medium text-[var(--text-primary)]">$6,020</span>
                <span className="text-[var(--text-tertiary)]">→ Recommended:</span>
                <span className="font-medium text-[var(--pink)]">$6,020</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>Negative Keyword Opportunities</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Reduce wasted spend on low-intent searches</p>

          <div className="space-y-3 mb-6">
            {[
              { term: "cheap silk dress", clicks: 124, spend: 248, conversions: 0, waste: "$248" },
              { term: "affordable fashion", clicks: 96, spend: 192, conversions: 0, waste: "$192" },
              { term: "discount women's clothing", clicks: 84, spend: 168, conversions: 1, waste: "$150" },
              { term: "budget dresses", clicks: 62, spend: 124, conversions: 0, waste: "$124" },
              { term: "clearance sale", clicks: 48, spend: 96, conversions: 0, waste: "$96" },
            ].map((term, index) => (
              <div key={index} className="p-3 border border-[var(--pink-light)] bg-[var(--pink-light)] rounded-[var(--radius-md)]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-medium text-[var(--text-primary)]">"{term.term}"</span>
                  <Tag variant="pink">{term.waste} waste</Tag>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div>
                    <span className="text-[var(--text-tertiary)]">{Math.round(term.clicks * multiplier)} clicks</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-tertiary)]">${Math.round(term.spend * multiplier)} spend</span>
                  </div>
                  <div>
                    <span className="text-[var(--terra)]">{term.conversions} conv</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
            <div className="text-[11px] font-semibold text-[var(--text-primary)] mb-2">Recommended Negative Keywords:</div>
            <div className="flex flex-wrap gap-1.5">
              {["cheap", "affordable", "discount", "budget", "sale", "clearance", "wholesale", "replica"].map((keyword, index) => (
                <span key={index} className="px-2 py-1 bg-white border border-[var(--border-color)] rounded-[var(--radius-sm)] text-[10px] text-[var(--text-secondary)]">
                  {keyword}
                </span>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-[var(--text-secondary)]">
              <strong>Est. Monthly Savings:</strong> $840 • <strong>Action:</strong> Add to campaign-level negative keyword list
            </div>
          </div>
        </Card>

        {/* Action Strip */}
        <ActionStrip
          data={actionStripData}
          onSilverBulletClick={() => setShowSilverBulletModal(true)}
          onLowHangingFruitClick={() => setShowLowHangingFruitModal(true)}
        />
      </div>

      {/* Insight Modals */}
      <InsightModal
        show={showGoogleAdsInsight}
        onClose={() => setShowGoogleAdsInsight(false)}
        insight={aiInsights.googleAds}
        icon={<Target className="w-6 h-6 text-[var(--terra)]" />}
        color="var(--terra)"
      />
      <InsightModal
        show={showOptimizationInsight}
        onClose={() => setShowOptimizationInsight(false)}
        insight={aiInsights.optimisation}
        icon={<Sparkles className="w-6 h-6 text-[var(--green)]" />}
        color="var(--green)"
      />

      <DetailedBriefModal
        show={showSilverBulletModal}
        onClose={() => setShowSilverBulletModal(false)}
        data={silverBulletBrief}
      />

      <DetailedBriefModal
        show={showLowHangingFruitModal}
        onClose={() => setShowLowHangingFruitModal(false)}
        data={lowHangingFruitBrief}
      />
    </div>
    </div>
  );
}
