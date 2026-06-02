import { X, Palette, TrendingUp, Package, Sparkles, ShoppingBag, Eye } from "lucide-react";

interface ColorTrendModalProps {
  show: boolean;
  onClose: () => void;
}

export function ColorTrendModal({ show, onClose }: ColorTrendModalProps) {
  if (!show) return null;

  const colorTrends = [
    {
      color: "Sage Green",
      hex: "#9CAF88",
      sales: 342,
      trend: "+24%",
      description: "Earthy, calming green with grey undertones. Reflects growing consumer preference for nature-inspired, sustainable aesthetics.",
      seasonality: "Peak: Spring/Summer • Strong performance year-round",
      demographics: "Women 28-42, environmentally conscious, minimalist aesthetic preference",
      applications: [
        "Linen dresses and wide-leg trousers (68% of sales)",
        "Knitted tops and cardigans (22% of sales)",
        "Accessories: tote bags, scarves (10% of sales)",
      ],
      topProducts: [
        { name: "Sage Linen Midi Dress", sku: "SKU-4782", units: 124, revenue: "$18,600" },
        { name: "Wide-Leg Linen Trousers - Sage", sku: "SKU-4801", units: 89, revenue: "$13,350" },
        { name: "Organic Cotton Knit - Sage", sku: "SKU-4756", units: 67, revenue: "$8,040" },
      ],
      marketInsights: "Sage Green aligns with 'quiet luxury' and 'cottagecore' trends. Performs exceptionally on Pinterest (3.2x engagement vs. platform average) and Instagram Reels. Competitor analysis shows 5 similar brands featuring sage as hero colour in Spring/Summer 2027 collections.",
      recommendations: [
        "Expand sage offerings in knitwear category (+32% projected demand)",
        "Test sage in outerwear (current gap in collection)",
        "Consider seasonal variation: deeper sage for Autumn/Winter 2027",
      ],
    },
    {
      color: "Terracotta",
      hex: "#E07A5F",
      sales: 298,
      trend: "+18%",
      description: "Warm, earthy orange-red reminiscent of clay pottery. Evokes Mediterranean warmth and artisanal craftsmanship.",
      seasonality: "Peak: Autumn/Winter • Moderate Spring/Summer performance",
      demographics: "Women 32-48, travel enthusiasts, appreciation for global aesthetics",
      applications: [
        "Dresses and skirts (52% of sales)",
        "Knitwear and sweaters (34% of sales)",
        "Accessories: leather goods, pottery-inspired pieces (14% of sales)",
      ],
      topProducts: [
        { name: "Terracotta Ribbed Midi Dress", sku: "SKU-4821", units: 98, revenue: "$14,700" },
        { name: "Oversized Merino Knit - Terracotta", sku: "SKU-4789", units: 76, revenue: "$11,400" },
        { name: "Linen Blend Skirt - Terracotta", sku: "SKU-4834", units: 54, revenue: "$6,750" },
      ],
      marketInsights: "Terracotta resonates with 'warm minimalism' and 'global nomad' aesthetics. High engagement on lifestyle content featuring travel, natural settings, and artisan goods. Search volume for 'terracotta dress' up 140% YoY.",
      recommendations: [
        "Pair terracotta with cream and olive for curated lookbooks",
        "Feature in heritage/artisan storytelling campaigns",
        "Test terracotta in outerwear: coats, blazers (current market gap)",
      ],
    },
    {
      color: "Cream",
      hex: "#F4F1DE",
      sales: 412,
      trend: "+15%",
      description: "Soft, neutral off-white with warm undertones. Timeless foundation colour that pairs with everything.",
      seasonality: "Strong year-round • Slight peak Spring/Summer",
      demographics: "Broad appeal across all age groups, particularly 25-55",
      applications: [
        "Basics and essentials (45% of sales)",
        "Dresses and tailoring (38% of sales)",
        "Knitwear and loungewear (17% of sales)",
      ],
      topProducts: [
        { name: "Cream Silk Cami", sku: "SKU-4745", units: 156, revenue: "$15,600" },
        { name: "Linen Shirt - Cream", sku: "SKU-4798", units: 132, revenue: "$16,500" },
        { name: "Cashmere Crew Neck - Cream", sku: "SKU-4812", units: 89, revenue: "$17,800" },
      ],
      marketInsights: "Cream is a foundational colour for capsule wardrobes and minimalist aesthetics. Performs as both standalone and layering piece. High repeat purchase rate (42% of cream buyers purchase 2+ cream items).",
      recommendations: [
        "Position cream as 'wardrobe staple' in marketing messaging",
        "Bundle cream basics for higher AOV",
        "Maintain consistent cream tone across collection for mix-and-match appeal",
      ],
    },
    {
      color: "Dusty Blue",
      hex: "#81A4CD",
      sales: 267,
      trend: "+12%",
      description: "Muted, soft blue with grey undertones. Sophisticated alternative to bright blues.",
      seasonality: "Peak: Spring/Summer • Moderate year-round",
      demographics: "Women 30-50, professional contexts, romantic/vintage aesthetic preference",
      applications: [
        "Dresses and blouses (58% of sales)",
        "Tailored pieces: trousers, blazers (28% of sales)",
        "Accessories and scarves (14% of sales)",
      ],
      topProducts: [
        { name: "Dusty Blue Midi Dress", sku: "SKU-4856", units: 87, revenue: "$13,050" },
        { name: "Silk Blouse - Dusty Blue", sku: "SKU-4823", units: 74, revenue: "$11,100" },
        { name: "Wide-Leg Trousers - Dusty Blue", sku: "SKU-4867", units: 62, revenue: "$9,300" },
      ],
      marketInsights: "Dusty Blue appeals to 'quiet elegance' and 'vintage-inspired' shoppers. Performs well in professional/occasion wear contexts. Strong engagement in Pinterest boards featuring 'capsule wardrobe' and 'timeless style'.",
      recommendations: [
        "Position dusty blue for work-to-weekend versatility",
        "Test in occasion wear (currently underdeveloped category)",
        "Feature in styling guides paired with cream and warm taupe",
      ],
    },
    {
      color: "Warm Taupe",
      hex: "#B8A896",
      sales: 389,
      trend: "+8%",
      description: "Neutral brown-beige with warm undertones. Sophisticated alternative to grey, aligns with 'warm neutral' trend.",
      seasonality: "Strong year-round • Peak Autumn/Winter",
      demographics: "Women 30-55, minimalist aesthetic, investment piece buyers",
      applications: [
        "Outerwear and tailoring (48% of sales)",
        "Knitwear (32% of sales)",
        "Basics and layering pieces (20% of sales)",
      ],
      topProducts: [
        { name: "Warm Taupe Wool Coat", sku: "SKU-4901", units: 102, revenue: "$30,600" },
        { name: "Cashmere Cardigan - Warm Taupe", sku: "SKU-4878", units: 94, revenue: "$18,800" },
        { name: "Tailored Trousers - Warm Taupe", sku: "SKU-4889", units: 78, revenue: "$11,700" },
      ],
      marketInsights: "Warm Taupe is the new grey — replacing cooler greys in minimalist wardrobes. High AOV ($187 avg order value). Associated with investment purchases and high-quality materials. Low return rate (3.2% vs. 8.4% site average).",
      recommendations: [
        "Feature warm taupe in premium/investment piece marketing",
        "Expand into accessories: bags, belts, shoes",
        "Emphasise versatility and longevity in product descriptions",
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-lg)] max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[2rem] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
              Trending Colour Palettes
            </h2>
            <p className="text-[13px] text-[var(--text-secondary)]">Deep analysis of top-performing colours • Last 90 days</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="p-6 border-b border-[var(--border-color)] bg-[var(--surface)]">
          <div className="grid grid-cols-5 gap-4">
            {colorTrends.map((color, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white shadow-md" style={{ backgroundColor: color.hex }} />
                <div className="text-[13px] font-medium text-[var(--text-primary)] mb-0.5">{color.color}</div>
                <div className="text-[18px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>{color.trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Colour Analysis */}
        <div className="p-6 space-y-8">
          {colorTrends.map((color, index) => (
            <div key={index} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-6 hover:border-[var(--border-strong)] transition-colors">
              {/* Colour Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-20 h-20 rounded-[var(--radius-md)] border-2 border-white shadow-md flex-shrink-0" style={{ backgroundColor: color.hex }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[22px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {color.color}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="text-[13px] text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-mono)" }}>{color.hex}</div>
                      <div className="px-3 py-1.5 bg-[var(--green-light)] text-[var(--green)] rounded-full text-[13px] font-medium flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {color.trend}
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] text-[var(--text-primary)] mb-2">{color.description}</p>
                  <div className="flex items-center gap-4 text-[12px] text-[var(--text-secondary)]">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {color.sales} units sold
                    </div>
                    <span>•</span>
                    <div>{color.seasonality}</div>
                    <span>•</span>
                    <div>{color.demographics}</div>
                  </div>
                </div>
              </div>

              {/* Applications */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-4 h-4 text-[var(--pink)]" />
                  <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">Product Applications</h4>
                </div>
                <ul className="space-y-1.5">
                  {color.applications.map((app, idx) => (
                    <li key={idx} className="text-[13px] text-[var(--text-primary)] flex items-start gap-2">
                      <span className="text-[var(--pink)] flex-shrink-0 mt-1">•</span>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Products */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[var(--green)]" />
                  <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">Top Performing Products</h4>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {color.topProducts.map((product, idx) => (
                    <div key={idx} className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                      <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">{product.name}</div>
                      <div className="text-[11px] text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>{product.sku}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-[var(--text-secondary)]">{product.units} units</span>
                        <span className="text-[13px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {product.revenue}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Insights */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-[var(--buff-dark)]" />
                  <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">Market Insights</h4>
                </div>
                <p className="text-[13px] text-[var(--text-primary)] leading-relaxed p-3 bg-[var(--buff-light)] rounded-[var(--radius-md)]">
                  {color.marketInsights}
                </p>
              </div>

              {/* Recommendations */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[var(--terra)]" />
                  <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">Strategic Recommendations</h4>
                </div>
                <ul className="space-y-2">
                  {color.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[13px] text-[var(--text-primary)]">
                      <div className="w-5 h-5 rounded-full bg-[var(--terra-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] font-medium text-[var(--terra)]">{idx + 1}</span>
                      </div>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[var(--border-color)] p-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[15px] font-medium"
          >
            Close Trend Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
