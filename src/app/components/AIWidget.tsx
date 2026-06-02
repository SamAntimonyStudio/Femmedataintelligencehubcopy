import { useState } from "react";
import { X, ChevronUp, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIWidgetProps {
  insightLabel?: string;
  insightText?: string;
}

export function AIWidget({ 
  insightLabel = "Latest Insight", 
  insightText = "Your data intelligence appears here." 
}: AIWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 left-[96px] z-50">
      <AnimatePresence>
        {!isExpanded ? (
          // Collapsed State
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-3 h-[52px] px-5 bg-[var(--green)] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow border-l-2 border-[var(--pink)] hover:border-l-4"
          >
            {/* Animated Waveform Bars */}
            <div className="flex items-center gap-[3px] h-4">
              <motion.div
                className="w-[3px] bg-[var(--pink)] rounded-full"
                animate={{ height: ["8px", "16px", "8px"] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
              />
              <motion.div
                className="w-[3px] bg-[var(--pink)] rounded-full"
                animate={{ height: ["12px", "8px", "14px"] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.div
                className="w-[3px] bg-[var(--pink)] rounded-full"
                animate={{ height: ["10px", "14px", "10px"] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.1 }}
              />
            </div>
            <span className="text-[13px] font-medium">AI Assistant</span>
            <ChevronUp className="w-4 h-4 ml-2" />
          </motion.button>
        ) : (
          // Expanded State
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 340 }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            className="w-[320px] h-[340px] bg-[var(--green)] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white text-[16px] font-medium">AI Assistant</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 rounded-full bg-[var(--green-dark)] flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Waveform Visualization */}
            <div className="flex items-center justify-center h-[80px] px-12">
              <div className="flex items-center justify-center gap-[6px] w-[220px]">
                {Array.from({ length: 26 }).map((_, i) => {
                  const height = 8 + Math.random() * 40;
                  return (
                    <motion.div
                      key={i}
                      className="w-[4px] bg-white/80 rounded-full"
                      style={{ height: `${height}px` }}
                      animate={{ 
                        height: [`${height}px`, `${height * 0.5}px`, `${height}px`],
                        opacity: [0.8, 0.4, 0.8]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5 + Math.random(), 
                        ease: "easeInOut",
                        delay: i * 0.05
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Query Input */}
            <div className="px-5 pb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask anything about your data..."
                  className="w-full h-[36px] bg-transparent border border-white/30 rounded-full px-4 pr-10 text-white/80 text-[13px] placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors">
                  <Search className="w-3.5 h-3.5 text-[var(--green)]" />
                </button>
              </div>
            </div>

            {/* Latest Insight Card */}
            <div className="mx-5 mb-5 bg-[var(--green-dark)] rounded-lg p-4">
              <div 
                className="text-[10px] uppercase tracking-wider text-[var(--pink)] mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {insightLabel}
              </div>
              <p className="text-[12px] text-white/70 leading-relaxed">
                {insightText}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
