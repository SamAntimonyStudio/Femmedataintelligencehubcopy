import { Target, Leaf, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export interface ActionStripData {
  silverBullet: {
    action: string;
    impactLine: string;
    channel?: string;
  };
  lowHangingFruit: {
    action: string;
    effortChip: string;
    impact: string;
    channelChip: string;
  };
  frameworkTasks: Array<{
    task: string;
    status: "In Progress" | "Planned" | "On Track";
  }>;
}

interface ActionStripProps {
  data: ActionStripData;
  onSilverBulletClick?: () => void;
  onLowHangingFruitClick?: () => void;
}

export function ActionStrip({ data, onSilverBulletClick, onLowHangingFruitClick }: ActionStripProps) {
  const [showSilverTooltip, setShowSilverTooltip] = useState(false);
  const [showFruitTooltip, setShowFruitTooltip] = useState(false);

  const statusColors = {
    "In Progress": "bg-[var(--pink-light)] text-[var(--pink-dark)]",
    "Planned": "bg-[var(--buff)] text-[var(--text-secondary)]",
    "On Track": "bg-[var(--green-light)] text-[var(--green)]",
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {/* Column 1 - Silver Bullet */}
      <div
        className="bg-[var(--green)] rounded-xl p-5 border-l-[3px] border-[var(--pink)] relative overflow-hidden flex flex-col"
        onMouseEnter={() => setShowSilverTooltip(true)}
        onMouseLeave={() => setShowSilverTooltip(false)}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <div
              className="text-[10px] uppercase tracking-wider text-[var(--pink)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Silver Bullet
            </div>
            <div className="text-[9px] text-white/60 mt-0.5">Current Quarter On Target Framework</div>
          </div>
          <Target className="w-4 h-4 text-[var(--pink)]" />
        </div>
        {showSilverTooltip && (
          <div className="absolute top-2 right-2 bg-[var(--black)] text-white p-3 rounded-[var(--radius-md)] shadow-xl z-10 max-w-xs text-[11px] leading-relaxed">
            Highest-impact strategic initiative that will drive disproportionate results this quarter
          </div>
        )}
        <div className="flex-1">
          <p
            className="text-[18px] text-white mb-3 leading-snug italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {data.silverBullet.action}
          </p>
          <div className="text-[12px] text-white/50 mb-2">
            {data.silverBullet.impactLine.split("Estimated:")[0]}Estimated:
          </div>
          <div
            className="text-[13px] text-[var(--pink)] font-medium mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {data.silverBullet.impactLine.split("Estimated:")[1]}
          </div>
          {data.silverBullet.channel && (
            <div className="text-[11px] text-white/40">
              {data.silverBullet.channel}
            </div>
          )}
        </div>
        <button
          onClick={onSilverBulletClick}
          className="w-full px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2 mt-4"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Column 2 - Low-Hanging Fruit */}
      <div
        className="bg-white rounded-xl p-5 border border-[var(--border-color)] border-l-[3px] border-l-[var(--green)] relative flex flex-col"
        onMouseEnter={() => setShowFruitTooltip(true)}
        onMouseLeave={() => setShowFruitTooltip(false)}
      >
        <div className="flex items-center justify-between mb-3">
          <div
            className="text-[10px] uppercase tracking-wider text-[var(--green)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Low-Hanging Fruit
          </div>
          <Leaf className="w-4 h-4 text-[var(--green)]" />
        </div>
        {showFruitTooltip && (
          <div className="absolute top-2 right-2 bg-[var(--black)] text-white p-3 rounded-[var(--radius-md)] shadow-xl z-10 max-w-xs text-[11px] leading-relaxed">
            Quick wins requiring minimal effort that can be implemented immediately for measurable impact
          </div>
        )}
        <div className="flex-1">
          <p className="text-[14px] text-[var(--text-primary)] font-semibold mb-3 leading-snug">
            {data.lowHangingFruit.action}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-2.5 py-1 bg-[var(--green-light)] text-[var(--green)] text-[11px] rounded-full font-medium">
              {data.lowHangingFruit.effortChip}
            </span>
          </div>
          <div className="text-[12px] text-[var(--terra)] font-medium mb-3">
            {data.lowHangingFruit.impact}
          </div>
          <div
            className="text-[11px] text-[var(--text-tertiary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {data.lowHangingFruit.channelChip}
          </div>
        </div>
        <button
          onClick={onLowHangingFruitClick}
          className="w-full px-4 py-2 bg-[var(--green)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium flex items-center justify-center gap-2 mt-4"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Column 3 - Framework Tasks */}
      <div className="bg-[var(--surface)] rounded-xl p-5 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div
            className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            On-Target Framework
          </div>
          <Link
            to="/gtm"
            className="hover:bg-[var(--border-color)] p-1 rounded transition-colors"
            title="View GTM Calendar"
          >
            <Calendar className="w-4 h-4 text-[var(--text-secondary)]" />
          </Link>
        </div>
        <div className="space-y-3 flex-1">
          {data.frameworkTasks.map((task, index) => (
            <div key={index} className="flex items-start gap-2">
              <span
                className="text-[var(--pink)] font-medium text-[13px] flex-shrink-0 mt-0.5"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {index + 1}.
              </span>
              <div className="flex-1">
                <div className="text-[13px] text-[var(--text-primary)] font-medium leading-snug mb-1">
                  {task.task}
                </div>
                <span className={`inline-block px-2 py-0.5 text-[10px] rounded-full font-medium ${statusColors[task.status]}`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/gtm"
          className="w-full px-4 py-2 bg-white border border-[var(--border-color)] text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--surface)] transition-colors text-[13px] font-medium flex items-center justify-center gap-2 mt-4"
        >
          View GTM
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
