import { useState } from "react";
import { Card, CardTitle, MetricCard, Tag, AIInsightCard } from "../components/ui/Card";
import { FilterBar, StatGrid } from "../components/ui/Filters";
import PageHeader from "../components/PageHeader";
import { AIWidget } from "../components/AIWidget";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import { DetailedBriefModal, DetailedBriefData } from "../components/DetailedBriefModal";
import { CampaignWorkflowModal } from "../components/CampaignWorkflowModal";
import { ProductionOverviewModal } from "../components/ProductionOverviewModal";
import { CampaignBriefModal } from "../components/CampaignBriefModal";
import { Calendar, DollarSign, Target, Users, TrendingUp, CheckCircle2, Clock, AlertCircle, Plus, ExternalLink, Copy, X, Sparkles, BarChart3, Zap, Package, Palette, Mail, Share2, Download } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

const campaignTemplate = {
  name: "Mother's Day 2026 Campaign",
  status: "Planning",
  timeline: { start: "May 3, 2026", end: "May 10, 2026" },
  budget: {
    total: 12600,
    allocation: {
      meta: 5040,
      email: 2520,
      googleAds: 3780,
      pinterest: 1260,
    }
  },
  objectives: [
    "Drive gift purchases for Mother's Day",
    "Increase average order value (AOV) to $145+",
    "Acquire first-time buyers (target: 35% of conversions)",
  ],
  targetKPIs: {
    roas: "5.0x",
    conversions: "420-480",
    reach: "120K+",
    aov: "$145",
  },
  channels: [
    {
      name: "Meta Ads",
      budget: 5040,
      tactics: ["Carousel ads featuring gift sets", "Dynamic product ads", "Story ads with gift guides"],
      allocation: "40%",
    },
    {
      name: "Email (Klaviyo)",
      budget: 2520,
      tactics: ["Gift guide email series", "Last-minute reminder", "VIP early access"],
      allocation: "20%",
    },
    {
      name: "Google Ads",
      budget: 3780,
      tactics: ["Shopping ads", "Search: 'mother's day gifts'", "Display remarketing"],
      allocation: "30%",
    },
    {
      name: "Pinterest",
      budget: 1260,
      tactics: ["Promoted pins", "Gift boards", "Seasonal trends"],
      allocation: "10%",
    },
  ],
  creativeAssets: [
    { type: "Hero Image", status: "ready", owner: "Design Team" },
    { type: "Product Photography (6 items)", status: "in-progress", owner: "Studio" },
    { type: "Gift Guide PDF", status: "planning", owner: "Content Team" },
    { type: "Email Templates (3)", status: "ready", owner: "Email Team" },
    { type: "Social Copy (15 variants)", status: "in-progress", owner: "Copywriter" },
    { type: "Meta Ad Creative (10)", status: "planning", owner: "Performance Team" },
  ],
  contentCalendar: [
    { date: "Apr 28", channel: "Email", content: "VIP Early Access Announcement", status: "scheduled" },
    { date: "Apr 29", channel: "Instagram", content: "Mother's Day Gift Guide Teaser", status: "scheduled" },
    { date: "Apr 30", channel: "TikTok", content: "Behind the Scenes: Gift Wrapping", status: "draft" },
    { date: "May 1", channel: "Email", content: "Gift Guide Email - Wave 1", status: "draft" },
    { date: "May 3", channel: "Meta", content: "Campaign Launch - All Ad Sets", status: "ready" },
    { date: "May 3", channel: "Pinterest", content: "Promoted Pins Launch", status: "ready" },
    { date: "May 4", channel: "Email", content: "Gift Guide Email - Wave 2", status: "planning" },
    { date: "May 6", channel: "Instagram Stories", content: "Customer Gift Testimonials", status: "planning" },
    { date: "May 8", channel: "Email", content: "Last Chance - Free Express Shipping", status: "planning" },
    { date: "May 9", channel: "Meta", content: "Final 24 Hours Push", status: "planning" },
  ],
  milestones: [
    { task: "Campaign brief finalized", date: "Apr 20", status: "completed" },
    { task: "Creative assets delivered", date: "Apr 28", status: "in-progress" },
    { task: "Ads set up in Meta & Google", date: "Apr 30", status: "pending" },
    { task: "Email flows scheduled in Klaviyo", date: "May 1", status: "pending" },
    { task: "Campaign launch", date: "May 3", status: "pending" },
    { task: "Mid-campaign optimisation review", date: "May 6", status: "pending" },
    { task: "Campaign wrap & report", date: "May 12", status: "pending" },
  ],
};

const aiRecommendation = {
  title: "AI Campaign Recommendation",
  overview: "Based on last year's Mother's Day performance (+$42K revenue, 4.8x ROAS) and current market trends, we've identified four high-impact optimisations for this campaign. These recommendations are projected to increase revenue by $8.2K-$12.4K while maintaining your 5.0x ROAS target.",
  impact: {
    revenueIncrease: "$8.2K - $12.4K",
    roasImprovement: "+0.3x to 5.3x",
    conversionIncrease: "+85-120 conversions",
    confidence: "87%",
  },
  recommendations: [
    {
      title: "Increase Pinterest Budget by 15%",
      detail: "Pinterest shows strong gift discovery intent during Mother's Day. Last year, Pinterest delivered 4.2x ROAS vs. 3.8x platform average.",
      action: "Reallocate $189 from Google Display to Pinterest Promoted Pins",
      impact: "+$2,100 estimated revenue, +0.2x ROAS",
    },
    {
      title: "Launch SMS Reminder Flow on May 7th",
      detail: "Abandoned cart SMS reminders show 23% recovery rate for gift purchases vs. 12% email-only.",
      action: "Set up Klaviyo SMS flow targeting carts $80+ abandoned for 24+ hours",
      impact: "+$3,400 estimated revenue from cart recovery",
    },
    {
      title: "Add 'Gift Note' Upsell at Checkout",
      detail: "Tested feature showed +$18 AOV when customers add personalized gift notes. 42% adoption rate during gift occasions.",
      action: "Enable gift note option at checkout with suggested messages",
      impact: "+$2,700 incremental revenue from AOV lift",
    },
    {
      title: "Extend Campaign End Date to May 11",
      detail: "Last year, 22% of Mother's Day revenue came from May 10-11 (last-minute shoppers). Ending on May 10 leaves money on the table.",
      action: "Extend campaign 1 day, allocate $800 for final push ads",
      impact: "+$4,200 estimated revenue from extended window",
    },
  ],
  budgetAdjustments: [
    { channel: "Meta", current: 5040, recommended: 4950, change: -90 },
    { channel: "Email", current: 2520, recommended: 2520, change: 0 },
    { channel: "Google", current: 3780, recommended: 3591, change: -189 },
    { channel: "Pinterest", current: 1260, recommended: 1449, change: +189 },
    { channel: "SMS (New)", current: 0, recommended: 290, change: +290 },
  ],
  nextSteps: [
    "Review and approve budget reallocation ($189 Google → Pinterest, +$290 SMS)",
    "Brief design team on Pinterest creative requirements (gift board aesthetics)",
    "Set up SMS flow in Klaviyo with abandoned cart triggers",
    "Enable gift note feature in Shopify checkout settings",
    "Extend campaign end date to May 11 in all channel calendars",
    "Schedule final push ads for May 10-11 timeframe",
  ],
};

const quarterlyReleases = [
  {
    quarter: "Q4 2026",
    releases: [
      { name: "Autumn Linen Collection", skus: 6, launchDate: "May 15", campaignBudget: "$8,400", status: "Planning" },
      { name: "Wedding Season Essentials", skus: 8, launchDate: "Apr 20", campaignBudget: "$11,200", status: "Active" },
    ],
  },
  {
    quarter: "Q1 2027",
    releases: [
      { name: "Accessories Launch", skus: 12, launchDate: "Jul 1", campaignBudget: "$9,800", status: "Ideation" },
      { name: "Back to Work Edit", skus: 10, launchDate: "Aug 15", campaignBudget: "$16,800", status: "Ideation" },
    ],
  },
];

const seasonalCampaigns = [
  { season: "Autumn/Winter 2026", campaigns: 6, totalBudget: "$42,800", status: "Active", keyDates: "Apr - Jul 2026" },
  { season: "Spring/Summer 2026-27", campaigns: 8, totalBudget: "$68,200", status: "Planning", keyDates: "Sep 2026 - Jan 2027" },
];

const channelPerformance = [
  { channel: "Meta", q1Spend: 18200, q1Revenue: 74600, q1Roas: 4.1, q1Cac: 68, q2RoasTarget: 5.0, q2CacTarget: 52, roasRecommendation: "Increase budget 12%", cacRecommendation: "Optimise for conversions, test Advantage+ audiences" },
  { channel: "Email", q1Spend: 8400, q1Revenue: 42800, q1Roas: 5.1, q1Cac: 28, q2RoasTarget: 5.2, q2CacTarget: 25, roasRecommendation: "Maintain, add SMS", cacRecommendation: "Segment by purchase history, improve deliverability" },
  { channel: "Google", q1Spend: 12600, q1Revenue: 63400, q1Roas: 5.0, q1Cac: 52, q2RoasTarget: 5.5, q2CacTarget: 38, roasRecommendation: "Optimise Shopping", cacRecommendation: "Reduce CAC by 27% through Smart Bidding + negative keyword expansion. Shift budget from Display to high-intent Search campaigns." },
  { channel: "Pinterest", q1Spend: 4200, q1Revenue: 12800, q1Roas: 3.0, q1Cac: 85, q2RoasTarget: 4.2, q2CacTarget: 62, roasRecommendation: "Test gift occasions", cacRecommendation: "Focus on gift discovery keywords, optimise pin quality score" },
  { channel: "TikTok", q1Spend: 2800, q1Revenue: 13400, q1Roas: 4.8, q1Cac: 42, q2RoasTarget: 5.0, q2CacTarget: 40, roasRecommendation: "Scale gradually", cacRecommendation: "Maintain low CAC, expand to lookalike audiences slowly" },
];

const channelDetails = {
  "Meta Ads": {
    tactics: [
      { name: "Carousel ads featuring gift sets", budget: 2016, estimated: { impressions: "420K", clicks: "8.4K", conversions: "168", roas: "5.2x" } },
      { name: "Dynamic product ads", budget: 1512, estimated: { impressions: "310K", clicks: "6.2K", conversions: "124", roas: "4.8x" } },
      { name: "Story ads with gift guides", budget: 1512, estimated: { impressions: "285K", clicks: "5.7K", conversions: "128", roas: "5.1x" } },
    ],
    forecast: "Meta is projected to deliver 420-480 conversions at $12 avg CPA. Strong performance expected on May 3-5 (campaign launch) and May 8-10 (final push). Recommend monitoring frequency caps to avoid audience fatigue.",
  },
  "Email (Klaviyo)": {
    tactics: [
      { name: "Gift guide email series", budget: 1260, estimated: { opens: "38K", clicks: "7.6K", conversions: "152", roas: "6.2x" } },
      { name: "Last-minute reminder", budget: 630, estimated: { opens: "42K", clicks: "8.4K", conversions: "168", roas: "7.1x" } },
      { name: "VIP early access", budget: 630, estimated: { opens: "18K", clicks: "4.5K", conversions: "95", roas: "8.4x" } },
    ],
    forecast: "Email expected to be top ROAS performer at 6.5-7.0x. VIP segment shows 42% higher conversion rates. Last-minute emails (May 8-9) historically drive 28% of total email revenue for gift occasions.",
  },
  "Google Ads": {
    tactics: [
      { name: "Shopping ads", budget: 2268, estimated: { impressions: "520K", clicks: "10.4K", conversions: "208", roas: "5.4x" } },
      { name: "Search: 'mother's day gifts'", budget: 1134, estimated: { impressions: "180K", clicks: "5.4K", conversions: "135", roas: "6.8x" } },
      { name: "Display remarketing", budget: 378, estimated: { impressions: "450K", clicks: "4.5K", conversions: "45", roas: "3.2x" } },
    ],
    forecast: "Shopping ads will drive majority of Google conversions. Search campaigns show high intent (6.8x ROAS target). Display remarketing serves as support channel for brand awareness and retargeting abandoned carts.",
  },
  "Pinterest": {
    tactics: [
      { name: "Promoted pins", budget: 756, estimated: { impressions: "320K", clicks: "6.4K", conversions: "96", roas: "4.5x" } },
      { name: "Gift boards", budget: 378, estimated: { impressions: "180K", clicks: "3.6K", conversions: "54", roas: "4.2x" } },
      { name: "Seasonal trends", budget: 126, estimated: { impressions: "95K", clicks: "1.9K", conversions: "24", roas: "3.8x" } },
    ],
    forecast: "Pinterest performs exceptionally well for gift discovery. Users are 2.3x more likely to purchase vs other platforms. Peak performance expected May 1-5 as users create gift boards and save ideas.",
  },
};

const contentPreviews = {
  "VIP Early Access Announcement": {
    channel: "Email",
    mockup: "Subject: You're Invited: Early Access to Mother's Day Collection 💝\n\nHi [First Name],\n\nAs one of our VIP members, you get first access to our curated Mother's Day collection before anyone else.\n\nShop Now (48 hours early access)\n- Silk scarves from $85\n- Artisan jewelry $95-$145\n- Premium gift sets $125\n\n+ Free gift wrapping\n+ Express shipping available\n\nYour exclusive window: Apr 28-29",
    preview: "Email preview with hero image, product grid, and CTA button",
  },
  "Mother's Day Gift Guide Teaser": {
    channel: "Instagram",
    mockup: "Instagram Post Caption:\n🌸 The gift guide she actually wants is dropping tomorrow.\n\nThoughtful, timeless pieces for the woman who has it all (but deserves more).\n\nSet your reminder 👆\n\n#MothersDay #GiftGuide #ThoughtfulGifts",
    preview: "Instagram carousel showing 5 gift categories with soft pink aesthetic",
  },
  "Behind the Scenes: Gift Wrapping": {
    channel: "TikTok",
    mockup: "TikTok Video Concept:\n15-second video showing gift wrapping process\n- Unboxing linen wrap top\n- Tissue paper fold technique\n- Ribbon tie close-up\n- Handwritten gift note\n\nCaption: POV: You ordered the perfect Mother's Day gift and we're wrapping it like she deserves 🎀\n\n#GiftWrapping #MothersDay #ASMR",
    preview: "TikTok vertical video storyboard with ASMR audio notes",
  },
  "Gift Guide Email - Wave 1": {
    channel: "Email",
    mockup: "Subject: The Mother's Day Gift Guide You've Been Waiting For 🌷\n\nHi [First Name],\n\nWe curated the perfect edit for every type of mom:\n\n👗 For the Fashion Lover: Midi wrap dress, linen pants\n💍 For the Jewelry Collector: Gold hoops, layering necklaces\n🧘‍♀️ For the Wellness Mom: Cashmere cardigan, silk robe\n☕ For the Homebody: Cozy loungewear set\n\nShop by May 6 for guaranteed Mother's Day delivery.\n\nFree express shipping on orders $120+",
    preview: "Email with 4-category grid layout, product images, and shop buttons",
  },
  "Campaign Launch - All Ad Sets": {
    channel: "Meta",
    mockup: "Meta Ad Creative:\n\nCarousel Ad (5 cards):\n1. Hero: 'She deserves the best' + shop now\n2. Product: Silk scarf styled 3 ways\n3. Product: Midi dress in spring florals\n4. Offer: Free gift wrapping + express shipping\n5. Testimonial: Customer review quote\n\nCopy: The Mother's Day edit she'll actually love. Thoughtful gifts, free wrapping, delivered by May 10.\n\nCTA: Shop Mother's Day",
    preview: "Meta carousel ad mockup with 5 product cards",
  },
  "Promoted Pins Launch": {
    channel: "Pinterest",
    mockup: "Pinterest Pin Design:\n\nVertical pin (1000x1500px)\nHeadline: Mother's Day Gift Ideas She'll Love\n\nImage: Flat lay of gift set (scarf, jewelry, card)\n\nOverlay text: 'Thoughtful Gifts for Mom'\n\nDescription: Curated collection of elevated essentials. Free gift wrapping. Shop our Mother's Day edit.\n\nDestination: Landing page with gift category filters",
    preview: "Pinterest promoted pin with gift flat lay photography",
  },
  "Gift Guide Email - Wave 2": {
    channel: "Email",
    mockup: "Subject: Last chance for these best-sellers 🌸\n\nHi [First Name],\n\nThese top-rated pieces are selling fast:\n\n⭐ 4.8 stars: Luxe Linen Wrap Top (3 left in cream)\n⭐ 4.9 stars: Gold Layering Necklace Set (back in stock!)\n⭐ 5.0 stars: Cashmere Cardigan (final sizes)\n\nOrder by May 7 for Mother's Day delivery.\n\n+ Add gift note at checkout (free)",
    preview: "Email featuring best-seller products with star ratings and low stock alerts",
  },
  "Customer Gift Testimonials": {
    channel: "Instagram Stories",
    mockup: "Instagram Story Series (5 frames):\n\n1. 'What our customers are gifting' text card\n2. UGC: Customer photo of wrapped gift\n3. Review quote: 'She loved it!'\n4. Product tag: Silk Scarf $95\n5. Swipe up: Shop Mother's Day\n\nEach frame: Soft pink background, clean typography",
    preview: "Instagram Story template with customer testimonials and product tags",
  },
  "Last Chance - Free Express Shipping": {
    channel: "Email",
    mockup: "Subject: ⏰ Final hours for Mother's Day delivery\n\nHi [First Name],\n\nThis is it. Order in the next 12 hours for guaranteed May 10 delivery.\n\n🚚 FREE express shipping (no minimum)\n📦 Order by 11:59 PM tonight\n💝 Free gift wrapping included\n\nStill deciding? Shop our top 5 best-sellers:\n[Product grid]\n\nDon't wait — she's worth it.",
    preview: "Urgent email design with countdown timer and best-seller grid",
  },
  "Final 24 Hours Push": {
    channel: "Meta",
    mockup: "Meta Ad Creative:\n\nSingle image ad with urgency overlay\n\nImage: Gift box with ribbon, soft lighting\nOverlay: 'Last 24 Hours'\n\nCopy: Mother's Day is Sunday. Order now for guaranteed delivery. Free express shipping + gift wrapping.\n\nCTA: Shop Now\n\nAudience: Cart abandoners + engaged users",
    preview: "Meta single image ad with urgency messaging and countdown",
  },
};

export default function CampaignPlanning() {
  const [selectedCampaign, setSelectedCampaign] = useState("mothers-day");
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicationStep, setDuplicationStep] = useState(1);
  const [showAIRecommendation, setShowAIRecommendation] = useState(false);
  const [selectedChannelQuickView, setSelectedChannelQuickView] = useState<string | null>(null);
  const [selectedContentPreview, setSelectedContentPreview] = useState<string | null>(null);
  const [performanceGoal, setPerformanceGoal] = useState<"roas" | "cac">("roas");
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [showProductionOverview, setShowProductionOverview] = useState(false);
  const [showCampaignRecModal, setShowCampaignRecModal] = useState(false);
  const [showCampaignBrief, setShowCampaignBrief] = useState(false);

  const statusConfig = {
    completed: { color: "var(--green)", bg: "var(--green-light)", icon: CheckCircle2 },
    "in-progress": { color: "var(--pink-dark)", bg: "var(--pink-light)", icon: Clock },
    pending: { color: "var(--buff-dark)", bg: "var(--buff)", icon: AlertCircle },
    ready: { color: "var(--green)", bg: "var(--green-light)", icon: CheckCircle2 },
    scheduled: { color: "var(--green)", bg: "var(--green-light)", icon: CheckCircle2 },
    draft: { color: "var(--terra)", bg: "var(--terra-light)", icon: Clock },
    planning: { color: "var(--buff-dark)", bg: "var(--buff)", icon: AlertCircle },
  };

  // Action Strip Data
  const actionStripData: ActionStripData = {
    silverBullet: {
      action: "Finalize Mother's Day campaign creative (May 3-10 launch window)",
      impactLine: "Estimated: $63,000 revenue at 5.0x ROAS target · 420-480 conversions",
      channel: "Meta + Email + Google + Pinterest"
    },
    lowHangingFruit: {
      action: "Duplicate Easter campaign template for Wedding Season",
      effortChip: "Easy · 1 hour",
      impact: "Save 4 hours setup · Proven 4.2x ROAS template",
      channelChip: "Campaign Builder · Template"
    },
    frameworkTasks: [
      { task: "Wedding Season creative brief finalization", status: "In Progress" },
      { task: "Mother's Day email sequence setup", status: "Planned" },
      { task: "Q4/2026 campaign budget reconciliation", status: "On Track" }
    ]
  };

  const campaignRecBrief: DetailedBriefData = {
    title: "Mother's Day 2026 Campaign Optimization Strategy",
    category: "AI Campaign Recommendation · Performance Optimization",
    overview: "Last year's Mother's Day campaign generated $42K revenue at 4.8x ROAS, providing strong benchmarks for 2026 optimization. Analysis reveals four high-impact improvements: (1) Pinterest budget increase (+15%) based on gift discovery intent validation, (2) SMS reminder flow launch for abandoned cart recovery, (3) Gift note checkout upsell activation (tested +$18 AOV in Valentine's campaign), (4) Campaign end date extension to May 11 to capture last-minute shopper segment (historically 22% of revenue). Combined optimization impact: +$21K incremental revenue at maintained 5.0x ROAS target.",
    goals: [
      "Increase Mother's Day campaign revenue from $42K (2025) to $63K (2026) through strategic optimizations",
      "Improve ROAS from 4.8x to 5.0x by reallocating budget to higher-performing channels",
      "Capture last-minute shopping segment (22% of revenue) by extending campaign end date to May 11",
      "Reduce cart abandonment 24-32% through SMS reminder flow on high-intent days"
    ],
    detailedBrief: {
      challenge: "2025 Mother's Day campaign performed well ($42K, 4.8x ROAS) but left optimization opportunities on table. Pinterest budget conservative despite high gift-discovery intent - historical data shows Pinterest converters have 3.2x higher intent than Google Display browsers. No SMS strategy deployed despite Klaviyo integration live - competitors using SMS for gift campaigns achieve 24-32% abandoned cart recovery. Gift note upsell tested successfully in Valentine's (+$18 AOV) but not activated for Mother's Day. Campaign ended May 8 missing May 9-11 last-minute rush (22% of 2024 revenue). Without optimization, 2026 performance likely flat despite category growth.",
      approach: "Optimization 1: Increase Pinterest budget 15% ($270 reallocation from Google Display) - Pinterest gift searches peak May 1-7, strong product discovery intent. Optimization 2: Launch SMS reminder flow May 7 targeting abandoned carts from May 3-6, 2-message sequence (1hr + 24hr reminders), urgency messaging 'Last chance for Mother's Day delivery'. Optimization 3: Activate 'Add Gift Note' upsell at checkout - personalized message card option, positioned between cart and payment, A/B test free vs $3 premium card. Optimization 4: Extend campaign end date from May 8 to May 11 - maintain 'guaranteed delivery' messaging through May 9, shift May 10-11 to 'digital gift cards for last-minute gifters'. Budget: redistribute existing $12,600, no incremental spend.",
      timeline: "May 3-11 (9-day campaign vs 6-day in 2025)",
      budget: "$12,600 (same as 2025, optimized allocation: Pinterest +15%, Google Display -15%, SMS $0 via existing Klaviyo)"
    },
    nextSteps: [
      {
        step: "Pinterest Budget Reallocation & Creative Refresh",
        description: "Increase Pinterest budget from $1,260 to $1,449 (+$189 from Google Display reduction). Create 12 Promoted Pins emphasizing gift guides, styling inspiration, 'Gifts Mom Will Love' boards. Target keywords: 'mother's day gift ideas', 'gifts for mom', 'thoughtful mother's day present'. Set max CPC $0.85 (under Pinterest avg $1.02).",
        owner: "Paid Social Manager"
      },
      {
        step: "SMS Reminder Flow Build & May 7 Launch",
        description: "Build Klaviyo SMS flow targeting abandoned carts from May 3-6. Message 1 (1hr post-abandonment): 'Still thinking about the perfect Mother's Day gift? Complete your order now for guaranteed delivery.' Message 2 (24hrs): 'Final call! Order by midnight for Mother's Day arrival. [Cart link]'. Frequency cap: max 2 SMS per subscriber. Test on 500-subscriber segment May 5 before full rollout May 7.",
        owner: "CRM + Email Marketing"
      },
      {
        step: "Gift Note Checkout Upsell Implementation",
        description: "Add 'Include a Gift Note?' checkbox between cart and payment steps. Free option: standard card with 100-character message. Premium option ($3): embossed card with custom design. A/B test: 50% see free option only, 50% see free + premium. Track: attachment rate, AOV lift, premium vs free selection. Target: 35% attachment rate based on Valentine's test.",
        owner: "E-commerce + Development"
      },
      {
        step: "Campaign Extension & Last-Minute Messaging",
        description: "Extend campaign end date from May 8 to May 11. May 3-9: maintain 'Guaranteed Mother's Day Delivery' messaging with order-by cutoff dates. May 10-11: shift messaging to 'Last-Minute Digital Gift Cards' + 'Send via Email Instantly'. Set up automated cutoff timer on site showing hours until guaranteed delivery. Email May 9 AM: 'Final Hours for Mother's Day Delivery'.",
        owner: "Campaign Manager + Email"
      }
    ],
    potentialOutcomes: {
      bestCase: "$74K revenue at 5.9x ROAS if all optimizations exceed expectations, 32% SMS recovery rate, 42% gift note attachment, extended dates capture 28% incremental revenue",
      expected: "$63K revenue at 5.0x ROAS, 28% SMS cart recovery (+$5,400), Pinterest reallocation (+$2,400), gift note upsell (+$3,200 at 35% attach, $18 AOV lift), extended dates (+$10,000)",
      metrics: [
        "Total campaign revenue",
        "Blended ROAS",
        "Pinterest ROAS vs Google Display",
        "SMS abandoned cart recovery rate",
        "Gift note attachment rate & AOV impact",
        "Revenue by date (May 9-11 last-minute segment)"
      ]
    }
  };

  return (
    <div>
      <PageHeader
        label="Strategy · Campaign Planning"
        title="Campaign Builder & Planner"
        description="End-to-end campaign planning workspace. Build campaigns, allocate budgets, coordinate cross-channel tactics, and track execution milestones from concept to launch."
        backgroundGradient="pink"
        image={undefined}
        stats={[
          { label: "Active Campaigns", value: "3" },
          { label: "Total Budget", value: "$21.2K" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        {/* AI Widget */}
        <AIWidget
          insightLabel="Campaign Planning Insight"
          insightText="Mother's Day campaign (May 3-10) requires creative finalization by Apr 28. Wedding Season template can be duplicated from Easter (4.2x ROAS). Recommendation: finalize Mother's Day creative immediately, duplicate Easter template for Wedding Season."
        />

        <StatGrid columns={4}>
          <MetricCard
            label="Campaign Budget"
            value="$12,600"
            change="+18%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Target ROAS"
            value="5.0x"
            change="Above avg"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Est. Conversions"
            value="420-480"
            change="+28%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Days to Launch"
            value="6"
            change="On track"
            changeType="positive"
            trend="neutral"
          />
        </StatGrid>

        <AIInsightCard
          title="AI Campaign Recommendation"
          content="Based on last year's Mother's Day performance (+$42K revenue, 4.8x ROAS): (1) Increase Pinterest budget by 15% — strong gift discovery intent, (2) Launch SMS reminder flow on May 7th for abandoned carts, (3) Add 'Gift Note' upsell at checkout (tested +$18 AOV), (4) Consider extending campaign end date to May 11 to capture last-minute shoppers (historically 22% of revenue)."
          showButton={true}
          onButtonClick={() => setShowCampaignRecModal(true)}
        />

        {/* Campaign Overview Card */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <CardTitle>{campaignTemplate.name}</CardTitle>
              <p className="text-[13px] text-[var(--text-secondary)] mt-1">
                {campaignTemplate.timeline.start} - {campaignTemplate.timeline.end}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: statusConfig[campaignTemplate.status.toLowerCase()].bg }}
              >
                <Clock className="w-4 h-4" style={{ color: statusConfig[campaignTemplate.status.toLowerCase()].color }} />
                <span className="text-[12px] font-medium" style={{ color: statusConfig[campaignTemplate.status.toLowerCase()].color }}>
                  {campaignTemplate.status}
                </span>
              </div>
              <button
                onClick={() => {
                  setShowDuplicateModal(true);
                  setDuplicationStep(1);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium"
              >
                <Copy className="w-4 h-4" />
                Duplicate Campaign
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Total Budget
              </div>
              <div className="text-[2rem] font-medium text-[var(--green)] leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                ${campaignTemplate.budget.total.toLocaleString()}
              </div>
            </div>
            <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Target ROAS
              </div>
              <div className="text-[2rem] font-medium text-[var(--pink)] leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                {campaignTemplate.targetKPIs.roas}
              </div>
            </div>
            <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Est. Reach
              </div>
              <div className="text-[2rem] font-medium text-[var(--terra)] leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                {campaignTemplate.targetKPIs.reach}
              </div>
            </div>
            <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Target AOV
              </div>
              <div className="text-[2rem] font-medium text-[var(--green)] leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                {campaignTemplate.targetKPIs.aov}
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--border-color)] pt-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">Campaign Objectives</h3>
              <button
                onClick={() => setShowAIRecommendation(true)}
                className="px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Get Started
              </button>
            </div>
            <ul className="space-y-2">
              {campaignTemplate.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2 text-[13px] text-[var(--text-secondary)]">
                  <Target className="w-4 h-4 text-[var(--pink)] mt-0.5 flex-shrink-0" />
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Budget Allocation */}
        <Card>
          <CardTitle>Budget Allocation by Channel</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Cross-channel investment strategy</p>
          <div className="space-y-4">
            {campaignTemplate.channels.map((channel, index) => (
              <div key={index} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4 hover:border-[var(--border-strong)] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--pink-light)] flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-[var(--pink)]" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">{channel.name}</h4>
                      <p className="text-[11px] text-[var(--text-tertiary)]">{channel.allocation} of total budget</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[1.5rem] font-medium text-[var(--green)] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                      ${channel.budget.toLocaleString()}
                    </div>
                    <button
                      onClick={() => setSelectedChannelQuickView(channel.name)}
                      className="px-3 py-1.5 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[12px] font-medium flex items-center gap-1.5 ml-auto"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="bg-[var(--surface)] rounded-[var(--radius-sm)] p-3">
                  <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Tactics
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {channel.tactics.map((tactic, i) => (
                      <Tag key={i} variant="pink">{tactic}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Two Column Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Creative Assets Tracker */}
          <Card>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Creative Assets Status</CardTitle>
              <button
                onClick={() => setShowProductionOverview(true)}
                className="px-3 py-1.5 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[12px] font-medium flex items-center gap-1.5"
              >
                <Package className="w-3.5 h-3.5" />
                Production Overview
              </button>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Asset production pipeline</p>
            <div className="space-y-3">
              {campaignTemplate.creativeAssets.map((asset, index) => {
                const config = statusConfig[asset.status];
                const Icon = config.icon;

                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: config.bg }}
                      >
                        <Icon className="w-4 h-4" style={{ color: config.color }} />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-[var(--text-primary)]">{asset.type}</div>
                        <div className="text-[11px] text-[var(--text-tertiary)]">{asset.owner}</div>
                      </div>
                    </div>
                    <div
                      className="px-2 py-1 rounded-full text-[10px] font-medium"
                      style={{ backgroundColor: config.bg, color: config.color }}
                    >
                      {asset.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Content Calendar Preview */}
          <Card>
            <CardTitle>Content Calendar</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Scheduled campaign content</p>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {campaignTemplate.contentCalendar.map((item, index) => {
                const config = statusConfig[item.status];
                const Icon = config.icon;

                return (
                  <div key={index} className="flex items-center gap-3 p-3 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: config.bg }}
                    >
                      <Icon className="w-4 h-4" style={{ color: config.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                          {item.date}
                        </span>
                        <span className="text-[11px] text-[var(--text-tertiary)]">•</span>
                        <Tag variant="buff">{item.channel}</Tag>
                      </div>
                      <div className="text-[13px] text-[var(--text-primary)] font-medium">
                        {item.content}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedContentPreview(item.content)}
                      className="px-3 py-1.5 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[11px] font-medium flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Preview
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Campaign Milestones */}
        <Card>
          <CardTitle>Campaign Milestones & Timeline</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Key deliverables and deadlines</p>
          <div className="space-y-3">
            {campaignTemplate.milestones.map((milestone, index) => {
              const config = statusConfig[milestone.status];
              const Icon = config.icon;

              return (
                <div key={index} className="flex items-center gap-4 p-4 border border-[var(--border-color)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] transition-colors">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: config.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: config.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[var(--text-primary)] mb-1">{milestone.task}</div>
                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)]">
                      <Calendar className="w-3 h-3" />
                      {milestone.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowCampaignBrief(true)}
                      className="px-3 py-1.5 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[11px] font-medium flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3" />
                      See Brief
                    </button>
                    <div
                      className="px-3 py-1 rounded-full text-[11px] font-medium"
                      style={{ backgroundColor: config.bg, color: config.color }}
                    >
                      {milestone.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* AI Recommendations */}
        <div className="grid grid-cols-2 gap-6">
          <AIInsightCard
            title="Optimisation Opportunity"
            content="Pinterest historically outperforms during gift-giving occasions. Consider reallocating 5% from Google Display to Pinterest Promoted Pins. Expected impact: +$2,400 revenue, +0.4x ROAS improvement."
          />
          <AIInsightCard
            title="Risk Alert"
            content="3 creative assets behind schedule. Product photography delivery delayed by 2 days may impact Meta ad launch. Recommend: activate backup static ads for May 3-5, switch to hero imagery when ready."
            variant="accent"
          />
        </div>

        {/* Campaign Spend Overview */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>Campaign Spend Overview - Mother's Day 2026</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Real-time budget tracking and pacing</p>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Total Allocated
              </div>
              <div className="text-[1.5rem] font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                $12,600
              </div>
            </div>
            <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Spent to Date
              </div>
              <div className="text-[1.5rem] font-medium text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>
                $0
              </div>
            </div>
            <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Remaining
              </div>
              <div className="text-[1.5rem] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                $12,600
              </div>
            </div>
            <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Daily Pace
              </div>
              <div className="text-[1.5rem] font-medium text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                $1,800
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { day: "May 3", planned: 1800, actual: 0 },
              { day: "May 4", planned: 1800, actual: 0 },
              { day: "May 5", planned: 1800, actual: 0 },
              { day: "May 6", planned: 1800, actual: 0 },
              { day: "May 7", planned: 1800, actual: 0 },
              { day: "May 8", planned: 1800, actual: 0 },
              { day: "May 9", planned: 1800, actual: 0 },
              { day: "May 10", planned: 1800, actual: 0 },
            ]}>
              <CartesianGrid key="cartesian-spend" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="x-axis-spend" dataKey="day" tick={{ fill: "var(--text-secondary)", fontSize: 11 }} />
              <YAxis key="y-axis-spend" tick={{ fill: "var(--text-secondary)", fontSize: 11 }} />
              <Tooltip
                key="tooltip-spend"
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  fontSize: 12
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend key="legend-spend" wrapperStyle={{ fontSize: 12 }} iconType="circle" />
              <Bar key="bar-planned" dataKey="planned" fill="var(--buff-dark)" name="Planned Spend" />
              <Bar key="bar-actual" dataKey="actual" fill="var(--green)" name="Actual Spend" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Channel Performance & Recommendations */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[var(--pink)]" />
              <CardTitle>Channel Performance & AI Recommendations</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPerformanceGoal("roas")}
                className={`px-3 py-1.5 rounded-[var(--radius-md)] text-[12px] font-medium transition-colors ${
                  performanceGoal === "roas"
                    ? "bg-[var(--green)] text-white"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
                }`}
              >
                ROAS Goal
              </button>
              <button
                onClick={() => setPerformanceGoal("cac")}
                className={`px-3 py-1.5 rounded-[var(--radius-md)] text-[12px] font-medium transition-colors ${
                  performanceGoal === "cac"
                    ? "bg-[var(--pink)] text-white"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
                }`}
              >
                CAC Goal
              </button>
            </div>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">
            Q1 2026 performance with Q4/2026 optimisation guidance {performanceGoal === "roas" ? "(ROAS-focused)" : "(CAC-focused)"}
          </p>

          <div className="space-y-3">
            {channelPerformance.map((channel, idx) => (
              <div key={idx} className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-[15px] font-semibold text-[var(--text-primary)] mb-1">{channel.channel}</div>
                    <div className="flex items-center gap-4 text-[12px] text-[var(--text-secondary)]">
                      <span>Q1 Spend: ${channel.q1Spend.toLocaleString()}</span>
                      <span>•</span>
                      <span>Q1 Revenue: ${channel.q1Revenue.toLocaleString()}</span>
                      <span>•</span>
                      <span className="text-[var(--green)]">Q1 ROAS: {channel.q1Roas}x</span>
                      <span>•</span>
                      <span className="text-[var(--terra)]">Q1 CAC: ${channel.q1Cac}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {performanceGoal === "roas" ? (
                      <>
                        <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Q4/2026 Target ROAS</div>
                        <div className="text-[20px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {channel.q2RoasTarget}x
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Q4/2026 Target CAC</div>
                        <div className="text-[20px] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                          ${channel.q2CacTarget}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className={`flex items-center gap-2 p-2 rounded-[var(--radius-sm)] ${
                  performanceGoal === "roas" ? "bg-[var(--green-light)]" : "bg-[var(--pink-light)]"
                }`}>
                  <Sparkles className={`w-4 h-4 flex-shrink-0 ${
                    performanceGoal === "roas" ? "text-[var(--green)]" : "text-[var(--pink)]"
                  }`} />
                  <span className={`text-[12px] font-medium ${
                    performanceGoal === "roas" ? "text-[var(--green-dark)]" : "text-[var(--pink-dark)]"
                  }`}>
                    AI Recommendation: {performanceGoal === "roas" ? channel.roasRecommendation : channel.cacRecommendation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quarterly Product Releases */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>Quarterly Product Releases & Campaign Planning</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">SKU launches coordinated with marketing campaigns</p>

          <div className="space-y-6">
            {quarterlyReleases.map((quarter, idx) => (
              <div key={idx}>
                <h3 className="text-[15px] font-semibold text-[var(--green)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                  {quarter.quarter}
                </h3>
                <div className="space-y-3">
                  {quarter.releases.map((release, ridx) => {
                    const statusColors = {
                      "Active": { bg: "var(--green-light)", text: "var(--green)" },
                      "Planning": { bg: "var(--pink-light)", text: "var(--pink)" },
                      "Ideation": { bg: "var(--buff)", text: "var(--buff-dark)" },
                    };
                    const status = statusColors[release.status as keyof typeof statusColors];

                    return (
                      <div key={ridx} className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                        <div className="flex-1">
                          <div className="text-[14px] font-semibold text-[var(--text-primary)] mb-1">{release.name}</div>
                          <div className="flex items-center gap-3 text-[12px] text-[var(--text-secondary)]">
                            <span>{release.skus} SKUs</span>
                            <span>•</span>
                            <span>Launch: {release.launchDate}</span>
                            <span>•</span>
                            <span>Campaign Budget: {release.campaignBudget}</span>
                          </div>
                        </div>
                        <div
                          className="px-3 py-1 rounded-full text-[11px] font-medium"
                          style={{ backgroundColor: status.bg, color: status.text }}
                        >
                          {release.status}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Seasonal Campaign Planning */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>Seasonal Campaign Planning</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">High-level seasonal budget allocation and timing</p>

          <div className="space-y-4">
            {seasonalCampaigns.map((season, idx) => {
              const statusColors = {
                "Active": { bg: "var(--green-light)", text: "var(--green)" },
                "Planning": { bg: "var(--pink-light)", text: "var(--pink)" },
              };
              const status = statusColors[season.status as keyof typeof statusColors];

              return (
                <div key={idx} className="p-5 border-2 border-[var(--border-color)] rounded-[var(--radius-lg)] hover:border-[var(--pink)] transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                        {season.season}
                      </h3>
                      <p className="text-[12px] text-[var(--text-tertiary)]">{season.keyDates}</p>
                    </div>
                    <div
                      className="px-3 py-1.5 rounded-full text-[12px] font-medium"
                      style={{ backgroundColor: status.bg, color: status.text }}
                    >
                      {season.status}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                        Total Campaigns
                      </div>
                      <div className="text-[24px] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {season.campaigns}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                        Total Budget
                      </div>
                      <div className="text-[24px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {season.totalBudget}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Omnichannel Campaign Planner */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[var(--pink)]" />
              <CardTitle>Omnichannel Campaign Orchestration</CardTitle>
            </div>
            <button className="px-3 py-1.5 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[12px] font-medium flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" />
              Create Campaign
            </button>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Coordinate messaging and timing across all channels</p>

          <div className="grid grid-cols-5 gap-3">
            {["Email", "Social", "Paid Ads", "SMS", "Website"].map((channel, idx) => (
              <div key={idx} className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)] text-center hover:bg-[var(--border-color)] transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[var(--pink-light)] flex items-center justify-center mx-auto mb-2">
                  {channel === "Email" && <Mail className="w-6 h-6 text-[var(--pink)]" />}
                  {channel === "Social" && <Share2 className="w-6 h-6 text-[var(--pink)]" />}
                  {channel === "Paid Ads" && <TrendingUp className="w-6 h-6 text-[var(--pink)]" />}
                  {channel === "SMS" && <Zap className="w-6 h-6 text-[var(--pink)]" />}
                  {channel === "Website" && <Target className="w-6 h-6 text-[var(--pink)]" />}
                </div>
                <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">{channel}</div>
                <div className="text-[11px] text-[var(--text-tertiary)]">Configure</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[var(--green-light)] rounded-[var(--radius-md)] border-l-4 border-[var(--green)]">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[var(--green)] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[13px] font-semibold text-[var(--green)] mb-1">AI Orchestration Insight</div>
                <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                  For optimal Mother's Day campaign performance, launch Email VIP preview 5 days before paid ads (Apr 28 vs May 3).
                  Follow with organic social teasers, then activate paid channels. SMS should trigger 48 hours before deadline for urgency.
                  This sequence historically drives 18% higher early conversions and reduces last-minute cart abandonment.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Recommendation Modal */}
        {showAIRecommendation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIRecommendation(false)}>
            <div className="bg-white rounded-[var(--radius-lg)] max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--pink-light)] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[var(--pink)]" />
                  </div>
                  <div>
                    <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {aiRecommendation.title}
                    </h2>
                    <p className="text-[13px] text-[var(--text-secondary)]">Mother's Day 2026 Campaign</p>
                  </div>
                </div>
                <button onClick={() => setShowAIRecommendation(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                  <X className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Overview */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                    Recommendation Overview
                  </h3>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                    {aiRecommendation.overview}
                  </p>
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      Revenue Increase
                    </div>
                    <div className="text-[20px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {aiRecommendation.impact.revenueIncrease}
                    </div>
                  </div>
                  <div className="p-4 bg-[var(--pink-light)] rounded-[var(--radius-md)]">
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      ROAS Improvement
                    </div>
                    <div className="text-[20px] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {aiRecommendation.impact.roasImprovement}
                    </div>
                  </div>
                  <div className="p-4 bg-[var(--terra-light)] rounded-[var(--radius-md)]">
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      Conversion Increase
                    </div>
                    <div className="text-[20px] font-semibold text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {aiRecommendation.impact.conversionIncrease}
                    </div>
                  </div>
                  <div className="p-4 bg-[var(--buff)] rounded-[var(--radius-md)]">
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      Confidence Level
                    </div>
                    <div className="text-[20px] font-semibold text-[var(--buff-dark)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {aiRecommendation.impact.confidence}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                    Detailed Recommendations
                  </h3>
                  <div className="space-y-4">
                    {aiRecommendation.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-4 border border-[var(--border-color)] rounded-[var(--radius-lg)]">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--pink-light)] flex items-center justify-center flex-shrink-0">
                            <span className="text-[13px] font-semibold text-[var(--pink)]">{idx + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[15px] font-semibold text-[var(--text-primary)] mb-2">{rec.title}</h4>
                            <p className="text-[13px] text-[var(--text-secondary)] mb-3 leading-relaxed">{rec.detail}</p>
                            <div className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)] mb-2">
                              <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                                Action Required
                              </div>
                              <p className="text-[13px] text-[var(--text-primary)]">{rec.action}</p>
                            </div>
                            <div className="flex items-center gap-2 text-[12px] text-[var(--green)]">
                              <TrendingUp className="w-4 h-4" />
                              <span className="font-medium">{rec.impact}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget Adjustments */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                    Recommended Budget Adjustments
                  </h3>
                  <div className="space-y-2">
                    {aiRecommendation.budgetAdjustments.map((budget, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                        <div className="flex-1">
                          <span className="text-[14px] font-medium text-[var(--text-primary)]">{budget.channel}</span>
                        </div>
                        <div className="flex items-center gap-6 text-[13px]">
                          <span className="text-[var(--text-secondary)]">Current: ${budget.current.toLocaleString()}</span>
                          <span className="text-[var(--text-secondary)]">→</span>
                          <span className="text-[var(--text-primary)] font-semibold">Recommended: ${budget.recommended.toLocaleString()}</span>
                          <span className={`font-semibold ${budget.change >= 0 ? 'text-[var(--green)]' : 'text-[var(--terra)]'}`}>
                            {budget.change >= 0 ? '+' : ''}{budget.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Steps */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                    Next Steps
                  </h3>
                  <div className="space-y-2">
                    {aiRecommendation.nextSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                        <div className="w-6 h-6 rounded-full bg-[var(--pink-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[11px] font-semibold text-[var(--pink)]">{idx + 1}</span>
                        </div>
                        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[var(--border-color)]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowWorkflowModal(true)}
                      className="flex-1 px-4 py-3 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approved Budget
                    </button>
                    <button className="flex-1 px-4 py-3 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Brief
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Channel Quick View Modal */}
        {selectedChannelQuickView && channelDetails[selectedChannelQuickView as keyof typeof channelDetails] && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedChannelQuickView(null)}>
            <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--green-light)] flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-[var(--green)]" />
                  </div>
                  <div>
                    <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {selectedChannelQuickView}
                    </h2>
                    <p className="text-[13px] text-[var(--text-secondary)]">Campaign Budget Breakdown</p>
                  </div>
                </div>
                <button onClick={() => setSelectedChannelQuickView(null)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                  <X className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Tactic Breakdown */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                    Tactic Budget Allocation
                  </h3>
                  <div className="space-y-4">
                    {channelDetails[selectedChannelQuickView as keyof typeof channelDetails].tactics.map((tactic, idx) => (
                      <div key={idx} className="p-4 border border-[var(--border-color)] rounded-[var(--radius-lg)]">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-[15px] font-semibold text-[var(--text-primary)] mb-1">{tactic.name}</h4>
                          </div>
                          <div className="text-right">
                            <div className="text-[1.5rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                              ${tactic.budget.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                          {Object.entries(tactic.estimated).map(([key, value]) => (
                            <div key={key} className="p-2 bg-[var(--surface)] rounded-[var(--radius-sm)]">
                              <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                                {key}
                              </div>
                              <div className="text-[14px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                                {value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Forecast */}
                <div className="p-5 bg-[var(--green-light)] rounded-[var(--radius-lg)] border-l-4 border-[var(--green)]">
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                    <TrendingUp className="w-4 h-4" />
                    Channel Forecast
                  </h3>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                    {channelDetails[selectedChannelQuickView as keyof typeof channelDetails].forecast}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Preview Modal */}
        {selectedContentPreview && contentPreviews[selectedContentPreview as keyof typeof contentPreviews] && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedContentPreview(null)}>
            <div className="bg-white rounded-[var(--radius-lg)] max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--pink-light)] flex items-center justify-center">
                    <Palette className="w-6 h-6 text-[var(--pink)]" />
                  </div>
                  <div>
                    <h2 className="text-[1.5rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {selectedContentPreview}
                    </h2>
                    <p className="text-[13px] text-[var(--text-secondary)]">
                      {contentPreviews[selectedContentPreview as keyof typeof contentPreviews].channel}
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelectedContentPreview(null)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                  <X className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Content Preview */}
                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                    Content Preview
                  </h3>
                  <div className="p-5 bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border-color)]">
                    <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap font-mono">
                      {contentPreviews[selectedContentPreview as keyof typeof contentPreviews].mockup}
                    </div>
                  </div>
                </div>

                {/* Visual Mockup Description */}
                <div className="p-4 bg-[var(--pink-light)] rounded-[var(--radius-md)] border-l-4 border-[var(--pink)]">
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Visual Design Notes
                  </h3>
                  <p className="text-[13px] text-[var(--text-secondary)]">
                    {contentPreviews[selectedContentPreview as keyof typeof contentPreviews].preview}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[var(--border-color)]">
                  <div className="flex items-center gap-3">
                    <button className="flex-1 px-4 py-3 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="flex-1 px-4 py-3 bg-[var(--terra)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      Review
                    </button>
                    <button className="flex-1 px-4 py-3 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[14px] font-medium flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Campaign Duplication Modal */}
        {showDuplicateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDuplicateModal(false)}>
            <div className="bg-white rounded-[var(--radius-lg)] max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="border-b border-[var(--border-color)] p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--pink-light)] flex items-center justify-center">
                    <Copy className="w-6 h-6 text-[var(--pink)]" />
                  </div>
                  <div>
                    <h2 className="text-[1.5rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                      Duplicate Campaign
                    </h2>
                    <p className="text-[13px] text-[var(--text-secondary)]">Step {duplicationStep} of 3</p>
                  </div>
                </div>
                <button onClick={() => setShowDuplicateModal(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                  <X className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>
              </div>

              <div className="p-6">
                {duplicationStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[14px] font-semibold text-[var(--text-primary)] mb-4">Campaign Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[12px] font-medium text-[var(--text-secondary)] mb-2">New Campaign Name</label>
                          <input
                            type="text"
                            defaultValue="Mother's Day 2026 Campaign (Copy)"
                            className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[12px] font-medium text-[var(--text-secondary)] mb-2">Start Date</label>
                            <input
                              type="date"
                              className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)]"
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-medium text-[var(--text-secondary)] mb-2">End Date</label>
                            <input
                              type="date"
                              className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setShowDuplicateModal(false)}
                        className="px-4 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[13px] font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setDuplicationStep(2)}
                        className="px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium"
                      >
                        Next: Select Elements
                      </button>
                    </div>
                  </div>
                )}

                {duplicationStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[14px] font-semibold text-[var(--text-primary)] mb-4">What to Copy</h3>
                      <div className="space-y-3">
                        {["Budget Allocation", "Channel Strategy", "Objectives & KPIs", "Creative Assets References", "Content Calendar Template", "Milestones Timeline"].map((item, idx) => (
                          <label key={idx} className="flex items-center gap-3 p-3 border border-[var(--border-color)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-[var(--pink)]" />
                            <span className="text-[13px] text-[var(--text-primary)]">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setDuplicationStep(1)}
                        className="px-4 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[13px] font-medium"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setDuplicationStep(3)}
                        className="px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium"
                      >
                        Next: Review
                      </button>
                    </div>
                  </div>
                )}

                {duplicationStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[14px] font-semibold text-[var(--text-primary)] mb-4">Review & Confirm</h3>
                      <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)] space-y-3">
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-[var(--text-secondary)]">Campaign Name:</span>
                          <span className="text-[var(--text-primary)] font-medium">Mother's Day 2026 Campaign (Copy)</span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-[var(--text-secondary)]">Elements to Copy:</span>
                          <span className="text-[var(--text-primary)] font-medium">6 selected</span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-[var(--text-secondary)]">Budget:</span>
                          <span className="text-[var(--green)] font-medium">$12,600</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-[var(--green-light)] rounded-[var(--radius-md)] border-l-4 border-[var(--green)]">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[var(--green)] flex-shrink-0 mt-0.5" />
                        <p className="text-[13px] text-[var(--text-secondary)]">
                          Your new campaign will be created with all selected elements. You can edit details after creation.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setDuplicationStep(2)}
                        className="px-4 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[13px] font-medium"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          setShowDuplicateModal(false);
                          setDuplicationStep(1);
                        }}
                        className="px-4 py-2 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Create Campaign
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Strip */}
        <ActionStrip data={actionStripData} />

        {/* Campaign Workflow Modal */}
        <CampaignWorkflowModal
          show={showWorkflowModal}
          onClose={() => setShowWorkflowModal(false)}
          campaignName="Mother's Day 2026 Campaign"
          totalBudget="$50,000"
          dateRange="May 3-10, 2026"
        />

        {/* Production Overview Modal */}
        <ProductionOverviewModal
          show={showProductionOverview}
          onClose={() => setShowProductionOverview(false)}
        />

        {/* Campaign Brief Modal */}
        <CampaignBriefModal
          show={showCampaignBrief}
          onClose={() => setShowCampaignBrief(false)}
        />

        {/* Detailed Brief Modal */}
        <DetailedBriefModal
          show={showCampaignRecModal}
          onClose={() => setShowCampaignRecModal(false)}
          data={campaignRecBrief}
        />
      </div>
    </div>
  );
}
