"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { portfolioData } from "@/data/portfolio-data";

interface CVDownloadButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "compact";
}

export function CVDownloadButton({
  className = "",
  variant = "primary",
}: CVDownloadButtonProps) {
  const [downloaded, setDownloaded] = useState(false);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resumeUrl = portfolioData.personal.resumeUrl || "/api/resume";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Fire celebratory confetti on click
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { x: originX, y: originY },
        colors: ["#10b981", "#06b6d4", "#3b82f6", "#ffffff"],
        ticks: 150,
        gravity: 1.1,
        scalar: 0.8,
      });
    } catch {
      // Confetti fallback
    }

    // Toggle downloaded confirmation state
    setDownloaded(true);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setDownloaded(false);
    }, 2500);
  };

  return (
    <motion.a
      href={resumeUrl}
      download
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center font-semibold rounded-xl cursor-pointer select-none transition-all duration-200 focus:outline-hidden ${
        variant === "primary"
          ? "px-5 py-3 text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
          : variant === "compact"
          ? "px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-md hover:border-emerald-500/40 hover:bg-white/90 dark:hover:bg-slate-800 shadow-xs"
          : "px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-md hover:border-emerald-500/40 hover:bg-white/90 dark:hover:bg-slate-800 shadow-xs"
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {downloaded ? (
          <motion.span
            key="downloaded"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5 text-emerald-950 dark:text-emerald-300 font-semibold"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Downloaded!</span>
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5"
          >
            <Download
              className={`w-4 h-4 ${
                variant === "primary"
                  ? "text-slate-950"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            />
            <span>{variant === "compact" ? "Resume" : "Download CV"}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
