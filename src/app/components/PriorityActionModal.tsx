import { X, Target, TrendingUp, AlertCircle, Calendar, DollarSign, Users, Sparkles, BarChart3 } from "lucide-react";

interface PriorityActionModalProps {
  show: boolean;
  onClose: () => void;
  actionType: "meta-cpm" | "easter-campaign" | "klaviyo-cart" | "competitor-analysis" | "instagram-link" | null;
}

export function PriorityActionModal({ show, onClose, actionType }: PriorityActionModalProps) {
  if (!show || !actionType) return null;

  const actionData = {
    "meta-cpm": {
      title: "Optimise Meta CPM",
      category: "Paid Social",
      priority: "Urgent",
      impact: "High",
      currentState: "Meta CPM is $18.40, which is 27% above our target of $14.50. This is costing us approximately $1,200/week in wasted ad spend.",
      rootCause: "Analysis shows three contributing factors: (1) Increased competition in our target audiences, (2) Ad creative fatigue (same creatives running 3+ weeks), (3) Broad targeting on several ad sets with CTR below 2.8%.",
      objectives: [
        "Reduce Meta CPM from $18.40 to $14.50 or below",
        "Maintain or improve current ROAS of 4.8x",
        "Reduce weekly ad spend waste by $1,200+",
        "Improve overall campaign efficiency and reach",
      ],
      recommendedActions: [
        {
          action: "Refresh ad creative immediately",
          details: "Replace all creatives that have been running for 3+ weeks. Focus on user-generated content and authentic lifestyle shots which historically perform 32% better on CTR.",
          owner: "Performance Marketing Team",
          timeline: "This week",
          impact: "Expected CPM reduction: $2.40",
        },
        {
          action: "Tighten audience targeting",
          details: "Pause 4 broad ad sets with CTR <2.8%. Shift budget to Advantage+ Shopping campaigns and proven lookalike audiences (3-5% lookalikes of purchasers).",
          owner: "David Kim (Performance Lead)",
          timeline: "This week",
          impact: "Expected CPM reduction: $1.20",
        },
        {
          action: "Test TikTok budget reallocation",
          details: "Reduce Meta spend by 15% ($180/week) and test TikTok which currently shows $12.80 CPM with similar ROAS. Run 2-week test.",
          owner: "Performance Marketing Team",
          timeline: "Next 2 weeks",
          impact: "Expected overall CPM improvement: $0.80",
        },
        {
          action: "Implement frequency capping",
          details: "Set frequency cap at 5 impressions per user per 7 days to reduce ad fatigue and improve engagement rates.",
          owner: "David Kim (Performance Lead)",
          timeline: "This week",
          impact: "Expected CPM reduction: $0.60",
        },
      ],
      successMetrics: [
        { metric: "Meta CPM", target: "$14.50 or below", current: "$18.40" },
        { metric: "ROAS", target: "Maintain 4.8x+", current: "4.8x" },
        { metric: "Weekly Ad Spend Savings", target: "$1,200+", current: "$0" },
        { metric: "CTR", target: "3.5%+", current: "2.8%" },
      ],
      estimatedROI: "Implementing all recommendations would save approximately $4,800/month in wasted ad spend while maintaining current revenue levels.",
    },
    "easter-campaign": {
      title: "Launch Easter Collection Campaign",
      category: "Campaign Planning",
      priority: "Urgent",
      impact: "High",
      currentState: "Easter campaign launch is scheduled for 2 weeks from now (April 12, 2026). Campaign brief is 85% complete. Creative assets are in production. Budget allocation approved at $28,400.",
      rootCause: "Easter is a significant gifting occasion that historically drives 18% higher AOV than baseline. Last year's Easter campaign generated $42,800 revenue at 4.6x ROAS. Timing is critical — must launch by April 12 to capture early shoppers.",
      objectives: [
        "Launch Easter collection campaign by April 12, 2026",
        "Generate $45,000+ revenue (5% improvement vs. last year)",
        "Achieve 5.0x ROAS (vs. 4.6x last year)",
        "Capture early gift shoppers and drive AOV to $135+",
      ],
      recommendedActions: [
        {
          action: "Finalise campaign brief and creative direction",
          details: "Complete remaining 15% of campaign brief. Finalise messaging around 'springtime renewal' and 'thoughtful gifting'. Approve colour palette (pastels: blush pink, sage green, cream).",
          owner: "Sarah Chen (Creative Director)",
          timeline: "By April 29",
          impact: "Critical path item — blocks creative production",
        },
        {
          action: "Complete creative asset production",
          details: "Deliver all creative assets: 8 product photos, 6 lifestyle shots, email templates (3), Meta ad creative (12 variants), Pinterest boards (2).",
          owner: "Design Team + Studio",
          timeline: "By May 5",
          impact: "Must complete to launch on time",
        },
        {
          action: "Set up campaigns across all channels",
          details: "Configure campaigns in Meta Ads Manager, Google Ads, Pinterest, Klaviyo. Set up tracking pixels, conversion events, and attribution properly.",
          owner: "David Kim (Performance Lead)",
          timeline: "By May 8",
          impact: "Technical setup required before launch",
        },
        {
          action: "Build Easter landing page",
          details: "Create dedicated Easter collection landing page in Shopify. Feature gift guides, curated looks, and free gift wrapping offer.",
          owner: "E-commerce Team",
          timeline: "By May 6",
          impact: "Improves conversion rate by 12% vs. generic product pages",
        },
        {
          action: "Schedule email flows and social content",
          details: "Schedule 4-email Easter series in Klaviyo. Pre-schedule social media posts (15 posts across Instagram, TikTok, Pinterest). Brief influencers for Easter content.",
          owner: "Marketing Team",
          timeline: "By May 10",
          impact: "Ensures coordinated multi-channel launch",
        },
      ],
      successMetrics: [
        { metric: "Campaign Revenue", target: "$45,000+", current: "Not launched" },
        { metric: "ROAS", target: "5.0x", current: "Not launched" },
        { metric: "Average Order Value", target: "$135+", current: "Not launched" },
        { metric: "Launch Date", target: "April 12, 2026", current: "On track" },
      ],
      estimatedROI: "Easter campaign projected to generate $45,000 revenue at $28,400 ad spend (5.0x ROAS). Critical seasonal revenue opportunity.",
    },
    "klaviyo-cart": {
      title: "Review Klaviyo Abandoned Cart Flow",
      category: "Email Marketing",
      priority: "Important",
      impact: "Medium",
      currentState: "Abandoned cart recovery rate has dropped 23% over the past 30 days (from 31% to 24%). This represents approximately $6,400 in lost monthly revenue.",
      rootCause: "Preliminary analysis suggests three factors: (1) Email 1 subject line performance declined (open rate dropped from 38% to 28%), (2) Timing of Email 2 may be too soon (sent 4 hours after Email 1), (3) No SMS integration in flow (email-only recovery).",
      objectives: [
        "Restore abandoned cart recovery rate from 24% to 31%+",
        "Recover $6,400+ in monthly lost revenue",
        "Improve email open and click rates across the flow",
        "Test SMS integration for higher-value carts ($80+)",
      ],
      recommendedActions: [
        {
          action: "A/B test new subject lines for Email 1",
          details: "Current subject line: 'You left something behind'. Test new variants: 'Your cart is waiting (but not for long)', 'Complete your order — 10% off inside', 'Still thinking it over?'. Run 7-day test.",
          owner: "Lisa Park (Email Marketing)",
          timeline: "This week",
          impact: "Expected recovery rate improvement: +4%",
        },
        {
          action: "Optimise email timing sequence",
          details: "Adjust timing: Email 1 at 1 hour (unchanged), Email 2 at 24 hours (vs. current 5 hours), Email 3 at 48 hours with urgency messaging. Test for 14 days.",
          owner: "Lisa Park (Email Marketing)",
          timeline: "Next week",
          impact: "Expected recovery rate improvement: +2%",
        },
        {
          action: "Add SMS to high-value cart abandonment",
          details: "Integrate Klaviyo SMS for carts $80+ abandoned for 24+ hours. Message: 'Your cart expires soon! Complete your order now: [link]'. Expected 23% recovery rate for SMS vs. 24% email.",
          owner: "Lisa Park (Email Marketing)",
          timeline: "2 weeks",
          impact: "Expected additional revenue: $3,400/month",
        },
        {
          action: "Add dynamic product recommendations",
          details: "Include 'You might also like' section in Email 2 with personalised recommendations based on cart contents. Increases average cart value by 12%.",
          owner: "Email Team + E-commerce",
          timeline: "3 weeks",
          impact: "Expected AOV increase: +$18",
        },
      ],
      successMetrics: [
        { metric: "Cart Recovery Rate", target: "31%+", current: "24%" },
        { metric: "Email 1 Open Rate", target: "38%+", current: "28%" },
        { metric: "Monthly Recovered Revenue", target: "$19,200+", current: "$12,800" },
        { metric: "SMS Recovery Rate", target: "23%+", current: "Not implemented" },
      ],
      estimatedROI: "Restoring cart recovery to 31% would generate additional $6,400/month. SMS integration adds $3,400/month. Total opportunity: $9,800/month.",
    },
    "competitor-analysis": {
      title: "Competitor Analysis Review",
      category: "Market Intelligence",
      priority: "Review",
      impact: "Medium",
      currentState: "Particl monitoring has identified 3 new competitor brands entering the market with similar positioning: elevated basics, sustainable materials, timeless aesthetic. These brands are targeting the same customer demographic.",
      rootCause: "Market consolidation in the 'quiet luxury' and 'elevated essentials' space is accelerating. Our positioning is now shared by 8 total competitors (up from 5 in Q4 2025). This increases competitive pressure on pricing, ad costs, and customer acquisition.",
      objectives: [
        "Understand competitive threats and positioning overlaps",
        "Identify differentiation opportunities and gaps",
        "Adjust pricing, messaging, or product strategy as needed",
        "Monitor competitive ad spend and creative strategies",
      ],
      recommendedActions: [
        {
          action: "Conduct competitive positioning workshop",
          details: "Bring together marketing, product, and brand teams to review all 8 competitors. Map positioning, pricing, product mix, and messaging. Identify Femme's unique differentiators.",
          owner: "Strategy Team",
          timeline: "Next 2 weeks",
          impact: "Clarifies strategic positioning and messaging",
        },
        {
          action: "Analyse competitor product catalogues",
          details: "Deep dive into product mix, pricing architecture, and category coverage for all 3 new competitors. Identify gaps in Femme's catalogue and pricing opportunities.",
          owner: "R&D Team + Pricing",
          timeline: "Next 2 weeks",
          impact: "Identifies product opportunities and pricing adjustments",
        },
        {
          action: "Monitor competitor ad creative and spend",
          details: "Use Meta Ad Library and Particl to track competitor creative themes, messaging, and estimated ad spend. Identify what's working for competitors that we can learn from.",
          owner: "Performance Marketing",
          timeline: "Ongoing (weekly reports)",
          impact: "Informs creative strategy and messaging",
        },
        {
          action: "Strengthen brand differentiation in messaging",
          details: "Based on competitive analysis, strengthen unique brand messaging around: Australian heritage, founder story, quality-to-price ratio, community-first values. Update website, ads, and social content.",
          owner: "Brand Team + Creative",
          timeline: "1 month",
          impact: "Reduces direct comparison with competitors",
        },
      ],
      successMetrics: [
        { metric: "Competitive Threats Identified", target: "8 brands analysed", current: "3 new brands flagged" },
        { metric: "Differentiation Strategy", target: "Defined and documented", current: "In progress" },
        { metric: "Product Gaps Identified", target: "5+ opportunities", current: "TBD" },
        { metric: "Competitive Ad Monitoring", target: "Weekly reports", current: "Not yet implemented" },
      ],
      estimatedROI: "Competitive intelligence informs strategic decisions that protect market share and customer acquisition efficiency. Indirect but high-value impact.",
    },
    "instagram-link": {
      title: "Update Instagram Bio Link",
      category: "Social Media",
      priority: "Ready",
      impact: "Low",
      currentState: "Instagram bio link currently points to homepage. Autumn 2026 collection launched 2 weeks ago. Bio link should direct to new Autumn landing page to capitalise on Instagram traffic.",
      rootCause: "Low-priority task that was overlooked during Autumn launch. Instagram drives 18,000 profile visits/month — directing to optimised landing page (vs. homepage) improves conversion rate by 8%.",
      objectives: [
        "Update Instagram bio link to Autumn '26 landing page",
        "Improve Instagram → purchase conversion rate",
        "Capitalise on Autumn collection launch momentum",
        "Maintain updated bio link as standard practice",
      ],
      recommendedActions: [
        {
          action: "Update Instagram bio link URL",
          details: "Change bio link from homepage (femme.com.au) to Autumn landing page (femme.com.au/collections/autumn-2026). Use Linktree or similar if multiple links needed.",
          owner: "Social Media Manager",
          timeline: "Today",
          impact: "Quick win — 5 minutes to implement",
        },
        {
          action: "Update bio copy to reference Autumn collection",
          details: "Refresh bio copy to mention 'Autumn 2026 Collection — Shop the link below'. Keep within Instagram's 150-character limit.",
          owner: "Social Media Manager",
          timeline: "Today",
          impact: "Improves click-through rate on bio link",
        },
        {
          action: "Add Autumn collection highlights to profile",
          details: "Create Instagram Story Highlights featuring Autumn collection products, styling tips, and customer testimonials. Pin to profile.",
          owner: "Social Media Team",
          timeline: "This week",
          impact: "Enhances profile engagement and conversion",
        },
        {
          action: "Set calendar reminder for next collection launch",
          details: "Create recurring task to update bio link and copy whenever new collection launches. Prevents this from being overlooked again.",
          owner: "Social Media Manager",
          timeline: "This week",
          impact: "Ensures process consistency going forward",
        },
      ],
      successMetrics: [
        { metric: "Bio Link Updated", target: "Completed", current: "Pending" },
        { metric: "Instagram → Site CTR", target: "4.2%+", current: "3.8%" },
        { metric: "Instagram → Purchase CVR", target: "2.8%+", current: "2.6%" },
        { metric: "Process Documentation", target: "Complete", current: "Pending" },
      ],
      estimatedROI: "Small revenue impact (~$800/month improvement) but easy implementation. Low-hanging fruit.",
    },
  };

  const data = actionData[actionType];

  const priorityConfig: Record<string, { color: string; bg: string }> = {
    Urgent: { color: "var(--terra)", bg: "var(--terra-light)" },
    Important: { color: "var(--pink-dark)", bg: "var(--pink-light)" },
    Review: { color: "var(--green)", bg: "var(--green-light)" },
    Ready: { color: "var(--buff-dark)", bg: "var(--buff)" },
  };

  const config = priorityConfig[data.priority];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-lg)] max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[2rem] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
              {data.title}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[13px] text-[var(--text-secondary)]">{data.category}</span>
              <span className="text-[13px] text-[var(--text-tertiary)]">•</span>
              <div
                className="px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wider"
                style={{ backgroundColor: config.bg, color: config.color, fontFamily: "var(--font-mono)" }}
              >
                {data.priority} Priority
              </div>
              <span className="text-[13px] text-[var(--text-tertiary)]">•</span>
              <span className="text-[13px] text-[var(--text-secondary)]">{data.impact} Impact</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current State */}
          <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)] border-l-4 border-[var(--pink)]">
            <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>
              Current State
            </div>
            <p className="text-[14px] text-[var(--text-primary)] leading-relaxed">
              {data.currentState}
            </p>
          </div>

          {/* Root Cause */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-[var(--terra)]" />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Root Cause Analysis</h3>
            </div>
            <p className="text-[14px] text-[var(--text-primary)] leading-relaxed">
              {data.rootCause}
            </p>
          </div>

          {/* Objectives */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-[var(--green)]" />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Objectives</h3>
            </div>
            <ul className="space-y-2">
              {data.objectives.map((objective, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] text-[var(--text-primary)]">
                  <div className="w-6 h-6 rounded-full bg-[var(--green-light)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[12px] font-medium text-[var(--green)]">{idx + 1}</span>
                  </div>
                  {objective}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Actions */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--pink)]" />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Recommended Actions</h3>
            </div>
            <div className="space-y-4">
              {data.recommendedActions.map((action, idx) => (
                <div key={idx} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4 hover:border-[var(--border-strong)] transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-[var(--pink-light)] flex items-center justify-center flex-shrink-0">
                      <span className="text-[13px] font-medium text-[var(--pink)]">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[15px] font-semibold text-[var(--text-primary)] mb-2">
                        {action.action}
                      </h4>
                      <p className="text-[13px] text-[var(--text-primary)] leading-relaxed mb-3">
                        {action.details}
                      </p>
                      <div className="flex items-center gap-4 text-[12px] text-[var(--text-secondary)]">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {action.owner}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {action.timeline}
                        </div>
                      </div>
                      <div className="mt-2 px-3 py-1.5 bg-[var(--green-light)] rounded-[var(--radius-sm)] inline-block">
                        <span className="text-[11px] font-medium text-[var(--green)]">Impact: {action.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-[var(--buff-dark)]" />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Success Metrics</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {data.successMetrics.map((metric, idx) => (
                <div key={idx} className="p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                  <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                    {metric.metric}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[13px] font-semibold text-[var(--green)]">{metric.target}</div>
                      <div className="text-[11px] text-[var(--text-secondary)]">Target</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-medium text-[var(--text-primary)]">{metric.current}</div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">Current</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated ROI */}
          <div className="p-4 bg-[var(--green-light)] rounded-[var(--radius-md)] border-l-4 border-[var(--green)]">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-[var(--green)]" />
              <div className="text-[13px] font-semibold text-[var(--green)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                Estimated ROI
              </div>
            </div>
            <p className="text-[14px] text-[var(--text-primary)] leading-relaxed">
              {data.estimatedROI}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[var(--border-color)] p-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[15px] font-medium"
          >
            Close Action Brief
          </button>
        </div>
      </div>
    </div>
  );
}
