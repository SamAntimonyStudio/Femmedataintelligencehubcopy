import { useState } from "react";
import { Card, CardTitle, Tag, AIInsightCard } from "../components/ui/Card";
import { FilterBar } from "../components/ui/Filters";
import PageHeader from "../components/PageHeader";
import { AIWidget } from "../components/AIWidget";
import { ActionStrip, ActionStripData } from "../components/ActionStrip";
import { FileText, Sparkles, Target, Users, Image, Video, CheckCircle2, Clock, AlertCircle, Download, Copy, Wand2, X, Plus, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Import FEM content images
const femmeImg1 = "https://via.placeholder.com/750x750?text=femmeImg1";
const femmeImg2 = "https://via.placeholder.com/750x750?text=femmeImg2";
const femmeImg3 = "https://via.placeholder.com/750x750?text=femmeImg3";
const femmeImg4 = "https://via.placeholder.com/750x750?text=femmeImg4";
const reformationImg1 = "https://via.placeholder.com/750x750?text=reformationImg1";
const reformationImg2 = "https://via.placeholder.com/750x750?text=reformationImg2";
const reformationImg4 = "https://via.placeholder.com/750x750?text=reformationImg4";
const sezaneImg1 = "https://via.placeholder.com/750x750?text=sezaneImg1";
const sezaneImg2 = "https://via.placeholder.com/750x750?text=sezaneImg2";
const sezaneImg3 = "https://via.placeholder.com/750x750?text=sezaneImg3";

const contentLibrary = [
  {
    title: "Spring Collection Photoshoot",
    type: "Photography",
    status: "completed",
    assets: 48,
    date: "Apr 15, 2026",
    channels: ["Instagram", "Pinterest", "Email"],
  },
  {
    title: "TikTok: Behind the Scenes Series",
    type: "Video",
    status: "in-progress",
    assets: 12,
    date: "Apr 20, 2026",
    channels: ["TikTok", "Instagram Reels"],
  },
  {
    title: "Mother's Day Gift Guide",
    type: "Blog Post",
    status: "scheduled",
    assets: 1,
    date: "Apr 28, 2026",
    channels: ["Website", "Email"],
  },
  {
    title: "Customer Testimonial Videos",
    type: "Video",
    status: "planning",
    assets: 6,
    date: "May 5, 2026",
    channels: ["Website", "Meta", "TikTok"],
  },
];

const activeBriefs = [
  {
    campaign: "Mother's Day Campaign",
    briefType: "Creative Brief",
    status: "approved",
    createdDate: "Apr 12, 2026",
    owner: "Marketing Team",
  },
  {
    campaign: "Summer Preview Collection",
    briefType: "Influencer Brief",
    status: "in-progress",
    createdDate: "Apr 18, 2026",
    owner: "Social Team",
  },
  {
    campaign: "Email: VIP Early Access",
    briefType: "Copy Brief",
    status: "draft",
    createdDate: "Apr 22, 2026",
    owner: "Email Team",
  },
];

export default function ContentStudio() {
  const [wizardStep, setWizardStep] = useState(1);
  const [showAIContentInsight, setShowAIContentInsight] = useState(false);
  const [showContentGapAnalysis, setShowContentGapAnalysis] = useState(false);
  const [showBriefTemplate, setShowBriefTemplate] = useState(false);
  const [showContentLibrary, setShowContentLibrary] = useState(false);
  const [briefData, setBriefData] = useState({
    campaignName: "Mother's Day 2026",
    objective: "Drive gift purchases and increase AOV",
    audience: "Women 35-55, gift buyers",
    channels: ["Meta", "Email", "Pinterest"],
    deliverables: "",
    timeline: "",
    budget: "",
    keyMessage: "",
  });

  const statusConfig = {
    completed: { color: "var(--green)", bg: "var(--green-light)", icon: CheckCircle2 },
    "in-progress": { color: "var(--pink-dark)", bg: "var(--pink-light)", icon: Clock },
    planning: { color: "var(--buff-dark)", bg: "var(--buff)", icon: AlertCircle },
    scheduled: { color: "var(--green)", bg: "var(--green-light)", icon: CheckCircle2 },
    approved: { color: "var(--green)", bg: "var(--green-light)", icon: CheckCircle2 },
    draft: { color: "var(--buff-dark)", bg: "var(--buff)", icon: AlertCircle },
  };

  const handleGenerateBrief = () => {
    // Simulated AI brief generation
    setBriefData({
      ...briefData,
      deliverables: "• 10 Meta carousel ads (1080x1080)\n• 3 Email hero images\n• 5 Pinterest promoted pins\n• Gift guide landing page design",
      timeline: "Creative delivery: Apr 30, 2026\nCampaign launch: May 3, 2026",
      budget: "$12,600 total media spend\n$3,200 creative production",
      keyMessage: "\"Celebrate the special women in your life with timeless, elegant pieces she'll treasure.\"",
    });
    setWizardStep(3);
  };

  // Action Strip Data
  const actionStripData: ActionStripData = {
    silverBullet: {
      action: "Generate Mother's Day creative brief with AI brief builder",
      impactLine: "Estimated: Save 4 hours · Ensure cross-channel consistency",
      channel: "Content Production · Campaign Brief"
    },
    lowHangingFruit: {
      action: "Repurpose Easter campaign assets for Wedding Season content",
      effortChip: "Easy · 1 day",
      impact: "Save $2,400 production · Proven 4.2x ROAS creative",
      channelChip: "Content Library · Asset Reuse"
    },
    frameworkTasks: [
      { task: "Mother's Day brief finalization", status: "In Progress" },
      { task: "Wedding Season content calendar", status: "Planned" },
      { task: "Q4/2026 content production schedule", status: "On Track" }
    ]
  };

  return (
    <div>
      <PageHeader
        label="Content · Studio & Planning"
        title="Content Studio & Brief Builder"
        description="Centralized content hub for planning, briefing, and managing creative assets. Build AI-powered reverse briefs, track production pipelines, and organize your content library."
        backgroundGradient="terra"
        stats={[
          { label: "Active Briefs", value: "8" },
          { label: "Assets in Library", value: "342" },
        ]}
      />

      <div className="px-12 py-10 space-y-8">
        {/* AI Widget */}
        <AIWidget
          insightLabel="Content Studio Insight"
          insightText="Mother's Day brief requires finalization by Apr 28 for May 3 launch. Easter campaign assets (4.2x ROAS) can be repurposed for Wedding Season. Recommendation: use AI brief builder for Mother's Day, repurpose Easter creative."
        />

        <div className="grid grid-cols-3 gap-6">
          <Card variant="pink">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-[var(--pink-dark)]" />
              <CardTitle variant="pink">Active Briefs</CardTitle>
            </div>
            <div className="text-[3.5rem] font-medium text-[var(--pink-dark)] leading-none mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              8
            </div>
            <p className="text-[13px] text-[var(--text-primary)]">3 approved, 5 in progress</p>
          </Card>

          <Card variant="terra">
            <div className="flex items-center gap-3 mb-4">
              <Image className="w-6 h-6 text-[var(--terra-dark)]" />
              <CardTitle variant="terra">Content Library</CardTitle>
            </div>
            <div className="text-[3.5rem] font-medium text-[var(--terra-dark)] leading-none mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              342
            </div>
            <p className="text-[13px] text-white/75">Assets across photo, video, copy</p>
          </Card>

          <Card variant="green">
            <div className="flex items-center gap-3 mb-4">
              <Video className="w-6 h-6 text-[var(--pink)]" />
              <CardTitle variant="green">This Month</CardTitle>
            </div>
            <div className="text-[3.5rem] font-medium text-[var(--pink)] leading-none mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              24
            </div>
            <p className="text-[13px] text-white/75">New assets produced</p>
          </Card>
        </div>

        <AIInsightCard
          title="AI Content Insight"
          content="Your TikTok behind-the-scenes content drives 3.2x higher engagement than product-only posts. Recommendation: increase BTS content from 20% to 35% of social mix. User-generated content (UGC) performs 2.8x better on Meta — consider launching creator partnership program to scale UGC production."
          onButtonClick={() => setShowAIContentInsight(true)}
        />

        {/* Reverse Brief Wizard */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--pink)] to-[var(--terra)] flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>AI Reverse Brief Wizard</CardTitle>
                <p className="text-[13px] text-[var(--text-secondary)]">Generate comprehensive creative briefs in minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--pink-light)]">
                <Sparkles className="w-4 h-4 text-[var(--pink)]" />
                <span className="text-[12px] font-medium text-[var(--pink)]">AI-Powered</span>
              </div>
            </div>
          </div>

          {/* Wizard Progress */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium transition-colors ${
                      wizardStep >= step
                        ? "bg-[var(--pink)] text-white"
                        : "bg-[var(--surface)] text-[var(--text-tertiary)]"
                    }`}
                  >
                    {wizardStep > step ? <CheckCircle2 className="w-4 h-4" /> : step}
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-medium text-[var(--text-secondary)]">
                      {step === 1 && "Campaign Details"}
                      {step === 2 && "AI Generation"}
                      {step === 3 && "Review Brief"}
                      {step === 4 && "Generate Images"}
                    </div>
                    <div
                      className={`h-1 rounded-full mt-1 transition-colors ${
                        wizardStep > step ? "bg-[var(--pink)]" : "bg-[var(--surface)]"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Step 1: Input Form */}
          {wizardStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    value={briefData.campaignName}
                    onChange={(e) => setBriefData({ ...briefData, campaignName: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]"
                    placeholder="e.g., Mother's Day 2026"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">
                    Campaign Objective
                  </label>
                  <input
                    type="text"
                    value={briefData.objective}
                    onChange={(e) => setBriefData({ ...briefData, objective: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]"
                    placeholder="e.g., Drive gift purchases"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={briefData.audience}
                  onChange={(e) => setBriefData({ ...briefData, audience: e.target.value })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[14px] focus:outline-none focus:border-[var(--pink)]"
                  placeholder="e.g., Women 35-55, gift buyers"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[var(--text-primary)] mb-2">
                  Channels (Select All That Apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Meta", "Email", "Pinterest", "TikTok", "Instagram", "Google Ads"].map((channel) => (
                    <button
                      key={channel}
                      onClick={() => {
                        if (briefData.channels.includes(channel)) {
                          setBriefData({
                            ...briefData,
                            channels: briefData.channels.filter((c) => c !== channel),
                          });
                        } else {
                          setBriefData({
                            ...briefData,
                            channels: [...briefData.channels, channel],
                          });
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                        briefData.channels.includes(channel)
                          ? "bg-[var(--pink)] text-white"
                          : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
                      }`}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                <button
                  onClick={() => setWizardStep(2)}
                  className="px-6 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center gap-2"
                >
                  Continue to AI Generation
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: AI Generation */}
          {wizardStep === 2 && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--pink)] to-[var(--terra)] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-2">
                  AI is Analysing Your Campaign
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] mb-6">
                  Generating creative brief based on your inputs and historical performance data...
                </p>

                <div className="max-w-md mx-auto space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                    <CheckCircle2 className="w-5 h-5 text-[var(--green)]" />
                    <span className="text-[13px] text-[var(--text-primary)]">Analysing campaign objectives</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                    <CheckCircle2 className="w-5 h-5 text-[var(--green)]" />
                    <span className="text-[13px] text-[var(--text-primary)]">Reviewing historical performance data</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[var(--pink-light)] rounded-[var(--radius-md)]">
                    <Clock className="w-5 h-5 text-[var(--pink)]" />
                    <span className="text-[13px] text-[var(--text-primary)]">Generating deliverables and timeline...</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-4 border-t border-[var(--border-color)]">
                <button
                  onClick={() => setWizardStep(1)}
                  className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[14px] font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerateBrief}
                  className="px-6 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center gap-2"
                >
                  Generate Brief
                  <Wand2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Export */}
          {wizardStep === 3 && (
            <div className="space-y-6">
              <div className="bg-[var(--green-light)] border border-[var(--green)] rounded-[var(--radius-md)] p-4 mb-6">
                <div className="flex items-center gap-2 text-[var(--green)]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-[14px] font-medium">Brief Generated Successfully!</span>
                </div>
              </div>

              <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-6 space-y-6">
                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Campaign Name
                  </h3>
                  <p className="text-[16px] font-semibold text-[var(--text-primary)]">{briefData.campaignName}</p>
                </div>

                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Objective
                  </h3>
                  <p className="text-[14px] text-[var(--text-secondary)]">{briefData.objective}</p>
                </div>

                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Target Audience
                  </h3>
                  <p className="text-[14px] text-[var(--text-secondary)]">{briefData.audience}</p>
                </div>

                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Channels
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {briefData.channels.map((channel) => (
                      <Tag key={channel} variant="pink">{channel}</Tag>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Key Message
                  </h3>
                  <p className="text-[14px] text-[var(--text-secondary)] italic">{briefData.keyMessage}</p>
                </div>

                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Deliverables
                  </h3>
                  <div className="text-[14px] text-[var(--text-secondary)] whitespace-pre-line">{briefData.deliverables}</div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                      Timeline
                    </h3>
                    <div className="text-[14px] text-[var(--text-secondary)] whitespace-pre-line">{briefData.timeline}</div>
                  </div>
                  <div>
                    <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                      Budget
                    </h3>
                    <div className="text-[14px] text-[var(--text-secondary)] whitespace-pre-line">{briefData.budget}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-3 pt-4 border-t border-[var(--border-color)]">
                <button
                  onClick={() => setWizardStep(1)}
                  className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[14px] font-medium"
                >
                  Start New Brief
                </button>
                <div className="flex gap-3">
                  <button className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[14px] font-medium flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                    Copy Brief
                  </button>
                  <button
                    onClick={() => setWizardStep(4)}
                    className="px-6 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Images
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Generate Images */}
          {wizardStep === 4 && (
            <div className="space-y-6">
              <div className="bg-[var(--green-light)] border border-[var(--green)] rounded-[var(--radius-md)] p-4 mb-6">
                <div className="flex items-center gap-2 text-[var(--green)]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-[14px] font-medium">All Creative Assets Generated Successfully!</span>
                </div>
              </div>

              {/* Meta Carousel Ads */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">Meta Carousel Ads</h3>
                    <p className="text-[13px] text-[var(--text-secondary)]">10 carousel ads • 1080x1080px</p>
                  </div>
                  <button className="px-4 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[13px] font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download All
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {[femmeImg1, femmeImg2, femmeImg3, femmeImg4, reformationImg1, reformationImg2, reformationImg4, sezaneImg1, sezaneImg2, sezaneImg3].map((img, i) => (
                    <div key={`meta-${i}`} className="aspect-square rounded-[var(--radius-md)] overflow-hidden border border-[var(--border-color)] relative group cursor-pointer hover:border-[var(--pink)] transition-colors">
                      <img src={img} alt={`Meta Ad ${i + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Hero Images */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">Email Hero Images</h3>
                    <p className="text-[13px] text-[var(--text-secondary)]">3 email headers • 600x400px</p>
                  </div>
                  <button className="px-4 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[13px] font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download All
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[sezaneImg1, reformationImg1, femmeImg1].map((img, i) => (
                    <div key={`email-${i}`} className="aspect-[3/2] rounded-[var(--radius-md)] overflow-hidden border border-[var(--border-color)] relative group cursor-pointer hover:border-[var(--green)] transition-colors">
                      <img src={img} alt={`Email Header ${i + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pinterest Pins */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">Pinterest Promoted Pins</h3>
                    <p className="text-[13px] text-[var(--text-secondary)]">5 Pinterest pins • 1000x1500px</p>
                  </div>
                  <button className="px-4 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[13px] font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download All
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {[femmeImg2, sezaneImg2, reformationImg2, femmeImg3, sezaneImg3].map((img, i) => (
                    <div key={`pinterest-${i}`} className="aspect-[2/3] rounded-[var(--radius-md)] overflow-hidden border border-[var(--border-color)] relative group cursor-pointer hover:border-[var(--terra)] transition-colors">
                      <img src={img} alt={`Pinterest Pin ${i + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gift Guide Landing Page */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">Gift Guide Landing Page Design</h3>
                    <p className="text-[13px] text-[var(--text-secondary)]">Full page mockup • 1440x3200px</p>
                  </div>
                  <button className="px-4 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[13px] font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] overflow-hidden bg-gradient-to-br from-[var(--buff)] via-[var(--pink-light)] to-[var(--green-light)] p-8 relative group cursor-pointer hover:border-[var(--pink)] transition-colors">
                  <div className="aspect-[9/16] max-w-md mx-auto bg-white rounded-[var(--radius-md)] shadow-xl overflow-hidden">
                    <img src={femmeImg4} alt="Landing Page Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="flex justify-between gap-3 pt-6 border-t border-[var(--border-color)]">
                <button
                  onClick={() => setWizardStep(3)}
                  className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[14px] font-medium"
                >
                  Back to Brief
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[14px] font-medium"
                  >
                    Start New Campaign
                  </button>
                  <button className="px-6 py-2 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Complete Campaign Pack
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Content Library & Active Briefs */}
        <div className="grid grid-cols-2 gap-6">
          {/* Content Library */}
          <Card>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Content Library</CardTitle>
              <button
                onClick={() => setShowContentLibrary(true)}
                className="px-3 py-1.5 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[12px] font-medium flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Library
              </button>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Recent assets and productions</p>
            <div className="space-y-3">
              {contentLibrary.map((content, index) => {
                const config = statusConfig[content.status];
                const Icon = config.icon;

                return (
                  <div key={index} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4 hover:border-[var(--border-strong)] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: config.bg }}
                        >
                          {content.type === "Photography" ? (
                            <Image className="w-5 h-5" style={{ color: config.color }} />
                          ) : content.type === "Video" ? (
                            <Video className="w-5 h-5" style={{ color: config.color }} />
                          ) : (
                            <FileText className="w-5 h-5" style={{ color: config.color }} />
                          )}
                        </div>
                        <div>
                          <h4 className="text-[14px] font-medium text-[var(--text-primary)] mb-1">{content.title}</h4>
                          <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)]">
                            <span>{content.type}</span>
                            <span>•</span>
                            <span>{content.assets} assets</span>
                            <span>•</span>
                            <span>{content.date}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="px-2 py-1 rounded-full text-[10px] font-medium"
                        style={{ backgroundColor: config.bg, color: config.color }}
                      >
                        {content.status}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {content.channels.map((channel, i) => (
                        <Tag key={i} variant="buff">{channel}</Tag>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Active Briefs */}
          <Card>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Active Creative Briefs</CardTitle>
              <button
                onClick={() => setWizardStep(1)}
                className="px-3 py-1.5 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[12px] font-medium flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                Create New Brief
              </button>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">Recent briefs and status</p>
            <div className="space-y-3">
              {activeBriefs.map((brief, index) => {
                const config = statusConfig[brief.status];
                const Icon = config.icon;

                return (
                  <div key={index} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4 hover:border-[var(--border-strong)] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-[14px] font-medium text-[var(--text-primary)] mb-1">{brief.campaign}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)]">
                          <span>{brief.briefType}</span>
                          <span>•</span>
                          <span>{brief.createdDate}</span>
                        </div>
                      </div>
                      <div
                        className="px-2 py-1 rounded-full text-[10px] font-medium"
                        style={{ backgroundColor: config.bg, color: config.color }}
                      >
                        {brief.status}
                      </div>
                    </div>
                    <div className="text-[12px] text-[var(--text-tertiary)] mt-3">
                      Owner: {brief.owner}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* AI Recommendations */}
        <div className="grid grid-cols-2 gap-6">
          <AIInsightCard
            title="Content Gap Analysis"
            content="You're producing 60% product photography but only 15% lifestyle content. Competitor analysis shows 40% lifestyle mix drives higher engagement (+2.4x). Recommend: increase lifestyle content to 30% of production budget."
            onButtonClick={() => setShowContentGapAnalysis(true)}
          />
          <AIInsightCard
            title="Brief Template Suggestion"
            content="Based on Q1 campaigns, your highest-performing briefs included: (1) Specific audience pain points, (2) 3-5 key messages max, (3) Clear channel-specific deliverables. Consider adding these sections to your template."
            variant="accent"
            onButtonClick={() => setShowBriefTemplate(true)}
          />
        </div>

        {/* Action Strip */}
        <ActionStrip data={actionStripData} />
      </div>

      {/* AI Content Insight Modal */}
      {showAIContentInsight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIContentInsight(false)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--pink-light)] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[var(--pink)]" />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>
                    AI Content Insight Dashboard
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">Optimise your content strategy based on performance data</p>
                </div>
              </div>
              <button onClick={() => setShowAIContentInsight(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Content Performance Analysis
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-4">
                  Based on your historical content performance across all channels, we've identified key opportunities to maximize engagement and ROI.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Video className="w-5 h-5 text-[var(--pink)]" />
                    <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">TikTok Behind-the-Scenes</h4>
                  </div>
                  <div className="space-y-2 text-[13px] text-[var(--text-secondary)]">
                    <p><strong className="text-[var(--pink)]">3.2x higher engagement</strong> vs. product-only posts</p>
                    <p>Current mix: 20% BTS content</p>
                    <p className="text-[var(--green)]"><strong>Recommendation:</strong> Increase to 35% of social mix</p>
                  </div>
                </div>

                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-[var(--terra)]" />
                    <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">User-Generated Content</h4>
                  </div>
                  <div className="space-y-2 text-[13px] text-[var(--text-secondary)]">
                    <p><strong className="text-[var(--terra)]">2.8x better performance</strong> on Meta</p>
                    <p>Current UGC volume: Limited</p>
                    <p className="text-[var(--green)]"><strong>Recommendation:</strong> Launch creator partnership program</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-[var(--radius-lg)] border-l-4 bg-[var(--pink-light)] border-[var(--pink)]">
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <Sparkles className="w-4 h-4" />
                  AI-Recommended Action Plan
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--pink)]">
                    <span className="mt-1">•</span>
                    <span>Allocate 35% of content budget to behind-the-scenes content production</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--pink)]">
                    <span className="mt-1">•</span>
                    <span>Partner with 10-15 micro-influencers for authentic UGC content</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--pink)]">
                    <span className="mt-1">•</span>
                    <span>Create a customer content submission portal with incentives</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--pink)]">
                    <span className="mt-1">•</span>
                    <span>Test TikTok BTS series format: "A Day at Femme Connection HQ"</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Gap Analysis Modal */}
      {showContentGapAnalysis && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowContentGapAnalysis(false)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--terra-light)] flex items-center justify-center">
                  <Target className="w-6 h-6 text-[var(--terra)]" />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>
                    Content Gap Analysis
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">Identify content opportunities to close competitive gaps</p>
                </div>
              </div>
              <button onClick={() => setShowContentGapAnalysis(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Current Content Distribution
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                    <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Product Photography</div>
                    <div className="text-[2rem] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>60%</div>
                  </div>
                  <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                    <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Lifestyle Content</div>
                    <div className="text-[2rem] font-semibold text-[var(--pink)]" style={{ fontFamily: "var(--font-serif)" }}>15%</div>
                  </div>
                  <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
                    <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Other Content</div>
                    <div className="text-[2rem] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>25%</div>
                  </div>
                </div>
              </div>

              <div className="border border-[var(--pink)] rounded-[var(--radius-lg)] p-5 bg-[var(--pink-light)]">
                <h3 className="text-[14px] font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[var(--pink)]" />
                  Gap Identified: Lifestyle Content Underproduction
                </h3>
                <p className="text-[13px] text-[var(--text-secondary)] mb-3">
                  Competitor analysis of similar fashion e-commerce brands reveals that a 40% lifestyle content mix drives <strong>+2.4x higher engagement</strong> compared to product-heavy strategies.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Your Current Mix</div>
                    <div className="text-[18px] font-semibold text-[var(--pink)]">15% Lifestyle</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--text-tertiary)] mb-1">Competitor Average</div>
                    <div className="text-[18px] font-semibold text-[var(--green)]">40% Lifestyle</div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-[var(--radius-lg)] border-l-4 bg-[var(--terra-light)] border-[var(--terra)]">
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)" }}>
                  <Sparkles className="w-4 h-4" />
                  Recommended Actions
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--terra)]">
                    <span className="mt-1">•</span>
                    <span>Increase lifestyle content to 30% of total production budget (phased approach)</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--terra)]">
                    <span className="mt-1">•</span>
                    <span>Focus on lifestyle scenarios: "day-to-night transitions," "weekend getaways," "work-from-home style"</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--terra)]">
                    <span className="mt-1">•</span>
                    <span>Partner with lifestyle photographers and content creators specializing in fashion editorial</span>
                  </li>
                  <li className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--terra)]">
                    <span className="mt-1">•</span>
                    <span>Establish lifestyle content style guide to ensure brand consistency</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brief Template Suggestion Modal */}
      {showBriefTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBriefTemplate(false)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--green-light)] flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[var(--green)]" />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
                    Optimised Brief Template
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">Best practices from your highest-performing campaigns</p>
                </div>
              </div>
              <button onClick={() => setShowBriefTemplate(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                  Performance Insights
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  Analysis of Q1 2026 campaigns reveals that briefs with specific structural elements consistently outperform generic templates. Implementing these practices can increase campaign effectiveness by up to 40%.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">1. Specific Audience Pain Points</h4>
                    <Tag variant="green">High Impact</Tag>
                  </div>
                  <p className="text-[13px] text-[var(--text-secondary)] mb-3">
                    Briefs that identified specific customer pain points (not just demographics) drove <strong>+35% higher conversion</strong> rates.
                  </p>
                  <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--green-light)]">
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      Example
                    </div>
                    <p className="text-[13px] text-[var(--green)]">
                      "Target customer struggles to find professional workwear that transitions to evening events without looking too formal or too casual."
                    </p>
                  </div>
                </div>

                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">2. Limited Key Messages (3-5 max)</h4>
                    <Tag variant="green">High Impact</Tag>
                  </div>
                  <p className="text-[13px] text-[var(--text-secondary)] mb-3">
                    Campaigns with 3-5 focused key messages performed <strong>+28% better</strong> than those with 8+ messages.
                  </p>
                  <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--green-light)]">
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      Recommendation
                    </div>
                    <p className="text-[13px] text-[var(--green)]">
                      Add a "Core Messages (Max 5)" section to your template with clear prioritization.
                    </p>
                  </div>
                </div>

                <div className="border border-[var(--border-color)] rounded-[var(--radius-lg)] p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-[16px] font-semibold text-[var(--text-primary)]">3. Channel-Specific Deliverables</h4>
                    <Tag variant="green">High Impact</Tag>
                  </div>
                  <p className="text-[13px] text-[var(--text-secondary)] mb-3">
                    Briefs with detailed channel-specific requirements (dimensions, formats, copy length) reduced revisions by <strong>60%</strong>.
                  </p>
                  <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--green-light)]">
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      Template Addition
                    </div>
                    <p className="text-[13px] text-[var(--green)]">
                      Include dedicated sections for each channel with specific asset specs, best practices, and success metrics.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                <button className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[14px] font-medium flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy Template
                </button>
                <button className="px-6 py-2 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[14px] font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Library Modal */}
      {showContentLibrary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowContentLibrary(false)}>
          <div className="bg-white rounded-[var(--radius-lg)] max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--terra-light)] flex items-center justify-center">
                  <Image className="w-6 h-6 text-[var(--terra)]" />
                </div>
                <div>
                  <h2 className="text-[2rem] font-semibold text-[var(--terra)]" style={{ fontFamily: "var(--font-serif)" }}>
                    Content Library
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)]">All assets and productions</p>
                </div>
              </div>
              <button onClick={() => setShowContentLibrary(false)} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[femmeImg1, femmeImg2, femmeImg3, femmeImg4, reformationImg1, reformationImg2, reformationImg4, sezaneImg1, sezaneImg2].map((img, i) => (
                  <div key={i} className="aspect-square rounded-[var(--radius-md)] overflow-hidden border border-[var(--border-color)] group relative cursor-pointer hover:border-[var(--terra)] transition-colors">
                    <img src={img} alt={`Asset ${i + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex gap-2">
                        <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                          <Download className="w-5 h-5 text-[var(--text-primary)]" />
                        </button>
                        <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                          <ExternalLink className="w-5 h-5 text-[var(--text-primary)]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--border-color)] pt-6">
                <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-4">Recent Productions</h3>
                <div className="space-y-3">
                  {contentLibrary.map((content, index) => {
                    const config = statusConfig[content.status];
                    return (
                      <div key={index} className="border border-[var(--border-color)] rounded-[var(--radius-md)] p-4 hover:border-[var(--border-strong)] transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-[14px] font-medium text-[var(--text-primary)] mb-1">{content.title}</h4>
                            <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)]">
                              <span>{content.type}</span>
                              <span>•</span>
                              <span>{content.assets} assets</span>
                              <span>•</span>
                              <span>{content.date}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {content.channels.map((channel, i) => (
                                <Tag key={i} variant="buff">{channel}</Tag>
                              ))}
                            </div>
                          </div>
                          <div
                            className="px-2 py-1 rounded-full text-[10px] font-medium"
                            style={{ backgroundColor: config.bg, color: config.color }}
                          >
                            {content.status}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
