import React from "react";
import { AnimatedNumber } from "./Animated";
import { ArrowRight } from "lucide-react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "pink" | "terra" | "buff" | "surface";
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function Card({ children, variant = "default", className = "", onMouseEnter, onMouseLeave }: CardProps) {
  const variantStyles = {
    default: "bg-white border border-[var(--border-color)]",
    green: "bg-[var(--green)] text-white",
    pink: "bg-[var(--pink-light)] border border-[var(--pink)]",
    terra: "bg-[var(--terra-light)] border border-[var(--terra)]",
    buff: "bg-[var(--buff)]",
    surface: "bg-[var(--surface)]",
  };

  return (
    <div
      className={`rounded-[var(--radius-lg)] p-6 ${variantStyles[variant]} ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "pink" | "terra";
  className?: string;
}

export function CardTitle({ children, variant = "default", className = "" }: CardTitleProps) {
  const variantStyles = {
    default: "text-[var(--green)]",
    green: "text-[var(--pink)]",
    pink: "text-[var(--pink-dark)]",
    terra: "text-[#8a3a22]",
  };

  return (
    <h3 
      className={`text-[1.25rem] font-semibold mb-2 leading-[1.2] ${variantStyles[variant]} ${className}`}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {children}
    </h3>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  trend?: "up" | "down" | "flat";
  className?: string;
}

export function MetricCard({ label, value, change, changeType = "neutral", trend, className = "" }: MetricCardProps) {
  const changeColors = {
    positive: "text-[var(--green)] bg-[var(--green-light)]",
    negative: "text-[var(--terra)] bg-[var(--terra-light)]",
    neutral: "text-[var(--text-secondary)] bg-[var(--surface)]",
  };

  return (
    <Card className={className}>
      <div className="text-[12.5px] text-[var(--text-secondary)] mb-2 uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </div>
      <AnimatedNumber 
        value={value}
        className="text-[2.2rem] font-medium text-[var(--green)] mb-2 leading-none" 
        style={{ fontFamily: "var(--font-serif)" }}
      />
      {change && (
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium ${changeColors[changeType]}`}>
          {trend === "up" && "↑"}
          {trend === "down" && "↓"}
          {change}
        </div>
      )}
    </Card>
  );
}

interface TagProps {
  children: React.ReactNode;
  variant?: "pink" | "green" | "terra" | "buff" | "black";
  className?: string;
}

export function Tag({ children, variant = "pink", className = "" }: TagProps) {
  const variantStyles = {
    pink: "bg-[var(--pink-light)] text-[var(--pink-dark)]",
    green: "bg-[var(--green-light)] text-[var(--green)]",
    terra: "bg-[var(--terra-light)] text-[#8a3a22]",
    buff: "bg-[var(--buff)] text-[var(--text-secondary)]",
    black: "bg-[var(--black)] text-white",
  };

  return (
    <span 
      className={`inline-block text-[10.5px] px-2.5 py-1 rounded-full uppercase tracking-wider font-medium ${variantStyles[variant]} ${className}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </span>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ label, title, description, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${className}`}>
      {label && (
        <div 
          className="text-[10.5px] tracking-[0.2em] uppercase text-[var(--terra)] mb-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {label}
        </div>
      )}
      <h2 
        className="text-[2.2rem] font-medium text-[var(--green)] mb-2 leading-[1.15]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-[15px] text-[var(--text-secondary)] max-w-[680px] leading-[1.7]">
          {description}
        </p>
      )}
    </div>
  );
}

interface AIInsightCardProps {
  title: string;
  content: string;
  variant?: "primary" | "accent";
  className?: string;
  showButton?: boolean;
  onButtonClick?: () => void;
}

export function AIInsightCard({ title, content, variant = "primary", className = "", showButton = true, onButtonClick }: AIInsightCardProps) {
  const bgStyle = variant === "primary"
    ? "bg-gradient-to-br from-[var(--green)] to-[var(--green-mid)]"
    : "bg-[var(--black)]";

  return (
    <div className={`${bgStyle} rounded-[var(--radius-md)] p-5 ${className}`}>
      <div
        className="text-[10px] uppercase tracking-[0.15em] text-[var(--pink)] mb-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {title}
      </div>
      <p className="text-[13px] text-white/80 leading-[1.5] italic mb-4">
        {content}
      </p>
      {showButton && (
        <button
          onClick={onButtonClick}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--pink)] text-white rounded-[var(--radius-md)] hover:opacity-90 transition-opacity text-[13px] font-medium"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}