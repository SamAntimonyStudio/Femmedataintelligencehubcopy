import { useState, useMemo } from "react";
import { Card, CardTitle, AIInsightCard, Tag } from "../components/ui/Card";
import { FilterBar } from "../components/ui/Filters";
import { Calendar, Target, Lightbulb, CheckCircle2, Clock, AlertCircle, ChevronLeft, ChevronRight, Zap, Edit2, TrendingUp, DollarSign, Users as UsersIcon, BarChart3, PieChart } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { AIWidget } from "../components/AIWidget";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import { DetailedBriefModal, DetailedBriefData } from "../components/DetailedBriefModal";
const gtmHero = "https://placehold.co/750x750?text=gtmHero";
import { useFilters } from "../context/FilterContext";
import { BarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const campaigns = [
  { name: "Winter Sale - Q1", status: "Completed", timeline: "Jan 15 - Jan 31", startDate: "2026-01-15", endDate: "2026-01-31", budget: "$18,400", channels: ["Meta", "Email", "Google"], objectives: ["Clear winter inventory"], kpis: { roas: "3.8x", conversions: "620", reach: "180K" }, revenue: "$69,920", actualRoas: "3.8x", performance: { impressions: "1.8M", clicks: "42.6K", ctr: "2.37%", cpc: "$0.43", conversions: 620, conversionRate: "1.46%", roas: "3.8x" } },
  { name: "Galentine's Day Celebration", status: "Completed", timeline: "Feb 10 - Feb 13", startDate: "2026-02-10", endDate: "2026-02-13", budget: "$6,200", channels: ["Instagram", "TikTok", "Email"], objectives: ["Community building", "Valentine's alternative"], kpis: { roas: "4.3x", conversions: "220", reach: "68K" }, revenue: "$26,660", actualRoas: "4.3x", performance: { impressions: "684K", clicks: "14.8K", ctr: "2.16%", cpc: "$0.42", conversions: 220, conversionRate: "1.49%", roas: "4.3x" } },
  { name: "Valentine's Day", status: "Completed", timeline: "Feb 7 - Feb 14", startDate: "2026-02-07", endDate: "2026-02-14", budget: "$9,800", channels: ["Meta", "Pinterest", "Email"], objectives: ["Gift purchases"], kpis: { roas: "4.6x", conversions: "340", reach: "95K" }, revenue: "$45,080", actualRoas: "4.6x", performance: { impressions: "952K", clicks: "21.4K", ctr: "2.25%", cpc: "$0.46", conversions: 340, conversionRate: "1.59%", roas: "4.6x" } },
  { name: "International Women's Day", status: "Completed", timeline: "Mar 5 - Mar 8", startDate: "2026-03-05", endDate: "2026-03-08", budget: "$7,800", channels: ["Instagram", "Email", "TikTok"], objectives: ["Brand values", "Female empowerment"], kpis: { roas: "3.9x", conversions: "280", reach: "92K" }, revenue: "$30,420", actualRoas: "3.9x", performance: { impressions: "924K", clicks: "18.2K", ctr: "1.97%", cpc: "$0.43", conversions: 280, conversionRate: "1.54%", roas: "3.9x" } },
  { name: "Autumn Launch", status: "Completed", timeline: "Mar 1 - Mar 15", startDate: "2026-03-01", endDate: "2026-03-15", budget: "$14,200", channels: ["Meta", "TikTok", "Instagram"], objectives: ["New arrivals", "Brand awareness"], kpis: { roas: "4.1x", conversions: "480", reach: "140K" }, revenue: "$58,220", actualRoas: "4.1x", performance: { impressions: "1.42M", clicks: "32.6K", ctr: "2.30%", cpc: "$0.44", conversions: 480, conversionRate: "1.47%", roas: "4.1x" } },
  { name: "Easter Collection Launch", status: "Completed", timeline: "Apr 5 - Apr 12", startDate: "2026-04-05", endDate: "2026-04-12", budget: "$8,400", channels: ["Meta", "TikTok", "Email"], objectives: ["Drive awareness", "New collection sales"], kpis: { roas: "4.2x", conversions: "298", reach: "89K" }, revenue: "$35,280", actualRoas: "4.2x", performance: { impressions: "892K", clicks: "18.4K", ctr: "2.06%", cpc: "$0.46", conversions: 298, conversionRate: "1.62%", roas: "4.2x" } },
  { name: "Wedding Season Essentials", status: "In Progress", timeline: "Apr 20 - May 15", startDate: "2026-04-20", endDate: "2026-05-15", budget: "$11,200", channels: ["Pinterest", "Instagram", "Email"], objectives: ["Guest dresses", "Event wear"], kpis: { roas: "4.8x target", conversions: "360-420", reach: "105K+" } },
  { name: "Mother's Day Campaign", status: "Planning", timeline: "May 3 - May 10", startDate: "2026-05-03", endDate: "2026-05-10", budget: "$12,600", channels: ["Meta", "Email", "Google", "Pinterest"], objectives: ["Gift purchases", "AOV increase"], kpis: { roas: "5.0x target", conversions: "420-480", reach: "120K+" } },
  { name: "Resort & Vacation Wear", status: "Planning", timeline: "May 20 - Jun 5", startDate: "2026-05-20", endDate: "2026-06-05", budget: "$10,400", channels: ["Instagram", "TikTok", "Meta"], objectives: ["Summer travel", "Vacation capsules"], kpis: { roas: "4.4x target", conversions: "320-380", reach: "98K+" } },
  { name: "Winter Preview", status: "Ideation", timeline: "Jun 1 - Jun 15", startDate: "2026-06-01", endDate: "2026-06-15", budget: "$13,800", channels: ["TikTok", "Instagram", "Email"], objectives: ["Build anticipation", "Pre-orders"], kpis: { roas: "4.3x target", conversions: "400-460", reach: "115K+" } },
  { name: "Sustainable Fashion Week", status: "Planning", timeline: "Jun 10 - Jun 17", startDate: "2026-06-10", endDate: "2026-06-17", budget: "$9,400", channels: ["Instagram", "TikTok", "Email"], objectives: ["Brand awareness", "Eco-conscious positioning"], kpis: { roas: "4.2x target", conversions: "280-330", reach: "95K+" } },
  { name: "Mid-Year Sale", status: "Planning", timeline: "Jul 1 - Jul 14", startDate: "2026-07-01", endDate: "2026-07-14", budget: "$22,400", channels: ["Meta", "Email", "Google", "TikTok"], objectives: ["Inventory clearance", "Revenue boost"], kpis: { roas: "3.5x target", conversions: "800-900", reach: "220K+" } },
  { name: "Back to Work Collection", status: "Ideation", timeline: "Aug 15 - Aug 31", startDate: "2026-08-15", endDate: "2026-08-31", budget: "$16,800", channels: ["Meta", "Pinterest", "Email"], objectives: ["Workwear promotion"], kpis: { roas: "4.5x target", conversions: "520-580", reach: "150K+" } },
  { name: "Spring Preview Launch", status: "Ideation", timeline: "Sep 1 - Sep 15", startDate: "2026-09-01", endDate: "2026-09-15", budget: "$15,600", channels: ["Meta", "TikTok", "Instagram"], objectives: ["New collection"], kpis: { roas: "4.3x target", conversions: "480-540", reach: "135K+" } },
  { name: "Layering & Cozy Season", status: "Ideation", timeline: "Oct 10 - Oct 20", startDate: "2026-10-10", endDate: "2026-10-20", budget: "$12,400", channels: ["Meta", "Email"], objectives: ["Spring essentials", "Layering pieces"], kpis: { roas: "3.9x target", conversions: "380-420", reach: "110K+" } },
  { name: "Pre-Black Friday Early Access", status: "Ideation", timeline: "Nov 15 - Nov 24", startDate: "2026-11-15", endDate: "2026-11-24", budget: "$14,200", channels: ["Email", "SMS"], objectives: ["VIP rewards", "Early access"], kpis: { roas: "5.4x target", conversions: "420-480", reach: "65K+" } },
  { name: "Black Friday / Cyber Monday", status: "Ideation", timeline: "Nov 25 - Nov 30", startDate: "2026-11-25", endDate: "2026-11-30", budget: "$35,000", channels: ["Meta", "Google", "Email", "TikTok"], objectives: ["Max revenue", "Customer acquisition"], kpis: { roas: "4.8x target", conversions: "1200-1400", reach: "280K+" } },
  { name: "Holiday Gift Guide", status: "Ideation", timeline: "Dec 1 - Dec 24", startDate: "2026-12-01", endDate: "2026-12-24", budget: "$28,600", channels: ["Meta", "Pinterest", "Google", "Email"], objectives: ["Holiday shopping", "Gift sales"], kpis: { roas: "5.2x target", conversions: "980-1100", reach: "240K+" } },
  { name: "New Year New You", status: "Ideation", timeline: "Dec 26 - Jan 5", startDate: "2026-12-26", endDate: "2027-01-05", budget: "$16,400", channels: ["Email", "Instagram", "TikTok"], objectives: ["Fresh start", "Self-care"], kpis: { roas: "4.4x target", conversions: "520-580", reach: "125K+" } },
];

const strategicPriorities = [
  {
    title: "Accelerate TikTok Growth",
    description: "Shift 25% of Meta budget to TikTok. Lower CPA ($42 vs $68) and younger audience alignment.",
    timeline: "Q4 2026",
    owner: "Performance Marketing Team",
    status: "approved",
  },
  {
    title: "Launch SMS Marketing Channel",
    description: "Integrate with Klaviyo, build subscriber base via checkout opt-in and Instagram bio link.",
    timeline: "May 2026",
    owner: "CRM Team",
    status: "in-progress",
  },
  {
    title: "Expand Product Line — Accessories",
    description: "Research shows 38% customer interest in bags, jewelry, and scarves to complement core apparel.",
    timeline: "Q1 2027",
    owner: "Merchandising Team",
    status: "research",
  },
  {
    title: "Influencer Partnership Program",
    description: "Structured creator partnerships with 10-15 micro-influencers (50K-150K followers).",
    timeline: "Ongoing",
    owner: "Marketing Team",
    status: "in-progress",
  },
];

const quarterlyPlansByChannel: Record<string, Array<{
  quarter: string;
  period: string;
  status: "completed" | "in-progress" | "planned";
  progress: number;
  objectives: string[];
  revenue: string;
  campaigns: number;
}>> = {
  gtm: [
    {
      quarter: "Q1 2026",
      period: "Jan - Mar",
      status: "completed",
      progress: 100,
      objectives: [
        "Migrate to Shopify Plus (completed, live in production)",
        "Hire Senior Performance Marketing Manager",
        "Launch Spring collection with 42% margin improvement",
        "Consolidate tech stack: integrate Klaviyo, Yotpo, TikTok Shop"
      ],
      revenue: "$173,220",
      campaigns: 5
    },
    {
      quarter: "Q4 2026",
      period: "Apr - Jun",
      status: "in-progress",
      progress: 32,
      objectives: [
        "TikTok Shop beta launch & integration with product catalogue",
        "Complete brand refresh (new logo, packaging, photography style)",
        "Implement headless CMS for blog & content hub",
        "Expand to 3 new states via wholesale partnerships"
      ],
      revenue: "$198,000 projected",
      campaigns: 6
    },
    {
      quarter: "Q1 2027",
      period: "Jul - Sep",
      status: "planned",
      progress: 0,
      objectives: [
        "Launch accessories line (bags, jewelry, scarves)",
        "Implement real-time inventory sync across all channels",
        "Hire Content Studio Manager + 2 creators",
        "Pilot sustainability certification program"
      ],
      revenue: "$225,000 projected",
      campaigns: 5
    },
    {
      quarter: "Q4 2026",
      period: "Oct - Dec",
      status: "planned",
      progress: 0,
      objectives: [
        "Scale to $2M annual run rate (current: $1.4M)",
        "Launch VIP tier loyalty program with exclusive perks",
        "Open first pop-up retail location in NYC",
        "Finalize Series A fundraising ($3-5M target)"
      ],
      revenue: "$380,000 projected",
      campaigns: 6
    }
  ],
  organic: [
    {
      quarter: "Q1 2026",
      period: "Jan - Mar",
      status: "completed",
      progress: 100,
      objectives: [
        "Reached 48.2K Instagram followers (+18% growth)",
        "TikTok viral campaign: 2.4M views on Spring try-on haul",
        "Implemented consistent 5x/week posting schedule",
        "Partnered with 8 micro-influencers (50K-150K)"
      ],
      revenue: "$54,400",
      campaigns: 3
    },
    {
      quarter: "Q4 2026",
      period: "Apr - Jun",
      status: "in-progress",
      progress: 38,
      objectives: [
        "Launch UGC rewards program (50 submissions/month target)",
        "Hit 65K Instagram followers by end of Q4/2026",
        "Build TikTok to 25K followers (currently 12K)",
        "Develop brand ambassador program (10-15 creators)"
      ],
      revenue: "$68,000 projected",
      campaigns: 4
    },
    {
      quarter: "Q1 2027",
      period: "Jul - Sep",
      status: "planned",
      progress: 0,
      objectives: [
        "Launch YouTube channel for long-form styling content",
        "Pinterest strategy refresh: shoppable pins + seasonal boards",
        "Achieve 5% avg engagement rate (currently 3.8%)",
        "Develop creator toolkit for influencer partnerships"
      ],
      revenue: "$78,000 projected",
      campaigns: 4
    },
    {
      quarter: "Q4 2026",
      period: "Oct - Dec",
      status: "planned",
      progress: 0,
      objectives: [
        "Hit 100K Instagram followers milestone",
        "Launch holiday gift guide with shoppable Instagram posts",
        "Achieve 1M total social reach across platforms",
        "Build community-driven styling guide (customer photos)"
      ],
      revenue: "$95,000 projected",
      campaigns: 5
    }
  ],
  "paid-social": [
    {
      quarter: "Q1 2026",
      period: "Jan - Mar",
      status: "completed",
      progress: 100,
      objectives: [
        "Meta ROAS improved from 3.2x to 4.1x",
        "Reduced Meta CPA from $68 to $52",
        "Tested TikTok Ads: $4,200 spend, 4.8x ROAS",
        "Migrated to Meta Advantage+ campaigns"
      ],
      revenue: "$86,200",
      campaigns: 4
    },
    {
      quarter: "Q4 2026",
      period: "Apr - Jun",
      status: "in-progress",
      progress: 42,
      objectives: [
        "Shift 25% of Meta budget to TikTok (lower CPA)",
        "Launch TikTok Shop integration for in-app checkout",
        "Test Pinterest Ads for wedding/event wear",
        "Implement dynamic product ads across all platforms"
      ],
      revenue: "$102,000 projected",
      campaigns: 5
    },
    {
      quarter: "Q1 2027",
      period: "Jul - Sep",
      status: "planned",
      progress: 0,
      objectives: [
        "Scale TikTok to 30% of paid social budget",
        "Launch lookalike audience campaigns for accessories",
        "Achieve blended 4.5x ROAS across all paid social",
        "Test Snapchat Ads for Gen Z audience"
      ],
      revenue: "$118,000 projected",
      campaigns: 4
    },
    {
      quarter: "Q4 2026",
      period: "Oct - Dec",
      status: "planned",
      progress: 0,
      objectives: [
        "Black Friday/Cyber Monday: $120K revenue target",
        "Launch influencer whitelisting campaigns on Meta",
        "Achieve 5.0x ROAS during holiday season",
        "Scale daily ad spend to $1,200 (currently $650)"
      ],
      revenue: "$165,000 projected",
      campaigns: 6
    }
  ],
  email: [
    {
      quarter: "Q1 2026",
      period: "Jan - Mar",
      status: "completed",
      progress: 100,
      objectives: [
        "Migrated to Klaviyo from Mailchimp",
        "Rebuilt 8 automated flows (welcome, cart, browse, etc.)",
        "Grew email list to 28,400 subscribers (+22%)",
        "Achieved 32.1% open rate, 8.2% click rate"
      ],
      revenue: "$42,800",
      campaigns: 6
    },
    {
      quarter: "Q4 2026",
      period: "Apr - Jun",
      status: "in-progress",
      progress: 35,
      objectives: [
        "Launch SMS channel via Klaviyo (5K subscriber target)",
        "Rebuild abandoned cart flow (23% recovery currently)",
        "Implement sunset flow for inactive subscribers",
        "A/B test send times and subject line formulas"
      ],
      revenue: "$52,000 projected",
      campaigns: 7
    },
    {
      quarter: "Q1 2027",
      period: "Jul - Sep",
      status: "planned",
      progress: 0,
      objectives: [
        "Launch loyalty program integration (points in emails)",
        "Grow email list to 42K subscribers",
        "Achieve 35% open rate, 10% click rate",
        "Build VIP segment with exclusive early access"
      ],
      revenue: "$58,000 projected",
      campaigns: 6
    },
    {
      quarter: "Q4 2026",
      period: "Oct - Dec",
      status: "planned",
      progress: 0,
      objectives: [
        "Holiday email revenue: $85K target (40% of email total)",
        "Launch gift guide email series (8 sends)",
        "SMS subscriber base: 12K (from 5K in Q4/2026)",
        "Implement predictive send time optimisation"
      ],
      revenue: "$95,000 projected",
      campaigns: 10
    }
  ],
  google: [
    {
      quarter: "Q1 2026",
      period: "Jan - Mar",
      status: "completed",
      progress: 100,
      objectives: [
        "Migrated to Performance Max campaigns",
        "Achieved 8.2 avg Quality Score (up from 6.4)",
        "Shopping feed optimisation: 95% product coverage",
        "Reduced CPC from $2.10 to $1.84"
      ],
      revenue: "$32,600",
      campaigns: 3
    },
    {
      quarter: "Q4 2026",
      period: "Apr - Jun",
      status: "in-progress",
      progress: 28,
      objectives: [
        "Launch brand search campaigns to protect brand terms",
        "Test Google Shopping with local inventory ads",
        "Implement smart bidding for seasonal campaigns",
        "Expand to display network for retargeting"
      ],
      revenue: "$42,000 projected",
      campaigns: 4
    },
    {
      quarter: "Q1 2027",
      period: "Jul - Sep",
      status: "planned",
      progress: 0,
      objectives: [
        "Launch YouTube video ads for accessories line",
        "Achieve 5.5x ROAS on Performance Max",
        "Test Google Demand Gen campaigns",
        "Optimise product feed with seasonal attributes"
      ],
      revenue: "$48,000 projected",
      campaigns: 4
    },
    {
      quarter: "Q4 2026",
      period: "Oct - Dec",
      status: "planned",
      progress: 0,
      objectives: [
        "Black Friday shopping campaigns: $65K revenue target",
        "Scale Google Ads budget to $1,800/day (from $800)",
        "Implement holiday gift guide landing pages",
        "Achieve 6.0x ROAS on brand search campaigns"
      ],
      revenue: "$78,000 projected",
      campaigns: 6
    }
  ],
  direct: [
    {
      quarter: "Q1 2026",
      period: "Jan - Mar",
      status: "completed",
      progress: 100,
      objectives: [
        "Website redesign: improved mobile experience (65% → 78% mobile CR)",
        "Implemented site speed optimisations (2.8s → 1.6s load time)",
        "Launched blog for SEO content strategy",
        "Achieved 68.4% returning visitor rate"
      ],
      revenue: "$24,200",
      campaigns: 2
    },
    {
      quarter: "Q4 2026",
      period: "Apr - Jun",
      status: "in-progress",
      progress: 25,
      objectives: [
        "Launch headless CMS for content marketing hub",
        "SEO campaign: rank for 50 fashion keywords (top 10)",
        "Implement live chat & virtual styling consultations",
        "Build quiz funnel for personalized recommendations"
      ],
      revenue: "$28,000 projected",
      campaigns: 3
    },
    {
      quarter: "Q1 2027",
      period: "Jul - Sep",
      status: "planned",
      progress: 0,
      objectives: [
        "Launch affiliate marketing program (20 partners)",
        "Build SEO-optimised category & product pages",
        "Achieve 100K monthly organic site visitors",
        "Implement on-site personalization engine"
      ],
      revenue: "$32,000 projected",
      campaigns: 3
    },
    {
      quarter: "Q4 2026",
      period: "Oct - Dec",
      status: "planned",
      progress: 0,
      objectives: [
        "Holiday traffic target: 280K visitors in Q4",
        "Launch gift finder tool powered by quiz",
        "Achieve 4.2% site-wide conversion rate",
        "Build PR strategy for brand awareness (5 features)"
      ],
      revenue: "$45,000 projected",
      campaigns: 4
    }
  ],
  influencer: [
    {
      quarter: "Q1 2026",
      period: "Jan - Mar",
      status: "completed",
      progress: 100,
      objectives: [
        "Partnered with 8 micro-influencers (EMV: $61,400)",
        "Average engagement rate: 6.1% across partnerships",
        "Implemented influencer tracking codes & affiliate links",
        "Created influencer media kit & partnership guidelines"
      ],
      revenue: "$18,600",
      campaigns: 3
    },
    {
      quarter: "Q4 2026",
      period: "Apr - Jun",
      status: "in-progress",
      progress: 40,
      objectives: [
        "Scale to 15 active influencer partnerships",
        "Launch brand ambassador program (monthly retainer)",
        "Achieve $120K total EMV in Q4/2026",
        "Implement Aspire or similar influencer management platform"
      ],
      revenue: "$24,000 projected",
      campaigns: 4
    },
    {
      quarter: "Q1 2027",
      period: "Jul - Sep",
      status: "planned",
      progress: 0,
      objectives: [
        "Test nano-influencer strategy (5K-20K followers)",
        "Launch influencer gifting program (50 pieces/quarter)",
        "Build UGC library with 200+ customer photos",
        "Achieve 8% avg engagement across partnerships"
      ],
      revenue: "$28,000 projected",
      campaigns: 4
    },
    {
      quarter: "Q4 2026",
      period: "Oct - Dec",
      status: "planned",
      progress: 0,
      objectives: [
        "Holiday influencer push: 25 active partnerships",
        "Launch influencer whitelisting on Meta/TikTok",
        "Achieve $200K total EMV in Q4",
        "Develop creator economy: pay-per-post structure"
      ],
      revenue: "$38,000 projected",
      campaigns: 6
    }
  ],
  loyalty: [
    {
      quarter: "Q1 2026",
      period: "Jan - Mar",
      status: "completed",
      progress: 100,
      objectives: [
        "Launched Yotpo Loyalty program (2,847 active members)",
        "Achieved 42.8% redemption rate on points",
        "Created 3-tier VIP structure (Bronze, Silver, Gold)",
        "Integrated loyalty points in email flows"
      ],
      revenue: "$28,400",
      campaigns: 2
    },
    {
      quarter: "Q4 2026",
      period: "Apr - Jun",
      status: "in-progress",
      progress: 45,
      objectives: [
        "Grow loyalty members to 5,000 by end of Q4/2026",
        "Launch referral program (give $20, get $20)",
        "Implement birthday rewards & anniversary bonuses",
        "Achieve 25% of revenue from loyalty members"
      ],
      revenue: "$35,000 projected",
      campaigns: 3
    },
    {
      quarter: "Q1 2027",
      period: "Jul - Sep",
      status: "planned",
      progress: 0,
      objectives: [
        "Launch VIP exclusive product drops & early access",
        "Implement points-for-reviews incentive program",
        "Build community forum for VIP members",
        "Achieve 8,000 loyalty members by end of Q1/2027"
      ],
      revenue: "$42,000 projected",
      campaigns: 3
    },
    {
      quarter: "Q4 2026",
      period: "Oct - Dec",
      status: "planned",
      progress: 0,
      objectives: [
        "Holiday points boost: 2x points on all purchases",
        "Launch gift card program integrated with loyalty",
        "Achieve 35% of Q4 revenue from loyalty members",
        "Reach 12,000 active loyalty members"
      ],
      revenue: "$58,000 projected",
      campaigns: 4
    }
  ]
};

export default function GTMStrategy() {
  const { channel } = useFilters();
  const [currentMonth, setCurrentMonth] = useState(3); // April 2026 (0-indexed)
  const [currentYear] = useState(2026);
  const [previewCampaign, setPreviewCampaign] = useState<typeof campaigns[0] | null>(null);
  const [showActiveCampaignsTooltip, setShowActiveCampaignsTooltip] = useState(false);
  const [showStrategicTooltip, setShowStrategicTooltip] = useState(false);
  const [showStrategicRecModal, setShowStrategicRecModal] = useState(false);
  const [showSilverBulletModal, setShowSilverBulletModal] = useState(false);
  const [showLowHangingFruitModal, setShowLowHangingFruitModal] = useState(false);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Map "all" channel to "gtm" for quarterly plans
  const planChannel = channel === "all" ? "gtm" : channel;
  const quarterlyPlans = useMemo(() => {
    return quarterlyPlansByChannel[planChannel] || quarterlyPlansByChannel.gtm;
  }, [planChannel]);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getCampaignsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return campaigns.filter(campaign => {
      if (!campaign.startDate || !campaign.endDate) return false;
      return dateStr >= campaign.startDate && dateStr <= campaign.endDate;
    });
  };

  // Action Strip Data
  const actionStripData: ActionStripData = {
    silverBullet: {
      action: "Launch Mother's Day campaign (May 3-10) with gift-focused creative",
      impactLine: "Estimated: $63,000 revenue at 5.0x ROAS target",
      channel: "Meta + Email + Google · Multi-Channel"
    },
    lowHangingFruit: {
      action: "Repurpose Easter campaign creative for May wedding season",
      effortChip: "Easy · 2 days",
      impact: "Save $2,400 production cost · Proven 4.2x ROAS creative",
      channelChip: "Pinterest + Instagram"
    },
    frameworkTasks: [
      { task: "Wedding Season campaign (Apr 20)", status: "In Progress" },
      { task: "Mother's Day planning finalization", status: "Planned" },
      { task: "Q4/2026 budget allocation review", status: "On Track" }
    ]
  };

  const strategicRecBrief: DetailedBriefData = {
    title: "TikTok Shop Integration & Multi-Channel Expansion Strategy",
    category: "AI Strategic Recommendation · Channel Development",
    overview: "Current performance analysis and competitive benchmarking reveal four high-priority growth opportunities: (1) TikTok Shop integration (social commerce), (2) SMS channel launch, (3) Accessories category pilot, (4) Influencer partnership scaling. Combined potential: +$28K monthly revenue through channel diversification and category expansion. All four initiatives backed by strong market signals and competitor validation.",
    goals: [
      "Integrate TikTok Shop for social commerce - estimated +$18K/month from in-app purchases",
      "Launch SMS channel complementing email flows - estimated +25-30% incremental revenue on email base",
      "Test accessories category (jewelry, bags) with limited pilot - high customer interest, low competition",
      "Scale influencer partnerships from current 8 active to 20 - close EMV gap vs category average"
    ],
    detailedBrief: {
      challenge: "Revenue growth plateauing due to channel saturation. Current channels (Meta, Email, Google) mature with limited expansion runway. TikTok traffic strong (12K monthly visitors) but no monetization path - users must leave app to purchase (high friction). Email performing well but SMS adoption low (only 380 SMS subscribers vs 42K email). Category portfolio narrow (apparel-focused) - customer feedback requests accessories. Influencer EMV ($106K annual) 3x lower than category benchmark ($320K) - underutilizing advocacy channel.",
      approach: "Initiative 1: TikTok Shop - apply for TikTok Shop seller account, integrate product catalog, enable in-app checkout. Test with 20 hero SKUs (best-sellers). Initiative 2: SMS - build SMS list via email, checkout opt-ins. Launch 3 flows: welcome, abandoned cart, back-in-stock. Initiative 3: Accessories - pilot 15 SKUs (earrings, necklaces, crossbody bags) sourced from ethical suppliers. Test via email + social, measure demand. Initiative 4: Influencers - recruit 12 additional micro-influencers, focus on sustainable fashion niche.",
      timeline: "12-week rollout (TikTok Shop 4 weeks, SMS 2 weeks, Accessories 6 weeks, Influencers ongoing)",
      budget: "$24,800 (TikTok Shop setup $4,200, SMS platform $1,200, Accessories inventory $15,600, Influencer partnerships $3,800)"
    },
    nextSteps: [
      {
        step: "TikTok Shop Application & Integration",
        description: "Apply for TikTok Shop seller account (approval timeline: 7-14 days). Integrate Shopify product catalog with TikTok Shop. Enable in-app checkout. Upload 20 hero SKUs with optimized product pages. Create TikTok Shop-specific content: product demos, styling videos, customer testimonials. Launch with exclusive TikTok-only promo code (10% off first purchase).",
        owner: "E-commerce Manager + TikTok Specialist"
      },
      {
        step: "SMS Channel Launch & Flow Build",
        description: "Integrate SMS platform (Klaviyo SMS or Attentive). Build SMS subscriber list: email opt-in campaign ('Get early access via SMS'), checkout checkbox, pop-up offer. Target: 2,000 SMS subscribers in 60 days. Create 3 SMS flows: (1) Welcome SMS with discount, (2) Abandoned cart reminder (1hr + 24hr), (3) Back-in-stock alerts for waitlisted items. Compliance: TCPA opt-in language, unsubscribe option.",
        owner: "CRM Manager"
      },
      {
        step: "Accessories Category Pilot & Supplier Sourcing",
        description: "Source ethical accessories suppliers: focus on recycled metals, sustainable materials. Initial order: 15 SKUs (5 earring styles, 5 necklaces, 5 bags) with 20 units each = 300 total units. Pricing: $45-125 range (accessible luxury). Product photography: lifestyle shots showing styling with existing apparel. Launch via email campaign: 'New: Accessories Collection'. Track: sell-through rate, customer feedback, repeat purchase from accessories buyers.",
        owner: "Product Development + Buying Team"
      },
      {
        step: "Influencer Partnership Scaling",
        description: "Recruit 12 new micro-influencers (5-15K followers) in sustainable fashion niche. Outreach via DM + email. Offer: product seeding + $220/post for 2 posts. Focus on authentic UGC creators vs polished influencers. Goal: increase EMV from $106K to $180K annually (70% growth). Track: EMV per influencer, engagement rate, discount code usage, referral traffic.",
        owner: "Influencer Marketing Manager"
      }
    ],
    potentialOutcomes: {
      bestCase: "+$42K monthly revenue if all initiatives exceed targets: TikTok Shop $24K, SMS $12K, Accessories $8K (strong demand), Influencer scaling compounds social proof",
      expected: "+$28K monthly revenue: TikTok Shop $18K (in-app friction reduced), SMS $6K (30% lift on email base), Accessories $4K (pilot validates demand), Influencer EMV growth drives awareness lift",
      metrics: [
        "TikTok Shop: monthly revenue, conversion rate, avg order value",
        "SMS: subscriber growth, flow performance (open, click, conversion rates)",
        "Accessories: sell-through rate, AOV impact, repeat purchase rate",
        "Influencer: total EMV, engagement rate, referral conversions",
        "Blended: total revenue impact, CAC by new channel, ROAS by initiative"
      ]
    }
  };

  const silverBulletBrief: DetailedBriefData = {
    title: "Mother's Day 2026 Campaign Launch",
    category: "Silver Bullet · Seasonal Campaign",
    overview: "Mother's Day campaign (May 3-10) targeting gift purchases with multi-channel activation across Meta, Email, Google, Pinterest. Historical Mother's Day data (2025): $42K revenue at 4.8x ROAS. 2026 target: $63K revenue at 5.0x ROAS through optimized budget allocation and gift-focused creative. Campaign brief finalized, ready to launch. High-confidence revenue opportunity with proven playbook and 7-day execution window.",
    goals: [
      "Generate $63K revenue from Mother's Day campaign at 5.0x ROAS target (vs $42K 2025 baseline)",
      "Acquire 420-480 new customers during campaign period (35% first-time buyer target)",
      "Increase average order value to $145+ through gift set bundles and gift note upsell",
      "Establish Mother's Day as anchor seasonal campaign for future years (repeatable playbook)"
    ],
    detailedBrief: {
      challenge: "Mother's Day window compressed (May 3-10 = 7 days) requiring tight execution. Gift purchases have different buyer psychology vs self-purchase - need gift-appropriate creative, messaging, and product curation. 2025 campaign performed well ($42K, 4.8x ROAS) but left optimization opportunities: Pinterest underutilized despite strong gift discovery intent, no SMS channel, gift note upsell not activated. Competition intense during Mother's Day - major retailers (Nordstrom, Anthropologie) dominate paid channels with large budgets.",
      approach: "Campaign structure: $12,600 total budget allocated across Meta ($5,040), Email ($2,520), Google ($3,780), Pinterest ($1,260). Creative themes: gift-focused messaging ('The gift she'll love'), curated gift sets (dress + scarf bundles), personalized gift notes. Product focus: hero items in gift-appropriate price range ($85-165). Launch sequence: May 1 (email preview to VIP list), May 3 (full campaign launch across all channels), May 8 (last-chance urgency messaging). Track daily: ROAS, conversion volume, AOV, adjust budgets to top-performing channels.",
      timeline: "7-day campaign (May 3-10) with 2-day pre-launch VIP access",
      budget: "$12,600 (Meta $5,040, Email $2,520, Google $3,780, Pinterest $1,260)"
    },
    nextSteps: [
      {
        step: "Campaign Creative Finalization & Asset Production",
        description: "Finalize Mother's Day creative: gift-focused product photography (lifestyle shots showing gift presentation), carousel ad creative featuring curated gift sets, email templates with gift guide layout, Pinterest pins emphasizing gift discovery. Copy themes: 'Gifts she'll actually love', 'Thoughtful presents for Mom', 'Make her day special'. Produce 10 Meta ad variants, 3 email templates, 12 Pinterest pins. Complete by May 1.",
        owner: "Creative Team"
      },
      {
        step: "Multi-Channel Campaign Setup & Launch",
        description: "Meta: Set up 3 campaign objectives (awareness, consideration, conversion) with $5,040 budget, May 3-10 flight. Email: Schedule 3-email sequence (May 1 VIP preview, May 3 main launch, May 8 last chance). Google: Shopping + Search campaigns targeting 'mother's day gifts' keywords. Pinterest: Promoted pins with gift board strategy. Launch all channels May 3 6am. Enable gift note checkout upsell in Shopify.",
        owner: "Campaign Manager"
      },
      {
        step: "Daily Performance Monitoring & Budget Optimization",
        description: "Monitor daily May 3-10: channel-level ROAS (reallocate budget from underperformers to top performers), conversion volume vs targets (420-480 goal), AOV tracking (target $145+). Quick optimization triggers: if Meta ROAS <4.5x by Day 3, shift $500 to Pinterest; if Email open rate <32%, test subject line variants. Real-time Slack updates to stakeholders on performance vs targets.",
        owner: "Performance Marketing Lead"
      },
      {
        step: "Post-Campaign Analysis & 2027 Playbook Documentation",
        description: "May 12: Analyze final results - total revenue vs $63K target, ROAS by channel, new customer acquisition (target 35% of conversions), AOV impact from gift notes. Compare to 2025 baseline ($42K). Document learnings: winning creative themes, top-performing channels, gift note attachment rate, optimal launch timing. Build 2027 Mother's Day playbook with recommendations for improvement.",
        owner: "Growth Marketing Manager"
      }
    ],
    potentialOutcomes: {
      bestCase: "$74K revenue if optimizations exceed expectations (Pinterest strong performance, gift note 42% attachment vs 35% target, extended urgency messaging drives May 9-10 spike)",
      expected: "$63K revenue at 5.0x ROAS, 450 conversions (37% first-time buyers), $148 average order value from gift set bundles, Mother's Day established as repeatable seasonal anchor",
      metrics: [
        "Total campaign revenue vs $63K target",
        "ROAS by channel (Meta, Email, Google, Pinterest)",
        "New customer acquisition rate (target 35%)",
        "Average order value (target $145+)",
        "Gift note attachment rate",
        "Creative performance by theme (gift sets vs individual products)"
      ]
    }
  };

  const lowHangingFruitBrief: DetailedBriefData = {
    title: "Easter Creative Repurposing for Wedding Season Campaign",
    category: "Low Hanging Fruit · Creative Efficiency",
    overview: "Easter campaign (Apr 5-12) delivered 4.2x ROAS with strong creative performance - pastel color palette, spring aesthetic, elegant product styling resonates with gift-giving occasions. Wedding Season campaign (Apr 20-May 15) requires similar aesthetic: soft colors, romantic styling, event-appropriate products. Repurposing Easter creative saves $2,400 production cost and 5-day timeline. Quick 2-day turnaround: re-edit Easter assets with wedding-focused copy, maintain proven visual style.",
    goals: [
      "Launch Wedding Season campaign creative in 2 days using repurposed Easter assets (vs 7-day new production)",
      "Save $2,400 creative production cost by reusing photography, videography, and design work",
      "Maintain proven 4.2x ROAS creative performance from Easter campaign through visual continuity",
      "Test creative repurposing model for future seasonal campaigns (efficiency playbook)"
    ],
    detailedBrief: {
      challenge: "Wedding Season campaign launching Apr 20 with $11,200 budget but creative production behind schedule. New photoshoot scheduled for Apr 19 (1 day before launch) creates timeline risk. Easter campaign creative aesthetically aligned with wedding season: pastel colors (blush, cream, sage), romantic styling, event-appropriate products (dresses, accessories). Opportunity to leverage existing assets vs rushed new production. Wedding season customer (wedding guests) overlaps with Easter gift buyers - similar demographic and purchase intent.",
      approach: "Creative repurposing process: (1) Audit Easter campaign assets - select top 15 performing images/videos (highest CTR, engagement rate). (2) Re-edit for wedding context: swap copy from 'Easter Collection' to 'Wedding Guest Edit', update messaging from 'Spring celebration' to 'Wedding season essentials', highlight event-appropriate products (midi dresses, elegant accessories). (3) Maintain visual aesthetic: keep pastel color grading, romantic styling, product presentation. (4) Add wedding-specific elements: 'Guest dress guide' creative, 'What to wear to a spring wedding' educational content. Launch Apr 20 with repurposed creative, monitor performance vs Easter baseline (4.2x ROAS).",
      timeline: "2-day creative adaptation (Apr 18-19) vs 7-day new production",
      budget: "$0 incremental (saves $2,400 vs new photoshoot)"
    },
    nextSteps: [
      {
        step: "Easter Creative Asset Audit & Top Performer Selection",
        description: "Review Easter campaign performance (Apr 5-12): identify top 15 assets by CTR, engagement rate, conversion rate. Select assets featuring: midi dresses (wedding-appropriate style), elegant accessories, pastel color palette, event styling context. Export high-res files from Easter campaign. Criteria: images/videos with >2.5% CTR, hero product visibility, versatile composition (easy to re-edit).",
        owner: "Creative Lead"
      },
      {
        step: "Copy & Messaging Adaptation for Wedding Context",
        description: "Re-write Easter creative copy for wedding season: 'Easter Collection' → 'Wedding Guest Edit', 'Spring celebration' → 'Wedding season essentials', 'Gift ideas' → 'Guest dress guide'. Add wedding-specific CTAs: 'Find your guest dress', 'Shop event wear'. Create 3 new headlines: 'What to wear to a spring wedding', 'Elegant guest dresses', 'Event-ready style'. Maintain romantic, elegant tone from Easter campaign.",
        owner: "Copywriter"
      },
      {
        step: "Creative Re-Editing & Wedding Season Adaptation",
        description: "Edit Easter assets in Figma/Photoshop: replace text overlays with wedding messaging, update CTAs, add 'Wedding Guest' badge/tag. Video edits: re-cut Easter styling videos with wedding voiceover ('perfect for wedding season'). Maintain visual aesthetic: no re-grading needed, pastel palette works for both occasions. Output: 8 Meta ad creatives (static + video), 12 Pinterest pins, 3 email hero images. Complete by Apr 19 EOD.",
        owner: "Design Team"
      },
      {
        step: "Wedding Season Campaign Launch & Performance Comparison",
        description: "Launch Wedding Season campaign Apr 20 with repurposed creative. Monitor Apr 20-May 15: ROAS vs Easter baseline (4.2x target), CTR vs Easter (maintain >2.5%), conversion rate, creative fatigue (refresh if CTR drops 20%+). Compare production efficiency: 2-day turnaround vs standard 7-day, $0 cost vs $2,400 budget saved. Document learnings: repurposing model effectiveness, seasonal aesthetic overlap opportunities for future campaigns.",
        owner: "Campaign Manager"
      }
    ],
    potentialOutcomes: {
      bestCase: "Wedding Season ROAS exceeds Easter baseline (4.8x vs 4.2x) due to higher AOV event purchases, $3,200 cost savings from avoided rush production fees, repurposing model validated for 4+ future seasonal campaigns",
      expected: "Wedding Season matches Easter 4.2x ROAS performance, $2,400 production cost saved, 2-day vs 7-day timeline allows earlier optimization, creative repurposing playbook established for seasonal campaigns",
      metrics: [
        "Wedding Season ROAS vs Easter baseline (4.2x)",
        "Creative CTR comparison (repurposed vs original Easter performance)",
        "Production cost savings ($2,400 target)",
        "Timeline efficiency (2 days vs 7 days)",
        "Creative fatigue indicators (CTR decline over campaign)",
        "Repurposing model applicability to future campaigns"
      ]
    }
  };

  return (
    <div>
      <PageHeader
        label="Strategy · Go-To-Market"
        title="GTM & Campaign Strategy"
        description="90-day execution calendar, campaign planning, and strategic initiative tracking. Your command center for bringing the 2026 GTM plan to life."
        backgroundGradient="green"
        image={gtmHero}
        externalLinks={[
          { name: "View GTM Plan", url: "#" },
        ]}
        stats={[
          { label: "Active Campaigns", value: "3" },
          { label: "Strategic Initiatives", value: "4" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        {/* AI Widget */}
        <AIWidget
          insightLabel="GTM Strategy Insight"
          insightText="Mother's Day window (May 3-10) represents highest gift-purchase intent period. Wedding season campaign (Apr 20-May 15) tracking to 4.8x ROAS target. Recommendation: allocate $12.6K to Mother's Day with focus on email + Meta, repurpose Easter creative for wedding season."
        />

        <FilterBar />

        {/* 2026 Yearly GTM Planner with Quarterly Breakdown */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[var(--pink)]" />
              <CardTitle>2026 {planChannel === "gtm" ? "Go-To-Market" : planChannel.charAt(0).toUpperCase() + planChannel.slice(1).replace("-", " ")} Yearly Planner</CardTitle>
            </div>
            <button className="px-3 py-1.5 bg-[var(--surface)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors text-[12px] font-medium flex items-center gap-2">
              <Edit2 className="w-3.5 h-3.5" />
              Edit Plan
            </button>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Quarterly execution plans with 90-day objectives & milestones</p>

          <div className="grid grid-cols-4 gap-4">
            {quarterlyPlans.map((plan, index) => {
              const statusConfig = {
                completed: { color: "var(--green)", bg: "var(--green-light)", label: "Completed", icon: CheckCircle2 },
                "in-progress": { color: "var(--pink)", bg: "var(--pink-light)", label: "In Progress", icon: Clock },
                planned: { color: "var(--buff-dark)", bg: "var(--buff)", label: "Planned", icon: Target },
              }[plan.status];

              const StatusIcon = statusConfig.icon;

              return (
                <div key={index} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5 hover:border-[var(--border-strong)] transition-colors relative group">
                  <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[var(--surface)] rounded">
                    <Edit2 className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                  </button>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-[16px] font-semibold text-[var(--green)] mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                        {plan.quarter}
                      </h4>
                      <p className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                        {plan.period}
                      </p>
                    </div>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: statusConfig.bg }}
                    >
                      <StatusIcon className="w-5 h-5" style={{ color: statusConfig.color }} />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                        Progress
                      </span>
                      <span className="text-[11px] font-medium" style={{ color: statusConfig.color }}>
                        {plan.progress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${plan.progress}%`, backgroundColor: statusConfig.color }}
                      />
                    </div>
                  </div>

                  {/* Objectives */}
                  <div className="mb-4">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                      90-Day Objectives
                    </div>
                    <ul className="space-y-1.5">
                      {plan.objectives.map((objective, idx) => (
                        <li key={idx} className="text-[11px] text-[var(--text-secondary)] leading-relaxed flex items-start gap-1">
                          <span className="text-[var(--pink)] mt-0.5">•</span>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  <div className="pt-3 border-t border-[var(--border-color)]">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                          Revenue
                        </div>
                        <div className="text-[13px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {plan.revenue}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                          Campaigns
                        </div>
                        <div className="text-[13px] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {plan.campaigns}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* 3 Widgets */}
        <div className="grid grid-cols-3 gap-6">
          <Card
            variant="green"
            onMouseEnter={() => setShowActiveCampaignsTooltip(true)}
            onMouseLeave={() => setShowActiveCampaignsTooltip(false)}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-[var(--pink)]" />
              <CardTitle variant="green">Active Campaigns</CardTitle>
            </div>
            {showActiveCampaignsTooltip && (
              <div className="absolute top-2 right-2 bg-[var(--black)] text-white p-3 rounded-[var(--radius-md)] shadow-xl z-10 max-w-xs text-[11px] leading-relaxed">
                Marketing campaigns currently live or in active planning stage, driving revenue and customer acquisition across channels
              </div>
            )}
            <div className="text-[3.5rem] font-medium text-[var(--pink)] leading-none mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              3
            </div>
            <p className="text-[13px] text-white/75">1 in progress, 2 in planning</p>
          </Card>

          <Card variant="pink">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-[var(--pink-dark)]" />
              <CardTitle variant="pink">Scheduled Content</CardTitle>
            </div>
            <div className="text-[3.5rem] font-medium text-[var(--pink-dark)] leading-none mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              24
            </div>
            <p className="text-[13px] text-[var(--text-primary)]">Next 14 days across all channels</p>
          </Card>

          <Card
            variant="surface"
            onMouseEnter={() => setShowStrategicTooltip(true)}
            onMouseLeave={() => setShowStrategicTooltip(false)}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-[var(--terra)]" />
              <CardTitle>Strategic Initiatives</CardTitle>
            </div>
            {showStrategicTooltip && (
              <div className="absolute top-2 right-2 bg-[var(--black)] text-white p-3 rounded-[var(--radius-md)] shadow-xl z-10 max-w-xs text-[11px] leading-relaxed">
                High-level business priorities and growth initiatives that require cross-functional execution and long-term commitment
              </div>
            )}
            <div className="text-[3.5rem] font-medium text-[var(--green)] leading-none mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              4
            </div>
            <p className="text-[13px] text-[var(--text-secondary)]">Major priorities for Q4/2026-Q1/2027</p>
          </Card>
        </div>

        {/* Performance Analytics */}
        <div className="grid grid-cols-2 gap-6">
          {/* Budget vs Revenue Performance */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-[var(--pink)]" />
              <CardTitle>Budget vs Revenue Performance</CardTitle>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Quarterly spend and revenue comparison</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={[
                { quarter: "Q1", budget: 56400, revenue: 173220 },
                { quarter: "Q4/2026", budget: 62800, revenue: 198000 },
                { quarter: "Q1/2027", budget: 71200, revenue: 225000 },
                { quarter: "Q4", budget: 142600, revenue: 380000 },
              ]}>
                <CartesianGrid key="cartesian-grid-budget" strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis key="x-axis-budget" dataKey="quarter" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                <YAxis key="y-axis-budget" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                <Tooltip
                  key="tooltip-budget"
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    fontSize: 12
                  }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Legend
                  key="legend-budget"
                  wrapperStyle={{ fontSize: 12 }}
                  iconType="circle"
                />
                <Bar key="bar-budget" dataKey="budget" fill="var(--terra)" name="Budget" />
                <Bar key="bar-revenue" dataKey="revenue" fill="var(--green)" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* ROAS Trend */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[var(--pink)]" />
              <CardTitle>ROAS Trend</CardTitle>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Completed campaigns performance over time</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={campaigns.filter(c => c.actualRoas).map((c, idx) => ({
                name: c.name.substring(0, 15) + (c.name.length > 15 ? "..." : ""),
                roas: parseFloat(c.actualRoas?.replace("x", "") || "0"),
                id: `campaign-${idx}`,
              }))}>
                <CartesianGrid key="cartesian-grid-roas" strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis
                  key="x-axis-roas"
                  dataKey="name"
                  tick={{ fill: "var(--text-secondary)", fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis key="y-axis-roas" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                <Tooltip
                  key="tooltip-roas"
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    fontSize: 12
                  }}
                  formatter={(value: number) => `${value.toFixed(1)}x`}
                />
                <Line
                  key="line-roas"
                  type="monotone"
                  dataKey="roas"
                  stroke="var(--pink)"
                  strokeWidth={2}
                  dot={{ fill: "var(--pink)", r: 4 }}
                  name="ROAS"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Channel Performance & Campaign Status */}
        <div className="grid grid-cols-2 gap-6">
          {/* Channel Performance Breakdown */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-[var(--pink)]" />
              <CardTitle>Channel Performance (Completed)</CardTitle>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Revenue contribution by channel (Q1 actual)</p>
            <div className="space-y-3">
              {[
                { channel: "Meta", revenue: 86200, roas: "4.1x", color: "var(--pink)" },
                { channel: "Email", revenue: 42800, roas: "3.2x", color: "var(--green)" },
                { channel: "Organic Social", revenue: 54400, roas: "N/A", color: "var(--terra)" },
                { channel: "Google", revenue: 32600, roas: "5.8x", color: "var(--buff-dark)" },
                { channel: "Influencer", revenue: 18600, roas: "3.3x", color: "var(--pink-dark)" },
                { channel: "Loyalty", revenue: 28400, roas: "4.7x", color: "var(--green-dark)" },
                { channel: "Direct", revenue: 24200, roas: "N/A", color: "var(--text-tertiary)" },
              ].map((item, index) => {
                const totalRevenue = 287200;
                const percentage = ((item.revenue / totalRevenue) * 100).toFixed(1);
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px] font-medium text-[var(--text-primary)]">{item.channel}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-[var(--text-tertiary)]">{item.roas}</span>
                        <span className="text-[12px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                          ${item.revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${percentage}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Campaign Status Overview */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-[var(--pink)]" />
              <CardTitle>Campaign Status Overview</CardTitle>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Distribution of campaigns by status</p>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={240}>
                <RechartsPieChart>
                  <Pie
                    key="pie-status"
                    data={(() => {
                      const statusData = [
                        { name: "Completed", value: campaigns.filter(c => c.status === "Completed").length, color: "var(--green)" },
                        { name: "In Progress", value: campaigns.filter(c => c.status === "In Progress").length, color: "var(--pink)" },
                        { name: "Planning", value: campaigns.filter(c => c.status === "Planning").length, color: "var(--terra)" },
                        { name: "Ideation", value: campaigns.filter(c => c.status === "Ideation").length, color: "var(--buff-dark)" },
                      ];
                      return statusData;
                    })()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell key="cell-completed" fill="var(--green)" />
                    <Cell key="cell-inprogress" fill="var(--pink)" />
                    <Cell key="cell-planning" fill="var(--terra)" />
                    <Cell key="cell-ideation" fill="var(--buff-dark)" />
                  </Pie>
                  <Tooltip
                    key="tooltip-pie"
                    contentStyle={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "var(--radius-md)",
                      fontSize: 12
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { label: "Completed", value: campaigns.filter(c => c.status === "Completed").length, color: "var(--green)" },
                { label: "In Progress", value: campaigns.filter(c => c.status === "In Progress").length, color: "var(--pink)" },
                { label: "Planning", value: campaigns.filter(c => c.status === "Planning").length, color: "var(--terra)" },
                { label: "Ideation", value: campaigns.filter(c => c.status === "Ideation").length, color: "var(--buff-dark)" },
              ].map((item, index) => (
                <div key={`legend-${index}`} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] text-[var(--text-secondary)]">{item.label}: {item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Assistant */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>AI Assistant</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Ask me anything about your campaigns, strategy, or GTM plan</p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g., 'What's the budget for Q1/2027 campaigns?' or 'Show me all Meta campaigns this year'"
              className="flex-1 px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all"
            />
            <button className="px-6 py-3 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium whitespace-nowrap flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Ask
            </button>
          </div>
        </Card>

        {/* AI Strategic Recommendation */}
        <AIInsightCard
          title="AI Strategic Recommendation"
          content="Based on current performance and competitor analysis: (1) Fast-track TikTok Shop integration (estimated +$18K/month), (2) Launch SMS channel to complement email flows (25-30% incremental revenue), (3) Test accessories category with limited pilot (high customer interest, low competition), (4) Increase influencer partnerships — current EMV is 3x lower than category average."
          showButton={true}
          onButtonClick={() => setShowStrategicRecModal(true)}
        />

        {/* Strategic Priorities */}
        <Card>
          <CardTitle>Strategic Priorities</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Major initiatives — Q4 2026-Q1 2027</p>
          <div className="space-y-4">
            {strategicPriorities.map((priority, index) => {
              const statusConfig = {
                approved: { color: "var(--green)", bg: "var(--green-light)", label: "Approved" },
                "in-progress": { color: "var(--pink-dark)", bg: "var(--pink-light)", label: "In Progress" },
                research: { color: "var(--terra)", bg: "var(--terra-light)", label: "Research" },
              }[priority.status];

              return (
                <div key={index} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4 hover:border-[var(--border-strong)] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">
                      {priority.title}
                    </h4>
                    <div
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ backgroundColor: statusConfig?.bg || "var(--surface)", color: statusConfig?.color || "var(--text-secondary)" }}
                    >
                      {statusConfig?.label || priority.status}
                    </div>
                  </div>
                  <p className="text-[12px] text-[var(--text-secondary)] mb-3 leading-relaxed">
                    {priority.description}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-[var(--text-tertiary)]">
                    <span>Timeline: {priority.timeline}</span>
                    <span>•</span>
                    <span>Owner: {priority.owner}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Compact Calendar Grid */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <CardTitle>Campaign Calendar</CardTitle>
              <p className="text-[13px] text-[var(--text-secondary)] mt-1">12-month view • Click campaigns for details</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}
                className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
              <div className="text-[18px] font-semibold text-[var(--green)] min-w-[180px] text-center" style={{ fontFamily: "var(--font-serif)" }}>
                {monthNames[currentMonth]} {currentYear}
              </div>
              <button
                onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}
                className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider py-2" style={{ fontFamily: "var(--font-mono)" }}>
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: getFirstDayOfMonth(currentMonth, currentYear) }).map((_, index) => (
              <div key={`empty-${index}`} className="h-20" />
            ))}

            {/* Days of month */}
            {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }).map((_, index) => {
              const day = index + 1;
              const dayCampaigns = getCampaignsForDate(day);
              const isToday = currentMonth === 3 && day === 27; // Apr 27, 2026

              return (
                <div
                  key={day}
                  className={`relative h-24 border rounded-md p-1 hover:border-[var(--border-strong)] transition-colors ${
                    isToday ? 'border-[var(--pink)] bg-[var(--pink-light)]' : 'border-[var(--border-color)]'
                  }`}
                >
                  <div className="text-[10px] font-medium text-[var(--text-secondary)] mb-1">{day}</div>
                  <div className="space-y-0.5">
                    {dayCampaigns.slice(0, 1).map((campaign, idx) => {
                      const statusColors = {
                        "Completed": "bg-[var(--green)] text-white",
                        "In Progress": "bg-[var(--pink)] text-white",
                        "Planning": "bg-[var(--terra)] text-white",
                        "Ideation": "bg-[var(--buff)] text-[var(--text-primary)]",
                      };
                      const statusClass = statusColors[campaign.status as keyof typeof statusColors] || "bg-[var(--surface)] text-[var(--text-primary)]";
                      return (
                        <div key={idx}>
                          <div
                            className={`w-full text-[8px] px-1 py-0.5 rounded text-left truncate ${statusClass} mb-1`}
                            title={campaign.name}
                          >
                            {campaign.name.substring(0, 10)}
                          </div>
                          <button
                            onClick={() => setPreviewCampaign(campaign)}
                            className="w-full text-[7px] px-1 py-0.5 bg-white border border-[var(--border-color)] text-[var(--text-primary)] rounded hover:bg-[var(--surface)] transition-colors"
                          >
                            Preview
                          </button>
                        </div>
                      );
                    })}
                    {dayCampaigns.length > 1 && (
                      <div className="text-[7px] text-[var(--text-tertiary)] px-1">+{dayCampaigns.length - 1} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preview Popup */}
          {previewCampaign && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setPreviewCampaign(null)}>
              <div className="bg-white rounded-[var(--radius-lg)] p-6 max-w-2xl w-full m-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-[1.5rem] font-semibold text-[var(--green)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                  {previewCampaign.name}
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>Timeline</div>
                    <div className="text-[14px] text-[var(--text-primary)]">{previewCampaign.timeline}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>Status</div>
                    <div className="text-[14px] text-[var(--text-primary)]">{previewCampaign.status}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>Budget</div>
                    <div className="text-[14px] text-[var(--text-primary)]">{previewCampaign.budget}</div>
                  </div>
                  {previewCampaign.revenue && (
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>Revenue</div>
                      <div className="text-[18px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>{previewCampaign.revenue}</div>
                    </div>
                  )}
                </div>

                {/* Performance Data */}
                {previewCampaign.performance && (
                  <div className="mb-6 p-4 bg-[var(--surface)] rounded-[var(--radius-lg)]">
                    <div className="text-[12px] uppercase tracking-wider text-[var(--text-tertiary)] mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                      <TrendingUp className="w-4 h-4" />
                      Campaign Performance
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1">Impressions</div>
                        <div className="text-[16px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {previewCampaign.performance.impressions}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1">Clicks</div>
                        <div className="text-[16px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {previewCampaign.performance.clicks}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1">CTR</div>
                        <div className="text-[16px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {previewCampaign.performance.ctr}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1">CPC</div>
                        <div className="text-[16px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {previewCampaign.performance.cpc}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1">Conversions</div>
                        <div className="text-[16px] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {previewCampaign.performance.conversions}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1">Conv. Rate</div>
                        <div className="text-[16px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {previewCampaign.performance.conversionRate}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[var(--text-tertiary)] mb-1">ROAS</div>
                        <div className="text-[16px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {previewCampaign.performance.roas}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Channels
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {previewCampaign.channels.map((ch, i) => (
                      <Tag key={i} variant="green">{ch}</Tag>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setPreviewCampaign(null)}
                  className="w-full px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Card>

        {/* Action Strip */}
        <ActionStrip
          data={actionStripData}
          onSilverBulletClick={() => setShowSilverBulletModal(true)}
          onLowHangingFruitClick={() => setShowLowHangingFruitModal(true)}
        />

        <DetailedBriefModal
          show={showStrategicRecModal}
          onClose={() => setShowStrategicRecModal(false)}
          data={strategicRecBrief}
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
