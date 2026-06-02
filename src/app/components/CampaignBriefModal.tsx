import { X, Target, Calendar, DollarSign, Users, TrendingUp, Package, Mail, Share2, Sparkles } from "lucide-react";

interface CampaignBriefModalProps {
  show: boolean;
  onClose: () => void;
}

export function CampaignBriefModal({ show, onClose }: CampaignBriefModalProps) {
  if (!show) return null;

  const briefData = {
    campaignName: "Mother's Day 2026 Campaign",
    timeline: "May 3-10, 2026 (8 days)",
    status: "Planning",
    owner: "Sarah Chen (Campaign Manager)",

    executiveSummary: "Drive Mother's Day gift purchases through integrated multi-channel campaign leveraging our core strength in timeless, gift-worthy pieces. Focus on increasing AOV through curated gift sets and capturing first-time buyers who discover us through gifting occasions. Campaign builds on last year's Mother's Day success (4.8x ROAS, $42K revenue) with optimised channel mix and expanded Pinterest presence.",

    objectives: [
      "Drive gift purchases for Mother's Day with curated product selection",
      "Increase average order value (AOV) from current $124 to $145+ through gift bundling",
      "Acquire first-time buyers (target: 35% of conversions) and build retargeting audience",
      "Strengthen brand positioning as go-to destination for thoughtful, timeless gifts",
    ],

    targetAudience: {
      primary: "Women aged 28-48 purchasing gifts for mothers, mother figures, or themselves",
      demographics: "Household income $75K+, urban/suburban, value quality and sustainability",
      psychographics: "Thoughtful gift-givers who prioritise meaningful over trendy. Seek elevated classics that reflect care and consideration.",
      insights: "Peak shopping behaviour May 1-7. Strong preference for gift wrapping, personalised notes, and express shipping options. 62% discover via social media, 38% via search.",
    },

    channels: [
      {
        name: "Meta Ads",
        budget: "$5,040 (40%)",
        tactics: "Carousel ads featuring gift sets, dynamic product ads, Story ads with gift guides",
        kpis: "420-480 conversions, 5.2x ROAS, $12 avg CPA",
      },
      {
        name: "Email (Klaviyo)",
        budget: "$2,520 (20%)",
        tactics: "VIP early access, gift guide email series, last-minute reminder flow",
        kpis: "6.5-7.0x ROAS, 32% open rate, 8% click rate",
      },
      {
        name: "Google Ads",
        budget: "$3,780 (30%)",
        tactics: "Shopping ads, search campaigns ('mother's day gifts'), display remarketing",
        kpis: "340-380 conversions, 5.4x ROAS, high intent keywords",
      },
      {
        name: "Pinterest",
        budget: "$1,260 (10%)",
        tactics: "Promoted pins, gift boards, seasonal trends",
        kpis: "4.5x ROAS, 170K impressions, strong gift discovery",
      },
    ],

    budget: {
      total: "$12,600",
      breakdown: [
        { category: "Paid Media", amount: "$12,600", percent: "100%" },
        { category: "  - Meta Ads", amount: "$5,040", percent: "40%" },
        { category: "  - Google Ads", amount: "$3,780", percent: "30%" },
        { category: "  - Email", amount: "$2,520", percent: "20%" },
        { category: "  - Pinterest", amount: "$1,260", percent: "10%" },
      ],
      notes: "Budget does not include production costs ($2,100) or gift wrapping materials ($800), which are covered under separate operational budgets.",
    },

    successMetrics: [
      { metric: "Revenue Target", goal: "$63,000 (5.0x ROAS)", measurement: "Shopify + platform revenue tracking" },
      { metric: "Conversions", goal: "420-480 purchases", measurement: "Meta Pixel + Google Analytics 4" },
      { metric: "Average Order Value", goal: "$145+", measurement: "Shopify order data" },
      { metric: "New Customer %", goal: "35% of conversions", measurement: "Klaviyo customer segmentation" },
      { metric: "Email Performance", goal: "32% open, 8% click rate", measurement: "Klaviyo analytics" },
    ],

    keyMessages: [
      "Give the gift of timeless style — pieces she'll treasure for years",
      "Thoughtfully curated for the women who mean the most",
      "Elevated classics that never go out of style",
      "Make Mother's Day unforgettable with gifts as special as she is",
    ],

    creativeDirection: "Warm, elevated, and emotional. Photography features real mothers and daughters in natural settings. Colour palette: soft neutrals, blush pink, sage green. Emphasise quality details: fabric textures, hand-finished elements, thoughtful packaging. Avoid overly commercial 'sale' messaging — focus on sentimentality and lasting value.",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-lg)] max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[2rem] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
              Campaign Brief
            </h2>
            <p className="text-[13px] text-[var(--text-secondary)]">{briefData.campaignName} • {briefData.timeline}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Overview Stats */}
        <div className="p-6 border-b border-[var(--border-color)] bg-[var(--surface)]">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                Status
              </div>
              <div className="text-[15px] font-medium text-[var(--pink)]">{briefData.status}</div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                Timeline
              </div>
              <div className="text-[15px] font-medium text-[var(--text-primary)]">{briefData.timeline}</div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                Total Budget
              </div>
              <div className="text-[15px] font-medium text-[var(--green)]">{briefData.budget.total}</div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                Owner
              </div>
              <div className="text-[15px] font-medium text-[var(--text-primary)]">{briefData.owner}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Executive Summary */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[var(--pink)]" />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Executive Summary</h3>
            </div>
            <p className="text-[14px] text-[var(--text-primary)] leading-relaxed">
              {briefData.executiveSummary}
            </p>
          </div>

          {/* Objectives */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-[var(--green)]" />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Campaign Objectives</h3>
            </div>
            <ul className="space-y-2">
              {briefData.objectives.map((objective, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] text-[var(--text-primary)]">
                  <div className="w-6 h-6 rounded-full bg-[var(--green-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[12px] font-medium text-[var(--green)]">{idx + 1}</span>
                  </div>
                  {objective}
                </li>
              ))}
            </ul>
          </div>

          {/* Target Audience */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-[var(--terra)]" />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Target Audience</h3>
            </div>
            <div className="space-y-3 p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
              <div>
                <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                  Primary
                </div>
                <p className="text-[14px] text-[var(--text-primary)]">{briefData.targetAudience.primary}</p>
              </div>
              <div>
                <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                  Demographics
                </div>
                <p className="text-[14px] text-[var(--text-primary)]">{briefData.targetAudience.demographics}</p>
              </div>
              <div>
                <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                  Psychographics
                </div>
                <p className="text-[14px] text-[var(--text-primary)]">{briefData.targetAudience.psychographics}</p>
              </div>
              <div>
                <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                  Key Insights
                </div>
                <p className="text-[14px] text-[var(--text-primary)]">{briefData.targetAudience.insights}</p>
              </div>
            </div>
          </div>

          {/* Channel Strategy */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Share2 className="w-5 h-5 text-[var(--buff-dark)]" />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Channel Strategy</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {briefData.channels.map((channel, idx) => (
                <div key={idx} className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[15px] font-semibold text-[var(--text-primary)]">{channel.name}</h4>
                    <div className="text-[13px] font-medium text-[var(--green)]">{channel.budget}</div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                        Tactics
                      </div>
                      <p className="text-[12px] text-[var(--text-primary)]">{channel.tactics}</p>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                        Target KPIs
                      </div>
                      <p className="text-[12px] text-[var(--text-primary)]">{channel.kpis}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Breakdown */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5 text-[var(--green)]" />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Budget Breakdown</h3>
            </div>
            <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
              {briefData.budget.breakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-[var(--border-color)] last:border-0">
                  <span className="text-[13px] text-[var(--text-primary)]">{item.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] text-[var(--text-secondary)]">{item.percent}</span>
                    <span className="text-[14px] font-medium text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {item.amount}
                    </span>
                  </div>
                </div>
              ))}
              <p className="text-[11px] text-[var(--text-tertiary)] mt-3 italic">{briefData.budget.notes}</p>
            </div>
          </div>

          {/* Success Metrics */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-[var(--pink)]" />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Success Metrics</h3>
            </div>
            <div className="space-y-3">
              {briefData.successMetrics.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="w-8 h-8 rounded-full bg-[var(--pink-light)] flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-[var(--pink)]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-medium text-[var(--text-primary)] mb-1">{item.metric}</div>
                    <div className="text-[12px] text-[var(--text-secondary)] mb-0.5">Goal: {item.goal}</div>
                    <div className="text-[11px] text-[var(--text-tertiary)]">Measurement: {item.measurement}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Messages */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-[var(--buff-dark)]" />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Key Messages</h3>
            </div>
            <ul className="space-y-2">
              {briefData.keyMessages.map((message, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] text-[var(--text-primary)]">
                  <span className="text-[var(--pink)] flex-shrink-0">•</span>
                  <span className="italic">"{message}"</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Creative Direction */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-[var(--terra)]" />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Creative Direction</h3>
            </div>
            <p className="text-[14px] text-[var(--text-primary)] leading-relaxed p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
              {briefData.creativeDirection}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[var(--border-color)] p-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[15px] font-medium"
          >
            Close Brief
          </button>
        </div>
      </div>
    </div>
  );
}
