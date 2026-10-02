"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Sparkles,
  MousePointer,
  Terminal,
  Zap,
  CheckCircle2,
  Database,
  FastForward,
  Activity,
  Volume2,
  VolumeX,
} from "lucide-react";
import { JavaIcon, MySQLIcon } from "./Icons";
import { sfx } from "@/lib/sound-fx";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  // Phases:
  // 1: High-Speed Collision (Java & MySQL accelerate toward center)
  // 2: Impact Explosion & Fused Core Flash (with screen shake & sparks)
  // 3: Code Matrix & Syntax Glimpse (Java OOP + MySQL live queries)
  // 4: RUN Button Manifests & Auto-Clicks
  // 5: The Cyber Sprint Animation (Runner on cyber highway with milestone unlocks)
  // 6: Warp Drive Exit & Reveal Portfolio Profile
  const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [runProgress, setRunProgress] = useState(0);
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Sparks array for radial 360-degree impact
  const sparks = [
    { x: 130, y: -70 },
    { x: -130, y: -70 },
    { x: 150, y: 50 },
    { x: -150, y: 50 },
    { x: 0, y: -140 },
    { x: 0, y: 140 },
    { x: 95, y: 110 },
    { x: -95, y: 110 },
    { x: 160, y: 0 },
    { x: -160, y: 0 },
    { x: 85, y: -120 },
    { x: -85, y: -120 },
    { x: 65, y: 55 },
    { x: -65, y: 55 },
  ];

  const milestones = [
    { title: "LEETCODE 150+ & CORE JAVA", status: "SYNCHRONIZED", color: "text-emerald-400" },
    { title: "MYSQL & JDBC OPTIMIZER", status: "CONNECTED", color: "text-cyan-400" },
    { title: "IIT PATNA × IIIT RANCHI", status: "VERIFIED", color: "text-purple-400" },
    { title: "RITESH KUMAR PORTFOLIO", status: "LAUNCHED", color: "text-amber-300" },
  ];

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sfx.setMuted(nextState);
    if (!nextState) {
      sfx.playMatrixBlip();
    }
  };

  useEffect(() => {
    // Synchronize mute status explicitly with sfx engine
    sfx.setMuted(isMuted);

    // Modern browsers require a user gesture to resume AudioContext; listen for first interaction
    const handleGesture = () => {
      if (!isMuted) {
        sfx.resumeAudioContext();
      }
    };
    window.addEventListener("pointerdown", handleGesture, { once: true });
    window.addEventListener("keydown", handleGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };
  }, [isMuted]);

  useEffect(() => {
    // Phase 1 start sound (only plays if unmuted)
    sfx.resumeAudioContext();
    sfx.playChargeHum();

    // 1 -> 2: Collision Impact at 1.05s
    const t1 = setTimeout(() => {
      setPhase(2);
      sfx.playCollisionBoom();
    }, 1050);

    // 2 -> 3: Code Glimpses manifest at 1.9s
    const t2 = setTimeout(() => {
      setPhase(3);
      sfx.playMatrixBlip();
    }, 1900);

    // 3 -> 4: RUN Button pops up at 3.1s
    const t3 = setTimeout(() => {
      setPhase(4);
    }, 3100);

    // 4 Auto-click RUN button at 3.8s
    const t4 = setTimeout(() => {
      setIsButtonPressed(true);
      sfx.playButtonClick();
    }, 3800);

    // 4 -> 5: Launch Cyber Runner Sprint at 4.2s
    const t5 = setTimeout(() => {
      setPhase(5);
    }, 4200);

    // Runner progress ticks & milestone chimes
    const p1 = setTimeout(() => { setRunProgress(25); setCurrentMilestone(1); sfx.playMilestoneChime(0); }, 4450);
    const p2 = setTimeout(() => { setRunProgress(50); setCurrentMilestone(2); sfx.playMilestoneChime(1); }, 4800);
    const p3 = setTimeout(() => { setRunProgress(80); setCurrentMilestone(3); sfx.playMilestoneChime(2); }, 5150);
    const p4 = setTimeout(() => { setRunProgress(100); setCurrentMilestone(4); sfx.playMilestoneChime(3); }, 5450);

    // 5 -> 6: Warp drive exit at 5.7s
    const t6 = setTimeout(() => {
      setPhase(6);
      sfx.playWarpSweep();
      setTimeout(() => {
        onComplete();
      }, 550);
    }, 5700);

    // Keyboard 'Escape' or Space to immediately skip intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Space") {
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(p4);
      window.removeEventListener("keydown", handleKeyDown);
      sfx.setMuted(true);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.15, filter: "blur(12px)", transition: { duration: 0.55 } }}
      className="fixed inset-0 w-screen h-screen h-[100dvh] max-h-screen z-[999999] bg-[#030612] text-white flex flex-col justify-between select-none overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC AMBIENT LIGHTING & PERSPECTIVE GRID */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-emerald-500/15 blur-[140px]" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-600/10 blur-[160px]" />

        {/* Cyber perspective grid on ground */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 opacity-25"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(16,185,129,0.2) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(56,189,248,0.2) 1px, transparent 1px)`,
            backgroundSize: "45px 45px",
            transform: "perspective(300px) rotateX(60deg)",
            transformOrigin: "bottom center",
          }}
        />

        {/* Ambient Speed Streaks (Active during running phase) */}
        {phase === 5 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "120vw", opacity: 0 }}
                animate={{ x: "-120vw", opacity: [0, 0.8, 0.8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.55 + (i % 4) * 0.12,
                  delay: i * 0.08,
                  ease: "linear",
                }}
                style={{
                  top: `${10 + i * 7}%`,
                  height: i % 2 === 0 ? "2px" : "1px",
                  width: `${90 + (i % 4) * 50}px`,
                }}
                className="absolute rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-emerald-300"
              />
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP HUD STATUS BAR */}
      {/* ========================================================================= */}
      <div className="w-full h-14 bg-black/80 backdrop-blur-md border-b border-emerald-500/20 px-6 flex items-center justify-between z-30 font-mono text-xs shrink-0">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-white font-bold tracking-widest uppercase sm:inline hidden">
            RITESH KUMAR // SYSTEM INITIALIZATION
          </span>
          <span className="text-white font-bold tracking-widest uppercase sm:hidden">
            RITESH // BOOTING
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            title={isMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 text-xs font-mono transition-all text-slate-300 hover:text-white cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline text-slate-400">Audio: OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline text-emerald-400 font-bold">Audio: ON</span>
              </>
            )}
          </button>

          <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
            Press [Esc] or
          </span>
          <button
            onClick={onComplete}
            className="text-xs text-slate-300 hover:text-white px-3.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 font-mono cursor-pointer transition-all flex items-center gap-1.5 shadow-lg group"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CENTRAL THEATRE CONTAINER (Guaranteed Viewport Centered) */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-4xl mx-auto px-4 flex-1 flex flex-col items-center justify-center z-20 min-h-0">
        <AnimatePresence mode="wait">
          {/* --------------------------------------------------------------------- */}
          {/* PHASE 1: TWO ICONS COLLIDE */}
          {/* --------------------------------------------------------------------- */}
          {phase === 1 && (
            <motion.div
              key="phase-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-64 flex items-center justify-center overflow-visible"
            >
              {/* Collision Center Warning / Grid Indicator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-72 h-72 rounded-full border border-dashed border-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
              </div>

              {/* JAVA ICON (Accelerating from Left) */}
              <motion.div
                initial={{ x: -380, opacity: 0, scale: 0.7 }}
                animate={{
                  x: -28,
                  opacity: 1,
                  scale: 1.05,
                }}
                transition={{
                  duration: 1.0,
                  ease: [0.12, 0.8, 0.32, 1],
                }}
                className="absolute flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-slate-900/95 border-2 border-emerald-400 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.8)] backdrop-blur-md z-10"
              >
                <div className="w-12 h-12 p-1.5 rounded-xl bg-white/10 flex items-center justify-center shadow-inner">
                  <JavaIcon className="w-9 h-9" />
                </div>
                <div className="text-left font-mono">
                  <div className="text-base font-black text-white tracking-wide">CORE JAVA</div>
                  <div className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                    <span>DSA & OOP ENGINE</span>
                    <span className="text-emerald-400">➔</span>
                  </div>
                </div>

                {/* Trailing energy tail */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-32 h-1.5 bg-gradient-to-l from-emerald-400 to-transparent rounded-full opacity-75" />
              </motion.div>

              {/* MYSQL ICON (Accelerating from Right) */}
              <motion.div
                initial={{ x: 380, opacity: 0, scale: 0.7 }}
                animate={{
                  x: 28,
                  opacity: 1,
                  scale: 1.05,
                }}
                transition={{
                  duration: 1.0,
                  ease: [0.12, 0.8, 0.32, 1],
                }}
                className="absolute flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-slate-900/95 border-2 border-cyan-400 text-cyan-400 shadow-[0_0_40px_rgba(56,189,248,0.8)] backdrop-blur-md z-10"
              >
                {/* Trailing energy tail */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-32 h-1.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full opacity-75" />

                <div className="w-12 h-12 p-1.5 rounded-xl bg-white/10 flex items-center justify-center shadow-inner">
                  <MySQLIcon className="w-9 h-9" />
                </div>
                <div className="text-left font-mono">
                  <div className="text-base font-black text-white tracking-wide">MYSQL DB</div>
                  <div className="text-[11px] text-cyan-300 font-semibold flex items-center gap-1">
                    <span className="text-cyan-400">⬅</span>
                    <span>JDBC ARCHITECTURE</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* PHASE 2: IMPACT EXPLOSION & FUSED CORE */}
          {/* --------------------------------------------------------------------- */}
          {phase === 2 && (
            <motion.div
              key="phase-2"
              initial={{ scale: 0.9 }}
              animate={{
                scale: 1,
                x: [-10, 10, -8, 8, -4, 4, -1, 1, 0],
                y: [6, -6, 5, -5, 2, -2, 0],
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full h-64 flex items-center justify-center"
            >
              {/* Blinding Flash Core */}
              <motion.div
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-emerald-300 via-white to-cyan-300 blur-lg pointer-events-none"
              />

              {/* Shockwave Rings */}
              <motion.div
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 3.2, opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="absolute w-64 h-64 rounded-full border-4 border-emerald-400 shadow-[0_0_80px_#10b981] pointer-events-none"
              />
              <motion.div
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 3.6, opacity: 0 }}
                transition={{ duration: 0.85, delay: 0.08, ease: "easeOut" }}
                className="absolute w-72 h-72 rounded-full border-2 border-cyan-400 shadow-[0_0_90px_#38bdf8] pointer-events-none"
              />

              {/* Radial High-Speed Sparks */}
              {sparks.map((spark, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 1.8, opacity: 1 }}
                  animate={{ x: spark.x, y: spark.y, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                  className={`absolute w-3.5 h-3.5 rounded-full pointer-events-none ${
                    i % 2 === 0
                      ? "bg-emerald-300 shadow-[0_0_15px_#10b981]"
                      : "bg-cyan-300 shadow-[0_0_15px_#38bdf8]"
                  }`}
                />
              ))}

              {/* Fused Power Core Badge */}
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="flex items-center gap-4 px-8 py-4 rounded-full bg-slate-900 border-2 border-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.9)] z-20 backdrop-blur-md"
              >
                <Zap className="w-8 h-8 text-amber-300 animate-bounce" />
                <div className="font-mono text-left">
                  <span className="font-black text-sm sm:text-base text-white tracking-wide block">
                    COLLISION FUSED: CORE ENGINE ACTIVE
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    Java Virtual Machine × Relational Database Synchronized
                  </span>
                </div>
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </motion.div>
            </motion.div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* PHASE 3 & 4: CODING VISUAL GLIMPSES & "RUN" TRIGGER */}
          {/* --------------------------------------------------------------------- */}
          {(phase === 3 || phase === 4) && (
            <motion.div
              key="phase-3-4"
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl rounded-2xl bg-[#070c1a]/95 border border-slate-700/80 shadow-[0_0_70px_rgba(0,0,0,0.95)] overflow-hidden backdrop-blur-xl"
            >
              {/* IDE Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <span className="ml-2 text-slate-200 font-semibold flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    RiteshKumarEngine.java
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-emerald-400 font-semibold animate-pulse">●</span>
                  <span className="text-slate-300 font-bold uppercase tracking-wider">
                    {phase === 4 ? "AWAITING COMPILER TRIGGER" : "SYNTAX GLIMPSE"}
                  </span>
                </div>
              </div>

              {/* Holographic Code Screen */}
              <div className="p-5 font-mono text-xs sm:text-sm text-left space-y-1.5 bg-[#040814] text-slate-300 relative overflow-hidden">
                {/* Scanlines Effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-5"
                  style={{
                    backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%)",
                    backgroundSize: "100% 4px",
                  }}
                />

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
                  <span className="text-purple-400 font-bold">package</span>{" "}
                  <span className="text-emerald-300">com.ritesh.portfolio</span>;
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="pt-1">
                  <span className="text-purple-400 font-bold">public class</span>{" "}
                  <span className="text-amber-300 font-bold">RiteshKumar</span> &#123;
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="pl-5 text-slate-400">
                  <span className="text-purple-400">final String</span> degree ={" "}
                  <span className="text-emerald-300">&quot;MCA @ IIT Patna × IIIT Ranchi&quot;</span>;
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="pl-5 text-slate-400">
                  <span className="text-purple-400">final String[]</span> coreStack = &#123;
                  <span className="text-cyan-300">&quot;Core Java&quot;</span>,{" "}
                  <span className="text-cyan-300">&quot;DSA (LeetCode 150+)&quot;</span>,{" "}
                  <span className="text-cyan-300">&quot;MySQL/JDBC&quot;</span>&#125;;
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="pl-5 text-emerald-400 font-semibold pt-1">
                  <span className="text-purple-400">public static void</span>{" "}
                  <span className="text-cyan-300">main</span>(String[] args) &#123;
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="pl-10 text-amber-300 font-semibold">
                  PortfolioSystem.executeRuntime(Mode.PRODUCTION);
                </motion.div>
                <div className="pl-5">&#125;</div>
                <div>&#125;</div>

                {/* Live SQL Glimpse Strip */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-cyan-400 font-mono"
                >
                  <Database className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-slate-400">QUERY:</span>
                  <span className="text-cyan-300 truncate">
                    SELECT status FROM developers WHERE candidate = &apos;Ritesh Kumar&apos; AND passion = &apos;MAX&apos;;
                  </span>
                </motion.div>
              </div>

              {/* PHASE 4: THE BIG RUN BUTTON & VIRTUAL MOUSE */}
              {phase === 4 && (
                <div className="border-t border-slate-800/80 bg-[#02050f] p-5 flex flex-col items-center justify-center relative">
                  <motion.div
                    animate={
                      isButtonPressed
                        ? { scale: 0.94, boxShadow: "0 0 60px #10b981" }
                        : { scale: 1, boxShadow: "0 0 35px rgba(16,185,129,0.75)" }
                    }
                    className={`px-8 py-3.5 rounded-2xl font-mono font-black text-sm sm:text-base flex items-center gap-3 transition-colors duration-200 select-none ${
                      isButtonPressed
                        ? "bg-emerald-300 text-slate-950 ring-4 ring-emerald-400"
                        : "bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 text-slate-950 shadow-2xl"
                    }`}
                  >
                    {isButtonPressed ? (
                      <>
                        <Zap className="w-5 h-5 fill-slate-950 text-slate-950 animate-bounce" />
                        <span>⚡ EXECUTING RUNTIME PROTOCOL...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-slate-950 text-slate-950" />
                        <span>▶ RUN PORTFOLIO ENGINE</span>
                        <Sparkles className="w-5 h-5 text-slate-950" />
                      </>
                    )}
                  </motion.div>

                  {/* Virtual Mouse Pointer */}
                  <motion.div
                    initial={{ x: 60, y: 30, opacity: 0 }}
                    animate={
                      isButtonPressed
                        ? { x: 0, y: -12, scale: 0.85, opacity: 1 }
                        : { x: 25, y: 15, scale: 1, opacity: 1 }
                    }
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-2 right-1/4 pointer-events-none"
                  >
                    <MousePointer className="w-8 h-8 text-white fill-white drop-shadow-[0_0_12px_rgba(0,0,0,0.95)]" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* PHASE 5: THE DYNAMIC RUNNING SPRINT ANIMATION */}
          {/* --------------------------------------------------------------------- */}
          {phase === 5 && (
            <motion.div
              key="phase-5"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.15, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl flex flex-col items-center"
            >
              {/* Visual Runway Scene */}
              <div className="relative w-full h-56 rounded-2xl bg-gradient-to-b from-[#090e21] to-[#040713] border border-emerald-500/30 overflow-hidden flex flex-col items-center justify-center shadow-[0_0_70px_rgba(16,185,129,0.25)]">
                {/* Digital Horizon Light */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                {/* Infinite Moving Grid Road */}
                <div
                  className="anim-cyber-road absolute inset-x-0 bottom-0 h-28 border-t border-emerald-500/40"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(16,185,129,0.4) 2px, transparent 2px),
                                      linear-gradient(to bottom, rgba(56,189,248,0.2) 1px, transparent 1px)`,
                    backgroundSize: "40px 14px",
                    transform: "perspective(200px) rotateX(45deg)",
                    transformOrigin: "bottom center",
                  }}
                />

                {/* THE CYBER RUNNER (Vector Character in sprint cycle) */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, -2, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.38,
                    ease: "easeInOut",
                  }}
                  className="relative z-20 flex flex-col items-center"
                >
                  <svg
                    className="w-24 h-24 text-emerald-400 drop-shadow-[0_0_20px_#10b981]"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Runner Head */}
                    <circle cx="56" cy="22" r="7" fill="#38bdf8" />
                    <circle cx="58" cy="22" r="3" fill="#ffffff" />

                    {/* Cyber Torso */}
                    <path d="M50 29L40 50L46 52L58 35Z" fill="url(#runnerGrad)" />

                    {/* Forward Arm */}
                    <path
                      d="M54 34L68 40L72 50"
                      stroke="#10b981"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Trailing Arm */}
                    <path
                      d="M48 35L36 38L30 46"
                      stroke="#38bdf8"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Lead Leg (Sprinting Forward) */}
                    <path
                      d="M43 51L62 64L54 82"
                      stroke="#34d399"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Back Leg (High Kick) */}
                    <path
                      d="M41 51L24 58L16 52"
                      stroke="#0284c7"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id="runnerGrad" x1="40" y1="29" x2="58" y2="52" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#10b981" />
                        <stop offset="1" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Ground Shadow & Neon Glide Aura */}
                  <div className="w-20 h-2 rounded-full bg-emerald-400/40 blur-sm -mt-2 animate-pulse" />
                </motion.div>

                {/* Current Milestone Banner */}
                <div className="absolute top-4 inset-x-4 flex justify-between items-center text-xs font-mono z-20">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-emerald-500/30">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    <span className="text-slate-300">VELOCITY:</span>
                    <span className="text-emerald-400 font-bold">OPTIMAL (120 FPS)</span>
                  </div>

                  <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-cyan-500/30 font-bold text-cyan-300">
                    {runProgress}% LOADED
                  </div>
                </div>
              </div>

              {/* Milestone Unlocks List */}
              <div className="w-full mt-4 bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 font-mono text-xs space-y-2">
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold text-left">
                  Runtime Checkpoints:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                  {milestones.map((m, idx) => {
                    const isPassed = currentMilestone >= idx + 1;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-300 ${
                          isPassed
                            ? "bg-slate-900 border-emerald-500/40 text-white"
                            : "bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-40"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isPassed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-700 inline-block shrink-0" />
                          )}
                          <span className="truncate font-semibold">{m.title}</span>
                        </div>
                        <span className={`text-[10px] font-bold ${isPassed ? m.color : "text-slate-600"}`}>
                          {isPassed ? m.status : "WAITING"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* High-Tech Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden relative mt-2">
                  <motion.div
                    animate={{ width: `${runProgress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-300 shadow-[0_0_15px_#10b981]"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM FOOTER BAR */}
      {/* ========================================================================= */}
      <div className="w-full h-12 bg-black/85 backdrop-blur-md border-t border-emerald-500/20 px-6 flex items-center justify-between z-30 font-mono text-xs text-slate-400 shrink-0">
        <div className="flex items-center gap-2">
          <span>MCA @ IIT PATNA × IIIT RANCHI</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">RITESH KUMAR PORTFOLIO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">STAGE</span>
          <span className="text-white font-bold">{phase} / 5</span>
        </div>
      </div>
    </motion.div>
  );
}
