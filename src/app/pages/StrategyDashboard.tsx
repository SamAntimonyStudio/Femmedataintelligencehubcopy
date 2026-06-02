import { useMemo, useState } from "react";
import { Card, CardTitle, MetricCard, Tag, AIInsightCard } from "../components/ui/Card";
import { FilterBar, StatGrid, ChartContainer } from "../components/ui/Filters";
import { useFilters } from "../context/FilterContext";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, ArrowUpRight, Target, Award, Megaphone, Plus, Calendar as CalendarIcon, Bell, BarChart3, Zap, CheckCircle, XCircle, AlertTriangle as Al[...]
} from "lucide-react";
import { AIWidget } from "../components/AIWidget";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import { DetailedBriefModal, DetailedBriefData } from "../components/DetailedBriefModal";
import PageHeader from "../components/PageHeader";
// Image imports commented out to fix build - images not found in repository
// import femmeHero from "../../imports/kp525903_1_v1639125496333876102_750x750_1.jpg";
const femmeHero = "https://via.placeholder.com/1200x400?text=Strategy+Dashboard";
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
    overview: "2,847 lapsed customers (no purchase in 180+ days) represent $427K in dormant LTV. Historical win-back campaigns achieve 18-22% reactivation with $142 average order value. Targeted [...]",
    goals: [
      "Reactivate 570 of 2,847 lapsed customers (20% target rate) within 30-day campaign window",
      "Generate +$84,210 incremental revenue from reactivated customers ($142 AOV x 570 conversions)",
      "Rebuild engagement with dormant customer segment and prevent permanent churn",
      "Test SMS channel effectiveness for win-back vs email-only approach"
    ],
    detailedBrief: {
      challenge: "2,847 customers inactive for 180+ days representing significant dormant revenue opportunity. Lapsed customers have high brand awareness but lost purchase habit - need compelling[...]",
      approach: "Multi-channel win-back campaign: Week 1: Email with subject 'We miss you' + 20% exclusive discount code. Week 2: SMS follow-up to non-openers 'Your 20% off is waiting'. Feature n[...]",
      timeline: "2-week campaign execution + 2-week monitoring",
      budget: "$8,540 (discount costs + SMS fees + creative)"
    },
    nextSteps: [
      {
        step: "Lapsed Customer Segment Build & Campaign Setup",
        description: "Create Klaviyo segment: Last purchase 180-365 days ago, exclude current campaign recipients. Expected: 2,847 customers. Design email template with 20% discount code WELCOME [...]",
        owner: "CRM Manager"
      },
      {
        step: "Campaign Launch & Multi-Touch Execution",
        description: "Week 1: Send email to all 2,847 lapsed customers. Week 2: SMS to non-openers (~2,050 estimated). Monitor daily: opens, clicks, conversions. Product recommendations based on [...]",
        owner: "Email Marketing Lead"
      },
      {
        step: "Performance Tracking & Reactivation Analysis",
        description: "Track 30-day results: total reactivations (target 570), revenue generated ($84,210 target), AOV ($142 target), channel comparison (email vs SMS effectiveness). Measure 90-da[...]",
        owner: "Analytics Team"
      },
      {
        step: "Ongoing Win-Back Flow Automation",
        description: "Build automated win-back flow: triggers at 180 days of inactivity. 3-touch series: Day 180 (email), Day 187 (SMS), Day 200 (final offer). Prevent manual campaign need in fut[...]",
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
    overview: "Current win-back email flow has 28% open rate - 10 percentage points below 38% industry benchmark. Subject line 'Come back and save 15%' is discount-focused but not emotionally com[...]",
    goals: [
      "Increase win-back email open rate from 28% to 40% (+12 percentage points) through subject line optimization",
      "Generate +$6,400 monthly incremental revenue from higher email engagement",
      "Validate emotional vs discount-focused subject line approach for lapsed customers",
      "Apply learnings to other automated email flows (cart abandonment, browse abandonment)"
    ],
    detailedBrief: {
      challenge: "Win-back flow underperforming on open rate (28% vs 38% benchmark). Current subject line 'Come back and save 15%' is generic discount messaging that blends with promotional clutt[...]",
      approach: "A/B test in Klaviyo: Variant A (control): 'Come back and save 15%'. Variant B: 'We miss you - here's 15% off your next order'. Variant C: 'Your favorites are waiting (+ 15% off)'[...]",
      timeline: "2-day setup, 14-day test, 1-day analysis and implementation",
      budget: "$0 (uses existing Klaviyo functionality)"
    },
    nextSteps: [
      {
        step: "Subject Line Variants & A/B Test Setup",
        description: "Create 3 subject line variants in Klaviyo: Control 'Come back and save 15%', Variant B 'We miss you - 15% off', Variant C 'Your favorites are waiting'. Configure A/B test: 3[...]",
        owner: "Email Marketing Manager"
      },
      {
        step: "Test Execution & Real-Time Monitoring",
        description: "Launch A/B test in win-back flow (triggers at 180 days inactivity). Monitor daily: open rates by variant, click rates, conversion rates. Track significance: need minimum 300[...]",
        owner: "CRM Analyst"
      },
      {
        step: "Results Analysis & Winner Implementation",
        description: "Day 15: Analyze results - winning variant (highest open rate), statistical significance check, revenue impact calculation. Implement winner as permanent subject line. Docume[...]",
        owner: "Email Marketing Manager"
      },
      {
        step: "Apply Learnings to Other Flows",
        description: "Audit other automated flows (cart abandonment, browse abandonment, post-purchase) for subject line optimization opportunities. Test emotional hooks vs transactional messagin[...]",
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
    overview: "Revenue performing well across channels with balanced multi-channel strategy. Meta CPM increased 18% YoY ($14.20 → $16.80) driven by Q4 holiday competition, reducing ROAS efficie[...]",
    goals: [
      "Optimize multi-channel budget allocation based on current CPM trends and CPA performance",
      "Reduce blended customer acquisition cost from $68 to $58 (-15%) through Meta→TikTok shift",
      "Maintain or improve overall ROAS (current 4.8x) while increasing conversion volume",
      "Validate TikTok as scalable primary acquisition channel vs supplementary"
    ],
    detailedBrief: {
      challenge: "Meta CPM inflation (18% increase) driven by Q4 holiday competition from retail brands. Higher CPMs directly impact profitability - same budget generates fewer impressions and co[...]",
      approach: "Phase 1 (Week 1-2): Reduce Meta daily budget from $1,867 to $1,587 (-15% = $280/day = $8,400/month). Monitor Meta performance for any ROAS degradation. Hypothesis: Meta performan[...]",
      timeline: "4-week test period with weekly optimization checkpoints",
      budget: "$0 net change (reallocate existing $8,400 from Meta to TikTok)"
    },
    nextSteps: [
      {
        step: "Meta Budget Reduction & Performance Monitoring",
        description: "Reduce Meta daily budget $1,867 → $1,587 (-$280/day). Monitor Week 1-2: ROAS (maintain >4.5x), CPA (acceptable up to $72), conversion volume (expect -15% reduction ~80 con[...]",
        owner: "Paid Social Manager"
      },
      {
        step: "TikTok Budget Increase & Campaign Scaling",
        description: "Increase TikTok daily budget $187 → $467 (+$280/day, 150% growth). Scale top-performing campaigns: UGC product reviews, styling tutorials, unboxing videos. Launch 2 new ca[...]",
        owner: "TikTok Specialist"
      },
      {
        step: "Creative Production for TikTok Scale",
        description: "Produce 12 new TikTok videos to support budget increase (avoid creative fatigue). Repurpose existing: customer testimonials, product flat-lays, styling clips. Commission 3 n[...]",
        owner: "Creative Team"
      },
      {
        step: "Blended Performance Analysis & Optimization",
        description: "Week 4: Analyze blended results - total conversions (Meta + TikTok combined, target: maintain or grow), blended CAC (target: $58 from $68), overall ROAS (target: 4.8x+), rev[...]",
        owner: "Performance Marketing Lead"
      }
    ],
    potentialOutcomes: {
      bestCase: "Blended CAC reduces to $54 (-21%), TikTok scales efficiently to $15K/month budget, overall conversions increase 12% despite lower total ad spend, ROAS improves to 5.2x",
      expected: "Blended CAC reduces from $68 to $58 (-15%), maintain overall 4.8x ROAS, +184 incremental conversions from TikTok growth, Meta performance stable despite budget cut, +$24,000 mont[...]",
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
    overview: "Three high-priority actions identified for immediate revenue impact: (1) Meta-to-TikTok budget shift (15% reallocation = -$10K CAC reduction), (2) Easter campaign launch (brief rea[...]",
    goals: [
      "Execute 3 priority actions within 14-day window to capture time-sensitive revenue opportunities",
      "Priority 1: Reduce Meta 15%, increase TikTok 25% - improve blended CAC from $68 to $58",
      "Priority 2: Launch Easter campaign (May 5-12) - target $42K revenue at 5.2x ROAS",
      "Priority 3: Restock Silk Midi Dress by May 2 - prevent $18K revenue loss from sellout"
    ],
    detailedBrief: {
      challenge: "Multiple time-sensitive opportunities requiring prioritization and coordinated execution. Priority 1 (Meta→TikTok): Meta CPM inflation reducing efficiency, TikTok ready to sca[...]",
      approach: "Parallel execution with coordination: Day 1-2: Action 1 (Meta/TikTok) - adjust budgets immediately, monitor 48hr performance. Action 3 (Silk Midi Dress) - expedite restock order [...]",
      timeline: "14-day coordinated execution (Days 1-2 setup, Days 3-7 preparation, Days 8-14 campaign live + optimization)",
      budget: "$8,400 reallocated (Meta to TikTok), $12,600 Easter campaign budget, $4,200 Silk Midi Dress expedited restock"
    },
    nextSteps: [
      {
        step: "Priority 1: Meta Budget Reduction & TikTok Scale (Immediate)",
        description: "Reduce Meta daily budget $1,867 → $1,587 (-15%). Increase TikTok daily budget $187 → $467 (+150%). Monitor 48-hour performance: Meta ROAS >4.5x, TikTok CPA <$50. Quick a[...]",
        owner: "Paid Social Manager"
      },
      {
        step: "Priority 3: Silk Midi Dress Expedited Restock (Days 1-5)",
        description: "Contact supplier: order 240 units (20-day supply at 12 units/day velocity), request air freight for May 2 delivery (vs standard May 12 sea freight). Cost: +$800 expedite fee[...]",
        owner: "Inventory Manager + E-commerce"
      },
      {
        step: "Priority 2: Easter Campaign Launch Preparation (Days 1-5)",
        description: "Finalize Easter campaign creative: Feature Silk Midi Dress as hero product (ensure restock timing aligns), pastel color palette, spring messaging 'Easter Edit', gift-giving [...]",
        owner: "Campaign Manager + Creative Team"
      },
      {
        step: "Coordinated Execution & Daily Optimization (Days 5-14)",
        description: "May 5: Launch Easter campaign across Meta, TikTok, Email. May 5-12: Daily optimization - monitor Silk Midi Dress velocity (restock performing?), Easter campaign ROAS (target[...]",
        owner: "Performance Marketing Lead"
      }
    ],
    potentialOutcomes: {
      bestCase: "+$32,400 total revenue impact: Meta/TikTok efficiency gains (+$8,400), Easter campaign exceeds target ($48K vs $42K), Silk Midi Dress restock sells through in 12 days (+$21,600),[...]",
      expected: "+$24,000 total revenue impact: CAC reduction saves $10K in wasted spend, Easter campaign hits $42K target at 5.2x ROAS, Silk Midi Dress restock prevents $18K loss + generates inc[...]",
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
              className="px-4 py-2 bg-[var(--terra-light)] text-[var(--terra)] rounded-[var(--radius-md)] hover:bg-[var(--terra)] hover:text-white transition-colors text-[13px] font-medium flex i[...]"
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
                  <div key={index} className="flex items-start gap-3 p-4 border border-[var(--border-color)] rounded-[var(--radius-lg)] bg-white hover:border-[var(--border-strong)] transition-col[...]"
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

      {/* Channel Health Scorecard - Remaining components truncated for brevity */}
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

      {/* Modals */}
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
    </div>
  );
}
