import { Card, CardTitle, MetricCard, AIInsightCard, Tag } from "./ui/Card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Mail, MessageSquare, Zap, Users, Eye, MousePointer, ShoppingCart, Clock, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
const blueIllusionEmail = "https://via.placeholder.com/750x750?text=blueIllusionEmail";
const decjubaEmail = "https://via.placeholder.com/750x750?text=decjubaEmail";
const hmEmail = "https://via.placeholder.com/750x750?text=hmEmail";
const stFrockEmail = "https://via.placeholder.com/750x750?text=stFrockEmail";
const zaraEmail = "https://via.placeholder.com/750x750?text=zaraEmail";
const zimmermannEmail = "https://via.placeholder.com/750x750?text=zimmermannEmail";

interface EmailIntelligenceTabProps {
  setShowEmailModal: (show: boolean) => void;
}

interface CampaignInsights {
  layout: string;
  structure: string;
  ctaCount: number;
  ctaType: string;
  colorPalette: string;
  typography: string;
  imageRatio: string;
  whitespace: string;
  keyTakeaway: string;
  expandable?: boolean;
  expandedInsights?: {
    categories: Array<{ name: string; color: string; modelPose: string }>;
    promoStrategy: string;
    demographicTarget: string;
    layoutIssues: string;
    recommendations: string;
  };
}

export default function EmailIntelligenceTab({ setShowEmailModal }: EmailIntelligenceTabProps) {
  const [expandedCampaign, setExpandedCampaign] = useState<number | null>(null);
  // Competitor Email Performance (Panoramata)
  const competitorEmailMetrics = [
    { brand: "Zimmermann", sendFreq: "1.2/week", openRate: "58.4%", ctr: "9.8%", convRate: "6.8%", smsFreq: "0.2/week", flowCount: 4 },
    { brand: "Blue Illusion", sendFreq: "2.4/week", openRate: "52.4%", ctr: "8.2%", convRate: "5.4%", smsFreq: "0.8/week", flowCount: 7 },
    { brand: "Decjuba", sendFreq: "3.6/week", openRate: "44.6%", ctr: "7.8%", convRate: "4.2%", smsFreq: "1.6/week", flowCount: 10 },
    { brand: "Zara", sendFreq: "4.2/week", openRate: "42.8%", ctr: "6.4%", convRate: "3.8%", smsFreq: "1.2/week", flowCount: 8 },
    { brand: "H&M", sendFreq: "5.8/week", openRate: "38.2%", ctr: "5.2%", convRate: "2.6%", smsFreq: "2.4/week", flowCount: 12 },
    { brand: "St Frock", sendFreq: "4.4/week", openRate: "36.8%", ctr: "4.6%", convRate: "2.2%", smsFreq: "1.8/week", flowCount: 9 },
    { brand: "Femme Connection", sendFreq: "3.8/week", openRate: "36.4%", ctr: "4.4%", convRate: "2.2%", smsFreq: "1.4/week", flowCount: 9 },
  ];

  // Campaign Type Analysis (Panoramata tracking)
  const campaignTypeData = [
    { type: "Promotional", hm: 62, stfrock: 58, decjuba: 48, femme: 48, zara: 38, blueillusion: 24, zimmermann: 12 },
    { type: "New Arrivals", hm: 28, stfrock: 26, decjuba: 32, femme: 28, zara: 42, blueillusion: 38, zimmermann: 48 },
    { type: "Editorial/Lifestyle", hm: 8, stfrock: 12, decjuba: 16, femme: 16, zara: 14, blueillusion: 32, zimmermann: 38 },
    { type: "Back in Stock", hm: 2, stfrock: 4, decjuba: 4, femme: 8, zara: 6, blueillusion: 6, zimmermann: 2 },
  ];

  // Subject Line Analysis
  const subjectLinePatterns = [
    { pattern: "Emotional Storytelling", usage: "24%", avgOpen: "52.4%", example: "From Our Family to Yours", brands: "Blue Illusion, Zimmermann" },
    { pattern: "Contest/Prize Driven", usage: "18%", avgOpen: "44.6%", example: "Win a $3,000 Winter Wardrobe", brands: "Decjuba, St Frock" },
    { pattern: "Simple Descriptive", usage: "42%", avgOpen: "40.5%", example: "Woman - Winter Wardrobe", brands: "Zara, H&M" },
    { pattern: "Editorial/Collection", usage: "32%", avgOpen: "58.4%", example: "Natura - The Unveiling of Our Spring 2024 Runway", brands: "Zimmermann, Blue Illusion" },
    { pattern: "Imperative + Urgency", usage: "28%", avgOpen: "36.8%", example: "Take Notes...", brands: "St Frock, H&M" },
  ];

  // Flow Performance Benchmarking
  const flowBenchmarks = [
    { flow: "Welcome Series", femmeOR: "42%", femmeConv: "3.2%", industryOR: "48%", industryConv: "4.8%", topPerformer: "Zimmermann: 62% OR" },
    { flow: "Abandoned Cart", femmeOR: "38%", femmeConv: "8.4%", industryOR: "42%", industryConv: "12.2%", topPerformer: "Blue Illusion: 54% OR" },
    { flow: "Browse Abandonment", femmeOR: "28%", femmeConv: "2.8%", industryOR: "32%", industryConv: "4.2%", topPerformer: "Decjuba: 38% OR" },
    { flow: "Post-Purchase", femmeOR: "52%", femmeConv: "6.4%", industryOR: "48%", industryConv: "5.8%", topPerformer: "Femme: Leading" },
    { flow: "Winback", femmeOR: "24%", femmeConv: "4.2%", industryOR: "28%", industryConv: "6.8%", topPerformer: "Zara: 36% OR" },
    { flow: "VIP Tier Unlock", femmeOR: "48%", femmeConv: "8.8%", industryOR: "52%", industryConv: "11.2%", topPerformer: "Blue Illusion: 64% OR" },
  ];

  // SMS Campaign Performance
  const smsPerformance = [
    { brand: "H&M", frequency: "2.4/week", deliveryRate: "95.8%", ctr: "11.2%", convRate: "5.8%", unsubRate: "0.9%" },
    { brand: "Decjuba", frequency: "1.6/week", deliveryRate: "97.4%", ctr: "14.8%", convRate: "8.2%", unsubRate: "0.5%" },
    { brand: "St Frock", frequency: "1.8/week", deliveryRate: "96.2%", ctr: "12.4%", convRate: "6.4%", unsubRate: "0.7%" },
    { brand: "Blue Illusion", frequency: "0.8/week", deliveryRate: "98.6%", ctr: "16.8%", convRate: "9.8%", unsubRate: "0.3%" },
    { brand: "Femme Connection", frequency: "1.4/week", deliveryRate: "96.8%", ctr: "13.2%", convRate: "6.8%", unsubRate: "0.7%" },
  ];

  // Email Send Time Analysis
  const sendTimeData = [
    { hour: "6am", hm: 4, stfrock: 2, decjuba: 6, femme: 6, zara: 8, blueillusion: 12, zimmermann: 18 },
    { hour: "8am", hm: 18, stfrock: 14, decjuba: 22, femme: 22, zara: 26, blueillusion: 32, zimmermann: 38 },
    { hour: "10am", hm: 32, stfrock: 28, decjuba: 38, femme: 38, zara: 42, blueillusion: 48, zimmermann: 54 },
    { hour: "12pm", hm: 22, stfrock: 18, decjuba: 24, femme: 24, zara: 28, blueillusion: 36, zimmermann: 42 },
    { hour: "2pm", hm: 16, stfrock: 22, decjuba: 18, femme: 20, zara: 22, blueillusion: 26, zimmermann: 22 },
    { hour: "4pm", hm: 6, stfrock: 12, decjuba: 8, femme: 10, zara: 12, blueillusion: 14, zimmermann: 10 },
    { hour: "6pm", hm: 2, stfrock: 4, decjuba: 4, femme: 4, zara: 4, blueillusion: 6, zimmermann: 4 },
  ];

  // Segmentation Strategy
  const segmentationStrategies = [
    { brand: "Zimmermann", segments: 16, vipTier: "Yes", behavioral: "Advanced", geographic: "Yes", engagement: "5-tier" },
    { brand: "Blue Illusion", segments: 12, vipTier: "Yes", behavioral: "Advanced", geographic: "Yes", engagement: "4-tier" },
    { brand: "Decjuba", segments: 10, vipTier: "Yes", behavioral: "Moderate", geographic: "Yes", engagement: "3-tier" },
    { brand: "Zara", segments: 14, vipTier: "Yes", behavioral: "Advanced", geographic: "Yes", engagement: "4-tier" },
    { brand: "H&M", segments: 11, vipTier: "Yes", behavioral: "Moderate", geographic: "Yes", engagement: "3-tier" },
    { brand: "St Frock", segments: 8, vipTier: "No", behavioral: "Basic", geographic: "No", engagement: "2-tier" },
    { brand: "Femme Connection", segments: 7, vipTier: "No", behavioral: "Basic", geographic: "No", engagement: "2-tier" },
  ];

  // Recent Campaign Examples (Last 7 days)
  const recentCampaigns = [
    { brand: "Decjuba", subject: "Win a $3,000 Winter Wardrobe", sent: "Today", openRate: "44.6%", ctr: "7.8%", type: "Promotional" },
    { brand: "Blue Illusion", subject: "From Our Family to Yours", sent: "12 days ago", openRate: "52.4%", ctr: "8.2%", type: "Editorial" },
    { brand: "Zara", subject: "Woman - Winter Wardrobe", sent: "18 days ago", openRate: "42.8%", ctr: "6.4%", type: "New Arrivals" },
    { brand: "H&M", subject: "New Arrivals", sent: "34 days ago", openRate: "38.2%", ctr: "5.2%", type: "New Arrivals" },
    { brand: "Zimmermann", subject: "Natura - Spring 2024 Runway Unveiling", sent: "206 days ago", openRate: "58.4%", ctr: "9.8%", type: "Editorial" },
  ];

  // Visual Campaign Examples (Actual Panoramata Tracked Campaigns)
  const visualCampaignExamples = [
    {
      brand: "Zimmermann",
      subject: "Natura - The Unveiling of Our Spring 2024 Runway",
      type: "Editorial",
      openRate: "58.4%",
      ctr: "9.8%",
      sentDate: "Oct 5, 2023",
      image: zimmermannEmail,
      designNotes: "Premium luxury aesthetic, minimalist layout, soft earth tones, high-end editorial photography, whitespace emphasis",
      insights: {
        layout: "Single-column vertical scroll, 6 content blocks, minimal header with logo only",
        structure: "Hero runway image → Collection name → Product pairs (2x2 grid) → Footer with social links",
        ctaCount: 1,
        ctaType: "Subtle 'Discover the Collection' text link",
        colorPalette: "Soft neutrals (cream, beige, white), earth tones",
        typography: "Serif headers, minimal copy, elegant spacing",
        imageRatio: "Editorial 3:4, lifestyle runway shots, high-res professional photography",
        whitespace: "Generous (40%+ of email), creates premium feel",
        keyTakeaway: "Luxury positioning through restraint - minimal text, maximum visual impact, zero urgency or discount messaging"
      }
    },
    {
      brand: "Zara",
      subject: "Woman - Winter Wardrobe",
      type: "New Arrivals",
      openRate: "42.8%",
      ctr: "6.4%",
      sentDate: "Apr 11, 2026",
      image: zaraEmail,
      designNotes: "Minimalist design, monochromatic palette, large product imagery, clean typography, subtle SALE positioning",
      insights: {
        layout: "Single-column, 8 content blocks, clean header with SALE tag",
        structure: "Large hero image (monochrome fashion) → Category sections → Product grids (2x2) → Minimal footer",
        ctaCount: 2,
        ctaType: "Text links 'DOWNLOAD OUR APP' positioned subtly",
        colorPalette: "Black, white, grey - strict monochrome",
        typography: "Sans-serif, uppercase headers, minimal body copy",
        imageRatio: "Mix of lifestyle (full-width) and product shots (grid)",
        whitespace: "Moderate (25%), functional minimalism",
        keyTakeaway: "Fast-fashion premium approach - clean design elevates affordable product, SALE messaging present but not dominant"
      }
    },
    {
      brand: "H&M",
      subject: "New Arrivals",
      type: "New Arrivals",
      openRate: "38.2%",
      ctr: "5.2%",
      sentDate: "Mar 26, 2026",
      image: hmEmail,
      designNotes: "Clean layout, black & white aesthetic, 'Corporate Core' trend positioning, mixed editorial and product shots",
      insights: {
        layout: "Single-column, 10+ content blocks, prominent logo header",
        structure: "Trend headline 'Corporate Core' → Hero image → Mixed lifestyle/product shots → Multi-product grids → Footer with H&M Club",
        ctaCount: 3,
        ctaType: "Shop buttons, H&M Club CTA, category links",
        colorPalette: "B&W editorial shots with pops of color (red, burgundy)",
        typography: "Sans-serif, mixed case, trend-forward copy",
        imageRatio: "Varied - full-width editorial, 2x2 product grids, single hero shots",
        whitespace: "Low (15%), content-dense approach",
        keyTakeaway: "Trend-led merchandising - 'Corporate Core' positions fast fashion as culturally relevant, multiple entry points drive CTR"
      }
    },
    {
      brand: "Decjuba",
      subject: "Win a $3,000 Winter Wardrobe",
      type: "Promotional",
      openRate: "44.6%",
      ctr: "7.8%",
      sentDate: "Apr 29, 2026",
      image: decjubaEmail,
      designNotes: "Contest-driven engagement, aspirational lifestyle imagery, product grid showcase, clear entry CTA, loyalty program integration",
      insights: {
        layout: "Single-column, 12+ content blocks, header with loyalty tier",
        structure: "Large contest hero → Entry CTA → 'These Could Be Yours' product grid (9 items) → Loyalty program details → Footer",
        ctaCount: 2,
        ctaType: "Primary 'ENTER NOW' button + loyalty program enrollment",
        colorPalette: "Monochrome lifestyle hero, clean product shots on white",
        typography: "Sans-serif, large impact numbers ($3,000), clear hierarchy",
        imageRatio: "Hero lifestyle (16:9), product grid (square thumbnails)",
        whitespace: "Moderate (20%), organized sections with breathing room",
        keyTakeaway: "Contest hooks drive engagement (44.6% OR) - aspirational prize value, clear product showcase, loyalty integration creates ongoing engagement beyond single campaign"
      }
    },
    {
      brand: "St Frock",
      subject: "Take Notes...",
      type: "New Arrivals",
      openRate: "36.8%",
      ctr: "4.6%",
      sentDate: "Oct 4, 2023",
      image: stFrockEmail,
      designNotes: "Category-based layout, bright bold colors, occasion-driven merchandising, multiple sections with clear CTAs, promotional urgency (20% off)",
      insights: {
        layout: "Single-column, 15+ content blocks, branded header with tagline",
        structure: "5 Occasion categories (Work Hard, Boss Up in Black, Flex in Florals, Bold for Business, Grace in Graphics) → Each with hero model shot + CTA → Yellow 20% OFF promotion footer",
        ctaCount: 7,
        ctaType: "5 category 'SHOP NOW' buttons + promotional CTA + social links",
        colorPalette: "Bright saturated colors (blue, pink, yellow), high contrast",
        typography: "Mixed fonts, playful headers, action-oriented copy",
        imageRatio: "Full-width lifestyle shots (vertical), model-focused",
        whitespace: "Minimal (10%), content-heavy with rapid scrolling",
        keyTakeaway: "Category overload creates decision fatigue - 5 occasions + discount = competing CTAs, bright aesthetic appeals to younger demographic but 36.8% OR suggests message dilution",
        expandable: true,
        expandedInsights: {
          categories: [
            { name: "Work Hard, Slay Hard", color: "Blue dress", modelPose: "Office setting" },
            { name: "Boss Up in Black", color: "Black dresses", modelPose: "Confident group shot" },
            { name: "Flex in Florals", color: "Pink/floral patterns", modelPose: "Playful trio" },
            { name: "Bold for Business", color: "Bright blue, pink, teal", modelPose: "Professional power stance" },
            { name: "Grace in Graphics", color: "Pink/white patterns", modelPose: "Feminine group shot" }
          ],
          promoStrategy: "Yellow banner '20% OFF A WORK TOP' - urgency-driven discount at bottom competes with category messaging",
          demographicTarget: "25-35 working women, occasion-based shopping behavior",
          layoutIssues: "Too many sections (5) creates scroll fatigue, each section needs individual decision, no clear hero or priority",
          recommendations: "Reduce to 2-3 categories max, establish visual hierarchy, single hero CTA, move discount to header for clarity"
        }
      }
    },
    {
      brand: "Blue Illusion",
      subject: "From Our Family to Yours",
      type: "Editorial",
      openRate: "52.4%",
      ctr: "8.2%",
      sentDate: "Apr 17, 2026",
      image: blueIllusionEmail,
      designNotes: "Emotional storytelling, family-focused messaging (Easter), product storytelling sections, warm color palette, mature demographic targeting",
      insights: {
        layout: "Single-column, 10 content blocks, classic header with logo",
        structure: "Hero 'Donna' emotional narrative → Family photo editorial → 'Emotion, Makes Me' product section → Category blocks with narrative copy → Social footer",
        ctaCount: 4,
        ctaType: "Soft 'Shop' text links integrated into storytelling sections",
        colorPalette: "Warm earth tones (burgundy, cream, navy), sophisticated palette for 45+ demographic",
        typography: "Serif headers, storytelling body copy, readable 14px+ text for mature audience",
        imageRatio: "Editorial lifestyle (full-width), product showcases with context, family moments",
        whitespace: "Generous (35%), comfortable reading experience",
        keyTakeaway: "Emotional storytelling drives 52.4% OR - Easter family narrative creates connection before product, mature demographic responds to authentic moments over urgency, product as lifestyle enabler not transaction"
      }
    },
  ];

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          label="Competitor Avg Open Rate"
          value="45.5%"
          change="vs FC 36.4%"
          changeType="neutral"
        />
        <MetricCard
          label="Industry Avg CTR"
          value="7.0%"
          change="vs FC 4.4%"
          changeType="neutral"
        />
        <MetricCard
          label="Top Performer Conv Rate"
          value="6.8%"
          change="Zimmermann (Luxury)"
          changeType="positive"
        />
        <MetricCard
          label="Tracked Campaigns (30d)"
          value="86"
          change="Across 6 competitors"
          changeType="neutral"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <AIInsightCard
          title="Email Performance Benchmark Analysis"
          content="FC email performance (36.4% OR, 4.4% CTR, 2.2% conv) sits in lower quartile vs competitors. Premium brands (Zimmermann 58.4% OR, Blue Illusion 52.4%) achieve 52% higher open rates through lower send frequency (1.2-2.4/week vs FC 3.8/week), sophisticated segmentation (12-16 segments vs FC 7), and editorial-driven content (38-48% vs FC 16%). Fast-fashion brands (H&M 5.8/week, St Frock 4.4/week) sacrifice engagement for volume. Decjuba's contest-driven approach (44.6% OR) proves promotional can work with strong hooks. Opportunity: reduce send frequency 35%, implement VIP tiering, shift content mix to 35% editorial/storytelling."
          cta={{ label: "View Full Email Analysis", onClick: () => setShowEmailModal(true) }}
        />
        <AIInsightCard
          title="SMS & Flow Optimization Insights"
          content="SMS emerging as high-conversion channel: Blue Illusion achieving 16.8% CTR, 9.8% conv at just 0.8/week frequency vs FC 13.2% CTR, 6.8% conv at 1.4/week. Quality over quantity proven - Blue Illusion's low frequency + mature demographic targeting drives superior results. Flow performance gaps identified: FC abandoned cart underperforming industry by 31% (8.4% vs 12.2% conv), welcome series by 33% (3.2% vs 4.8%). Recommendation: rebuild abandoned cart flow with 3-email sequence + SMS, implement age/demographic-based welcome series, reduce SMS frequency to 1.0/week focusing on high-intent moments only."
          variant="accent"
          cta={{ label: "View Flow Benchmarks", onClick: () => setShowEmailModal(true) }}
        />
      </div>

      {/* Competitor Email Metrics Overview */}
      <Card>
        <CardTitle>Competitor Email Performance Overview</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Send frequency · Open rates · CTR · Conversion · SMS frequency · Flow count</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[var(--border-color)]">
              <tr className="text-left">
                <th className="pb-3 pr-8 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>BRAND</th>
                <th className="pb-3 px-6 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>SEND FREQ</th>
                <th className="pb-3 px-6 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>OPEN RATE</th>
                <th className="pb-3 px-6 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>CTR</th>
                <th className="pb-3 px-6 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>CONV RATE</th>
                <th className="pb-3 px-6 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>SMS FREQ</th>
                <th className="pb-3 pl-6 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>FLOWS</th>
              </tr>
            </thead>
            <tbody>
              {competitorEmailMetrics.map((comp, idx) => (
                <tr key={idx} className={`border-b border-[var(--border-color)] hover:bg-[var(--surface)] transition-colors ${comp.brand === "Femme Connection" ? 'bg-[var(--pink-light)]' : ''}`}>
                  <td className="py-4 pr-8">
                    <div className="flex items-center gap-2">
                      <div className="text-[14px] font-medium text-[var(--text-primary)]">{comp.brand}</div>
                      {comp.brand === "Femme Connection" && <Tag variant="pink" size="xs">US</Tag>}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[14px] font-medium text-[var(--text-primary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>{comp.sendFreq}</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-right" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className={parseFloat(comp.openRate) > 45 ? "text-[var(--green)]" : parseFloat(comp.openRate) > 35 ? "text-[var(--text-primary)]" : "text-[var(--terra)]"}>
                      {comp.openRate}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[14px] font-medium text-right" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className={parseFloat(comp.ctr) > 6 ? "text-[var(--green)]" : "text-[var(--text-primary)]"}>
                      {comp.ctr}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[14px] font-medium text-right" style={{ fontFamily: "var(--font-mono)" }}>
                    <span className={parseFloat(comp.convRate) > 4 ? "text-[var(--green)]" : "text-[var(--text-primary)]"}>
                      {comp.convRate}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-[var(--text-secondary)] text-right">{comp.smsFreq}</td>
                  <td className="py-4 pl-6 text-[14px] font-medium text-[var(--text-primary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>{comp.flowCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Campaign Type Mix & Send Time Analysis */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardTitle>Campaign Type Mix Comparison</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Content strategy by campaign type · % of total sends</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignTypeData} layout="vertical">
              <CartesianGrid key="campaign-grid" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="campaign-xaxis" type="number" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} />
              <YAxis key="campaign-yaxis" type="category" dataKey="type" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} width={120} />
              <Tooltip key="campaign-tooltip" />
              <Legend key="campaign-legend" wrapperStyle={{ fontSize: '11px' }} />
              <Bar key="bar-zimmermann" dataKey="zimmermann" fill="var(--green)" name="Zimmermann" />
              <Bar key="bar-blueillusion" dataKey="blueillusion" fill="var(--green-mid)" name="Blue Illusion" />
              <Bar key="bar-zara" dataKey="zara" fill="var(--terra)" name="Zara" />
              <Bar key="bar-femme" dataKey="femme" fill="var(--pink)" name="Femme" />
              <Bar key="bar-hm" dataKey="hm" fill="var(--buff-dark)" name="H&M" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardTitle>Optimal Send Time Analysis</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Open rate performance by send time · Competitor benchmarks</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sendTimeData}>
              <CartesianGrid key="sendtime-grid" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="sendtime-xaxis" dataKey="hour" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} />
              <YAxis key="sendtime-yaxis" stroke="var(--text-tertiary)" style={{ fontSize: '11px' }} label={{ value: 'Open Rate %', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }} />
              <Tooltip key="sendtime-tooltip" />
              <Legend key="sendtime-legend" wrapperStyle={{ fontSize: '11px' }} />
              <Line key="line-zimmermann-time" type="monotone" dataKey="zimmermann" stroke="var(--green)" name="Zimmermann" strokeWidth={2} />
              <Line key="line-blueillusion-time" type="monotone" dataKey="blueillusion" stroke="var(--green-mid)" name="Blue Illusion" strokeWidth={2} />
              <Line key="line-zara-time" type="monotone" dataKey="zara" stroke="var(--terra)" name="Zara" strokeWidth={2} />
              <Line key="line-femme-time" type="monotone" dataKey="femme" stroke="var(--pink)" name="Femme" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Flow Performance Benchmarks */}
      <Card>
        <CardTitle>Flow Performance Benchmarking</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Femme Connection vs Industry vs Top Performer · Open rates & conversion rates</p>
        <div className="space-y-4">
          {flowBenchmarks.map((flow, idx) => (
            <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[15px] font-medium text-[var(--text-primary)]">{flow.flow}</div>
                <div className="text-[11px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>{flow.topPerformer}</div>
              </div>
              <div className="grid grid-cols-6 gap-4">
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>FC OPEN RATE</div>
                  <div className="text-[18px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{flow.femmeOR}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>FC CONV</div>
                  <div className="text-[18px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>{flow.femmeConv}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>INDUSTRY OR</div>
                  <div className="text-[18px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{flow.industryOR}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>INDUSTRY CONV</div>
                  <div className="text-[18px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>{flow.industryConv}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>GAP ANALYSIS</div>
                  <div className="flex items-center gap-2">
                    {parseFloat(flow.femmeConv) >= parseFloat(flow.industryConv) ? (
                      <>
                        <TrendingUp className="w-4 h-4 text-[var(--green)]" />
                        <span className="text-[13px] font-medium text-[var(--green)]">Above industry</span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-4 h-4 text-[var(--terra)]" />
                        <span className="text-[13px] font-medium text-[var(--terra)]">
                          {Math.round(((parseFloat(flow.industryConv) - parseFloat(flow.femmeConv)) / parseFloat(flow.industryConv)) * 100)}% gap
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Subject Line Patterns & SMS Performance */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardTitle>Subject Line Pattern Analysis</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Competitor patterns · Usage frequency · Performance · Examples</p>
          <div className="space-y-3">
            {subjectLinePatterns.map((pattern, idx) => (
              <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4 hover:border-[var(--border-strong)] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[14px] font-medium text-[var(--text-primary)]">{pattern.pattern}</div>
                  <div className="flex items-center gap-3">
                    <Tag variant="default" size="sm">{pattern.usage} usage</Tag>
                    <div className="text-[16px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{pattern.avgOpen}</div>
                  </div>
                </div>
                <div className="text-[13px] text-[var(--text-secondary)] mb-2 italic">"{pattern.example}"</div>
                <div className="text-[11px] text-[var(--text-tertiary)]">{pattern.brands}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>SMS Campaign Performance</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Frequency · Delivery · CTR · Conversion · Unsubscribe rates</p>
          <div className="space-y-3">
            {smsPerformance.map((sms, idx) => (
              <div key={idx} className={`border rounded-[var(--radius-md)] p-4 ${sms.brand === "Femme Connection" ? 'border-2 border-[var(--pink)] bg-[var(--pink-light)]' : 'border-[var(--border-color)]'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[14px] font-medium text-[var(--text-primary)]">{sms.brand}</div>
                  <div className="text-[13px] text-[var(--text-secondary)]">{sms.frequency}</div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>DELIVERY</div>
                    <div className="text-[14px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{sms.deliveryRate}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>CTR</div>
                    <div className="text-[14px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{sms.ctr}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>CONV</div>
                    <div className="text-[14px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{sms.convRate}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>UNSUB</div>
                    <div className="text-[14px] font-bold text-[var(--terra)]" style={{ fontFamily: "var(--font-mono)" }}>{sms.unsubRate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Segmentation Strategy & Recent Campaigns */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardTitle>Segmentation Strategy Comparison</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Segment count · VIP programs · Behavioral targeting · Engagement tiers</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[var(--border-color)]">
                <tr className="text-left">
                  <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>BRAND</th>
                  <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>SEGMENTS</th>
                  <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>VIP</th>
                  <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>BEHAVIORAL</th>
                  <th className="pb-3 text-[11px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>ENGAGEMENT</th>
                </tr>
              </thead>
              <tbody>
                {segmentationStrategies.map((seg, idx) => (
                  <tr key={idx} className={`border-b border-[var(--border-color)] ${seg.brand === "Femme Connection" ? 'bg-[var(--pink-light)]' : ''}`}>
                    <td className="py-3 text-[13px] font-medium text-[var(--text-primary)]">{seg.brand}</td>
                    <td className="py-3 text-[16px] font-bold text-[var(--text-primary)] text-right" style={{ fontFamily: "var(--font-mono)" }}>{seg.segments}</td>
                    <td className="py-3">
                      <Tag variant={seg.vipTier === "Yes" ? "green" : "default"} size="xs">{seg.vipTier}</Tag>
                    </td>
                    <td className="py-3">
                      <Tag variant={seg.behavioral === "Advanced" ? "green" : seg.behavioral === "Moderate" ? "default" : "terra"} size="xs">
                        {seg.behavioral}
                      </Tag>
                    </td>
                    <td className="py-3 text-[13px] text-[var(--text-secondary)]">{seg.engagement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI Insight for Segmentation */}
          <div className="mt-6 p-4 bg-[var(--pink-light)] border-2 border-[var(--pink)] rounded-[var(--radius-lg)]">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--pink)] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[13px] font-medium text-[var(--pink-dark)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                  SEGMENTATION GAP ANALYSIS · FEMME CONNECTION
                </div>
                <div className="text-[14px] text-[var(--text-primary)] leading-relaxed">
                  FC operates with 7 segments vs top performers Zimmermann (16), Zara (14), and Blue Illusion (12). Missing VIP tier program limiting ability to deliver early access and exclusive perks that drive 52%+ open rates (Blue Illusion's VIP program achieves 64% OR on tier unlock flows). Behavioral targeting rated "Basic" vs competitor "Advanced" - no browse abandonment triggers, product affinity segmentation, or lifecycle stage differentiation. Engagement tracking limited to 2-tier (active/inactive) vs Zimmermann's 5-tier system enabling granular re-engagement flows. <span className="font-medium text-[var(--pink-dark)]">Recommendation: implement 3-tier VIP program (Bronze/Silver/Gold based on LTV), add 5 behavioral segments (category affinity, browse behavior, cart value, purchase frequency, seasonality), expand engagement scoring to 4-tier system.</span> Estimated impact: +9-14% open rate, +28% in VIP segment conversion.
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>Recent Campaign Tracking (Last 7 Days)</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Live competitor campaign monitoring · Performance benchmarks</p>
          <div className="space-y-3">
            {recentCampaigns.map((campaign, idx) => (
              <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4 hover:border-[var(--border-strong)] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[13px] font-medium text-[var(--text-primary)]">{campaign.brand}</div>
                  <Tag variant="default" size="xs">{campaign.type}</Tag>
                </div>
                <div className="text-[14px] text-[var(--text-secondary)] mb-3 line-clamp-1">"{campaign.subject}"</div>
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-[var(--text-tertiary)]">{campaign.sent}</div>
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[11px] text-[var(--text-tertiary)] mr-1">OR:</span>
                      <span className="text-[13px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{campaign.openRate}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[var(--text-tertiary)] mr-1">CTR:</span>
                      <span className="text-[13px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{campaign.ctr}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Visual Campaign Examples */}
      <Card>
        <CardTitle>Campaign Creative Examples</CardTitle>
        <p className="text-[13px] text-[var(--text-secondary)] mb-6">Visual benchmarking · Design patterns · Layout strategies · Content approach</p>

        <div className="grid grid-cols-3 gap-6">
          {visualCampaignExamples.map((campaign, idx) => (
            <div key={idx} className="border-2 border-[var(--border-color)] rounded-[var(--radius-lg)] overflow-hidden hover:border-[var(--border-strong)] transition-all group">
              {/* Email Campaign Image */}
              <div className="relative bg-white border-b border-[var(--border-color)] overflow-hidden">
                <img
                  src={campaign.image}
                  alt={`${campaign.brand} - ${campaign.subject}`}
                  className="w-full h-auto object-contain"
                />

                {/* Performance Badge Overlay */}
                <div className="absolute top-3 right-3">
                  <Tag variant={
                    campaign.brand === "Zimmermann" || campaign.brand === "Blue Illusion" ? "green" :
                    campaign.brand === "Zara" || campaign.brand === "Decjuba" ? "default" :
                    "terra"
                  } size="xs">
                    {campaign.type}
                  </Tag>
                </div>

                {/* Hover Overlay with Design Notes */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="text-[11px] text-white/70 mb-2" style={{ fontFamily: "var(--font-mono)" }}>DESIGN ANALYSIS</div>
                    <div className="text-[12px] text-white leading-relaxed">
                      {campaign.designNotes}
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Metrics */}
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[14px] font-medium text-[var(--text-primary)]">{campaign.brand}</div>
                  <div className="text-[10px] text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                    {campaign.sentDate}
                  </div>
                </div>
                <div className="text-[12px] text-[var(--text-secondary)] mb-3 line-clamp-1">"{campaign.subject}"</div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>OPEN RATE</div>
                    <div className={`text-[16px] font-bold ${parseFloat(campaign.openRate) > 50 ? 'text-[var(--green)]' : parseFloat(campaign.openRate) > 40 ? 'text-[var(--text-primary)]' : 'text-[var(--terra)]'}`} style={{ fontFamily: "var(--font-mono)" }}>
                      {campaign.openRate}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>CTR</div>
                    <div className={`text-[16px] font-bold ${parseFloat(campaign.ctr) > 7 ? 'text-[var(--green)]' : parseFloat(campaign.ctr) > 5 ? 'text-[var(--text-primary)]' : 'text-[var(--terra)]'}`} style={{ fontFamily: "var(--font-mono)" }}>
                      {campaign.ctr}
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="pt-4 border-t border-[var(--border-color)]">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3 h-3 text-[var(--pink)]" />
                    <div className="text-[10px] font-medium text-[var(--text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                      CAMPAIGN ANALYSIS
                    </div>
                  </div>

                  <div className="space-y-2 text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    <div><span className="font-medium text-[var(--text-primary)]">Layout:</span> {campaign.insights.layout}</div>
                    <div><span className="font-medium text-[var(--text-primary)]">Structure:</span> {campaign.insights.structure}</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><span className="font-medium text-[var(--text-primary)]">CTAs:</span> {campaign.insights.ctaCount}</div>
                      <div><span className="font-medium text-[var(--text-primary)]">Whitespace:</span> {campaign.insights.whitespace}</div>
                    </div>
                    <div><span className="font-medium text-[var(--text-primary)]">Color:</span> {campaign.insights.colorPalette}</div>
                    <div className="pt-2 border-t border-[var(--border-color)]">
                      <span className="font-medium text-[var(--pink)]">Key Insight:</span> {campaign.insights.keyTakeaway}
                    </div>

                    {/* Expandable Section for St Frock */}
                    {campaign.insights.expandable && (
                      <div className="pt-2">
                        <button
                          onClick={() => setExpandedCampaign(expandedCampaign === idx ? null : idx)}
                          className="flex items-center gap-2 text-[11px] font-medium text-[var(--pink)] hover:text-[var(--pink-dark)] transition-colors"
                        >
                          {expandedCampaign === idx ? (
                            <>
                              <ChevronUp className="w-3 h-3" />
                              Hide Detailed Breakdown
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3 h-3" />
                              Show Detailed Breakdown
                            </>
                          )}
                        </button>

                        {expandedCampaign === idx && campaign.insights.expandedInsights && (
                          <div className="mt-3 p-3 bg-[var(--surface)] rounded-[var(--radius-md)] space-y-3">
                            <div>
                              <div className="text-[10px] font-medium text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                                5 CATEGORY SECTIONS
                              </div>
                              <div className="space-y-1">
                                {campaign.insights.expandedInsights.categories.map((cat, catIdx) => (
                                  <div key={catIdx} className="text-[10px] text-[var(--text-secondary)]">
                                    • <span className="font-medium">{cat.name}</span> - {cat.color}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] font-medium text-[var(--text-primary)]">Promo Strategy:</div>
                              <div className="text-[10px] text-[var(--text-secondary)]">{campaign.insights.expandedInsights.promoStrategy}</div>
                            </div>
                            <div>
                              <div className="text-[10px] font-medium text-[var(--text-primary)]">Layout Issues:</div>
                              <div className="text-[10px] text-[var(--text-secondary)]">{campaign.insights.expandedInsights.layoutIssues}</div>
                            </div>
                            <div className="pt-2 border-t border-[var(--border-color)]">
                              <div className="text-[10px] font-medium text-[var(--pink)] mb-1">Recommendations:</div>
                              <div className="text-[10px] text-[var(--text-secondary)]">{campaign.insights.expandedInsights.recommendations}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design Pattern Insights */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="p-4 bg-[var(--green-light)] border border-[var(--green)] rounded-[var(--radius-lg)]">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[var(--green)]" />
              <div className="text-[12px] font-medium text-[var(--green-dark)]" style={{ fontFamily: "var(--font-mono)" }}>HIGH PERFORMING PATTERNS</div>
            </div>
            <div className="text-[13px] text-[var(--text-primary)] leading-relaxed">
              <span className="font-medium">Zimmermann (58.4% OR):</span> Premium luxury aesthetic with whitespace, soft earth tones, editorial photography. <span className="font-medium">Blue Illusion (52.4% OR):</span> Emotional storytelling, family narrative, product contextualization. <span className="font-medium">Decjuba (44.6% OR):</span> Contest-driven engagement with aspirational lifestyle imagery. Minimalist design + emotional storytelling outperforms promotional clutter by 21% OR.
            </div>
          </div>

          <div className="p-4 bg-[var(--terra-light)] border border-[var(--terra)] rounded-[var(--radius-lg)]">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-[var(--terra)]" />
              <div className="text-[12px] font-medium text-[var(--terra-dark)]" style={{ fontFamily: "var(--font-mono)" }}>LOWER PERFORMING PATTERNS</div>
            </div>
            <div className="text-[13px] text-[var(--text-primary)] leading-relaxed">
              <span className="font-medium">St Frock (36.8% OR):</span> Category-heavy layout with 5+ sections, bright clashing colors, promotional urgency (20% off), multiple CTAs create decision fatigue. <span className="font-medium">H&M (38.2% OR):</span> Generic "New Arrivals" subject line, lack of personalization. Recommendation: reduce sections to 2-3 max, single hero CTA, implement narrative hooks over discount-led messaging.
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
