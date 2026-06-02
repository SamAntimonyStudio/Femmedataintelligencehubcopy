import React, { useState, useMemo } from "react";
import {
  Card,
  CardTitle,
  MetricCard,
  AIInsightCard,
  Tag,
} from "../components/ui/Card";
import {
  FilterBar,
  StatGrid,
  ChartContainer,
} from "../components/ui/Filters";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Instagram,
  Facebook,
  Twitter,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  Filter,
  Sparkles,
  X,
  Target,
  Users,
  Zap,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import { AIWidget } from "../components/AIWidget";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import { DetailedBriefModal, DetailedBriefData } from "../components/DetailedBriefModal";
// Image imports commented out to fix build - images not found in repository
// import marketingHero from "../../imports/kp525751_1_v1639125498561133729_750x750_1.jpg";
// import contentImg1 from "../../imports/kp734293_1_v1639125496755888385_750x750_1.jpg";
// import contentImg2 from "../../imports/kp525903_1_v1639125496333876102_750x750_1.jpg";
// import contentImg3 from "../../imports/kp525751_1_v1639125498561133729_750x750_1.jpg";
// import contentImg4 from "../../imports/kp734239_1_v1639125494834433804_750x750_1.jpg";
// import contentImg5 from "../../imports/kp522820_1_v1639125499266696291_750x750_1.jpg";
// import contentImg6 from "../../imports/kp510194_1_v1639125494525318380_750x750_1.jpg";

// Placeholder images
const marketingHero = "https://via.placeholder.com/1200x400?text=Marketing+Dashboard";
const contentImg1 = "https://via.placeholder.com/750x750?text=Content+1";
const contentImg2 = "https://via.placeholder.com/750x750?text=Content+2";
const contentImg3 = "https://via.placeholder.com/750x750?text=Content+3";
const contentImg4 = "https://via.placeholder.com/750x750?text=Content+4";
const contentImg5 = "https://via.placeholder.com/750x750?text=Content+5";
const contentImg6 = "https://via.placeholder.com/750x750?text=Content+6";

type Channel = "all" | "organic-social" | "paid-social" | "email" | "google-ads" | "direct";
type DateRange = "7d" | "30d" | "90d";

// Channel data structure
const channelData: Record<Channel, Record<DateRange, any>> = {
  "all": {
    "7d": {
      adSpend: 3420,
      roas: 4.8,
      reach: 38200,
      engagementRate: 6.4,
      socialPerformance: [
        { date: "Apr 20", reach: 5240, engagement: 336, clicks: 102 },
        { date: "Apr 21", reach: 5680, engagement: 363, clicks: 114 },
        { date: "Apr 22", reach: 5120, engagement: 328, clicks: 98 },
        { date: "Apr 23", reach: 5840, engagement: 374, clicks: 126 },
        { date: "Apr 24", reach: 6020, engagement: 386, clicks: 132 },
        { date: "Apr 25", reach: 5480, engagement: 351, clicks: 108 },
        { date: "Apr 26", reach: 4820, engagement: 309, clicks: 92 },
      ],
      paidCampaigns: [
        { name: "Spring Collection Launch", platform: "Meta", spend: 1200, roas: 4.2, conversions: 36 },
        { name: "TikTok Brand Awareness", platform: "TikTok", spend: 800, roas: 3.8, conversions: 24 },
        { name: "Instagram Stories", platform: "Meta", spend: 460, roas: 5.1, conversions: 20 },
        { name: "Retargeting Campaign", platform: "Meta", spend: 960, roas: 6.8, conversions: 42 },
      ],
    },
    "30d": {
      adSpend: 12840,
      roas: 4.8,
      reach: 142800,
      engagementRate: 6.4,
      socialPerformance: [
        { date: "Week 1", reach: 28400, engagement: 1820, clicks: 540 },
        { date: "Week 2", reach: 32100, engagement: 2140, clicks: 620 },
        { date: "Week 3", reach: 29800, engagement: 1960, clicks: 580 },
        { date: "Week 4", reach: 35600, engagement: 2380, clicks: 720 },
      ],
      paidCampaigns: [
        { name: "Spring Collection Launch", platform: "Meta", spend: 4200, roas: 4.2, conversions: 124 },
        { name: "TikTok Brand Awareness", platform: "TikTok", spend: 2800, roas: 3.8, conversions: 86 },
        { name: "Instagram Stories", platform: "Meta", spend: 1600, roas: 5.1, conversions: 68 },
        { name: "Retargeting Campaign", platform: "Meta", spend: 3400, roas: 6.8, conversions: 142 },
      ],
    },
    "90d": {
      adSpend: 42480,
      roas: 5.2,
      reach: 486200,
      engagementRate: 6.8,
      socialPerformance: [
        { date: "Jan", reach: 124800, engagement: 8112, clicks: 2340 },
        { date: "Feb", reach: 148600, engagement: 9658, clicks: 2820 },
        { date: "Mar", reach: 168200, engagement: 10933, clicks: 3280 },
      ],
      paidCampaigns: [
        { name: "Spring Collection Launch", platform: "Meta", spend: 14200, roas: 4.8, conversions: 428 },
        { name: "TikTok Brand Awareness", platform: "TikTok", spend: 9600, roas: 4.2, conversions: 312 },
        { name: "Instagram Stories", platform: "Meta", spend: 5400, roas: 5.4, conversions: 242 },
        { name: "Retargeting Campaign", platform: "Meta", spend: 11800, roas: 7.2, conversions: 524 },
      ],
    },
  },
  "organic-social": {
    "7d": {
      adSpend: 0,
      roas: 0,
      reach: 28400,
      engagementRate: 8.2,
      socialPerformance: [
        { date: "Apr 20", reach: 3820, engagement: 313, clicks: 94 },
        { date: "Apr 21", reach: 4120, engagement: 338, clicks: 106 },
        { date: "Apr 22", reach: 3960, engagement: 325, clicks: 98 },
        { date: "Apr 23", reach: 4280, engagement: 351, clicks: 112 },
        { date: "Apr 24", reach: 4420, engagement: 362, clicks: 118 },
        { date: "Apr 25", reach: 4080, engagement: 334, clicks: 102 },
        { date: "Apr 26", reach: 3720, engagement: 305, clicks: 88 },
      ],
      paidCampaigns: [],
    },
    "30d": {
      adSpend: 0,
      roas: 0,
      reach: 108600,
      engagementRate: 8.2,
      socialPerformance: [
        { date: "Week 1", reach: 22400, engagement: 1837, clicks: 512 },
        { date: "Week 2", reach: 25800, engagement: 2116, clicks: 584 },
        { date: "Week 3", reach: 24200, engagement: 1984, clicks: 548 },
        { date: "Week 4", reach: 28600, engagement: 2345, clicks: 672 },
      ],
      paidCampaigns: [],
    },
    "90d": {
      adSpend: 0,
      roas: 0,
      reach: 368400,
      engagementRate: 8.6,
      socialPerformance: [
        { date: "Jan", reach: 98600, engagement: 8479, clicks: 2184 },
        { date: "Feb", reach: 114200, engagement: 9821, clicks: 2568 },
        { date: "Mar", reach: 128600, engagement: 11060, clicks: 2940 },
      ],
      paidCampaigns: [],
    },
  },
  "paid-social": {
    "7d": {
      adSpend: 2840,
      roas: 5.2,
      reach: 18600,
      engagementRate: 4.8,
      socialPerformance: [
        { date: "Apr 20", reach: 2520, engagement: 121, clicks: 48 },
        { date: "Apr 21", reach: 2720, engagement: 130, clicks: 52 },
        { date: "Apr 22", reach: 2480, engagement: 119, clicks: 46 },
        { date: "Apr 23", reach: 2860, engagement: 137, clicks: 58 },
        { date: "Apr 24", reach: 2940, engagement: 141, clicks: 62 },
        { date: "Apr 25", reach: 2680, engagement: 129, clicks: 54 },
        { date: "Apr 26", reach: 2400, engagement: 115, clicks: 44 },
      ],
      paidCampaigns: [
        { name: "Spring Collection Launch", platform: "Meta", spend: 1000, roas: 4.2, conversions: 30 },
        { name: "TikTok Brand Awareness", platform: "TikTok", spend: 680, roas: 3.8, conversions: 20 },
        { name: "Instagram Stories", platform: "Meta", spend: 420, roas: 5.1, conversions: 18 },
        { name: "Retargeting Campaign", platform: "Meta", spend: 740, roas: 6.8, conversions: 34 },
      ],
    },
    "30d": {
      adSpend: 10600,
      roas: 5.2,
      reach: 68400,
      engagementRate: 4.8,
      socialPerformance: [
        { date: "Week 1", reach: 14200, engagement: 682, clicks: 268 },
        { date: "Week 2", reach: 16400, engagement: 787, clicks: 312 },
        { date: "Week 3", reach: 15200, engagement: 730, clicks: 288 },
        { date: "Week 4", reach: 18200, engagement: 874, clicks: 348 },
      ],
      paidCampaigns: [
        { name: "Spring Collection Launch", platform: "Meta", spend: 3600, roas: 4.2, conversions: 108 },
        { name: "TikTok Brand Awareness", platform: "TikTok", spend: 2400, roas: 3.8, conversions: 72 },
        { name: "Instagram Stories", platform: "Meta", spend: 1480, roas: 5.1, conversions: 62 },
        { name: "Retargeting Campaign", platform: "Meta", spend: 2680, roas: 6.8, conversions: 118 },
      ],
    },
    "90d": {
      adSpend: 34800,
      roas: 5.6,
      reach: 238200,
      engagementRate: 5.2,
      socialPerformance: [
        { date: "Jan", reach: 62400, engagement: 3245, clicks: 1248 },
        { date: "Feb", reach: 74800, engagement: 3890, clicks: 1496 },
        { date: "Mar", reach: 86400, engagement: 4493, clicks: 1728 },
      ],
      paidCampaigns: [
        { name: "Spring Collection Launch", platform: "Meta", spend: 12200, roas: 4.8, conversions: 372 },
        { name: "TikTok Brand Awareness", platform: "TikTok", spend: 8200, roas: 4.2, conversions: 268 },
        { name: "Instagram Stories", platform: "Meta", spend: 5000, roas: 5.4, conversions: 220 },
        { name: "Retargeting Campaign", platform: "Meta", spend: 9400, roas: 7.2, conversions: 448 },
      ],
    },
  },
  "email": {
    "7d": {
      adSpend: 120,
      roas: 12.4,
      reach: 8420,
      engagementRate: 24.6,
      socialPerformance: [
        { date: "Apr 20", reach: 1200, engagement: 295, clicks: 142 },
        { date: "Apr 21", reach: 1240, engagement: 305, clicks: 148 },
        { date: "Apr 22", reach: 0, engagement: 0, clicks: 0 },
        { date: "Apr 23", reach: 1180, engagement: 290, clicks: 136 },
        { date: "Apr 24", reach: 1260, engagement: 310, clicks: 152 },
        { date: "Apr 25", reach: 0, engagement: 0, clicks: 0 },
        { date: "Apr 26", reach: 1220, engagement: 300, clicks: 144 },
      ],
      paidCampaigns: [],
    },
    "30d": {
      adSpend: 480,
      roas: 12.4,
      reach: 32800,
      engagementRate: 24.6,
      socialPerformance: [
        { date: "Week 1", reach: 7200, engagement: 1771, clicks: 864 },
        { date: "Week 2", reach: 8400, engagement: 2066, clicks: 1008 },
        { date: "Week 3", reach: 7800, engagement: 1919, clicks: 936 },
        { date: "Week 4", reach: 9200, engagement: 2263, clicks: 1104 },
      ],
      paidCampaigns: [],
    },
    "90d": {
      adSpend: 1440,
      roas: 13.2,
      reach: 112400,
      engagementRate: 26.8,
      socialPerformance: [
        { date: "Jan", reach: 32200, engagement: 8630, clicks: 4264 },
        { date: "Feb", reach: 36800, engagement: 9862, clicks: 4876 },
        { date: "Mar", reach: 42400, engagement: 11363, clicks: 5616 },
      ],
      paidCampaigns: [],
    },
  },
  "google-ads": {
    "7d": {
      adSpend: 460,
      roas: 3.8,
      reach: 6820,
      engagementRate: 3.2,
      socialPerformance: [
        { date: "Apr 20", reach: 920, engagement: 29, clicks: 18 },
        { date: "Apr 21", reach: 1040, engagement: 33, clicks: 22 },
        { date: "Apr 22", reach: 980, engagement: 31, clicks: 20 },
        { date: "Apr 23", reach: 1120, engagement: 36, clicks: 26 },
        { date: "Apr 24", reach: 1160, engagement: 37, clicks: 28 },
        { date: "Apr 25", reach: 1020, engagement: 33, clicks: 22 },
        { date: "Apr 26", reach: 580, engagement: 19, clicks: 10 },
      ],
      paidCampaigns: [
        { name: "Search - Dresses", platform: "Google", spend: 180, roas: 4.2, conversions: 12 },
        { name: "Shopping - Spring", platform: "Google", spend: 140, roas: 3.6, conversions: 8 },
        { name: "Display Retargeting", platform: "Google", spend: 140, roas: 3.4, conversions: 6 },
      ],
    },
    "30d": {
      adSpend: 1760,
      roas: 3.8,
      reach: 26200,
      engagementRate: 3.2,
      socialPerformance: [
        { date: "Week 1", reach: 5400, engagement: 173, clicks: 108 },
        { date: "Week 2", reach: 6200, engagement: 198, clicks: 124 },
        { date: "Week 3", reach: 5800, engagement: 186, clicks: 116 },
        { date: "Week 4", reach: 7200, engagement: 230, clicks: 144 },
      ],
      paidCampaigns: [
        { name: "Search - Dresses", platform: "Google", spend: 680, roas: 4.2, conversions: 48 },
        { name: "Shopping - Spring", platform: "Google", spend: 520, roas: 3.6, conversions: 32 },
        { name: "Display Retargeting", platform: "Google", spend: 560, roas: 3.4, conversions: 24 },
      ],
    },
    "90d": {
      adSpend: 6240,
      roas: 4.2,
      reach: 92800,
      engagementRate: 3.6,
      socialPerformance: [
        { date: "Jan", reach: 24800, engagement: 893, clicks: 496 },
        { date: "Feb", reach: 28600, engagement: 1030, clicks: 572 },
        { date: "Mar", reach: 34200, engagement: 1231, clicks: 684 },
      ],
      paidCampaigns: [
        { name: "Search - Dresses", platform: "Google", spend: 2400, roas: 4.6, conversions: 168 },
        { name: "Shopping - Spring", platform: "Google", spend: 1840, roas: 4.0, conversions: 112 },
        { name: "Display Retargeting", platform: "Google", spend: 2000, roas: 3.8, conversions: 96 },
      ],
    },
  },
  "direct": {
    "7d": {
      adSpend: 0,
      roas: 0,
      reach: 4820,
      engagementRate: 12.4,
      socialPerformance: [
        { date: "Apr 20", reach: 680, engagement: 84, clicks: 42 },
        { date: "Apr 21", reach: 720, engagement: 89, clicks: 46 },
        { date: "Apr 22", reach: 660, engagement: 82, clicks: 40 },
        { date: "Apr 23", reach: 740, engagement: 92, clicks: 48 },
        { date: "Apr 24", reach: 760, engagement: 94, clicks: 50 },
        { date: "Apr 25", reach: 700, engagement: 87, clicks: 44 },
        { date: "Apr 26", reach: 560, engagement: 69, clicks: 34 },
      ],
      paidCampaigns: [],
    },
    "30d": {
      adSpend: 0,
      roas: 0,
      reach: 18600,
      engagementRate: 12.4,
      socialPerformance: [
        { date: "Week 1", reach: 3800, engagement: 471, clicks: 240 },
        { date: "Week 2", reach: 4400, engagement: 545, clicks: 278 },
        { date: "Week 3", reach: 4200, engagement: 521, clicks: 266 },
        { date: "Week 4", reach: 5000, engagement: 620, clicks: 316 },
      ],
      paidCampaigns: [],
    },
    "90d": {
      adSpend: 0,
      roas: 0,
      reach: 64200,
      engagementRate: 13.2,
      socialPerformance: [
        { date: "Jan", reach: 17800, engagement: 2349, clicks: 1068 },
        { date: "Feb", reach: 20400, engagement: 2693, clicks: 1224 },
        { date: "Mar", reach: 24200, engagement: 3194, clicks: 1452 },
      ],
      paidCampaigns: [],
    },
  },
};

// Visual content with actual images
const visualContentFeed = [
  {
    id: 1,
    platform: "Instagram",
    type: "Reel",
    caption: "Spring dress styling — 3 ways to wear our bestselling midi dress 🌸",
    likes: 2840,
    comments: 186,
    shares: 94,
    date: "2 hours ago",
    image: contentImg1,
  },
  {
    id: 2,
    platform: "TikTok",
    type: "Video",
    caption: "Behind the scenes from our spring photoshoot ✨ #fashionbehindthescenes",
    likes: 5620,
    comments: 342,
    shares: 218,
    date: "4 hours ago",
    image: contentImg2,
  },
  {
    id: 3,
    platform: "Instagram",
    type: "Post",
    caption: "Customer love 💕 Featuring @sarahm_style in our cashmere sweater",
    likes: 1980,
    comments: 124,
    shares: 68,
    date: "8 hours ago",
    image: contentImg3,
  },
  {
    id: 4,
    platform: "Instagram",
    type: "Story",
    caption: "New arrivals dropping tonight at 8pm EST 🎉",
    likes: 840,
    comments: 42,
    shares: 28,
    date: "12 hours ago",
    image: contentImg4,
  },
  {
    id: 5,
    platform: "TikTok",
    type: "Video",
    caption: "Sustainable fashion haul — all organic materials 🌿",
    likes: 3420,
    comments: 268,
    shares: 142,
    date: "1 day ago",
    image: contentImg5,
  },
  {
    id: 6,
    platform: "Instagram",
    type: "Carousel",
    caption: "Easter outfit inspiration — swipe for 5 complete looks →",
    likes: 4280,
    comments: 312,
    shares: 186,
    date: "1 day ago",
    image: contentImg6,
  },
];

// AI Insights
const aiInsights = {
  marketing: {
    title: "Marketing Performance Deep Dive",
    overview: "Your TikTok engagement rate is 2.8x higher than Instagram, but you're allocating 70% of budget to Meta. Recommendation: shift $1,200/week to TikTok creative testing. Your UGC conte[...]",
    details: [
      {
        finding: "TikTok Opportunity Gap",
        impact: "High - Underutilized high-performing channel",
        description: "TikTok delivers 8.4% engagement rate vs 3.2% on Instagram, yet receives only 22% of paid budget. Cost per engagement on TikTok is $0.08 vs $0.24 on Meta.",
        recommendation: "Increase TikTok budget from $2.8K to $4.2K monthly. Focus on short-form video content featuring product styling and customer testimonials. Test native TikTok creators for[...]",
      },
      {
        finding: "UGC Content Performance",
        impact: "Critical - Content strategy optimisation",
        description: "User-generated content drives 42% higher engagement and 3.2x more saves than professional photoshoots. Customer testimonial videos generate 2.8x more conversions.",
        recommendation: "Launch customer content program: incentivize photo/video submissions with discount codes. Feature 3-4 customer posts weekly. Create dedicated #FemmeConnection hashtag cam[...]",
      },
      {
        finding: "Email Marketing Excellence",
        impact: "Positive - Strong performing channel",
        description: "Email achieves 12.4x ROAS, highest of all channels. 24.6% engagement rate with segmented campaigns outperforming broadcasts by 4.1x.",
        recommendation: "Maintain email as core channel. Expand segmentation to 8 groups. Increase send frequency for VIP segment from weekly to 3x/week with personalized product recommendations.[...]",
      },
    ],
    recommendations: [
      "Shift $1.2K/week from Meta to TikTok for creative testing (month 1)",
      "Launch UGC incentive program with 15% discount for featured submissions",
      "Expand TikTok content from 2x/week to daily posts with mix of brand and creator content",
      "Increase email segmentation and test AI-powered product recommendations",
      "Reduce Instagram Stories spend by 30%, reallocate to TikTok and email",
    ],
  },
  campaigns: {
    title: "Campaign Optimisation Insights",
    overview: "Retargeting campaigns deliver 6.8x ROAS vs 3.8x for cold traffic. Easter campaign window is April 5-12. Suggested budget: $8,400 (split 45% Meta retargeting, 35% TikTok, 20% email)[...]",
    details: [
      {
        finding: "Retargeting Performance Gap",
        impact: "Critical - Budget allocation inefficiency",
        description: "Retargeting campaigns achieve 6.8x ROAS with $3,400 spend while cold acquisition at 3.8x ROAS gets $6,200 spend. Retargeting audiences are underfunded by ~45%.",
        recommendation: "Increase retargeting budget to $6,000/month. Expand retargeting pools: website visitors (30 days), cart abandoners, product viewers. Test sequential retargeting with prog[...]",
      },
      {
        finding: "Seasonal Campaign Timing",
        impact: "High - Time-sensitive opportunity",
        description: "Historical data shows Easter shopping peaks April 5-12. Early campaign launches (3 weeks prior) drive 38% higher ROAS than last-minute campaigns.",
        recommendation: "Launch Easter teaser campaign April 1-4 with early-bird discount. Main campaign April 5-12 with daily content drops. Allocate $8,400 total budget with heavy retargeting f[...]",
      },
      {
        finding: "Creative Performance Patterns",
        impact: "Medium - Creative optimisation needed",
        description: "Video ads outperform static images by 2.4x. Carousel ads showing outfit combinations drive 1.8x higher add-to-cart rate. Pastel color palettes generate 32% more engagement i[...]",
        recommendation: "Shift creative mix to 70% video, 20% carousel, 10% static. Focus Easter campaign on pastel tones, spring florals, outfit inspiration. Minimum 15 unique creatives to comba[...]",
      },
    ],
    recommendations: [
      "Increase retargeting budget from $3.4K to $6K monthly starting immediately",
      "Launch Easter teaser campaign April 1 with $2K budget and 15% early-bird offer",
      "Main Easter campaign $8.4K: 45% Meta retargeting, 35% TikTok, 20% email blasts",
      "Create 15+ video and carousel creatives with spring/pastel theme",
      "Set up sequential retargeting: day 1 reminder, day 3 social proof, day 7 discount",
    ],
  },
  social: {
    title: "Social Media Content Strategy",
    overview: "Organic social generates 108K reach with 8.2% engagement rate, outperforming paid social's 4.8%. Content featuring customer styling receives 3.1x more engagement than brand lifesty[...]",
    details: [
      {
        finding: "Content Format Performance",
        impact: "High - Reach and engagement optimisation",
        description: "Instagram Reels average 42K reach vs 10K for feed posts. TikTok videos generate 68K average reach with 12.4% engagement. Stories have lowest reach (8K) but highest conversio[...]",
        recommendation: "Shift content strategy: 60% Reels/TikTok, 25% feed posts, 15% Stories. Maintain Stories for product launches and flash sales due to high conversion despite lower reach.",
      },
      {
        finding: "Content Theme Analysis",
        impact: "Critical - Content strategy direction",
        description: "Top performing content: customer styling (3.1x avg engagement), behind-the-scenes (2.6x), sustainable fashion education (2.2x). Product-only shots underperform by 42%.",
        recommendation: "Restructure content calendar: 40% customer features/UGC, 30% styling tips/education, 20% behind-the-scenes, 10% product showcases. Eliminate standalone product shots.",
      },
      {
        finding: "Posting Cadence Optimisation",
        impact: "Medium - Consistency and algorithm performance",
        description: "Daily posting on Instagram drives 38% more reach than 3x/week. TikTok algorithm rewards 2x daily posting with 2.4x reach increase. Best posting times: 11am, 2pm, 7pm EST.",
        recommendation: "Increase posting frequency: Instagram 1x daily (Reels), TikTok 2x daily, Stories 3-5x daily. Schedule for peak engagement times. Use content batching for sustainability.[...]",
      },
    ],
    recommendations: [
      "Transition to 60% Reels/TikTok video content (currently 35%)",
      "Launch weekly customer feature series — incentivize submissions with product credits",
      "Increase posting frequency: Instagram daily, TikTok 2x daily, Stories 3-5x daily",
      "Create content batching system: shoot 15-20 pieces per session for 2-week supply",
      "Focus themes: customer styling, sustainable fashion education, BTS content",
    ],
  },
};

export default function MarketingDashboard() {
  const [selectedChannel, setSelectedChannel] = useState<Channel>("all");
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>("30d");
  const [showMarketingInsight, setShowMarketingInsight] = useState(false);
  const [showCampaignInsight, setShowCampaignInsight] = useState(false);
  const [showSocialInsight, setShowSocialInsight] = useState(false);
  const [showSilverBulletBrief, setShowSilverBulletBrief] = useState(false);
  const [showLowHangingFruitBrief, setShowLowHangingFruitBrief] = useState(false);

  // Action Strip Data
  const actionStripData: ActionStripData = {
    silverBullet: {
      action: "Shift $1,200/week from Meta to TikTok for creative testing",
      impactLine: "Estimated: +$4,800 monthly revenue at 3.8x ROAS",
      channel: "TikTok · Paid Social"
    },
    lowHangingFruit: {
      action: "Launch customer UGC incentive program with 15% discount code",
      effortChip: "Easy · 3 days",
      impact: "+42% engagement rate · 3.1x higher than studio content",
      channelChip: "Instagram + TikTok · Organic"
    },
    frameworkTasks: [
      { task: "Easter campaign launch (Apr 5-12)", status: "Planned" },
      { task: "TikTok content calendar expansion", status: "In Progress" },
      { task: "Meta retargeting budget reallocation", status: "On Track" }
    ]
  };

  const silverBulletBrief: DetailedBriefData = {
    title: "TikTok Budget Reallocation Strategy",
    category: "Silver Bullet · Paid Social",
    overview: "Meta ad performance has plateaued with CPM at $18.40 (target $14.50) and declining ROAS. TikTok shows stronger engagement rates (4.2% vs Meta's 2.1%) and younger audience alignment[...]",
    goals: [
      "Reallocate $1,200 weekly budget from Meta to TikTok for 8-week creative testing period",
      "Achieve 3.8x ROAS on TikTok (vs current Meta 2.4x) generating +$4,800 monthly revenue",
      "Reduce overall CPM from $18.40 to $14.50 through TikTok's lower competition",
      "Build library of 20+ high-performing TikTok creatives for ongoing campaign use"
    ],
    detailedBrief: {
      challenge: "Meta CPM has increased 42% YoY while ROAS declined from 3.2x to 2.4x. Platform saturation, iOS14 targeting limitations, and creative fatigue are driving diminishing returns. Tik[...]",
      approach: "Phase 1 (Weeks 1-4): Redirect $1,200/week from Meta carousel ads (lowest ROAS at 1.8x) to TikTok spark ads featuring top-performing UGC content. Test 3 creative formats: product [...]",
      timeline: "8 weeks (4-week test + 4-week scale)",
      budget: "$9,600 total ($1,200/week for 8 weeks)"
    },
    nextSteps: [
      {
        step: "TikTok Ads Manager Setup & Creative Production",
        description: "Set up TikTok Business Centre, install pixel, configure conversion tracking. Produce 12 initial video creatives (4 per format type) using existing UGC and product footage. B[...]",
        owner: "Paid Social Manager"
      },
      {
        step: "Meta Budget Reallocation",
        description: "Reduce Meta carousel ad spend by $1,200/week. Maintain retargeting campaigns (these have 4.2x ROAS). Pause underperforming prospecting campaigns. Set up daily budget monitor[...]",
        owner: "Performance Marketing Lead"
      },
      {
        step: "Launch TikTok Test Campaigns",
        description: "Launch 3 ad groups ($400/week each) testing product showcases, styling tutorials, and behind-the-scenes content. Target women 25-45, interests: fashion, sustainable living, [...]",
        owner: "Social Media Manager"
      },
      {
        step: "Performance Monitoring & Optimisation",
        description: "Daily monitoring of TikTok ROAS, CPM, and engagement metrics. Weekly creative refresh based on performance data. After 4 weeks, analyse results and scale winning formats or [...]",
        owner: "Analytics Team"
      }
    ],
    potentialOutcomes: {
      bestCase: "+$6,200/month revenue, 4.5x ROAS, $12 CPM",
      expected: "+$4,800/month revenue, 3.8x ROAS, $14.50 CPM",
      metrics: [
        "TikTok ROAS vs Meta ROAS",
        "Cost per acquisition (CPA)",
        "Cost per thousand impressions (CPM)",
        "Video view rate",
        "Click-through rate (CTR)",
        "New customer acquisition rate"
      ]
    }
  };

  const lowHangingFruitBrief: DetailedBriefData = {
    title: "User-Generated Content Incentive Program",
    category: "Low-Hanging Fruit · Organic Social",
    overview: "Analysis shows UGC posts generate 3.1x higher engagement than studio content (4.8% vs 1.5%) and 2.4x more saves, indicating stronger purchase intent. Customer photos feel more auth[...]",
    goals: [
      "Generate 40+ customer UGC submissions per month through 15% incentive program",
      "Increase organic social engagement rate from 1.5% to 3.2% by featuring authentic customer content",
      "Build evergreen library of 200+ customer photos within 6 months for ongoing marketing use",
      "Drive repeat purchases with 15% discount incentive (estimated 22% redemption rate)"
    ],
    detailedBrief: {
      challenge: "Studio photoshoots cost $2,400/month but generate lower engagement than authentic customer content. Current UGC is sporadic and uncoordinated—customers share organically but y[...]",
      approach: "Create #FemmeConnection hashtag campaign incentivizing customers to share styled outfit photos for 15% off next purchase. Email post-purchase asking customers to share photos wit[...]",
      timeline: "3 days setup + ongoing program",
      budget: "$0 setup, ~$800/month in discount redemptions (estimated 22% redemption on 40 submissions)"
    },
    nextSteps: [
      {
        step: "Program Design & Guidelines",
        description: "Create clear UGC submission guidelines (photo quality, lighting, outfit styling, brand tags). Design branded graphic templates for reposting customer content with proper cre[...]",
        owner: "Social Media Manager"
      },
      {
        step: "Klaviyo Email Flow Setup",
        description: "Build post-purchase email flow (sent 3 days after delivery) inviting customers to share photos with #FemmeConnection for 15% off. Include photo examples, styling tips, and e[...]",
        owner: "Email Marketing Manager"
      },
      {
        step: "Instagram & TikTok Campaign Launch",
        description: "Announce program via Instagram Stories, feed post, and TikTok video showing examples of customer styling. Create Story highlight for ongoing submissions. Set up monitoring f[...]",
        owner: "Content Creator"
      },
      {
        step: "Content Curation & Repurposing",
        description: "Weekly review of UGC submissions, select best content for reposting, request usage permission from customers. Feature 5-7 customer photos weekly on Instagram and TikTok. Cre[...]",
        owner: "Social Media Coordinator"
      }
    ],
    potentialOutcomes: {
      bestCase: "50+ submissions/month, 4.2% engagement rate, $1,800 repeat purchase revenue from discount redemptions",
      expected: "40+ submissions/month, 3.2% engagement rate, $1,200 repeat purchase revenue",
      metrics: [
        "Monthly UGC submissions",
        "Organic engagement rate (likes, comments, saves)",
        "Hashtag reach and impressions",
        "Discount code redemption rate",
        "Repeat purchase rate from participants",
        "Content library growth (total approved photos)"
      ]
    }
  };

  // Get current data based on selected filters
  const currentData = useMemo(() => {
    return channelData[selectedChannel][selectedDateRange];
  }, [selectedChannel, selectedDateRange]);

  const channels = [
    { id: "all" as Channel, label: "All Channels", color: "var(--pink)" },
    { id: "organic-social" as Channel, label: "Organic Social", color: "var(--green)" },
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

  const contentPosts = [
    {
      title: "Silk Dress Styling Video",
      platform: "Instagram",
      date: "Mar 28",
      engagement: 3420,
      reach: 42800,
    },
    {
      title: "Customer Testimonial — Sarah M.",
      platform: "Instagram",
      date: "Mar 26",
      engagement: 2180,
      reach: 28600,
    },
    {
      title: "Behind the Scenes: Photoshoot",
      platform: "TikTok",
      date: "Mar 24",
      engagement: 5640,
      reach: 68200,
    },
    {
      title: "Spring Collection Teaser",
      platform: "Instagram",
      date: "Mar 22",
      engagement: 4890,
      reach: 56400,
    },
  ];

  return (
    <div>
      <PageHeader
        label="Channels · Marketing"
        title="Marketing Intelligence"
        description="Unified performance across Meta, TikTok, Instagram, and organic social. Track paid campaigns, organic reach, and content performance in one view."
        backgroundGradient="pink"
        image={marketingHero}
        externalLinks={[
          { name: "Meta Business", url: "https://business.facebook.com" },
          { name: "Sprout Social", url: "https://sproutsocial.com" },
        ]}
        stats={[
          { label: "Ad Spend", value: `$${(currentData.adSpend / 1000).toFixed(1)}K` },
          { label: "ROAS", value: currentData.roas > 0 ? `${currentData.roas}x` : "N/A" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        {/* AI Widget */}
        <AIWidget
          insightLabel="Marketing Intelligence"
          insightText="TikTok engagement is 2.8x higher than Instagram (8.4% vs 3.2%), yet receives only 22% of paid budget. UGC content drives 42% higher engagement than studio content. Recommen[...]"
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
                      ? "bg-[var(--pink)] text-white shadow-sm"
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
          <Tag variant="pink">{getChannelLabel()}</Tag>
          <span className="text-[var(--text-tertiary)]">·</span>
          <Tag variant="buff">{dateRanges.find(r => r.id === selectedDateRange)?.label}</Tag>
        </div>

        <StatGrid columns={4}>
          <MetricCard
            label="Total Ad Spend"
            value={`$${currentData.adSpend.toLocaleString()}`}
            change="+6.2%"
            changeType="neutral"
            trend="up"
          />
          <MetricCard
            label="Blended ROAS"
            value={currentData.roas > 0 ? `${currentData.roas}x` : "N/A"}
            change="+0.6x"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Social Reach"
            value={`${(currentData.reach / 1000).toFixed(1)}K`}
            change="+18.3%"
            changeType="positive"
            trend="up"
          />
          <MetricCard
            label="Engagement Rate"
            value={`${currentData.engagementRate}%`}
            change="+1.2%"
            changeType="positive"
            trend="up"
          />
        </StatGrid>

        {/* AI Insights */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--pink)]" />
              <CardTitle>AI Marketing Insight</CardTitle>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
              Your TikTok engagement rate is 2.8x higher than Instagram, but you're allocating 70% of budget to Meta. Recommendation: shift $1,200/week to TikTok creative testing. Your UGC conten[...]
            </p>
            <button
              onClick={() => setShowMarketingInsight(true)}
              className="w-full px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2[...]"
            >
              <Sparkles className="w-4 h-4" />
              Deep Dive: Marketing Strategy
            </button>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--terra)]" />
              <CardTitle>Campaign Opportunity</CardTitle>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
              Easter campaign launch window is April 5-12. Suggested budget: $8,400 (split 55% Meta, 35% TikTok, 10% Pinterest). Focus creative on pastel tones, spring styling, and limited-time o[...]
            </p>
            <button
              onClick={() => setShowCampaignInsight(true)}
              className="w-full px-4 py-2 bg-[var(--terra)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-[...]"
            >
              <Sparkles className="w-4 h-4" />
              Deep Dive: Campaign Optimisation
            </button>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <ChartContainer
            title={`${getChannelLabel()} - Performance Trends`}
            subtitle="Reach, engagement & clicks"
            tag={{ label: selectedChannel.includes('paid') || selectedChannel === 'google-ads' ? "Paid" : "Organic", variant: "pink" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData.socialPerformance} key={`social-chart-${selectedChannel}-${selectedDateRange}`}>
                <CartesianGrid key={`grid-${selectedChannel}-${selectedDateRange}`} strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis key={`xaxis-${selectedChannel}-${selectedDateRange}`} dataKey="date" stroke="var(--text-tertiary)" style={{ fontSize: "12px" }} />
                <YAxis key={`yaxis-${selectedChannel}-${selectedDateRange}`} stroke="var(--text-tertiary)" style={{ fontSize: "12px" }} />
                <Tooltip
                  key={`tooltip-${selectedChannel}-${selectedDateRange}`}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "12px",
                  }}
                />
                <Legend key={`legend-${selectedChannel}-${selectedDateRange}`} wrapperStyle={{ fontSize: "12px" }} />
                <Line key={`line-reach-${selectedChannel}-${selectedDateRange}`} type="monotone" dataKey="reach" stroke="var(--pink)" strokeWidth={3} name="Reach" />
                <Line key={`line-engagement-${selectedChannel}-${selectedDateRange}`} type="monotone" dataKey="engagement" stroke="var(--green-mid)" strokeWidth={3} name="Engagement" />
                <Line key={`line-clicks-${selectedChannel}-${selectedDateRange}`} type="monotone" dataKey="clicks" stroke="var(--terra)" strokeWidth={3} name="Clicks" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer
            title="Campaign ROAS Comparison"
            subtitle={dateRanges.find(r => r.id === selectedDateRange)?.label}
            tag={{ label: "Paid Media", variant: "green" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              {currentData.paidCampaigns.length > 0 ? (
                <BarChart data={currentData.paidCampaigns} layout="vertical" key={`roas-chart-${selectedChannel}-${selectedDateRange}`}>
                  <CartesianGrid key={`roas-grid-${selectedChannel}-${selectedDateRange}`} strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis key={`roas-xaxis-${selectedChannel}-${selectedDateRange}`} type="number" stroke="var(--text-tertiary)" style={{ fontSize: "12px" }} />
                  <YAxis key={`roas-yaxis-${selectedChannel}-${selectedDateRange}`} dataKey="name" type="category" width={150} stroke="var(--text-tertiary)" style={{ fontSize: "11px" }} />
                  <Tooltip
                    key={`roas-tooltip-${selectedChannel}-${selectedDateRange}`}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--border-color)",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "12px",
                    }}
                  />
                  <Bar key={`roas-bar-${selectedChannel}-${selectedDateRange}`} dataKey="roas" fill="var(--terra)" name="ROAS" />
                </BarChart>
              ) : (
                <div className="flex items-center justify-center h-full text-[var(--text-tertiary)]">
                  <p className="text-[14px]">No paid campaigns for this channel</p>
                </div>
              )}
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Paid Campaign Performance Table */}
        {currentData.paidCampaigns.length > 0 && (
          <Card>
            <CardTitle>Paid Campaign Performance</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">
              Active campaigns — {dateRanges.find(r => r.id === selectedDateRange)?.label}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="text-left py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                      Campaign
                    </th>
                    <th className="text-center py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                      Platform
                    </th>
                    <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                      Spend
                    </th>
                    <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                      ROAS
                    </th>
                    <th className="text-right py-3 px-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                      Conversions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.paidCampaigns.map((campaign: any, index: number) => (
                    <tr key={index} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--surface)] transition-colors">
                      <td className="py-3 px-4 text-[14px] font-medium text-[var(--text-primary)]">
                        {campaign.name}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Tag variant={campaign.platform === "Meta" ? "pink" : campaign.platform === "Google" ? "buff" : "green"}>
                          {campaign.platform}
                        </Tag>
                      </td>
                      <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                        ${campaign.spend.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {campaign.roas}x
                      </td>
                      <td className="py-3 px-4 text-right text-[14px] text-[var(--text-secondary)]">
                        {campaign.conversions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Top Organic Content & Social Insight */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardTitle>Top Organic Content</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">
              Highest performing posts — Last 7 days
            </p>
            <div className="space-y-4">
              {contentPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-[var(--radius-md)] hover:bg-[var(--border-color)] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--pink-light)] flex items-center justify-center">
                      {post.platform === "Instagram" ? (
                        <Instagram className="w-5 h-5 text-[var(--pink-dark)]" />
                      ) : (
                        <TrendingUp className="w-5 h-5 text-[var(--green)]" />
                      )}
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-[var(--text-primary)]">
                        {post.title}
                      </div>
                      <div className="text-[12px] text-[var(--text-secondary)]">
                        {post.date} • {post.platform}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                        Reach
                      </div>
                      <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {(post.reach / 1000).toFixed(1)}K
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                        Engagement
                      </div>
                      <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                        {(post.engagement / 1000).toFixed(1)}K
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--green)]" />
              <CardTitle>AI Social Content Insight</CardTitle>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
              Organic social generates 108K reach with 8.2% engagement rate, outperforming paid social's 4.8%. Content featuring customer styling receives 3.1x more engagement than brand lifesty[...]
            </p>
            <button
              onClick={() => setShowSocialInsight(true)}
              className="w-full px-4 py-2 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap[...]"
            >
              <Sparkles className="w-4 h-4" />
              Deep Dive: Social Strategy
            </button>
          </Card>
        </div>

        {/* Visual Content Feed */}
        <Card>
          <CardTitle>Visual Content Feed</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">
            Recent posts across all social channels
          </p>
          <div className="grid grid-cols-3 gap-4">
            {visualContentFeed.map((post) => (
              <div
                key={post.id}
                className="group relative border border-[var(--border-color)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--border-strong)] transition-all hover:shadow-lg"
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Tag variant={post.platform === "Instagram" ? "pink" : "green"}>
                      {post.type}
                    </Tag>
                  </div>
                  <div className="absolute top-3 left-3">
                    {post.platform === "Instagram" ? (
                      <Instagram className="w-6 h-6 text-white drop-shadow-lg" />
                    ) : (
                      <TrendingUp className="w-6 h-6 text-white drop-shadow-lg" />
                    )}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4">
                  <p className="text-[13px] text-[var(--text-primary)] mb-3 line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>

                  {/* Engagement Metrics */}
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-tertiary)] mb-3">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" />
                      <span>{(post.likes / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{post.shares}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                    {post.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
        show={showMarketingInsight}
        onClose={() => setShowMarketingInsight(false)}
        insight={aiInsights.marketing}
        icon={<Target className="w-6 h-6 text-[var(--pink)]" />}
        color="var(--pink)"
      />
      <InsightModal
        show={showCampaignInsight}
        onClose={() => setShowCampaignInsight(false)}
        insight={aiInsights.campaigns}
        icon={<Zap className="w-6 h-6 text-[var(--terra)]" />}
        color="var(--terra)"
      />
      <InsightModal
        show={showSocialInsight}
        onClose={() => setShowSocialInsight(false)}
        insight={aiInsights.social}
        icon={<Users className="w-6 h-6 text-[var(--green)]" />}
        color="var(--green)"
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
              <p className="text-[13px] text-[var(--text-secondary)]">Marketing Performance Analysis</p>
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
