"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { IntroLoader } from "@/components/IntroLoader";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

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

      {/* Global Fixed Navbar - Placed outside transformed motion container for flawless mobile click handling */}
      <Navbar onReplayIntro={() => setIntroFinished(false)} />

      <div className="relative min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-500 overflow-x-clip">
        <motion.main
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={
            introFinished
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.98, y: 20 }
          }
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="min-h-screen flex flex-col transition-colors duration-300"
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Contact />
          <Footer />
        </motion.main>
      </div>
    </>
  );
}
