import React, { useState, useMemo } from "react";
import { Card, CardTitle, MetricCard, AIInsightCard, Tag } from "../components/ui/Card";
import { FilterBar, StatGrid, ChartContainer } from "../components/ui/Filters";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Mail, Smartphone, Zap, Users, TrendingUp, Target, Sparkles, X } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { AIWidget } from "../components/AIWidget";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import { DetailedBriefModal, DetailedBriefData } from "../components/DetailedBriefModal";
import { useFilters } from "../context/FilterContext";

const baseEmailPerformance = [
  { week: "Week 1", sent: 12400, opens: 3720, clicks: 892, revenue: 8420 },
  { week: "Week 2", sent: 13200, opens: 4092, clicks: 1056, revenue: 9840 },
  { week: "Week 3", sent: 12800, opens: 3968, clicks: 984, revenue: 9120 },
  { week: "Week 4", sent: 14600, opens: 4672, clicks: 1168, revenue: 11280 },
];

const baseFlowPerformance = [
  { name: "Welcome Series", emails: 3, sent: 2840, conv: 8.2, revenue: 12640 },
  { name: "Abandoned Cart", emails: 3, sent: 4820, conv: 12.4, revenue: 28420 },
  { name: "Post-Purchase", emails: 2, sent: 1960, conv: 6.8, revenue: 7240 },
  { name: "Browse Abandonment", emails: 2, sent: 3420, conv: 5.2, revenue: 9680 },
  { name: "Winback", emails: 3, sent: 1240, conv: 4.8, revenue: 5120 },
];

const baseSmsPerformance = [
  { week: "Week 1", sent: 2840, delivered: 2796, clicks: 486, revenue: 2420 },
  { week: "Week 2", sent: 3120, delivered: 3074, clicks: 542, revenue: 2680 },
  { week: "Week 3", sent: 2960, delivered: 2916, clicks: 512, revenue: 2540 },
  { week: "Week 4", sent: 3280, delivered: 3231, clicks: 596, revenue: 2980 },
];

const baseCampaignDetails = [
  { name: "Spring Sale Announcement", sent: 14280, opens: 4884, clicks: 1142, revenue: 4820, date: "Apr 24" },
  { name: "New Arrivals Drop", sent: 12640, opens: 3615, clicks: 886, revenue: 3240, date: "Apr 22" },
  { name: "Weekend Flash Sale", sent: 18420, opens: 7073, clicks: 1658, revenue: 6840, date: "Apr 20" },
  { name: "VIP Early Access", sent: 2840, opens: 1136, clicks: 312, revenue: 2680, date: "Apr 18" },
  { name: "Easter Collection Preview", sent: 16820, opens: 5717, clicks: 1346, revenue: 5420, date: "Apr 15" },
];

const baseListGrowth = [
  { source: "Website Popup", subscribers: 842, percentage: 42.1 },
  { source: "Checkout Opt-in", subscribers: 468, percentage: 23.4 },
  { source: "Instagram Bio Link", subscribers: 286, percentage: 14.3 },
  { source: "Lead Magnet", subscribers: 224, percentage: 11.2 },
  { source: "Other", subscribers: 180, percentage: 9.0 },
];

const baseAutomationFlows = [
  { name: "Welcome Series", status: "active", steps: 3, avgRevenue: 4.45, subscribers: 2840 },
  { name: "Abandoned Cart", status: "active", steps: 3, avgRevenue: 5.89, subscribers: 4820 },
  { name: "Post-Purchase Thank You", status: "active", steps: 2, avgRevenue: 3.69, subscribers: 1960 },
  { name: "Browse Abandonment", status: "active", steps: 2, avgRevenue: 2.83, subscribers: 3420 },
  { name: "Winback Campaign", status: "active", steps: 3, avgRevenue: 4.13, subscribers: 1240 },
  { name: "VIP Reward", status: "paused", steps: 2, avgRevenue: 8.42, subscribers: 0 },
];

// AI Insights
const aiInsights = {
  listGrowth: {
    title: "List Growth & Acquisition Optimisation",
    overview: "Website popup drives 42% of new subscribers but has high abandonment (68%). Checkout opt-in generates quality subscribers with 2.4x higher LTV. Instagram bio link underperforming — only 14.3% of growth despite 38% of traffic coming from Instagram.",
    details: [
      {
        finding: "Website Popup Performance Gap",
        impact: "High - 842 subscribers but 68% abandonment rate",
        description: "Exit-intent popup converts at 8.2% but welcome mat (full-screen popup) has only 3.1% conversion. Mobile popup UX is causing 78% of abandonment — form fields too small, requires scrolling on iPhone SE screens.",
        recommendation: "A/B test simplified mobile popup with single email field (no name). Reduce desktop popup delay from 15s to 8s. Test gamified wheel-of-fortune popup variant — benchmark data shows 12-18% conversion rates.",
      },
      {
        finding: "Checkout Opt-in Quality",
        impact: "Critical - Highest quality source, underutilized",
        description: "Checkout subscribers have 2.4x higher LTV ($142 vs $59 avg) and 54% purchase within 30 days vs 18% from popup. Only 23.4% of new subscribers despite being highest quality source.",
        recommendation: "Make checkout opt-in more prominent with benefit callout ('Get 15% off your next order'). Test post-purchase popup for non-opted customers. Add SMS opt-in alongside email at checkout.",
      },
      {
        finding: "Instagram Traffic Conversion Gap",
        impact: "Medium - Traffic/subscriber mismatch",
        description: "38% of website traffic comes from Instagram but only generates 14.3% of email subscribers. Bio link sends to homepage instead of dedicated landing page. No Instagram-specific offer or incentive.",
        recommendation: "Create Instagram-specific landing page with exclusive discount. Test 'Instagram exclusive: 20% off first order' offer. Add social proof (customer photos from Instagram) to landing page to increase trust.",
      },
    ],
    recommendations: [
      "Optimise mobile popup UX — single-field form, no scroll required on small screens",
      "Increase checkout opt-in prominence with benefit messaging and incentive",
      "Launch Instagram-specific landing page with exclusive 20% discount offer",
      "Test gamified popup variant (spin-to-win) to increase engagement",
      "Add post-purchase email/SMS opt-in popup for customers who didn't opt in at checkout",
    ],
  },
  campaigns: {
    title: "Email Campaign Performance Analysis",
    overview: "Weekend Flash Sale achieved 38.4% open rate (19% above average) with $6,840 revenue. VIP Early Access had highest engagement (40% open) despite smallest list. Send time analysis shows Saturday 10am campaigns outperform weekday sends by 22%.",
    details: [
      {
        finding: "Weekend Send Time Advantage",
        impact: "High - 22% better open rates on Saturdays",
        description: "Weekend Flash Sale (Saturday 10am) achieved 38.4% open vs 28-34% for weekday sends. Saturday opens have 1.8x higher click-through rate and 2.1x better conversion rate. Lower inbox competition on weekends.",
        recommendation: "Test Saturday 10am send time for all promotional campaigns. Reserve weekday sends for transactional/flow emails. Test Sunday 7pm send for 'planning the week' content themes.",
      },
      {
        finding: "VIP Segment Performance",
        impact: "Critical - Highest ROI segment being underutilized",
        description: "VIP Early Access campaign: 40% open rate, 11% CTR, $2,680 revenue from only 2,840 subscribers = $0.94 revenue per subscriber. Compare to Spring Sale: $4,820 from 14,280 = $0.34 per subscriber. VIP segment delivers 2.8x better ROI.",
        recommendation: "Increase VIP send frequency from monthly to weekly with exclusive content, early access, and special offers. Segment VIP list into ultra-VIP (top 5% spenders) for even more exclusive treatment. Test VIP-only SMS channel.",
      },
      {
        finding: "Subject Line & Preview Text Optimisation",
        impact: "Medium - Easy wins for open rate improvement",
        description: "Subject lines with emojis have 8% higher open rates. Personalized subject lines ('Sarah, your spring favorites are here') outperform generic by 12%. Preview text is underutilized — 60% of campaigns use default Klaviyo text instead of custom copy.",
        recommendation: "Mandatory custom preview text for all campaigns (no defaults). Test emoji in subject for promotional campaigns. Implement dynamic personalization in subject lines using first name + browsing data.",
      },
    ],
    recommendations: [
      "Shift promotional campaigns to Saturday 10am send time (test for 4 weeks)",
      "Increase VIP segment email frequency to weekly with exclusive content",
      "Implement mandatory custom preview text policy for all campaigns",
      "Segment VIP list into ultra-VIP tier (top 5%) for premium treatment",
      "A/B test emoji + personalization in subject lines across all campaign types",
    ],
  },
  crm: {
    title: "CRM Strategy & Automation Optimisation",
    overview: "Abandoned cart flow generates 23% of email revenue ($28.4K) but recovery rate dropped from 14.8% to 12.4% this month. Welcome series conversion (8.2%) is above benchmark — extend to 5 emails for product education. VIP Reward flow is paused despite $8.42 avg revenue per entry.",
    details: [
      {
        finding: "Abandoned Cart Recovery Rate Decline",
        impact: "Critical - $4.2K/month revenue at risk",
        description: "Cart recovery rate fell from 14.8% to 12.4% (16% decline). Analysis shows 58% of abandonment happens on mobile. Email-only recovery strategy misses 68% of mobile users who prefer SMS. Discount offered in step 3 (24hr delay) too late — 82% who will convert do so within 6 hours.",
        recommendation: "Add SMS reminder in flow step 2 (2 hours after abandonment). Move $10 discount incentive from step 3 (24hr) to step 2 (6hr). Test dynamic discount based on cart value: $10 for $50-100, $20 for $100+.",
      },
      {
        finding: "Welcome Series Opportunity",
        impact: "High - 8.2% conversion, room to expand",
        description: "Current 3-email welcome series converts at 8.2% (above 6.4% benchmark). Email 3 has 42% open rate showing high engagement. Subscribers who read all 3 emails have 3.2x higher 90-day LTV. Opportunity to extend series for deeper product education.",
        recommendation: "Extend welcome series from 3 to 5 emails. Email 4: Best sellers + social proof. Email 5: Sustainability story + values alignment. Test 7-day drip vs 14-day drip for pacing. Add branching logic: high engagers get product deep-dive, low engagers get discount.",
      },
      {
        finding: "VIP Reward Flow - Untapped Revenue",
        impact: "Medium - Paused flow with $8.42 avg revenue",
        description: "VIP Reward flow is paused but historically generated $8.42 per entry (highest of all flows). Flow was paused due to 'too many complaints' but analysis shows complaints were about irrelevant rewards, not frequency. Needs personalization, not elimination.",
        recommendation: "Reactivate VIP Reward flow with personalized rewards based on purchase history. Test: accessories buyers get accessory discounts, dress buyers get dress discounts. Limit to top 15% of customers by LTV. Add preference center for reward customization.",
      },
    ],
    recommendations: [
      "Add SMS to abandoned cart flow step 2 (2hr timing) for mobile users",
      "Move discount offer from 24hr to 6hr in cart recovery flow (dynamic by cart value)",
      "Extend welcome series to 5 emails with product education + social proof",
      "Reactivate VIP Reward flow with personalized, category-specific rewards",
      "Implement branching logic in welcome series based on engagement level",
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
              <p className="text-[13px] text-[var(--text-secondary)]">Email & CRM Performance Analysis</p>
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
                    <Tag variant={detail.impact.startsWith("Critical") || detail.impact.startsWith("High") ? "pink" : detail.impact.startsWith("Medium") ? "terra" : "buff"}>
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

export default function EmailDashboard() {
  const { getMultiplier, dateRange } = useFilters();
  const multiplier = getMultiplier();

  const [showListGrowthInsight, setShowListGrowthInsight] = useState(false);
  const [showCampaignInsight, setShowCampaignInsight] = useState(false);
  const [showCRMInsight, setShowCRMInsight] = useState(false);
  const [showSilverBulletBrief, setShowSilverBulletBrief] = useState(false);
  const [showLowHangingFruitBrief, setShowLowHangingFruitBrief] = useState(false);

  // Calculate dynamic metrics based on date range
  const metrics = useMemo(() => {
    const totalRevenue = Math.round(38640 * multiplier);
    const openRate = 32.1;
    const clickRate = 8.2;
    const listGrowth = Math.round(1284 * multiplier);

    return {
      emailRevenue: totalRevenue,
      openRate,
      clickRate,
      listGrowth,
    };
  }, [multiplier]);

  // Dynamic data based on date range
  const emailPerformance = useMemo(() => {
    return baseEmailPerformance.map(item => ({
      ...item,
      sent: Math.round(item.sent * multiplier),
      opens: Math.round(item.opens * multiplier),
      clicks: Math.round(item.clicks * multiplier),
      revenue: Math.round(item.revenue * multiplier),
    }));
  }, [multiplier]);

  const flowPerformance = useMemo(() => {
    return baseFlowPerformance.map(item => ({
      ...item,
      sent: Math.round(item.sent * multiplier),
      revenue: Math.round(item.revenue * multiplier),
    }));
  }, [multiplier]);

  const smsPerformance = useMemo(() => {
    return baseSmsPerformance.map(item => ({
      ...item,
      sent: Math.round(item.sent * multiplier),
      delivered: Math.round(item.delivered * multiplier),
      clicks: Math.round(item.clicks * multiplier),
      revenue: Math.round(item.revenue * multiplier),
    }));
  }, [multiplier]);

  const campaignDetails = useMemo(() => {
    return baseCampaignDetails.map(item => ({
      ...item,
      sent: Math.round(item.sent * multiplier),
      opens: Math.round(item.opens * multiplier),
      clicks: Math.round(item.clicks * multiplier),
      revenue: Math.round(item.revenue * multiplier),
    }));
  }, [multiplier]);

  const listGrowth = useMemo(() => {
    return baseListGrowth.map(item => ({
      ...item,
      subscribers: Math.round(item.subscribers * multiplier),
    }));
  }, [multiplier]);

  const automationFlows = useMemo(() => {
    return baseAutomationFlows.map(item => ({
      ...item,
      subscribers: Math.round(item.subscribers * multiplier),
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
      action: "Fix abandoned cart email flow — current 23% drop vs 38% benchmark",
      impactLine: "Estimated: +$6,400 at 12% open rate improvement",
      channel: "Klaviyo · Abandoned Cart Flow"
    },
    lowHangingFruit: {
      action: "A/B test Win-back flow subject lines to improve 28% open rate",
      effortChip: "Easy · 2 days",
      impact: "+12% open rate · +$2,800 projected lift",
      channelChip: "Klaviyo · Email"
    },
    frameworkTasks: [
      { task: "SMS campaign expansion to 3x/week", status: "In Progress" },
      { task: "VIP segment personalization launch", status: "Planned" },
      { task: "Post-purchase upsell flow creation", status: "On Track" }
    ]
  };

  // Detailed Brief Data
  const silverBulletBrief: DetailedBriefData = {
    title: "Abandoned Cart Flow Optimisation",
    category: "Silver Bullet · Email & CRM",
    overview: "Your abandoned cart email flow is underperforming benchmark standards by 23%, representing significant lost revenue. Current recovery rate is 12.4% compared to industry benchmark of 38%. Analysis shows 58% of cart abandonment occurs on mobile devices, and the current email-only recovery strategy is missing 68% of mobile users who prefer SMS. The discount incentive is being offered too late in the sequence—82% of conversions happen within 6 hours of abandonment, but your discount doesn't appear until 24 hours.",
    goals: [
      "Increase cart recovery rate from 12.4% to 24% (minimum) within 60 days",
      "Reduce time-to-conversion by implementing earlier discount trigger at 6-hour mark",
      "Capture mobile abandoners with SMS integration in flow step 2 (2-hour timing)",
      "Generate additional $6,400 monthly revenue through improved recovery rates"
    ],
    detailedBrief: {
      challenge: "Cart abandonment represents 68% of potential sales. Current email-only flow misses mobile users (58% of abandoners) and triggers discount incentive too late (24hrs vs optimal 6hrs). Recovery rate of 12.4% is 65% below industry benchmark, costing approximately $6,400 per month in lost revenue.",
      approach: "Multi-channel cart recovery strategy: (1) Add SMS reminder at 2-hour mark for mobile users, (2) Move $10 discount from 24-hour email to 6-hour email, (3) Implement dynamic discount based on cart value ($10 for $50-100 carts, $20 for $100+ carts), (4) A/B test subject lines focusing on urgency and product-specific messaging, (5) Add product images and social proof to recovery emails",
      timeline: "4 weeks implementation + 4 weeks testing",
      budget: "$2,400 (Klaviyo SMS credits + development time)"
    },
    nextSteps: [
      {
        step: "Klaviyo SMS Integration Setup",
        description: "Enable SMS channel in Klaviyo, purchase SMS credits, and configure phone number collection at checkout. Add SMS flow step at 2-hour mark with personalised cart reminder.",
        owner: "Email Marketing Team"
      },
      {
        step: "Restructure Flow Timing & Incentives",
        description: "Move discount offer from step 3 (24hr) to step 2 (6hr). Implement dynamic discount logic based on cart value. Update email copy to emphasise urgency and product benefits.",
        owner: "CRM Manager"
      },
      {
        step: "A/B Test Subject Lines",
        description: "Create 4 subject line variants focusing on different angles: urgency ('Your cart expires in 2 hours'), product-specific ('Your Silk Midi Dress is waiting'), discount-led ('Save $20 on your order'), and social proof ('Join 2,000+ happy customers').",
        owner: "Content Team"
      },
      {
        step: "Monitor & Optimise",
        description: "Track recovery rate, time-to-conversion, SMS vs email performance, and revenue impact. Adjust timing, messaging, and incentives based on performance data after 2 weeks.",
        owner: "Analytics Team"
      }
    ],
    potentialOutcomes: {
      bestCase: "+$8,200/month revenue, 28% recovery rate, 3.2x ROI",
      expected: "+$6,400/month revenue, 24% recovery rate, 2.7x ROI",
      metrics: [
        "Cart recovery rate (%)",
        "Revenue from recovered carts",
        "SMS vs email conversion rates",
        "Time-to-conversion (hours)",
        "Discount redemption rate",
        "Mobile vs desktop recovery"
      ]
    }
  };

  const lowHangingFruitBrief: DetailedBriefData = {
    title: "Win-Back Flow Subject Line Optimisation",
    category: "Low-Hanging Fruit · Email",
    overview: "Your win-back email flow currently has a 28% open rate, which is below the 35-42% benchmark for re-engagement campaigns. Subject lines are generic ('We miss you!' and 'Come back for 15% off') and don't leverage personalisation or urgency. This is a quick-win opportunity requiring only 2 days of work to test improved subject lines that could lift open rates by 12% and generate an estimated $2,800 in additional monthly revenue from re-activated customers.",
    goals: [
      "Increase win-back flow open rate from 28% to 40%+ through subject line testing",
      "Generate $2,800 additional monthly revenue from reactivated dormant customers",
      "Identify winning subject line formula to apply across other email flows",
      "Improve click-through rate by 6% through better email/subject line alignment"
    ],
    detailedBrief: {
      challenge: "Win-back flow has 28% open rate vs 35-42% benchmark. Current subject lines are generic and don't use personalisation data available in Klaviyo (browsing history, past purchases, favourite categories). Low open rates mean missing opportunities to reactivate high-LTV customers who haven't purchased in 60+ days.",
      approach: "Create 6 personalised subject line variants using Klaviyo's dynamic content: (1) Product-specific ('Your favourite dresses just restocked'), (2) Urgency-driven ('Last chance: Your exclusive 20% offer expires tonight'), (3) Curiosity-based ('See what you've been missing...'), (4) Social proof ('2,000+ customers loved our new spring collection'), (5) Direct incentive ('$25 credit waiting for you'), (6) Question-based ('Ready for your next wardrobe refresh?'). A/B test across segments for 2 weeks.",
      timeline: "2 days setup + 14 days testing",
      budget: "$0 (uses existing Klaviyo features)"
    },
    nextSteps: [
      {
        step: "Audit Current Win-Back Flow",
        description: "Review existing subject lines, open rates by segment, and identify which customer segments respond best to win-back attempts (by LTV, product category, time since last purchase).",
        owner: "Email Marketing Manager"
      },
      {
        step: "Create Subject Line Variants",
        description: "Write 6 subject line variants using Klaviyo dynamic fields for personalisation. Ensure each variant aligns with email content and offer. Get stakeholder approval on copy.",
        owner: "Copywriter"
      },
      {
        step: "Set Up A/B Tests",
        description: "Configure Klaviyo A/B tests for subject lines across different customer segments. Set up 14-day test period with statistical significance tracking. Ensure proper tracking is in place for opens, clicks, and conversions.",
        owner: "CRM Specialist"
      },
      {
        step: "Analyse & Implement Winners",
        description: "After 14 days, analyse results by segment and subject line type. Implement winning variants into production flow. Document learnings to apply to other email campaigns.",
        owner: "Email Marketing Manager"
      }
    ],
    potentialOutcomes: {
      bestCase: "+$3,200/month revenue, 42% open rate, 8.2% CTR",
      expected: "+$2,800/month revenue, 40% open rate, 7.1% CTR",
      metrics: [
        "Email open rate (%)",
        "Click-through rate (%)",
        "Reactivation conversion rate",
        "Revenue per reactivated customer",
        "Subject line performance by segment",
        "Time to first purchase after win-back"
      ]
    }
  };

  return (
    <div>
      <PageHeader
        label="Channels · Email & CRM"
        title="Email / CRM Intelligence"
        description="Klaviyo performance dashboard. Track campaigns, automated flows, segmentation health, and lifecycle revenue attribution across your email program."
        backgroundGradient="buff"
        externalLinks={[
          { name: "Klaviyo", url: "https://klaviyo.com" },
        ]}
        stats={[
          { label: "Email Revenue", value: `$${(metrics.emailRevenue / 1000).toFixed(1)}K` },
          { label: "Open Rate", value: `${metrics.openRate}%` },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        {/* AI Widget */}
        <AIWidget
          insightLabel="Email & CRM Insight"
          insightText="Abandoned cart flow showing 28% open rate vs 38% benchmark — 23% drop in recovery. Email achieves 12.4x ROAS, highest of all channels. Segmented campaigns outperform broadcasts by 4.1x. Recommendation: optimise cart recovery subject lines and expand VIP segmentation."
        />

        <FilterBar showChannel={false} />

      <StatGrid columns={4}>
        <MetricCard
          label="Email Revenue"
          value={`$${metrics.emailRevenue.toLocaleString()}`}
          change="+14.2%"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="Open Rate"
          value={`${metrics.openRate}%`}
          change="+2.8%"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="Click Rate"
          value={`${metrics.clickRate}%`}
          change="+0.4%"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="List Growth"
          value={`+${metrics.listGrowth.toLocaleString()}`}
          change="+18.6%"
          changeType="positive"
          trend="up"
        />
      </StatGrid>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[var(--buff-dark)]" />
          <CardTitle>AI CRM Insight</CardTitle>
        </div>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
          Your abandoned cart flow is your #1 revenue driver (23% drop in recovery rate detected). Recommendation: add SMS reminder in flow step 2, and test $10 discount incentive in step 3. Your welcome series has 8.2% conversion — above benchmark. Consider extending to 5 emails with product education focus.
        </p>
        <button
          onClick={() => setShowCRMInsight(true)}
          className="w-full px-4 py-2 bg-[var(--buff-dark)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Deep Dive: CRM Strategy
        </button>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <ChartContainer
          title="Email Performance Overview"
          subtitle="4-week trend — All campaigns + flows"
          tag={{ label: "Klaviyo", variant: "pink" }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={emailPerformance} id="email-performance-chart">
              <CartesianGrid key="grid-email-performance" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="xaxis-email-performance" dataKey="week" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <YAxis key="yaxis-email-performance" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <Tooltip
                key="tooltip-email-performance"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}
              />
              <Legend key="legend-email-performance" wrapperStyle={{ fontSize: '12px' }} />
              <Line key="line-opens" type="monotone" dataKey="opens" stroke="var(--pink)" strokeWidth={3} name="Opens" id="line-opens" />
              <Line key="line-clicks" type="monotone" dataKey="clicks" stroke="var(--green-mid)" strokeWidth={3} name="Clicks" id="line-clicks" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer
          title="Email Revenue by Week"
          subtitle="Revenue attributed to email channel"
          tag={{ label: "Revenue", variant: "green" }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={emailPerformance} id="email-revenue-chart">
              <CartesianGrid key="grid-email-revenue" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="xaxis-email-revenue" dataKey="week" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <YAxis key="yaxis-email-revenue" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <Tooltip
                key="tooltip-email-revenue"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}
              />
              <Bar key="bar-revenue" dataKey="revenue" fill="var(--terra)" name="Revenue ($)" id="bar-revenue" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <Card>
        <CardTitle>Automated Flow Performance</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">{dateRangeLabels[dateRange]} — Klaviyo flows</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Flow Name</th>
                <th className="text-center py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Emails</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Sent</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Conv. Rate</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {flowPerformance.map((flow, index) => (
                <tr key={index} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--surface)] transition-colors">
                  <td className="py-3 px-4 text-[14px] font-medium text-[var(--text-primary)]">{flow.name}</td>
                  <td className="py-3 px-4 text-center text-[14px] text-[var(--text-secondary)]">{flow.emails}</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">{flow.sent.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">{flow.conv}%</td>
                  <td className="py-3 px-4 text-right text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    ${flow.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card variant="pink">
          <CardTitle variant="pink">List Segments</CardTitle>
          <p className="text-[13px] text-[var(--text-primary)] mb-4">Active subscriber segments — {dateRangeLabels[dateRange]}</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-primary)]">VIP Customers</span>
              <span className="text-[15px] font-medium text-[var(--pink-dark)]" style={{ fontFamily: "var(--font-serif)" }}>{Math.round(2840 * multiplier).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-primary)]">Active Subscribers</span>
              <span className="text-[15px] font-medium text-[var(--pink-dark)]" style={{ fontFamily: "var(--font-serif)" }}>{Math.round(18420 * multiplier).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-primary)]">At-Risk</span>
              <span className="text-[15px] font-medium text-[var(--pink-dark)]" style={{ fontFamily: "var(--font-serif)" }}>{Math.round(4680 * multiplier).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-primary)]">Never Purchased</span>
              <span className="text-[15px] font-medium text-[var(--pink-dark)]" style={{ fontFamily: "var(--font-serif)" }}>{Math.round(8240 * multiplier).toLocaleString()}</span>
            </div>
          </div>
        </Card>

        <Card variant="surface">
          <CardTitle>Recent Campaigns</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-4">{dateRangeLabels[dateRange]}</p>
          <div className="space-y-3">
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">Spring Sale Announcement</div>
              <div className="text-[11px] text-[var(--text-tertiary)]">Sent: {Math.round(14280 * multiplier).toLocaleString()} • Open: 34.2% • Rev: ${Math.round(4820 * multiplier).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">New Arrivals Drop</div>
              <div className="text-[11px] text-[var(--text-tertiary)]">Sent: {Math.round(12640 * multiplier).toLocaleString()} • Open: 28.6% • Rev: ${Math.round(3240 * multiplier).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">Weekend Flash Sale</div>
              <div className="text-[11px] text-[var(--text-tertiary)]">Sent: {Math.round(18420 * multiplier).toLocaleString()} • Open: 38.4% • Rev: ${Math.round(6840 * multiplier).toLocaleString()}</div>
            </div>
          </div>
        </Card>

        <Card variant="green">
          <CardTitle variant="green">Subscriber Health</CardTitle>
          <p className="text-[13px] text-white/75 mb-4">{dateRangeLabels[dateRange]}</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/90">New Subscribers</span>
              <span className="text-[15px] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>+{metrics.listGrowth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/90">Unsubscribes</span>
              <span className="text-[15px] font-medium text-white/60" style={{ fontFamily: "var(--font-serif)" }}>-{Math.round(142 * multiplier)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/90">Net Growth</span>
              <span className="text-[15px] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>+{Math.round(1142 * multiplier).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/90">Engagement Rate</span>
              <span className="text-[15px] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>32.4%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* SMS Performance */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-[var(--pink)]" />
          <CardTitle>SMS Performance</CardTitle>
        </div>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Klaviyo SMS campaigns — {dateRangeLabels[dateRange]}</p>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
              Total Sent
            </div>
            <div className="text-[1.5rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
              {Math.round(12200 * multiplier).toLocaleString()}
            </div>
          </div>
          <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
              Delivery Rate
            </div>
            <div className="text-[1.5rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
              98.6%
            </div>
          </div>
          <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
              Click Rate
            </div>
            <div className="text-[1.5rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
              18.4%
            </div>
          </div>
          <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
              SMS Revenue
            </div>
            <div className="text-[1.5rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
              ${(10.6 * multiplier).toFixed(1)}K
            </div>
          </div>
        </div>
        <ChartContainer
          title="SMS Engagement Trend"
          subtitle="Weekly performance"
          tag={{ label: "SMS", variant: "pink" }}
        >
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={smsPerformance} id="sms-performance-chart">
              <CartesianGrid key="grid-sms-performance" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="xaxis-sms-performance" dataKey="week" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <YAxis key="yaxis-sms-performance" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <Tooltip
                key="tooltip-sms-performance"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}
              />
              <Legend key="legend-sms-performance" wrapperStyle={{ fontSize: '12px' }} />
              <Line key="line-sms-clicks" type="monotone" dataKey="clicks" stroke="var(--pink)" strokeWidth={3} name="Clicks" id="line-sms-clicks" />
              <Line key="line-sms-revenue" type="monotone" dataKey="revenue" stroke="var(--green)" strokeWidth={3} name="Revenue ($)" id="line-sms-revenue" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Campaign Details */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-[var(--green)]" />
          <CardTitle>Recent Campaign Performance</CardTitle>
        </div>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">{dateRangeLabels[dateRange]} — All email campaigns</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Campaign</th>
                <th className="text-center py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Date</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Sent</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Open Rate</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Click Rate</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {campaignDetails.map((campaign, index) => (
                <tr key={index} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--surface)] transition-colors">
                  <td className="py-3 px-4 text-[14px] font-medium text-[var(--text-primary)]">{campaign.name}</td>
                  <td className="py-3 px-4 text-center text-[13px] text-[var(--text-tertiary)]">{campaign.date}</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">{campaign.sent.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    {((campaign.opens / campaign.sent) * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    {((campaign.clicks / campaign.sent) * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-right text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    ${campaign.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Campaign Insight at base of widget */}
        <div className="pt-6 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[var(--green)]" />
            <div className="text-[14px] font-semibold text-[var(--text-primary)]">AI Campaign Insight</div>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
            Weekend Flash Sale achieved 38.4% open rate (19% above average) with $6,840 revenue. VIP Early Access had highest engagement (40% open) despite smallest list. Send time analysis shows Saturday 10am campaigns outperform weekday sends by 22%.
          </p>
          <button
            onClick={() => setShowCampaignInsight(true)}
            className="w-full px-4 py-2 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Get Started: Campaign Analysis
          </button>
        </div>
      </Card>

      {/* List Growth Sources & Automation Flows */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[var(--terra)]" />
            <CardTitle>List Growth by Source</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">New subscribers — {dateRangeLabels[dateRange]}</p>
          <div className="space-y-4 mb-6">
            {listGrowth.map((source, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-medium text-[var(--text-primary)]">{source.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {source.subscribers}
                    </span>
                    <span className="text-[11px] text-[var(--text-tertiary)] min-w-[45px] text-right">
                      {source.percentage}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--green)] to-[var(--pink)]"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* List Growth Insight at base of widget */}
          <div className="pt-6 border-t border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[var(--terra)]" />
              <div className="text-[14px] font-semibold text-[var(--text-primary)]">AI List Growth Insight</div>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
              Website popup drives 42% of new subscribers but has high abandonment (68%). Checkout opt-in generates quality subscribers with 2.4x higher LTV. Instagram bio link underperforming — only 14.3% of growth despite 38% of traffic.
            </p>
            <button
              onClick={() => setShowListGrowthInsight(true)}
              className="w-full px-4 py-2 bg-[var(--terra)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Get Started: List Growth
            </button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[var(--buff-dark)]" />
            <CardTitle>Automation Flows</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Active flows & performance — {dateRangeLabels[dateRange]}</p>
          <div className="space-y-3">
            {automationFlows.map((flow, index) => (
              <div key={index} className="p-3 border border-[var(--border-color)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[var(--text-primary)] mb-1">{flow.name}</div>
                    <div className="text-[11px] text-[var(--text-tertiary)]">{flow.steps} steps • {flow.subscribers.toLocaleString()} subscribers</div>
                  </div>
                  <Tag variant={flow.status === "active" ? "green" : "buff"}>{flow.status}</Tag>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[var(--text-tertiary)]">Avg Revenue per Flow Entry</span>
                  <span className="text-[14px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    ${flow.avgRevenue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Insights & Ask AI Section */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>AI Email & CRM Insights</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
            Comprehensive analysis of your email program performance. Get insights on flow optimisation, list growth strategies, campaign timing, segmentation opportunities, and revenue attribution across your entire email marketing ecosystem.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => setShowCRMInsight(true)}
              className="w-full px-4 py-2 bg-[var(--buff-dark)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              CRM Strategy Deep Dive
            </button>
            <button
              onClick={() => setShowCampaignInsight(true)}
              className="w-full px-4 py-2 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Campaign Optimisation
            </button>
            <button
              onClick={() => setShowListGrowthInsight(true)}
              className="w-full px-4 py-2 bg-[var(--terra)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              List Growth Analysis
            </button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>Ask AI About Email & CRM</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Get instant insights about your email marketing and CRM performance</p>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="e.g., 'How can I improve my abandoned cart recovery rate?' or 'What's my best performing segment?'"
              className="flex-1 px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all"
            />
            <button className="px-6 py-3 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium whitespace-nowrap flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Ask
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1.5 bg-[var(--surface)] text-[var(--text-secondary)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors text-[12px]">
              Improve open rates
            </button>
            <button className="px-3 py-1.5 bg-[var(--surface)] text-[var(--text-secondary)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors text-[12px]">
              Reduce unsubscribe rate
            </button>
            <button className="px-3 py-1.5 bg-[var(--surface)] text-[var(--text-secondary)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors text-[12px]">
              Optimise send times
            </button>
            <button className="px-3 py-1.5 bg-[var(--surface)] text-[var(--text-secondary)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors text-[12px]">
              Segment strategy
            </button>
            <button className="px-3 py-1.5 bg-[var(--surface)] text-[var(--text-secondary)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors text-[12px]">
              Flow optimisation
            </button>
          </div>
        </Card>
      </div>

      {/* Action Strip */}
      <ActionStrip
        data={actionStripData}
        onSilverBulletClick={() => setShowSilverBulletBrief(true)}
        onLowHangingFruitClick={() => setShowLowHangingFruitBrief(true)}
      />
      </div>

      {/* Insight Modals */}
      <InsightModal
        show={showListGrowthInsight}
        onClose={() => setShowListGrowthInsight(false)}
        insight={aiInsights.listGrowth}
        icon={<TrendingUp className="w-6 h-6 text-[var(--terra)]" />}
        color="var(--terra)"
      />
      <InsightModal
        show={showCampaignInsight}
        onClose={() => setShowCampaignInsight(false)}
        insight={aiInsights.campaigns}
        icon={<Mail className="w-6 h-6 text-[var(--green)]" />}
        color="var(--green)"
      />
      <InsightModal
        show={showCRMInsight}
        onClose={() => setShowCRMInsight(false)}
        insight={aiInsights.crm}
        icon={<Zap className="w-6 h-6 text-[var(--buff-dark)]" />}
        color="var(--buff-dark)"
      />

      {/* Detailed Brief Modals */}
      <DetailedBriefModal
        show={showSilverBulletBrief}
        onClose={() => setShowSilverBulletBrief(false)}
        data={silverBulletBrief}
        primaryColor="var(--pink)"
      />
      <DetailedBriefModal
        show={showLowHangingFruitBrief}
        onClose={() => setShowLowHangingFruitBrief(false)}
        data={lowHangingFruitBrief}
        primaryColor="var(--green)"
      />
    </div>
  );
}
