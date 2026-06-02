import { useMemo, useState } from "react";
import { Card, CardTitle, MetricCard, AIInsightCard, Tag } from "../components/ui/Card";
import { FilterBar, StatGrid, ChartContainer } from "../components/ui/Filters";
import { useFilters } from "../context/FilterContext";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { Instagram, TrendingUp, Users, Heart, MessageCircle, Share2, Package, Sparkles, CheckCircle2, Copy, Download, Gift, Camera, FileText, X, Target, DollarSign, Calendar, Shield, UserPlus, Eye, Mail, Search } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { AIWidget } from "../components/AIWidget";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import { DetailedBriefModal, DetailedBriefData } from "../components/DetailedBriefModal";

const baseInfluencerData = [
  { name: "@stylewithjulia", followers: 280000, tier: "Macro", posts: 4, engagement: 4.2, emv: 28400, conversions: 42, status: "active" },
  { name: "@minimal_meg", followers: 125000, tier: "Micro", posts: 6, engagement: 6.8, emv: 18200, conversions: 38, status: "active" },
  { name: "@cassidy.lynn", followers: 88000, tier: "Micro", posts: 5, engagement: 5.4, emv: 12600, conversions: 28, status: "active" },
  { name: "@theeverygirl", followers: 450000, tier: "Macro", posts: 2, engagement: 3.1, emv: 32800, conversions: 52, status: "completed" },
  { name: "@emma.sustainable", followers: 64000, tier: "Micro", posts: 8, engagement: 7.2, emv: 14800, conversions: 34, status: "active" },
];

const baseCampaignPerformance = [
  { month: "Nov", posts: 12, reach: 840000, engagement: 42800, emv: 64200, conversions: 128 },
  { month: "Dec", posts: 18, reach: 1240000, engagement: 68400, emv: 92400, conversions: 186 },
  { month: "Jan", posts: 14, reach: 980000, engagement: 54200, emv: 74800, conversions: 154 },
  { month: "Feb", posts: 16, reach: 1120000, engagement: 62400, emv: 84600, conversions: 172 },
  { month: "Mar", posts: 22, reach: 1580000, engagement: 86200, emv: 106800, conversions: 224 },
];

const upcomingCampaigns = [
  { name: "Easter Collection Launch", influencers: 5, startDate: "Apr 5", budget: "$12,400", status: "confirmed" },
  { name: "Mother's Day Gift Guide", influencers: 8, startDate: "May 1", budget: "$18,600", status: "planning" },
  { name: "Summer Preview Content", influencers: 6, startDate: "May 20", budget: "$14,800", status: "outreach" },
];

const prospectData = [
  { name: "@lily.everyday", followers: 92000, engagement: 6.8, niche: "Sustainable Fashion", location: "Portland, OR", estimatedEMV: "$15,200", status: "outreach" },
  { name: "@chic_and_simple", followers: 78000, engagement: 7.2, niche: "Minimalist Style", location: "Brooklyn, NY", estimatedEMV: "$12,800", status: "reviewing" },
  { name: "@green.wardrobe", followers: 68000, engagement: 8.1, niche: "Eco-Fashion", location: "San Francisco, CA", estimatedEMV: "$14,400", status: "outreach" },
  { name: "@style.curator", followers: 105000, engagement: 5.9, niche: "Fashion Curation", location: "Los Angeles, CA", estimatedEMV: "$18,600", status: "contacted" },
  { name: "@conscious.closet", followers: 84000, engagement: 7.5, niche: "Ethical Fashion", location: "Seattle, WA", estimatedEMV: "$16,200", status: "reviewing" },
  { name: "@refined.looks", followers: 96000, engagement: 6.4, niche: "Professional Style", location: "Chicago, IL", estimatedEMV: "$17,400", status: "outreach" },
];

export default function InfluencerHub() {
  const { getMultiplier, dateRange } = useFilters();
  const multiplier = getMultiplier();
  const [packStep, setPackStep] = useState(1);
  const [showTopPerformingModal, setShowTopPerformingModal] = useState(false);
  const [showGrowthProgramModal, setShowGrowthProgramModal] = useState(false);
  const [showProspectingModal, setShowProspectingModal] = useState(false);
  const [showInfluencerInsightModal, setShowInfluencerInsightModal] = useState(false);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [showStrategicModal, setShowStrategicModal] = useState(false);
  const [showEngagementModal, setShowEngagementModal] = useState(false);
  const [showViewProspectsModal, setShowViewProspectsModal] = useState(false);
  const [showSilverBulletModal, setShowSilverBulletModal] = useState(false);
  const [showLowHangingFruitModal, setShowLowHangingFruitModal] = useState(false);
  const [packData, setPackData] = useState({
    campaignName: "Mother's Day 2026",
    creator: "@stylewithjulia",
    discountCode: "JULIA15",
    discountValue: "15%",
    contentPieces: "3 Instagram posts, 2 Stories",
    deadline: "May 1, 2026",
    photography: "",
    usage: "",
    briefNotes: "",
  });

  const metrics = useMemo(() => ({
    totalEmv: Math.round(106800 * multiplier),
    activeCreators: Math.round(15 * Math.min(multiplier, 1.5)),
    avgEngagement: (5.8 * (0.9 + multiplier * 0.1)).toFixed(1),
    conversions: Math.round(224 * multiplier),
  }), [multiplier]);

  const campaignPerformance = useMemo(() => {
    return baseCampaignPerformance.map(item => ({
      ...item,
      reach: Math.round(item.reach * multiplier),
      engagement: Math.round(item.engagement * multiplier),
      emv: Math.round(item.emv * multiplier),
      conversions: Math.round(item.conversions * multiplier),
    }));
  }, [multiplier]);

  const influencerData = useMemo(() => {
    return baseInfluencerData.map(item => ({
      ...item,
      emv: Math.round(item.emv * multiplier),
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

  const handleGeneratePack = () => {
    setPackData({
      ...packData,
      photography: "• Natural lighting preferred (outdoor or near windows)\n• Lifestyle shots showing product in use\n• Include 1-2 flat lay compositions\n• Brand colors: greens, pinks, terra tones\n• Minimal editing - authentic, natural aesthetic",
      usage: "• Rights granted for all brand channels (Instagram, Pinterest, Website, Email)\n• 12-month usage period from post date\n• Creator retains ownership, brand has license to use\n• Content can be used in paid advertising with approval",
      briefNotes: "Campaign Focus: Mother's Day gifting\n\nKey Messages:\n• Timeless, elegant pieces for special women\n• Quality craftsmanship and sustainable materials\n• Gift-worthy presentation and packaging\n\nDo's: Emphasize emotional connection, gift-giving moments, quality details\nDon'ts: Avoid overly promotional language, hard selling",
    });
    setPackStep(3);
  };

  // Action Strip Data
  const actionStripData: ActionStripData = {
    silverBullet: {
      action: "Activate micro-influencer program targeting 5-15K followers (7.2% avg engagement)",
      impactLine: "Estimated: +$18,400 EMV · 68% lower cost than macro influencers",
      channel: "Instagram + TikTok · Influencer Partnerships"
    },
    lowHangingFruit: {
      action: "Send creator packs to top 3 engaged creators for Mother's Day",
      effortChip: "Easy · 2 days",
      impact: "+$8,400 EMV · Proven 6.8% engagement rate",
      channelChip: "Instagram · UGC"
    },
    frameworkTasks: [
      { task: "Micro-influencer outreach campaign", status: "In Progress" },
      { task: "Mother's Day creator pack fulfillment", status: "Planned" },
      { task: "Q2 partnership agreements finalization", status: "On Track" }
    ]
  };

  const silverBulletBrief: DetailedBriefData = {
    title: "Micro-Influencer Program Activation",
    category: "Silver Bullet · Influencer Expansion",
    overview: "Activate 12 micro-influencers (5-15K followers) with 7.2% engagement vs macro 4.2%. Expected +$18,400 EMV at 68% lower cost.",
    goals: ["Activate 12 micro-influencers", "Generate +$18,400 incremental EMV", "Reduce cost-per-post from $680 to $380", "Improve engagement 4.2% to 5.8%"],
    detailedBrief: { challenge: "Macro-influencers declining engagement (4.2% vs 5.1% prior), rising costs ($680/post +18% YoY). Micro-influencers deliver superior engagement.", approach: "Prospect 20 candidates, onboard 12, seed products, produce 2 posts each. Focus sustainable fashion niche.", timeline: "6-week activation", budget: "$6,200 (12 creators, product seeding)" },
    nextSteps: [{ step: "Prospect & Outreach", description: "Identify 20 micro-influencers, send partnership proposals, target 60% acceptance.", owner: "Influencer Marketing" }, { step: "Content Production & Tracking", description: "Ship product packs, track engagement, EMV, discount codes. Lock top 5 for quarterly partnerships.", owner: "Influencer Manager" }],
    potentialOutcomes: { bestCase: "+$24,200 EMV at 8% engagement, 5 long-term partnerships", expected: "+$18,400 EMV, engagement improves to 5.8%, cost-per-post $380", metrics: ["Total EMV", "Engagement rate", "Cost-per-post", "Discount conversions"] }
  };

  const lowHangingFruitBrief: DetailedBriefData = {
    title: "Mother's Day Creator Pack Fulfillment",
    category: "Low Hanging Fruit · Campaign Activation",
    overview: "Send curated gift packs to top 3 engaged creators for Mother's Day content. Low effort (2 days), high ROI (+$8,400 EMV).",
    goals: ["Generate 6 Mother's Day posts from top 3 creators", "Drive +$8,400 EMV and 24-32 conversions", "Test Creator Pack model", "Strengthen top-performer relationships"],
    detailedBrief: { challenge: "Mother's Day campaign lacks influencer content. Top 3 creators have strong relationships and proven performance (5.4-7.2% engagement). Standard process too slow for May 3 deadline.", approach: "Rapid fulfillment: curate 3 gift sets (silk scarf + dress), ship overnight, email creators with flexible brief. Trust-based vs formal contracts. Target 2 posts each by May 5.", timeline: "2-day fulfillment, 5-day content window", budget: "$1,240 (product $540, shipping $180, gifting $520)" },
    nextSteps: [{ step: "Curate & Ship Gift Packs", description: "Build 3 tailored gift sets, gift wrap, ship overnight April 29→30 arrival.", owner: "Influencer Ops + E-commerce" }, { step: "Creator Outreach & Support", description: "Email creators with warm tone, flexible creative direction, no pressure. Track responses and publishing.", owner: "Social Media Manager" }],
    potentialOutcomes: { bestCase: "$10,200 EMV if 100% participation, 38 conversions", expected: "$8,400 EMV, 5-6 posts, 24-32 conversions, Creator Pack model validated", metrics: ["Participation rate", "Posts published", "Engagement rate", "EMV", "Discount conversions"] }
  };

  return (
    <div>
      <PageHeader
        label="Content · Influencer Hub"
        title="Influencer Hub"
        description="Creator partnerships and campaign tracking. Manage relationships, measure EMV, track performance, and build Campaign Packs for influencer activations."
        backgroundGradient="pink"
        externalLinks={[
          { name: "Internal CRM", url: "#" },
        ]}
        stats={[
          { label: "Total EMV", value: `$${(metrics.totalEmv / 1000).toFixed(0)}K` },
          { label: "Active Creators", value: String(metrics.activeCreators) },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        {/* AI Widget */}
        <AIWidget
          insightLabel="Influencer Insights"
          insightText="Micro-influencers (5-15K followers) deliver 7.2% engagement vs 4.2% for macro creators, at 68% lower cost. Top 3 engaged creators have 6.8% avg engagement. Recommendation: launch micro-influencer program and send Mother's Day creator packs to top performers."
        />

        <FilterBar />

      <StatGrid columns={4}>
        <MetricCard
          label="Total EMV"
          value={`$${metrics.totalEmv.toLocaleString()}`}
          change="+24.8%"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="Active Creators"
          value={metrics.activeCreators.toString()}
          change="+5 new"
          changeType="positive"
        />
        <MetricCard
          label="Avg Engagement"
          value={`${metrics.avgEngagement}%`}
          change="+1.2%"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="Conversions"
          value={metrics.conversions.toString()}
          change="+18.6%"
          changeType="positive"
          trend="up"
        />
      </StatGrid>

      <div className="grid grid-cols-2 gap-6">
        <AIInsightCard
          title="AI Influencer Insight"
          content={`Your micro-influencer strategy (50K-150K followers) delivers 2.3x higher engagement vs. macro influencers, with 28% lower cost per conversion. @emma.sustainable and @minimal_meg drive highest conversion rates — consider expanding partnerships. EMV is tracking ${multiplier > 1.5 ? "exceptionally strong" : "on target"} for ${dateRangeLabels[dateRange].toLowerCase()}.`}
          onButtonClick={() => setShowInfluencerInsightModal(true)}
        />
        <AIInsightCard
          title="Partnership Opportunity"
          content={`5 new creators identified in sustainable fashion niche (avg 82K followers, 6.4% engagement). Estimated campaign budget: $8,200 for 3-post series. Projected EMV: $24K+, conversions: 45-60. Perfect timing for Easter and Mother's Day campaigns.`}
          variant="accent"
          onButtonClick={() => setShowPartnershipModal(true)}
        />
      </div>

      <AIInsightCard
        title="Strategic Influencer Recommendations"
        content="Based on Q1 performance analysis, lifestyle content (getting-ready routines, day-in-the-life) generates 3.1x more saves than static product shots. Top-performing creators consistently feature Femme pieces in authentic, everyday scenarios. Recommend shifting 40% of creator briefs to lifestyle-focused storytelling for Mother's Day campaign to maximize shareability and conversion intent."
        onButtonClick={() => setShowStrategicModal(true)}
      />

      {/* Influencer Pack Builder */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--pink)] to-[var(--green)] flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle>Influencer Pack Builder</CardTitle>
              <p className="text-[13px] text-[var(--text-secondary)]">Create comprehensive campaign packs with discount codes, briefs, and guidelines</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--pink-light)]">
            <Sparkles className="w-4 h-4 text-[var(--pink)]" />
            <span className="text-[12px] font-medium text-[var(--pink)]">AI-Enhanced</span>
          </div>
        </div>

        {/* Pack Builder Progress */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium transition-colors ${
                    packStep >= step
                      ? "bg-[var(--pink)] text-white"
                      : "bg-[var(--surface)] text-[var(--text-tertiary)]"
                  }`}
                >
                  {packStep > step ? <CheckCircle2 className="w-4 h-4" /> : step}
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-medium text-[var(--text-secondary)]">
                    {step === 1 && "Campaign Info"}
                    {step === 2 && "Generate Pack"}
                    {step === 3 && "Review & Export"}
                  </div>
                  <div
                    className={`h-1 rounded-full mt-1 transition-colors ${
                      packStep > step ? "bg-[var(--pink)]" : "bg-[var(--surface)]"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Step 1: Campaign Info */}
        {packStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={packData.campaignName}
                  onChange={(e) => setPackData({ ...packData, campaignName: e.target.value })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]"
                  placeholder="e.g., Mother's Day 2026"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">
                  Creator Handle
                </label>
                <input
                  type="text"
                  value={packData.creator}
                  onChange={(e) => setPackData({ ...packData, creator: e.target.value })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]"
                  placeholder="e.g., @stylewithjulia"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">
                  Discount Code
                </label>
                <input
                  type="text"
                  value={packData.discountCode}
                  onChange={(e) => setPackData({ ...packData, discountCode: e.target.value })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]"
                  placeholder="e.g., JULIA15"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">
                  Discount Value
                </label>
                <input
                  type="text"
                  value={packData.discountValue}
                  onChange={(e) => setPackData({ ...packData, discountValue: e.target.value })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]"
                  placeholder="e.g., 15%"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">
                  Content Deliverables
                </label>
                <input
                  type="text"
                  value={packData.contentPieces}
                  onChange={(e) => setPackData({ ...packData, contentPieces: e.target.value })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]"
                  placeholder="e.g., 3 Instagram posts, 2 Stories"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">
                  Deadline
                </label>
                <input
                  type="text"
                  value={packData.deadline}
                  onChange={(e) => setPackData({ ...packData, deadline: e.target.value })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]"
                  placeholder="e.g., May 1, 2026"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
              <button
                onClick={() => setPackStep(2)}
                className="px-6 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center gap-2"
              >
                Continue
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Generate Pack */}
        {packStep === 2 && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--pink)] to-[var(--green)] flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-2">
                AI is Building Your Influencer Pack
              </h3>
              <p className="text-[14px] text-[var(--text-secondary)] mb-6">
                Generating photography guidelines, usage rights, and campaign brief...
              </p>

              <div className="max-w-md mx-auto space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--green)]" />
                  <span className="text-[13px] text-[var(--text-primary)]">Creating discount code structure</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--green)]" />
                  <span className="text-[13px] text-[var(--text-primary)]">Analysing brand photography style</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[var(--pink-light)] rounded-[var(--radius-md)]">
                  <Sparkles className="w-5 h-5 text-[var(--pink)]" />
                  <span className="text-[13px] text-[var(--text-primary)]">Generating campaign guidelines...</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-4 border-t border-[var(--border-color)]">
              <button
                onClick={() => setPackStep(1)}
                className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[14px] font-medium"
              >
                Back
              </button>
              <button
                onClick={handleGeneratePack}
                className="px-6 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center gap-2"
              >
                Generate Pack
                <Package className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Export */}
        {packStep === 3 && (
          <div className="space-y-6">
            <div className="bg-[var(--green-light)] border border-[var(--green)] rounded-[var(--radius-md)] p-4 mb-6">
              <div className="flex items-center gap-2 text-[var(--green)]">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-[14px] font-medium">Influencer Pack Generated Successfully!</span>
              </div>
            </div>

            <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-6 space-y-6">
              {/* Campaign Overview */}
              <div className="grid grid-cols-2 gap-6 pb-6 border-b border-[var(--border-color)]">
                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Campaign Name
                  </h3>
                  <p className="text-[16px] font-semibold text-[var(--text-primary)]">{packData.campaignName}</p>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Creator
                  </h3>
                  <p className="text-[16px] font-semibold text-[var(--text-primary)]">{packData.creator}</p>
                </div>
              </div>

              {/* Discount Code */}
              <div className="bg-[var(--pink-light)] border-2 border-dashed border-[var(--pink)] rounded-[var(--radius-lg)] p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Gift className="w-6 h-6 text-[var(--pink-dark)]" />
                  <h3 className="text-[14px] font-semibold text-[var(--pink-dark)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                    Creator Discount Code
                  </h3>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[2rem] font-bold text-[var(--pink-dark)] tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                      {packData.discountCode}
                    </div>
                    <div className="text-[13px] text-[var(--text-primary)] mt-1">
                      {packData.discountValue} off • Valid through campaign period
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </button>
                </div>
              </div>

              {/* Deliverables & Timeline */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Content Deliverables
                  </h3>
                  <p className="text-[14px] text-[var(--text-secondary)]">{packData.contentPieces}</p>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Deadline
                  </h3>
                  <p className="text-[14px] text-[var(--text-secondary)]">{packData.deadline}</p>
                </div>
              </div>

              {/* Photography Guidelines */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="w-5 h-5 text-[var(--green)]" />
                  <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">
                    Photography Guidelines
                  </h3>
                </div>
                <div className="bg-[var(--surface)] rounded-[var(--radius-md)] p-4 text-[13px] text-[var(--text-secondary)] whitespace-pre-line leading-relaxed">
                  {packData.photography}
                </div>
              </div>

              {/* Content Usage Rights */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-[var(--terra)]" />
                  <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">
                    Content Usage Rights
                  </h3>
                </div>
                <div className="bg-[var(--surface)] rounded-[var(--radius-md)] p-4 text-[13px] text-[var(--text-secondary)] whitespace-pre-line leading-relaxed">
                  {packData.usage}
                </div>
              </div>

              {/* Campaign Brief */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[var(--pink)]" />
                  <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">
                    Campaign Brief
                  </h3>
                </div>
                <div className="bg-[var(--surface)] rounded-[var(--radius-md)] p-4 text-[13px] text-[var(--text-secondary)] whitespace-pre-line leading-relaxed">
                  {packData.briefNotes}
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="flex justify-between gap-3 pt-6 border-t border-[var(--border-color)]">
              <button
                onClick={() => setPackStep(1)}
                className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[14px] font-medium"
              >
                Create New Pack
              </button>
              <div className="flex gap-3">
                <button className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[14px] font-medium flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy All Details
                </button>
                <button className="px-6 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Campaign Pack
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <ChartContainer
          title="Campaign Performance Trend"
          subtitle="5-month EMV and conversion tracking"
          tag={{ label: "Creator Campaigns", variant: "pink" }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={campaignPerformance} id="influencer-campaign-chart">
              <CartesianGrid key="grid-influencer-campaign" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="xaxis-influencer-campaign" dataKey="month" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <YAxis key="yaxis-influencer-campaign" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <Tooltip
                key="tooltip-influencer-campaign"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}
              />
              <Legend key="legend-influencer-campaign" wrapperStyle={{ fontSize: '12px' }} />
              <Line key="line-emv" type="monotone" dataKey="emv" stroke="var(--pink)" strokeWidth={3} name="EMV ($)" id="line-emv" />
              <Line key="line-conversions" type="monotone" dataKey="conversions" stroke="var(--green-mid)" strokeWidth={3} name="Conversions" id="line-conversions" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer
          title="Reach & Engagement"
          subtitle="Total impressions and interactions"
          tag={{ label: "Performance", variant: "green" }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignPerformance} id="influencer-reach-chart">
              <CartesianGrid key="grid-influencer-reach" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="xaxis-influencer-reach" dataKey="month" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <YAxis key="yaxis-influencer-reach" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <Tooltip
                key="tooltip-influencer-reach"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}
              />
              <Legend key="legend-influencer-reach" wrapperStyle={{ fontSize: '12px' }} />
              <Bar key="bar-reach" dataKey="reach" fill="var(--terra)" name="Reach" id="bar-reach" />
              <Bar key="bar-engagement" dataKey="engagement" fill="var(--buff)" name="Engagement" id="bar-engagement" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <Card>
        <CardTitle>Active Creator Partnerships</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">{dateRangeLabels[dateRange]} performance</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Creator</th>
                <th className="text-center py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Tier</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Followers</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Posts</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Engagement</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>EMV</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Conv</th>
                <th className="text-center py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {influencerData.map((influencer, index) => (
                <tr key={index} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--surface)] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-[var(--pink)]" />
                      <span className="text-[14px] font-medium text-[var(--text-primary)]">{influencer.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Tag variant={influencer.tier === "Macro" ? "pink" : "green"}>{influencer.tier}</Tag>
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    {(influencer.followers / 1000).toFixed(0)}K
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">{influencer.posts}</td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">{influencer.engagement}%</td>
                  <td className="py-3 px-4 text-right text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    ${(influencer.emv / 1000).toFixed(1)}K
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">{influencer.conversions}</td>
                  <td className="py-3 px-4 text-center">
                    <Tag variant={influencer.status === "active" ? "green" : "buff"}>
                      {influencer.status}
                    </Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-2">
          <CardTitle>Upcoming Campaigns</CardTitle>
          <button className="px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center gap-2">
            <Package className="w-4 h-4" />
            Create New Campaign
          </button>
        </div>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Confirmed and planning stages</p>
        <div className="space-y-4">
          {upcomingCampaigns.map((campaign, index) => {
            const statusConfig = {
              confirmed: { color: "var(--green)", bg: "var(--green-light)", label: "Confirmed" },
              planning: { color: "var(--pink-dark)", bg: "var(--pink-light)", label: "Planning" },
              outreach: { color: "var(--terra)", bg: "var(--terra-light)", label: "Outreach" },
            }[campaign.status];

            return (
              <div key={index} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5 hover:border-[var(--border-strong)] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[1.15rem] font-semibold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                      {campaign.name}
                    </h3>
                    <div className="flex items-center gap-4 text-[13px] text-[var(--text-secondary)]">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {campaign.influencers} creators
                      </span>
                      <span>Start: {campaign.startDate}</span>
                      <span>Budget: {campaign.budget}</span>
                    </div>
                  </div>
                  <div 
                    className="px-3 py-1.5 rounded-full text-[11px] font-medium"
                    style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}
                  >
                    {statusConfig.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card variant="pink" className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-[var(--pink-dark)]" />
            <CardTitle variant="pink">Top Performing Content</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-primary)] mb-4">Highest EMV posts</p>
          <div className="space-y-3 mb-4 flex-grow">
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">Spring Dress Styling</div>
              <div className="text-[11px] text-[var(--text-secondary)]">@stylewithjulia • EMV: $8,400</div>
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">Sustainable Fashion Tips</div>
              <div className="text-[11px] text-[var(--text-secondary)]">@emma.sustainable • EMV: $6,200</div>
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">Capsule Wardrobe Guide</div>
              <div className="text-[11px] text-[var(--text-secondary)]">@minimal_meg • EMV: $5,800</div>
            </div>
          </div>
          <button
            onClick={() => setShowTopPerformingModal(true)}
            className="w-full px-4 py-2 bg-[var(--pink-dark)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[12px] font-medium flex items-center justify-center gap-2 mt-auto"
          >
            View Full Analysis
            <Eye className="w-4 h-4" />
          </button>
        </Card>

        <Card variant="surface" className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-6 h-6 text-[var(--green)]" />
            <CardTitle>Engagement Breakdown</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-4">{dateRangeLabels[dateRange]}</p>
          <div className="space-y-3 mb-4 flex-grow">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Likes</span>
              <span className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                {Math.round(68200 * multiplier).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Comments</span>
              <span className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                {Math.round(8420 * multiplier).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Shares</span>
              <span className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                {Math.round(4680 * multiplier).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[var(--text-secondary)]">Saves</span>
              <span className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                {Math.round(12840 * multiplier).toLocaleString()}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowEngagementModal(true)}
            className="w-full px-4 py-2 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[12px] font-medium flex items-center justify-center gap-2 mt-auto"
          >
            View Engagement Analysis
            <MessageCircle className="w-4 h-4" />
          </button>
        </Card>

        <Card variant="green" className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-[var(--pink)]" />
            <CardTitle variant="green">Program Growth</CardTitle>
          </div>
          <p className="text-[13px] text-white/75 mb-4">Quarter-over-quarter</p>
          <div className="space-y-3 mb-4 flex-grow">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/90">New Partnerships</span>
              <span className="text-[15px] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>+8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/90">EMV Growth</span>
              <span className="text-[15px] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>+42%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/90">Content Pieces</span>
              <span className="text-[15px] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>+28</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-white/90">Avg Engagement</span>
              <span className="text-[15px] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>+1.8%</span>
            </div>
          </div>
          <button
            onClick={() => setShowGrowthProgramModal(true)}
            className="w-full px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[12px] font-medium flex items-center justify-center gap-2 mt-auto"
          >
            View Growth Strategy
            <TrendingUp className="w-4 h-4" />
          </button>
        </Card>
      </div>

      {/* Prospecting Dashboard */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <CardTitle>Creator Prospecting Dashboard</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)]">Potential partnerships identified through AI analysis</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowViewProspectsModal(true)}
              className="px-4 py-2 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              View Prospects
            </button>
            <button
              onClick={() => setShowProspectingModal(true)}
              className="px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Advanced Search
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Creator</th>
                <th className="text-center py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Niche</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Followers</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Engagement</th>
                <th className="text-center py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Location</th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Est. EMV</th>
                <th className="text-center py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Status</th>
                <th className="text-center py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {prospectData.map((prospect, index) => (
                <tr key={index} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--surface)] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-[var(--pink)]" />
                      <span className="text-[14px] font-medium text-[var(--text-primary)]">{prospect.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Tag variant="buff">{prospect.niche}</Tag>
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    {(prospect.followers / 1000).toFixed(0)}K
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">{prospect.engagement}%</td>
                  <td className="py-3 px-4 text-center text-[13px] text-[var(--text-secondary)]">{prospect.location}</td>
                  <td className="py-3 px-4 text-right text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {prospect.estimatedEMV}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Tag variant={prospect.status === "contacted" ? "green" : prospect.status === "reviewing" ? "pink" : "terra"}>
                      {prospect.status}
                    </Tag>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="px-3 py-1 bg-[var(--pink)] text-white rounded-[var(--radius-sm)] hover:opacity-90 transition-opacity text-[11px] font-medium">
                      <Mail className="w-3 h-3 inline mr-1" />
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Additional Best Practice Widgets */}
      <div className="grid grid-cols-2 gap-6">
        {/* ROI Performance Dashboard */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-6 h-6 text-[var(--green)]" />
            <CardTitle>ROI Performance Dashboard</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Cost efficiency by creator tier</p>
          <div className="space-y-4">
            <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium text-[var(--text-primary)]">Micro-Influencers (50K-150K)</span>
                <Tag variant="green">Best ROI</Tag>
              </div>
              <div className="grid grid-cols-3 gap-4 text-[12px]">
                <div>
                  <div className="text-[var(--text-tertiary)]">Avg Cost</div>
                  <div className="text-[15px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>$2,400</div>
                </div>
                <div>
                  <div className="text-[var(--text-tertiary)]">Avg EMV</div>
                  <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>$14,200</div>
                </div>
                <div>
                  <div className="text-[var(--text-tertiary)]">ROI</div>
                  <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>5.9x</div>
                </div>
              </div>
            </div>
            <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium text-[var(--text-primary)]">Macro-Influencers (250K+)</span>
                <Tag variant="pink">High Reach</Tag>
              </div>
              <div className="grid grid-cols-3 gap-4 text-[12px]">
                <div>
                  <div className="text-[var(--text-tertiary)]">Avg Cost</div>
                  <div className="text-[15px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>$8,600</div>
                </div>
                <div>
                  <div className="text-[var(--text-tertiary)]">Avg EMV</div>
                  <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>$28,400</div>
                </div>
                <div>
                  <div className="text-[var(--text-tertiary)]">ROI</div>
                  <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>3.3x</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-[var(--pink)] bg-[var(--pink-light)] rounded-[var(--radius-md)]">
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>Lowest ROI</div>
                <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">@theeverygirl</div>
                <div className="text-[18px] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>2.1x</div>
              </div>
              <div className="p-3 border border-[var(--terra)] bg-[var(--terra-light)] rounded-[var(--radius-md)]">
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>Lowest Reach</div>
                <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">@cassidy.lynn</div>
                <div className="text-[18px] font-medium text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>88K</div>
              </div>
            </div>
            <div className="p-3 bg-[var(--green-light)] rounded-[var(--radius-md)] text-[12px] text-[var(--green)]">
              <strong>Recommendation:</strong> Allocate 65% of budget to micro-influencers for maximum ROI
            </div>
          </div>
        </Card>

        {/* Content Calendar */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-[var(--pink)]" />
            <CardTitle>Content Calendar & Scheduling</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Upcoming creator posts (Next 14 days)</p>
          <div className="space-y-3">
            <div className="p-3 border-l-4 border-[var(--green)] bg-[var(--green-light)] rounded-r-[var(--radius-md)]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] font-medium text-[var(--text-primary)]">Apr 28 • @stylewithjulia</span>
                <Tag variant="green">Scheduled</Tag>
              </div>
              <div className="text-[11px] text-[var(--text-secondary)]">Instagram Post • Easter Collection Launch</div>
            </div>
            <div className="p-3 border-l-4 border-[var(--pink)] bg-[var(--pink-light)] rounded-r-[var(--radius-md)]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] font-medium text-[var(--text-primary)]">May 1 • @minimal_meg</span>
                <Tag variant="pink">In Review</Tag>
              </div>
              <div className="text-[11px] text-[var(--text-secondary)]">Stories • Mother's Day Gift Guide</div>
            </div>
            <div className="p-3 border-l-4 border-[var(--green)] bg-[var(--green-light)] rounded-r-[var(--radius-md)]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] font-medium text-[var(--text-primary)]">May 3 • @emma.sustainable</span>
                <Tag variant="green">Scheduled</Tag>
              </div>
              <div className="text-[11px] text-[var(--text-secondary)]">Reel • Sustainable Fashion Series</div>
            </div>
            <div className="p-3 border-l-4 border-[var(--terra)] bg-[var(--terra-light)] rounded-r-[var(--radius-md)]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] font-medium text-[var(--text-primary)]">May 5 • @cassidy.lynn</span>
                <Tag variant="terra">Draft</Tag>
              </div>
              <div className="text-[11px] text-[var(--text-secondary)]">Instagram Post • Summer Preview</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Creator Tier Pipeline */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <UserPlus className="w-6 h-6 text-[var(--terra)]" />
            <CardTitle>Creator Tier Pipeline</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Partnership progression tracking</p>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium text-[var(--text-primary)]">Prospects</span>
                <span className="text-[18px] font-medium text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>24</span>
              </div>
              <div className="h-3 bg-[var(--surface)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--terra)]" style={{ width: "40%" }}></div>
              </div>
              <div className="text-[11px] text-[var(--text-tertiary)] mt-1">Identified via AI + manual research</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium text-[var(--text-primary)]">Active Partnerships</span>
                <span className="text-[18px] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>15</span>
              </div>
              <div className="h-3 bg-[var(--surface)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--pink)]" style={{ width: "65%" }}></div>
              </div>
              <div className="text-[11px] text-[var(--text-tertiary)] mt-1">Currently producing content</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium text-[var(--text-primary)]">VIP / Long-term</span>
                <span className="text-[18px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>8</span>
              </div>
              <div className="h-3 bg-[var(--surface)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--green)]" style={{ width: "80%" }}></div>
              </div>
              <div className="text-[11px] text-[var(--text-tertiary)] mt-1">3+ campaigns, consistent performance</div>
            </div>
            <div className="pt-3 border-t border-[var(--border-color)] text-[12px] text-[var(--text-secondary)]">
              <strong className="text-[var(--green)]">Conversion Rate:</strong> 62.5% (Prospect → Active)
            </div>
          </div>
        </Card>

        {/* Brand Safety & Compliance */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-[var(--green)]" />
            <CardTitle>Brand Safety & Compliance</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Content approval and FTC compliance</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[var(--green-light)] rounded-[var(--radius-md)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[var(--green)]" />
                <span className="text-[13px] font-medium text-[var(--text-primary)]">FTC Disclosure Rate</span>
              </div>
              <span className="text-[18px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>100%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--green-light)] rounded-[var(--radius-md)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[var(--green)]" />
                <span className="text-[13px] font-medium text-[var(--text-primary)]">Content Approval</span>
              </div>
              <span className="text-[18px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>98%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--text-secondary)]" />
                <span className="text-[13px] font-medium text-[var(--text-primary)]">Active Contracts</span>
              </div>
              <span className="text-[18px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>15</span>
            </div>
            <div className="p-3 border border-[var(--border-color)] rounded-[var(--radius-md)]">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Recent Compliance Check
              </div>
              <div className="text-[13px] text-[var(--text-secondary)]">All creator posts include proper #ad or #sponsored disclosures. Usage rights documentation up to date.</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Performing Content Modal */}
      {showTopPerformingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowTopPerformingModal(false)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--pink-light)] flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[var(--pink)]" />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                    Top Performing Content Analysis
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">Deep dive into highest-performing creator posts</p>
                </div>
              </div>
              <button onClick={() => setShowTopPerformingModal(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Content Performance Breakdown
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  Analysis of top 10 influencer posts from Q1 2026 reveals key patterns in content format, messaging, and engagement drivers.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">#1: Spring Dress Styling by @stylewithjulia</h4>
                    <Tag variant="green">Top EMV</Tag>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">EMV</div>
                      <div className="text-[18px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>$8,400</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Engagement</div>
                      <div className="text-[18px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>4.8%</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Saves</div>
                      <div className="text-[18px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>2,840</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Conversions</div>
                      <div className="text-[18px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>18</div>
                    </div>
                  </div>
                  <div className="p-3 bg-[var(--pink-light)] rounded-[var(--radius-md)] text-[13px]">
                    <strong className="text-[var(--pink)]">Success Factors:</strong> Carousel format showing 3 styling options, authentic voiceover explaining fit and versatility, strong call-to-action with discount code
                  </div>
                </div>

                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">#2: Sustainable Fashion Tips by @emma.sustainable</h4>
                    <Tag variant="green">High Engagement</Tag>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">EMV</div>
                      <div className="text-[18px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>$6,200</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Engagement</div>
                      <div className="text-[18px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>7.2%</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Saves</div>
                      <div className="text-[18px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>1,960</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Conversions</div>
                      <div className="text-[18px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>14</div>
                    </div>
                  </div>
                  <div className="p-3 bg-[var(--green-light)] rounded-[var(--radius-md)] text-[13px]">
                    <strong className="text-[var(--green)]">Success Factors:</strong> Educational Reel format, aligned with creator's sustainable fashion niche, emphasized Femme's eco-friendly materials and ethical production
                  </div>
                </div>

                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">#3: Capsule Wardrobe Guide by @minimal_meg</h4>
                    <Tag variant="pink">Best Saves</Tag>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">EMV</div>
                      <div className="text-[18px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>$5,800</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Engagement</div>
                      <div className="text-[18px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>6.1%</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Saves</div>
                      <div className="text-[18px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>3,240</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Conversions</div>
                      <div className="text-[18px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>12</div>
                    </div>
                  </div>
                  <div className="p-3 bg-[var(--terra-light)] rounded-[var(--radius-md)] text-[13px]">
                    <strong className="text-[var(--terra)]">Success Factors:</strong> Highly shareable "how-to" content format, featured 8 Femme pieces in mix-and-match grid, saved by users for future shopping reference
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-[var(--radius-lg)] border-l-4 bg-[var(--pink-light)] border-[var(--pink)]">
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <Sparkles className="w-4 h-4" />
                  Strategic Recommendations
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--pink)]">
                    <span className="mt-1">•</span>
                    <span>Prioritize carousel and Reel formats for upcoming campaigns (3.2x higher engagement vs. static posts)</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--pink)]">
                    <span className="mt-1">•</span>
                    <span>Encourage creators to feature multiple product styling options to increase saves and purchase consideration</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--pink)]">
                    <span className="mt-1">•</span>
                    <span>Educational content (how-to, styling guides, sustainability tips) drives 2.4x more saves than pure lifestyle content</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--pink)]">
                    <span className="mt-1">•</span>
                    <span>Partner with creators whose niche aligns with Femme brand values (sustainability, quality, timelessness) for authentic messaging</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Growth Program Modal */}
      {showGrowthProgramModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowGrowthProgramModal(false)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--green-light)] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[var(--green)]" />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    Influencer Program Growth Strategy
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">Q1 2026 performance and Q2 expansion plan</p>
                </div>
              </div>
              <button onClick={() => setShowGrowthProgramModal(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Q1 2026 Performance Summary
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                    <div className="text-[11px] text-[var(--text-tertiary)] mb-1">New Partnerships</div>
                    <div className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>+8</div>
                    <div className="text-[11px] text-[var(--green)]">↑ 33% vs Q4</div>
                  </div>
                  <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                    <div className="text-[11px] text-[var(--text-tertiary)] mb-1">EMV Growth</div>
                    <div className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>+42%</div>
                    <div className="text-[11px] text-[var(--green)]">↑ $106.8K total</div>
                  </div>
                  <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                    <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Content Pieces</div>
                    <div className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>+28</div>
                    <div className="text-[11px] text-[var(--green)]">82 total posts</div>
                  </div>
                  <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                    <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Engagement Rate</div>
                    <div className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>+1.8%</div>
                    <div className="text-[11px] text-[var(--green)]">Now 5.8% avg</div>
                  </div>
                </div>
              </div>

              <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-3">What Drove Growth in Q1</h3>
                <ul className="space-y-2 text-[13px] text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--green)] mt-0.5 flex-shrink-0" />
                    <span><strong>Micro-influencer focus:</strong> 75% of new partnerships were micro-influencers (50K-150K followers), delivering higher engagement rates and better ROI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--green)] mt-0.5 flex-shrink-0" />
                    <span><strong>Niche alignment:</strong> Targeted creators in sustainable fashion, minimalism, and ethical consumption aligned with Femme brand values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--green)] mt-0.5 flex-shrink-0" />
                    <span><strong>Content format optimisation:</strong> Shifted from static posts to Reels and carousels, resulting in 3.2x higher engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--green)] mt-0.5 flex-shrink-0" />
                    <span><strong>Long-term relationships:</strong> 3 creators moved to VIP tier with multi-campaign contracts, improving content quality and consistency</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[var(--green)] rounded-[var(--radius-lg)] p-5 bg-[var(--green-light)]">
                <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[var(--green)]" />
                  Q2 2026 Growth Targets
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>New Partnerships</div>
                    <div className="text-[24px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>12 creators</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">Focus: 60K-100K follower range</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>EMV Target</div>
                    <div className="text-[24px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>$180K</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">+68% increase vs Q1</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>Content Output</div>
                    <div className="text-[24px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>120 posts</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">46% increase, all formats</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>VIP Creators</div>
                    <div className="text-[24px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>12 total</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">+4 promoted to VIP tier</div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-[var(--radius-lg)] border-l-4 bg-[var(--green-light)] border-[var(--green)]">
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <Sparkles className="w-4 h-4" />
                  Q2 Action Plan
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--green)]">
                    <span className="mt-1">•</span>
                    <span>Onboard 12 new micro-influencers by May 15 for Mother's Day and Summer campaigns</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--green)]">
                    <span className="mt-1">•</span>
                    <span>Launch creator gifting program: send 2-3 pieces quarterly to maintain relationships and generate organic content</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--green)]">
                    <span className="mt-1">•</span>
                    <span>Develop tiered compensation structure: $1,200-$2,400 (micro), $4,000-$8,000 (macro), based on engagement + EMV</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--green)]">
                    <span className="mt-1">•</span>
                    <span>Create VIP creator perks: early access to new collections, exclusive discount codes, quarterly strategy calls</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--green)]">
                    <span className="mt-1">•</span>
                    <span>Pilot affiliate program with top 5 performers: 15% commission on sales from unique discount codes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prospecting Modal */}
      {showProspectingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowProspectingModal(false)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--terra-light)] flex items-center justify-center">
                  <Search className="w-6 h-6 text-[var(--terra)]" />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>
                    Advanced Creator Search
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">AI-powered prospecting filters and recommendations</p>
                </div>
              </div>
              <button onClick={() => setShowProspectingModal(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">Follower Range</label>
                  <select className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]">
                    <option>50K - 100K</option>
                    <option>100K - 250K</option>
                    <option>250K+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">Min Engagement Rate</label>
                  <select className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]">
                    <option>5%+</option>
                    <option>6%+</option>
                    <option>7%+</option>
                    <option>8%+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">Content Niche</label>
                  <select className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]">
                    <option>Sustainable Fashion</option>
                    <option>Minimalist Style</option>
                    <option>Ethical Fashion</option>
                    <option>All Niches</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-[var(--pink-light)] border border-[var(--pink)] rounded-[var(--radius-md)]">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-[var(--pink)]" />
                  <span className="text-[14px] font-medium text-[var(--text-primary)]">AI Recommendation</span>
                </div>
                <p className="text-[13px] text-[var(--text-secondary)]">
                  Based on your current top performers, we recommend focusing on creators with 60K-95K followers in sustainable fashion niches. These creators deliver 2.1x better ROI and align with Femme brand values.
                </p>
              </div>

              <div>
                <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-4">Recommended Prospects</h3>
                <div className="space-y-3">
                  {prospectData.slice(0, 4).map((prospect, index) => (
                    <div key={index} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4 hover:border-[var(--pink)] transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Instagram className="w-5 h-5 text-[var(--pink)]" />
                          <div>
                            <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">{prospect.name}</h4>
                            <div className="flex items-center gap-3 text-[12px] text-[var(--text-secondary)] mt-1">
                              <span>{(prospect.followers / 1000).toFixed(0)}K followers</span>
                              <span>•</span>
                              <span>{prospect.engagement}% engagement</span>
                              <span>•</span>
                              <span>{prospect.location}</span>
                            </div>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Send Outreach
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <Tag variant="buff">{prospect.niche}</Tag>
                        <span className="text-[13px] text-[var(--text-secondary)]">Est. EMV: <strong className="text-[var(--green)]">{prospect.estimatedEMV}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Influencer Insight Modal */}
      {showInfluencerInsightModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowInfluencerInsightModal(false)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--green-light)] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[var(--green)]" />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    AI Influencer Insight
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">Strategic analysis of your influencer program</p>
                </div>
              </div>
              <button onClick={() => setShowInfluencerInsightModal(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Performance Breakdown
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  Your micro-influencer strategy (50K-150K followers) is significantly outperforming macro-influencer partnerships across key metrics.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <Tag variant="green" className="mb-3">Micro-Influencers</Tag>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Avg Engagement Rate</div>
                      <div className="text-[2rem] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>6.8%</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Cost per Conversion</div>
                      <div className="text-[2rem] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>$42</div>
                    </div>
                    <div className="text-[13px] text-[var(--text-secondary)]">
                      <strong className="text-[var(--green)]">2.3x</strong> higher engagement vs. macro influencers
                    </div>
                  </div>
                </div>

                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <Tag variant="pink" className="mb-3">Macro-Influencers</Tag>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Avg Engagement Rate</div>
                      <div className="text-[2rem] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>2.9%</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Cost per Conversion</div>
                      <div className="text-[2rem] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>$58</div>
                    </div>
                    <div className="text-[13px] text-[var(--text-secondary)]">
                      Higher reach but <strong className="text-[var(--pink)]">28% higher</strong> conversion cost
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-3">Top Performing Creators</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                    <div>
                      <div className="text-[14px] font-medium text-[var(--text-primary)]">@emma.sustainable</div>
                      <div className="text-[12px] text-[var(--text-secondary)]">64K followers • 7.2% engagement</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[var(--text-tertiary)]">Conversion Rate</div>
                      <div className="text-[18px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>4.8%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                    <div>
                      <div className="text-[14px] font-medium text-[var(--text-primary)]">@minimal_meg</div>
                      <div className="text-[12px] text-[var(--text-secondary)]">125K followers • 6.8% engagement</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[var(--text-tertiary)]">Conversion Rate</div>
                      <div className="text-[18px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>4.2%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-[var(--radius-lg)] border-l-4 bg-[var(--green-light)] border-[var(--green)]">
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <Target className="w-4 h-4" />
                  Strategic Recommendations
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--green)]">
                    <span className="mt-1">•</span>
                    <span>Expand partnerships with @emma.sustainable and @minimal_meg — their conversion rates are 2.4x above program average</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--green)]">
                    <span className="mt-1">•</span>
                    <span>Allocate 75% of Q2 budget to micro-influencer partnerships for optimal ROI</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--green)]">
                    <span className="mt-1">•</span>
                    <span>Consider long-term contracts with top 5 performers to lock in rates and ensure consistency</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Partnership Opportunity Modal */}
      {showPartnershipModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPartnershipModal(false)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--pink-light)] flex items-center justify-center">
                  <Users className="w-6 h-6 text-[var(--pink)]" />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                    Partnership Opportunity Breakdown
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">5 creators identified for sustainable fashion campaign</p>
                </div>
              </div>
              <button onClick={() => setShowPartnershipModal(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Avg Followers</div>
                  <div className="text-[2rem] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>82K</div>
                </div>
                <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Avg Engagement</div>
                  <div className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>6.4%</div>
                </div>
                <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Total Creators</div>
                  <div className="text-[2rem] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>5</div>
                </div>
              </div>

              <div>
                <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-4">Identified Creators</h3>
                <div className="space-y-3">
                  {[
                    { name: "@lily.everyday", followers: "92K", engagement: "6.8%", niche: "Sustainable Fashion" },
                    { name: "@green.wardrobe", followers: "68K", engagement: "8.1%", niche: "Eco-Fashion" },
                    { name: "@conscious.closet", followers: "84K", engagement: "7.5%", niche: "Ethical Fashion" },
                    { name: "@chic_and_simple", followers: "78K", engagement: "7.2%", niche: "Minimalist Style" },
                    { name: "@refined.looks", followers: "88K", engagement: "6.4%", niche: "Professional Style" },
                  ].map((creator, idx) => (
                    <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Instagram className="w-5 h-5 text-[var(--pink)]" />
                          <div>
                            <div className="text-[14px] font-medium text-[var(--text-primary)]">{creator.name}</div>
                            <div className="text-[12px] text-[var(--text-secondary)]">{creator.followers} followers • {creator.engagement} engagement</div>
                          </div>
                        </div>
                        <Tag variant="buff">{creator.niche}</Tag>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[var(--pink)] rounded-[var(--radius-lg)] p-5 bg-[var(--pink-light)]">
                <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-3">Campaign Budget Estimate</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      Estimated Budget
                    </div>
                    <div className="text-[2rem] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>$8,200</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">For 3-post series per creator</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      Projected EMV
                    </div>
                    <div className="text-[2rem] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>$24K+</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">Estimated conversions: 45-60</div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-[var(--radius-lg)] border-l-4 bg-[var(--pink-light)] border-[var(--pink)]">
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <Sparkles className="w-4 h-4" />
                  Why These Creators?
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--pink)]">
                    <span className="mt-1">•</span>
                    <span>All creators focus on sustainable fashion niche, perfectly aligned with Femme brand values</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--pink)]">
                    <span className="mt-1">•</span>
                    <span>Engagement rates 2x above industry average for their follower count</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--pink)]">
                    <span className="mt-1">•</span>
                    <span>Perfect timing for Easter and Mother's Day campaigns (April-May launch window)</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--pink)]">
                    <span className="mt-1">•</span>
                    <span>Audience demographics match Femme target market: Women 25-45, eco-conscious shoppers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Strategic Recommendations Modal */}
      {showStrategicModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowStrategicModal(false)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--terra-light)] flex items-center justify-center">
                  <Target className="w-6 h-6 text-[var(--terra)]" />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>
                    Strategic Content Recommendations
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">Q1 2026 performance analysis insights</p>
                </div>
              </div>
              <button onClick={() => setShowStrategicModal(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Content Performance Analysis
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  Based on Q1 performance data, lifestyle-focused content significantly outperforms static product photography across all engagement metrics.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <Tag variant="green" className="mb-3">Lifestyle Content</Tag>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Avg Saves per Post</div>
                      <div className="text-[2rem] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>2,840</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Engagement Rate</div>
                      <div className="text-[2rem] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>7.2%</div>
                    </div>
                    <div className="text-[13px] text-[var(--green)]">
                      <strong>3.1x more saves</strong> vs. static product shots
                    </div>
                  </div>
                </div>

                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <Tag variant="pink" className="mb-3">Product Photography</Tag>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Avg Saves per Post</div>
                      <div className="text-[2rem] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>920</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Engagement Rate</div>
                      <div className="text-[2rem] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>3.8%</div>
                    </div>
                    <div className="text-[13px] text-[var(--text-secondary)]">
                      Good for product visibility, lower engagement
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-3">Top-Performing Lifestyle Content Types</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                    <div className="text-[14px] font-medium text-[var(--text-primary)] mb-1">Getting-Ready Routines</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">Avg 3,240 saves • 8.1% engagement • Shows product in realistic context</div>
                  </div>
                  <div className="p-3 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                    <div className="text-[14px] font-medium text-[var(--text-primary)] mb-1">Day-in-the-Life Content</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">Avg 2,960 saves • 7.6% engagement • Authentic product integration</div>
                  </div>
                  <div className="p-3 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                    <div className="text-[14px] font-medium text-[var(--text-primary)] mb-1">Styling Tutorials</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">Avg 2,580 saves • 7.2% engagement • Educational value drives saves</div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-[var(--radius-lg)] border-l-4 bg-[var(--terra-light)] border-[var(--terra)]">
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <Sparkles className="w-4 h-4" />
                  Recommendations for Mother's Day Campaign
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--terra)]">
                    <span className="mt-1">•</span>
                    <span>Shift 40% of creator briefs to lifestyle-focused storytelling format for maximum shareability</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--terra)]">
                    <span className="mt-1">•</span>
                    <span>Brief creators to feature Femme pieces in authentic, everyday scenarios (getting ready for Mother's Day brunch, gift unwrapping moments)</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--terra)]">
                    <span className="mt-1">•</span>
                    <span>Encourage "multi-look" content: one creator showing 3 different ways to style a single piece</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--terra)]">
                    <span className="mt-1">•</span>
                    <span>Focus on emotional storytelling: creators sharing why they're gifting Femme pieces to their mothers/loved ones</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Engagement Analysis Modal */}
      {showEngagementModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEngagementModal(false)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--green-light)] flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[var(--green)]" />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    Engagement Analysis
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">Detailed breakdown of influencer engagement metrics</p>
                </div>
              </div>
              <button onClick={() => setShowEngagementModal(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-4">Total Engagement</h3>
                  <div className="text-[3rem] font-medium text-[var(--green)] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                    {Math.round((68200 + 8420 + 4680 + 12840) * multiplier).toLocaleString()}
                  </div>
                  <div className="text-[13px] text-[var(--text-secondary)]">Combined interactions across all metrics</div>
                </div>

                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-4">Engagement Rate</h3>
                  <div className="text-[3rem] font-medium text-[var(--green)] mb-2" style={{ fontFamily: "var(--font-serif)" }}>5.8%</div>
                  <div className="text-[13px] text-[var(--green)]">↑ +1.2% vs. previous period</div>
                </div>
              </div>

              <div>
                <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-4">Engagement Breakdown by Type</h3>
                <div className="space-y-4">
                  <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-[var(--pink)]" />
                        <span className="text-[14px] font-medium text-[var(--text-primary)]">Likes</span>
                      </div>
                      <Tag variant="pink">72%</Tag>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[2rem] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {Math.round(68200 * multiplier).toLocaleString()}
                      </div>
                      <div className="text-right">
                        <div className="h-2 w-40 bg-[var(--surface)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--pink)]" style={{ width: "72%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-[var(--terra)]" />
                        <span className="text-[14px] font-medium text-[var(--text-primary)]">Saves</span>
                      </div>
                      <Tag variant="green">Highest Value</Tag>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[2rem] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {Math.round(12840 * multiplier).toLocaleString()}
                      </div>
                      <div className="text-right">
                        <div className="text-[12px] text-[var(--text-secondary)]">Strong purchase intent signal</div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-[var(--green)]" />
                        <span className="text-[14px] font-medium text-[var(--text-primary)]">Comments</span>
                      </div>
                      <Tag variant="green">9%</Tag>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[2rem] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {Math.round(8420 * multiplier).toLocaleString()}
                      </div>
                      <div className="text-right">
                        <div className="h-2 w-40 bg-[var(--surface)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--green)]" style={{ width: "9%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-[var(--buff-dark)]" />
                        <span className="text-[14px] font-medium text-[var(--text-primary)]">Shares</span>
                      </div>
                      <Tag variant="buff">5%</Tag>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[2rem] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {Math.round(4680 * multiplier).toLocaleString()}
                      </div>
                      <div className="text-right">
                        <div className="h-2 w-40 bg-[var(--surface)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--buff-dark)]" style={{ width: "5%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-[var(--radius-lg)] border-l-4 bg-[var(--green-light)] border-[var(--green)]">
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <Sparkles className="w-4 h-4" />
                  Key Insights
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--green)]">
                    <span className="mt-1">•</span>
                    <span>Saves are 2.7x higher than industry average — strong indicator of purchase intent</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--green)]">
                    <span className="mt-1">•</span>
                    <span>Comment rate of 9% indicates high audience engagement and authentic creator-follower relationships</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--green)]">
                    <span className="mt-1">•</span>
                    <span>Focus on content formats that drive saves (carousels, styling tutorials, how-to content)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Prospects Modal */}
      {showViewProspectsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowViewProspectsModal(false)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--pink-light)] flex items-center justify-center">
                  <Users className="w-6 h-6 text-[var(--pink)]" />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                    Creator Prospects
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">Detailed profiles and contact information</p>
                </div>
              </div>
              <button onClick={() => setShowViewProspectsModal(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {[
                {
                  name: "Lily Chen",
                  handle: "@lily.everyday",
                  image: "LC",
                  followers: "92K",
                  engagement: "6.8%",
                  niche: "Sustainable Fashion",
                  location: "Portland, OR",
                  email: "lily.chen@email.com",
                  phone: "(503) 555-0142",
                  avgLikes: "6,240",
                  avgComments: "420",
                  estimatedEMV: "$15,200"
                },
                {
                  name: "Maya Rodriguez",
                  handle: "@chic_and_simple",
                  image: "MR",
                  followers: "78K",
                  engagement: "7.2%",
                  niche: "Minimalist Style",
                  location: "Brooklyn, NY",
                  email: "maya.r@email.com",
                  phone: "(718) 555-0198",
                  avgLikes: "5,620",
                  avgComments: "380",
                  estimatedEMV: "$12,800"
                },
                {
                  name: "Emma Green",
                  handle: "@green.wardrobe",
                  image: "EG",
                  followers: "68K",
                  engagement: "8.1%",
                  niche: "Eco-Fashion",
                  location: "San Francisco, CA",
                  email: "e.green@email.com",
                  phone: "(415) 555-0167",
                  avgLikes: "5,510",
                  avgComments: "450",
                  estimatedEMV: "$14,400"
                },
                {
                  name: "Sophie Martinez",
                  handle: "@style.curator",
                  image: "SM",
                  followers: "105K",
                  engagement: "5.9%",
                  niche: "Fashion Curation",
                  location: "Los Angeles, CA",
                  email: "sophie.m@email.com",
                  phone: "(310) 555-0123",
                  avgLikes: "6,200",
                  avgComments: "340",
                  estimatedEMV: "$18,600"
                },
                {
                  name: "Rachel Kim",
                  handle: "@conscious.closet",
                  image: "RK",
                  followers: "84K",
                  engagement: "7.5%",
                  niche: "Ethical Fashion",
                  location: "Seattle, WA",
                  email: "rachel.kim@email.com",
                  phone: "(206) 555-0189",
                  avgLikes: "6,300",
                  avgComments: "410",
                  estimatedEMV: "$16,200"
                },
                {
                  name: "Anna Foster",
                  handle: "@refined.looks",
                  image: "AF",
                  followers: "96K",
                  engagement: "6.4%",
                  niche: "Professional Style",
                  location: "Chicago, IL",
                  email: "anna.foster@email.com",
                  phone: "(312) 555-0176",
                  avgLikes: "6,140",
                  avgComments: "370",
                  estimatedEMV: "$17,400"
                },
              ].map((prospect, idx) => (
                <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5 hover:border-[var(--pink)] transition-colors">
                  <div className="flex gap-5">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--pink)] to-[var(--terra)] flex items-center justify-center text-white text-[20px] font-semibold flex-shrink-0" style={{ fontFamily: "var(--font-serif)" }}>
                      {prospect.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-1">{prospect.name}</h3>
                          <div className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)] mb-2">
                            <Instagram className="w-4 h-4 text-[var(--pink)]" />
                            <span className="font-medium">{prospect.handle}</span>
                          </div>
                          <div className="flex items-center gap-4 text-[12px] text-[var(--text-secondary)]">
                            <span>{prospect.followers} followers</span>
                            <span>•</span>
                            <span>{prospect.engagement} engagement</span>
                            <span>•</span>
                            <span>{prospect.location}</span>
                          </div>
                        </div>
                        <Tag variant="buff">{prospect.niche}</Tag>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                          <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>Avg Likes</div>
                          <div className="text-[16px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>{prospect.avgLikes}</div>
                        </div>
                        <div className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                          <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>Avg Comments</div>
                          <div className="text-[16px] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>{prospect.avgComments}</div>
                        </div>
                        <div className="p-3 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                          <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>Est. EMV</div>
                          <div className="text-[16px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>{prospect.estimatedEMV}</div>
                        </div>
                        <div className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                          <button className="w-full px-3 py-1.5 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[11px] font-medium flex items-center justify-center gap-1">
                            <Mail className="w-3 h-3" />
                            Contact
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 p-3 bg-[var(--surface)] rounded-[var(--radius-md)] text-[12px]">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[var(--text-tertiary)]" />
                          <span className="text-[var(--text-secondary)]">{prospect.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[var(--text-tertiary)]">📱</span>
                          <span className="text-[var(--text-secondary)]">{prospect.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

        {/* Action Strip */}
        <ActionStrip data={actionStripData} />
      </div>
    </div>
  );
}