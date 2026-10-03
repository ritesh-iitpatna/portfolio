"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import {
  detectPerformanceTier,
  setStoredIntroSeen,
} from "@/lib/performance-detector";

// Dynamically import IntroLoader so its JS bundle is only fetched when needed
const IntroLoader = dynamic(
  () => import("@/components/IntroLoader").then((mod) => mod.IntroLoader),
  { ssr: false }
);

export default function Home() {
  const [introFinished, setIntroFinished] = useState(true);

  // Check performance tier and session storage on client mount
  useEffect(() => {
    const tier = detectPerformanceTier();
    if (tier.hasSeenIntro || tier.isLowTier) {
      setIntroFinished(true);
      setStoredIntroSeen(true);
    } else {
      setIntroFinished(false);
    }
  }, []);

  // Prevent scroll during cinematic intro loading
  useEffect(() => {
    if (!introFinished) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introFinished]);

  const handleReplayIntro = () => {
    setStoredIntroSeen(false);
    setIntroFinished(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!introFinished && (
          <IntroLoader
            key="intro-loader"
            onComplete={() => setIntroFinished(true)}
          />
        )}
      </AnimatePresence>

      {/* Global Fixed Navbar */}
      <Navbar onReplayIntro={handleReplayIntro} />

      <div className="relative min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-500 overflow-x-clip">
        <motion.main
          initial={false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="min-h-screen flex flex-col transition-colors duration-300"
        >
          <Hero />
          <About />
          <div className="section-defer-render">
            <Skills />
          </div>
          <div className="section-defer-render">
            <Projects />
          </div>
          <div className="section-defer-render">
            <Timeline />
          </div>
          <div className="section-defer-render">
            <Contact />
          </div>
          <Footer />
        </motion.main>
      </div>
    </>
  );
}
