import { Card, CardTitle, MetricCard, AIInsightCard, Tag } from "./ui/Card";
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, AlertCircle, Target, Award } from "lucide-react";

interface MarketIntelligenceTabProps {
  setShowMarketModal: (show: boolean) => void;
}

export default function MarketIntelligenceTab({ setShowMarketModal }: MarketIntelligenceTabProps) {
  // Market Share Data (Particl) - Updated v144
  const marketShareData = [
    { name: "Princess Polly", value: 12.4, color: "var(--pink)", segment: "AU Fast Fashion" },
    { name: "Showpo", value: 11.8, color: "var(--terra)", segment: "AU Fast Fashion" },
    { name: "Zara", value: 10.2, color: "var(--green)", segment: "International" },
    { name: "Meshki", value: 8.6, color: "var(--buff-dark)", segment: "AU Fast Fashion" },
    { name: "Femme Connection", value: 6.8, color: "#ff99b9", segment: "AU Mid-Tier" },
    { name: "Reformation", value: 6.4, color: "var(--green-mid)", segment: "International" },
    { name: "White Fox", value: 5.9, color: "var(--pink-dark)", segment: "AU Fast Fashion" },
    { name: "Pepper Mayo", value: 5.2, color: "#e2745d", segment: "AU Fast Fashion" },
    { name: "Sézane", value: 4.8, color: "#c5a898", segment: "International" },
    { name: "Others", value: 27.9, color: "#ddd5cc", segment: "Mixed" },
  ];

  // Brand Positioning Map (Price vs Market Share)
  const brandPositioningData = [
    { brand: "Bec + Bridge", avgPrice: 285, marketShare: 2.1, segment: "AU Premium", growth: 8 },
    { brand: "Shona Joy", avgPrice: 245, marketShare: 2.4, segment: "AU Premium", growth: 6 },
    { brand: "Spell & Gypsy", avgPrice: 198, marketShare: 3.2, segment: "AU Premium", growth: 12 },
    { brand: "Reformation", avgPrice: 185, marketShare: 6.4, segment: "International", growth: 18 },
    { brand: "Sézane", avgPrice: 165, marketShare: 4.8, segment: "International", growth: 22 },
    { brand: "Tigerlily", avgPrice: 145, marketShare: 2.8, segment: "AU Mid-Tier", growth: 4 },
    { brand: "& Other Stories", avgPrice: 125, marketShare: 3.6, segment: "International", growth: 10 },
    { brand: "Reliquia", avgPrice: 125, marketShare: 1.8, segment: "AU Accessories", growth: 15 },
    { brand: "Everlane", avgPrice: 98, marketShare: 2.2, segment: "International", growth: 5 },
    { brand: "Meshki", avgPrice: 95, marketShare: 8.6, segment: "AU Fast Fashion", growth: 28 },
    { brand: "Dissh", avgPrice: 92, marketShare: 4.2, segment: "AU Mid-Tier", growth: 14 },
    { brand: "Stelly", avgPrice: 88, marketShare: 3.4, segment: "AU Mid-Tier", growth: 8 },
    { brand: "Femme Connection", avgPrice: 82, marketShare: 6.8, segment: "AU Mid-Tier", growth: 16 },
    { brand: "Lioness", avgPrice: 78, marketShare: 4.8, segment: "AU Fast Fashion", growth: 18 },
    { brand: "Princess Polly", avgPrice: 72, marketShare: 12.4, segment: "AU Fast Fashion", growth: 24 },
    { brand: "Hello Molly", avgPrice: 69, marketShare: 5.6, segment: "AU Fast Fashion", growth: 20 },
    { brand: "Showpo", avgPrice: 68, marketShare: 11.8, segment: "AU Fast Fashion", growth: 22 },
    { brand: "Zara", avgPrice: 65, marketShare: 10.2, segment: "International", growth: 12 },
    { brand: "Beginning Boutique", avgPrice: 64, marketShare: 4.4, segment: "AU Fast Fashion", growth: 10 },
    { brand: "White Fox", avgPrice: 58, marketShare: 5.9, segment: "AU Fast Fashion", growth: 26 },
  ];

  // Category Market Share
  const categoryMarketData = [
    { category: "Dresses", total: "12,847", femme: 124, leader: "Princess Polly", leaderShare: "18.2%", growth: "+28%" },
    { category: "Tops & Blouses", total: "8,654", femme: 89, leader: "Showpo", leaderShare: "16.4%", growth: "+18%" },
    { category: "Bottoms", total: "5,842", femme: 64, leader: "Zara", leaderShare: "22.1%", growth: "+12%" },
    { category: "Outerwear", total: "3,245", femme: 32, leader: "Reformation", leaderShare: "14.8%", growth: "+42%" },
    { category: "Knitwear", total: "2,892", femme: 28, leader: "Sézane", leaderShare: "19.2%", growth: "+35%" },
    { category: "Activewear", total: "4,456", femme: 18, leader: "White Fox", leaderShare: "24.6%", growth: "+52%" },
    { category: "Accessories", total: "6,134", femme: 42, leader: "Reliquia", leaderShare: "12.8%", growth: "+38%" },
    { category: "Swimwear", total: "2,847", femme: 24, leader: "Tigerlily", leaderShare: "28.4%", growth: "+24%" },
  ];

  // Marketing Calendar & Promotional Patterns (Panoramata)
  const promotionalCalendar = [
    { brand: "Princess Polly", frequency: "Weekly", avgDiscount: "18%", emailFreq: "5.2/week", lastPromo: "2 days ago", promoType: "Flash Sale" },
    { brand: "Showpo", frequency: "Weekly", avgDiscount: "22%", emailFreq: "4.8/week", lastPromo: "1 day ago", promoType: "Category Sale" },
    { brand: "White Fox", frequency: "Daily", avgDiscount: "25%", emailFreq: "6.4/week", lastPromo: "Today", promoType: "Site-Wide" },
    { brand: "Meshki", frequency: "Bi-Weekly", avgDiscount: "12%", emailFreq: "3.2/week", lastPromo: "4 days ago", promoType: "New Arrivals" },
    { brand: "Zara", frequency: "Seasonal", avgDiscount: "15%", emailFreq: "2.8/week", lastPromo: "12 days ago", promoType: "End of Season" },
    { brand: "Reformation", frequency: "Rare", avgDiscount: "7%", emailFreq: "2.1/week", lastPromo: "28 days ago", promoType: "Archive Sale" },
    { brand: "Sézane", frequency: "Never", avgDiscount: "0%", emailFreq: "1.8/week", lastPromo: "Never", promoType: "None" },
  ];

  // Channel Strategy Matrix (Panoramata)
  const channelStrategyData = [
    { brand: "Princess Polly", email: 92, social: 88, paid: 94, organic: 86, influencer: 78, overall: 87.6 },
    { brand: "Showpo", email: 88, social: 92, paid: 86, organic: 82, influencer: 84, overall: 86.4 },
    { brand: "Meshki", email: 84, social: 86, paid: 90, organic: 78, influencer: 88, overall: 85.2 },
    { brand: "White Fox", email: 90, social: 94, paid: 82, organic: 80, influencer: 92, overall: 87.6 },
    { brand: "Reformation", email: 76, social: 84, paid: 88, organic: 92, influencer: 68, overall: 81.6 },
    { brand: "Sézane", email: 72, social: 88, paid: 78, organic: 94, influencer: 86, overall: 83.6 },
    { brand: "Femme Connection", email: 68, social: 72, paid: 74, organic: 64, influencer: 58, overall: 67.2 },
  ];

  // Growth Trajectories (Last 12 months)
  const growthTrendData = [
    { month: "May '25", princessPolly: 10.8, showpo: 10.2, meshki: 7.2, femme: 5.8, reformation: 5.4, sezane: 3.8 },
    { month: "Jun '25", princessPolly: 11.2, showpo: 10.6, meshki: 7.6, femme: 6.0, reformation: 5.6, sezane: 4.0 },
    { month: "Jul '25", princessPolly: 11.4, showpo: 10.8, meshki: 7.8, femme: 6.1, reformation: 5.8, sezane: 4.1 },
    { month: "Aug '25", princessPolly: 11.6, showpo: 11.0, meshki: 8.0, femme: 6.2, reformation: 5.9, sezane: 4.2 },
    { month: "Sep '25", princessPolly: 11.8, showpo: 11.2, meshki: 8.2, femme: 6.4, reformation: 6.0, sezane: 4.3 },
    { month: "Oct '25", princessPolly: 12.0, showpo: 11.4, meshki: 8.4, femme: 6.5, reformation: 6.1, sezane: 4.4 },
    { month: "Nov '25", princessPolly: 12.1, showpo: 11.5, meshki: 8.5, femme: 6.6, reformation: 6.2, sezane: 4.5 },
    { month: "Dec '25", princessPolly: 12.2, showpo: 11.6, meshki: 8.6, femme: 6.7, reformation: 6.3, sezane: 4.6 },
    { month: "Jan '26", princessPolly: 12.3, showpo: 11.7, meshki: 8.6, femme: 6.7, reformation: 6.3, sezane: 4.7 },
    { month: "Feb '26", princessPolly: 12.3, showpo: 11.7, meshki: 8.6, femme: 6.8, reformation: 6.4, sezane: 4.7 },
    { month: "Mar '26", princessPolly: 12.4, showpo: 11.8, meshki: 8.6, femme: 6.8, reformation: 6.4, sezane: 4.8 },
    { month: "Apr '26", princessPolly: 12.4, showpo: 11.8, meshki: 8.6, femme: 6.8, reformation: 6.4, sezane: 4.8 },
  ];

  // Competitive Intensity by Segment
  const segmentIntensityData = [
    { segment: "AU Fast Fashion ($50-90)", players: 8, avgMargin: "32%", intensity: "Very High", consolidation: "Low" },
    { segment: "AU Mid-Tier ($75-150)", players: 4, avgMargin: "48%", intensity: "Medium", consolidation: "Medium" },
    { segment: "AU Premium ($150-300)", players: 3, avgMargin: "62%", intensity: "Low", consolidation: "High" },
    { segment: "International Fast ($45-85)", players: 2, avgMargin: "28%", intensity: "High", consolidation: "Low" },
    { segment: "International Premium ($125-250)", players: 3, avgMargin: "58%", intensity: "Medium", consolidation: "Medium" },
  ];

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          label="Market Position"
          value="#5"
          change="AU Women's Fashion"
          changeType="neutral"
        />
        <MetricCard
          label="Market Share"
          value="6.8%"
          change="+1.0% vs last year"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="Category Leaders"
          value="3/8"
          change="Categories dominated"
          changeType="neutral"
        />
        <MetricCard
          label="Competitive Intensity"
          value="High"
          change="20 active competitors"
          changeType="neutral"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <AIInsightCard
          title="Market Position Analysis"
          content="Femme Connection holds 6.8% market share, ranked #5 in AU women's fashion. Positioned in crowded mid-tier segment ($75-150) against 4 direct competitors. Princess Polly leads at 12.4% through aggressive fast-fashion velocity (777 new SKUs/month). Growth opportunity: Mid-tier showing 48% margins vs fast-fashion 32%, with medium competitive intensity. FC growing +16% YoY, outpacing segment average of +11%. Strategic positioning between fast-fashion accessibility and premium quality creates defensible niche."
          cta={{ label: "View Full Market Analysis", onClick: () => setShowMarketModal(true) }}
        />
        <AIInsightCard
          title="Competitive Landscape Shifts"
          content="Market consolidating around 3 tiers: Fast Fashion (8 players, high intensity), Mid-Tier (4 players, medium intensity), Premium (3 players, low intensity). Meshki moving upmarket (+28% growth, $95 avg price) threatening mid-tier. International brands (Zara, Reformation, Sézane) expanding AU presence via localized marketing + influencer partnerships. White Fox activewear dominance (24.6% category share, +52% growth) indicates untapped segment. Recommendation: defend mid-tier positioning, explore activewear entry, monitor Meshki's upmarket trajectory."
          variant="accent"
          cta={{ label: "View Competitive Dynamics", onClick: () => setShowMarketModal(true) }}
        />
      </div>

      {/* Market Share Distribution */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardTitle>Market Share Distribution</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">AU Women's Fashion Market · Last 12 months</p>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={marketShareData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={120}
                dataKey="value"
              >
                {marketShareData.map((entry, index) => (
                  <Cell key={`market-pie-cell-${index}-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip key="market-pie-tooltip" />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardTitle>Market Share Growth Trajectory</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">12-month trend · Top 6 competitors</p>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={growthTrendData}>
              <CartesianGrid key="growth-grid" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="growth-xaxis" dataKey="month" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} />
              <YAxis key="growth-yaxis" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} label={{ value: 'Market Share %', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }} />
              <Tooltip key="growth-tooltip" />
              <Legend key="growth-legend" wrapperStyle={{ fontSize: '11px' }} />
              <Line key="line-princesspolly" type="monotone" dataKey="princessPolly" stroke="var(--pink)" name="Princess Polly" strokeWidth={2} />
              <Line key="line-showpo" type="monotone" dataKey="showpo" stroke="var(--terra)" name="Showpo" strokeWidth={2} />
              <Line key="line-meshki" type="monotone" dataKey="meshki" stroke="var(--buff-dark)" name="Meshki" strokeWidth={2} />
              <Line key="line-femme" type="monotone" dataKey="femme" stroke="#ff99b9" name="Femme Connection" strokeWidth={3} />
              <Line key="line-reformation" type="monotone" dataKey="reformation" stroke="var(--green)" name="Reformation" strokeWidth={2} />
              <Line key="line-sezane" type="monotone" dataKey="sezane" stroke="var(--green-mid)" name="Sézane" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Brand Positioning Map */}
      <Card>
        <CardTitle>Brand Positioning Map</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Average price vs market share · Bubble size = growth rate</p>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid key="scatter-grid" strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis
              key="scatter-xaxis"
              type="number"
              dataKey="avgPrice"
              name="Avg Price"
              stroke="var(--text-tertiary)"
              style={{ fontSize: '11px' }}
              label={{ value: 'Average Price ($)', position: 'bottom', style: { fontSize: '11px' } }}
            />
            <YAxis
              key="scatter-yaxis"
              type="number"
              dataKey="marketShare"
              name="Market Share"
              stroke="var(--text-tertiary)"
              style={{ fontSize: '11px' }}
              label={{ value: 'Market Share %', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }}
            />
            <Tooltip key="scatter-tooltip" cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 border border-[var(--border-color)] rounded-[var(--radius-sm)] shadow-lg">
                    <p className="text-[13px] font-medium text-[var(--text-primary)] mb-1">{data.brand}</p>
                    <p className="text-[11px] text-[var(--text-secondary)]">Avg Price: ${data.avgPrice}</p>
                    <p className="text-[11px] text-[var(--text-secondary)]">Market Share: {data.marketShare}%</p>
                    <p className="text-[11px] text-[var(--text-secondary)]">Growth: +{data.growth}%</p>
                    <p className="text-[11px] text-[var(--text-tertiary)] mt-1">{data.segment}</p>
                  </div>
                );
              }
              return null;
            }} />
            <Scatter key="scatter-brands" name="Brands" data={brandPositioningData} fill="var(--pink)">
              {brandPositioningData.map((entry, index) => {
                let color = "var(--pink)";
                if (entry.segment === "International") color = "var(--green)";
                if (entry.segment === "AU Premium") color = "var(--terra)";
                if (entry.segment === "AU Fast Fashion") color = "var(--buff-dark)";
                if (entry.brand === "Femme Connection") color = "#ff99b9";

                return <Cell key={`scatter-cell-${index}-${entry.brand}`} fill={color} />;
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center gap-6 justify-center text-[11px]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff99b9" }}></div>
            <span className="text-[var(--text-secondary)]">Femme Connection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--buff-dark)]"></div>
            <span className="text-[var(--text-secondary)]">AU Fast Fashion</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--pink)]"></div>
            <span className="text-[var(--text-secondary)]">AU Mid-Tier</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--terra)]"></div>
            <span className="text-[var(--text-secondary)]">AU Premium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--green)]"></div>
            <span className="text-[var(--text-secondary)]">International</span>
          </div>
        </div>
      </Card>

      {/* Category Market Leadership */}
      <Card>
        <CardTitle>Category Market Leadership</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Total SKUs · Category leaders · Growth rates</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[var(--border-color)]">
              <tr className="text-left">
                <th className="pb-3 pr-8 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>CATEGORY</th>
                <th className="pb-3 px-8 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>SKUs</th>
                <th className="pb-3 px-8 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>CATEGORY LEADER</th>
                <th className="pb-3 px-8 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>LEADER SHARE</th>
                <th className="pb-3 pl-8 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>GROWTH</th>
              </tr>
            </thead>
            <tbody>
              {categoryMarketData.map((cat, idx) => (
                <tr key={idx} className="border-b border-[var(--border-color)] hover:bg-[var(--surface)] transition-colors">
                  <td className="py-4 pr-8 text-[14px] font-medium text-[var(--text-primary)]">{cat.category}</td>
                  <td className="py-4 px-8 text-[14px] font-medium text-[var(--text-primary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>{cat.total}</td>
                  <td className="py-4 px-8 text-[13px] text-[var(--text-secondary)]">{cat.leader}</td>
                  <td className="py-4 px-8 text-[14px] font-medium text-[var(--green)] text-right" style={{ fontFamily: "var(--font-mono)" }}>{cat.leaderShare}</td>
                  <td className="py-4 pl-8 text-[14px] font-medium text-[var(--green)] text-right" style={{ fontFamily: "var(--font-mono)" }}>{cat.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Promotional Calendar & Channel Strategy */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardTitle>Promotional Calendar Analysis</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Competitive promotional patterns · Email frequency · Discount strategy</p>
          <div className="space-y-3">
            {promotionalCalendar.map((promo, idx) => (
              <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4 hover:border-[var(--border-strong)] transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[14px] font-medium text-[var(--text-primary)]">{promo.brand}</div>
                  <Tag variant={promo.frequency === "Never" ? "green" : promo.frequency === "Daily" ? "terra" : "default"} size="sm">
                    {promo.frequency}
                  </Tag>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>AVG DISCOUNT</div>
                    <div className="text-[16px] font-bold text-[var(--terra)]" style={{ fontFamily: "var(--font-mono)" }}>{promo.avgDiscount}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>EMAIL FREQ</div>
                    <div className="text-[16px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{promo.emailFreq}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>LAST PROMO</div>
                    <div className="text-[13px] font-medium text-[var(--text-secondary)]">{promo.lastPromo}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>TYPE</div>
                    <div className="text-[13px] font-medium text-[var(--text-primary)]">{promo.promoType}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Femme Connection Comparison AI Widget */}
            <div className="mt-4 p-4 bg-[var(--pink-light)] border-2 border-[var(--pink)] rounded-[var(--radius-lg)]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--pink)] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[14px] font-bold">FC</span>
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>FEMME CONNECTION POSITIONING</div>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    Current strategy: 16.2% avg discount, 3.8 emails/week, bi-weekly promotional cadence. Positioned between fast-fashion aggression (White Fox 25%, daily) and premium restraint (Sézane 0%, never). Opportunity: test Reformation's selective discount model (7% avg, rare frequency) to preserve margin while maintaining competitive pressure. Reduce email frequency to 2.8/week matching premium tier, shift promotional mix toward VIP early access vs. site-wide discounting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>Channel Strategy Comparison</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Multi-channel effectiveness scores (0-100) · Overall performance</p>
          <div className="space-y-4">
            {channelStrategyData.map((brand, idx) => (
              <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[14px] font-medium text-[var(--text-primary)]">{brand.brand}</div>
                  <div className="text-[18px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{brand.overall}</div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>EMAIL</div>
                    <div className="h-16 bg-[var(--surface)] rounded relative">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-[var(--pink)] rounded"
                        style={{ height: `${brand.email}%` }}
                      ></div>
                    </div>
                    <div className="text-[10px] text-center mt-1 font-medium" style={{ fontFamily: "var(--font-mono)" }}>{brand.email}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>SOCIAL</div>
                    <div className="h-16 bg-[var(--surface)] rounded relative">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-[var(--terra)] rounded"
                        style={{ height: `${brand.social}%` }}
                      ></div>
                    </div>
                    <div className="text-[10px] text-center mt-1 font-medium" style={{ fontFamily: "var(--font-mono)" }}>{brand.social}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>PAID</div>
                    <div className="h-16 bg-[var(--surface)] rounded relative">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-[var(--green)] rounded"
                        style={{ height: `${brand.paid}%` }}
                      ></div>
                    </div>
                    <div className="text-[10px] text-center mt-1 font-medium" style={{ fontFamily: "var(--font-mono)" }}>{brand.paid}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>ORGANIC</div>
                    <div className="h-16 bg-[var(--surface)] rounded relative">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-[var(--buff-dark)] rounded"
                        style={{ height: `${brand.organic}%` }}
                      ></div>
                    </div>
                    <div className="text-[10px] text-center mt-1 font-medium" style={{ fontFamily: "var(--font-mono)" }}>{brand.organic}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>INFLUENCER</div>
                    <div className="h-16 bg-[var(--surface)] rounded relative">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-[var(--pink-dark)] rounded"
                        style={{ height: `${brand.influencer}%` }}
                      ></div>
                    </div>
                    <div className="text-[10px] text-center mt-1 font-medium" style={{ fontFamily: "var(--font-mono)" }}>{brand.influencer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Segment Competitive Intensity */}
      <Card>
        <CardTitle>Competitive Intensity by Market Segment</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Player count · Margins · Competitive dynamics · Consolidation risk</p>
        <div className="grid grid-cols-5 gap-4">
          {segmentIntensityData.map((seg, idx) => (
            <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4">
              <div className="text-[13px] font-medium text-[var(--text-primary)] mb-3 leading-tight">{seg.segment}</div>
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>PLAYERS</div>
                  <div className="text-[24px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{seg.players}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>AVG MARGIN</div>
                  <div className="text-[18px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{seg.avgMargin}</div>
                </div>
                <div>
                  <Tag
                    variant={seg.intensity === "Very High" ? "terra" : seg.intensity === "High" ? "pink" : seg.intensity === "Medium" ? "default" : "green"}
                    size="sm"
                  >
                    {seg.intensity}
                  </Tag>
                </div>
                <div className="text-[11px] text-[var(--text-secondary)]">
                  Consolidation: <span className="font-medium">{seg.consolidation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
