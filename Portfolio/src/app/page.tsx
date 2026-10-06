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

  // Check performance tier, session storage, and URL test override on client mount
  useEffect(() => {
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const forceIntro = params?.get("intro") === "true" || params?.get("intro") === "1";
    const forceSkip = params?.get("skipIntro") === "true" || params?.get("skipIntro") === "1";

    if (forceSkip) {
      setStoredIntroSeen(true);
      return;
    }

    const tier = detectPerformanceTier();
    if (!forceIntro && (tier.hasSeenIntro || tier.isLowTier)) {
      setStoredIntroSeen(true);
    } else {
      requestAnimationFrame(() => {
        setIntroFinished(false);
      });
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
      <Navbar />

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
