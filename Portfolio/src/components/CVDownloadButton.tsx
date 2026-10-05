"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Check, FileText } from "lucide-react";
import confetti from "canvas-confetti";
import { portfolioData } from "@/data/portfolio-data";

type AnimationPhase =
  | "idle"
  | "expanding"
  | "rolling"
  | "packing"
  | "flying"
  | "completed";

interface ButtonOriginRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface CVDownloadButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "compact";
}

export function CVDownloadButton({
  className = "",
  variant = "primary",
}: CVDownloadButtonProps) {
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const [buttonRect, setButtonRect] = useState<ButtonOriginRect | null>(null);
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [isChromeTrayActive, setIsChromeTrayActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    setMounted(true);
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Update target destination coordinates (top-right Chrome download location)
  const updateTargetPos = useCallback(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 640;
    setTargetPos({
      x: isMobile ? window.innerWidth - 32 : window.innerWidth - 44,
      y: isMobile ? 16 : 22,
    });
  }, []);

  useEffect(() => {
    updateTargetPos();
    window.addEventListener("resize", updateTargetPos);
    return () => window.removeEventListener("resize", updateTargetPos);
  }, [updateTargetPos]);

  // Actual PDF file trigger
  const triggerNativeDownload = useCallback(() => {
    const resumeUrl =
      portfolioData.personal.resumeUrl || "/Ritesh_Kumar_Resume.pdf";
    const filename =
      portfolioData.personal.resumeFilename || "Ritesh_Kumar_Resume.pdf";

    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = filename;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleStartDownload = () => {
    if (phase !== "idle") return;

    // Clear any previous running timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }

    updateTargetPos();

    // 1. Expand button & open slot (0 - 250ms)
    setPhase("expanding");

    // 2. A4 paper rolls out from slot quickly in EXACTLY 0.50 seconds (250ms - 750ms)
    const t1 = setTimeout(() => {
      setPhase("rolling");
    }, 240);
    timersRef.current.push(t1);

    // 3. Envelope appears and paper slides into envelope (750ms - 1050ms)
    const t2 = setTimeout(() => {
      setPhase("packing");
    }, 760);
    timersRef.current.push(t2);

    // 4. Sealed envelope flies to Chrome top-right download corner (1050ms - 1480ms)
    const t3 = setTimeout(() => {
      // Re-capture button rect in case user moved or scrolled
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
      setPhase("flying");
    }, 1080);
    timersRef.current.push(t3);

    // 5. Envelope arrives at Chrome target (1500ms)
    const t4 = setTimeout(() => {
      setIsChromeTrayActive(true);
      triggerNativeDownload();

      // Confetti burst right at Chrome download corner
      try {
        const originX = (window.innerWidth - 36) / window.innerWidth;
        confetti({
          particleCount: 28,
          spread: 60,
          origin: { x: originX, y: 0.04 },
          colors: ["#10b981", "#06b6d4", "#3b82f6", "#ffffff"],
          ticks: 200,
          gravity: 1.2,
          scalar: 0.8,
        });
      } catch {
        // Fallback gracefully if confetti fails
      }
    }, 1500);
    timersRef.current.push(t4);

    // 6. Complete and reset state
    const t5 = setTimeout(() => {
      setPhase("completed");
    }, 1600);
    timersRef.current.push(t5);

    const t6 = setTimeout(() => {
      setIsChromeTrayActive(false);
    }, 2600);
    timersRef.current.push(t6);

    const t7 = setTimeout(() => {
      setPhase("idle");
    }, 3400);
    timersRef.current.push(t7);
  };

  const isAnimating = phase !== "idle" && phase !== "completed";

  // Check if button is positioned near the top edge of viewport (e.g. inside Navbar)
  const isNearTop = (buttonRect?.top ?? 100) < 90;

  // Compute flight start point centered on button
  const startX = buttonRect ? buttonRect.left + buttonRect.width / 2 - 28 : 0;
  const startY = buttonRect
    ? isNearTop
      ? buttonRect.top + buttonRect.height + 14
      : buttonRect.top - 35
    : 0;

  return (
    <>
      <div className="relative inline-flex items-center">
        {/* Main Interactive Button */}
        <motion.button
          ref={buttonRef}
          type="button"
          onClick={handleStartDownload}
          disabled={isAnimating}
          aria-label="Download Ritesh's CV"
          className={`relative group inline-flex items-center justify-center font-semibold rounded-xl cursor-pointer touch-manipulation transition-all duration-300 focus:outline-hidden ${
            variant === "primary"
              ? "px-5 py-3 text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
              : variant === "compact"
              ? "px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-md hover:border-emerald-500/40 hover:bg-white/90 dark:hover:bg-slate-800 shadow-xs"
              : "px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-md hover:border-emerald-500/40 hover:bg-white/90 dark:hover:bg-slate-800 shadow-xs"
          } ${isAnimating ? "cursor-wait ring-2 ring-emerald-400/60" : "hover:-translate-y-0.5"} ${className}`}
          animate={{
            width:
              phase === "expanding" || phase === "rolling" || phase === "packing"
                ? (variant === "compact" ? 170 : 215)
                : "auto",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        >
          {/* Printer/Dispenser Output Slot */}
          <AnimatePresence>
            {(phase === "expanding" ||
              phase === "rolling" ||
              phase === "packing") && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`absolute ${isNearTop ? "-bottom-1" : "-top-1"} left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-slate-950 dark:bg-slate-900 border border-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.9)] z-20`}
              >
                <div className="w-full h-full bg-emerald-400 animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button Content States */}
          <div className="relative z-10 flex items-center justify-center gap-2 font-medium">
            {phase === "idle" && (
              <>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <Download className={`w-3.5 h-3.5 ${variant === "primary" ? "text-slate-950" : "text-emerald-500"} transition-transform group-hover:translate-y-0.5`} />
                  <span>{variant === "compact" ? "Resume" : "Download CV"}</span>
                </motion.div>
              </>
            )}

            {(phase === "expanding" || phase === "rolling") && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs font-semibold tracking-wide"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-950 opacity-75 dark:bg-emerald-300" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-900 dark:bg-emerald-400" />
                </span>
                <span>Printing CV...</span>
              </motion.div>
            )}

            {phase === "packing" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-xs font-semibold tracking-wide"
              >
                <span className="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent dark:border-white dark:border-t-transparent rounded-full animate-spin" />
                <span>Packing in Envelope...</span>
              </motion.div>
            )}

            {phase === "flying" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 text-xs font-semibold"
              >
                <span>Sending to Chrome...</span>
              </motion.div>
            )}

            {phase === "completed" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5 text-slate-950 font-bold"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Downloaded!</span>
              </motion.div>
            )}
          </div>

          {/* Local in-button paper rollout stage (before liftoff) */}
          <div className={`absolute left-1/2 -translate-x-1/2 ${isNearTop ? "top-full mt-1.5" : "bottom-full mb-1"} pointer-events-none z-30`}>
            <AnimatePresence>
              {phase === "rolling" && (
                <motion.div
                  key="a4-sheet"
                  // Exactly 0.5s rollout as requested:
                  initial={{ y: isNearTop ? -25 : 25, scaleY: 0, opacity: 0, scaleX: 0.85 }}
                  animate={{ y: isNearTop ? 10 : -10, scaleY: 1, opacity: 1, scaleX: 1 }}
                  exit={{ y: isNearTop ? 5 : -5, opacity: 0.8, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1], // fast, smooth deceleration
                  }}
                  className={`w-14 h-20 bg-white dark:bg-slate-100 rounded-sm shadow-2xl border border-slate-300 dark:border-slate-400 p-1 flex flex-col justify-between overflow-hidden ${isNearTop ? "origin-top" : "origin-bottom"} transform-gpu`}
                  style={{
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {/* Miniature A4 Resume Layout */}
                  <div className="flex items-center gap-1 border-b border-slate-200 pb-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <div className="flex flex-col gap-0.5 w-full">
                      <div className="h-1 bg-slate-800 rounded-xs w-3/4" />
                      <div className="h-0.5 bg-slate-400 rounded-xs w-1/2" />
                    </div>
                  </div>

                  {/* Micro text skeleton lines */}
                  <div className="flex flex-col gap-0.5 my-1">
                    <div className="h-0.5 bg-emerald-400/80 rounded-xs w-2/3" />
                    <div className="h-0.5 bg-slate-300 rounded-xs w-full" />
                    <div className="h-0.5 bg-slate-300 rounded-xs w-5/6" />
                    <div className="h-0.5 bg-slate-300 rounded-xs w-4/5" />
                  </div>

                  {/* Skills badges mini row */}
                  <div className="flex gap-0.5 mb-1">
                    <div className="h-1 w-2 rounded-xs bg-cyan-400/80" />
                    <div className="h-1 w-2.5 rounded-xs bg-emerald-400/80" />
                    <div className="h-1 w-2 rounded-xs bg-purple-400/80" />
                  </div>

                  {/* Footer micro stamp */}
                  <div className="flex items-center justify-between pt-0.5 border-t border-slate-200">
                    <div className="h-0.5 bg-slate-400 rounded-xs w-1/3" />
                    <FileText className="w-2 h-2 text-emerald-600" />
                  </div>
                </motion.div>
              )}

              {phase === "packing" && (
                <motion.div
                  key="packing-envelope"
                  initial={{ scale: 0.9, y: isNearTop ? -8 : 0, opacity: 0 }}
                  animate={{ scale: 1, y: isNearTop ? 12 : -12, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="relative w-16 h-11 bg-gradient-to-br from-amber-50 to-amber-100 rounded-sm shadow-xl border border-amber-300 flex items-center justify-center overflow-hidden"
                >
                  {/* Paper folded inside */}
                  <motion.div
                    initial={{ y: isNearTop ? 16 : -16, opacity: 1 }}
                    animate={{ y: 2, opacity: 0.4 }}
                    transition={{ duration: 0.22 }}
                    className="absolute top-1 w-12 h-6 bg-white border border-slate-300 rounded-xs shadow-xs"
                  />

                  {/* Envelope triangular flap closing */}
                  <motion.div
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: 180 }}
                    transition={{ duration: 0.25, delay: 0.12 }}
                    className="absolute top-0 inset-x-0 h-5 origin-top bg-amber-200 border-b border-amber-400"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      backfaceVisibility: "hidden",
                    }}
                  />

                  {/* Glowing Emerald Wax Stamp */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.22, type: "spring", stiffness: 400 }}
                    className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-xs flex items-center justify-center z-10 border border-emerald-300"
                  >
                    <span className="text-[7px] font-bold text-white leading-none">
                      RK
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      {/* PORTAL LAYER: Crosses all container boundaries & overflow-hidden */}
      {mounted &&
        createPortal(
          <>
            {/* Flying Envelope to Chrome Download Tray */}
            <AnimatePresence>
              {phase === "flying" && (
                <motion.div
                  initial={{
                    position: "fixed",
                    left: startX,
                    top: startY,
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                    zIndex: 99999,
                  }}
                  animate={{
                    left: targetPos.x - 16,
                    top: targetPos.y - 6,
                    scale: 0.28,
                    opacity: 0,
                    rotate: -18,
                  }}
                  transition={{
                    duration: 0.42,
                    ease: [0.25, 1, 0.5, 1], // snappy parabolic flight
                  }}
                  className="pointer-events-none"
                >
                  <div className="relative w-16 h-11 bg-gradient-to-br from-amber-50 to-amber-100 rounded-sm shadow-2xl border border-amber-300 flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(16,185,129,0.35)]">
                    {/* Glowing trail particle */}
                    <div className="absolute -inset-1 bg-emerald-400/40 rounded-sm blur-xs animate-pulse" />
                    {/* Sealed flap lines */}
                    <div
                      className="absolute inset-0 bg-amber-200/90"
                      style={{ clipPath: "polygon(0 0, 100% 0, 50% 55%)" }}
                    />
                    {/* Seal */}
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm flex items-center justify-center z-10 border border-emerald-300">
                      <span className="text-[7px] font-bold text-white leading-none">
                        RK
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Top-Right Chrome Download Tray Indicator */}
            <AnimatePresence>
              {isChromeTrayActive && (
                <motion.div
                  initial={{ scale: 0.7, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: -6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    position: "fixed",
                    right: 16,
                    top: 14,
                    zIndex: 99999,
                  }}
                  className="pointer-events-none flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/95 dark:bg-slate-950/95 text-white border border-emerald-500/50 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl"
                >
                  {/* Chrome Circular Download Indicator */}
                  <div className="relative flex items-center justify-center w-7 h-7">
                    {/* Circular Progress Ring SVG */}
                    <svg
                      className="w-7 h-7 -rotate-90 transform"
                      viewBox="0 0 36 36"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        className="stroke-slate-700"
                        strokeWidth="3"
                      />
                      <motion.circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        className="stroke-emerald-400"
                        strokeWidth="3"
                        strokeDasharray="88"
                        initial={{ strokeDashoffset: 88 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Centered Download Arrow morphing into checkmark */}
                    <motion.div
                      initial={{ y: -3, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center text-emerald-400"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </motion.div>
                  </div>

                  {/* Chrome Download Pill text */}
                  <div className="flex flex-col pr-1">
                    <span className="text-[11px] font-bold text-white leading-tight">
                      Downloaded to Chrome
                    </span>
                    <span className="text-[9px] text-emerald-400/90 font-mono leading-none">
                      Ritesh_Kumar_Resume.pdf
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>,
          document.body
        )}
    </>
  );
}
