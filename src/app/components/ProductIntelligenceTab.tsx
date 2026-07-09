import { Card, CardTitle, MetricCard, AIInsightCard, Tag } from "./ui/Card";
import { StatGrid } from "./ui/Filters";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
const femme1 = "https://placehold.co/750x750?text=femme1";
const femme2 = "https://placehold.co/750x750?text=femme2";
const femme3 = "https://placehold.co/750x750?text=femme3";
const femme4 = "https://placehold.co/750x750?text=femme4";
const reformation1 = "https://placehold.co/750x750?text=reformation1";
const reformation2 = "https://placehold.co/750x750?text=reformation2";
const reformation4 = "https://placehold.co/750x750?text=reformation4";
const sezane1 = "https://placehold.co/750x750?text=sezane1";
const sezane2 = "https://placehold.co/750x750?text=sezane2";
const sezane3 = "https://placehold.co/750x750?text=sezane3";
const sezane4 = "https://placehold.co/750x750?text=sezane4";
const sezane5 = "https://placehold.co/750x750?text=sezane5";

interface ProductIntelligenceTabProps {
  setShowProductModal: (show: boolean) => void;
}

export default function ProductIntelligenceTab({ setShowProductModal }: ProductIntelligenceTabProps) {
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

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          label="Tracked Competitors"
          value="20"
          change="15 AU + 5 Intl"
          changeType="neutral"
        />
        <MetricCard
          label="Total SKUs Monitored"
          value="39,472"
          change="+2,847 this month"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="Avg Market Discount"
          value="13.8%"
          change="vs FC 16.2%"
          changeType="neutral"
        />
        <MetricCard
          label="New Launches (30d)"
          value="777"
          change="Across all competitors"
          changeType="positive"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <AIInsightCard
          title="Product Intelligence Summary"
          content="Monitoring 20 competitors (15 AU direct, 5 international premium) across 39,472 SKUs. Key insight: AU fast fashion (Princess Polly, Showpo, White Fox) dominate $50-90 range with high velocity + 18-25% discounting. International premium (Sézane, Reformation) command $150-200 with minimal discounting (0-7%). Your $69-89 positioning competes in crowded mid-tier. Opportunity: $100-150 gap where only 8 FC SKUs vs 4,775 competitor SKUs."
          cta={{ label: "View Full Analysis", onClick: () => setShowProductModal(true) }}
        />
        <AIInsightCard
          title="Strategic Category Gaps"
          content="Critical gaps identified: Activewear (-68% vs competitors, +52% growth), Outerwear (-34%, +42% growth), Accessories (-48%, +38% growth). Princess Polly launching 84 SKUs/month in dresses alone. Zara velocity: 156 new SKUs/month across categories. Recommendation: prioritize Activewear entry (high growth, low saturation), expand Outerwear 3x current count, test Accessories with quick-turn basics."
          variant="accent"
          cta={{ label: "View Category Analysis", onClick: () => setShowProductModal(true) }}
        />
      </div>

      {/* Competitor Overview Table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <CardTitle>Competitor Overview — All 20 Brands</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)] mt-1">Real-time SKU tracking · Pricing · Stock · Velocity · New launches</p>
          </div>
          <div className="flex items-center gap-2">
            <Tag variant="terra">5 International</Tag>
            <Tag variant="green">15 Australian</Tag>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[var(--border-color)]">
              <tr className="text-left">
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>BRAND</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>REGION</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>SKUs</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>AVG PRICE</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>DISCOUNT</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>VELOCITY</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>NEW (30d)</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>STOCK %</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)] text-center" style={{ fontFamily: "var(--font-mono)" }}>TREND</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((comp, idx) => (
                <tr
                  key={comp.id}
                  className={`border-b border-[var(--border-color)] hover:bg-[var(--surface)] cursor-pointer transition-colors ${idx < 5 ? 'bg-[var(--terra-light)]' : ''}`}
                >
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="text-[14px] font-medium text-[var(--text-primary)]">{comp.name}</div>
                      {idx < 5 && <Tag variant="terra" size="xs">INTL</Tag>}
                    </div>
                  </td>
                  <td className="py-3 text-[13px] text-[var(--text-secondary)]">{comp.region}</td>
                  <td className="py-3 text-[14px] font-medium text-[var(--text-primary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>{comp.skus.toLocaleString()}</td>
                  <td className="py-3 text-[14px] font-medium text-[var(--text-primary)] text-right">{comp.avgPrice}</td>
                  <td className="py-3 text-right">
                    <span className={`text-[13px] font-medium ${parseInt(comp.discount) > 15 ? 'text-[var(--terra)]' : 'text-[var(--green)]'}`}>
                      {comp.discount}
                    </span>
                  </td>
                  <td className="py-3">
                    <Tag
                      variant={comp.velocity === "Very High" ? "pink" : comp.velocity === "High" ? "green" : "default"}
                      size="sm"
                    >
                      {comp.velocity}
                    </Tag>
                  </td>
                  <td className="py-3 text-[14px] font-medium text-[var(--pink)] text-right" style={{ fontFamily: "var(--font-mono)" }}>{comp.newLaunches}</td>
                  <td className="py-3 text-[14px] text-[var(--text-secondary)] text-right">{comp.stock}%</td>
                  <td className="py-3 text-center">
                    {comp.trend === "up" && <TrendingUp className="w-4 h-4 text-[var(--green)] mx-auto" />}
                    {comp.trend === "flat" && <div className="w-4 h-0.5 bg-[var(--text-tertiary)] mx-auto" />}
                    {comp.trend === "down" && <TrendingDown className="w-4 h-4 text-[var(--terra)] mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Price Band Analysis */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardTitle>Price Band Analysis</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">SKU distribution, discounting patterns, and margin potential by price range</p>
          <div className="space-y-4">
            {priceBandData.map((band, idx) => (
              <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[16px] font-medium" style={{ fontFamily: "var(--font-serif)" }}>{band.range}</div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Margin: {band.margin}</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>COMPETITOR SKUs</div>
                    <div className="text-[18px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{band.competitors.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>FEMME SKUs</div>
                    <div className="text-[18px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{band.femme}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>AVG DISCOUNT</div>
                    <div className="text-[18px] font-bold text-[var(--terra)]" style={{ fontFamily: "var(--font-mono)" }}>{band.avgDiscount}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>VELOCITY</div>
                    <Tag variant={band.velocity === "Very High" ? "pink" : band.velocity === "High" ? "green" : "default"} size="sm">
                      {band.velocity}
                    </Tag>
                  </div>
                </div>
                <div className="h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                  <div className="h-full flex">
                    <div className="bg-[var(--pink)]" style={{ width: `${(band.femme / (band.competitors + band.femme)) * 100}%` }} />
                    <div className="bg-[var(--green-mid)]" style={{ width: `${(band.competitors / (band.competitors + band.femme)) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Category Gap Analysis</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">SKU count vs competitors · Growth rates · Opportunity assessment</p>
          <div className="space-y-4">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[15px] font-medium">{cat.category}</div>
                  <Tag variant={cat.opportunity === "Very High" ? "pink" : cat.opportunity === "High" ? "green" : "default"} size="sm">
                    {cat.opportunity}
                  </Tag>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>FC SKUs</div>
                    <div className="text-[16px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{cat.femme}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>COMP SKUs</div>
                    <div className="text-[16px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{cat.competitors}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>GAP</div>
                    <div className="text-[16px] font-bold text-[var(--terra)]" style={{ fontFamily: "var(--font-mono)" }}>{cat.gap}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>GROWTH</div>
                    <div className="text-[16px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{cat.growth}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* New Launches Tracking */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <CardTitle>New Product Launches — Last 30 Days</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)] mt-1">777 total new SKUs · Category trends · Velocity tracking · Price positioning</p>
          </div>
          <Tag variant="pink">Live Monitoring</Tag>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[var(--border-color)]">
              <tr className="text-left">
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>BRAND</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>LAUNCHES</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>CATEGORY</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>PRICE RANGE</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>VELOCITY</th>
                <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>DAYS LIVE</th>
              </tr>
            </thead>
            <tbody>
              {newLaunches.map((launch, idx) => (
                <tr key={idx} className="border-b border-[var(--border-color)] hover:bg-[var(--surface)] transition-colors">
                  <td className="py-3 text-[14px] font-medium text-[var(--text-primary)]">{launch.brand}</td>
                  <td className="py-3 text-[18px] font-bold text-[var(--pink)] text-right" style={{ fontFamily: "var(--font-mono)" }}>{launch.launches}</td>
                  <td className="py-3 text-[13px] text-[var(--text-secondary)]">{launch.category}</td>
                  <td className="py-3 text-[13px] font-medium text-[var(--text-primary)]">{launch.priceRange}</td>
                  <td className="py-3">
                    <Tag variant={launch.velocity === "Very High" ? "pink" : launch.velocity === "High" ? "green" : "default"} size="sm">
                      {launch.velocity}
                    </Tag>
                  </td>
                  <td className="py-3 text-[13px] text-[var(--text-secondary)] text-right">{launch.daysLive} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Competitor Product Grids */}
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

      {/* Discount Strategy & Bestsellers */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardTitle>Discount Strategy Analysis</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Competitive discounting patterns · Frequency · Full-price ratios</p>
          <div className="space-y-3">
            {discountStrategy.map((strat, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-[var(--border-color)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] transition-colors">
                <div className="flex-1">
                  <div className="text-[14px] font-medium text-[var(--text-primary)] mb-1">{strat.brand}</div>
                  <div className="text-[11px] text-[var(--text-tertiary)]">{strat.frequency} · Deepest: {strat.deepestDiscount}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-[18px] font-bold text-[var(--terra)]" style={{ fontFamily: "var(--font-mono)" }}>{strat.avgDiscount}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Avg Discount</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[18px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{strat.fullPriceRatio}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>Full Price</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Competitor Bestsellers</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Top performing SKUs · Unit sales · Velocity tracking</p>
          <div className="space-y-3">
            {bestsellersByCompetitor.map((best, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-[var(--border-color)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-[14px] font-medium text-[var(--text-primary)]">{best.product}</div>
                    <Tag variant="default" size="xs">{best.category}</Tag>
                  </div>
                  <div className="text-[11px] text-[var(--text-tertiary)]">{best.brand} · {best.daysInStock} days in stock</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-[16px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>{best.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[18px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{best.units}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>units sold</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Strategy Widget */}
      <AIInsightCard
        title="R&D Strategy Recommendation"
        content="Based on bestseller analysis, linen category represents highest-velocity opportunity. Sézane's Max Linen Shirt (6,479 units, $83, 0% discount, 42 days in stock) proves sustained demand at accessible luxury price point. Recommendation for Femme R&D: develop linen capsule collection targeting $85-110 range. Include 3 hero pieces: linen button-down shirt, midi dress, and wide-leg trouser. Launch timing: 8-week development cycle for Spring/Summer delivery. Expected performance: 2,400-3,200 units first 60 days based on competitive velocity benchmarks."
        variant="accent"
        cta={{ label: "Generate Full R&D Brief", onClick: () => setShowProductModal(true) }}
      />

      {/* Stock Alerts */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <CardTitle>Stock Level Alerts</CardTitle>
            <p className="text-[13px] text-[var(--text-secondary)] mt-1">Low stock monitoring · Stockout predictions · Opportunity tracking</p>
          </div>
          <Tag variant="terra">4 Critical Alerts</Tag>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {stockAlerts.map((alert, idx) => (
            <div key={idx} className="border-2 border-[var(--terra)] rounded-[var(--radius-lg)] p-4 bg-[var(--terra-light)]">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-[var(--terra)]" />
                <Tag variant="terra" size="xs">{alert.status}</Tag>
              </div>
              <div className="text-[14px] font-medium text-[var(--text-primary)] mb-1">{alert.brand}</div>
              <div className="text-[13px] text-[var(--text-secondary)] mb-3">{alert.product}</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>STOCK</div>
                  <div className="text-[18px] font-bold text-[var(--terra)]" style={{ fontFamily: "var(--font-mono)" }}>{alert.level}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>STOCKOUT</div>
                  <div className="text-[18px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{alert.daysToStockout}d</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
