import React from "react";
import { motion } from "motion/react";

interface AnimatedNumberProps {
  value: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedNumber({ value, className = "", style }: AnimatedNumberProps) {
  return (
    <motion.div
      key={value.toString()}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {value}
    </motion.div>
  );
}

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedCard({ children, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
