import { useState } from "react";
import { X, Sparkles, Users, DollarSign, Target, Calendar, CheckCircle } from "lucide-react";

interface CreateCampaignModalProps {
  show: boolean;
  onClose: () => void;
}

export function CreateCampaignModal({ show, onClose }: CreateCampaignModalProps) {
  const [step, setStep] = useState(1);
  const [useAI, setUseAI] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    campaignType: [] as string[],
    channels: [] as string[],
    goals: "",
    objectives: "",
    overview: "",
    outputs: "",
    budget: "",
    teamMembers: [] as string[],
    startDate: "",
    endDate: ""
  });

  if (!show) return null;

  const campaignTypes = [
    { id: "email", label: "Email", icon: "📧" },
    { id: "social", label: "Social Media", icon: "📱" },
    { id: "paid-ads", label: "Paid Ads", icon: "💰" },
    { id: "sms", label: "SMS", icon: "💬" }
  ];

  const channels = [
    "Meta (Facebook & Instagram)",
    "TikTok",
    "Google Ads",
    "Pinterest",
    "Email (Klaviyo)",
    "SMS (Klaviyo)",
    "LinkedIn",
    "Twitter/X"
  ];

  const teamMembers = [
    { id: "sarah", name: "Sarah Chen", role: "Marketing Manager" },
    { id: "james", name: "James Wilson", role: "Content Creator" },
    { id: "emma", name: "Emma Rodriguez", role: "Paid Social Specialist" },
    { id: "michael", name: "Michael Brown", role: "Email Marketing Lead" },
    { id: "olivia", name: "Olivia Taylor", role: "Creative Director" },
    { id: "alex", name: "Alex Kumar", role: "Analytics Manager" }
  ];

  const handleToggleCampaignType = (typeId: string) => {
    if (formData.campaignType.includes(typeId)) {
      setFormData({
        ...formData,
        campaignType: formData.campaignType.filter(t => t !== typeId)
      });
    } else {
      setFormData({
        ...formData,
        campaignType: [...formData.campaignType, typeId]
      });
    }
  };

  const handleToggleChannel = (channel: string) => {
    if (formData.channels.includes(channel)) {
      setFormData({
        ...formData,
        channels: formData.channels.filter(c => c !== channel)
      });
    } else {
      setFormData({
        ...formData,
        channels: [...formData.channels, channel]
      });
    }
  };

  const handleToggleTeamMember = (memberId: string) => {
    if (formData.teamMembers.includes(memberId)) {
      setFormData({
        ...formData,
        teamMembers: formData.teamMembers.filter(m => m !== memberId)
      });
    } else {
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, memberId]
      });
    }
  };

  const generateAIBrief = () => {
    // Simulate AI generation
    setFormData({
      ...formData,
      goals: "• Increase brand awareness among target demographic (women 25-45)\n• Drive 420-480 conversions with 5.0x ROAS\n• Acquire 35% first-time buyers\n• Achieve $63,000 revenue target",
      objectives: "Launch a multi-channel campaign to promote our seasonal collection, focusing on gift-ready products with emphasis on quality, sustainability, and timeless design. Target awareness phase (May 1-3), consideration phase (May 4-7), and conversion phase (May 8-10).",
      overview: "This campaign leverages our top-performing channels (Meta, Email, Google Ads, Pinterest) with coordinated messaging across all touchpoints. Creative strategy focuses on lifestyle imagery, customer testimonials, and gift-focused messaging. Campaign timing aligns with key gifting season to maximize relevance and urgency.",
      outputs: "• 12 Meta carousel ads (5 slides each)\n• 4 email sequences (VIP early access, gift guide, reminder, last chance)\n• 8 Google Shopping campaigns with optimised product feeds\n• 16 Pinterest static + video pins\n• Landing page with gift guide functionality\n• SMS flow for cart abandonment recovery"
    });
  };

  const handleSubmit = () => {
    const selectedMembers = teamMembers.filter(m => formData.teamMembers.includes(m.id));
    const memberNames = selectedMembers.map(m => m.name).join(", ");

    alert(`Campaign "${formData.title}" created successfully! ✓\n\nBrief sent to: ${memberNames}\n\nChannels: ${formData.channels.join(", ")}\nBudget: ${formData.budget}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
              Create New Campaign
            </h2>
            <p className="text-[13px] text-[var(--text-secondary)]">Omnichannel Campaign Builder</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="border-b border-[var(--border-color)] p-6">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold ${
                  step >= s ? 'bg-[var(--pink)] text-white' : 'bg-[var(--surface)] text-[var(--text-tertiary)]'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 mx-2 ${step > s ? 'bg-[var(--pink)]' : 'bg-[var(--border-color)]'}`} />}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-12 mt-2">
            <span className="text-[11px] text-[var(--text-tertiary)]">Setup</span>
            <span className="text-[11px] text-[var(--text-tertiary)]">Brief</span>
            <span className="text-[11px] text-[var(--text-tertiary)]">Team</span>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Setup */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Mother's Day 2027 Campaign"
                  className="w-full px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-3">
                  Campaign Type * <span className="text-[var(--text-tertiary)] font-normal">(select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {campaignTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleToggleCampaignType(type.id)}
                      className={`p-4 rounded-[var(--radius-lg)] border-2 text-left transition-all ${
                        formData.campaignType.includes(type.id)
                          ? 'border-[var(--pink)] bg-[var(--pink-light)]'
                          : 'border-[var(--border-color)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[24px]">{type.icon}</span>
                        <span className="text-[14px] font-medium text-[var(--text-primary)]">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-3">
                  Channels * <span className="text-[var(--text-tertiary)] font-normal">(select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {channels.map((channel) => (
                    <button
                      key={channel}
                      onClick={() => handleToggleChannel(channel)}
                      className={`px-4 py-2.5 rounded-[var(--radius-md)] border text-[13px] text-left transition-all ${
                        formData.channels.includes(channel)
                          ? 'border-[var(--green)] bg-[var(--green-light)] text-[var(--green)]'
                          : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)]"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.title || formData.campaignType.length === 0 || formData.channels.length === 0}
                className={`w-full px-6 py-3 rounded-[var(--radius-md)] text-[15px] font-medium flex items-center justify-center gap-2 ${
                  formData.title && formData.campaignType.length > 0 && formData.channels.length > 0
                    ? 'bg-[var(--pink)] text-white hover:opacity-90'
                    : 'bg-[var(--surface)] text-[var(--text-tertiary)] cursor-not-allowed'
                }`}
              >
                Continue to Brief
              </button>
            </div>
          )}

          {/* Step 2: Brief Creation */}
          {step === 2 && (
            <div className="space-y-6">
              {useAI === null && (
                <div>
                  <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-4">
                    How would you like to create your campaign brief?
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setUseAI(true);
                        generateAIBrief();
                      }}
                      className="p-6 border-2 border-[var(--border-color)] rounded-[var(--radius-lg)] hover:border-[var(--pink)] transition-all text-left group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Sparkles className="w-6 h-6 text-[var(--pink)]" />
                        <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">Use AI Brief Builder</h4>
                      </div>
                      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                        Let AI generate a comprehensive campaign brief based on your campaign setup. You can edit it afterwards.
                      </p>
                    </button>

                    <button
                      onClick={() => setUseAI(false)}
                      className="p-6 border-2 border-[var(--border-color)] rounded-[var(--radius-lg)] hover:border-[var(--green)] transition-all text-left group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Target className="w-6 h-6 text-[var(--green)]" />
                        <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">Write Yourself</h4>
                      </div>
                      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                        Create your campaign brief from scratch with full control over every detail.
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {useAI !== null && (
                <>
                  {useAI && (
                    <div className="p-4 bg-[var(--pink-light)] border border-[var(--pink)] rounded-[var(--radius-lg)] flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-[var(--pink)] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[14px] font-semibold text-[var(--pink)] mb-1">AI Brief Generated</div>
                        <p className="text-[13px] text-[var(--text-secondary)]">
                          Review and edit the AI-generated brief below. All fields are editable.
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                      Goals *
                    </label>
                    <textarea
                      value={formData.goals}
                      onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      placeholder="• Increase brand awareness&#10;• Drive conversions&#10;• Acquire new customers"
                      rows={4}
                      className="w-full px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                      Objectives *
                    </label>
                    <textarea
                      value={formData.objectives}
                      onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                      placeholder="Describe the primary objectives and key messages for this campaign..."
                      rows={3}
                      className="w-full px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                      Campaign Overview *
                    </label>
                    <textarea
                      value={formData.overview}
                      onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                      placeholder="Provide a high-level overview of the campaign strategy, target audience, and key messaging..."
                      rows={4}
                      className="w-full px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                      Outputs & Deliverables
                    </label>
                    <textarea
                      value={formData.outputs}
                      onChange={(e) => setFormData({ ...formData, outputs: e.target.value })}
                      placeholder="• Email campaign (3 sends)&#10;• Social media assets (10 posts)&#10;• Paid ads (5 variations)"
                      rows={4}
                      className="w-full px-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-2">
                      Total Budget
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="50,000"
                        className="w-full pl-12 pr-4 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)] focus:ring-2 focus:ring-[var(--pink-light)]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => { setStep(1); setUseAI(null); }}
                      className="flex-1 px-6 py-3 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[15px] font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!formData.goals || !formData.objectives || !formData.overview}
                      className={`flex-1 px-6 py-3 rounded-[var(--radius-md)] text-[15px] font-medium ${
                        formData.goals && formData.objectives && formData.overview
                          ? 'bg-[var(--pink)] text-white hover:opacity-90'
                          : 'bg-[var(--surface)] text-[var(--text-tertiary)] cursor-not-allowed'
                      }`}
                    >
                      Continue to Team
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 3: Team Selection */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-2">
                  Tag Team Members
                </h3>
                <p className="text-[13px] text-[var(--text-secondary)]">
                  Select who should receive this campaign brief
                </p>
              </div>

              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => handleToggleTeamMember(member.id)}
                    className={`w-full p-4 rounded-[var(--radius-lg)] border-2 text-left transition-all ${
                      formData.teamMembers.includes(member.id)
                        ? 'border-[var(--green)] bg-[var(--green-light)]'
                        : 'border-[var(--border-color)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          formData.teamMembers.includes(member.id) ? 'bg-[var(--green)]' : 'bg-[var(--text-tertiary)]'
                        }`}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-[14px] font-medium text-[var(--text-primary)]">{member.name}</div>
                          <div className="text-[12px] text-[var(--text-tertiary)]">{member.role}</div>
                        </div>
                      </div>
                      {formData.teamMembers.includes(member.id) && (
                        <CheckCircle className="w-5 h-5 text-[var(--green)]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-[var(--border-color)]">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[15px] font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={formData.teamMembers.length === 0}
                  className={`flex-1 px-6 py-3 rounded-[var(--radius-md)] text-[15px] font-medium flex items-center justify-center gap-2 ${
                    formData.teamMembers.length > 0
                      ? 'bg-[var(--green)] text-white hover:opacity-90'
                      : 'bg-[var(--surface)] text-[var(--text-tertiary)] cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  Create Campaign & Send Brief
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
