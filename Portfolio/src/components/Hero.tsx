"use client";

import { motion, type Variants } from "framer-motion";
import {
  FileText,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Layers,
} from "lucide-react";
import { JavaIcon, MySQLIcon, GitIcon, GithubIcon, LinkedinIcon } from "./Icons";
import { portfolioData } from "@/data/portfolio-data";
import { TerminalSnippet } from "./TerminalSnippet";

// Container variant for staggered entrance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export function Hero() {
  const { personal } = portfolioData;

  return (
    <section id="hero" className="scroll-mt-24 relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-grid-pattern">
      {/* Glow gradient backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-emerald-500/15 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-cyan-500/15 dark:bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bio & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            {/* Live Availability Status Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/60 dark:bg-emerald-950/40 backdrop-blur-md border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 shadow-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open to Remote • Hybrid • On-Site Roles</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-sm md:text-base font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                Hello, World! I&apos;m
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {personal.name}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 pt-1">
                <span>{personal.title}</span>
                <span className="text-emerald-500 font-bold">•</span>
                <span className="text-slate-500 dark:text-slate-400 text-lg font-normal">
                  MCA @ IIT Patna × IIIT Ranchi
                </span>
              </p>
            </motion.div>

            {/* Summary / Mission */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {personal.summary}
            </motion.p>

            {/* Quick Core Focus Badges with authentic technical icons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-white/60 dark:border-white/10 shadow-xs hover:border-emerald-500/40 transition-all">
                <JavaIcon className="w-4 h-4 text-emerald-500" />
                Core Java &amp; OOP
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-white/60 dark:border-white/10 shadow-xs hover:border-emerald-500/40 transition-all">
                <MySQLIcon className="w-4 h-4 text-cyan-500" />
                MySQL &amp; JDBC
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-white/60 dark:border-white/10 shadow-xs hover:border-emerald-500/40 transition-all">
                <Layers className="w-4 h-4 text-purple-500" />
                Data Structures &amp; Algorithms
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-white/60 dark:border-white/10 shadow-xs hover:border-emerald-500/40 transition-all">
                <GitIcon className="w-4 h-4 text-orange-500" />
                Git &amp; GitHub
              </span>
            </motion.div>

            {/* Key Contact Chips */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                {personal.location}
              </span>
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-500" />
                {personal.email}
              </a>
              <a
                href={`tel:${personal.phoneRaw}`}
                className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                {personal.phone}
              </a>
              <a
                href={personal.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors font-medium"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5 text-emerald-500" />
                GitHub
              </a>
              <a
                href={personal.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors font-medium"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-emerald-500" />
                LinkedIn
              </a>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/45 hover:-translate-y-0.5 transition-all"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-white/50 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md hover:bg-white/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all hover:-translate-y-0.5 shadow-xs"
              >
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>Contact Me</span>
              </a>

              <a
                href="#education"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/60 dark:hover:bg-slate-800/60 backdrop-blur-sm transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Education &amp; Awards</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Code Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 w-full"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 blur-2xl opacity-75 dark:opacity-60 animate-ambient-pulse" />
              <div className="relative">
                <TerminalSnippet />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
