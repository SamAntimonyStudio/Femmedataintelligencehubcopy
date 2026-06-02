import { useState } from "react";
import { Card, CardTitle, MetricCard, AIInsightCard, Tag } from "../components/ui/Card";
import { FilterBar, StatGrid } from "../components/ui/Filters";
import { categoryPerformance } from "../data/femmeProducts";
import { TrendingUp, Download, Mail, Share2, X, Plus, Search, Calendar, Package, Users, Palette, BarChart3 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { AIWidget } from "../components/AIWidget";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import { DetailedBriefModal, DetailedBriefData } from "../components/DetailedBriefModal";
import { SeasonalPlannerModal, SeasonalItemData } from "../components/SeasonalPlannerModal";
import { ColorTrendModal } from "../components/ColorTrendModal";
import rndHero from "../../imports/kp734293_1_v1639125496755888385_750x750_1.jpg";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

const trendSignals = [
  {
    id: 1,
    trend: "Linen Wide-Leg Pants",
    source: "Social",
    velocity: 85,
    daysTrending: 12,
    color: "var(--pink)",
    details: {
      origin: "Started on Instagram and TikTok in early April 2026, driven by spring/summer fashion content creators showcasing breathable, comfortable workwear alternatives.",
      channels: [
        { name: "Instagram", percentage: 42, growth: "+28%" },
        { name: "TikTok", percentage: 35, growth: "+31%" },
        { name: "Pinterest", percentage: 18, growth: "+12%" },
        { name: "Google Search", percentage: 5, growth: "+8%" },
      ],
      trendingBrands: [
        { brand: "Sézane", products: "4 styles", priceRange: "$210-$285", performance: "High velocity, 2.4K units sold" },
        { brand: "Reformation", products: "3 styles", priceRange: "$198-$248", performance: "Selling out weekly" },
        { brand: "Everlane", products: "2 styles", priceRange: "$128-$168", performance: "Moderate velocity" },
        { brand: "Mango", products: "5 styles", priceRange: "$89-$129", performance: "Mass market appeal" },
      ],
      locations: [
        { region: "Australia", interest: "Very High", index: 94 },
        { region: "United States", interest: "High", index: 87 },
        { region: "United Kingdom", interest: "High", index: 82 },
        { region: "France", interest: "Medium", index: 71 },
      ],
      opportunity: "Premium linen wide-leg pants represent a $42K-$65K opportunity for Femme in Q4/2026-Q1/2027. Customer demographic aligns perfectly: 25-40 year old professionals seeking elevated casual workwear. Current market gap at $145-$185 price point (between fast fashion at $89 and luxury at $210+). Recommend launching 2-3 styles with European linen, focusing on neutral colorways (cream, sage, terracotta) to maximize wear occasions.",
      searchVolume: "+156% MoM",
      socialMentions: "18.4K mentions",
      competitorCount: 23,
    }
  },
  {
    id: 2,
    trend: "Midi Length Dresses",
    source: "Search",
    velocity: 78,
    daysTrending: 8,
    color: "var(--green)",
    details: {
      origin: "Search trend emerged in late March 2026, driven by wedding guest season and spring event dressing. Google Trends shows sharp uptick coinciding with wedding RSVPs and event invitations.",
      channels: [
        { name: "Google Search", percentage: 48, growth: "+42%" },
        { name: "Pinterest", percentage: 28, growth: "+24%" },
        { name: "Instagram", percentage: 16, growth: "+18%" },
        { name: "TikTok", percentage: 8, growth: "+15%" },
      ],
      trendingBrands: [
        { brand: "Sézane", products: "8 styles", priceRange: "$245-$395", performance: "Strong repeat purchase rate" },
        { brand: "Reformation", products: "12 styles", priceRange: "$218-$328", performance: "Top seller category" },
        { brand: "& Other Stories", products: "6 styles", priceRange: "$149-$229", performance: "Consistent sell-through" },
        { brand: "Anthropologie", products: "15 styles", priceRange: "$158-$298", performance: "High engagement" },
      ],
      locations: [
        { region: "Australia", interest: "Very High", index: 91 },
        { region: "United Kingdom", interest: "Very High", index: 89 },
        { region: "United States", interest: "High", index: 85 },
        { region: "Canada", interest: "Medium", index: 68 },
      ],
      opportunity: "Midi dresses are a proven category for Femme with existing strong performance. Opportunity to expand from 6 to 10-12 styles, targeting wedding guest and occasion wear specifically. Focus on floral prints, wrap silhouettes, and puff sleeve details trending across search and social. Price sweet spot: $165-$245. Estimated incremental revenue: $68K in 90 days with 3.2x repeat purchase rate.",
      searchVolume: "+78% MoM",
      socialMentions: "12.8K mentions",
      competitorCount: 31,
    }
  },
  {
    id: 3,
    trend: "Oversized Knitwear",
    source: "Competitor",
    velocity: 72,
    daysTrending: 15,
    color: "var(--terra)",
    details: {
      origin: "Competitor-driven trend identified through Particl monitoring. Sézane and COS launched oversized knit collections in early April, generating strong sales velocity and social buzz around cozy, layerable pieces for transitional weather.",
      channels: [
        { name: "Competitor Sites", percentage: 52, growth: "+35%" },
        { name: "Instagram", percentage: 24, growth: "+22%" },
        { name: "Pinterest", percentage: 15, growth: "+18%" },
        { name: "TikTok", percentage: 9, growth: "+12%" },
      ],
      trendingBrands: [
        { brand: "Sézane", products: "6 styles", priceRange: "$195-$285", performance: "62% margin, strong velocity" },
        { brand: "COS", products: "8 styles", priceRange: "$129-$219", performance: "Selling out in neutrals" },
        { brand: "Everlane", products: "4 styles", priceRange: "$98-$158", performance: "Cashmere blend popular" },
        { brand: "Arket", products: "5 styles", priceRange: "$119-$189", performance: "Sustainable positioning" },
      ],
      locations: [
        { region: "United Kingdom", interest: "Very High", index: 96 },
        { region: "Australia", interest: "High", index: 84 },
        { region: "United States", interest: "High", index: 81 },
        { region: "Scandinavia", interest: "Very High", index: 93 },
      ],
      opportunity: "Oversized knitwear represents the highest-margin opportunity at 62% (vs. 56% category average). Customer demand for investment pieces that work across seasons. Recommend 8-10 piece collection: oversized cardigans, crewneck sweaters, and vest styles in merino wool and cashmere blends. Target price: $145-$245. Neutral palette (cream, camel, charcoal) with 1-2 statement colors. Projected revenue: $85K over 120 days.",
      searchVolume: "+42% MoM",
      socialMentions: "9.2K mentions",
      competitorCount: 19,
    }
  },
  {
    id: 4,
    trend: "Neutral Tones",
    source: "Social",
    velocity: 68,
    daysTrending: 6,
    color: "var(--buff-dark)",
    details: {
      origin: "Social media trend emerging from 'quiet luxury' and 'old money aesthetic' content on TikTok and Instagram. Influencers and fashion creators showcasing monochromatic neutral outfits, driving search for cream, beige, taupe, and sage pieces.",
      channels: [
        { name: "TikTok", percentage: 44, growth: "+38%" },
        { name: "Instagram", percentage: 38, growth: "+29%" },
        { name: "Pinterest", percentage: 12, growth: "+15%" },
        { name: "Google Search", percentage: 6, growth: "+11%" },
      ],
      trendingBrands: [
        { brand: "Toteme", products: "Entire collection", priceRange: "$290-$890", performance: "Luxury benchmark" },
        { brand: "COS", products: "Core collection", priceRange: "$79-$329", performance: "Strong neutral palette" },
        { brand: "Everlane", products: "25+ neutral SKUs", priceRange: "$68-$248", performance: "Consistent bestsellers" },
        { brand: "& Other Stories", products: "40+ neutral pieces", priceRange: "$79-$349", performance: "High engagement" },
      ],
      locations: [
        { region: "United States", interest: "Very High", index: 92 },
        { region: "Australia", interest: "High", index: 86 },
        { region: "United Kingdom", interest: "High", index: 84 },
        { region: "Europe", interest: "Medium", index: 73 },
      ],
      opportunity: "Neutral tones are a cross-category opportunity affecting all product lines. Not a single product type but a color/aesthetic direction. Recommend: (1) Expand neutral colorways across existing bestsellers, (2) Create 'Neutral Capsule' collection marketing campaign, (3) Focus on cream, warm taupe, sage green, and soft camel, (4) Emphasize mix-and-match versatility in marketing. Low risk, high reward—existing customers show 2.8x higher AOV when buying neutral pieces. Estimated lift: $35K-$48K across all categories.",
      searchVolume: "+68% MoM",
      socialMentions: "24.6K mentions",
      competitorCount: 45,
    }
  },
];

const competitorNewProducts = [
  {
    id: 1,
    name: "Sézane Linen Wrap Dress",
    brand: "Sézane",
    price: "$245.00",
    launchDate: "5 days ago",
    velocity: "High",
    category: "Dresses",
  },
  {
    id: 2,
    name: "Proud Poppy Midi Dress",
    brand: "Reformation",
    price: "$218.00",
    launchDate: "6 days ago",
    velocity: "High",
    category: "Dresses",
  },
  {
    id: 3,
    name: "Reformation Wide Leg Pant",
    brand: "Reformation",
    price: "$198.00",
    launchDate: "8 days ago",
    velocity: "Medium",
    category: "Pants",
  },
  {
    id: 4,
    name: "Sézane Cashmere Cardigan",
    brand: "Sézane",
    price: "$285.00",
    launchDate: "12 days ago",
    velocity: "High",
    category: "Knitwear",
  },
];

const productGaps = [
  {
    category: "Linen",
    competitorCount: 12,
    femmeCount: 3,
    opportunity: "Reformation has 12 linen pieces priced $180–$280 AUD. Femme has 3 linen pieces at $65–$95. Opportunity to expand premium linen range.",
  },
  {
    category: "Wide-Leg Pants",
    competitorCount: 8,
    femmeCount: 2,
    opportunity: "Sézane launching 4 new wide-leg styles this quarter. Current Femme range limited to 2 SKUs. Gap in trend-led bottoms.",
  },
  {
    category: "Occasion Dresses",
    competitorCount: 15,
    femmeCount: 6,
    opportunity: "Wedding guest / event dressing is a high-margin category. Competitors average 15 styles, Femme has 6.",
  },
];

const collectionBriefs = {
  strategy: {
    title: "AI Product Strategy Recommendation",
    context: "Analysis of Q1 2026 sales data combined with real-time competitor activity monitoring reveals a significant opportunity in the premium linen category. Sézane's success with 6,479 linen units sold at zero discount validates strong market demand for well-positioned linen pieces in the $95-$145 price range. Current Femme linen offerings are underpriced relative to customer expectations and market positioning.",
    targets: [
      "Launch 4-6 new linen pieces by Q1 2027",
      "Target price range: $95-$145 AUD (vs. current $65-$95)",
      "Achieve 58% margin (category average)",
      "Generate $42K incremental revenue in first 90 days",
      "Position as 'Summer Essentials' capsule collection",
    ],
    nextSteps: [
      "Week 1-2: Design team to develop 6 linen silhouettes (wrap top, wide-leg pant, midi dress, oversized shirt, shorts, blazer)",
      "Week 3: Source premium European linen suppliers (target: 120gsm weight, stone-washed finish)",
      "Week 4-6: Sample development and fit testing",
      "Week 7-8: Photoshoot and content creation for launch campaign",
      "Week 9: Soft launch with email list (VIP early access)",
      "Week 10-12: Full launch with paid social and influencer partnerships",
    ],
    team: [
      { name: "Sarah Chen", role: "Design Lead", responsibility: "Silhouette development & tech packs" },
      { name: "Marcus Liu", role: "Sourcing Manager", responsibility: "Supplier negotiation & quality control" },
      { name: "Emma Rodriguez", role: "Product Manager", responsibility: "Timeline coordination & launch execution" },
      { name: "James Park", role: "Marketing Director", responsibility: "Campaign strategy & channel planning" },
      { name: "Olivia Martinez", role: "Content Lead", responsibility: "Photography, copy, and asset creation" },
    ],
  },
  winter: {
    title: "Winter 2026 Collection Brief",
    context: "Data-driven analysis of search trends, social velocity, and category performance indicates three high-potential focus areas for Winter 2026. Oversized knitwear shows exceptional momentum with +72% trend velocity and industry-leading 62% margins. Midi dresses continue strong performance with +78% search volume growth and proven repeat purchase behavior. Femme Basics expansion represents a strategic opportunity given current 64% margins and 15% restock rate indicating strong customer loyalty.",
    targets: [
      "Oversized Knitwear: Launch 8-10 pieces, target $85K revenue, 62% margin",
      "Midi Dresses: Expand to 12 styles, target $68K revenue, achieve 3.2x repeat purchase rate",
      "Femme Basics: Add 6 core pieces, target $45K revenue, leverage 64% margin",
      "Overall collection revenue target: $198K in first 120 days",
      "Achieve blended 60% margin across collection",
    ],
    nextSteps: [
      "Month 1: Conduct trend validation with customer surveys and focus groups",
      "Month 1-2: Design team develops comprehensive mood boards and initial sketches for all three categories",
      "Month 2: Finalize 26-28 piece collection lineup with pricing strategy",
      "Month 2-3: Sample production and quality review across all categories",
      "Month 3-4: Photography, styling, and content creation for collection launch",
      "Month 4: Pre-launch campaign to build anticipation (email, social teasers)",
      "Month 5: Staged rollout: Knitwear (Week 1), Dresses (Week 2), Basics (Week 3)",
      "Month 5-6: Monitor performance and optimise based on sell-through rates",
    ],
    team: [
      { name: "Sarah Chen", role: "Design Lead", responsibility: "Collection design direction & technical specifications" },
      { name: "Marcus Liu", role: "Sourcing Manager", responsibility: "Material sourcing, vendor management, quality assurance" },
      { name: "Emma Rodriguez", role: "Product Manager", responsibility: "Collection planning, timeline management, cross-functional coordination" },
      { name: "James Park", role: "Marketing Director", responsibility: "Go-to-market strategy, campaign planning, channel allocation" },
      { name: "Olivia Martinez", role: "Content Lead", responsibility: "Creative direction, photography, storytelling" },
      { name: "Alex Thompson", role: "E-commerce Manager", responsibility: "Site merchandising, product launches, conversion optimisation" },
    ],
  },
};

const seasonalPlannerItems = [
  { id: 1, name: "Oversized Cable Knit Sweater", category: "Knitwear", status: "In Design", season: "Winter 2026", priority: "High" },
  { id: 2, name: "Linen Wide-Leg Pant", category: "Pants", status: "Sampling", season: "Spring 2026", priority: "High" },
  { id: 3, name: "Midi Wrap Dress - Floral", category: "Dresses", status: "Production", season: "Spring 2026", priority: "Medium" },
  { id: 4, name: "Cashmere Cardigan", category: "Knitwear", status: "Ideation", season: "Winter 2026", priority: "Medium" },
  { id: 5, name: "Tailored Blazer - Neutral", category: "Outerwear", status: "In Design", season: "Autumn 2026", priority: "High" },
];

export default function RNDDashboard() {
  const [selectedBrief, setSelectedBrief] = useState<"strategy" | "winter" | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [selectedTrend, setSelectedTrend] = useState<typeof trendSignals[0] | null>(null);
  const [showSeasonalPlannerModal, setShowSeasonalPlannerModal] = useState(false);
  const [showColorTrendModal, setShowColorTrendModal] = useState(false);
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [showWinterModal, setShowWinterModal] = useState(false);

  const handleAddSeasonalItem = (data: SeasonalItemData) => {
    console.log("New seasonal item added:", data);
    // In a real app, this would save to a database
    alert(`Added "${data.itemName}" to ${data.season} seasonal planner!`);
  };

  // Action Strip Data
  const actionStripData: ActionStripData = {
    silverBullet: {
      action: "Launch linen category expansion — competitor analysis shows 340% growth",
      impactLine: "Estimated: +$42,000 at projected 58% margin",
      channel: "Product Development · Summer Collection"
    },
    lowHangingFruit: {
      action: "Add earth-tone colorway to bestselling midi dress (trending +240%)",
      effortChip: "Easy · 5 days",
      impact: "+$8,400 revenue · Leverage existing production",
      channelChip: "Spring Collection · Quick Win"
    },
    frameworkTasks: [
      { task: "Summer linen collection development", status: "In Progress" },
      { task: "Competitor gap analysis review", status: "Planned" },
      { task: "Trend forecast integration", status: "On Track" }
    ]
  };

  const strategyBrief: DetailedBriefData = {
    title: "Linen Category Expansion Strategy",
    category: "AI Product Strategy · Category Development",
    overview: "Q1 2026 sales data and competitor analysis reveal significant opportunity in premium linen category. Sézane's linen success (6,479 units sold at $0 discount) validates strong customer demand for quality linen pieces at premium price points. Current Femme linen offering limited to Luxe Linen Wrap Top ($65) which underperforms due to price positioning below customer expectations ($95+ for linen). Recommend launching 4-6 new linen pieces priced $95-$145 targeting summer wardrobe essentials. Estimated revenue impact: +$42K at 58% margin.",
    goals: [
      "Expand linen category from 1 SKU to 6-7 SKUs covering key summer wardrobe essentials",
      "Establish premium linen positioning at $95-$145 price range (sweet spot between fast fashion and luxury)",
      "Generate +$42K incremental revenue in Q4 2026-Q1 2027 from linen category at 58% margin",
      "Capture market demand validated by competitor performance (Sézane 340% growth in linen)"
    ],
    detailedBrief: {
      challenge: "Current linen offering underperforms: Luxe Linen Wrap Top priced at $65 misaligned with customer expectations for linen quality ($95+ premium positioning). Competitor benchmarking shows Sézane linen pieces ($210-$285) selling 6,479 units with zero discounting - validates premium demand. Reformation linen ($198-$248) selling out weekly. Market gap exists at $95-$145 price point between fast fashion ($89 Mango) and luxury ($210+ Sézane). Customer demographic (25-40, sustainable fashion, professional) willing to pay premium for quality linen. Summer timing critical - linen is seasonal purchase (Apr-Aug peak demand).",
      approach: "Product Development: Design 6 linen pieces - (1) Wide-leg linen pants $135, (2) Linen midi dress $145, (3) Linen shirt $95, (4) Linen blazer $165, (5) Linen shorts $98, (6) Linen wrap top (redesigned) $115. Materials: Source European linen (French or Italian) for quality positioning vs synthetic blends. Colorways: Neutral palette (cream, sage, terracotta, natural white) for versatile summer wardrobe building. Launch Strategy: Introduce as 'Summer Linen Edit' May 2026, pre-season marketing Apr to build waitlist, hero campaign featuring linen as investment wardrobe staple. Pricing: Position at premium but accessible ($95-$165 range) to capture middle market gap. Production: Initial order 120 units per SKU (720 total) based on Sézane velocity benchmarks scaled to Femme's customer base size.",
      timeline: "6-month development cycle (Jan-Jun 2026 for Jul launch)",
      budget: "$28,400 (fabric sourcing $12,600, production $10,800, photography $3,200, campaign $1,800)"
    },
    nextSteps: [
      {
        step: "Linen Fabric Sourcing & Quality Benchmarking",
        description: "Source 3 European linen suppliers (French or Italian mills). Request fabric samples for hand-feel testing vs Sézane/Reformation benchmarks. Criteria: 100% linen (no blends), 180-200 GSM weight (optimal drape), natural fiber certification. Negotiate pricing: target $18-$24/meter to support $95-$145 retail with 58% margin. Order initial fabric (3,600 meters for 720 units).",
        owner: "Fabric Sourcing Manager"
      },
      {
        step: "Product Design & Tech Pack Development",
        description: "Design 6 linen pieces with focus on timeless silhouettes (avoid trend-heavy details for longevity). Create detailed tech packs: measurements, construction notes, finishing details. Sample development: produce 2 samples per style in 2 colorways for fit testing and photography. Fit sessions: test on 5 body types (AU 6-14) to ensure inclusive sizing. Finalize grading and size run (AU 6-16 for pants/shorts, 6-18 for tops/dresses).",
        owner: "Product Designer + Tech Team"
      },
      {
        step: "Pre-Launch Waitlist Campaign & Market Validation",
        description: "April 2026: Launch 'Summer Linen Edit Coming Soon' teaser campaign. Email to engaged customers (last 90-day purchasers): 'Be first to shop our linen collection'. Landing page with product previews, waitlist signup, linen education content ('Why invest in quality linen'). Target: 800 waitlist signups (validates demand before production commitment). Survey waitlist: preferred pieces, color preferences, price sensitivity check ($95-$145 acceptable?).",
        owner: "Marketing Manager"
      },
      {
        step: "July Launch & Performance Tracking",
        description: "July 1 2026: Full collection launch across email, social, paid channels. Early access for waitlist (48 hours exclusive). Campaign messaging: 'Investment pieces for your summer wardrobe', sustainability angle (European linen, natural fibers), styling versatility (work to weekend). Track Week 1-4: sell-through rate by SKU (target 40% in first month), average order value (linen purchasers vs overall), customer feedback (quality perception, fit, styling). Optimize: reorder fast sellers (wide-leg pants, midi dress expected heroes), discount slow movers Week 6 if needed.",
        owner: "E-commerce Manager + Product Team"
      }
    ],
    potentialOutcomes: {
      bestCase: "+$58K revenue if linen resonates strongly (50% sell-through Month 1, customer demand exceeds Sézane benchmarks), 62% margin if fabric costs lower than estimated, linen becomes signature category for Femme (ongoing seasonal collections)",
      expected: "+$42K revenue from linen category (40% sell-through in 90 days, 720 units x $95-$145 avg), 58% margin maintained, establishes premium linen positioning for future seasonal drops, validates $95-$145 price architecture",
      metrics: [
        "Linen category revenue (Q4 2026-Q1 2027)",
        "Sell-through rate by SKU (target 40% Month 1)",
        "Margin analysis (target 58%)",
        "Price point validation (customer acceptance at $95-$145)",
        "Repeat purchase rate (linen buyers returning for additional pieces)",
        "Waitlist conversion rate (waitlist signups → purchases)"
      ]
    }
  };

  const winterBrief: DetailedBriefData = {
    title: "Winter 2026 Collection Strategy",
    category: "AI Product Strategy · Seasonal Planning",
    overview: "Winter 2026 collection planning backed by category performance data and trend velocity analysis. Top 3 recommended categories: (1) Oversized Knitwear (+72% trend velocity, 62% margin), (2) Midi Dresses (+78% search volume, strong repeat purchase pattern), (3) Femme Basics Expansion (64% margin, 15% restock rate signals loyalty). Strategic avoid: Pants category showing 18% return rate indicating fit challenges requiring resolution before expansion. Focus resources on proven high-margin, low-return categories for Winter 2026 success.",
    goals: [
      "Launch Winter 2026 collection focused on 3 high-performing categories: Knitwear, Midi Dresses, Basics",
      "Achieve 60%+ blended margin across Winter collection (vs 52% current average)",
      "Minimize return rate by avoiding problematic categories (pants 18% return rate)",
      "Build seasonal repeat purchase behavior through Basics expansion (current 15% restock rate)"
    ],
    detailedBrief: {
      challenge: "Winter collection planning requires category prioritization to maximize ROI and minimize operational challenges. Historical data reveals category performance variance: Knitwear shows strong margins (62%) and trend velocity (+72%) but limited current offering. Midi Dresses have sustained search demand (+78% volume) and proven repeat purchase pattern - customers buy multiple styles. Femme Basics demonstrate customer loyalty (15% restock rate = customers returning for same items) with excellent margins (64%). Conversely, Pants category plagued by 18% return rate (likely fit issues - inseam, rise, waist proportions) creating customer service burden and margin erosion. Resource constraints (design time, production budget, inventory investment) require focused category selection vs trying to compete across all categories.",
      approach: "Category 1: Oversized Knitwear - Design 8 knitwear pieces (4 sweaters, 2 cardigans, 2 knit vests) leveraging +72% trend velocity. Price range $95-$165 for premium wool/cashmere blends. Colorways: Winter neutrals (camel, charcoal, cream, forest green). Target 62% margin through direct sourcing vs wholesale. Category 2: Midi Dresses - Expand midi dress offering from 4 to 10 styles, mix long-sleeve (winter-appropriate) with sleeveless (layering pieces). Capitalize on +78% search volume with SEO-optimized product naming. Category 3: Femme Basics - Add 6 new basic styles (rib tanks, turtlenecks, layering tees) in expanded colorways (8 colors vs current 3). High-volume, low-touch category with proven restock behavior. Strategic Avoid: Pause pants development until fit issues resolved - invest in fit study (sample testing across body types) for future seasons vs rushing problematic category into Winter 2026.",
      timeline: "8-month development (Mar-Oct 2026 for Nov launch)",
      budget: "$42,600 (knitwear development $18,400, midi dresses $12,800, basics expansion $8,200, campaign $3,200)"
    },
    nextSteps: [
      {
        step: "Knitwear Design & Yarn Sourcing",
        description: "Design 8 oversized knitwear pieces following trend: chunky knits, relaxed silhouettes, textured stitches (cable, ribbed). Source premium yarns: merino wool blends, cashmere blends (30% cashmere for luxury feel at accessible price). Color palette: 6 winter neutrals. Sample development: produce samples by June for photography and fit testing. Target: 62% margin through direct manufacturer relationships (vs buying wholesale).",
        owner: "Knitwear Designer + Sourcing"
      },
      {
        step: "Midi Dress Expansion & Search Optimization",
        description: "Design 6 new midi dress styles for Winter (add to existing 4 = 10 total styles). Mix: 4 long-sleeve (winter-weight fabrics), 2 sleeveless (layering pieces). Fabrics: wool blends, ponte, heavyweight jersey. SEO strategy: product naming optimized for +78% search volume ('Long Sleeve Midi Dress', 'Winter Midi Dress', 'Wool Midi Dress'). Photography: style with knitwear for cross-sell opportunity. Leverage existing midi dress repeat purchase pattern - email campaign to previous midi buyers.",
        owner: "Product Designer + SEO Manager"
      },
      {
        step: "Femme Basics Expansion & Restock Strategy",
        description: "Expand Basics offering: add 6 new styles (rib tanks, turtlenecks, long-sleeve layering tees). Colorway expansion: increase from 3 colors to 8 (black, white, cream, grey, camel, navy, olive, rust) to support wardrobe building. Capitalize on 15% restock rate: email automation to previous Basic purchasers announcing new colors/styles. High-volume production: order 200 units per style x 8 colors = 1,600 units (proven demand, low-risk inventory). Target 64% margin through simple construction and efficient production.",
        owner: "Basics Category Manager"
      },
      {
        step: "Pants Category Fit Study (Future Seasons)",
        description: "Pause Winter 2026 pants development. Commission fit study: engage fit consultant to analyze 18% return rate root cause. Hypothesis: inseam length, rise height, waist-to-hip ratio causing fit issues. Solution: test samples on 20 diverse body types (varying heights, proportions), collect feedback, adjust pattern grading. Timeline: resolve fit issues by Q2 2027 for potential Spring 2027 pants relaunch. Avoid margin erosion and customer frustration from rushing problematic category.",
        owner: "Product Development Lead"
      }
    ],
    potentialOutcomes: {
      bestCase: "$124K Winter collection revenue if all categories exceed targets (knitwear strong sell-through, midi dress repeat purchases, basics restock rate increases to 20%), 65% blended margin, Winter 2026 becomes revenue record season",
      expected: "$96K Winter collection revenue (knitwear $42K, midi dresses $34K, basics $20K), 61% blended margin (above 52% current average), pants category avoided prevents return rate burden and margin erosion",
      metrics: [
        "Winter collection total revenue by category",
        "Blended margin (target 60%+)",
        "Return rate (expect <10% vs 18% with pants)",
        "Knitwear sell-through rate",
        "Midi dress repeat purchase rate",
        "Basics restock rate (monitor if increases from 15%)"
      ]
    }
  };

  return (
    <div>
      <PageHeader
        label="Strategy · R&D"
        title="Research & Development"
        description="Product intelligence for new season planning. Competitor launches, trend signals, and category gap analysis powered by Particl data feeds."
        backgroundGradient="green"
        image={rndHero}
        externalLinks={[
          { name: "Particl", url: "https://particl.com" },
          { name: "Shopify Products", url: "https://shopify.com" },
        ]}
        stats={[
          { label: "Product Gaps", value: "3" },
          { label: "Trend Signals", value: "4" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        {/* AI Widget */}
        <AIWidget
          insightLabel="R&D Intelligence"
          insightText="Linen category showing 340% YoY growth across competitors. Earth-tone colorways trending +240% in dress category. 3 product gaps identified in $75-$95 price range. Recommendation: launch linen expansion and add earth-tone variants to bestsellers."
        />

      <StatGrid columns={4}>
        <MetricCard
          label="Category Health Score"
          value="78%"
          change="+5.2%"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="Product Gaps Identified"
          value="3"
          change="High Priority"
          changeType="neutral"
        />
        <MetricCard
          label="Trend Signals"
          value="4"
          change="Active"
          changeType="positive"
        />
        <MetricCard
          label="Competitor Launches"
          value="18"
          change="Last 30d"
          changeType="neutral"
        />
      </StatGrid>

      <div className="grid grid-cols-2 gap-6">
        <AIInsightCard
          title="AI Product Strategy Recommendation"
          content="Based on Q1 sales data and competitor activity, recommend expanding the Linen category with 4-6 new pieces priced $95-$145. Sézane's linen success (6,479 units at $0 discount) validates premium positioning. Your Luxe Linen Wrap Top ($65) is underperforming due to price positioning—customer expects linen at $95+."
          showButton={true}
          onButtonClick={() => setShowStrategyModal(true)}
        />
        <AIInsightCard
          title="Winter 2026 Collection Brief"
          content="Top 3 categories for Winter 2026: (1) Oversized Knitwear—trending +72% velocity, margin-rich at 62%. (2) Midi Dresses—search volume up 78%, strong repeat purchase. (3) Femme Basics Expansion—64% margin, 15% restock rate, proven customer loyalty. Avoid pants expansion—18% return rate signals fit issues."
          variant="accent"
          showButton={true}
          onButtonClick={() => setShowWinterModal(true)}
        />
      </div>

      {/* Brief Modal */}
      {selectedBrief && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBrief(null)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between">
              <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                {collectionBriefs[selectedBrief].title}
              </h2>
              <button onClick={() => setSelectedBrief(null)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Context */}
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Context & Background
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  {collectionBriefs[selectedBrief].context}
                </p>
              </div>

              {/* Targets */}
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Targets & Objectives
                </h3>
                <ul className="space-y-2">
                  {collectionBriefs[selectedBrief].targets.map((target, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[14px] text-[var(--text-secondary)]">
                      <span className="text-[var(--pink)] mt-1">•</span>
                      <span>{target}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Next Steps & Timeline
                </h3>
                <div className="space-y-3">
                  {collectionBriefs[selectedBrief].nextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--pink-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[11px] font-medium text-[var(--pink)]">{idx + 1}</span>
                      </div>
                      <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team */}
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Team & Responsibilities
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {collectionBriefs[selectedBrief].team.map((member, idx) => (
                    <div key={idx} className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--green-light)] flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[var(--green)]" />
                        </div>
                        <div>
                          <div className="text-[14px] font-medium text-[var(--text-primary)] mb-0.5">{member.name}</div>
                          <div className="text-[11px] text-[var(--text-tertiary)] mb-2">{member.role}</div>
                          <div className="text-[12px] text-[var(--text-secondary)]">{member.responsibility}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                  <button className="flex-1 px-4 py-3 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button className="flex-1 px-4 py-3 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="px-4 py-3 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[14px] font-medium flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    {showShareMenu && (
                      <div className="absolute top-full mt-2 right-0 bg-white border border-[var(--border-color)] rounded-[var(--radius-md)] shadow-xl min-w-[200px] z-10">
                        <button className="w-full px-4 py-2 text-left text-[13px] text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors first:rounded-t-[var(--radius-md)] last:rounded-b-[var(--radius-md)]">
                          Copy Link
                        </button>
                        <button className="w-full px-4 py-2 text-left text-[13px] text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors">
                          Share to Slack
                        </button>
                        <button className="w-full px-4 py-2 text-left text-[13px] text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors">
                          Share to Teams
                        </button>
                        <button className="w-full px-4 py-2 text-left text-[13px] text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors last:rounded-b-[var(--radius-md)]">
                          Export to Notion
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Performance Heatmap */}
      <Card>
        <CardTitle>Category Performance Heatmap</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">
          Internal Shopify data — Last 90 days
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                  Category
                </th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                  Revenue
                </th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                  Units
                </th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                  Margin %
                </th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                  Return Rate
                </th>
                <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                  Restock Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryPerformance.map((cat, index) => (
                <tr key={index} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--surface)] transition-colors">
                  <td className="py-3 px-4 text-[14px] font-medium text-[var(--text-primary)]">
                    {cat.category}
                  </td>
                  <td className="py-3 px-4 text-right text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    ${(cat.revenue / 1000).toFixed(0)}K
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    {cat.units.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div
                      className={`inline-flex px-2 py-1 rounded text-[13px] font-medium ${
                        cat.margin >= 60
                          ? "bg-[var(--green-light)] text-[var(--green)]"
                          : cat.margin >= 55
                          ? "bg-[var(--buff)] text-[var(--text-secondary)]"
                          : "bg-[var(--terra-light)] text-[var(--terra)]"
                      }`}
                    >
                      {cat.margin}%
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div
                      className={`inline-flex px-2 py-1 rounded text-[13px] font-medium ${
                        cat.returnRate <= 10
                          ? "bg-[var(--green-light)] text-[var(--green)]"
                          : cat.returnRate <= 15
                          ? "bg-[var(--buff)] text-[var(--text-secondary)]"
                          : "bg-[var(--terra-light)] text-[var(--terra)]"
                      }`}
                    >
                      {cat.returnRate}%
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                    {cat.restockRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New R&D Widgets */}
      {/* Seasonal Planner */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>Seasonal Planner</CardTitle>
          </div>
          <button
            onClick={() => setShowSeasonalPlannerModal(true)}
            className="px-3 py-1.5 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[12px] font-medium flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Item
          </button>
        </div>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Track and plan product development for upcoming seasons</p>

        <div className="mb-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search items, categories, or seasons..."
              className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[13px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all"
            />
          </div>
        </div>

        <div className="space-y-3">
          {seasonalPlannerItems.map((item) => {
            const statusColors = {
              "Ideation": { bg: "var(--buff)", text: "var(--buff-dark)" },
              "In Design": { bg: "var(--pink-light)", text: "var(--pink)" },
              "Sampling": { bg: "var(--terra-light)", text: "var(--terra)" },
              "Production": { bg: "var(--green-light)", text: "var(--green)" },
            };
            const status = statusColors[item.status as keyof typeof statusColors];
            const priorityColors = {
              "High": "var(--pink)",
              "Medium": "var(--terra)",
              "Low": "var(--text-tertiary)",
            };

            return (
              <div key={item.id} className="flex items-center gap-4 p-3 border border-[var(--border-color)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] transition-colors">
                <div className="flex-1">
                  <div className="text-[14px] font-medium text-[var(--text-primary)] mb-1">{item.name}</div>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)]">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.season}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="px-2 py-1 rounded text-[11px] font-medium"
                    style={{ backgroundColor: status.bg, color: status.text }}
                  >
                    {item.status}
                  </div>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: priorityColors[item.priority as keyof typeof priorityColors] }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Design Pipeline & Trend Velocity */}
      <div className="grid grid-cols-2 gap-6">
        {/* Design Pipeline Status */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>Design Pipeline Status</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Current product development stages</p>
          <ResponsiveContainer width="100%" height={240}>
            <RechartsPieChart>
              <Pie
                key="pie-pipeline"
                data={[
                  { name: "Ideation", value: 8, color: "var(--buff-dark)" },
                  { name: "In Design", value: 12, color: "var(--pink)" },
                  { name: "Sampling", value: 6, color: "var(--terra)" },
                  { name: "Production", value: 4, color: "var(--green)" },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell key="cell-ideation-pipeline" fill="var(--buff-dark)" />
                <Cell key="cell-design-pipeline" fill="var(--pink)" />
                <Cell key="cell-sampling-pipeline" fill="var(--terra)" />
                <Cell key="cell-production-pipeline" fill="var(--green)" />
              </Pie>
              <Tooltip
                key="tooltip-pipeline"
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  fontSize: 12
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { label: "Ideation", value: 8, color: "var(--buff-dark)" },
              { label: "In Design", value: 12, color: "var(--pink)" },
              { label: "Sampling", value: 6, color: "var(--terra)" },
              { label: "Production", value: 4, color: "var(--green)" },
            ].map((item, index) => (
              <div key={`pipeline-legend-${index}`} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[11px] text-[var(--text-secondary)]">{item.label}: {item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Trend Velocity Chart */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>Trend Velocity - 30 Days</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Search & social momentum tracking</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={[
              { trend: "Linen", velocity: 85 },
              { trend: "Midi", velocity: 78 },
              { trend: "Knit", velocity: 72 },
              { trend: "Neutral", velocity: 68 },
              { trend: "Wide-Leg", velocity: 62 },
            ]}>
              <CartesianGrid key="cartesian-velocity" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="x-axis-velocity" dataKey="trend" tick={{ fill: "var(--text-secondary)", fontSize: 11 }} />
              <YAxis key="y-axis-velocity" tick={{ fill: "var(--text-secondary)", fontSize: 11 }} />
              <Tooltip
                key="tooltip-velocity"
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  fontSize: 12
                }}
              />
              <Bar key="bar-velocity" dataKey="velocity" fill="var(--pink)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Color Palette Trends */}
        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-[var(--pink)]" />
              <CardTitle>Trending Colour Palettes</CardTitle>
            </div>
            <button
              onClick={() => setShowColorTrendModal(true)}
              className="px-3 py-1.5 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[12px] font-medium flex items-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              View Trends
            </button>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Top performing colours - last 90 days</p>
          <div className="space-y-4">
            {[
              { color: "Sage Green", hex: "#9CAF88", sales: 342, trend: "+24%" },
              { color: "Terracotta", hex: "#E07A5F", sales: 298, trend: "+18%" },
              { color: "Cream", hex: "#F4F1DE", sales: 412, trend: "+15%" },
              { color: "Dusty Blue", hex: "#81A4CD", sales: 267, trend: "+12%" },
              { color: "Warm Taupe", hex: "#B8A896", sales: 389, trend: "+8%" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[var(--radius-md)] border border-[var(--border-color)]" style={{ backgroundColor: item.hex }} />
                <div className="flex-1">
                  <div className="text-[14px] font-medium text-[var(--text-primary)] mb-0.5">{item.color}</div>
                  <div className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>{item.hex}</div>
                </div>
                <div className="text-right">
                  <div className="text-[14px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>{item.sales}</div>
                  <div className="text-[11px] text-[var(--green)]">{item.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

      {/* Category Mix Projection */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-[var(--pink)]" />
          <CardTitle>Category Mix Projection - Winter 2026</CardTitle>
        </div>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Projected vs. current category allocation</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { category: "Knitwear", current: 22, projected: 32 },
            { category: "Dresses", current: 28, projected: 26 },
            { category: "Basics", current: 18, projected: 22 },
            { category: "Pants", current: 15, projected: 10 },
            { category: "Outerwear", current: 10, projected: 8 },
            { category: "Accessories", current: 7, projected: 2 },
          ]}>
            <CartesianGrid key="cartesian-category" strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis key="x-axis-category" dataKey="category" tick={{ fill: "var(--text-secondary)", fontSize: 11 }} />
            <YAxis key="y-axis-category" tick={{ fill: "var(--text-secondary)", fontSize: 11 }} label={{ value: '% of Collection', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: 'var(--text-secondary)' } }} />
            <Tooltip
              key="tooltip-category"
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                fontSize: 12
              }}
              formatter={(value: number) => `${value}%`}
            />
            <Legend key="legend-category" wrapperStyle={{ fontSize: 12 }} iconType="circle" />
            <Bar key="bar-current" dataKey="current" fill="var(--terra)" name="Current Mix" />
            <Bar key="bar-projected" dataKey="projected" fill="var(--green)" name="Projected Mix" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Competitor New Product Feed */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Competitor New Product Feed</CardTitle>
            <Tag variant="pink">Particl ↗</Tag>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">
            Latest launches from Sézane & Reformation
          </p>
          <div className="space-y-4">
            {competitorNewProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-start gap-4 p-4 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors"
              >
                <div className="flex-1">
                  <div className="text-[14px] font-medium text-[var(--text-primary)] mb-1">
                    {product.name}
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-[var(--text-secondary)]">
                    <span>{product.brand}</span>
                    <span>·</span>
                    <span>{product.category}</span>
                    <span>·</span>
                    <span>{product.launchDate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {product.price}
                  </div>
                  <div className={`text-[11px] uppercase tracking-wide ${
                    product.velocity === "High" ? "text-[var(--pink)]" : "text-[var(--text-tertiary)]"
                  }`} style={{ fontFamily: "var(--font-mono)" }}>
                    {product.velocity} Velocity
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Gap Analysis */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>AI Gap Analysis</CardTitle>
            <Tag variant="terra">Insights</Tag>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">
            Product opportunities vs. competitors
          </p>
          <div className="space-y-4">
            {productGaps.map((gap, index) => (
              <div
                key={index}
                className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[14px] font-medium text-[var(--text-primary)]">
                    {gap.category}
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="text-[var(--text-tertiary)]">Competitors:</span>
                    <span className="font-medium text-[var(--terra)]">{gap.competitorCount}</span>
                    <span className="text-[var(--text-tertiary)]">vs Femme:</span>
                    <span className="font-medium text-[var(--text-primary)]">{gap.femmeCount}</span>
                  </div>
                </div>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  {gap.opportunity}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Trend Signals */}
      <Card>
        <CardTitle>Trend Signal Feed</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">
          Rising trends with velocity indicators
        </p>
        <div className="space-y-4">
          {trendSignals.map((signal) => (
            <div
              key={signal.id}
              className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-[var(--radius-md)]"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${signal.color}15` }}>
                  <TrendingUp className="w-6 h-6" style={{ color: signal.color }} />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-[var(--text-primary)] mb-1">
                    {signal.trend}
                  </div>
                  <div className="text-[12px] text-[var(--text-secondary)]">
                    Source: {signal.source} · Trending for {signal.daysTrending} days
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wide text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                    Velocity
                  </div>
                  <div className="text-[20px] font-medium" style={{ fontFamily: "var(--font-serif)", color: signal.color }}>
                    {signal.velocity}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTrend(signal)}
                  className="px-3 py-2 bg-white border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[12px] font-medium"
                >
                  View Trend
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Trend Detail Modal */}
      {selectedTrend && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTrend(null)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: `${selectedTrend.color}15` }}>
                  <TrendingUp className="w-7 h-7" style={{ color: selectedTrend.color }} />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {selectedTrend.trend}
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">Velocity: {selectedTrend.velocity} · Trending for {selectedTrend.daysTrending} days</p>
                </div>
              </div>
              <button onClick={() => setSelectedTrend(null)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                    Search Volume Growth
                  </div>
                  <div className="text-[24px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: selectedTrend.color }}>
                    {selectedTrend.details.searchVolume}
                  </div>
                </div>
                <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                    Social Mentions
                  </div>
                  <div className="text-[24px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: selectedTrend.color }}>
                    {selectedTrend.details.socialMentions}
                  </div>
                </div>
                <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                    Competitor Products
                  </div>
                  <div className="text-[24px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: selectedTrend.color }}>
                    {selectedTrend.details.competitorCount}
                  </div>
                </div>
              </div>

              {/* Origin */}
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Trend Origin & Background
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  {selectedTrend.details.origin}
                </p>
              </div>

              {/* Channel Breakdown */}
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Channel Distribution
                </h3>
                <div className="space-y-3">
                  {selectedTrend.details.channels.map((channel, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[13px] font-medium text-[var(--text-primary)]">{channel.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[12px] text-[var(--green)]">{channel.growth}</span>
                          <span className="text-[13px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                            {channel.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${channel.percentage}%`, backgroundColor: selectedTrend.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Brands */}
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Brands Trending This Category
                </h3>
                <div className="space-y-3">
                  {selectedTrend.details.trendingBrands.map((brand, idx) => (
                    <div key={idx} className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-[15px] font-semibold text-[var(--text-primary)] mb-1">{brand.brand}</div>
                          <div className="flex items-center gap-3 text-[12px] text-[var(--text-secondary)] mb-2">
                            <span>{brand.products}</span>
                            <span>•</span>
                            <span>{brand.priceRange}</span>
                          </div>
                          <div className="text-[12px] text-[var(--text-tertiary)]">{brand.performance}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic Interest */}
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Geographic Interest
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedTrend.details.locations.map((location, idx) => (
                    <div key={idx} className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-medium text-[var(--text-primary)]">{location.region}</span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{
                          backgroundColor: location.interest === "Very High" ? "var(--green-light)" : location.interest === "High" ? "var(--pink-light)" : "var(--buff)",
                          color: location.interest === "Very High" ? "var(--green)" : location.interest === "High" ? "var(--pink)" : "var(--buff-dark)"
                        }}>
                          {location.interest}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${location.index}%`, backgroundColor: selectedTrend.color }}
                          />
                        </div>
                        <span className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                          {location.index}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opportunity Analysis */}
              <div className="p-5 bg-[var(--green-light)] rounded-[var(--radius-lg)] border-l-4" style={{ borderColor: selectedTrend.color }}>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <TrendingUp className="w-4 h-4" />
                  Opportunity Analysis for Femme
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  {selectedTrend.details.opportunity}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Action Strip */}
        <ActionStrip data={actionStripData} />

        {/* Seasonal Planner Modal */}
        <SeasonalPlannerModal
          show={showSeasonalPlannerModal}
          onClose={() => setShowSeasonalPlannerModal(false)}
          onSubmit={handleAddSeasonalItem}
        />

        {/* Color Trend Modal */}
        <ColorTrendModal
          show={showColorTrendModal}
          onClose={() => setShowColorTrendModal(false)}
        />

        {/* Detailed Brief Modals */}
        <DetailedBriefModal
          show={showStrategyModal}
          onClose={() => setShowStrategyModal(false)}
          data={strategyBrief}
        />

        <DetailedBriefModal
          show={showWinterModal}
          onClose={() => setShowWinterModal(false)}
          data={winterBrief}
        />
      </div>
    </div>
  );
}
