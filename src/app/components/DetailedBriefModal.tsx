import { X, Target, CheckCircle, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

export interface DetailedBriefData {
  title: string;
  category: string;
  overview: string;
  goals: string[];
  detailedBrief: {
    challenge: string;
    approach: string;
    timeline: string;
    budget?: string;
  };
  nextSteps: Array<{
    step: string;
    description: string;
    owner?: string;
  }>;
  potentialOutcomes: {
    bestCase: string;
    expected: string;
    metrics: string[];
  };
}

interface DetailedBriefModalProps {
  show: boolean;
  onClose: () => void;
  data: DetailedBriefData;
  primaryColor?: string;
}

export function DetailedBriefModal({ show, onClose, data, primaryColor = "var(--pink)" }: DetailedBriefModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-lg)] max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-6 flex items-center justify-between z-10">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
              {data.category}
            </div>
            <h2 className="text-[2rem] font-semibold text-[var(--green)]" style={{ fontFamily: "var(--font-serif)" }}>
              {data.title}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--surface)] rounded-lg transition-colors">
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Overview */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Overview</h3>
            </div>
            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
              {data.overview}
            </p>
          </div>

          {/* Goals */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5" style={{ color: primaryColor }} />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Goals</h3>
            </div>
            <div className="space-y-2">
              {data.goals.map((goal, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${primaryColor}20` }}>
                    <span className="text-[12px] font-medium" style={{ color: primaryColor }}>{idx + 1}</span>
                  </div>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">{goal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Brief */}
          <div className="p-5 rounded-[var(--radius-lg)] border-l-4" style={{ backgroundColor: `${primaryColor}10`, borderColor: primaryColor }}>
            <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-4">Detailed Brief</h3>

            <div className="space-y-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                  Challenge
                </div>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  {data.detailedBrief.challenge}
                </p>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                  Approach
                </div>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  {data.detailedBrief.approach}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                    Timeline
                  </div>
                  <p className="text-[14px] font-medium" style={{ color: primaryColor }}>
                    {data.detailedBrief.timeline}
                  </p>
                </div>
                {data.detailedBrief.budget && (
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                      Budget
                    </div>
                    <p className="text-[14px] font-medium" style={{ color: primaryColor }}>
                      {data.detailedBrief.budget}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="w-5 h-5" style={{ color: primaryColor }} />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Next Steps</h3>
            </div>
            <div className="space-y-3">
              {data.nextSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 border border-[var(--border-color)] rounded-[var(--radius-md)] hover:border-[var(--border-strong)] transition-colors">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: primaryColor, color: 'white' }}>
                    <span className="text-[14px] font-semibold">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-[var(--text-primary)] mb-1">{step.step}</h4>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                    {step.owner && (
                      <div className="mt-2">
                        <span className="inline-block px-2 py-0.5 bg-[var(--surface)] text-[var(--text-tertiary)] text-[11px] rounded-full">
                          Owner: {step.owner}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Potential Outcomes */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5" style={{ color: primaryColor }} />
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">Potential Outcomes</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-[var(--green-light)] rounded-[var(--radius-md)]">
                <div className="text-[11px] uppercase tracking-wider text-[var(--green)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                  Best Case Scenario
                </div>
                <p className="text-[14px] text-[var(--green)] font-medium leading-relaxed">
                  {data.potentialOutcomes.bestCase}
                </p>
              </div>
              <div className="p-4 bg-[var(--surface)] rounded-[var(--radius-md)]">
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                  Expected Outcome
                </div>
                <p className="text-[14px] text-[var(--text-primary)] font-medium leading-relaxed">
                  {data.potentialOutcomes.expected}
                </p>
              </div>
            </div>

            <div className="p-4 border border-[var(--border-color)] rounded-[var(--radius-md)]">
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                Key Metrics to Track
              </div>
              <div className="grid grid-cols-2 gap-2">
                {data.potentialOutcomes.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--green)]" />
                    <span className="text-[13px] text-[var(--text-secondary)]">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[var(--border-color)]">
            <button
              className="flex-1 px-6 py-3 rounded-[var(--radius-md)] text-white text-[14px] font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: primaryColor }}
            >
              Start Implementation
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--text-primary)] text-[14px] font-medium hover:bg-[var(--surface)] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
