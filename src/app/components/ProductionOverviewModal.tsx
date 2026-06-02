import { X, Package, CheckCircle2, Clock, AlertCircle, Calendar, User } from "lucide-react";

interface ProductionOverviewModalProps {
  show: boolean;
  onClose: () => void;
}

export function ProductionOverviewModal({ show, onClose }: ProductionOverviewModalProps) {
  if (!show) return null;

  const productionAssets = [
    {
      type: "Hero Image",
      status: "ready",
      owner: "Design Team",
      timeline: "Completed Apr 22",
      notes: "Final hero image approved. Features best-selling Silk Midi Dress with Mother's Day gift wrapping theme.",
      deliverables: ["Main hero (2400x1600px)", "Mobile variant (1080x1920px)", "Thumbnail (600x600px)"],
      approver: "Sarah Chen (Creative Director)"
    },
    {
      type: "Product Photography (6 items)",
      status: "in-progress",
      owner: "Studio",
      timeline: "Due Apr 27 • Est. completion Apr 28",
      notes: "Photo shoot scheduled for Apr 26. Includes 6 gift-worthy products with lifestyle styling and flat lay compositions.",
      deliverables: ["24 lifestyle shots (6 products × 4 angles)", "12 flat lay compositions", "6 detail close-ups"],
      approver: "Emma Rodriguez (Brand Manager)"
    },
    {
      type: "Gift Guide PDF",
      status: "planning",
      owner: "Content Team",
      timeline: "Kickoff Apr 28 • Due May 1",
      notes: "Digital gift guide featuring curated product selections across price points. Will be used in email and as downloadable asset.",
      deliverables: ["8-page PDF design", "Mobile-optimised version", "Social media teaser graphics"],
      approver: "Michael Wu (Content Lead)"
    },
    {
      type: "Email Templates (3)",
      status: "ready",
      owner: "Email Team",
      timeline: "Completed Apr 23",
      notes: "Three email templates designed and coded in Klaviyo: VIP early access, gift guide showcase, last-minute reminder.",
      deliverables: ["VIP Early Access template", "Gift Guide Email template", "Last Chance Reminder template"],
      approver: "Lisa Park (Email Marketing Manager)"
    },
    {
      type: "Social Copy (15 variants)",
      status: "in-progress",
      owner: "Copywriter",
      timeline: "Draft complete • Revisions due Apr 27",
      notes: "15 social media copy variants covering Instagram, TikTok, and Pinterest. Emphasises thoughtful gifting and timeless style.",
      deliverables: ["5 Instagram captions", "5 TikTok scripts", "5 Pinterest descriptions"],
      approver: "Sarah Chen (Creative Director)"
    },
    {
      type: "Meta Ad Creative (10)",
      status: "planning",
      owner: "Performance Team",
      timeline: "Kickoff Apr 29 • Due May 2",
      notes: "10 Meta ad creatives including carousel, single image, and story formats. Will leverage product photography once delivered.",
      deliverables: ["4 carousel ads", "3 single image ads", "3 story ads"],
      approver: "David Kim (Performance Marketing Lead)"
    },
  ];

  const statusConfig: Record<string, { color: string; bg: string; icon: any }> = {
    ready: { color: "var(--green)", bg: "var(--green-light)", icon: CheckCircle2 },
    "in-progress": { color: "var(--terra)", bg: "var(--terra-light)", icon: Clock },
    planning: { color: "var(--pink-dark)", bg: "var(--pink-light)", icon: AlertCircle },
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-lg)] max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
              Production Overview
            </h2>
            <p className="text-[13px] text-[var(--text-secondary)]">Mother's Day 2026 Campaign • All creative assets and production status</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="p-6 border-b border-[var(--border-color)] bg-[var(--surface)]">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-[28px] font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>2</div>
              <div className="text-[12px] text-[var(--text-secondary)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>Ready</div>
            </div>
            <div className="text-center">
              <div className="text-[28px] font-bold text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>2</div>
              <div className="text-[12px] text-[var(--text-secondary)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-[28px] font-bold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>2</div>
              <div className="text-[12px] text-[var(--text-secondary)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>Planning</div>
            </div>
            <div className="text-center">
              <div className="text-[28px] font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>67%</div>
              <div className="text-[12px] text-[var(--text-secondary)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>On Track</div>
            </div>
          </div>
        </div>

        {/* Assets Detail */}
        <div className="p-6 space-y-6">
          {productionAssets.map((asset, index) => {
            const config = statusConfig[asset.status];
            const Icon = config.icon;

            return (
              <div key={index} className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5 hover:border-[var(--border-strong)] transition-colors">
                {/* Asset Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: config.bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: config.color }} />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">
                        {asset.type}
                      </h3>
                      <div className="flex items-center gap-3 text-[12px] text-[var(--text-secondary)]">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {asset.owner}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {asset.timeline}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wider"
                    style={{ backgroundColor: config.bg, color: config.color, fontFamily: "var(--font-mono)" }}
                  >
                    {asset.status}
                  </div>
                </div>

                {/* Asset Details */}
                <div className="space-y-3 ml-[52px]">
                  <div>
                    <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>
                      Notes
                    </div>
                    <p className="text-[13px] text-[var(--text-primary)] leading-relaxed">
                      {asset.notes}
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                      Deliverables
                    </div>
                    <ul className="space-y-1.5">
                      {asset.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[13px] text-[var(--text-primary)]">
                          <Package className="w-3.5 h-3.5 text-[var(--text-tertiary)] mt-0.5 flex-shrink-0" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-[var(--border-color)]">
                    <div className="text-[11px] text-[var(--text-tertiary)]">
                      Approver: <span className="text-[var(--text-primary)] font-medium">{asset.approver}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[var(--border-color)] p-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[15px] font-medium"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
}
