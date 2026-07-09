import { useMemo, useState } from "react";
import { Card, CardTitle, MetricCard, Tag, AIInsightCard } from "../components/ui/Card";
import { FilterBar, StatGrid, ChartContainer } from "../components/ui/Filters";
import { useFilters } from "../context/FilterContext";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Users, Gift, Star, Award, Crown } from "lucide-react";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import { DetailedBriefModal, DetailedBriefData } from "../components/DetailedBriefModal";
import PageHeader from "../components/PageHeader";
const loyaltyHero = "https://placehold.co/750x750?text=loyaltyHero";

// Base data
const baseTierData = [
  { id: "bronze", tier: "Bronze", members: 8240, revenue: 124800, color: "var(--buff)" },
  { id: "silver", tier: "Silver", members: 2180, revenue: 218400, color: "var(--text-tertiary)" },
  { id: "gold", tier: "Gold", members: 847, revenue: 254100, color: "var(--pink)" },
];

const basePointsData = [
  { id: "jan", month: "Jan", issued: 42000, redeemed: 5040 },
  { id: "feb", month: "Feb", issued: 48000, redeemed: 6240 },
  { id: "mar", month: "Mar", issued: 52000, redeemed: 7280 },
  { id: "apr", month: "Apr", issued: 58000, redeemed: 8120 },
  { id: "may", month: "May", issued: 64000, redeemed: 9600 },
  { id: "jun", month: "Jun", issued: 68000, redeemed: 10880 },
];

const baseEngagementData = [
  { id: "week1", week: "Week 1", active: 2840, redemptions: 340 },
  { id: "week2", week: "Week 2", active: 3120, redemptions: 420 },
  { id: "week3", week: "Week 3", active: 2960, redemptions: 380 },
  { id: "week4", week: "Week 4", active: 3240, redemptions: 460 },
];

const topRewards = [
  { name: "$10 Off Next Purchase", redeemed: 1240, points: 500 },
  { name: "Free Shipping", redeemed: 980, points: 300 },
  { name: "$25 Off $100+", redeemed: 640, points: 1200 },
  { name: "Early Access to Sale", redeemed: 520, points: 800 },
  { name: "Birthday Bonus 2x Points", redeemed: 380, points: 0 },
];

export default function YotpoLoyalty() {
  const { getMultiplier, channel, dateRange } = useFilters();
  const [showForwardJetsModal, setShowForwardJetsModal] = useState(false);
  const [showSilverBulletModal, setShowSilverBulletModal] = useState(false);
  const [showLowHangingFruitModal, setShowLowHangingFruitModal] = useState(false);
  const [showLoyaltyIntelligenceModal, setShowLoyaltyIntelligenceModal] = useState(false);
  const [showAtRiskAlertModal, setShowAtRiskAlertModal] = useState(false);

  const multiplier = getMultiplier();

  // Dynamic calculations
  const metrics = useMemo(() => {
    return {
      totalMembers: Math.round(11267 * multiplier),
      activeRate: (28.4 * (0.9 + multiplier * 0.1)).toFixed(1),
      avgLifetimeValue: Math.round(542 * multiplier),
      redemptionRate: (16.2 * (0.85 + multiplier * 0.15)).toFixed(1),
    };
  }, [multiplier]);

  const tierData = useMemo(() => {
    return baseTierData.map(item => ({
      ...item,
      members: Math.round(item.members * multiplier),
      revenue: Math.round(item.revenue * multiplier),
    }));
  }, [multiplier]);

  const pointsData = useMemo(() => {
    return basePointsData.map(item => ({
      ...item,
      issued: Math.round(item.issued * multiplier),
      redeemed: Math.round(item.redeemed * multiplier),
    }));
  }, [multiplier]);

  const engagementData = useMemo(() => {
    return baseEngagementData.map(item => ({
      ...item,
      active: Math.round(item.active * multiplier),
      redemptions: Math.round(item.redemptions * multiplier),
    }));
  }, [multiplier]);

  const dateRangeLabels: Record<string, string> = {
    today: "Today",
    "7d": "Last 7 Days",
    "30d": "Last 30 Days",
    "90d": "Last 90 Days",
    mtd: "Month to Date",
    ytd: "Year to Date",
    custom: "Custom",
  };

  // Action Strip Data
  const actionStripData: ActionStripData = {
    silverBullet: {
      action: "Launch referral program leveraging 4.6★ Yotpo advocates — untapped word-of-mouth equity",
      impactLine: "Estimated: +300 new customers/month · CAC -40%",
      channel: "Yotpo Loyalty · Referrals"
    },
    lowHangingFruit: {
      action: "Send 'points expiring' email to 847 Gold members with unredeemed points",
      effortChip: "Easy · 1 day",
      impact: "+$28,400 incremental revenue · protect tier status",
      channelChip: "Klaviyo · Yotpo"
    },
    frameworkTasks: [
      { task: "VIP tier exclusive preview program", status: "In Progress" },
      { task: "Birthday flow automation", status: "Planned" },
      { task: "Points-for-reviews campaign", status: "On Track" }
    ]
  };

  const forwardJetsBrief: DetailedBriefData = {
    title: "VIP Tier Exclusive Preview Program Launch",
    category: "Framework Task · Loyalty Enhancement",
    overview: "Gold tier members (847 members, 7.5% of base) drive 43% of total loyalty revenue ($254,100) with $842 average LTV - 3x higher than Bronze tier. These high-value customers lack exclusive benefits beyond points accumulation - current program feels transactional vs VIP experience. Launching 'VIP Preview Access' program giving Gold members 48-hour early access to new collection drops, exclusive limited editions, and private sale events. Expected to increase Gold tier retention 18%, drive +$45,600 incremental revenue, and create aspirational tier value encouraging Silver→Gold upgrades.",
    goals: [
      "Launch VIP Preview Access program providing Gold tier exclusive benefits beyond points",
      "Increase Gold tier retention rate from 78% to 92% through enhanced tier value proposition",
      "Generate +$45,600 incremental revenue from early access purchases (estimated 35% participation, $155 AOV)",
      "Drive 120 Silver→Gold tier upgrades by creating aspirational exclusivity around Gold status"
    ],
    detailedBrief: {
      challenge: "Current Yotpo loyalty program heavily points-focused with limited tier differentiation. Gold members receive higher points earn rate (3x vs 1x Bronze) but lack exclusive experiential benefits creating emotional connection. Tier retention declining - Gold tier churn 22% annually as members feel benefits plateau after reaching top tier. Competitor programs (Sézane Le Club, Reformation Collective) offer VIP perks: early sale access, exclusive products, private shopping events - creating differentiated high-tier experience. Customer feedback (NPS verbatims) shows desire for 'VIP treatment' and 'exclusive access' beyond discounts. Silver tier members (2,180 members) have weak incentive to upgrade - Gold tier benefits (3x points) not compelling enough given $500 spend threshold.",
      approach: "Program Design: Gold members receive 48-hour early access to: (1) New collection launches (Spring, Fall drops), (2) Limited edition collaborations, (3) Private sale events (before general sale). Access delivered via dedicated email campaign with 'VIP Early Access' branding and unique early-access discount codes. Phase 1 (Week 1-2): Build infrastructure - create Gold member segment in Klaviyo, design VIP email template with premium aesthetic, set up early-access discount codes in Shopify (GOLDVIP48). Phase 2 (Week 3): Launch announcement - email Gold members introducing VIP Preview program. Phase 3 (Week 4+): Ongoing execution - activate VIP early access 48hrs before each collection launch, track participation rate, monitor AOV and conversion.",
      timeline: "4-week launch (2 weeks build, 1 week announcement, ongoing execution)",
      budget: "$2,800 (Klaviyo template design $800, limited edition product development $1,200, program marketing $800)"
    },
    nextSteps: [
      {
        step: "Gold Member Segmentation & VIP List Build",
        description: "Create dynamic Klaviyo segment: 'Gold Tier - Active VIP' filtering for Yotpo Gold tier status + active in last 90 days. Build list of 847 current Gold members with emails verified. Set up automated segment updates syncing with Yotpo tier changes daily.",
        owner: "CRM Manager"
      },
      {
        step: "VIP Email Template Design & Early Access Code Setup",
        description: "Design premium VIP email template: elevated aesthetic (gold accent colors, 'VIP Preview' badge), headline 'Your Exclusive Early Access Begins Now', countdown timer. Create template variants for different launch types. Set up Shopify discount codes: GOLDVIP48 (automatic 10% for Gold members, 48-hour expiration).",
        owner: "Email Designer + E-commerce"
      },
      {
        step: "VIP Program Launch Announcement",
        description: "Send announcement email to 847 Gold members: 'Introducing Your New VIP Benefit - Exclusive Preview Access'. Explain 48-hour early access to launches, limited editions, sales. Tease first early access. Track engagement: open rate target 45%, click rate target 18%.",
        owner: "Loyalty Manager"
      },
      {
        step: "First VIP Preview Execution & Performance Tracking",
        description: "Execute first VIP early access: email Gold members with preview, GOLDVIP48 code, 48-hour shopping window. Track: participation rate, AOV (target $155+), revenue, conversion rate. Compare VIP preview vs general launch performance. Survey participants for satisfaction feedback.",
        owner: "E-commerce + Loyalty Manager"
      }
    ],
    potentialOutcomes: {
      bestCase: "$68,400 incremental revenue if 45% Gold member participation at $180 AOV, Gold tier retention improves to 95%, 180 Silver→Gold upgrades",
      expected: "$45,600 incremental revenue (35% participation, 296 Gold members at $155 AOV), Gold tier retention improves from 78% to 92%, 120 Silver tier upgrades",
      metrics: [
        "VIP Preview participation rate",
        "Early access AOV vs general launch AOV",
        "Gold tier retention rate improvement",
        "Silver→Gold tier upgrade volume",
        "Gold member NPS change",
        "Incremental revenue from VIP events"
      ]
    }
  };

  const silverBulletBrief: DetailedBriefData = {
    title: "Yotpo Referral Program Activation Strategy",
    category: "Silver Bullet · Loyalty Expansion",
    overview: "Femme Connection has 4.6★ average Yotpo review rating with 2,847 total reviews - strong customer advocacy signal. Current loyalty program captures post-purchase engagement but lacks referral mechanism to leverage word-of-mouth. Industry benchmarks: referral programs generate 20-30% of new customer acquisitions at 40-60% lower CAC vs paid channels. Yotpo referral module available but not activated. Launching 'Share the Love' referral program expected to drive +300 new customers/month with $42 average CAC (vs $68 paid channel average - 40% reduction).",
    goals: [
      "Launch Yotpo referral program generating +300 new customer acquisitions per month",
      "Reduce customer acquisition cost from $68 (paid average) to $42 (referral channel) - 40% CAC improvement",
      "Drive +$54,000 incremental monthly revenue from referred customers (300 customers x $180 first purchase AOV)",
      "Convert 15% of active loyalty members (1,690 members) into referral advocates"
    ],
    detailedBrief: {
      challenge: "Current customer acquisition heavily reliant on paid channels: Meta ($68 CAC), Google ($52 CAC), Pinterest ($85 CAC). Paid CAC rising 18% YoY. Organic acquisition channels underdeveloped - referrals account for only 8% of new customers (industry average 25-30%). Yotpo review data shows strong brand advocacy: 4.6★ rating, 87% of reviews 4-5 stars. Customer feedback includes unprompted recommendations. Referral interest exists but no mechanism to capture it. Yotpo referral module available (included in current plan) but never activated.",
      approach: "Program Structure: Double-sided incentive - Advocate gets 500 loyalty points ($10 value) when referred friend makes first purchase. Friend gets 15% off first order. Phase 1 (Week 1): Activate Yotpo referral module, configure rewards, design templates. Phase 2 (Week 2): Soft launch to Gold tier (847 members). Phase 3 (Week 3-4): Full launch to all active members (11,267 members). Phase 4 (Ongoing): Optimize and create seasonal campaigns.",
      timeline: "4-week launch (1 week setup, 1 week soft launch, 2 weeks full rollout)",
      budget: "$3,200 (Yotpo setup $800, email design $600, landing page $1,200, social promotion $600)"
    },
    nextSteps: [
      {
        step: "Yotpo Referral Module Activation & Configuration",
        description: "Activate referral module in Yotpo admin. Configure: Advocate reward = 500 points ($10), Friend reward = 15% discount (auto-applied, 30-day validity). Set conversion event: friend first purchase (minimum $50). Generate referral link structure. Enable email/social sharing. Test end-to-end flow.",
        owner: "Loyalty Program Manager"
      },
      {
        step: "Referral Landing Page & Email Template Design",
        description: "Design referral landing page explaining program benefits and sharing options. Include social proof: '2,847 customers love us' + 4.6★ rating. Create 3 email templates: launch announcement, post-purchase prompt, referral reminder. Community-focused aesthetic vs transactional.",
        owner: "Email Designer + Web Developer"
      },
      {
        step: "Gold Tier Soft Launch & Feedback Collection",
        description: "Send to 847 Gold members as 'VIP early access'. Track: link generation rate (target 25%), friend CTR, conversion rate. Survey 50 participants for feedback. Optimize before full launch.",
        owner: "Loyalty Manager"
      },
      {
        step: "Full Launch & Ongoing Promotion",
        description: "Email all 11,267 active members. Add referral prompts to order confirmation, review request, loyalty dashboard. Promote on social. Create seasonal campaigns. Track monthly: referrals, referred customer LTV, advocate participation, referral CAC.",
        owner: "CRM + Social Media Manager"
      }
    ],
    potentialOutcomes: {
      bestCase: "+450 new customers/month if 20% participation, $36 CAC (45% reduction), $81,000 monthly revenue, referral becomes #2 acquisition channel",
      expected: "+300 new customers/month (15% participation), $42 CAC (40% lower than paid), $54,000 monthly revenue, 18-22% of new customer mix",
      metrics: [
        "Monthly referred customers",
        "Advocate participation rate",
        "Referral conversion rate",
        "Referral CAC vs paid CAC",
        "Referred customer LTV",
        "Referrals per advocate"
      ]
    }
  };

  const lowHangingFruitBrief: DetailedBriefData = {
    title: "Points Expiring Email Campaign - Gold Tier",
    category: "Low Hanging Fruit · Revenue Activation",
    overview: "847 Gold tier members have accumulated average 3,420 unredeemed points ($68 value) representing $57,600 in dormant customer value. 340 Gold members are 7 days from point expiration (May 6) - representing $23,120 in points at risk. Sending 'Points Expiring Soon' urgency email expected to drive 65% activation (221 members), generating +$28,400 incremental revenue (avg $128 redemption order). Quick 1-day implementation with proven urgency messaging.",
    goals: [
      "Activate 221 of 340 Gold members (65% target) with expiring points before May 6 deadline",
      "Generate +$28,400 incremental revenue from point redemption purchases",
      "Prevent Gold tier downgrade for at-risk members by triggering qualifying purchase",
      "Reduce points liability on balance sheet by converting dormant points to revenue"
    ],
    detailedBrief: {
      challenge: "340 Gold members inactive 11+ months with points expiring May 6. At risk of: losing points ($68 average), Gold tier downgrade, permanent disengagement. Current flows lack point expiration reminder. Industry best practice: proactive warnings 14-30 days before deadline drive 60-75% activation. Time-sensitive - only 7 days to activation window.",
      approach: "Day 1 (April 29): Build Klaviyo segment: Gold tier + points 500+ + last purchase >330 days. Design email: 'URGENT: Your 3,420 Points Expire May 6' with countdown timer, redemption CTA, product recommendations at $75-95. Send 6pm. Days 2-7: Monitor redemptions, SMS follow-up May 3, final email May 6.",
      timeline: "1-day setup, 7-day activation window",
      budget: "$420 (email design $180, SMS $120, Klaviyo setup $120)"
    },
    nextSteps: [
      {
        step: "Expiring Points Segment Build & Validation",
        description: "Create Klaviyo segment: Gold tier, points ≥500, last purchase Nov 1-15 2025 (expiring May 6). Expected: 340 members. Validate accuracy, exclude suppressed emails. Add personalization: name, points balance, expiration date.",
        owner: "CRM Analyst"
      },
      {
        step: "Urgency Email Design & Redemption Path",
        description: "Email: Subject 'URGENT: Your {{points}} Points Expire May 6'. Countdown timer, redemption options ($10 Off $75+, Free Shipping, $25 Off $100+), product recs $75-95. CTA: 'Shop Now & Redeem'. Test personalization and links.",
        owner: "Email Designer"
      },
      {
        step: "Multi-Touch Activation Campaign",
        description: "April 29 6pm: Send email to 340. May 3: SMS to non-openers (180 est). May 6 9am: Final email 'Today Only'. Monitor customer service volume for expiration inquiries.",
        owner: "CRM Manager + Customer Service"
      },
      {
        step: "Performance Analysis & Future Automation",
        description: "May 7: Analyze results - redemptions (target 221), revenue ($28,400 target), AOV ($128). Measure tier retention. Calculate ROI. Survey participants. Build automated 'Points Expiration Warning' flow for 14-day advance notice.",
        owner: "Loyalty Program Manager"
      }
    ],
    potentialOutcomes: {
      bestCase: "$36,800 revenue if 75% activation (255 members) at $144 AOV, 100% Gold retention, zero service complaints",
      expected: "$28,400 revenue (65% = 221 at $128 AOV), 85% tier retention, points liability reduced $15,080",
      metrics: [
        "Email open rate (target 48%)",
        "Redemption rate",
        "Revenue generated",
        "Average order value",
        "Gold tier retention rate",
        "Customer service inquiries"
      ]
    }
  };

  const loyaltyIntelligenceBrief: DetailedBriefData = {
    title: "High-Value Customer Acquisition Strategy",
    category: "Loyalty Intelligence · Strategic Insight",
    overview: "Gold tier members represent only 7.5% of loyalty base (847 of 11,267) but drive 43% of total revenue ($254,100). Average Gold LTV $842 vs $284 Bronze - 3x higher. Current acquisition doesn't differentiate by customer value potential - same CAC ($68) applied across segments. Opportunity: target campaigns toward high-value profiles matching Gold demographics. Strategic shift from volume to value-based acquisition expected to improve new customer LTV 35% and increase Gold enrollment from 7.5% to 12% within 12 months.",
    goals: [
      "Shift acquisition from volume-based to value-based targeting high-LTV profiles",
      "Increase new customer LTV from $180 to $245 (+35%) through profile targeting",
      "Grow Gold tier from 7.5% to 12% of base by enrolling high-value customers faster",
      "Improve ROAS on paid acquisition from 4.2x to 5.8x by focusing on high-LTV audiences"
    ],
    detailedBrief: {
      challenge: "Current acquisition treats all customers equally - same creative, targeting, CAC regardless of LTV potential. Gold tier analysis reveals distinct profile: higher AOV ($165 vs $95), sustainable fashion interest (78%), professional demographic (65% age 32-48, urban), repeat behavior (4.2 purchases/year vs 1.8). Paid acquisition optimized for conversion volume - broad targeting captures price-sensitive customers. Competitor targeting: Reformation targets 'conscious consumers', Sézane 'Parisian style' - aspirational vs transactional.",
      approach: "Phase 1: Gold Tier Profile Analysis - Export 847 members, analyze demographics, acquisition source, first purchase, engagement. Build 'High-Value Customer Profile'. Phase 2: Campaign Redesign - Meta: shift to 'sustainable fashion' targeting vs 'fashion deals'. Creative: emphasize quality, sustainability vs sales. Phase 3: Measurement - Track cohorts by targeting approach: LTV at 90 days, Gold enrollment rate, repeat purchase.",
      timeline: "8-week shift (2 weeks analysis, 4 weeks redesign, 2 weeks measurement)",
      budget: "$12,400 (analysis $2,400, creative $4,800, testing budget $5,200)"
    },
    nextSteps: [
      {
        step: "Gold Tier Customer Profile Analysis",
        description: "Export 847 Gold records from Yotpo + Shopify. Analyze: demographics (age, location), acquisition source, first purchase (category, AOV), behavioral (email engagement, reviews, referrals). Build 'High-Value Customer Profile' persona document.",
        owner: "Data Analyst + Loyalty Manager"
      },
      {
        step: "Paid Acquisition Targeting Redesign",
        description: "Redesign Meta: Lookalike from Gold list (1%), target 'sustainable fashion', 'ethical fashion', 'capsule wardrobe'. Pinterest: 'slow fashion', 'quality over quantity'. Google: Increase bids 25% on 'sustainable [product]', reduce 30% on 'cheap', 'discount'.",
        owner: "Paid Media Manager"
      },
      {
        step: "Creative & Messaging Strategy Shift",
        description: "Refresh creative: shift from discount ('25% Off') to value ('Timeless Quality', 'Investment Pieces'). Feature hero items, 4.6★ reviews, sustainability story. Test: lifestyle vs product imagery, sustainability vs quality messaging.",
        owner: "Creative Director + Copywriter"
      },
      {
        step: "New Customer LTV Tracking & Optimization",
        description: "Build LTV dashboard tracking cohorts by targeting: High-Value vs Volume. Measure at 30/60/90 days: LTV, repeat rate, Gold enrollment, engagement. Weekly optimization: reallocate to high-LTV audiences. Target: 35% LTV improvement ($180 to $245).",
        owner: "Performance Marketing + Data Analyst"
      }
    ],
    potentialOutcomes: {
      bestCase: "New customer LTV $285 (+58%), Gold enrollment 15%, ROAS 6.2x, CAC flat while value rises",
      expected: "LTV improves $180 to $245 (+35%), Gold enrollment 7.5% to 12%, ROAS 4.2x to 5.8x, sustainable quality shift",
      metrics: [
        "New customer LTV at 90 days",
        "Gold tier enrollment rate",
        "Paid acquisition ROAS",
        "Repeat purchase rate",
        "CAC by value segment",
        "Loyalty revenue from new cohorts"
      ]
    }
  };

  const atRiskAlertBrief: DetailedBriefData = {
    title: "Tier Downgrade Prevention Campaign",
    category: "At-Risk Alert · Retention Urgent",
    overview: "340 Gold members are 7 days from tier downgrade (May 6) due to 12-month inactivity. Downgrade triggers: loss of 3x points rate, loss of VIP access, psychological disengagement. Historical data: tier-downgraded customers have 68% higher churn rate in subsequent 6 months vs maintained-tier. Single purchase resets tier clock. Targeted retention campaign offering bonus points (500 = $10) expected to save 65% (221 customers), generating +$42,000 revenue while preventing $142,000 in future LTV loss.",
    goals: [
      "Prevent tier downgrade for 221 of 340 at-risk Gold members (65% save rate)",
      "Generate +$42,000 immediate revenue from retention purchases (221 x $190 AOV)",
      "Protect $142,000 in future LTV by preventing churn of reactivated members",
      "Build automated tier-risk detection for ongoing proactive retention"
    ],
    detailedBrief: {
      challenge: "340 Gold members inactive 11+ months approaching May 6 deadline. Root causes: seasonal patterns (annual shoppers), life events, competitive switching, passive churn. Downgrade consequences: loss aversion creates negative emotion → disengagement → churn. Data: tier-downgraded customers show 68% higher 6-month churn vs maintained (42% vs 25%). Average downgraded Gold = $640 LTV loss. 340 at-risk = $217,600 total LTV risk. Current system lacks proactive alerts.",
      approach: "Campaign: Email 340 with 'Tier Risk Alert'. Offer: 'Purchase by May 6 → Keep Gold + 500 bonus points'. Dual incentive: status preservation + financial benefit. Email: urgency headline, countdown (7 days), tier benefits reminder, bonus points, product recs $95-145. Send April 29 6pm. Follow-up: May 2 email non-openers, May 5 final SMS.",
      timeline: "1-day setup, 7-day activation window",
      budget: "$680 (email $280, SMS $200, bonus points $2,210)"
    },
    nextSteps: [
      {
        step: "At-Risk Identification & Impact Modeling",
        description: "Build segment: Gold tier, last purchase Nov 1-15 2025 (expires May 6). Expected: 340. Calculate: avg Gold LTV $842 x 68% increased churn = $572 at-risk per member. Total LTV protection: $194,480. Model ROI: 65% save (221) at $190 AOV = $42,000 revenue. Cost: $2,890. Return: 63x.",
        owner: "CRM Analyst + Loyalty Manager"
      },
      {
        step: "Tier Risk Email Design",
        description: "Email: Subject 'URGENT: Gold Tier Expires in 7 Days'. Body: tier risk alert, benefits reminder (3x points, VIP access), retention offer (Keep Gold + 500 Bonus Points badge), countdown timer, product recs $95-145. CTA: 'Shop Now & Keep Gold'. Premium + urgent aesthetic.",
        owner: "Email Designer + CRM Developer"
      },
      {
        step: "Multi-Channel Retention Campaign",
        description: "April 29 6pm: Send to 340. Track Days 1-3: open 52%, click 22%, purchase 15% (51). May 2: Email non-purchasers (289). May 5 9am: SMS to ~180 remaining 'Last 24 hours'. Monitor May 6 final day spike (30% of conversions expected). Brief customer service agents.",
        owner: "CRM Manager + CS Lead"
      },
      {
        step: "Post-Campaign Analysis & Automated System",
        description: "May 7: Analyze - saves (221/340 target), revenue ($42,000 target), AOV ($190). Measure May 6 tier retention. Calculate LTV impact. Survey 30: why purchased? (tier loss vs bonus vs urgency). Build automated flow: 'Tier Risk - 30 Days' triggers at 11 months for earlier intervention.",
        owner: "Loyalty Manager + CRM Developer"
      }
    ],
    potentialOutcomes: {
      bestCase: "$56,400 revenue if 75% save (255) at $221 AOV, 100% tier retention, $163,200 LTV protected, zero downgrades",
      expected: "$42,000 revenue (65% = 221 at $190 AOV), 85% retention (188 maintain Gold), $142,000 LTV protected, automated system built",
      metrics: [
        "Tier save rate",
        "Revenue from retention purchases",
        "Gold tier retention at May 6",
        "LTV protected",
        "Campaign ROI",
        "Alert effectiveness rates"
      ]
    }
  };

  return (
    <div>
      <PageHeader
        label="Channels · Loyalty & Retention"
        title="Yotpo Loyalty & Rewards"
        description="Comprehensive loyalty program analytics. Track member tiers, points activity, reward performance, and customer lifetime value optimisation powered by Yotpo."
        backgroundGradient="buff"
        image={loyaltyHero}
        externalLinks={[
          { name: "Yotpo Loyalty", url: "https://yotpo.com" },
        ]}
        stats={[
          { label: "Active Members", value: metrics.totalMembers.toLocaleString() },
          { label: "Member LTV", value: `$${metrics.avgLifetimeValue}` },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        <FilterBar />

      {/* Key Metrics Grid */}
      <StatGrid columns={4}>
        <MetricCard
          label="Total Members"
          value={metrics.totalMembers.toLocaleString()}
          change="+14.2%"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="Active Rate"
          value={`${metrics.activeRate}%`}
          change="+2.8%"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="Avg Member LTV"
          value={`$${metrics.avgLifetimeValue}`}
          change="+18.4%"
          changeType="positive"
          trend="up"
        />
        <MetricCard
          label="Redemption Rate"
          value={`${metrics.redemptionRate}%`}
          change="-1.2%"
          changeType="negative"
          trend="down"
        />
      </StatGrid>

      {/* 3-Part Action Strip */}
      <ActionStrip
        data={actionStripData}
        onSilverBulletClick={() => setShowSilverBulletModal(true)}
        onLowHangingFruitClick={() => setShowLowHangingFruitModal(true)}
        onFrameworkClick={() => setShowForwardJetsModal(true)}
      />

      {/* AI Insights Section */}
      <div className="grid grid-cols-2 gap-6">
        <AIInsightCard
          title="Loyalty Intelligence"
          content="Gold tier members drive 43% of total revenue despite being only 7.5% of the member base. Average Gold member LTV is $842 vs $284 for Bronze. Focus acquisition efforts on high-value customer profiles."
          showButton={true}
          onButtonClick={() => setShowLoyaltyIntelligenceModal(true)}
        />
        <AIInsightCard
          title="At-Risk Alert"
          content="340 members are 7 days from tier downgrade. Send targeted retention campaign offering bonus points for single purchase. Estimated save rate: 65% · Revenue impact: +$42,000."
          variant="accent"
          showButton={true}
          onButtonClick={() => setShowAtRiskAlertModal(true)}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        <ChartContainer
          title="Tier Distribution"
          subtitle="Members and revenue by loyalty tier"
          tag={{ label: "Yotpo", variant: "pink" }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tierData} id="loyalty-tier-chart">
              <CartesianGrid key="grid-loyalty-tier" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="xaxis-loyalty-tier" dataKey="tier" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <YAxis key="yaxis-loyalty-tier" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <Tooltip
                key="tooltip-loyalty-tier"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}
              />
              <Legend key="legend-loyalty-tier" wrapperStyle={{ fontSize: '12px' }} />
              <Bar key="bar-members" dataKey="members" fill="var(--green)" name="Members" radius={[8, 8, 0, 0]} id="bar-members" />
              <Bar key="bar-revenue" dataKey="revenue" fill="var(--pink)" name="Revenue ($)" radius={[8, 8, 0, 0]} id="bar-revenue" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer
          title="Points Activity"
          subtitle="Points issued vs redeemed (6 months)"
          tag={{ label: "Engagement", variant: "green" }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pointsData} id="loyalty-points-chart">
              <CartesianGrid key="grid-loyalty-points" strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis key="xaxis-loyalty-points" dataKey="month" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <YAxis key="yaxis-loyalty-points" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <Tooltip
                key="tooltip-loyalty-points"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px'
                }}
              />
              <Legend key="legend-loyalty-points" wrapperStyle={{ fontSize: '12px' }} />
              <Line key="line-issued" type="monotone" dataKey="issued" stroke="var(--green)" strokeWidth={3} name="Issued" id="line-issued" />
              <Line key="line-redeemed" type="monotone" dataKey="redeemed" stroke="var(--pink)" strokeWidth={3} name="Redeemed" id="line-redeemed" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Weekly Engagement */}
      <ChartContainer
        title="Weekly Member Engagement"
        subtitle="Active members and redemption activity"
        tag={{ label: "30 Day View", variant: "terra" }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={engagementData} id="loyalty-engagement-chart">
            <CartesianGrid key="grid-loyalty-engagement" strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis key="xaxis-loyalty-engagement" dataKey="week" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
            <YAxis key="yaxis-loyalty-engagement" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
            <Tooltip
              key="tooltip-loyalty-engagement"
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px'
              }}
            />
            <Legend key="legend-loyalty-engagement" wrapperStyle={{ fontSize: '12px' }} />
            <Bar key="bar-active" dataKey="active" fill="var(--green-mid)" name="Active Members" radius={[8, 8, 0, 0]} id="bar-active" />
            <Bar key="bar-redemptions" dataKey="redemptions" fill="var(--terra)" name="Redemptions" radius={[8, 8, 0, 0]} id="bar-redemptions" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Rewards */}
        <Card>
          <CardTitle>Top Redeemed Rewards</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">{dateRangeLabels[dateRange]} redemption activity</p>
          <div className="space-y-3">
            {topRewards.map((reward, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-[var(--border-color)] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--pink-light)] flex items-center justify-center">
                    <Gift className="w-4 h-4 text-[var(--pink)]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[var(--text-primary)]">{reward.name}</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">{reward.points > 0 ? `${reward.points} points` : "Auto reward"}</div>
                  </div>
                </div>
                <div className="text-[15px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                  {Math.round(reward.redeemed * multiplier).toLocaleString()} redeemed
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tier Health */}
        <Card>
          <CardTitle>Tier Health Summary</CardTitle>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">Member tier status and at-risk alerts</p>
          <div className="space-y-4">
            <div className="p-4 bg-[var(--buff)] rounded-[var(--radius-md)]">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-[var(--buff-dark)]" />
                <span className="text-[13px] font-medium text-[var(--text-primary)]">Bronze Tier</span>
              </div>
              <div className="text-[24px] font-medium text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                {Math.round(8240 * multiplier).toLocaleString()}
              </div>
              <div className="text-[12px] text-[var(--text-secondary)]">73% of member base · $152 avg LTV</div>
            </div>

            <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-[var(--text-tertiary)]" />
                <span className="text-[13px] font-medium text-[var(--text-primary)]">Silver Tier</span>
              </div>
              <div className="text-[24px] font-medium text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                {Math.round(2180 * multiplier).toLocaleString()}
              </div>
              <div className="text-[12px] text-[var(--text-secondary)]">19% of member base · $342 avg LTV</div>
            </div>

            <div className="p-4 bg-[var(--pink-light)] rounded-[var(--radius-md)]">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-[var(--pink)]" />
                <span className="text-[13px] font-medium text-[var(--text-primary)]">Gold Tier (VIP)</span>
              </div>
              <div className="text-[24px] font-medium text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                {Math.round(847 * multiplier).toLocaleString()}
              </div>
              <div className="text-[12px] text-[var(--text-secondary)]">8% of member base · $842 avg LTV</div>
              <div className="mt-2 text-[11px] text-[var(--terra)] font-medium">
                ⚠️ 340 members at risk of downgrade
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Brief Modals */}
      <DetailedBriefModal
        show={showForwardJetsModal}
        onClose={() => setShowForwardJetsModal(false)}
        data={forwardJetsBrief}
      />

      <DetailedBriefModal
        show={showSilverBulletModal}
        onClose={() => setShowSilverBulletModal(false)}
        data={silverBulletBrief}
      />

      <DetailedBriefModal
        show={showLowHangingFruitModal}
        onClose={() => setShowLowHangingFruitModal(false)}
        data={lowHangingFruitBrief}
      />

      <DetailedBriefModal
        show={showLoyaltyIntelligenceModal}
        onClose={() => setShowLoyaltyIntelligenceModal(false)}
        data={loyaltyIntelligenceBrief}
      />

      <DetailedBriefModal
        show={showAtRiskAlertModal}
        onClose={() => setShowAtRiskAlertModal(false)}
        data={atRiskAlertBrief}
      />
      </div>
    </div>
  );
}