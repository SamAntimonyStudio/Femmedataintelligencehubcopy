import { Card, CardTitle, MetricCard, AIInsightCard, Tag } from "./ui/Card";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Target, Video, Image as ImageIcon, Layers, Users, DollarSign, Calendar, Sparkles, ChevronDown, ChevronUp, Play } from "lucide-react";
import { useState } from "react";

interface MetaIntelligenceTabProps {
  setShowMetaModal: (show: boolean) => void;
}

export default function MetaIntelligenceTab({ setShowMetaModal }: MetaIntelligenceTabProps) {
  const [expandedAd, setExpandedAd] = useState<number | null>(null);

  // Competitor Meta Ad Overview (Panoramata tracking)
  const competitorAdMetrics = [
    { brand: "Zimmermann", activeAds: 24, totalTracked: 142, videoAds: 18, imageAds: 6, carouselAds: 12, estSpend: "$48K/mo", avgDuration: "28 days", platforms: "FB 40% / IG 60%" },
    { brand: "Blue Illusion", activeAds: 8, totalTracked: 64, videoAds: 3, imageAds: 5, carouselAds: 4, estSpend: "$12K/mo", avgDuration: "42 days", platforms: "FB 65% / IG 35%" },
    { brand: "Decjuba", activeAds: 18, totalTracked: 128, videoAds: 12, imageAds: 6, carouselAds: 8, estSpend: "$24K/mo", avgDuration: "21 days", platforms: "FB 45% / IG 55%" },
    { brand: "Zara", activeAds: 64, totalTracked: 487, videoAds: 42, imageAds: 22, carouselAds: 28, estSpend: "$186K/mo", avgDuration: "14 days", platforms: "FB 35% / IG 65%" },
    { brand: "H&M", activeAds: 84, totalTracked: 624, videoAds: 56, imageAds: 28, carouselAds: 38, estSpend: "$248K/mo", avgDuration: "12 days", platforms: "FB 40% / IG 60%" },
    { brand: "St Frock", activeAds: 12, totalTracked: 86, videoAds: 4, imageAds: 8, carouselAds: 6, estSpend: "$8K/mo", avgDuration: "35 days", platforms: "FB 55% / IG 45%" },
    { brand: "Femme Connection", activeAds: 6, totalTracked: 48, videoAds: 2, imageAds: 4, carouselAds: 3, estSpend: "$6K/mo", avgDuration: "45 days", platforms: "FB 60% / IG 40%" },
  ];

  // Ad Format Distribution
  const adFormatData = [
    { format: "Video", count: 137, avgEngagement: 4.8, costPerClick: "$1.24" },
    { format: "Image", count: 79, avgEngagement: 3.2, costPerClick: "$0.86" },
    { format: "Carousel", count: 99, avgEngagement: 5.4, costPerClick: "$1.42" },
    { format: "Collection", count: 24, avgEngagement: 6.2, costPerClick: "$1.68" },
  ];

  // Ad format pie chart data
  const formatPieData = [
    { name: "Video", value: 40, color: "var(--green)" },
    { name: "Carousel", value: 29, color: "var(--pink)" },
    { name: "Image", value: 23, color: "var(--terra)" },
    { name: "Collection", value: 8, color: "var(--buff-dark)" },
  ];

  // Campaign Performance Benchmarks
  const campaignBenchmarks = [
    { metric: "CTR (Click-Through Rate)", femme: "1.2%", industry: "1.8%", topPerformer: "Zimmermann: 2.4%", gap: "-33%" },
    { metric: "Engagement Rate", femme: "2.8%", industry: "3.6%", topPerformer: "Blue Illusion: 4.8%", gap: "-22%" },
    { metric: "CPC (Cost Per Click)", femme: "$1.45", industry: "$1.18", topPerformer: "H&M: $0.86", gap: "+23%" },
    { metric: "Video Completion Rate", femme: "42%", industry: "58%", topPerformer: "Zara: 68%", gap: "-28%" },
    { metric: "Conversion Rate", femme: "1.8%", industry: "2.4%", topPerformer: "Decjuba: 3.2%", gap: "-25%" },
  ];

  // Ad Creative Themes
  const creativeThemes = [
    { theme: "Product-Only", usage: "38%", avgCTR: "1.4%", brands: "Zara, H&M" },
    { theme: "Lifestyle/Editorial", usage: "28%", avgCTR: "2.2%", brands: "Zimmermann, Blue Illusion" },
    { theme: "UGC/Customer Photos", usage: "18%", avgCTR: "2.8%", brands: "Decjuba, St Frock" },
    { theme: "Behind-the-Scenes", usage: "12%", avgCTR: "2.4%", brands: "Zimmermann" },
    { theme: "Promotional/Sale", usage: "24%", avgCTR: "1.8%", brands: "H&M, St Frock" },
  ];

  // Audience Targeting Insights
  const targetingStrategies = [
    { brand: "Zimmermann", ageRange: "25-45", interests: "Luxury Fashion, Art, Travel", lookalike: "Yes (3%)", retargeting: "Advanced", customAudiences: 12 },
    { brand: "Blue Illusion", ageRange: "45-65", interests: "Premium Fashion, Design, Lifestyle", lookalike: "Yes (5%)", retargeting: "Moderate", customAudiences: 8 },
    { brand: "Zara", ageRange: "18-35", interests: "Fast Fashion, Trends, Style", lookalike: "Yes (2%)", retargeting: "Advanced", customAudiences: 24 },
    { brand: "H&M", ageRange: "16-34", interests: "Affordable Fashion, Music, Pop Culture", lookalike: "Yes (1%)", retargeting: "Advanced", customAudiences: 32 },
    { brand: "Decjuba", ageRange: "25-40", interests: "Australian Fashion, Lifestyle", lookalike: "Yes (4%)", retargeting: "Moderate", customAudiences: 10 },
    { brand: "Femme Connection", ageRange: "28-48", interests: "Women's Fashion, Lifestyle", lookalike: "No", retargeting: "Basic", customAudiences: 4 },
  ];

  // Ad Copy Patterns
  const adCopyPatterns = [
    { pattern: "Discount/Sale Hook", usage: "42%", example: "40% Off Everything | Shop Now", avgCTR: "1.8%", brands: "H&M, St Frock" },
    { pattern: "New Arrivals", usage: "32%", example: "Just Dropped: Spring Collection", avgCTR: "2.2%", brands: "Zara, Decjuba" },
    { pattern: "Scarcity/Urgency", usage: "28%", example: "Limited Stock | Final Hours", avgCTR: "2.4%", brands: "All competitors" },
    { pattern: "Aspirational/Lifestyle", usage: "24%", example: "Effortless Elegance for Modern Women", avgCTR: "2.6%", brands: "Zimmermann, Blue Illusion" },
    { pattern: "Social Proof", usage: "18%", example: "5,000+ Reviews | Shop Best Sellers", avgCTR: "2.1%", brands: "Decjuba" },
  ];

  // Campaign Timeline (Last 90 days)
  const campaignTimeline = [
    { month: "Jan", zara: 186, hm: 248, zimmermann: 48, decjuba: 24, femme: 6 },
    { month: "Feb", zara: 198, hm: 264, zimmermann: 52, decjuba: 28, femme: 6 },
    { month: "Mar", zara: 212, hm: 282, zimmermann: 58, decjuba: 32, femme: 8 },
    { month: "Apr", zara: 186, hm: 248, zimmermann: 48, decjuba: 24, femme: 6 },
  ];

  // Platform Performance Split
  const platformPerformance = [
    { platform: "Facebook", impressions: "2.4M", clicks: "42.8K", ctr: "1.78%", cpc: "$1.24", conversions: "1,024" },
    { platform: "Instagram", impressions: "3.8M", clicks: "68.4K", ctr: "1.80%", cpc: "$1.18", conversions: "1,642" },
  ];

  return (
    <>
      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          label="Total Active Ads Tracked"
          value="216"
          change="Across 6 competitors"
          changeType="neutral"
        />
        <MetricCard
          label="Avg Campaign Duration"
          value="25 days"
          change="vs FC 45 days"
          changeType="neutral"
        />
        <MetricCard
          label="Est. Monthly Ad Spend"
          value="$526K"
          change="vs FC $6K (-98%)"
          changeType="neutral"
        />
        <MetricCard
          label="Video Ad Adoption"
          value="40%"
          change="vs FC 33%"
          changeType="neutral"
        />
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-2 gap-6">
        <AIInsightCard
          title="Meta Advertising Competitive Analysis"
          content="FC significantly underspends competitors: $6K/mo vs industry avg $88K/mo (-93%). Major players (H&M $248K, Zara $186K) run 64-84 active ads vs FC's 6, enabling extensive A/B testing and audience segmentation. Campaign duration analysis shows FC ads run 45 days vs industry 25 days - longer duration suggests limited creative refresh and testing velocity. Video adoption at 33% lags leaders (Zimmermann 75%, H&M 67%). Platform split heavily weighted to Facebook (60%) vs competitor Instagram focus (55-65% allocation). Critical gap: no lookalike audience strategy vs all competitors running 1-5% lookalikes."
          cta={{ label: "View Meta Report", onClick: () => setShowMetaModal(true) }}
        />
        <AIInsightCard
          title="Creative Strategy & Performance Gaps"
          content="Top-performing creative themes: UGC/Customer photos (2.8% CTR), Lifestyle/Editorial (2.2% CTR) vs FC's product-only approach (est. 1.2% CTR). Zimmermann's lifestyle aesthetic drives 2.4% CTR through aspirational positioning. Carousel format leads engagement (5.4%) but FC underutilizes (50% of ads vs 70% industry). Video completion gap critical: FC 42% vs Zara 68% suggests creative quality/hook issues. Retargeting sophistication: competitors run 8-32 custom audiences vs FC's 4. Recommendation: increase ad budget 4x to $24K/mo, shift to 60% video, implement UGC strategy, build 12+ custom audiences, test carousel-first approach, reduce campaign duration to 21 days for faster iteration."
          variant="accent"
          cta={{ label: "View Creative Analysis", onClick: () => setShowMetaModal(true) }}
        />
      </div>

      {/* Competitor Ad Activity Overview */}
      <Card>
        <CardTitle>Competitor Meta Ad Activity Overview</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Active campaigns · Ad formats · Estimated spend · Platform distribution</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[var(--border-color)]">
              <tr className="text-left">
                <th className="pb-3 pr-8 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>BRAND</th>
                <th className="pb-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>ACTIVE ADS</th>
                <th className="pb-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>VIDEO</th>
                <th className="pb-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>IMAGE</th>
                <th className="pb-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>CAROUSEL</th>
                <th className="pb-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>EST. SPEND</th>
                <th className="pb-3 px-4 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>AVG DURATION</th>
                <th className="pb-3 pl-4 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>PLATFORMS</th>
              </tr>
            </thead>
            <tbody>
              {competitorAdMetrics.map((comp, idx) => (
                <tr key={idx} className={`border-b border-[var(--border-color)] hover:bg-[var(--surface)] transition-colors ${comp.brand === "Femme Connection" ? 'bg-[var(--pink-light)]' : ''}`}>
                  <td className="py-4 pr-8">
                    <div className="flex items-center gap-2">
                      <div className="text-[14px] font-medium text-[var(--text-primary)]">{comp.brand}</div>
                      {comp.brand === "Femme Connection" && <Tag variant="pink" size="xs">FC</Tag>}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[16px] font-bold text-[var(--text-primary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>
                    {comp.activeAds}
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[var(--text-secondary)] text-right">{comp.videoAds}</td>
                  <td className="py-4 px-4 text-[14px] text-[var(--text-secondary)] text-right">{comp.imageAds}</td>
                  <td className="py-4 px-4 text-[14px] text-[var(--text-secondary)] text-right">{comp.carouselAds}</td>
                  <td className="py-4 px-4 text-[14px] font-medium text-right" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className={parseFloat(comp.estSpend.replace(/[^0-9.]/g, '')) > 50 ? "text-[var(--green)]" : "text-[var(--text-primary)]"}>
                      {comp.estSpend}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[13px] text-[var(--text-secondary)] text-right">{comp.avgDuration}</td>
                  <td className="py-4 pl-4 text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>{comp.platforms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Ad Format Analysis & Campaign Timeline */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardTitle>Ad Format Distribution & Performance</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Format breakdown · Engagement rates · Cost efficiency</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                key="pie-meta-format"
                data={formatPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={90}
                dataKey="value"
              >
                {formatPieData.map((entry, index) => (
                  <Cell key={`format-pie-cell-${index}-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip key="tooltip-meta-format-pie" />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-3">
            {adFormatData.map((format, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                <div className="flex items-center gap-3">
                  {format.format === "Video" && <Video className="w-4 h-4 text-[var(--green)]" />}
                  {format.format === "Image" && <ImageIcon className="w-4 h-4 text-[var(--terra)]" />}
                  {format.format === "Carousel" && <Layers className="w-4 h-4 text-[var(--pink)]" />}
                  {format.format === "Collection" && <Layers className="w-4 h-4 text-[var(--buff-dark)]" />}
                  <div className="text-[13px] font-medium text-[var(--text-primary)]">{format.format}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-[10px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>ENGAGEMENT</div>
                    <div className="text-[14px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{format.avgEngagement}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>CPC</div>
                    <div className="text-[14px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{format.costPerClick}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Ad Spend Trend (Last 4 Months)</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Estimated monthly ad spend by competitor</p>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={campaignTimeline}>
              <CartesianGrid key="grid-meta-spend" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="xaxis-meta-spend" dataKey="month" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} />
              <YAxis key="yaxis-meta-spend" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} label={{ value: 'Est. Spend ($K)', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }} />
              <Tooltip key="tooltip-meta-spend" />
              <Legend key="legend-meta-spend" wrapperStyle={{ fontSize: '11px' }} />
              <Line key="line-meta-hm" type="monotone" dataKey="hm" stroke="var(--buff-dark)" name="H&M" strokeWidth={2} />
              <Line key="line-meta-zara" type="monotone" dataKey="zara" stroke="var(--green)" name="Zara" strokeWidth={2} />
              <Line key="line-meta-zimmermann" type="monotone" dataKey="zimmermann" stroke="var(--terra)" name="Zimmermann" strokeWidth={2} />
              <Line key="line-meta-decjuba" type="monotone" dataKey="decjuba" stroke="var(--green-mid)" name="Decjuba" strokeWidth={2} />
              <Line key="line-meta-femme" type="monotone" dataKey="femme" stroke="var(--pink)" name="Femme" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Campaign Performance Benchmarks */}
      <Card>
        <CardTitle>Campaign Performance Benchmarks</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Femme Connection vs Industry vs Top Performer</p>
        <div className="space-y-4">
          {campaignBenchmarks.map((benchmark, idx) => (
            <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[15px] font-medium text-[var(--text-primary)]">{benchmark.metric}</div>
                <div className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>{benchmark.topPerformer}</div>
              </div>
              <div className="grid grid-cols-7 gap-4">
                <div className="col-span-2">
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>FEMME CONNECTION</div>
                  <div className="text-[18px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{benchmark.femme}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>INDUSTRY AVG</div>
                  <div className="text-[18px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{benchmark.industry}</div>
                </div>
                <div className="col-span-3">
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>GAP ANALYSIS</div>
                  <div className="flex items-center gap-2">
                    {benchmark.gap.startsWith("-") ? (
                      <>
                        <TrendingDown className="w-4 h-4 text-[var(--terra)]" />
                        <span className="text-[13px] font-medium text-[var(--terra)]">{benchmark.gap} below industry</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4 text-[var(--terra)]" />
                        <span className="text-[13px] font-medium text-[var(--terra)]">{benchmark.gap} above industry (higher cost)</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Audience Targeting & Ad Copy Patterns */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardTitle>Audience Targeting Strategy Comparison</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Demographics · Interests · Lookalike audiences · Retargeting sophistication</p>
          <div className="space-y-3">
            {targetingStrategies.map((strategy, idx) => (
              <div key={idx} className={`border rounded-[var(--radius-md)] p-4 ${strategy.brand === "Femme Connection" ? 'border-2 border-[var(--pink)] bg-[var(--pink-light)]' : 'border-[var(--border-color)]'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[14px] font-medium text-[var(--text-primary)]">{strategy.brand}</div>
                  <div className="flex items-center gap-2">
                    <Tag variant={strategy.lookalike === "Yes (1%)" || strategy.lookalike === "Yes (2%)" ? "green" : strategy.lookalike.includes("Yes") ? "default" : "terra"} size="xs">
                      {strategy.lookalike}
                    </Tag>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>AGE RANGE</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">{strategy.ageRange}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>CUSTOM AUDIENCES</div>
                    <div className="text-[14px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{strategy.customAudiences}</div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>INTERESTS</div>
                  <div className="text-[11px] text-[var(--text-secondary)]">{strategy.interests}</div>
                </div>
                <div>
                  <Tag variant={strategy.retargeting === "Advanced" ? "green" : strategy.retargeting === "Moderate" ? "default" : "terra"} size="xs">
                    {strategy.retargeting} Retargeting
                  </Tag>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Ad Copy Pattern Analysis</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Messaging themes · CTR performance · Usage frequency</p>
          <div className="space-y-3">
            {adCopyPatterns.map((pattern, idx) => (
              <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4 hover:border-[var(--border-strong)] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[14px] font-medium text-[var(--text-primary)]">{pattern.pattern}</div>
                  <div className="flex items-center gap-3">
                    <Tag variant="default" size="sm">{pattern.usage} usage</Tag>
                    <div className="text-[16px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{pattern.avgCTR}</div>
                  </div>
                </div>
                <div className="text-[13px] text-[var(--text-secondary)] mb-2 italic">"{pattern.example}"</div>
                <div className="text-[11px] text-[var(--text-tertiary)]">{pattern.brands}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Creative Theme Performance */}
      <Card>
        <CardTitle>Creative Theme Performance Analysis</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Visual approach · CTR benchmarks · Competitor adoption</p>
        <div className="grid grid-cols-5 gap-4">
          {creativeThemes.map((theme, idx) => (
            <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4 hover:border-[var(--border-strong)] transition-colors">
              <div className="text-[13px] font-medium text-[var(--text-primary)] mb-3">{theme.theme}</div>
              <div className="mb-3">
                <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>USAGE</div>
                <div className="text-[18px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{theme.usage}</div>
              </div>
              <div className="mb-3">
                <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>AVG CTR</div>
                <div className={`text-[16px] font-bold ${parseFloat(theme.avgCTR) > 2.0 ? 'text-[var(--green)]' : 'text-[var(--text-primary)]'}`} style={{ fontFamily: "var(--font-mono)" }}>
                  {theme.avgCTR}
                </div>
              </div>
              <div className="text-[10px] text-[var(--text-tertiary)]">{theme.brands}</div>
            </div>
          ))}
        </div>

        {/* Creative Strategy Insights */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="p-4 bg-[var(--green-light)] border border-[var(--green)] rounded-[var(--radius-lg)]">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[var(--green)]" />
              <div className="text-[12px] font-medium text-[var(--green-dark)]" style={{ fontFamily: "var(--font-mono)" }}>TOP PERFORMING APPROACHES</div>
            </div>
            <div className="text-[13px] text-[var(--text-primary)] leading-relaxed">
              <span className="font-medium">UGC/Customer Photos (2.8% CTR):</span> Authentic social proof outperforms polished studio shots. Decjuba's customer-generated content drives engagement through relatability. <span className="font-medium">Lifestyle/Editorial (2.2% CTR):</span> Zimmermann's aspirational aesthetic creates emotional connection vs transactional product-only ads.
            </div>
          </div>

          <div className="p-4 bg-[var(--pink-light)] border-2 border-[var(--pink)] rounded-[var(--radius-lg)]">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[var(--pink)]" />
              <div className="text-[12px] font-medium text-[var(--pink-dark)]" style={{ fontFamily: "var(--font-mono)" }}>FEMME CONNECTION RECOMMENDATIONS</div>
            </div>
            <div className="text-[13px] text-[var(--text-primary)] leading-relaxed">
              Shift from product-only to UGC-led creative strategy. Allocate 40% of ad budget to customer photo campaigns, 30% to lifestyle/editorial, 30% to product. Implement carousel format as default (70% of ads). Reduce campaign duration from 45 to 21 days for faster iteration. Build 12+ custom audiences. Test 3% lookalike audiences.
            </div>
          </div>
        </div>
      </Card>

      {/* Platform Performance Split */}
      <Card>
        <CardTitle>Platform Performance: Facebook vs Instagram</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Cross-platform metrics · Cost efficiency · Conversion performance</p>
        <div className="grid grid-cols-2 gap-6">
          {platformPerformance.map((platform, idx) => (
            <div key={idx} className="border-2 border-[var(--border-color)] rounded-[var(--radius-lg)] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-full ${platform.platform === "Instagram" ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-[var(--buff-dark)]'} flex items-center justify-center`}>
                  <span className="text-white text-[18px] font-bold">{platform.platform === "Instagram" ? "IG" : "FB"}</span>
                </div>
                <div>
                  <div className="text-[18px] font-bold text-[var(--text-primary)]">{platform.platform}</div>
                  <div className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>LAST 30 DAYS</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>IMPRESSIONS</div>
                  <div className="text-[20px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{platform.impressions}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>CLICKS</div>
                  <div className="text-[20px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{platform.clicks}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>CTR</div>
                  <div className="text-[20px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{platform.ctr}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>CPC</div>
                  <div className="text-[20px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{platform.cpc}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>CONVERSIONS</div>
                  <div className="text-[24px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{platform.conversions}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-[var(--surface)] border border-[var(--border-color)] rounded-[var(--radius-lg)]">
          <div className="text-[12px] font-medium text-[var(--text-primary)] mb-2">Platform Strategy Insight</div>
          <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
            Instagram delivers 60% more conversions with similar CTR and lower CPC ($1.18 vs $1.24). FC's 60/40 Facebook-heavy split underperforms competitor 55-65% Instagram allocation. <span className="font-medium text-[var(--text-primary)]">Recommendation: Shift to 40% Facebook / 60% Instagram allocation, prioritize video/carousel formats for Instagram feed and Reels placement.</span> Test Instagram Shopping tags for direct product discovery.
          </div>
        </div>
      </Card>
    </>
  );
}
