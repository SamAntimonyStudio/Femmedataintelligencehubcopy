import React, { useState, useMemo } from "react";
import { Card, CardTitle, MetricCard, AIInsightCard, Tag } from "../components/ui/Card";
import { FilterBar, StatGrid, ChartContainer } from "../components/ui/Filters";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { MapPin, Globe, TrendingUp, Zap, ShoppingBag, Users, Sparkles, X, MousePointer, Clock, FileText, ShoppingCart, Eye, Filter } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { AIWidget } from "../components/AIWidget";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import { DetailedBriefModal, DetailedBriefData } from "../components/DetailedBriefModal";
const ecomHero = "https://placehold.co/750x750?text=ecomHero";

type Channel = "all" | "organic-social" | "paid-social" | "email" | "google-ads" | "direct";
type DateRange = "7d" | "30d" | "90d";

// Base data structures for different channels and date ranges
const channelData: Record<Channel, Record<DateRange, any>> = {
  "all": {
    "7d": {
      revenue: 52840,
      orders: 284,
      conversionRate: 3.8,
      cartAbandonment: 68.2,
      salesData: [
        { date: "Apr 20", orders: 38, revenue: 7120, aov: 187 },
        { date: "Apr 21", orders: 42, revenue: 7840, aov: 187 },
        { date: "Apr 22", orders: 38, revenue: 7220, aov: 190 },
        { date: "Apr 23", orders: 40, revenue: 7600, aov: 190 },
        { date: "Apr 24", orders: 44, revenue: 8360, aov: 190 },
        { date: "Apr 25", orders: 41, revenue: 7785, aov: 190 },
        { date: "Apr 26", orders: 41, revenue: 7915, aov: 193 },
      ],
    },
    "30d": {
      revenue: 198420,
      orders: 1064,
      conversionRate: 3.8,
      cartAbandonment: 68.2,
      salesData: [
        { date: "Mar 1", orders: 42, revenue: 7820, aov: 186 },
        { date: "Mar 8", orders: 48, revenue: 8960, aov: 187 },
        { date: "Mar 15", orders: 52, revenue: 9880, aov: 190 },
        { date: "Mar 22", orders: 58, revenue: 11020, aov: 190 },
        { date: "Mar 29", orders: 64, revenue: 12480, aov: 195 },
      ],
    },
    "90d": {
      revenue: 624800,
      orders: 3248,
      conversionRate: 4.1,
      cartAbandonment: 65.8,
      salesData: [
        { date: "Jan", orders: 156, revenue: 29280, aov: 188 },
        { date: "Feb", orders: 184, revenue: 34960, aov: 190 },
        { date: "Mar", orders: 212, revenue: 40480, aov: 191 },
      ],
    },
  },
  "organic-social": {
    "7d": {
      revenue: 9420,
      orders: 48,
      conversionRate: 4.2,
      cartAbandonment: 62.4,
      salesData: [
        { date: "Apr 20", orders: 6, revenue: 1248, aov: 208 },
        { date: "Apr 21", orders: 7, revenue: 1456, aov: 208 },
        { date: "Apr 22", orders: 7, revenue: 1470, aov: 210 },
        { date: "Apr 23", orders: 7, revenue: 1456, aov: 208 },
        { date: "Apr 24", orders: 7, revenue: 1484, aov: 212 },
        { date: "Apr 25", orders: 7, revenue: 1456, aov: 208 },
        { date: "Apr 26", orders: 7, revenue: 1350, aov: 193 },
      ],
    },
    "30d": {
      revenue: 35280,
      orders: 184,
      conversionRate: 4.2,
      cartAbandonment: 62.4,
      salesData: [
        { date: "Mar 1", orders: 7, revenue: 1456, aov: 208 },
        { date: "Mar 8", orders: 8, revenue: 1664, aov: 208 },
        { date: "Mar 15", orders: 9, revenue: 1890, aov: 210 },
        { date: "Mar 22", orders: 10, revenue: 2080, aov: 208 },
        { date: "Mar 29", orders: 11, revenue: 2332, aov: 212 },
      ],
    },
    "90d": {
      revenue: 112480,
      orders: 542,
      conversionRate: 4.4,
      cartAbandonment: 60.2,
      salesData: [
        { date: "Jan", orders: 28, revenue: 5824, aov: 208 },
        { date: "Feb", orders: 32, revenue: 6656, aov: 208 },
        { date: "Mar", orders: 38, revenue: 7980, aov: 210 },
      ],
    },
  },
  "paid-social": {
    "7d": {
      revenue: 7720,
      orders: 42,
      conversionRate: 3.8,
      cartAbandonment: 66.8,
      salesData: [
        { date: "Apr 20", orders: 6, revenue: 1104, aov: 184 },
        { date: "Apr 21", orders: 6, revenue: 1104, aov: 184 },
        { date: "Apr 22", orders: 6, revenue: 1110, aov: 185 },
        { date: "Apr 23", orders: 6, revenue: 1104, aov: 184 },
        { date: "Apr 24", orders: 6, revenue: 1116, aov: 186 },
        { date: "Apr 25", orders: 6, revenue: 1086, aov: 181 },
        { date: "Apr 26", orders: 6, revenue: 1096, aov: 183 },
      ],
    },
    "30d": {
      revenue: 28920,
      orders: 158,
      conversionRate: 3.8,
      cartAbandonment: 66.8,
      salesData: [
        { date: "Mar 1", orders: 6, revenue: 1104, aov: 184 },
        { date: "Mar 8", orders: 7, revenue: 1288, aov: 184 },
        { date: "Mar 15", orders: 8, revenue: 1480, aov: 185 },
        { date: "Mar 22", orders: 9, revenue: 1656, aov: 184 },
        { date: "Mar 29", orders: 10, revenue: 1860, aov: 186 },
      ],
    },
    "90d": {
      revenue: 92480,
      orders: 502,
      conversionRate: 4.0,
      cartAbandonment: 64.4,
      salesData: [
        { date: "Jan", orders: 24, revenue: 4416, aov: 184 },
        { date: "Feb", orders: 28, revenue: 5152, aov: 184 },
        { date: "Mar", orders: 32, revenue: 5920, aov: 185 },
      ],
    },
  },
  "email": {
    "7d": {
      revenue: 10320,
      orders: 54,
      conversionRate: 6.8,
      cartAbandonment: 52.4,
      salesData: [
        { date: "Apr 20", orders: 7, revenue: 1337, aov: 191 },
        { date: "Apr 21", orders: 8, revenue: 1528, aov: 191 },
        { date: "Apr 22", orders: 8, revenue: 1552, aov: 194 },
        { date: "Apr 23", orders: 8, revenue: 1528, aov: 191 },
        { date: "Apr 24", orders: 8, revenue: 1560, aov: 195 },
        { date: "Apr 25", orders: 7, revenue: 1337, aov: 191 },
        { date: "Apr 26", orders: 8, revenue: 1478, aov: 185 },
      ],
    },
    "30d": {
      revenue: 38640,
      orders: 204,
      conversionRate: 6.8,
      cartAbandonment: 52.4,
      salesData: [
        { date: "Mar 1", orders: 8, revenue: 1528, aov: 191 },
        { date: "Mar 8", orders: 9, revenue: 1719, aov: 191 },
        { date: "Mar 15", orders: 10, revenue: 1940, aov: 194 },
        { date: "Mar 22", orders: 11, revenue: 2101, aov: 191 },
        { date: "Mar 29", orders: 12, revenue: 2340, aov: 195 },
      ],
    },
    "90d": {
      revenue: 124480,
      orders: 652,
      conversionRate: 7.1,
      cartAbandonment: 49.8,
      salesData: [
        { date: "Jan", orders: 32, revenue: 6112, aov: 191 },
        { date: "Feb", orders: 36, revenue: 6876, aov: 191 },
        { date: "Mar", orders: 42, revenue: 8148, aov: 194 },
      ],
    },
  },
  "google-ads": {
    "7d": {
      revenue: 6840,
      orders: 38,
      conversionRate: 3.2,
      cartAbandonment: 71.2,
      salesData: [
        { date: "Apr 20", orders: 5, revenue: 900, aov: 180 },
        { date: "Apr 21", orders: 5, revenue: 900, aov: 180 },
        { date: "Apr 22", orders: 6, revenue: 1086, aov: 181 },
        { date: "Apr 23", orders: 5, revenue: 900, aov: 180 },
        { date: "Apr 24", orders: 6, revenue: 1092, aov: 182 },
        { date: "Apr 25", orders: 6, revenue: 1074, aov: 179 },
        { date: "Apr 26", orders: 5, revenue: 888, aov: 178 },
      ],
    },
    "30d": {
      revenue: 25680,
      orders: 142,
      conversionRate: 3.2,
      cartAbandonment: 71.2,
      salesData: [
        { date: "Mar 1", orders: 5, revenue: 900, aov: 180 },
        { date: "Mar 8", orders: 6, revenue: 1080, aov: 180 },
        { date: "Mar 15", orders: 7, revenue: 1267, aov: 181 },
        { date: "Mar 22", orders: 8, revenue: 1440, aov: 180 },
        { date: "Mar 29", orders: 9, revenue: 1638, aov: 182 },
      ],
    },
    "90d": {
      revenue: 82480,
      orders: 458,
      conversionRate: 3.4,
      cartAbandonment: 69.2,
      salesData: [
        { date: "Jan", orders: 20, revenue: 3600, aov: 180 },
        { date: "Feb", orders: 24, revenue: 4320, aov: 180 },
        { date: "Mar", orders: 28, revenue: 5068, aov: 181 },
      ],
    },
  },
  "direct": {
    "7d": {
      revenue: 11260,
      orders: 58,
      conversionRate: 5.1,
      cartAbandonment: 58.4,
      salesData: [
        { date: "Apr 20", orders: 8, revenue: 1552, aov: 194 },
        { date: "Apr 21", orders: 8, revenue: 1552, aov: 194 },
        { date: "Apr 22", orders: 8, revenue: 1568, aov: 196 },
        { date: "Apr 23", orders: 9, revenue: 1746, aov: 194 },
        { date: "Apr 24", orders: 9, revenue: 1764, aov: 196 },
        { date: "Apr 25", orders: 8, revenue: 1552, aov: 194 },
        { date: "Apr 26", orders: 8, support: 1526, aov: 191 },
      ],
    },
    "30d": {
      revenue: 42150,
      orders: 218,
      conversionRate: 5.1,
      cartAbandonment: 58.4,
      salesData: [
        { date: "Mar 1", orders: 8, revenue: 1552, aov: 194 },
        { date: "Mar 8", orders: 9, revenue: 1746, aov: 194 },
        { date: "Mar 15", orders: 10, revenue: 1960, aov: 196 },
        { date: "Mar 22", orders: 11, revenue: 2134, aov: 194 },
        { date: "Mar 29", orders: 12, revenue: 2352, aov: 196 },
      ],
    },
    "90d": {
      revenue: 136480,
      orders: 702,
      conversionRate: 5.4,
      cartAbandonment: 56.2,
      salesData: [
        { date: "Jan", orders: 32, revenue: 6208, aov: 194 },
        { date: "Feb", orders: 36, revenue: 6984, aov: 194 },
        { date: "Mar", orders: 42, revenue: 8232, aov: 196 },
      ],
    },
  },
};

// AI Insights data
const aiInsights = {
  conversion: {
    title: "Conversion Rate Optimisation Insights",
    overview: "Your conversion rate dropped 0.4 points this month. Analysis shows increased mobile bounce rate (up 8%) and longer checkout times. Consider simplifying mobile checkout flow and testing one-click payment options.",
    details: [
      {
        finding: "Mobile Checkout Friction",
        impact: "High - Contributing to 8% bounce rate increase",
        description: "Mobile users are abandoning at the shipping information step 42% more than desktop users. Form fields are not optimised for mobile auto-fill, and the checkout requires 3 screens instead of a single page.",
        recommendation: "Implement single-page mobile checkout with Apple Pay/Google Pay express options. Enable address auto-complete and reduce required fields from 12 to 7.",
      },
      {
        finding: "Payment Method Limitations",
        impact: "Medium - 18% of carts abandoned at payment step",
        description: "Only credit card and PayPal available. Analysis shows 23% of your target demographic prefers buy-now-pay-later options like Afterpay or Klarna.",
        recommendation: "Add Afterpay and Apple Pay. Test shows this could reduce payment-step abandonment by 35%.",
      },
      {
        finding: "Page Load Time on Product Pages",
        impact: "Medium - 2.4s mobile load time vs 1.2s industry leaders",
        description: "Product images are loading at full resolution (2MB+ files) before compression. Each additional second of load time correlates with 7% conversion drop.",
        recommendation: "Implement WebP format with lazy loading. Compress hero images to under 200KB. Projected impact: +0.3% conversion rate.",
      },
    ],
    recommendations: [
      "Priority 1: Enable Apple Pay and Google Pay (Est. impact: +120 orders/month)",
      "Priority 2: Compress product images and implement lazy loading (Est. impact: +0.3% conversion)",
      "Priority 3: Add Afterpay/Klarna payment options (Est. impact: +80 orders/month)",
      "Priority 4: Simplify mobile checkout to single-page flow (Est. impact: -8% mobile bounce)",
    ],
  },
  cartAbandonment: {
    title: "Cart Abandonment Deep Dive",
    overview: "68.2% cart abandonment rate is 12% higher than industry average. Primary drivers: unexpected shipping costs (32%), account creation requirements (28%), and complex checkout process (24%).",
    details: [
      {
        finding: "Shipping Cost Transparency",
        impact: "Critical - 32% cite as primary abandonment reason",
        description: "Shipping costs only revealed at final checkout step. Customer surveys show 67% would complete purchase if shipping costs shown on product page or cart.",
        recommendation: "Display shipping cost calculator on cart page. Offer free shipping threshold messaging ('Add $25 more for free shipping'). Test showed 18% reduction in shipping-related abandonment.",
      },
      {
        finding: "Forced Account Creation",
        impact: "High - 28% abandon due to account requirement",
        description: "Guest checkout is available but hidden below fold. Users must scroll to find guest option, and 82% of first-time visitors miss it entirely.",
        recommendation: "Make guest checkout the default option. Move account creation to post-purchase step. Shopify data shows this reduces abandonment by 22%.",
      },
      {
        finding: "Exit-Intent Strategy Missing",
        impact: "Medium - Potential 15% recovery opportunity",
        description: "No exit-intent popup or special offers for abandoning users. Industry benchmarks show 12-18% of abandoners can be converted with 10% discount offer.",
        recommendation: "Implement exit-intent popup with email capture and 10% discount code. Set up automated 3-email cart recovery sequence (1hr, 6hr, 24hr).",
      },
    ],
    recommendations: [
      "Immediate: Make guest checkout prominent and default option",
      "Week 1: Add shipping calculator to cart page with free shipping threshold messaging",
      "Week 2: Implement exit-intent popup with discount offer",
      "Week 3: Set up automated cart recovery email sequence with A/B tested timing",
      "Month 2: Test free shipping threshold (currently $75, test $50 vs $100)",
    ],
  },
  traffic: {
    title: "Traffic Source Performance Analysis",
    overview: "Organic social is your highest-performing channel with 4.2% conversion rate and $35K revenue. Email shows exceptional 6.8% conversion. Paid social underperforming at 3.8% conversion suggests creative or targeting optimisation needed.",
    details: [
      {
        finding: "Organic Social Excellence",
        impact: "High - Top performing channel by conversion rate",
        description: "Instagram drives 68% of organic social traffic with 4.8% conversion. Content featuring customer photos converts 3.2x better than brand photoshoots. Stories with product tags have 12% click-through rate.",
        recommendation: "Double down on user-generated content. Launch monthly customer feature program. Increase Stories frequency from 3/week to daily with product tags.",
      },
      {
        finding: "Email Mastery",
        impact: "High - 6.8% conversion rate, highest AOV at $191",
        description: "Segmented campaigns outperform broadcasts by 4.2x. VIP segment (top 15% customers) has 14.2% conversion rate. Automated welcome series converts at 9.8%.",
        recommendation: "Expand segmentation strategy. Create 'At-Risk VIP' re-engagement campaign. Test personalized product recommendations based on browse history.",
      },
      {
        finding: "Paid Social Underperformance",
        impact: "Medium - 3.8% conversion, lowest of all channels",
        description: "Facebook ads have 62% higher CPA than Instagram ads. Video content drives 2.1x more conversions than static images. Retargeting performs 4.3x better than cold traffic campaigns.",
        recommendation: "Shift 70% of Facebook budget to Instagram. Increase video creative production. Expand retargeting audience and create lookalike audiences from VIP customers.",
      },
    ],
    recommendations: [
      "Reallocate $2K/month from Facebook to Instagram paid ads",
      "Launch UGC collection campaign - incentivize customer photo submissions",
      "Create 3 new video ads per month for paid social",
      "Expand email segmentation to 8 segments (currently 3)",
      "Test Google Shopping ads for top 20 products",
    ],
  },
  mobile: {
    title: "Mobile Performance Optimisation",
    overview: "Mobile generates 59% of sessions but only 54.8% of revenue. Desktop shows higher conversion rate (4.3% vs 3.5%). Mobile checkout experience and page load times are primary barriers to mobile conversion parity.",
    details: [
      {
        finding: "Mobile Conversion Gap",
        impact: "Critical - Missing $15K+ monthly revenue",
        description: "Desktop converts at 4.3%, mobile at 3.5%. Gap widens at checkout step - mobile has 72% cart abandonment vs 58% desktop. Touch target sizes below iOS recommendations on 8 key buttons.",
        recommendation: "Audit mobile checkout for touch-friendly design. Increase button sizes to minimum 44x44px. Implement one-click checkout options for returning customers.",
      },
      {
        finding: "Mobile Page Speed",
        impact: "High - 2.4s average load time on mobile",
        description: "Product pages load in 2.4s on mobile vs 1.6s desktop. Images account for 78% of page weight. Each 1s delay correlates with 0.5% conversion drop.",
        recommendation: "Implement responsive images with WebP format. Enable lazy loading on below-fold content. Target sub-2s load time. Estimated impact: +0.4% mobile conversion.",
      },
      {
        finding: "Mobile AOV Opportunity",
        impact: "Medium - Mobile AOV $30 lower than desktop",
        description: "Mobile users purchase fewer items per order (1.8 vs 2.4 desktop). Product recommendations are hidden below fold on mobile. Cross-sell module not optimised for mobile viewport.",
        recommendation: "Redesign mobile product pages with prominent 'Complete the look' carousel above fold. Test sticky 'Add bundle' bar. Projected impact: +$15 mobile AOV.",
      },
    ],
    recommendations: [
      "Week 1: Implement responsive images and lazy loading across site",
      "Week 2: Redesign mobile checkout with larger touch targets and express payment options",
      "Week 3: Add mobile-optimised cross-sell module above fold on product pages",
      "Week 4: A/B test sticky cart reminder bar on mobile",
      "Month 2: Launch mobile-specific promotions to drive adoption",
    ],
  },
  performance: {
    title: "Website Performance Deep Dive",
    overview: "Overall site performance is good with 1.8s average load time and 3.4 pages per session. However, bounce rate of 42.6% indicates room for improvement in initial engagement and page load optimisation.",
    details: [
      {
        finding: "Bounce Rate Above Target",
        impact: "High - 42.6% vs 35% industry benchmark",
        description: "Homepage bounce rate is 38.2%, but Collection pages are at 28.4%. Analysis shows users landing on homepage from paid ads are 48% more likely to bounce than those landing on collection pages.",
        recommendation: "Update paid ad destinations to deep-link to relevant collections instead of homepage. Add prominent 'New Arrivals' and 'Best Sellers' CTAs above fold on homepage.",
      },
      {
        finding: "Session Duration Strength",
        impact: "Positive - 2m 18s above 1m 45s target",
        description: "Users who view 'New Arrivals' collection spend 2m 14s browsing vs 42s for homepage visitors. Product page engagement time is strong at 1m 38s average.",
        recommendation: "Maintain content strategy for collection pages. Consider adding video content to product pages to increase engagement time further.",
      },
      {
        finding: "Pages Per Session Optimisation",
        impact: "Medium - 3.4 pages/session, target 4.0",
        description: "Internal linking on product pages drives only 1.2 additional page views. 'Customers also bought' recommendations have 8% click-through rate. Size/color variations require page reload.",
        recommendation: "Implement AJAX-based variant switching to eliminate page reloads. Expand 'Related Products' from 4 to 8 items. Add 'Shop the Look' curated collections on product pages.",
      },
    ],
    recommendations: [
      "Update all paid ad campaigns to deep-link to collections instead of homepage",
      "Implement AJAX variant switching on all product pages (no page reload for size/color)",
      "Expand related products module from 4 to 8 items with smarter recommendations",
      "Add video content to top 20 products (30s styling/unboxing videos)",
      "Test 'Shop the Look' curated bundles on product pages",
    ],
  },
};

export default function EcommerceDashboard() {
  const [selectedChannel, setSelectedChannel] = useState<Channel>("all");
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>("30d");
  const [showConversionInsight, setShowConversionInsight] = useState(false);
  const [showCartInsight, setShowCartInsight] = useState(false);
  const [showTrafficInsight, setShowTrafficInsight] = useState(false);
  const [showMobileInsight, setShowMobileInsight] = useState(false);
  const [showPerformanceInsight, setShowPerformanceInsight] = useState(false);
  const [showSilverBulletBrief, setShowSilverBulletBrief] = useState(false);
  const [showLowHangingFruitBrief, setShowLowHangingFruitBrief] = useState(false);

  // Get current data based on selected filters
  const currentData = useMemo(() => {
    return channelData[selectedChannel][selectedDateRange];
  }, [selectedChannel, selectedDateRange]);

  const channels = [
    { id: "all" as Channel, label: "All Channels", color: "var(--green)" },
    { id: "organic-social" as Channel, label: "Organic Social", color: "var(--pink)" },
    { id: "paid-social" as Channel, label: "Paid Social", color: "var(--terra)" },
    { id: "email" as Channel, label: "Email", color: "var(--buff-dark)" },
    { id: "google-ads" as Channel, label: "Google Ads", color: "var(--green-mid)" },
    { id: "direct" as Channel, label: "Direct", color: "var(--green-dark)" },
  ];

  const dateRanges = [
    { id: "7d" as DateRange, label: "Last 7 Days" },
    { id: "30d" as DateRange, label: "Last 30 Days" },
    { id: "90d" as DateRange, label: "Last 90 Days" },
  ];

  const getChannelLabel = () => {
    return channels.find(c => c.id === selectedChannel)?.label || "All Channels";
  };

  // Action Strip Data
  const actionStripData: ActionStripData = {
    silverBullet: {
      action: "Optimise cart abandonment flow — recover 23% drop in abandoned cart emails",
      impactLine: "Estimated: +$18,420 at 12% recovery rate improvement",
      channel: "Klaviyo · Email + SMS"
    },
    lowHangingFruit: {
      action: "A/B test free shipping threshold increase from $75 to $85",
      effortChip: "Easy · 1 day",
      impact: "+$8.50 AOV · Projected +$4,200 monthly revenue",
      channelChip: "Shopify · Site-Wide"
    },
    frameworkTasks: [
      { task: "Mobile checkout optimisation", status: "In Progress" },
      { task: "Product page load speed improvement", status: "Planned" },
      { task: "Cross-sell widget implementation", status: "On Track" }
    ]
  };

  const silverBulletBrief: DetailedBriefData = {
    title: "Cart Abandonment Recovery Optimisation",
    category: "Silver Bullet · E-commerce",
    overview: "Cart abandonment rate is 68.2%, costing an estimated $82,000 in lost monthly revenue. Email-only recovery strategy has dropped from 14.8% to 12.4% recovery rate—a 23% decline. Mobile users (62% of traffic) abandon at higher rates but current flow lacks SMS follow-up. Competitors achieve 35-42% recovery rates through multi-channel approaches. Optimising abandoned cart flow with SMS integration, earlier discount triggers, and personalised product imagery could recover additional $18,420 monthly revenue.",
    goals: [
      "Increase cart recovery rate from 12.4% to 24% (minimum) within 60 days",
      "Implement multi-channel recovery (email + SMS) to capture mobile abandoners (62% of traffic)",
      "Reduce time-to-conversion by moving discount from 24hr to 6hr trigger point",
      "Generate $18,420+ additional monthly revenue through improved recovery tactics"
    ],
    detailedBrief: {
      challenge: "68.2% cart abandonment rate with declining recovery performance. Current email-only strategy misses mobile-first shoppers who prefer SMS. Discount incentive arrives too late (24 hours) when 78% of recoverable carts convert within 6 hours. Generic email copy doesn't feature actual abandoned products, reducing relevance and urgency. Missing $82K monthly revenue opportunity from abandoned carts worth average $186 each.",
      approach: "Multi-phase optimisation: (1) Add SMS reminder at 2-hour mark for mobile users with direct cart link, (2) Move $15 discount from 24hr email to 6hr email for faster conversion, (3) Implement dynamic product imagery in emails showing actual abandoned items with scarcity messaging, (4) Add exit-intent popup offering 10% discount for immediate completion, (5) Create VIP fast-track for high-AOV carts ($200+) with phone call follow-up.",
      timeline: "6 weeks (2 weeks setup + 4 weeks testing)",
      budget: "$3,200 (Klaviyo SMS credits $1,800 + development $1,400)"
    },
    nextSteps: [
      {
        step: "Klaviyo SMS Integration & Flow Build",
        description: "Enable SMS in Klaviyo, purchase credits, configure phone number collection at checkout. Build SMS flow at 2hr mark with personalised message including direct cart link and product images. Ensure mobile-optimised cart landing page for seamless completion.",
        owner: "E-commerce Manager"
      },
      {
        step: "Email Flow Restructure & Creative Updates",
        description: "Move discount offer from step 3 (24hr) to step 2 (6hr). Implement dynamic product blocks showing abandoned items with live inventory counts. Add urgency copy ('2 items left in stock'). Create mobile-responsive email templates with large CTA buttons.",
        owner: "CRM Team"
      },
      {
        step: "Exit-Intent Popup Implementation",
        description: "Install Shopify app for exit-intent detection. Configure popup to trigger when user moves to close tab with items in cart. Offer 10% discount code for immediate checkout completion. A/B test popup timing and discount amount (10% vs 15%).",
        owner: "Web Developer"
      },
      {
        step: "High-AOV VIP Recovery Process",
        description: "Set up automated alert for abandoned carts over $200. Train customer service team on personalised phone/email outreach within 4 hours. Offer free express shipping or exclusive styling consultation to incentivise completion. Track VIP recovery rate separately.",
        owner: "Customer Success Lead"
      }
    ],
    potentialOutcomes: {
      bestCase: "+$24,200/month revenue, 28% recovery rate, 3.8x ROI",
      expected: "+$18,420/month revenue, 24% recovery rate, 2.9x ROI",
      metrics: [
        "Cart recovery rate (%)",
        "Revenue from recovered carts",
        "SMS vs email recovery conversion",
        "Time-to-recovery (hours)",
        "Exit-intent popup conversion rate",
        "High-AOV VIP recovery success rate"
      ]
    }
  };

  const lowHangingFruitBrief: DetailedBriefData = {
    title: "Free Shipping Threshold Optimisation",
    category: "Low-Hanging Fruit · E-commerce",
    overview: "Current free shipping threshold of $75 was set 18 months ago when AOV was $168. AOV has grown to $186, meaning 72% of orders already exceed the threshold without needing to add items. Increasing threshold to $85 creates incentive for customers to add one more item (average product price $42) to qualify for free shipping. Conservative 18% adoption rate would increase AOV by $8.50 and generate $4,200 additional monthly revenue with zero cost to implement.",
    goals: [
      "Increase average order value from $186 to $194.50 (+$8.50) through threshold optimisation",
      "Maintain free shipping qualification rate at 65%+ to avoid conversion rate decline",
      "Generate $4,200+ additional monthly revenue from increased basket sizes",
      "Reduce shipping cost burden by encouraging customers to consolidate purchases"
    ],
    detailedBrief: {
      challenge: "Free shipping threshold hasn't been adjusted despite 11% AOV growth over 18 months. Current $75 threshold is too easily achieved (72% of orders qualify) providing no incentive to add more items. Opportunity to optimise threshold to match current customer spending patterns while maintaining conversion rates. Risk: setting threshold too high could deter purchases or increase cart abandonment.",
      approach: "Implement A/B test comparing current $75 threshold vs new $85 threshold. Test will run for 30 days across all traffic (50/50 split). Monitor impact on AOV, conversion rate, units per transaction, and cart abandonment. Display progress bar showing 'Add $X more for free shipping' in cart and checkout. Highlight complementary low-price items ($15-45) to help customers reach threshold easily.",
      timeline: "1 day setup + 30 days testing",
      budget: "$0 (uses existing Shopify features)"
    },
    nextSteps: [
      {
        step: "Shopify A/B Test Configuration",
        description: "Set up Shopify Scripts or app to randomly assign 50% of sessions to $75 threshold (control) and 50% to $85 threshold (variant). Configure cart messaging to display dynamic 'Add $X for free shipping' based on assigned threshold. Ensure test tracking is properly configured in analytics.",
        owner: "E-commerce Manager"
      },
      {
        step: "Cart UX Enhancements",
        description: "Design and implement progress bar showing proximity to free shipping threshold. Add 'Recommended for you' product carousel featuring items under $45 to help customers reach threshold. Display savings calculation ('You've earned $12 free shipping!'). A/B test carousel placement (above vs below cart items).",
        owner: "UX Designer"
      },
      {
        step: "Monitor Test Performance",
        description: "Daily monitoring of key metrics: AOV, conversion rate, free shipping qualification rate, cart abandonment rate, units per transaction. Watch for negative impacts on mobile conversion. Weekly stakeholder updates with test progress. Prepare to end test early if conversion rate drops >5%.",
        owner: "Analytics Team"
      },
      {
        step: "Analyse Results & Implement Winner",
        description: "After 30 days, analyse statistical significance of results. If $85 threshold increases AOV without harming conversion, implement site-wide. If negative impact, revert to $75 or test intermediate threshold ($80). Document learnings and plan quarterly threshold reviews to match AOV trends.",
        owner: "E-commerce Manager"
      }
    ],
    potentialOutcomes: {
      bestCase: "+$5,800/month revenue, $11.20 AOV increase, 68% free shipping qualification rate maintained",
      expected: "+$4,200/month revenue, $8.50 AOV increase, 65% free shipping qualification rate",
      metrics: [
        "Average order value (AOV)",
        "Conversion rate",
        "Free shipping qualification rate",
        "Cart abandonment rate",
        "Units per transaction",
        "Revenue per session"
      ]
    }
  };

  return (
    <div>
      <PageHeader
        label="Channels · E-commerce"
        title="E-commerce Intelligence"
        description="Unified view of Shopify and GA4 data. Track revenue, orders, conversion rates, and customer behavior across your online store."
        backgroundGradient="terra"
        image={ecomHero}
        externalLinks={[
          { name: "Shopify Admin", url: "https://shopify.com" },
          { name: "Google Analytics 4", url: "https://analytics.google.com" },
        ]}
        stats={[
          { label: "MTD Revenue", value: `$${(currentData.revenue / 1000).toFixed(0)}K` },
          { label: "Total Orders", value: currentData.orders.toLocaleString() },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        {/* AI Widget */}
        <AIWidget
          insightLabel="E-commerce Optimisation"
          insightText="Cart abandonment rate at 68.2%, above 65% benchmark. Mobile conversion rate (2.8%) lags desktop (4.2%) by 33%. Recommendation: optimise mobile checkout flow and launch cart recovery SMS campaign."
        />

        {/* Filter Controls */}
        <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-[var(--radius-lg)] border border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-[var(--text-tertiary)]" />
            <span className="text-[13px] font-medium text-[var(--text-secondary)]">Filter by Channel:</span>
            <div className="flex gap-2">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`px-4 py-2 rounded-[var(--radius-md)] text-[13px] font-medium transition-all ${
                    selectedChannel === channel.id
                      ? "text-white shadow-sm"
                      : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
                  }`}
                  style={{
                    backgroundColor: selectedChannel === channel.id ? channel.color : undefined,
                  }}
                >
                  {channel.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-medium text-[var(--text-secondary)]">Date Range:</span>
            <div className="flex gap-2">
              {dateRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedDateRange(range.id)}
                  className={`px-4 py-2 rounded-[var(--radius-md)] text-[13px] font-medium transition-all ${
                    selectedDateRange === range.id
                      ? "bg-[var(--green)] text-white shadow-sm"
                      : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filter Display */}
        <div className="flex items-center gap-2 text-[13px]">
          <span className="text-[var(--text-tertiary)]">Showing:</span>
          <Tag variant="green">{getChannelLabel()}</Tag>
          <span className="text-[var(--text-tertiary)]">·</span>
          <Tag variant="buff">{dateRanges.find(r => r.id === selectedDateRange)?.label}</Tag>
        </div>

        <StatGrid columns={4}>
          <MetricCard
            label="Revenue"
            value={`$${currentData.revenue.toLocaleString()}`}
            change="+8.7%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Total Orders"
            value={currentData.orders.toLocaleString()}
            change="+12.3%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Conversion Rate"
            value={`${currentData.conversionRate}%`}
            change="-0.4%"
            changeType="negative"
            trend="down"
          />
          <MetricCard
            label="Cart Abandonment"
            value={`${currentData.cartAbandonment}%`}
            change="+2.1%"
            changeType="negative"
            trend="up"
          />
        </StatGrid>

        {/* AI Insights Section */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--pink)]" />
              <CardTitle>AI Conversion Insight</CardTitle>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
              Your conversion rate dropped 0.4 points. Analysis shows increased mobile bounce rate (up 8%) and longer checkout times. Consider simplifying mobile checkout flow and testing one-click payment options. Projected impact: +120 orders/month.
            </p>
            <button
              onClick={() => setShowConversionInsight(true)}
              className="w-full px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Deep Dive: Conversion
            </button>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--terra)]" />
              <CardTitle>AI Cart Abandonment Insight</CardTitle>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
              68.2% abandonment rate is 12% above industry average. Primary drivers: unexpected shipping costs (32%), account creation requirements (28%), and complex checkout (24%). Implement shipping calculator and guest checkout.
            </p>
            <button
              onClick={() => setShowCartInsight(true)}
              className="w-full px-4 py-2 bg-[var(--terra)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Deep Dive: Cart Recovery
            </button>
          </Card>
        </div>

        {/* Ask AI Widget */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[var(--pink)]" />
            <CardTitle>Ask AI</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Get instant insights about your e-commerce performance</p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g., 'Why is Melbourne outperforming Sydney?' or 'How can I reduce cart abandonment?'"
              className="flex-1 px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] transition-all"
            />
            <button className="px-6 py-3 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium whitespace-nowrap flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Ask
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="px-3 py-1.5 bg-[var(--surface)] text-[var(--text-secondary)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors text-[12px]">
              Optimise conversion rate
            </button>
            <button className="px-3 py-1.5 bg-[var(--surface)] text-[var(--text-secondary)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors text-[12px]">
              Improve mobile performance
            </button>
            <button className="px-3 py-1.5 bg-[var(--surface)] text-[var(--text-secondary)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors text-[12px]">
              Analyse top products
            </button>
            <button className="px-3 py-1.5 bg-[var(--surface)] text-[var(--text-secondary)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors text-[12px]">
              Channel performance comparison
            </button>
          </div>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <ChartContainer
            title={`${getChannelLabel()} - Sales & Orders Trend`}
            subtitle={dateRanges.find(r => r.id === selectedDateRange)?.label}
            tag={{ label: "Shopify", variant: "pink" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData.salesData} key={`line-chart-${selectedChannel}-${selectedDateRange}`}>
                <CartesianGrid key={`grid-${selectedChannel}-${selectedDateRange}`} strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis key={`xaxis-${selectedChannel}-${selectedDateRange}`} dataKey="date" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
                <YAxis key={`yaxis-${selectedChannel}-${selectedDateRange}`} stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
                <Tooltip
                  key={`tooltip-${selectedChannel}-${selectedDateRange}`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px'
                  }}
                />
                <Legend key={`legend-${selectedChannel}-${selectedDateRange}`} wrapperStyle={{ fontSize: '12px' }} />
                <Line key={`line-revenue-${selectedChannel}-${selectedDateRange}`} type="monotone" dataKey="revenue" stroke="var(--pink)" strokeWidth={3} name="Revenue ($)" />
                <Line key={`line-orders-${selectedChannel}-${selectedDateRange}`} type="monotone" dataKey="orders" stroke="var(--green-mid)" strokeWidth={3} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer
            title="Average Order Value"
            subtitle={dateRanges.find(r => r.id === selectedDateRange)?.label}
            tag={{ label: "Metrics", variant: "green" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData.salesData} key={`bar-chart-${selectedChannel}-${selectedDateRange}`}>
                <CartesianGrid key={`bar-grid-${selectedChannel}-${selectedDateRange}`} strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis key={`bar-xaxis-${selectedChannel}-${selectedDateRange}`} dataKey="date" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
                <YAxis key={`bar-yaxis-${selectedChannel}-${selectedDateRange}`} stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
                <Tooltip
                  key={`bar-tooltip-${selectedChannel}-${selectedDateRange}`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px'
                  }}
                />
                <Bar key={`bar-aov-${selectedChannel}-${selectedDateRange}`} dataKey="aov" fill="var(--terra)" name="AOV ($)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Website Performance & Mobile Insight */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-[var(--buff-dark)]" />
              <CardTitle>Website Performance</CardTitle>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">GA4 site speed & engagement metrics</p>
            <div className="space-y-4 mb-6">
              {[
                { metric: "Avg Page Load", value: "1.8s", status: "good" },
                { metric: "Bounce Rate", value: "42.6%", status: "warning" },
                { metric: "Pages/Session", value: "3.4", status: "good" },
                { metric: "Avg Session Duration", value: "2m 18s", status: "good" },
              ].map((item, index) => {
                const statusConfig = {
                  good: { bg: "var(--green-light)", color: "var(--green)", label: "Good" },
                  warning: { bg: "var(--terra-light)", color: "var(--terra)", label: "Needs Attention" },
                }[item.status];

                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                    <div>
                      <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">{item.metric}</div>
                      <div
                        className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}
                      >
                        {statusConfig.label}
                      </div>
                    </div>
                    <div className="text-[18px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setShowPerformanceInsight(true)}
              className="w-full px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Performance Improvement
            </button>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--green)]" />
              <CardTitle>AI Mobile Performance Insight</CardTitle>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
              Mobile generates 59% of sessions but only 54.8% of revenue. Desktop shows higher conversion rate (4.3% vs 3.5%). Mobile checkout experience and page load times (2.4s) are primary barriers. Optimise mobile checkout flow and implement express payment options.
            </p>
            <button
              onClick={() => setShowMobileInsight(true)}
              className="w-full px-4 py-2 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Deep Dive: Mobile Optimisation
            </button>
          </Card>
        </div>

        {/* Traffic Insight */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[var(--buff-dark)]" />
            <CardTitle>AI Traffic Source Insight</CardTitle>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
            {`${getChannelLabel()} performance analysis: ${selectedChannel === 'all' ? 'Organic social leads with 4.2% conversion rate. Email shows exceptional 6.8% conversion with highest AOV. Paid social underperforming at 3.8% - suggest creative refresh and audience targeting optimisation.' : 'Channel-specific insights available. Deep dive for detailed recommendations on optimisation strategies, budget allocation, and growth opportunities.'}`}
          </p>
          <button
            onClick={() => setShowTrafficInsight(true)}
            className="w-full px-4 py-2 bg-[var(--buff-dark)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Deep Dive: Traffic Sources
          </button>
        </Card>

        {/* Action Strip */}
        <ActionStrip
          data={actionStripData}
          onSilverBulletClick={() => setShowSilverBulletBrief(true)}
          onLowHangingFruitClick={() => setShowLowHangingFruitBrief(true)}
        />
      </div>

      {/* Insight Modals */}
      <InsightModal
        show={showConversionInsight}
        onClose={() => setShowConversionInsight(false)}
        insight={aiInsights.conversion}
        icon={<TrendingUp className="w-6 h-6 text-[var(--pink)]" />}
        color="var(--pink)"
      />
      <InsightModal
        show={showCartInsight}
        onClose={() => setShowCartInsight(false)}
        insight={aiInsights.cartAbandonment}
        icon={<ShoppingCart className="w-6 h-6 text-[var(--terra)]" />}
        color="var(--terra)"
      />
      <InsightModal
        show={showTrafficInsight}
        onClose={() => setShowTrafficInsight(false)}
        insight={aiInsights.traffic}
        icon={<Globe className="w-6 h-6 text-[var(--buff-dark)]" />}
        color="var(--buff-dark)"
      />
      <InsightModal
        show={showMobileInsight}
        onClose={() => setShowMobileInsight(false)}
        insight={aiInsights.mobile}
        icon={<MousePointer className="w-6 h-6 text-[var(--green)]" />}
        color="var(--green)"
      />
      <InsightModal
        show={showPerformanceInsight}
        onClose={() => setShowPerformanceInsight(false)}
        insight={aiInsights.performance}
        icon={<Zap className="w-6 h-6 text-[var(--pink)]" />}
        color="var(--pink)"
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
              <p className="text-[13px] text-[var(--text-secondary)]">E-commerce Performance Analysis</p>
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
