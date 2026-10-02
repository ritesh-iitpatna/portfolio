"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Global Fixed Navbar */}
      <Navbar />

      <div className="relative min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-500 overflow-x-clip">
        <motion.main
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
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
