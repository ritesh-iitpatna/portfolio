"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { setStoredIntroSeen } from "@/lib/performance-detector";
import { IntroLoader } from "@/components/IntroLoader";

const emptySubscribe = () => () => {};

function getIntroActiveSnapshot(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("intro-active");
}

function getServerSnapshot(): boolean {
  return false;
}

export default function Home() {
  const [isIntroDismissed, setIsIntroDismissed] = useState(false);
  const isIntroActive = useSyncExternalStore(
    emptySubscribe,
    getIntroActiveSnapshot,
    getServerSnapshot
  );

  const showIntro = isIntroActive && !isIntroDismissed;

  // Prevent scroll during cinematic intro loading
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  const handleIntroComplete = useCallback(() => {
    document.documentElement.classList.remove("intro-active");
    setStoredIntroSeen(true);
    setIsIntroDismissed(true);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroLoader
            key="intro-loader"
            onComplete={handleIntroComplete}
          />
        )}
      </AnimatePresence>

      {/* Global Fixed Navbar */}
      <Navbar />

      <div id="main-content" className="relative min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-500 overflow-x-clip">
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
