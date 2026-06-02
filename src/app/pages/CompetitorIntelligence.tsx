import { useState } from "react";
import { Card, CardTitle, MetricCard, AIInsightCard, Tag } from "../components/ui/Card";
import { FilterBar, StatGrid, ChartContainer } from "../components/ui/Filters";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Heart, Eye, Mail, DollarSign, Calendar, Image as ImageIcon, ShoppingBag, Target, MessageSquare, Users, Share2, BarChart3 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { AIWidget } from "../components/AIWidget";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import ProductIntelligenceTab from "../components/ProductIntelligenceTab";
import MarketIntelligenceTab from "../components/MarketIntelligenceTab";
import EmailIntelligenceTab from "../components/EmailIntelligenceTab";
import MetaIntelligenceTab from "../components/MetaIntelligenceTab";
import SocialIntelligenceTab from "../components/SocialIntelligenceTab";
import { DetailedBriefModal, DetailedBriefData } from "../components/DetailedBriefModal";
import femme1 from "../../imports/Femme_1.jpeg";
import femme2 from "../../imports/Femme_2.jpeg";
import femme3 from "../../imports/Femme_3.jpeg";
import femme4 from "../../imports/Femme_4.jpeg";
import reformation1 from "../../imports/Reformation_1.jpeg";
import reformation2 from "../../imports/Reformation_2.jpeg";
import reformation4 from "../../imports/Reformation_4.jpeg";
import sezane1 from "../../imports/Sezane_1-1.jpeg";
import sezane2 from "../../imports/Sezane_2-1.jpeg";
import sezane3 from "../../imports/Sezane_3-1.jpeg";
import sezane4 from "../../imports/Sezane_4-1.jpeg";
import sezane5 from "../../imports/Sezane_5-1.jpeg";

export default function CompetitorIntelligence() {
  const [activeTab, setActiveTab] = useState<"product" | "market" | "email" | "meta" | "social">("product");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [showSilverBulletModal, setShowSilverBulletModal] = useState(false);
  const [showLowHangingFruitModal, setShowLowHangingFruitModal] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Comprehensive Competitor Data - 20 brands (15 AU + 5 International)
  const competitors = [
    // Top 5 International
    { id: 1, name: "Reformation", region: "US", tier: "International", skus: 2847, avgPrice: "$185", discount: "7%", velocity: "High", newLaunches: 24, stock: 92, trend: "up" },
    { id: 2, name: "Sézane", region: "EU", tier: "International", skus: 3214, avgPrice: "$165", discount: "0%", velocity: "Very High", newLaunches: 18, stock: 88, trend: "up" },
    { id: 3, name: "Zara", region: "EU", tier: "International", skus: 8942, avgPrice: "$65", discount: "15%", velocity: "High", newLaunches: 156, stock: 95, trend: "up" },
    { id: 4, name: "& Other Stories", region: "EU", tier: "International", skus: 1842, avgPrice: "$125", discount: "12%", velocity: "Medium", newLaunches: 32, stock: 85, trend: "flat" },
    { id: 5, name: "Everlane", region: "US", tier: "International", skus: 892, avgPrice: "$98", discount: "8%", velocity: "Medium", newLaunches: 12, stock: 78, trend: "flat" },

    // Top 15 Australian Direct Competitors
    { id: 6, name: "Princess Polly", region: "AU", tier: "Direct", skus: 4256, avgPrice: "$72", discount: "18%", velocity: "Very High", newLaunches: 84, stock: 94, trend: "up" },
    { id: 7, name: "Showpo", region: "AU", tier: "Direct", skus: 3847, avgPrice: "$68", discount: "22%", velocity: "High", newLaunches: 72, stock: 91, trend: "up" },
    { id: 8, name: "Meshki", region: "AU", tier: "Direct", skus: 2134, avgPrice: "$95", discount: "12%", velocity: "High", newLaunches: 48, stock: 87, trend: "up" },
    { id: 9, name: "White Fox Boutique", region: "AU", tier: "Direct", skus: 1928, avgPrice: "$58", discount: "25%", velocity: "Very High", newLaunches: 62, stock: 89, trend: "up" },
    { id: 10, name: "Pepper Mayo", region: "AU", tier: "Direct", skus: 2456, avgPrice: "$82", discount: "16%", velocity: "High", newLaunches: 54, stock: 90, trend: "up" },
    { id: 11, name: "Beginning Boutique", region: "AU", tier: "Direct", skus: 1847, avgPrice: "$64", discount: "20%", velocity: "Medium", newLaunches: 38, stock: 85, trend: "flat" },
    { id: 12, name: "Lioness Fashion", region: "AU", tier: "Direct", skus: 1654, avgPrice: "$78", discount: "14%", velocity: "High", newLaunches: 42, stock: 88, trend: "up" },
    { id: 13, name: "Hello Molly", region: "AU", tier: "Direct", skus: 2245, avgPrice: "$69", discount: "19%", velocity: "High", newLaunches: 46, stock: 86, trend: "up" },
    { id: 14, name: "Stelly", region: "AU", tier: "Direct", skus: 1342, avgPrice: "$88", discount: "10%", velocity: "Medium", newLaunches: 28, stock: 82, trend: "flat" },
    { id: 15, name: "Dissh", region: "AU", tier: "Direct", skus: 1728, avgPrice: "$92", discount: "11%", velocity: "Medium", newLaunches: 34, stock: 84, trend: "up" },
    { id: 16, name: "Tigerlily", region: "AU", tier: "Direct", skus: 945, avgPrice: "$145", discount: "8%", velocity: "Low", newLaunches: 18, stock: 76, trend: "flat" },
    { id: 17, name: "Spell & The Gypsy", region: "AU", tier: "Direct", skus: 687, avgPrice: "$198", discount: "5%", velocity: "Medium", newLaunches: 14, stock: 72, trend: "up" },
    { id: 18, name: "Bec + Bridge", region: "AU", tier: "Direct", skus: 534, avgPrice: "$285", discount: "3%", velocity: "Low", newLaunches: 8, stock: 68, trend: "flat" },
    { id: 19, name: "Shona Joy", region: "AU", tier: "Direct", skus: 642, avgPrice: "$245", discount: "6%", velocity: "Low", newLaunches: 12, stock: 70, trend: "flat" },
    { id: 20, name: "Reliquia Jewellery", region: "AU", tier: "Direct", skus: 428, avgPrice: "$125", discount: "9%", velocity: "Medium", newLaunches: 16, stock: 74, trend: "up" },
  ];

  // Category Performance Data
  const categoryData = [
    { category: "Dresses", femme: 124, competitors: 3847, gap: -42, growth: "+28%", opportunity: "High" },
    { category: "Tops & Blouses", femme: 89, competitors: 2654, gap: -18, growth: "+18%", opportunity: "Medium" },
    { category: "Bottoms", femme: 64, competitors: 1842, gap: -12, growth: "+12%", opportunity: "Medium" },
    { category: "Outerwear", femme: 32, competitors: 1245, gap: -34, growth: "+42%", opportunity: "Very High" },
    { category: "Knitwear", femme: 28, competitors: 892, gap: -28, growth: "+35%", opportunity: "High" },
    { category: "Activewear", femme: 18, competitors: 1456, gap: -68, growth: "+52%", opportunity: "Very High" },
    { category: "Accessories", femme: 42, competitors: 2134, gap: -48, growth: "+38%", opportunity: "High" },
    { category: "Swimwear", femme: 24, competitors: 847, gap: -22, growth: "+24%", opportunity: "Medium" },
  ];

  // Price Band Analysis (comprehensive)
  const priceBandData = [
    { range: "$0-50", competitors: 1847, femme: 12, avgDiscount: "28%", velocity: "Very High", margin: "18%" },
    { range: "$50-75", competitors: 2456, femme: 38, avgDiscount: "24%", velocity: "High", margin: "32%" },
    { range: "$75-100", competitors: 3214, femme: 64, avgDiscount: "18%", velocity: "High", margin: "42%" },
    { range: "$100-125", competitors: 2847, femme: 48, avgDiscount: "14%", velocity: "Medium", margin: "48%" },
    { range: "$125-150", competitors: 1928, femme: 28, avgDiscount: "10%", velocity: "Medium", margin: "52%" },
    { range: "$150-200", competitors: 2134, femme: 18, avgDiscount: "8%", velocity: "Low", margin: "58%" },
    { range: "$200+", competitors: 1245, femme: 8, avgDiscount: "4%", velocity: "Low", margin: "62%" },
  ];

  // New Launches Tracking (Last 30 days)
  const newLaunches = [
    { brand: "Princess Polly", launches: 84, category: "Dresses", priceRange: "$60-90", velocity: "Very High", daysLive: 8 },
    { brand: "Zara", launches: 156, category: "Mixed", priceRange: "$45-85", velocity: "High", daysLive: 12 },
    { brand: "Showpo", launches: 72, category: "Dresses", priceRange: "$55-80", velocity: "High", daysLive: 6 },
    { brand: "White Fox", launches: 62, category: "Activewear", priceRange: "$40-70", velocity: "Very High", daysLive: 14 },
    { brand: "Pepper Mayo", launches: 54, category: "Tops", priceRange: "$50-85", velocity: "High", daysLive: 10 },
    { brand: "Meshki", launches: 48, category: "Dresses", priceRange: "$80-120", velocity: "High", daysLive: 18 },
    { brand: "Hello Molly", launches: 46, category: "Mixed", priceRange: "$55-95", velocity: "Medium", daysLive: 22 },
  ];

  // Discount Strategy Analysis
  const discountStrategy = [
    { brand: "White Fox", avgDiscount: "25%", frequency: "Daily", deepestDiscount: "40%", fullPriceRatio: "32%" },
    { brand: "Showpo", avgDiscount: "22%", frequency: "Weekly", deepestDiscount: "35%", fullPriceRatio: "38%" },
    { brand: "Pepper Mayo", avgDiscount: "20%", frequency: "Weekly", deepestDiscount: "30%", fullPriceRatio: "42%" },
    { brand: "Princess Polly", avgDiscount: "18%", frequency: "Bi-weekly", deepestDiscount: "30%", fullPriceRatio: "48%" },
    { brand: "Zara", avgDiscount: "15%", frequency: "Seasonal", deepestDiscount: "50%", fullPriceRatio: "56%" },
    { brand: "Meshki", avgDiscount: "12%", frequency: "Monthly", deepestDiscount: "25%", fullPriceRatio: "62%" },
    { brand: "& Other Stories", avgDiscount: "12%", frequency: "Seasonal", deepestDiscount: "30%", fullPriceRatio: "58%" },
    { brand: "Reformation", avgDiscount: "7%", frequency: "Rare", deepestDiscount: "20%", fullPriceRatio: "78%" },
    { brand: "Sézane", avgDiscount: "0%", frequency: "Never", deepestDiscount: "0%", fullPriceRatio: "100%" },
  ];

  // Bestseller Tracking
  const bestsellersByCompetitor = [
    { brand: "Sézane", product: "Max Linen Shirt", category: "Tops", price: "$83", units: "6,479", velocity: "Very High", daysInStock: 42 },
    { brand: "Reformation", product: "Floral Midi Dress", category: "Dresses", price: "$178", units: "5,234", velocity: "High", daysInStock: 28 },
    { brand: "Princess Polly", product: "Satin Slip Dress", category: "Dresses", price: "$72", units: "4,892", velocity: "Very High", daysInStock: 18 },
    { brand: "Meshki", product: "Bodycon Mini", category: "Dresses", price: "$95", units: "4,156", velocity: "High", daysInStock: 24 },
    { brand: "Zara", product: "Linen Blend Dress", category: "Dresses", price: "$65", units: "8,234", velocity: "Very High", daysInStock: 36 },
  ];

  // Stock Alert Data
  const stockAlerts = [
    { brand: "Sézane", product: "Linen Midi Dress", status: "Low Stock", level: 12, velocity: "High", daysToStockout: 3 },
    { brand: "Reformation", product: "Summer Maxi", status: "Low Stock", level: 18, velocity: "High", daysToStockout: 5 },
    { brand: "Princess Polly", product: "Mini Dress", status: "Critical", level: 6, velocity: "Very High", daysToStockout: 1 },
    { brand: "Meshki", product: "Bodycon Dress", status: "Low Stock", level: 24, velocity: "Medium", daysToStockout: 8 },
  ];

  // Action Strip Data
  const actionStripData: ActionStripData = {
    silverBullet: {
      action: "Launch linen dress category targeting Sézane's $95-$125 gap",
      impactLine: "Estimated: +$38,400 at 58% margin · 340% YoY category growth",
      channel: "Product Development · Summer Collection"
    },
    lowHangingFruit: {
      action: "Test earth-tone colorway based on Reformation's trending palette",
      effortChip: "Easy · 1 week",
      impact: "+$6,800 revenue · Leverage existing production",
      channelChip: "Spring Collection · Color Variant"
    },
    frameworkTasks: [
      { task: "Linen category competitive analysis", status: "In Progress" },
      { task: "Pricing strategy review vs Sézane", status: "Planned" },
      { task: "Marketing campaign benchmarking", status: "On Track" }
    ]
  };

  // Silver Bullet Modal Brief
  const silverBulletBrief: DetailedBriefData = {
    title: "Launch Linen Dress Category Targeting Premium Gap",
    category: "Silver Bullet · Product Development",
    overview: "Particl competitive analysis reveals a critical white space: Sézane operates 18 SKUs in the $95-$125 linen category with zero discounting and sells 6,479+ units monthly. FC has zero linen offerings in this price range. Linen is trending +340% YoY driven by sustainability positioning and seasonless wearability. This represents FC's highest-impact opportunity this quarter - a proven category, proven price point, proven demand, with clear competitive playbook to follow.",
    goals: [
      "Launch 8 linen dress SKUs in $95-$125 range within 6 weeks, targeting summer season",
      "Achieve 58% margin through premium positioning and zero-discount strategy (following Sézane model)",
      "Generate +$38,400 monthly revenue at conservative 15% market share of Sézane's velocity",
      "Establish linen as signature fabric category for FC brand positioning"
    ],
    detailedBrief: {
      challenge: "FC's current dress collection sits in $69-89 range with synthetic/poly blends. Linen category entirely missing despite being fastest-growing sustainable fabric segment. Competitors (Sézane, Reformation, & Other Stories) all have significant linen presence commanding premium pricing. Customer demand exists but FC isn't competing in this space. Summer 2026 is critical window as linen peaks in search interest May-August.",
      approach: "Week 1-2: Source European linen supplier (prioritize French or Italian). Order fabric samples in earth tones (cream, sand, olive, terracotta) matching Reformation's trending palette. Week 2-3: Design 8 silhouettes (midi dresses, maxi dresses, shirt dresses) emphasizing relaxed fits and natural draping. Reference Sézane's bestsellers for silhouette validation. Week 3-4: Production of initial batch (500 units across 8 styles). Week 4-5: Product photography emphasizing fabric texture, natural light, lifestyle context vs studio. Week 5-6: Email launch to high-LTV segment, Instagram/TikTok content showing fabric quality and sustainability story, zero promotional discount messaging.",
      timeline: "6 weeks to launch",
      budget: "$24,000 (Fabric/Production $18K, Photography $3K, Marketing $3K)"
    },
    nextSteps: [
      {
        step: "European Linen Supplier Sourcing",
        description: "Contact 5 linen suppliers specializing in apparel-weight linen (140-180 GSM). Request swatches in earth tone palette. Negotiate pricing for 2,000 yard minimum. Verify sustainability certifications (OEKO-TEX, European Flax).",
        owner: "Product Development Lead"
      },
      {
        step: "Competitive Product Benchmarking",
        description: "Purchase 3 Sézane linen dresses ($95-$125 range) for deconstruction analysis. Document construction details: seam finishing, closures, lining decisions, silhouette proportions. Build tech packs matching quality level.",
        owner: "Design Team"
      },
      {
        step: "Pre-Launch Waitlist Campaign",
        description: "Create email teaser campaign to high-LTV customers (top 20%) showcasing linen fabric story, sustainability angle, European craftsmanship. Build waitlist for early access, target 500 sign-ups before launch.",
        owner: "Email Marketing"
      },
      {
        step: "Content Creation: Fabric Story",
        description: "Produce content showing linen's benefits: breathability, durability, sustainable production, gets softer with wear. Behind-scenes of sourcing. Customer education on caring for linen (wrinkles are intentional). Build premium perception.",
        owner: "Brand Content"
      }
    ],
    potentialOutcomes: {
      bestCase: "+$52,000 monthly revenue if achieving 20% of Sézane's velocity, linen becomes signature category driving brand repositioning",
      expected: "+$38,400 monthly revenue at 58% margins, successful premium category entry, zero discounting maintained",
      metrics: [
        "Units sold vs Sézane benchmark",
        "Average selling price (target: $110)",
        "Margin % (target: 58%)",
        "Discount rate (target: 0%)",
        "Customer acquisition cost for linen category",
        "Repeat purchase rate"
      ]
    }
  };

  // Low-Hanging Fruit Modal Brief
  const lowHangingFruitBrief: DetailedBriefData = {
    title: "Test Earth-Tone Colorway on Existing Bestsellers",
    category: "Low-Hanging Fruit · Quick Win",
    overview: "Panoramata tracking shows Reformation's earth-tone palette (cream, sand, olive, terracotta, rust) driving 2.8x higher engagement on Instagram vs bright colors. Zara and Sézane following same trend. FC's current collection skews toward brights and florals. This is a 1-week execution requiring zero new design work - simply recolor 4 existing bestselling silhouettes in earth-tone palette and test market response. Low risk, minimal investment, fast revenue validation.",
    goals: [
      "Launch earth-tone variants of 4 bestselling dress styles within 1 week",
      "Generate +$6,800 revenue in first month from new colorways",
      "Test color preference shift with zero design/pattern risk by using proven silhouettes",
      "Leverage existing production relationships and fabric suppliers for fast turnaround"
    ],
    detailedBrief: {
      challenge: "FC color palette is bright florals and saturated tones while market is shifting to earthy neutrals. Rather than full collection redesign (high risk, high cost, long timeline), we can test color trends on existing bestsellers. This validates demand before committing to full collection shift. Current bestsellers already have proven fit, production workflow, customer demand - we're only changing color, dramatically reducing execution risk.",
      approach: "Day 1-2: Select 4 bestselling dress silhouettes from last 90 days (highest units sold, highest repeat purchase). Contact existing fabric supplier for same fabric in earth-tone palette (cream, sand, olive, terracotta). Order minimum 250 units across 4 styles. Day 3-4: Rush production using existing patterns and construction specs - only color changes. Day 5-6: Product photography (can use same model/location as originals, just swap garments). Day 7: Soft launch via email to engaged segment (last 30-day openers) with A/B test subject line emphasizing 'New Colors' vs 'Earth Tones'. Monitor sell-through vs original colors.",
      timeline: "7 days to launch, 30 days to evaluate",
      budget: "$3,200 (Fabric/Production $2,400, Photography $500, Email creative $300)"
    },
    nextSteps: [
      {
        step: "Bestseller SKU Identification",
        description: "Pull sales data for last 90 days. Rank dresses by units sold and gross margin. Select top 4 that use fabric base compatible with earth-tone dyeing. Verify production timeline with manufacturer for rush order.",
        owner: "Merchandising"
      },
      {
        step: "Fabric Sourcing & Rush Order",
        description: "Contact current fabric supplier. Order same base fabric in 4 earth tones. Negotiate 1-week production timeline. Place order for 250 units (approximately 60 units per style in S/M/L split).",
        owner: "Production Manager"
      },
      {
        step: "Product Photography Shoot",
        description: "Book existing model and photographer for half-day shoot. Use same styling approach as original colorways for direct comparison. Capture detail shots showing fabric texture and true color. 2-day turnaround for edited images.",
        owner: "Creative Team"
      },
      {
        step: "Email A/B Test Launch",
        description: "Create email to engaged segment (last 30-day openers, ~2,500 people). A/B test subject lines: 'New: Earth Tone Collection' vs 'Trending: Neutral Palette'. Track open rates, click rates, conversion rates vs typical new product launch.",
        owner: "Email Marketing"
      }
    ],
    potentialOutcomes: {
      bestCase: "Earth tones outsell original colors 2:1, validating full collection shift. +$12,000 first month revenue, expanded production order.",
      expected: "+$6,800 revenue in first month, validation that earth-tone palette resonates, low-risk proof of concept for broader collection",
      metrics: [
        "Units sold: earth tones vs original colors",
        "Conversion rate: earth-tone emails vs standard",
        "Instagram engagement: earth-tone posts vs bright colors",
        "Average order value",
        "Customer feedback/comments on color",
        "Repeat purchase rate for earth-tone buyers"
      ]
    }
  };



  // Modal Brief Data
  const productIntelligenceBrief: DetailedBriefData = {
    title: "Expand into $100-150 Premium Price Band",
    category: "Product Intelligence · Silver Bullet",
    overview: "Particl analysis reveals FC operates only 8 SKUs in the $100-150 range vs Sézane's 18 SKUs and Reformation's 12 SKUs. This price band represents highest margin opportunity (52-58%) with growing demand (+42% YoY). Sézane's zero-discount strategy at these price points proves brand equity exists for premium positioning. Linen category specifically underrepresented - Sézane's linen collection drives 6,479 units/month with zero discounting. FC's current $69-89 positioning leaves $38,400 monthly revenue opportunity in this segment.",
    goals: [
      "Launch 12 new SKUs in $100-150 price range within 8 weeks, focusing on linen and premium fabrics",
      "Achieve 58% margin (vs current 42%) and zero-discount positioning following Sézane playbook",
      "Generate +$38,400 monthly revenue from premium segment with 340% category growth trajectory",
      "Build brand equity through quality and scarcity rather than promotional discounting"
    ],
    detailedBrief: {
      challenge: "FC is trapped in mid-market $69-89 positioning while competitor data shows premium segment ($100-150) offers higher margins, lower discount dependency, and stronger customer LTV. Current collection lacks premium fabric options (linen, silk blends) that justify price elevation. Particl tracking shows competitors successfully maintain premium pricing with zero discounts - suggesting customer willingness to pay exists if product quality and positioning align.",
      approach: "Phase 1: Source premium linen and natural fiber suppliers (Week 1-2). Phase 2: Design 12 SKUs across dresses (6), tops (4), outerwear (2) with elevated design details - French seams, natural buttons, considered silhouettes (Week 2-4). Phase 3: Photography emphasizing fabric quality, texture, craftsmanship vs standard product shots (Week 4-5). Phase 4: Launch with storytelling around materials, sustainability, timelessness - no discount messaging (Week 6-8). Pricing strategy: $105-145 range, position as investment pieces, emphasize cost-per-wear value proposition.",
      timeline: "8 weeks to market",
      budget: "$18,500 (Materials $12K, Photography $3.5K, Marketing $3K)"
    },
    nextSteps: [
      {
        step: "Linen Supplier Sourcing",
        description: "Identify 3 premium linen suppliers. Request fabric samples in earth tones (cream, sand, olive, terracotta). Negotiate MOQs for 500 units across 12 designs.",
        owner: "Product Development"
      },
      {
        step: "Competitive Product Benchmarking",
        description: "Purchase 4 Sézane pieces in $100-150 range for quality analysis. Document construction details, fabric weight, finishing techniques. Build specification documents for manufacturer.",
        owner: "Design Team"
      },
      {
        step: "Premium Photography Strategy",
        description: "Brief photographer on lifestyle vs product-only approach. Emphasize natural light, texture close-ups, styling that suggests elevated lifestyle. Review Sézane/Reformation visual language.",
        owner: "Marketing"
      },
      {
        step: "Zero-Discount Launch Strategy",
        description: "Create launch messaging focused on quality, timelessness, investment dressing. No promotional language. Email segmentation targeting high-LTV customers first. Build scarcity through limited quantities messaging.",
        owner: "Brand & Comms"
      }
    ],
    potentialOutcomes: {
      bestCase: "+$52,000 monthly revenue, 62% margins, premium brand repositioning unlocks higher pricing across full collection",
      expected: "+$38,400 monthly revenue, 58% margins, successful establishment in premium segment with zero discounting",
      metrics: [
        "Average order value in $100-150 segment",
        "Discount rate (target: 0%)",
        "Units sold vs Sézane benchmark",
        "Customer LTV lift for premium purchasers",
        "Margin per SKU vs existing collection",
        "Repeat purchase rate"
      ]
    }
  };

  const marketIntelligenceBrief: DetailedBriefData = {
    title: "Brand Awareness Campaign to Close Gap vs Competitors",
    category: "Market Intelligence · Strategic Investment",
    overview: "FC brand awareness at 42% vs Reformation 68%, Sézane 71% among target demographic represents single largest growth constraint. Despite comparable product quality and competitive pricing, low awareness limits top-of-funnel acquisition. Market share of 18.4% suggests strong conversion once customers discover brand - the challenge is discovery. Competitors investing heavily in brand building: Reformation +28% ad spend, Sézane +34% QoQ. FC's current marketing spend focused on performance/conversion vs awareness building.",
    goals: [
      "Increase brand awareness from 42% to 58% within 6 months among 25-45 female fashion consumers",
      "Close awareness gap vs Reformation (68%) and Sézane (71%) to unlock organic search and direct traffic growth",
      "Shift marketing budget allocation: 60% awareness (currently 20%) / 40% conversion (currently 80%)",
      "Build brand recall through consistent visual identity, storytelling, and emotional connection"
    ],
    detailedBrief: {
      challenge: "FC operates with performance-marketing mindset: 80% budget to Google/Meta conversion campaigns, 20% to awareness. This creates customer acquisition ceiling - can only reach people actively searching for products FC sells. Competitors invest in brand storytelling, influencer partnerships, PR, content that builds awareness before purchase intent exists. Low awareness also means low direct/organic traffic - FC relies on paid channels for 78% of traffic vs competitor average 52%.",
      approach: "Reallocate marketing budget to 60/40 awareness/conversion split. Awareness tactics: (1) Influencer partnerships with 20 micro-influencers (50K-200K followers) in fashion/lifestyle - seeding product, authentic content, brand storytelling. (2) PR campaign targeting fashion publications, sustainability media - earned media coverage. (3) Brand video content for YouTube, Instagram, TikTok - not product-focused but values, story, lifestyle alignment. (4) Podcast sponsorships in target demographic. (5) Out-of-home in Melbourne/Sydney in fashion districts. Measurement via quarterly brand tracking studies.",
      timeline: "6 months campaign / Quarterly measurement",
      budget: "$120K over 6 months ($20K/month)"
    },
    nextSteps: [
      {
        step: "Marketing Budget Reallocation",
        description: "Audit current spend. Identify underperforming conversion campaigns to reallocate. Build business case for awareness investment showing LTV impact of brand recognition.",
        owner: "Marketing Director"
      },
      {
        step: "Influencer Partnership Strategy",
        description: "Identify 50 micro-influencers aligned with brand values. Develop partnership model (gifting vs paid). Create ambassador program for ongoing relationships vs one-off posts.",
        owner: "Social Media Manager"
      },
      {
        step: "Brand Storytelling Content Development",
        description: "Develop brand narrative around sustainability, Australian design, female empowerment. Create video series profiling customers, artisans, design process. Shift from product features to brand values.",
        owner: "Content Team"
      },
      {
        step: "Quarterly Brand Tracking Setup",
        description: "Establish baseline awareness metrics. Set up quarterly surveys with target demographic tracking unaided/aided awareness, brand perception, consideration set inclusion.",
        owner: "Marketing Analytics"
      }
    ],
    potentialOutcomes: {
      bestCase: "65% brand awareness achieved, 40% reduction in CAC as organic/direct traffic grows, market share increases to 24%",
      expected: "58% brand awareness (closing gap vs Reformation), 25% reduction in paid customer acquisition dependency, market share to 21%",
      metrics: [
        "Unaided brand awareness %",
        "Aided brand awareness %",
        "Direct traffic growth %",
        "Organic search traffic growth %",
        "Customer acquisition cost (CAC)",
        "Share of voice vs competitors"
      ]
    }
  };

  const emailIntelligenceBrief: DetailedBriefData = {
    title: "Implement VIP Tier Program & Flow Optimization",
    category: "Email Intelligence · High Impact",
    overview: "Klaviyo competitive analysis reveals FC running only 7 email segments vs Zimmermann (16), Blue Illusion (12) - most critically, lacking VIP tier program that drives 52-64% open rates for competitors. FC abandoned cart flow underperforming industry by 31% (8.4% vs 12.2% conv), welcome series by 33%. Email frequency at 3.8/week vs premium competitor average 2.1/week suggests over-mailing without segmentation sophistication. Blue Illusion case study: similar demographic, 5.8% IG engagement through VIP program and lifecycle targeting.",
    goals: [
      "Launch 3-tier VIP program (Bronze/Silver/Gold) based on LTV, driving 28% lift in VIP segment conversion",
      "Rebuild abandoned cart flow from single email to 3-email + SMS sequence, closing 31% performance gap",
      "Expand from 7 to 15 email segments including behavioral, category affinity, lifecycle stage, engagement scoring",
      "Reduce overall send frequency 30% (3.8 to 2.7/week) while increasing revenue per email through targeting precision"
    ],
    detailedBrief: {
      challenge: "FC treats email list as single audience - same messages to everyone regardless of purchase history, engagement level, or product preferences. High-value customers (top 20% generating 65% of revenue) receive same experience as one-time purchasers. No exclusive access, early product releases, or recognition for loyalty. Flows are basic: welcome series underperforms because it's generic vs lifecycle-stage specific. Abandoned cart is single reminder vs strategic sequence addressing objections. Over-mailing (3.8/week) without segmentation creates fatigue and list degradation.",
      approach: "Phase 1: VIP Program Structure - Segment customers into Bronze (1-2 purchases, $200+ LTV), Silver (3-5 purchases, $500+ LTV), Gold (6+ purchases, $1000+ LTV). Build exclusive benefits: early access to new collections (48hrs pre-launch), VIP-only products, birthday gifts, priority customer service. Phase 2: Flow Rebuilds - Welcome series: 5 emails tailored to acquisition source, first purchase category, engagement level. Abandoned cart: Email 1 (1hr - gentle reminder), Email 2 (24hrs - address objections, social proof), Email 3 (48hrs - limited-time incentive), SMS (72hrs - final reminder). Phase 3: Behavioral Segmentation - Track category affinity (dresses vs tops vs outerwear), browsing behavior, price point preferences, seasonal patterns. Phase 4: Engagement Scoring - 4-tier system (Highly Engaged, Engaged, At Risk, Dormant) with re-activation sequences.",
      timeline: "12 weeks implementation",
      budget: "$8,500 (Klaviyo advanced features, design, copywriting)"
    },
    nextSteps: [
      {
        step: "VIP Tier Segmentation & Benefits Design",
        description: "Analyze customer database to set tier thresholds. Design benefits package for each tier. Create VIP welcome email sequence and ongoing communication cadence. Build exclusivity messaging.",
        owner: "Email Marketing"
      },
      {
        step: "Flow Architecture Rebuilds",
        description: "Map new abandoned cart sequence with objection addressing. Write welcome series variations for different acquisition sources. Build browse abandonment and post-purchase flows. Set up SMS integration for high-intent moments.",
        owner: "Lifecycle Marketing"
      },
      {
        step: "Behavioral Tracking Implementation",
        description: "Set up Klaviyo custom properties for category affinity, price point preferences, seasonal purchase patterns. Create dynamic segments that auto-update based on behavior. Test product recommendations engine.",
        owner: "Marketing Tech"
      },
      {
        step: "Send Frequency Optimization",
        description: "Reduce broadcast frequency to 2-3x/week. Shift to preference center allowing customers to choose content types. Implement send-time optimization based on individual engagement patterns.",
        owner: "Email Strategy"
      }
    ],
    potentialOutcomes: {
      bestCase: "VIP program drives +$64,000 monthly revenue, flows close to industry benchmark (+$28K), email revenue per send increases 45%",
      expected: "+$42,000 monthly email channel revenue, abandoned cart conversion to 11%, welcome series to 4.2%, VIP open rates 55-60%",
      metrics: [
        "VIP tier open rates & conversion rates",
        "Abandoned cart flow conversion %",
        "Welcome series conversion %",
        "Revenue per email sent",
        "List engagement score",
        "Unsubscribe rate"
      ]
    }
  };

  const metaIntelligenceBrief: DetailedBriefData = {
    title: "Scale Meta Ad Spend with UGC-Led Creative Strategy",
    category: "Meta Intelligence · Growth Opportunity",
    overview: "Panoramata tracking shows FC dramatically underspending Meta: $6K/mo vs industry avg $88K/mo (-93%). Running only 6 active ads vs competitors' 64-84 ads limits A/B testing and audience segmentation. Campaign duration of 45 days vs industry 25 days signals slow iteration. Critical insight: UGC/customer photo creative achieves 2.8% CTR vs FC's product-only approach (est. 1.2% CTR). Competitors running 8-32 custom audiences vs FC's 4, with no lookalike strategy while all competitors use 1-5% lookalikes. Video adoption 33% vs leaders at 67-75%.",
    goals: [
      "Increase Meta ad spend to $24K/month (4x current) with proven ROI at 3.5x+ ROAS before further scaling",
      "Implement UGC-first creative strategy: 40% customer photos, 30% lifestyle, 30% product - driving 2.2%+ CTR",
      "Build 12+ custom audiences (category affinity, cart abandoners, engaged shoppers, high LTV) and 3% lookalikes",
      "Shift to 60% video content, reduce campaign duration to 21 days for faster iteration and creative testing"
    ],
    detailedBrief: {
      challenge: "FC's Meta strategy is minimal, reactive, and creatively stale. $6K/month budget insufficient for meaningful audience testing or creative iteration - running same ads for 45 days because no budget for new creative production. Product-only creative underperforms competitors' UGC and lifestyle approaches. Missing entirely: lookalike audiences (competitors' highest ROAS source), advanced retargeting with dynamic product ads, video creative (where Instagram algorithm prioritizes Reels). Platform split 60% Facebook vs competitors' 55-65% Instagram focus - misaligned with where younger demographic engages.",
      approach: "Phase 1: Creative Production - Launch customer photo contest incentivized with store credit. Collect 100+ UGC images showing real customers styling FC pieces. Brief photographer for 20 lifestyle shots (models in real locations vs studio). Create 15 video clips (15-22 seconds) showing styling transformations, product details, customer testimonials. Phase 2: Audience Architecture - Build 12 custom audiences: cart abandoners (7/14/30 day windows), category browsers (dresses/tops/outerwear), engaged social (Instagram engagers), email openers, high LTV customers, seasonal shoppers. Create 3% lookalikes for each. Phase 3: Campaign Structure - Separate campaigns by funnel stage (awareness/consideration/conversion). Test 5-8 creative variations per campaign. Implement automated rules to pause underperformers, scale winners. Phase 4: Budget Scaling - Start $12K month 1 (2x), scale to $18K month 2, reach $24K month 3 as ROAS proves out. Reinvest profit into continued scaling.",
      timeline: "16 weeks to full scale",
      budget: "$120K total (Creative production $15K + Media spend $105K over 16 weeks)"
    },
    nextSteps: [
      {
        step: "UGC Collection Campaign",
        description: "Launch hashtag campaign #MyFemmeStyle offering $100 store credit for best customer photos each week. Email existing customers requesting styled photos. Build UGC library of 100+ images.",
        owner: "Social Media"
      },
      {
        step: "Video Creative Production",
        description: "Brief videographer on 15-22 second format optimized for Instagram/TikTok/Facebook Reels. Focus on styling tips, get-ready-with-me, product detail close-ups. Produce 15 clips in batch shoot.",
        owner: "Creative Production"
      },
      {
        step: "Custom Audience & Lookalike Build",
        description: "Set up 12 custom audiences in Meta Ads Manager. Create 3% lookalikes for each. Implement Meta Pixel event tracking for category views, cart adds, purchase value for dynamic optimization.",
        owner: "Paid Media Manager"
      },
      {
        step: "Campaign Architecture & Testing Framework",
        description: "Structure campaigns by objective (awareness/traffic/conversions). Set up A/B testing for creative variations. Build automated rules for budget allocation to winners. Implement weekly reporting dashboard.",
        owner: "Performance Marketing"
      }
    ],
    potentialOutcomes: {
      bestCase: "3.8x ROAS at $24K spend = $91K monthly revenue, scalable to $50K+ spend as creative library expands",
      expected: "3.5x ROAS at $24K spend = $84K monthly revenue (+$78K vs current), 2.2% average CTR, 2.8% conversion rate",
      metrics: [
        "ROAS by campaign type",
        "CTR by creative type (UGC vs lifestyle vs product)",
        "CPC and CPM trends",
        "Conversion rate by audience",
        "Creative fatigue indicators",
        "Customer acquisition cost (CAC)"
      ]
    }
  };

  const socialIntelligenceBrief: DetailedBriefData = {
    title: "TikTok-First Social Strategy with Micro-Influencer Partnerships",
    category: "Social Intelligence · Urgent Priority",
    overview: "Social audit reveals FC's most critical gap: TikTok 2K followers vs H&M 2.4M (-99.9%), posting 3 videos/mo vs competitor avg 20+ videos/mo, zero trend participation while competitors achieve 18.4% engagement through trending sounds. Instagram Reels at 24% of content vs competitor 45-58% - algorithm favors video. Pinterest severely underutilized: 12 pins/mo vs Zara 120/mo, missing 8.4M monthly viewers. Influencer strategy nearly absent: 4 micro-influencers vs competitors' 18-124. Total social reach 380K vs competitor avg 8.6M.",
    goals: [
      "Build TikTok to 50K followers within 6 months through 20 videos/month and trend participation strategy",
      "Increase Instagram Reels to 50% of content (from 24%), reduce video duration to 18-22s for 65%+ completion rate",
      "Scale Pinterest to 60 pins/month across 20 themed boards, targeting 400K monthly viewers and 18% traffic contribution",
      "Partner with 20 micro-influencers (10K-100K followers) for ongoing content creation and brand amplification"
    ],
    detailedBrief: {
      challenge: "FC social strategy is minimal, inconsistent, and failing to leverage highest-ROI platforms. TikTok represents largest missed opportunity - platform with 12.8% avg engagement where competitors thrive through authentic, trend-forward content. FC's 42-second videos vs optimal 18-24 seconds suggests misunderstanding of platform behavior (38% completion rate vs competitor 64-72%). Instagram stuck in feed-post mindset while algorithm prioritizes Reels. Pinterest completely underutilized despite being in shopping-mode traffic source. No influencer strategy means no third-party credibility or reach multiplication.",
      approach: "TikTok: Hire TikTok-native content creator (part-time) who understands platform culture. Post 20 videos/mo: 40% trend participation (trending sounds within 24-48hrs), 30% GRWM/styling content, 30% behind-scenes/relatable moments. Length: 18-22 seconds. Hook in first 3 seconds. Instagram: Shift content calendar to 50% Reels, 30% Stories, 20% Feed. Reduce Reels to 18-22s. Increase hashtag use to 20 per post (60% niche + 40% broad). Post at 6pm optimal time. Pinterest: Create 20 boards by theme (Spring Dresses, Office Looks, Weekend Style, Color Edit, Sustainable Fashion, etc.). 60 pins/mo with keyword-rich descriptions. Implement Product Pins with shop links. Influencers: Partner with 20 micro-influencers (gifting model). Focus on authentic styling vs scripted ads. Provide creative freedom. Build long-term relationships vs one-offs.",
      timeline: "6 months to establish presence",
      budget: "$42,000 (TikTok creator $18K, influencer gifting $12K, content production $12K)"
    },
    nextSteps: [
      {
        step: "TikTok Content Creator Hiring",
        description: "Recruit part-time TikTok specialist who understands platform trends, sounds, editing styles. Not traditional videographer - need someone native to platform who can move fast and authentic vs polished.",
        owner: "Social Media Director"
      },
      {
        step: "Micro-Influencer Partnership Program",
        description: "Identify 50 potential influencers (10K-100K, authentic style, engaged audience, brand alignment). Reach out with gifting proposal. Establish ongoing relationship with top 20. Provide creative briefs but allow freedom.",
        owner: "Influencer Marketing"
      },
      {
        step: "Pinterest Board Strategy & SEO Optimization",
        description: "Create 20 themed boards with keyword-rich titles and descriptions. Design board covers. Set up Product Pins with pricing and shop links. Implement pinning schedule for consistency (2 pins/day).",
        owner: "Social Media Manager"
      },
      {
        step: "Instagram Reels Production Workflow",
        description: "Shift content calendar to Reels-first mindset. Batch shoot 12-15 Reels per session. Edit to 18-22 seconds with strong hooks. Implement trending audio strategy. Test posting times and hashtag combinations.",
        owner: "Content Creator"
      }
    ],
    potentialOutcomes: {
      bestCase: "TikTok reaches 80K followers driving 12% of site traffic, Instagram engagement rate doubles to 6.4%, Pinterest becomes 2nd highest traffic source",
      expected: "TikTok 50K followers, Instagram Reels average 8.2% engagement, Pinterest 400K monthly viewers, 15% reduction in paid acquisition dependency",
      metrics: [
        "TikTok followers & engagement rate",
        "Instagram Reels views & completion rate",
        "Pinterest monthly viewers & click-through rate",
        "Influencer-driven traffic & conversions",
        "Branded hashtag usage #FemmeStyle",
        "Social-attributed revenue"
      ]
    }
  };

  const femmeProducts = [
    { id: 1, name: "Daisy Floral Maxi Dress", price: "$79.99", image: femme1, category: "Dresses", sku: "FC-DRS-001" },
    { id: 2, name: "Morocco Floral Maxi Dress", price: "$89.99", image: femme2, category: "Dresses", sku: "FC-DRS-002" },
    { id: 3, name: "Evelina Sequin Maxi Dress", price: "$129.99", image: femme3, category: "Dresses", sku: "FC-DRS-003" },
    { id: 4, name: "Ronika Floral Print Dress", price: "$69.99", image: femme4, category: "Dresses", sku: "FC-DRS-004" },
  ];

  const competitorProducts = {
    reformation: [
      { id: 1, name: "Reformation Floral Midi", price: "$178.00", image: reformation1, discount: "7%", stock: "Low", velocity: "High" },
      { id: 2, name: "Reformation Silk Dress", price: "$208.00", image: reformation2, discount: "0%", stock: "In Stock", velocity: "Medium" },
      { id: 3, name: "Reformation Summer Maxi", price: "$198.00", image: reformation4, discount: "12%", stock: "High", velocity: "High" },
    ],
    sezane: [
      { id: 1, name: "Sézane Max Shirt", price: "$83.00", image: sezane1, discount: "0%", stock: "In Stock", velocity: "Very High", units: "6,479" },
      { id: 2, name: "Sézane Linen Midi Dress", price: "$176.00", image: sezane2, discount: "0%", stock: "Low", velocity: "High", units: "4,230" },
      { id: 3, name: "Sézane Floral Top", price: "$92.00", image: sezane3, discount: "0%", stock: "In Stock", velocity: "Medium", units: "3,105" },
      { id: 4, name: "Sézane Classic Cardigan", price: "$145.00", image: sezane4, discount: "0%", stock: "High", velocity: "High", units: "5,892" },
      { id: 5, name: "Sézane Wrap Dress", price: "$168.00", image: sezane5, discount: "0%", stock: "In Stock", velocity: "Medium", units: "2,847" },
    ],
  };

  const priceGapAnalysis = [
    { range: "$50-75", femme: 8, reformation: 2, sezane: 3, opportunity: "Low" },
    { range: "$75-100", femme: 15, reformation: 4, sezane: 12, opportunity: "Medium" },
    { range: "$100-125", femme: 6, reformation: 8, sezane: 18, opportunity: "High" },
    { range: "$125-150", femme: 3, reformation: 12, sezane: 15, opportunity: "High" },
    { range: "$150-200", femme: 2, reformation: 24, sezane: 22, opportunity: "Medium" },
  ];

  const marketShareData = [
    { name: "Femme Connection", value: 18.4, color: "var(--pink)" },
    { name: "Reformation", value: 24.6, color: "var(--green)" },
    { name: "Sézane", value: 22.8, color: "var(--terra)" },
    { name: "Others", value: 34.2, color: "var(--buff)" },
  ];

  const socialPerformance = [
    { platform: "Instagram", femme: 84200, reformation: 125000, sezane: 342000, engagement: { femme: 6.4, ref: 4.2, sez: 8.1 } },
    { platform: "TikTok", femme: 42100, reformation: 89000, sezane: 156000, engagement: { femme: 12.3, ref: 8.7, sez: 15.2 } },
    { platform: "Pinterest", femme: 28400, reformation: 64000, sezane: 98000, engagement: { femme: 3.2, ref: 2.8, sez: 4.5 } },
    { platform: "Facebook", femme: 52300, reformation: 78000, sezane: 124000, engagement: { femme: 2.1, ref: 1.8, sez: 2.9 } },
  ];

  return (
    <div>
      <PageHeader
        label="Intelligence · Competitors"
        title="Competitor Intelligence"
        description="Comprehensive competitive analysis across product, market positioning, email strategy, Meta advertising, and social media. Tracking 20 competitors (15 AU + 5 International) for strategic insights and opportunity identification."
        backgroundGradient="multi"
        image={sezane1}
        stats={[
          { label: "Tracked Brands", value: "20" },
          { label: "Intelligence Streams", value: "5" },
          { label: "Total SKUs Monitored", value: "39.5K" },
          { label: "New Launches (30d)", value: "777" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        {/* AI Widget */}
        <AIWidget
          insightLabel="Competitor Intelligence · 20 Brands"
          insightText="Tracking 39,472 SKUs across 20 competitors. 777 new launches last 30 days. AU fast fashion (Princess Polly, Showpo, White Fox) launching 84-156 SKUs/month at $50-90 price points with 18-25% discounting. International premium (Sézane, Reformation) maintaining $150-200 positioning with minimal discounts (0-7%). Critical gaps: Activewear (-68%, +52% growth), Outerwear (-34%, +42% growth), $100-150 price band (only 8 FC SKUs vs 4,775 competitor). Recommendation: enter Activewear category, expand Outerwear 3x, test $100-150 premium positioning."
        />

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab("product")}
            className={`px-6 py-3 text-[13px] font-medium transition-all border-b-2 ${
              activeTab === "product"
                ? "border-[var(--pink)] text-[var(--text-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              PRODUCT INTELLIGENCE
            </div>
          </button>
          <button
            onClick={() => setActiveTab("market")}
            className={`px-6 py-3 text-[13px] font-medium transition-all border-b-2 ${
              activeTab === "market"
                ? "border-[var(--green)] text-[var(--text-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              MARKET INTELLIGENCE
            </div>
          </button>
          <button
            onClick={() => setActiveTab("email")}
            className={`px-6 py-3 text-[13px] font-medium transition-all border-b-2 ${
              activeTab === "email"
                ? "border-[var(--terra)] text-[var(--text-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              EMAIL INTELLIGENCE
            </div>
          </button>
          <button
            onClick={() => setActiveTab("meta")}
            className={`px-6 py-3 text-[13px] font-medium transition-all border-b-2 ${
              activeTab === "meta"
                ? "border-[var(--buff-dark)] text-[var(--text-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              META INTELLIGENCE
            </div>
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`px-6 py-3 text-[13px] font-medium transition-all border-b-2 ${
              activeTab === "social"
                ? "border-[var(--buff-dark)] text-[var(--text-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              SOCIAL INTELLIGENCE
            </div>
          </button>
        </div>

        <FilterBar />

        {/* PRODUCT INTELLIGENCE TAB */}
        {activeTab === "product" && (
          <ProductIntelligenceTab setShowProductModal={setShowProductModal} />
        )}

        {activeTab === "product_OLD" && (
          <>
            <StatGrid columns={4}>
              <MetricCard
                label="Price Gap Opportunity"
                value="$95-125"
                change="High Potential"
                changeType="positive"
              />
              <MetricCard
                label="Avg Competitor Discount"
                value="3.5%"
                change="Below Industry"
                changeType="positive"
                trend="down"
              />
              <MetricCard
                label="SKU Velocity Tracked"
                value="42"
                change="Live monitoring"
                changeType="neutral"
              />
              <MetricCard
                label="Category Gaps"
                value="3"
                change="Linen, Accessories, Denim"
                changeType="neutral"
              />
            </StatGrid>

            <div className="grid grid-cols-2 gap-6">
              <AIInsightCard
                title="Product Intelligence Summary"
                content="Reformation ($34M, 7% avg discount) and Sézane ($32.5M, 0% discount) dominate $150-200 price range. Sézane's zero-discount strategy proves strong brand equity and pricing power. Your floral collection (Daisy, Morocco, Ronika) competes effectively at $69-89 range but misses $95-125 sweet spot where Sézane sells 18 SKUs. Strategic gap: linen category (Sézane Max Shirt: 6,479 units, 0% discount)."
                showButton={true}
                onButtonClick={() => setShowProductModal(true)}
              />
              <AIInsightCard
                title="Pricing Strategy Insights"
                content="Sézane maintains 0% discount across entire catalog signaling premium positioning success. Reformation selective discounting (7% avg) on slower SKUs while protecting hero products. Both brands price 22-38% higher than Femme Connection on comparable items. Opportunity: selective price increases on hero florals could yield +$18K monthly with minimal conversion impact based on competitor pricing power."
                variant="accent"
                showButton={true}
                onButtonClick={() => setShowProductModal(true)}
              />
            </div>

            {/* Price Gap Analysis Chart */}
            <ChartContainer
              title="Price Range Distribution & Gap Analysis"
              subtitle="SKU count by price range — Opportunity mapping"
            >
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={priceGapAnalysis}>
                  <CartesianGrid key="grid-price-gap" strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis key="xaxis-price-gap" dataKey="range" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
                  <YAxis key="yaxis-price-gap" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} label={{ value: 'SKU Count', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }} />
                  <Tooltip
                    key="tooltip-price-gap"
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px'
                    }}
                  />
                  <Legend key="legend-price-gap" wrapperStyle={{ fontSize: '12px' }} />
                  <Bar key="bar-femme" dataKey="femme" fill="var(--pink)" name="Femme Connection" />
                  <Bar key="bar-reformation" dataKey="reformation" fill="var(--green)" name="Reformation" />
                  <Bar key="bar-sezane" dataKey="sezane" fill="var(--terra)" name="Sézane" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            {/* Competitor Product Grid - Reformation */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <CardTitle>Reformation Product Tracking</CardTitle>
                  <p className="text-[13px] text-[var(--text-secondary)] mt-1">Live SKU monitoring · Pricing · Stock levels · Sales velocity</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                    2.5M FOLLOWERS
                  </div>
                  <Tag variant="green">7% Avg Discount</Tag>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {competitorProducts.reformation.map((product) => (
                  <div key={product.id} className="group cursor-pointer border border-[var(--border-color)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--border-strong)] transition-all">
                    <div className="aspect-[3/4] bg-[var(--surface)] relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        {product.discount !== "0%" && (
                          <div className="bg-[var(--terra)] text-white px-2 py-1 rounded text-[11px] font-medium">
                            -{product.discount}
                          </div>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <div className={`px-2 py-1 rounded text-[10px] font-medium ${
                          product.velocity === "High" ? "bg-[var(--green-light)] text-[var(--green)]" :
                          product.velocity === "Medium" ? "bg-[var(--buff)] text-[var(--buff-dark)]" :
                          "bg-[var(--surface)] text-[var(--text-secondary)]"
                        }`}>
                          {product.velocity} Velocity
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-[14px] font-medium text-[var(--text-primary)] mb-2 line-clamp-2">
                        {product.name}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-[16px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {product.price}
                        </div>
                        <div className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                          {product.stock}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Sézane Product Tracking */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <CardTitle>Sézane Product Tracking</CardTitle>
                  <p className="text-[13px] text-[var(--text-secondary)] mt-1">Live SKU monitoring · Unit sales · Zero-discount strategy validation</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                    5.3M FOLLOWERS
                  </div>
                  <Tag variant="terra">0% Avg Discount</Tag>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {competitorProducts.sezane.map((product) => (
                  <div key={product.id} className="group cursor-pointer border border-[var(--border-color)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--border-strong)] transition-all">
                    <div className="aspect-[3/4] bg-[var(--surface)] relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <div className={`px-2 py-1 rounded text-[10px] font-medium ${
                          product.velocity === "Very High" ? "bg-[var(--pink-light)] text-[var(--pink)]" :
                          product.velocity === "High" ? "bg-[var(--green-light)] text-[var(--green)]" :
                          "bg-[var(--buff)] text-[var(--buff-dark)]"
                        }`}>
                          {product.velocity}
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-[13px] font-medium text-[var(--text-primary)] mb-2 line-clamp-2">
                        {product.name}
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[15px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {product.price}
                        </div>
                        <div className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                          {product.stock}
                        </div>
                      </div>
                      {product.units && (
                        <div className="text-[10px] text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>
                          {product.units} units sold
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Femme Collection Reference */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <CardTitle>Femme Connection Collection</CardTitle>
                  <p className="text-[13px] text-[var(--text-secondary)] mt-1">Current hero products · Competitive positioning</p>
                </div>
                <Tag variant="pink">Our Brand</Tag>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {femmeProducts.map((product) => (
                  <div key={product.id} className="group cursor-pointer border-2 border-[var(--pink-light)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--pink)] transition-all">
                    <div className="aspect-[3/4] bg-[var(--surface)]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 bg-[var(--pink-light)]">
                      <div className="text-[14px] font-medium text-[var(--text-primary)] mb-2">
                        {product.name}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-[16px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {product.price}
                        </div>
                        <div className="text-[10px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                          {product.sku}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* MARKET INTELLIGENCE TAB */}
        {activeTab === "market" && (
          <MarketIntelligenceTab setShowMarketModal={setShowMarketModal} />
        )}

        {activeTab === "market_OLD" && (
          <>
            <StatGrid columns={4}>
              <MetricCard
                label="Market Position"
                value="#3"
                change="Sustainable womenswear"
                changeType="neutral"
              />
              <MetricCard
                label="Market Share"
                value="18.4%"
                change="+2.1% YoY"
                changeType="positive"
                trend="up"
              />
              <MetricCard
                label="vs Category Growth"
                value="+24.6%"
                change="Above average"
                changeType="positive"
              />
              <MetricCard
                label="Brand Health Index"
                value="76/100"
                change="+8 pts QoQ"
                changeType="positive"
                trend="up"
              />
            </StatGrid>

            <div className="grid grid-cols-2 gap-6">
              <AIInsightCard
                title="Market Position Analysis"
                content="Femme Connection holds 18.4% market share in sustainable womenswear segment, positioned between premium (Sézane, Reformation) and accessible luxury. Growth rate 24.6% above category average signals strong momentum. Brand awareness at 42% among target demographic (vs Reformation 68%, Sézane 71%). Opportunity: brand-building investment to close awareness gap while maintaining growth trajectory."
                showButton={true}
                onButtonClick={() => setShowMarketModal(true)}
              />
              <AIInsightCard
                title="Competitive Landscape Shifts"
                content="Reformation expanding into accessories (+34% category revenue), Sézane testing US market (3 new retail locations Q1). Both competitors increasing ad spend (Reformation +28%, Sézane +34% QoQ) while maintaining organic growth. Industry consolidation threat: 2 adjacent brands acquired by larger groups in Q1. Recommendation: accelerate growth initiatives and strengthen market position."
                variant="accent"
                showButton={true}
                onButtonClick={() => setShowMarketModal(true)}
              />
            </div>

            {/* Market Share Chart */}
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardTitle>Market Share Distribution</CardTitle>
                <p className="text-[13px] text-[var(--text-secondary)] mb-6">Sustainable womenswear segment</p>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      key="pie-market-share"
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip key="tooltip-market-share" />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <CardTitle>Brand Health Metrics</CardTitle>
                <p className="text-[13px] text-[var(--text-secondary)] mb-6">Comparative analysis — Last 90 days</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] text-[var(--text-secondary)]">Brand Awareness</span>
                      <span className="text-[14px] font-medium">42%</span>
                    </div>
                    <div className="h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--pink)]" style={{ width: "42%" }} />
                    </div>
                    <div className="text-[11px] text-[var(--text-tertiary)] mt-1">vs Reformation 68%, Sézane 71%</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] text-[var(--text-secondary)]">Purchase Intent</span>
                      <span className="text-[14px] font-medium">54%</span>
                    </div>
                    <div className="h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--green)]" style={{ width: "54%" }} />
                    </div>
                    <div className="text-[11px] text-[var(--text-tertiary)] mt-1">+12% vs category avg</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] text-[var(--text-secondary)]">Brand Affinity</span>
                      <span className="text-[14px] font-medium">67%</span>
                    </div>
                    <div className="h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--terra)]" style={{ width: "67%" }} />
                    </div>
                    <div className="text-[11px] text-[var(--text-tertiary)] mt-1">Strong among existing customers</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] text-[var(--text-secondary)]">NPS Score</span>
                      <span className="text-[14px] font-medium">+58</span>
                    </div>
                    <div className="h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--buff-dark)]" style={{ width: "79%" }} />
                    </div>
                    <div className="text-[11px] text-[var(--text-tertiary)] mt-1">Industry benchmark: +42</div>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* EMAIL INTELLIGENCE TAB */}
        {activeTab === "email" && (
          <EmailIntelligenceTab setShowEmailModal={setShowEmailModal} />
        )}

        {/* META INTELLIGENCE TAB */}
        {activeTab === "meta" && (
          <MetaIntelligenceTab setShowMetaModal={setShowMetaModal} />
        )}

        {/* SOCIAL INTELLIGENCE TAB */}
        {activeTab === "social" && (
          <SocialIntelligenceTab setShowSocialModal={setShowSocialModal} />
        )}

        {/* Action Strip */}
        <ActionStrip
          data={actionStripData}
          onSilverBulletClick={() => setShowSilverBulletModal(true)}
          onLowHangingFruitClick={() => setShowLowHangingFruitModal(true)}
        />
      </div>

      {/* Modals */}
      <DetailedBriefModal
        show={showProductModal}
        onClose={() => setShowProductModal(false)}
        data={productIntelligenceBrief}
        primaryColor="var(--green)"
      />
      <DetailedBriefModal
        show={showMarketModal}
        onClose={() => setShowMarketModal(false)}
        data={marketIntelligenceBrief}
        primaryColor="var(--terra)"
      />
      <DetailedBriefModal
        show={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        data={emailIntelligenceBrief}
        primaryColor="var(--pink)"
      />
      <DetailedBriefModal
        show={showMetaModal}
        onClose={() => setShowMetaModal(false)}
        data={metaIntelligenceBrief}
        primaryColor="var(--buff-dark)"
      />
      <DetailedBriefModal
        show={showSocialModal}
        onClose={() => setShowSocialModal(false)}
        data={socialIntelligenceBrief}
        primaryColor="var(--green)"
      />
      <DetailedBriefModal
        show={showSilverBulletModal}
        onClose={() => setShowSilverBulletModal(false)}
        data={silverBulletBrief}
        primaryColor="var(--pink)"
      />
      <DetailedBriefModal
        show={showLowHangingFruitModal}
        onClose={() => setShowLowHangingFruitModal(false)}
        data={lowHangingFruitBrief}
        primaryColor="var(--green)"
      />
    </div>
  );
}
