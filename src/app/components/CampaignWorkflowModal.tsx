import { useState } from "react";
import { X, CheckCircle, ChevronRight, Calendar, Send } from "lucide-react";

interface ChannelBrief {
  channel: string;
  objective: string;
  creative: string;
  messaging: string;
  cta: string;
  budget: string;
}

interface CampaignWorkflowModalProps {
  show: boolean;
  onClose: () => void;
  campaignName: string;
  totalBudget: string;
  dateRange: string;
}

export function CampaignWorkflowModal({ show, onClose, campaignName, totalBudget, dateRange }: CampaignWorkflowModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [approvedBudget, setApprovedBudget] = useState(false);
  const [approvedBriefs, setApprovedBriefs] = useState<string[]>([]);
  const [smsDate, setSmsDate] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  if (!show) return null;

  const channelBriefs: ChannelBrief[] = [
    {
      channel: "Meta (Facebook & Instagram)",
      objective: "Drive awareness and consideration for Mother's Day gifting with carousel ads featuring product collections",
      creative: "Carousel format: 5 slides showcasing Silk Midi Dress, Linen Trousers, Cashmere Cardigan, Leather Tote, and gift wrapping. Warm colour palette (soft pinks, creams, terracotta). Lifestyle photography featuring mother-daughter moments.",
      messaging: "Headline: 'Gifts She'll Actually Love' | Body: 'Timeless pieces for the woman who gave you everything. Free gift wrapping + express delivery available.' | Social proof: '2,000+ 5-star reviews'",
      cta: "Shop Mother's Day Gifts",
      budget: "$18,000 (Meta: $12K FB + $6K IG)"
    },
    {
      channel: "Email (Klaviyo)",
      objective: "Convert existing subscribers with personalised product recommendations based on browsing and purchase history",
      creative: "Hero image: Styled outfit flat-lay with gift box and card. Product grid showing top 6 gift items. Dynamic product recommendations based on recipient's past purchases. GIF showing gift wrapping process.",
      messaging: "Subject: 'Sarah, we found the perfect Mother's Day gift 💝' | Preheader: 'Free express shipping ends Sunday' | Body copy focuses on quality, sustainability, Australian-made angle. Includes customer testimonials.",
      cta: "Find Her Perfect Gift",
      budget: "$0 (owned channel)"
    },
    {
      channel: "Google Ads",
      objective: "Capture high-intent search traffic for Mother's Day gift queries with Shopping and Search campaigns",
      creative: "Shopping: Product feed optimised with 'Mother's Day Gift' labels, gift-ready imagery, and expedited shipping callouts. Search: RSAs with dynamic insertion for product categories (dresses, accessories, knitwear).",
      messaging: "Headlines: 'Mother's Day Gifts She'll Treasure' | 'Free Gift Wrapping + Express Delivery' | 'Sustainable Fashion Gifts' | Descriptions highlight quality, Australian-made, and gift-ready packaging.",
      cta: "Shop Now | View Gift Guide",
      budget: "$22,000 (Shopping: $14K, Search: $8K)"
    },
    {
      channel: "Pinterest",
      objective: "Inspire gift discovery with shoppable pins targeting users searching for Mother's Day gift ideas",
      creative: "12 static pins + 4 video pins showing styling inspiration, gift unboxing, and product details. Pins organised into 'Mother's Day Gift Guide' board. Vertical format optimised for mobile (1000x1500px).",
      messaging: "Pin descriptions: 'Sustainable Mother's Day gift ideas | Australian fashion | Timeless pieces she'll love' with relevant hashtags #mothersdaygifts #sustainablefashion #australianmade",
      cta: "Shop This Look | Save for Later",
      budget: "$8,000 (Promoted Pins)"
    }
  ];

  const budgetBreakdown = [
    { channel: "Meta (FB + Instagram)", amount: "$18,000", percentage: "36%" },
    { channel: "Google Ads", amount: "$22,000", percentage: "44%" },
    { channel: "Pinterest", amount: "$8,000", percentage: "16%" },
    { channel: "Production & Creative", amount: "$2,000", percentage: "4%" }
  ];

  const handleApproveBudget = () => {
    setApprovedBudget(true);
    setCurrentStep(2);
  };

  const handleApproveBrief = (channel: string) => {
    if (!approvedBriefs.includes(channel)) {
      setApprovedBriefs([...approvedBriefs, channel]);
    }
  };

  const handleContinueToSMS = () => {
    if (approvedBriefs.length === channelBriefs.length) {
      setCurrentStep(3);
    }
  };

  const handleSMSApprove = () => {
    if (smsDate) {
      setCurrentStep(4);
    }
  };

  const handleSendForApproval = () => {
    // In a real app, this would trigger an API call
    alert(`${campaignName} has been sent for final approval! ✓\n\nAll briefs, budget, and SMS schedule have been submitted to stakeholders.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-lg)] max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
              {campaignName}
            </h2>
            <p className="text-[13px] text-[var(--text-secondary)]">Campaign Launch Workflow · {dateRange}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="border-b border-[var(--border-color)] p-6">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[
              { num: 1, label: "Budget Approval" },
              { num: 2, label: "Channel Briefs" },
              { num: 3, label: "SMS Setup" },
              { num: 4, label: "Final Approval" }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-[14px] ${
                    currentStep > step.num ? 'bg-[var(--green)] text-white' :
                    currentStep === step.num ? 'bg-[var(--pink)] text-white' :
                    'bg-[var(--surface)] text-[var(--text-tertiary)]'
                  }`}>
                    {currentStep > step.num ? <CheckCircle className="w-5 h-5" /> : step.num}
                  </div>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-2 text-center">{step.label}</span>
                </div>
                {idx < 3 && (
                  <ChevronRight className="w-5 h-5 text-[var(--text-tertiary)] mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Budget Approval */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[24px] font-semibold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  Budget Approval
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)]">
                  Review and approve the total campaign budget of {totalBudget} across all channels.
                </p>
              </div>

              <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] overflow-hidden">
                <div className="bg-[var(--surface)] p-4 border-b border-[var(--border-color)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[var(--text-primary)]">Total Campaign Budget</span>
                    <span className="text-[24px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                      {totalBudget}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {budgetBreakdown.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-[var(--radius-md)]">
                      <span className="text-[14px] text-[var(--text-primary)]">{item.channel}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] text-[var(--text-tertiary)]">{item.percentage}</span>
                        <span className="text-[16px] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                          {item.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleApproveBudget}
                className="w-full px-6 py-3 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[15px] font-medium flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Approve Budget & Continue
              </button>
            </div>
          )}

          {/* Step 2: Channel Creative Briefs */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[24px] font-semibold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  Channel Creative Briefs
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] mb-4">
                  Review and approve creative briefs for each channel. All briefs must be approved to continue.
                </p>
                <div className="text-[13px] text-[var(--text-tertiary)]">
                  Approved: {approvedBriefs.length} of {channelBriefs.length}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {channelBriefs.map((brief) => (
                  <button
                    key={brief.channel}
                    onClick={() => setSelectedChannel(brief.channel)}
                    className={`p-4 rounded-[var(--radius-lg)] border-2 text-left transition-all ${
                      selectedChannel === brief.channel
                        ? 'border-[var(--pink)] bg-[var(--pink-light)]'
                        : approvedBriefs.includes(brief.channel)
                        ? 'border-[var(--green)] bg-[var(--green-light)]'
                        : 'border-[var(--border-color)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">{brief.channel}</h4>
                      {approvedBriefs.includes(brief.channel) && (
                        <CheckCircle className="w-5 h-5 text-[var(--green)]" />
                      )}
                    </div>
                    <p className="text-[12px] text-[var(--text-secondary)] line-clamp-2">{brief.objective}</p>
                    <div className="mt-2 text-[11px] font-semibold text-[var(--pink)]">{brief.budget}</div>
                  </button>
                ))}
              </div>

              {selectedChannel && (
                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5 space-y-4">
                  {(() => {
                    const brief = channelBriefs.find(b => b.channel === selectedChannel);
                    if (!brief) return null;
                    return (
                      <>
                        <div>
                          <h4 className="text-[18px] font-semibold text-[var(--text-primary)] mb-3">{brief.channel} Brief</h4>
                        </div>

                        <div>
                          <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                            Campaign Objective
                          </div>
                          <p className="text-[13px] text-[var(--text-secondary)]">{brief.objective}</p>
                        </div>

                        <div>
                          <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                            Creative Approach
                          </div>
                          <p className="text-[13px] text-[var(--text-secondary)]">{brief.creative}</p>
                        </div>

                        <div>
                          <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                            Messaging & Copy
                          </div>
                          <p className="text-[13px] text-[var(--text-secondary)]">{brief.messaging}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                              Call to Action
                            </div>
                            <p className="text-[13px] font-medium text-[var(--pink)]">{brief.cta}</p>
                          </div>
                          <div>
                            <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                              Budget Allocation
                            </div>
                            <p className="text-[13px] font-medium text-[var(--green)]">{brief.budget}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleApproveBrief(brief.channel)}
                          disabled={approvedBriefs.includes(brief.channel)}
                          className={`w-full px-4 py-2 rounded-[var(--radius-md)] text-[14px] font-medium flex items-center justify-center gap-2 ${
                            approvedBriefs.includes(brief.channel)
                              ? 'bg-[var(--green)] text-white cursor-not-allowed'
                              : 'bg-[var(--pink)] text-white hover:opacity-90 transition-opacity'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          {approvedBriefs.includes(brief.channel) ? 'Brief Approved ✓' : 'Approve Brief'}
                        </button>
                      </>
                    );
                  })()}
                </div>
              )}

              <button
                onClick={handleContinueToSMS}
                disabled={approvedBriefs.length !== channelBriefs.length}
                className={`w-full px-6 py-3 rounded-[var(--radius-md)] text-[15px] font-medium flex items-center justify-center gap-2 ${
                  approvedBriefs.length === channelBriefs.length
                    ? 'bg-[var(--green)] text-white hover:opacity-90 transition-opacity'
                    : 'bg-[var(--surface)] text-[var(--text-tertiary)] cursor-not-allowed'
                }`}
              >
                Continue to SMS Setup
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 3: SMS Flow Setup */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[24px] font-semibold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  SMS Flow Setup (Klaviyo)
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)]">
                  Schedule SMS campaign send date for Mother's Day promotion.
                </p>
              </div>

              <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5 space-y-4">
                <div>
                  <label className="text-[13px] font-semibold text-[var(--text-primary)] mb-2 block">
                    SMS Send Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
                    <input
                      type="date"
                      value={smsDate}
                      onChange={(e) => setSmsDate(e.target.value)}
                      min="2026-05-01"
                      max="2026-05-10"
                      className="w-full pl-12 pr-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)]"
                    />
                  </div>
                  <p className="text-[12px] text-[var(--text-tertiary)] mt-2">
                    Campaign window: May 1-10, 2026
                  </p>
                </div>

                <div className="bg-[var(--surface)] p-4 rounded-[var(--radius-md)]">
                  <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    SMS Preview
                  </div>
                  <p className="text-[13px] text-[var(--text-secondary)]">
                    <strong>Femme Connection:</strong> Mother's Day is almost here! 💝 Give her something special - shop our curated gift collection with FREE express delivery. Tap: [link]
                  </p>
                  <div className="mt-2 text-[11px] text-[var(--text-tertiary)]">
                    Est. reach: 12,400 subscribers · Opt-in rate: 68%
                  </div>
                </div>
              </div>

              <button
                onClick={handleSMSApprove}
                disabled={!smsDate}
                className={`w-full px-6 py-3 rounded-[var(--radius-md)] text-[15px] font-medium flex items-center justify-center gap-2 ${
                  smsDate
                    ? 'bg-[var(--green)] text-white hover:opacity-90 transition-opacity'
                    : 'bg-[var(--surface)] text-[var(--text-tertiary)] cursor-not-allowed'
                }`}
              >
                Approve SMS Schedule & Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 4: Final Approval */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[24px] font-semibold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  Send for Final Approval
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)]">
                  Review all campaign elements before sending to stakeholders for final approval.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-[var(--green-light)] border border-[var(--green)] rounded-[var(--radius-md)]">
                  <CheckCircle className="w-5 h-5 text-[var(--green)]" />
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold text-[var(--green)]">Budget Approved</div>
                    <div className="text-[12px] text-[var(--green)]">{totalBudget} across 4 channels</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[var(--green-light)] border border-[var(--green)] rounded-[var(--radius-md)]">
                  <CheckCircle className="w-5 h-5 text-[var(--green)]" />
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold text-[var(--green)]">Channel Briefs Approved</div>
                    <div className="text-[12px] text-[var(--green)]">{channelBriefs.length} channel briefs ready for production</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[var(--green-light)] border border-[var(--green)] rounded-[var(--radius-md)]">
                  <CheckCircle className="w-5 h-5 text-[var(--green)]" />
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold text-[var(--green)]">SMS Schedule Confirmed</div>
                    <div className="text-[12px] text-[var(--green)]">Send date: {smsDate}</div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--buff-light)] border border-[var(--buff-dark)] rounded-[var(--radius-lg)] p-4">
                <p className="text-[13px] text-[var(--text-secondary)]">
                  By clicking "Send for Approval" below, all campaign briefs, budget breakdown, and SMS schedule will be sent to your marketing team and stakeholders for final review and sign-off.
                </p>
              </div>

              <button
                onClick={handleSendForApproval}
                className="w-full px-6 py-4 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[16px] font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send for Final Approval
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
