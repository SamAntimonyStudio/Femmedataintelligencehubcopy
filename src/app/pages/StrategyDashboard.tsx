import { useMemo, useState } from "react";
import { Card, CardTitle, MetricCard, Tag, AIInsightCard } from "../components/ui/Card";
import { FilterBar, StatGrid, ChartContainer } from "../components/ui/Filters";
import { useFilters } from "../context/FilterContext";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, ArrowUpRight, Target, Award, Megaphone, Plus, Calendar as CalendarIcon, Bell, BarChart3, Zap, CheckCircle, XCircle, AlertTriangle as AlertTriangleIcon, Sparkles } from "lucide-react";
import { AIWidget } from "../components/AIWidget";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import { DetailedBriefModal, DetailedBriefData } from "../components/DetailedBriefModal";
import PageHeader from "../components/PageHeader";
const femmeHero = "https://placehold.co/750x750?text=femmeHero";
import { CreateCampaignModal, CreateCampaignData } from "../components/CreateCampaignModal";
import { PriorityActionModal } from "../components/PriorityActionModal";

// Base data
const baseRevenueData = [
  { id: "oct", month: "Oct", revenue: 142000, goal: 135000 },
  { id: "nov", month: "Nov", revenue: 156000, goal: 145000 },
  { id: "dec", month: "Dec", revenue: 178000, goal: 160000 },
  { id: "jan", month: "Jan", revenue: 168000, goal: 165000 },
  { id: "feb", month: "Feb", revenue: 182000, goal: 175000 },
  { id: "mar", month: "Mar", revenue: 198000, goal: 185000 },
];

const baseChannelData = [
  { id: "organic", name: "Organic Social", value: 32, color: "var(--pink)" },
  { id: "paid", name: "Paid Social", value: 28, color: "var(--green-mid)" },
  { id: "email", name: "Email", value: 22, color: "var(--terra)" },
  { id: "direct", name: "Direct", value: 12, color: "var(--buff)" },
  { id: "search", name: "Search", value: 6, color: "var(--green-light)" },
];

const baseWeeklyMetrics = [
  { id: "mon", day: "Mon", sales: 8400, visitors: 12500 },
  { id: "tue", day: "Tue", sales: 9200, visitors: 13200 },
  { id: "wed", day: "Wed", sales: 8800, visitors: 12800 },
  { id: "thu", day: "Thu", sales: 11200, visitors: 15600 },
  { id: "fri", day: "Fri", sales: 13400, visitors: 17800 },
  { id: "sat", day: "Sat", sales: 15600, visitors: 19200 },
  { id: "sun", day: "Sun", sales: 14200, visitors: 16500 },
];

const topProducts = [
  { name: "Silk Midi Dress", sales: 42, revenue: "$12,600", trend: "up" },
  { name: "Cashmere Cardigan", sales: 38, revenue: "$11,400", trend: "up" },
  { name: "Linen Trousers", sales: 35, revenue: "$8,750", trend: "flat" },
  { name: "Leather Tote", sales: 32, revenue: "$9,600", trend: "up" },
  { name: "Wool Coat", sales: 28, revenue: "$11,200", trend: "down" },
];

const topCategories = [
  { name: "Dresses", revenue: 45280, units: 248, growth: "+12.4%", margin: "58%" },
  { name: "Knitwear", revenue: 38640, units: 182, growth: "+8.2%", margin: "62%" },
  { name: "Outerwear", revenue: 32100, units: 124, growth: "+18.6%", margin: "54%" },
  { name: "Accessories", revenue: 24800, units: 386, growth: "+6.8%", margin: "68%" },
  { name: "Bottoms", revenue: 18420, units: 156, growth: "+4.2%", margin: "56%" },
];

const priorities = [
  { task: "Optimise Meta CPM — current at $18.40, target $14.50", status: "urgent", impact: "High", actionType: "meta-cpm" as const },
  { task: "Launch Easter collection campaign (2 weeks to launch)", status: "urgent", impact: "High", actionType: "easter-campaign" as const },
  { task: "Review Klaviyo abandoned cart flow — 23% drop in recovery", status: "important", impact: "Medium", actionType: "klaviyo-cart" as const },
  { task: "Competitor analysis: 3 new brands identified with similar positioning", status: "review", impact: "Medium", actionType: "competitor-analysis" as const },
  { task: "Update Instagram bio link with Autumn '26 landing page", status: "ready", impact: "Low", actionType: "instagram-link" as const },
];

const topCampaigns = [
  { name: "Easter Collection Launch", revenue: 35280, roas: 4.2, conversions: 186, channel: "Meta + Email" },
  { name: "Spring Preview Campaign", revenue: 28640, roas: 3.8, conversions: 142, channel: "TikTok" },
  { name: "VIP Early Access", revenue: 18220, roas: 6.2, conversions: 98, channel: "Email" },
];

const topInfluencers = [
  { name: "@stylewithjulia", emv: 28400, posts: 4, engagement: 4.2, conversions: 42 },
  { name: "@minimal_meg", emv: 18200, posts: 6, engagement: 6.8, conversions: 38 },
  { name: "@emma.sustainable", emv: 14800, posts: 8, engagement: 7.2, conversions: 34 },
];

const topGoogleCampaigns = [
  { name: "Shopping - Spring Dresses", revenue: 18680, roas: 5.2, conversions: 124, type: "Shopping" },
  { name: "Search - Brand Keywords", revenue: 14240, roas: 6.8, conversions: 86, type: "Search" },
  { name: "Performance Max - All Products", revenue: 22480, roas: 4.6, conversions: 168, type: "PMax" },
];

const quickActions = [
  { label: "Create Campaign", icon: Plus, color: "var(--pink)", action: "campaign" },
  { label: "Create Content", icon: Sparkles, color: "var(--green)", action: "create-content" },
  { label: "Influencer Pack", icon: Award, color: "var(--terra)", action: "influencer-pack" },
  { label: "View Alerts", icon: Bell, color: "var(--buff-dark)", action: "alerts" },
  { label: "Run Report", icon: BarChart3, color: "var(--green-mid)", action: "report" },
];

const recentActivity = [
  {
    event: "Campaign 'Easter Collection' exceeded ROAS target by 12%",
    time: "2 hours ago",
    type: "success",
    icon: CheckCircle
  },
  {
    event: "New influencer @designbyjess accepted partnership",
    time: "4 hours ago",
    type: "info",
    icon: Award
  },
  {
    event: "Abandoned cart recovery rate increased 8%",
    time: "6 hours ago",
    type: "success",
    icon: TrendingUp
  },
  {
    event: "Meta CPM increased 5% - monitor closely",
    time: "8 hours ago",
    type: "warning",
    icon: AlertTriangleIcon
  },
  {
    event: "Email open rate reached 34.2% (above benchmark)",
    time: "12 hours ago",
    type: "success",
    icon: CheckCircle
  },
];

const channelHealth = [
  { channel: "Organic Social", status: "healthy", score: 92, target: 85, metric: "Engagement Rate" },
  { channel: "Paid Social", status: "warning", score: 78, target: 85, metric: "CPM" },
  { channel: "Email", status: "healthy", score: 96, target: 80, metric: "Deliverability" },
  { channel: "Google Ads", status: "healthy", score: 88, target: 85, metric: "Quality Score" },
  { channel: "Influencer", status: "critical", score: 68, target: 75, metric: "EMV Growth" },
  { channel: "E-commerce", status: "healthy", score: 94, target: 90, metric: "Conversion Rate" },
];

const performanceAlerts = [
  { message: "Cart flow recovery down 23%", severity: "high", category: "Email" },
  { message: "Meta CPM 18% above target", severity: "high", category: "Paid Social" },
  { message: "Silk Midi Dress low stock (4 days)", severity: "medium", category: "Inventory" },
  { message: "3 new competitors identified", severity: "medium", category: "Market" },
];

export default function StrategyDashboard() {
  const { getMultiplier, channel, dateRange } = useFilters();
  const [showAlerts, setShowAlerts] = useState(false);
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);
  const [selectedPriorityAction, setSelectedPriorityAction] = useState<"meta-cpm" | "easter-campaign" | "klaviyo-cart" | "competitor-analysis" | "instagram-link" | null>(null);
  const [showSilverBulletModal, setShowSilverBulletModal] = useState(false);
  const [showLowHangingFruitModal, setShowLowHangingFruitModal] = useState(false);
  const [showStrategicSummaryModal, setShowStrategicSummaryModal] = useState(false);
  const [showNextBestActionModal, setShowNextBestActionModal] = useState(false);

  const multiplier = getMultiplier();

  const handleCreateCampaign = (data: CreateCampaignData) => {
    console.log("New campaign created:", data);
    alert(`Campaign "${data.campaignTitle}" created successfully! Team members notified: ${data.teamMembers.join(", ")}`);
  };

  // Dynamic calculations based on filters
  const metrics = useMemo(() => {
    const channelMultipliers: Record<string, number> = {
      all: 1,
      organic: 0.32,
      "paid-social": 0.28,
      email: 0.22,
      direct: 0.12,
      google: 0.06,
    };

    const channelMult = channelMultipliers[channel];
    const totalMult = multiplier * channelMult;

    // Channel-specific metrics
    if (channel === "organic") {
      return {
        metric1: { label: "Total Reach", value: `${Math.round(842 * multiplier)}K` },
        metric2: { label: "Engagement Rate", value: `${(6.4 * (0.9 + multiplier * 0.1)).toFixed(1)}%` },
        metric3: { label: "Follower Growth", value: `+${Math.round(1284 * multiplier)}` },
        metric4: { label: "Content Posts", value: Math.round(142 * multiplier).toString() },
      };
    } else if (channel === "paid-social") {
      return {
        metric1: { label: "Ad Spend", value: `$${Math.round(12840 * totalMult).toLocaleString()}` },
        metric2: { label: "ROAS", value: `${(4.8 * (0.9 + multiplier * 0.1)).toFixed(1)}x` },
        metric3: { label: "CPC", value: `$${(2.42 * (1.1 - multiplier * 0.1)).toFixed(2)}` },
        metric4: { label: "CTR", value: `${(3.8 * (0.9 + multiplier * 0.1)).toFixed(1)}%` },
      };
    } else if (channel === "email") {
      return {
        metric1: { label: "Email Revenue", value: `$${Math.round(38640 * multiplier).toLocaleString()}` },
        metric2: { label: "Open Rate", value: `${(32.1 * (0.9 + multiplier * 0.1)).toFixed(1)}%` },
        metric3: { label: "Click Rate", value: `${(8.2 * (0.9 + multiplier * 0.1)).toFixed(1)}%` },
        metric4: { label: "List Growth", value: `+${Math.round(1284 * multiplier)}` },
      };
    } else if (channel === "google") {
      return {
        metric1: { label: "Google Revenue", value: `$${Math.round(55400 * totalMult).toLocaleString()}` },
        metric2: { label: "Quality Score", value: (8.4 * (0.9 + multiplier * 0.1)).toFixed(1) },
        metric3: { label: "Avg CPC", value: `$${(1.84 * (1.1 - multiplier * 0.1)).toFixed(2)}` },
        metric4: { label: "Impressions", value: `${Math.round(284 * multiplier)}K` },
      };
    } else if (channel === "direct") {
      return {
        metric1: { label: "Direct Traffic", value: `${Math.round(42 * multiplier)}K` },
        metric2: { label: "Returning Visitors", value: `${(68.4 * (0.9 + multiplier * 0.1)).toFixed(1)}%` },
        metric3: { label: "Avg Session", value: `${(3.2 * (0.9 + multiplier * 0.1)).toFixed(1)} min` },
        metric4: { label: "Bounce Rate", value: `${(28.6 * (1.1 - multiplier * 0.1)).toFixed(1)}%` },
      };
    } else {
      // All channels
      return {
        metric1: { label: "Total Revenue", value: `$${Math.round(198420 * totalMult).toLocaleString()}` },
        metric2: { label: "Avg Order Value", value: `$${(186.50 * (0.9 + multiplier * 0.1)).toFixed(2)}` },
        metric3: { label: "Conversion Rate", value: `${(3.8 * (0.85 + multiplier * 0.15)).toFixed(1)}%` },
        metric4: { label: "Customer LTV", value: `$${Math.round(542 * (0.9 + multiplier * 0.1))}` },
      };
    }
  }, [multiplier, channel]);

  const revenueData = useMemo(() => {
    return baseRevenueData.map(item => ({
      ...item,
      revenue: Math.round(item.revenue * multiplier),
      goal: Math.round(item.goal * multiplier),
    }));
  }, [multiplier]);

  const channelData = useMemo(() => {
    if (channel === "all") return baseChannelData;
    
    const selected = baseChannelData.find(c => 
      c.name.toLowerCase().includes(channel.replace("-", " "))
    );
    
    if (selected) {
      return [{ ...selected, value: 100 }];
    }
    return baseChannelData;
  }, [channel]);

  const weeklyMetrics = useMemo(() => {
    return baseWeeklyMetrics.map(item => ({
      ...item,
      sales: Math.round(item.sales * multiplier),
      visitors: Math.round(item.visitors * multiplier),
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
      action: "Launch loyalty win-back campaign to 2,847 lapsed customers",
      impactLine: "Estimated: +$84,210 at 20% reactivation rate",
      channel: "Klaviyo · Email + SMS"
    },
    lowHangingFruit: {
      action: "A/B test subject line on Win-back flow — current OR 28% vs 38% benchmark",
      effortChip: "Easy · 2 days",
      impact: "+12% open rate · +$6,400 projected revenue lift",
      channelChip: "Klaviyo · Email"
    },
    frameworkTasks: [
      { task: "YPO loyalty program relaunch", status: "In Progress" },
      { task: "Klaviyo segmentation rebuild", status: "Planned" },
      { task: "Meta Q4/2026 creative refresh", status: "On Track" }
    ]
  };

  const silverBulletBrief: DetailedBriefData = {
    title: "Loyalty Win-Back Campaign - Lapsed Customer Reactivation",
    category: "Silver Bullet · Customer Retention",
    overview: "2,847 lapsed customers (no purchase in 180+ days) represent $427K in dormant LTV. Historical win-back campaigns achieve 18-22% reactivation with $142 average order value. Targeted email + SMS campaign with exclusive 20% discount offer expected to reactivate 570 customers (20% rate), generating +$84,210 incremental revenue. Quick implementation using existing Klaviyo infrastructure with proven win-back messaging templates.",
    goals: [
      "Reactivate 570 of 2,847 lapsed customers (20% target rate) within 30-day campaign window",
      "Generate +$84,210 incremental revenue from reactivated customers ($142 AOV x 570 conversions)",
      "Rebuild engagement with dormant customer segment and prevent permanent churn",
      "Test SMS channel effectiveness for win-back vs email-only approach"
    ],
    detailedBrief: {
      challenge: "2,847 customers inactive for 180+ days representing significant dormant revenue opportunity. Lapsed customers have high brand awareness but lost purchase habit - need compelling reactivation trigger. Standard promotional emails ignored by this segment (6% open rate vs 32% active customer average). Competitive switching likely - customers trying other sustainable fashion brands. Without intervention, lapsed customers move to permanent churn within 12 months.",
      approach: "Multi-channel win-back campaign: Week 1: Email with subject 'We miss you' + 20% exclusive discount code. Week 2: SMS follow-up to non-openers 'Your 20% off is waiting'. Feature new arrivals since last purchase, emphasize product improvements and sustainability milestones. Personalize based on last purchase category. Track: open rate (target 28%), click rate (target 12%), conversion rate (target 20% of clickers = 570 conversions).",
      timeline: "2-week campaign execution + 2-week monitoring",
      budget: "$8,540 (discount costs + SMS fees + creative)"
    },
    nextSteps: [
      {
        step: "Lapsed Customer Segment Build & Campaign Setup",
        description: "Create Klaviyo segment: Last purchase 180-365 days ago, exclude current campaign recipients. Expected: 2,847 customers. Design email template with 20% discount code WELCOME BACK20. Set up SMS flow for non-openers (Day 7 trigger).",
        owner: "CRM Manager"
      },
      {
        step: "Campaign Launch & Multi-Touch Execution",
        description: "Week 1: Send email to all 2,847 lapsed customers. Week 2: SMS to non-openers (~2,050 estimated). Monitor daily: opens, clicks, conversions. Product recommendations based on previous purchase history.",
        owner: "Email Marketing Lead"
      },
      {
        step: "Performance Tracking & Reactivation Analysis",
        description: "Track 30-day results: total reactivations (target 570), revenue generated ($84,210 target), AOV ($142 target), channel comparison (email vs SMS effectiveness). Measure 90-day retention of reactivated customers. Calculate LTV impact and ROI.",
        owner: "Analytics Team"
      },
      {
        step: "Ongoing Win-Back Flow Automation",
        description: "Build automated win-back flow: triggers at 180 days of inactivity. 3-touch series: Day 180 (email), Day 187 (SMS), Day 200 (final offer). Prevent manual campaign need in future. Set up quarterly lapsed customer reports.",
        owner: "CRM Manager"
      }
    ],
    potentialOutcomes: {
      bestCase: "$112,800 revenue if 22% reactivation rate (627 customers) at $180 AOV, strong SMS performance drives higher engagement",
      expected: "$84,210 revenue from 570 reactivations at $142 AOV, 20% reactivation rate, automated win-back flow prevents future lapsed customer buildup",
      metrics: [
        "Reactivation rate (% of 2,847 converting)",
        "Revenue generated from win-back campaign",
        "Email vs SMS channel effectiveness",
        "Average order value of reactivated customers",
        "90-day retention rate of reactivated segment",
        "Campaign ROI (revenue vs discount costs)"
      ]
    }
  };

  const lowHangingFruitBrief: DetailedBriefData = {
    title: "Win-Back Flow Subject Line A/B Test Optimization",
    category: "Low Hanging Fruit · Email Optimization",
    overview: "Current win-back email flow has 28% open rate - 10 percentage points below 38% industry benchmark. Subject line 'Come back and save 15%' is discount-focused but not emotionally compelling. A/B testing subject lines with emotional hooks ('We miss you' vs current discount-led) expected to increase open rate 12% (28% → 40%). Higher opens drive proportional revenue lift: +$6,400 projected monthly revenue from improved email engagement. Easy 2-day implementation in Klaviyo.",
    goals: [
      "Increase win-back email open rate from 28% to 40% (+12 percentage points) through subject line optimization",
      "Generate +$6,400 monthly incremental revenue from higher email engagement",
      "Validate emotional vs discount-focused subject line approach for lapsed customers",
      "Apply learnings to other automated email flows (cart abandonment, browse abandonment)"
    ],
    detailedBrief: {
      challenge: "Win-back flow underperforming on open rate (28% vs 38% benchmark). Current subject line 'Come back and save 15%' is generic discount messaging that blends with promotional clutter. Lapsed customers have inbox fatigue - ignore standard sale emails. Emotional connection more effective for re-engagement than transactional discount offers. Low opens = lost reactivation opportunity even though email content and offer are strong.",
      approach: "A/B test in Klaviyo: Variant A (control): 'Come back and save 15%'. Variant B: 'We miss you - here's 15% off your next order'. Variant C: 'Your favorites are waiting (+ 15% off)'. Split 33/33/33. Run for 14 days (minimum 300 sends per variant for statistical significance). Track: open rate, click rate, conversion rate by variant. Implement winner as permanent subject line.",
      timeline: "2-day setup, 14-day test, 1-day analysis and implementation",
      budget: "$0 (uses existing Klaviyo functionality)"
    },
    nextSteps: [
      {
        step: "Subject Line Variants & A/B Test Setup",
        description: "Create 3 subject line variants in Klaviyo: Control 'Come back and save 15%', Variant B 'We miss you - 15% off', Variant C 'Your favorites are waiting'. Configure A/B test: 33% split, 14-day run time, auto-select winner based on open rate. Set minimum sample size 300 sends per variant.",
        owner: "Email Marketing Manager"
      },
      {
        step: "Test Execution & Real-Time Monitoring",
        description: "Launch A/B test in win-back flow (triggers at 180 days inactivity). Monitor daily: open rates by variant, click rates, conversion rates. Track significance: need minimum 300 sends/variant for valid results. Estimated 14-day runtime to reach significance threshold.",
        owner: "CRM Analyst"
      },
      {
        step: "Results Analysis & Winner Implementation",
        description: "Day 15: Analyze results - winning variant (highest open rate), statistical significance check, revenue impact calculation. Implement winner as permanent subject line. Document learnings: emotional hooks vs discount-focused messaging effectiveness for lapsed segment. Share insights with broader email team.",
        owner: "Email Marketing Manager"
      },
      {
        step: "Apply Learnings to Other Flows",
        description: "Audit other automated flows (cart abandonment, browse abandonment, post-purchase) for subject line optimization opportunities. Test emotional hooks vs transactional messaging in cart abandonment flow (current 24% open rate). Build subject line best practices playbook from test results.",
        owner: "CRM Manager"
      }
    ],
    potentialOutcomes: {
      bestCase: "+$9,200 monthly revenue if emotional subject line drives 45% open rate (+17 pts vs current 28%), strong click-through lift compounds revenue impact",
      expected: "+$6,400 monthly revenue from 40% open rate (+12 pts improvement), winner variant becomes permanent, learnings applied to 3 other email flows for compounding optimization",
      metrics: [
        "Open rate by subject line variant",
        "Click-through rate by variant",
        "Conversion rate by variant",
        "Revenue per email sent (by variant)",
        "Statistical significance of test results",
        "Monthly revenue lift from implemented winner"
      ]
    }
  };

  const strategicSummaryBrief: DetailedBriefData = {
    title: "Strategic Performance Summary & Channel Reallocation Opportunity",
    category: "AI Strategic Summary · Multi-Channel Optimization",
    overview: "Revenue performing well across channels with balanced multi-channel strategy. Meta CPM increased 18% YoY ($14.20 → $16.80) driven by Q4 holiday competition, reducing ROAS efficiency. TikTok showing strong performance with lower CPA ($42 vs Meta $68) and similar ROAS (4.8x both channels). Opportunity: reallocate 15% of Meta budget ($8,400/month) to TikTok to maintain reach while improving blended CAC. Expected impact: -$10.08K CPM cost reduction, +184 incremental conversions at lower CPA, maintain overall ROAS while improving efficiency.",
    goals: [
      "Optimize multi-channel budget allocation based on current CPM trends and CPA performance",
      "Reduce blended customer acquisition cost from $68 to $58 (-15%) through Meta→TikTok shift",
      "Maintain or improve overall ROAS (current 4.8x) while increasing conversion volume",
      "Validate TikTok as scalable primary acquisition channel vs supplementary"
    ],
    detailedBrief: {
      challenge: "Meta CPM inflation (18% increase) driven by Q4 holiday competition from retail brands. Higher CPMs directly impact profitability - same budget generates fewer impressions and conversions. Meta still performing at 4.8x ROAS but CPA rising ($68 vs $58 target). TikTok emerging as efficient alternative: $42 CPA (38% lower than Meta), 4.8x ROAS (equal to Meta), younger audience (18-34) with high engagement. Current TikTok budget conservative ($5,600/month vs Meta $56,000/month = 10% allocation). TikTok creative production efficient - repurpose existing UGC and product videos. Opportunity to shift budget from inflated Meta CPMs to lower-cost TikTok impressions without sacrificing performance.",
      approach: "Phase 1 (Week 1-2): Reduce Meta daily budget from $1,867 to $1,587 (-15% = $280/day = $8,400/month). Monitor Meta performance for any ROAS degradation. Hypothesis: Meta performance maintains at lower spend due to algorithm efficiency prioritization. Phase 2 (Week 1-2 parallel): Increase TikTok daily budget from $187 to $467 (+$280/day = $8,400/month increase, 150% budget growth). Scale existing top-performing TikTok campaigns (UGC product reviews, styling videos). Monitor: CPA stays below $50, ROAS maintains above 4.5x. Phase 3 (Week 3-4): Measure blended results - total conversions (target: maintain or increase), blended CAC (target: reduce to $58), overall ROAS (target: maintain 4.8x+). If TikTok scales successfully, consider additional reallocation in Month 2.",
      timeline: "4-week test period with weekly optimization checkpoints",
      budget: "$0 net change (reallocate existing $8,400 from Meta to TikTok)"
    },
    nextSteps: [
      {
        step: "Meta Budget Reduction & Performance Monitoring",
        description: "Reduce Meta daily budget $1,867 → $1,587 (-$280/day). Monitor Week 1-2: ROAS (maintain >4.5x), CPA (acceptable up to $72), conversion volume (expect -15% reduction ~80 conversions/month). If ROAS drops below 4.3x, pause reallocation and reassess. Track frequency and CPM trends.",
        owner: "Paid Social Manager"
      },
      {
        step: "TikTok Budget Increase & Campaign Scaling",
        description: "Increase TikTok daily budget $187 → $467 (+$280/day, 150% growth). Scale top-performing campaigns: UGC product reviews, styling tutorials, unboxing videos. Launch 2 new campaigns: Spring Collection preview, sustainable fashion education. Monitor: CPA <$50, ROAS >4.5x, creative fatigue (refresh every 7 days).",
        owner: "TikTok Specialist"
      },
      {
        step: "Creative Production for TikTok Scale",
        description: "Produce 12 new TikTok videos to support budget increase (avoid creative fatigue). Repurpose existing: customer testimonials, product flat-lays, styling clips. Commission 3 new influencer UGC videos ($600 budget). Maintain authentic TikTok aesthetic (raw, behind-scenes) vs overly polished Meta creative.",
        owner: "Creative Team"
      },
      {
        step: "Blended Performance Analysis & Optimization",
        description: "Week 4: Analyze blended results - total conversions (Meta + TikTok combined, target: maintain or grow), blended CAC (target: $58 from $68), overall ROAS (target: 4.8x+), revenue impact (+$24,000 target from improved CAC efficiency). If successful, recommend additional 10% Meta→TikTok shift in Month 2. Document learnings for future channel allocation decisions.",
        owner: "Performance Marketing Lead"
      }
    ],
    potentialOutcomes: {
      bestCase: "Blended CAC reduces to $54 (-21%), TikTok scales efficiently to $15K/month budget, overall conversions increase 12% despite lower total ad spend, ROAS improves to 5.2x",
      expected: "Blended CAC reduces from $68 to $58 (-15%), maintain overall 4.8x ROAS, +184 incremental conversions from TikTok growth, Meta performance stable despite budget cut, +$24,000 monthly revenue from improved efficiency",
      metrics: [
        "Meta: ROAS, CPA, conversion volume (before vs after budget cut)",
        "TikTok: ROAS, CPA, conversion volume (before vs after scale)",
        "Blended: total CAC, total conversions, total ROAS",
        "Revenue impact from improved CAC efficiency",
        "Creative performance by platform (engagement, CTR)",
        "Audience overlap between Meta and TikTok"
      ]
    }
  };

  const nextBestActionBrief: DetailedBriefData = {
    title: "Priority Action Plan - Revenue Acceleration Opportunities",
    category: "Next Best Action · Tactical Execution",
    overview: "Three high-priority actions identified for immediate revenue impact: (1) Meta-to-TikTok budget shift (15% reallocation = -$10K CAC reduction), (2) Easter campaign launch (brief ready, $42K revenue opportunity), (3) Silk Midi Dress restock (forecasted sellout in 4 days, $18K revenue at risk). Combined estimated revenue impact: +$24,000 for current period through improved efficiency, captured demand, and seasonal opportunity execution. All three actions have clear execution paths and proven performance models.",
    goals: [
      "Execute 3 priority actions within 14-day window to capture time-sensitive revenue opportunities",
      "Priority 1: Reduce Meta 15%, increase TikTok 25% - improve blended CAC from $68 to $58",
      "Priority 2: Launch Easter campaign (May 5-12) - target $42K revenue at 5.2x ROAS",
      "Priority 3: Restock Silk Midi Dress by May 2 - prevent $18K revenue loss from sellout"
    ],
    detailedBrief: {
      challenge: "Multiple time-sensitive opportunities requiring prioritization and coordinated execution. Priority 1 (Meta→TikTok): Meta CPM inflation reducing efficiency, TikTok ready to scale. Delay = continued CPM waste. Priority 2 (Easter): Campaign brief finalized but not launched, Easter window May 5-12 (7 days). Delay = missed seasonal revenue. Priority 3 (Silk Midi Dress): Best-seller selling 12 units/day, 48 units in stock, 4-day sellout forecast. Stockout = lost sales + customer frustration. All three actions have interdependencies: Easter campaign needs ad budget (relates to Meta/TikTok allocation), Silk Midi Dress is hero product in Easter creative (restock timing critical).",
      approach: "Parallel execution with coordination: Day 1-2: Action 1 (Meta/TikTok) - adjust budgets immediately, monitor 48hr performance. Action 3 (Silk Midi Dress) - expedite restock order (air freight if needed), ETA May 2. Action 2 (Easter) - finalize creative featuring Silk Midi Dress, schedule campaign launch May 5. Day 3-7: Monitor Meta/TikTok performance, ensure dress restock arrives. Day 5: Launch Easter campaign with hero product (Silk Midi Dress) in stock and ready. Day 8-14: Optimize Easter campaign daily, track Meta/TikTok blended performance, monitor Silk Midi Dress velocity post-restock.",
      timeline: "14-day coordinated execution (Days 1-2 setup, Days 3-7 preparation, Days 8-14 campaign live + optimization)",
      budget: "$8,400 reallocated (Meta to TikTok), $12,600 Easter campaign budget, $4,200 Silk Midi Dress expedited restock"
    },
    nextSteps: [
      {
        step: "Priority 1: Meta Budget Reduction & TikTok Scale (Immediate)",
        description: "Reduce Meta daily budget $1,867 → $1,587 (-15%). Increase TikTok daily budget $187 → $467 (+150%). Monitor 48-hour performance: Meta ROAS >4.5x, TikTok CPA <$50. Quick adjustment window allows time for Easter campaign allocation planning. Coordinate with Easter campaign budget (ensure sufficient budget for both channels).",
        owner: "Paid Social Manager"
      },
      {
        step: "Priority 3: Silk Midi Dress Expedited Restock (Days 1-5)",
        description: "Contact supplier: order 240 units (20-day supply at 12 units/day velocity), request air freight for May 2 delivery (vs standard May 12 sea freight). Cost: +$800 expedite fee justified by $18K revenue protection. Update Shopify inventory, notify customer service of restock date. Add 'Back in Stock' email campaign to waitlist (estimated 142 customers).",
        owner: "Inventory Manager + E-commerce"
      },
      {
        step: "Priority 2: Easter Campaign Launch Preparation (Days 1-5)",
        description: "Finalize Easter campaign creative: Feature Silk Midi Dress as hero product (ensure restock timing aligns), pastel color palette, spring messaging 'Easter Edit', gift-giving angle. Set up Meta + TikTok + Email campaigns. Budget allocation: Meta $5,040, TikTok $2,520, Email $0 (owned channel). Schedule launch May 5 (post-restock). Prep: product photography with Silk Midi Dress, email templates, ad creative variants.",
        owner: "Campaign Manager + Creative Team"
      },
      {
        step: "Coordinated Execution & Daily Optimization (Days 5-14)",
        description: "May 5: Launch Easter campaign across Meta, TikTok, Email. May 5-12: Daily optimization - monitor Silk Midi Dress velocity (restock performing?), Easter campaign ROAS (target 5.2x), Meta/TikTok blended CAC (target $58). Make real-time adjustments: shift budget to top-performing channels, refresh creative if fatigue, extend Easter campaign if performing above target. May 13: Campaign wrap, performance analysis, document learnings for next seasonal campaign.",
        owner: "Performance Marketing Lead"
      }
    ],
    potentialOutcomes: {
      bestCase: "+$32,400 total revenue impact: Meta/TikTok efficiency gains (+$8,400), Easter campaign exceeds target ($48K vs $42K), Silk Midi Dress restock sells through in 12 days (+$21,600), all actions compound for exceptional month",
      expected: "+$24,000 total revenue impact: CAC reduction saves $10K in wasted spend, Easter campaign hits $42K target at 5.2x ROAS, Silk Midi Dress restock prevents $18K loss + generates incremental $6K from waitlist demand",
      metrics: [
        "Meta/TikTok blended CAC improvement (target: $68 → $58)",
        "Easter campaign revenue & ROAS (target: $42K at 5.2x)",
        "Silk Midi Dress: restock sell-through rate, waitlist conversion rate",
        "Total period revenue vs plan",
        "Execution timeline adherence (14-day window)",
        "Cross-priority coordination effectiveness"
      ]
    }
  };

  return (
    <div>
      <PageHeader
        label="Strategy · Command Center"
        title="Unified Growth Dashboard"
        description="Real-time intelligence across all channels, campaigns, and customer touchpoints. Your mission control for data-driven decision making."
        backgroundGradient="multi"
        image={femmeHero}
        externalLinks={[
          { name: "Shopify Admin", url: "https://shopify.com" },
          { name: "Google Analytics", url: "https://analytics.google.com" },
        ]}
        stats={[
          { label: "Active Campaigns", value: "8" },
          { label: "Q1 Revenue Growth", value: "+24.6%" },
          { label: "Blended ROAS", value: "4.8x" },
          { label: "Active Channels", value: "6" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        {/* Performance Alerts Badge */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[var(--terra)] animate-pulse" />
              <span className="text-[14px] font-medium text-[var(--text-primary)]">
                {performanceAlerts.filter(a => a.severity === "high").length} High Priority Alerts
              </span>
              <span className="text-[13px] text-[var(--text-secondary)]">
                • {performanceAlerts.filter(a => a.severity === "medium").length} Medium Priority
              </span>
            </div>
            <button
              onClick={() => setShowAlerts(!showAlerts)}
              className="px-4 py-2 bg-[var(--terra-light)] text-[var(--terra)] rounded-[var(--radius-md)] hover:bg-[var(--terra)] hover:text-white transition-colors text-[13px] font-medium flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              {showAlerts ? "Hide Alerts" : "View All Alerts"}
            </button>
          </div>

          {/* Alerts Dropdown */}
          {showAlerts && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {performanceAlerts.map((alert, index) => {
                const severityConfig = {
                  high: { color: "var(--terra)", bg: "var(--terra-light)", icon: AlertTriangleIcon },
                  medium: { color: "var(--pink-dark)", bg: "var(--pink-light)", icon: AlertCircle },
                }[alert.severity];

                const Icon = severityConfig.icon;

                return (
                  <div key={index} className="flex items-start gap-3 p-4 border border-[var(--border-color)] rounded-[var(--radius-lg)] bg-white hover:border-[var(--border-strong)] transition-colors">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: severityConfig.bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: severityConfig.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag variant={alert.severity === "high" ? "terra" : "pink"}>{alert.category}</Tag>
                        <span
                          className="text-[10px] uppercase tracking-wider font-medium"
                          style={{ fontFamily: "var(--font-mono)", color: severityConfig.color }}
                        >
                          {alert.severity} priority
                        </span>
                      </div>
                      <p className="text-[14px] text-[var(--text-primary)] leading-relaxed">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* AI Widget */}
        <AIWidget
          insightLabel="Latest Insight"
          insightText="Email revenue is your highest-ROI channel this month (+32%). Win-back segment has grown 340 customers. Recommend: double-points loyalty event tied to new arrivals drop."
        />

      <FilterBar />

      {/* Key Metrics Grid */}
      <StatGrid columns={4}>
        <MetricCard
          label={metrics.metric1.label}
          value={metrics.metric1.value}
          change="+8.7%"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label={metrics.metric2.label}
          value={metrics.metric2.value}
          change="+3.2%"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label={metrics.metric3.label}
          value={metrics.metric3.value}
          change="-0.4%"
          changeType="negative"
          trend="down"
        />
        <MetricCard
          label={metrics.metric4.label}
          value={metrics.metric4.value}
          change="+12.4%"
          changeType="positive"
          trend="up"
        />
      </StatGrid>

      {/* Channel Health Scorecard */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-[var(--green)]" />
          <CardTitle>Channel Health Scorecard</CardTitle>
        </div>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Real-time performance vs. targets</p>
        <div className="grid grid-cols-6 gap-4">
          {channelHealth.map((channel, index) => {
            const statusConfig = {
              healthy: { color: "var(--green)", bg: "var(--green-light)", icon: CheckCircle },
              warning: { color: "var(--terra)", bg: "var(--terra-light)", icon: AlertTriangleIcon },
              critical: { color: "var(--pink-dark)", bg: "var(--pink-light)", icon: XCircle },
            }[channel.status];

            const StatusIcon = statusConfig.icon;

            return (
              <div key={index} className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: statusConfig.bg }}
                  >
                    <StatusIcon className="w-4 h-4" style={{ color: statusConfig.color }} />
                  </div>
                  <div className="text-[20px] font-bold" style={{ fontFamily: "var(--font-serif)", color: statusConfig.color }}>
                    {channel.score}
                  </div>
                </div>
                <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">{channel.channel}</div>
                <div className="text-[11px] text-[var(--text-tertiary)] mb-2">{channel.metric}</div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[var(--text-tertiary)]">Target: {channel.target}</span>
                  <span style={{ color: statusConfig.color }}>
                    {channel.score >= channel.target ? "↑" : "↓"} {Math.abs(channel.score - channel.target)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 3-Part Action Strip */}
      <ActionStrip
        data={actionStripData}
        onSilverBulletClick={() => setShowSilverBulletModal(true)}
        onLowHangingFruitClick={() => setShowLowHangingFruitModal(true)}
      />

      {/* Quick Actions & Real-Time Activity */}
      <div className="grid grid-cols-3 gap-6">
        {/* Quick Actions Widget */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>Quick Actions</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">One-click shortcuts</p>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (action.action === "campaign") {
                      setShowCreateCampaignModal(true);
                    }
                  }}
                  className="flex flex-col items-center justify-center p-4 border border-[var(--border-color)] rounded-[var(--radius-lg)] hover:border-[var(--border-strong)] hover:shadow-md transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${action.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: action.color }} />
                  </div>
                  <span className="text-[12px] font-medium text-[var(--text-primary)] text-center">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Real-Time Activity Feed */}
        <Card className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[var(--green)]" />
            <CardTitle>Real-Time Activity Feed</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Recent important events</p>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              const typeConfig = {
                success: { color: "var(--green)", bg: "var(--green-light)" },
                warning: { color: "var(--terra)", bg: "var(--terra-light)" },
                info: { color: "var(--pink)", bg: "var(--pink-light)" },
              }[activity.type];

              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: typeConfig.bg }}
                  >
                    <Icon className="w-4 h-4" style={{ color: typeConfig.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] text-[var(--text-primary)] leading-relaxed mb-1">
                      {activity.event}
                    </div>
                    <div className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                      {activity.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* AI Insights Section */}
      <div className="grid grid-cols-2 gap-6">
        <AIInsightCard
          title="AI Strategic Summary"
          content={`Revenue is ${multiplier > 1 ? "tracking strong" : multiplier < 0.5 ? "building momentum" : "performing well"} for the ${dateRangeLabels[dateRange].toLowerCase()} period. ${channel !== "all" ? `${channel.replace("-", " ")} channel shows focused performance.` : "Multi-channel strategy is balanced."} Meta CPM has increased 18% — consider shifting budget to TikTok (lower CPA, similar ROAS).`}
          showButton={true}
          onButtonClick={() => setShowStrategicSummaryModal(true)}
        />
        <AIInsightCard
          title="Next Best Action"
          content={`Priority 1: Reduce Meta spend by 15%, increase TikTok by 25%. Priority 2: Launch Easter campaign (brief ready). Priority 3: Restock Silk Midi Dress (forecast sellout in 4 days). Estimated revenue impact: +$${Math.round(24000 * multiplier).toLocaleString()} for this period.`}
          variant="accent"
          showButton={true}
          onButtonClick={() => setShowNextBestActionModal(true)}
        />
      </div>

      {/* Priority Actions - Moved here */}
      <Card>
        <CardTitle>Priority Actions</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">AI-ranked by business impact</p>
        <div className="space-y-3">
          {priorities.map((item, index) => {
            const statusConfig = {
              urgent: { color: "var(--terra)", bg: "var(--terra-light)", icon: AlertCircle },
              important: { color: "var(--pink-dark)", bg: "var(--pink-light)", icon: TrendingUp },
              review: { color: "var(--green)", bg: "var(--green-light)", icon: CheckCircle2 },
              ready: { color: "var(--buff-dark)", bg: "var(--buff)", icon: ArrowUpRight },
            }[item.status];

            const Icon = statusConfig.icon;

            return (
              <div key={index} className="flex items-start gap-3 p-4 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: statusConfig.bg }}
                >
                  <Icon className="w-4 h-4" style={{ color: statusConfig.color }} />
                </div>
                <div className="flex-1">
                  <div className="text-[13px] text-[var(--text-primary)] leading-relaxed mb-2">
                    {item.task}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] text-[var(--text-tertiary)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                      Impact: {item.impact}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPriorityAction(item.actionType)}
                  className="px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium whitespace-nowrap flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        <ChartContainer
          title="Revenue vs. Goal"
          subtitle="6-month trend with monthly targets"
          tag={{ label: "Performance", variant: "pink" }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData} id="revenue-goal-chart">
              <CartesianGrid key="grid-revenue-goal" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="xaxis-revenue-goal" dataKey="month" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <YAxis key="yaxis-revenue-goal" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <Tooltip
                key="tooltip-revenue-goal"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}
              />
              <Legend key="legend-revenue-goal" wrapperStyle={{ fontSize: '12px' }} />
              <Area key="area-revenue" type="monotone" dataKey="revenue" stroke="var(--pink)" fill="var(--pink-light)" name="Revenue" id="area-revenue" />
              <Area key="area-goal" type="monotone" dataKey="goal" stroke="var(--green)" fill="var(--green-light)" name="Goal" id="area-goal" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer
          title="Channel Mix"
          subtitle="Revenue attribution by channel"
          tag={{ label: "Attribution", variant: "green" }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart id="channel-mix-chart">
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, value, cx, cy, midAngle, innerRadius, outerRadius }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 25;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="var(--text-primary)"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      style={{ fontSize: '12px' }}
                    >
                      {`${name}: ${value}%`}
                    </text>
                  );
                }}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {channelData.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Charts Row 2 */}
      <ChartContainer
        title="7-Day Performance Snapshot"
        subtitle={`Daily sales and visitor trends — ${dateRangeLabels[dateRange]}`}
        tag={{ label: "Weekly View", variant: "terra" }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyMetrics} id="weekly-performance-chart">
            <CartesianGrid key="grid-weekly" strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis key="xaxis-weekly" dataKey="day" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
            <YAxis key="yaxis-weekly" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
            <Tooltip
              key="tooltip-weekly"
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px'
              }}
            />
            <Legend key="legend-weekly" wrapperStyle={{ fontSize: '12px' }} />
            <Line key="line-sales" type="monotone" dataKey="sales" stroke="var(--pink)" strokeWidth={3} name="Sales ($)" id="line-sales" />
            <Line key="line-visitors" type="monotone" dataKey="visitors" stroke="var(--green-mid)" strokeWidth={3} name="Visitors" id="line-visitors" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardTitle>Top Performing Products</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">{dateRangeLabels[dateRange]} by revenue</p>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-[var(--border-color)] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--surface)] flex items-center justify-center text-[13px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[var(--text-primary)]">{product.name}</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">{Math.round(product.sales * multiplier)} units sold</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    ${(parseInt(product.revenue.replace(/[$,]/g, "")) * multiplier).toLocaleString()}
                  </div>
                  {product.trend === "up" && <TrendingUp className="w-4 h-4 text-[var(--green)]" />}
                  {product.trend === "down" && <TrendingDown className="w-4 h-4 text-[var(--terra)]" />}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Performing Categories */}
        <Card>
          <CardTitle>Top Performing Categories</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">{dateRangeLabels[dateRange]} by revenue</p>
          <div className="space-y-3">
            {topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-[var(--border-color)] last:border-0">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-[var(--green-light)] flex items-center justify-center text-[13px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[var(--text-primary)] mb-0.5">{category.name}</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">
                      {Math.round(category.units * multiplier)} units • {category.margin} margin
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                      ${Math.round(category.revenue * multiplier).toLocaleString()}
                    </div>
                    <div className="text-[11px] text-[var(--green)]">{category.growth}</div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-[var(--green)]" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* New Top Performer Widgets */}
      <div className="grid grid-cols-3 gap-6">
        {/* Top Performing Campaign */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>Top Performing Campaign</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">{dateRangeLabels[dateRange]} by revenue</p>
          <div className="space-y-3">
            {topCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-[var(--border-color)] last:border-0">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-[var(--pink-light)] flex items-center justify-center text-[13px] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[var(--text-primary)] mb-0.5">{campaign.name}</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">
                      {Math.round(campaign.conversions * multiplier)} conversions • {campaign.channel}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    ${Math.round(campaign.revenue * multiplier).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[var(--green)]">{campaign.roas}x ROAS</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Performing Influencer */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[var(--terra)]" />
            <CardTitle>Top Performing Influencer</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">{dateRangeLabels[dateRange]} by EMV</p>
          <div className="space-y-3">
            {topInfluencers.map((influencer, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-[var(--border-color)] last:border-0">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-[var(--terra-light)] flex items-center justify-center text-[13px] font-medium text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[var(--text-primary)] mb-0.5">{influencer.name}</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">
                      {Math.round(influencer.posts * multiplier)} posts • {influencer.engagement}% engagement
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    ${Math.round(influencer.emv * multiplier).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)]">{Math.round(influencer.conversions * multiplier)} conv.</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Performing Google Campaign */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[var(--green)]" />
            <CardTitle>Top Google Campaign</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">{dateRangeLabels[dateRange]} by revenue</p>
          <div className="space-y-3">
            {topGoogleCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-[var(--border-color)] last:border-0">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-[var(--green-light)] flex items-center justify-center text-[13px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[var(--text-primary)] mb-0.5">{campaign.name}</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">
                      {Math.round(campaign.conversions * multiplier)} conversions • {campaign.type}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    ${Math.round(campaign.revenue * multiplier).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[var(--green)]">{campaign.roas}x ROAS</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Assistant Module */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-[var(--pink)]" />
          <CardTitle>AI Assistant</CardTitle>
        </div>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Ask me anything about your data, campaigns, or strategy</p>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="e.g., 'What's driving the increase in Meta CPM?' or 'Show me top products from email campaigns'"
            className="flex-1 px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all"
          />
          <button className="px-6 py-3 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium whitespace-nowrap flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Ask
          </button>
        </div>
      </Card>
      </div>

      <CreateCampaignModal
        show={showCreateCampaignModal}
        onClose={() => setShowCreateCampaignModal(false)}
        onSubmit={handleCreateCampaign}
      />

      <PriorityActionModal
        show={selectedPriorityAction !== null}
        onClose={() => setSelectedPriorityAction(null)}
        actionType={selectedPriorityAction}
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

      <DetailedBriefModal
        show={showStrategicSummaryModal}
        onClose={() => setShowStrategicSummaryModal(false)}
        data={strategicSummaryBrief}
      />

      <DetailedBriefModal
        show={showNextBestActionModal}
        onClose={() => setShowNextBestActionModal(false)}
        data={nextBestActionBrief}
      />
    </div>
  );
}