// Competitor Intelligence Data - Particl & Panoramata Integration

// PARTICL DATA - Product Intelligence
export interface ProductTracking {
  id: string;
  brand: string;
  sku: string;
  name: string;
  category: string;
  currentPrice: number;
  originalPrice: number;
  discountPercent: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock" | "Pre-Order";
  salesVelocity: "Very High" | "High" | "Medium" | "Low";
  unitsEstimate?: string;
  firstSeen: string;
  lastPriceChange?: string;
  priceHistory: { date: string; price: number }[];
}

export interface CategoryAnalysis {
  category: string;
  femmeSkuCount: number;
  reformationSkuCount: number;
  sezaneSkuCount: number;
  avgPriceFemme: number;
  avgPriceReformation: number;
  avgPriceSezane: number;
  growthTrend: number;
  opportunity: "High" | "Medium" | "Low";
}

export interface PricingIntelligence {
  brand: string;
  avgDiscount: number;
  fullPriceRatio: number;
  priceIncreaseCount30d: number;
  priceDecreaseCount30d: number;
  avgPricePoint: number;
  discountStrategy: string;
}

export interface NewProductLaunch {
  brand: string;
  product: string;
  category: string;
  launchDate: string;
  initialPrice: number;
  currentPrice: number;
  status: "Just Launched" | "Pre-Order" | "Coming Soon";
  performance: "Strong" | "Moderate" | "Weak";
}

// PANORAMATA DATA - Marketing Intelligence
export interface EmailCampaign {
  id: string;
  brand: string;
  subject: string;
  sentDate: string;
  emailType: "Promotional" | "Editorial" | "VIP" | "Abandoned Cart" | "Welcome" | "Seasonal";
  estimatedOpenRate: number;
  subjectLength: number;
  hasEmoji: boolean;
  hasPersonalization: boolean;
  hasUrgency: boolean;
  previewText: string;
  callToAction: string;
}

export interface SocialPost {
  id: string;
  brand: string;
  platform: "Instagram" | "TikTok" | "Pinterest" | "Facebook";
  postType: "Feed" | "Story" | "Reel" | "Pin";
  content: string;
  publishedDate: string;
  estimatedEngagement: number;
  hashtags: string[];
  mentions: string[];
  hasUGC: boolean;
}

export interface PaidAdTracking {
  id: string;
  brand: string;
  platform: "Meta" | "Google" | "TikTok" | "Pinterest";
  adType: "Image" | "Video" | "Carousel" | "Collection";
  headline: string;
  copy: string;
  cta: string;
  firstSeen: string;
  lastSeen: string;
  estimatedSpend: string;
  estimatedImpressions: string;
  estimatedCTR: number;
  creativeTheme: string;
}

export interface InfluencerPartnership {
  brand: string;
  influencerHandle: string;
  followerCount: string;
  platform: "Instagram" | "TikTok" | "YouTube";
  partnershipType: "Sponsored Post" | "Affiliate" | "Brand Ambassador" | "Gifting";
  postDate: string;
  engagement: number;
  reach: string;
}

// MOCK DATA
export const pricingIntelligence: PricingIntelligence[] = [
  {
    brand: "Femme Connection",
    avgDiscount: 14.2,
    fullPriceRatio: 85.8,
    priceIncreaseCount30d: 0,
    priceDecreaseCount30d: 3,
    avgPricePoint: 94.50,
    discountStrategy: "Selective promotional discounting on seasonal items"
  },
  {
    brand: "Sézane",
    avgDiscount: 0,
    fullPriceRatio: 100,
    priceIncreaseCount30d: 4,
    priceDecreaseCount30d: 0,
    avgPricePoint: 142.30,
    discountStrategy: "Zero discount strategy - premium positioning with price increases"
  },
  {
    brand: "Reformation",
    avgDiscount: 7.3,
    fullPriceRatio: 92.7,
    priceIncreaseCount30d: 2,
    priceDecreaseCount30d: 1,
    avgPricePoint: 186.40,
    discountStrategy: "Minimal discounting on slow movers, protect hero products"
  }
];

export const categoryAnalysis: CategoryAnalysis[] = [
  { category: "Dresses", femmeSkuCount: 42, reformationSkuCount: 86, sezaneSkuCount: 74, avgPriceFemme: 89, avgPriceReformation: 198, avgPriceSezane: 168, growthTrend: 12.4, opportunity: "Medium" },
  { category: "Tops", femmeSkuCount: 28, reformationSkuCount: 54, sezaneSkuCount: 96, avgPriceFemme: 64, avgPriceReformation: 98, avgPriceSezane: 92, growthTrend: 8.2, opportunity: "Low" },
  { category: "Bottoms", femmeSkuCount: 18, reformationSkuCount: 38, sezaneSkuCount: 42, avgPriceFemme: 78, avgPriceReformation: 128, avgPriceSezane: 115, growthTrend: 15.6, opportunity: "Medium" },
  { category: "Outerwear", femmeSkuCount: 12, reformationSkuCount: 24, sezaneSkuCount: 38, avgPriceFemme: 124, avgPriceReformation: 248, avgPriceSezane: 212, growthTrend: 22.8, opportunity: "High" },
  { category: "Accessories", femmeSkuCount: 8, reformationSkuCount: 42, sezaneSkuCount: 68, avgPriceFemme: 45, avgPriceReformation: 68, avgPriceSezane: 78, growthTrend: 34.2, opportunity: "High" },
  { category: "Knitwear", femmeSkuCount: 15, reformationSkuCount: 32, sezaneSkuCount: 56, avgPriceFemme: 98, avgPriceReformation: 148, avgPriceSezane: 156, growthTrend: 18.4, opportunity: "High" },
  { category: "Linen", femmeSkuCount: 4, reformationSkuCount: 12, sezaneSkuCount: 38, avgPriceFemme: 72, avgPriceReformation: 118, avgPriceSezane: 108, growthTrend: 340.5, opportunity: "High" },
];

export const newProductLaunches: NewProductLaunch[] = [
  { brand: "Sézane", product: "Spring Linen Collection", category: "Linen", launchDate: "2026-04-20", initialPrice: 108, currentPrice: 108, status: "Just Launched", performance: "Strong" },
  { brand: "Reformation", product: "Sustainable Denim Line", category: "Bottoms", launchDate: "2026-04-18", initialPrice: 168, currentPrice: 168, status: "Just Launched", performance: "Strong" },
  { brand: "Sézane", product: "Leather Accessories", category: "Accessories", launchDate: "2026-04-24", initialPrice: 78, currentPrice: 78, status: "Just Launched", performance: "Very Strong" },
  { brand: "Reformation", product: "Resort Wear Collection", category: "Dresses", launchDate: "2026-05-01", initialPrice: 198, currentPrice: 198, status: "Pre-Order", performance: "Moderate" },
];

export const emailCampaigns: EmailCampaign[] = [
  { id: "em1", brand: "Sézane", subject: "NEW: The Linen Edit — 28 pieces you'll live in", sentDate: "2026-04-26", emailType: "Editorial", estimatedOpenRate: 44.2, subjectLength: 47, hasEmoji: false, hasPersonalization: false, hasUrgency: false, previewText: "Your summer wardrobe starts here...", callToAction: "Shop The Edit" },
  { id: "em2", brand: "Sézane", subject: "✨ VIP Early Access: Spring Collection", sentDate: "2026-04-25", emailType: "VIP", estimatedOpenRate: 52.8, subjectLength: 39, hasEmoji: true, hasPersonalization: true, hasUrgency: true, previewText: "Before anyone else, Marie...", callToAction: "Shop VIP Access" },
  { id: "em3", brand: "Reformation", subject: "Final Hours: Extra 20% off Sale Items", sentDate: "2026-04-24", emailType: "Promotional", estimatedOpenRate: 38.4, subjectLength: 42, hasEmoji: false, hasPersonalization: false, hasUrgency: true, previewText: "Sale ends tonight at midnight", callToAction: "Shop Sale" },
  { id: "em4", brand: "Reformation", subject: "Behind the Seams: Meet Our Artisans", sentDate: "2026-04-23", emailType: "Editorial", estimatedOpenRate: 34.6, subjectLength: 38, hasEmoji: false, hasPersonalization: false, hasUrgency: false, previewText: "Sustainability in action...", callToAction: "Read Story" },
  { id: "em5", brand: "Sézane", subject: "5 ways to style our bestselling midi dress", sentDate: "2026-04-22", emailType: "Editorial", estimatedOpenRate: 31.2, subjectLength: 46, hasEmoji: false, hasPersonalization: false, hasUrgency: false, previewText: "Your styling guide inside", callToAction: "Get Inspired" },
];

export const socialPosts: SocialPost[] = [
  { id: "sp1", brand: "Sézane", platform: "Instagram", postType: "Reel", content: "French girl summer styling", publishedDate: "2026-04-27", estimatedEngagement: 8.4, hashtags: ["#FrenchStyle", "#SummerWardrobe", "#Sezane"], mentions: [], hasUGC: false },
  { id: "sp2", brand: "Reformation", platform: "TikTok", postType: "Reel", content: "Sustainable fashion facts", publishedDate: "2026-04-27", estimatedEngagement: 12.2, hashtags: ["#Sustainability", "#EthicalFashion"], mentions: [], hasUGC: false },
  { id: "sp3", brand: "Sézane", platform: "Instagram", postType: "Story", content: "Behind the scenes: photoshoot", publishedDate: "2026-04-26", estimatedEngagement: 6.8, hashtags: [], mentions: [], hasUGC: false },
  { id: "sp4", brand: "Reformation", platform: "Instagram", postType: "Feed", content: "New dress collection launch", publishedDate: "2026-04-25", estimatedEngagement: 4.6, hashtags: ["#Reformation", "#NewArrivals"], mentions: [], hasUGC: false },
];

export const paidAds: PaidAdTracking[] = [
  { id: "ad1", brand: "Sézane", platform: "Meta", adType: "Carousel", headline: "Discover the Linen Edit", copy: "Timeless pieces for your summer wardrobe. Made from premium European linen.", cta: "Shop Now", firstSeen: "2026-04-20", lastSeen: "Active", estimatedSpend: "$8.2K", estimatedImpressions: "842K", estimatedCTR: 3.4, creativeTheme: "Lifestyle/Editorial" },
  { id: "ad2", brand: "Reformation", platform: "Meta", adType: "Video", headline: "Sustainable Denim, Made Right", copy: "Our new denim line uses 80% less water. Fashion that doesn't cost the earth.", cta: "Learn More", firstSeen: "2026-04-18", lastSeen: "Active", estimatedSpend: "$12.4K", estimatedImpressions: "1.2M", estimatedCTR: 4.2, creativeTheme: "Sustainability Focus" },
  { id: "ad3", brand: "Sézane", platform: "Pinterest", adType: "Pin", headline: "Summer Styling Inspiration", copy: "Get the French girl look with our curated edit", cta: "Get Inspired", firstSeen: "2026-04-22", lastSeen: "Active", estimatedSpend: "$3.8K", estimatedImpressions: "486K", estimatedCTR: 2.8, creativeTheme: "Aspirational/Lifestyle" },
  { id: "ad4", brand: "Reformation", platform: "TikTok", adType: "Video", headline: "Spring Dresses Under $200", copy: "Trending styles at accessible prices", cta: "Shop Collection", firstSeen: "2026-04-24", lastSeen: "Active", estimatedSpend: "$6.2K", estimatedImpressions: "1.4M", estimatedCTR: 5.6, creativeTheme: "Product Showcase" },
];

export const emailFrequency = {
  sezane: { weekly: 3.5, promotional: 38, editorial: 62, vip: 12 },
  reformation: { weekly: 4.8, promotional: 52, editorial: 38, vip: 10 },
  industry: { weekly: 5.2, promotional: 68, editorial: 24, vip: 8 }
};

export const socialFrequency = {
  sezane: { instagram: { daily: 2.1, reels: 45, stories: 35, feed: 20 }, tiktok: { daily: 3.4, engagement: 15.2 } },
  reformation: { instagram: { daily: 1.8, reels: 58, stories: 28, feed: 14 }, tiktok: { daily: 2.8, engagement: 8.7 } }
};

export const adSpendTrends = [
  { month: "Jan", sezane: 34.2, reformation: 42.8 },
  { month: "Feb", sezane: 38.6, reformation: 46.2 },
  { month: "Mar", sezane: 42.4, reformation: 51.6 },
  { month: "Apr", sezane: 48.8, reformation: 58.4 },
];
