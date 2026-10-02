"use client";

import { motion } from "framer-motion";
import {
  FolderGit2,
  CheckCircle2,
  Layers,
  Database,
  Monitor,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { portfolioData } from "@/data/portfolio-data";

export function Projects() {
  const project = portfolioData.projects[0];

  return (
    <section id="projects" className="scroll-mt-24 py-20 bg-slate-50/50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 mb-3 border border-emerald-200 dark:border-emerald-800">
            <FolderGit2 className="w-3.5 h-3.5" />
            Featured Engineering Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Projects & Systems Built
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Real-world backend and desktop software built with robust architecture, data validation, and query optimization.
          </p>
        </div>

        {/* Featured Project Showcase Card with YouTube Ambient Light Halo */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative group"
        >
          {/* Ambient Glow Aura */}
          <div
            aria-hidden="true"
            className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-emerald-500/25 via-cyan-500/20 to-emerald-500/25 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          />

          <div className="relative glass-card rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 shadow-2xl">
            {/* Top Bar */}
            <div className="p-6 md:p-8 border-b border-white/40 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-mono backdrop-blur-xs">
                    {project.period}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/60 dark:bg-slate-800/60 backdrop-blur-xs text-slate-600 dark:text-slate-300 border border-white/40 dark:border-white/10">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {project.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-white/50 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-800 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-500 transition-all shadow-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Metrics Highlight Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60 dark:divide-slate-800/60 bg-white/40 dark:bg-slate-950/50 backdrop-blur-md border-b border-white/40 dark:border-white/10 text-xs sm:text-sm font-medium">
              {project.metrics.map((metric, i) => (
                <div key={i} className="p-4 flex items-center justify-center text-center gap-2 text-slate-700 dark:text-slate-200 font-semibold">
                  {metric}
                </div>
              ))}
            </div>

          {/* Interactive Project Body */}
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Detailed Overview & Bullet Points */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Key Engineering Contributions:
                </h4>
                <ul className="space-y-2.5">
                  {project.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Tag Cloud */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5">
                  Technologies Deployed:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/60 dark:bg-slate-800/60 backdrop-blur-xs text-slate-700 dark:text-slate-200 border border-white/50 dark:border-white/10 hover:border-emerald-500/50 transition-colors shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Architecture Diagram Card */}
            {/* Right: Architecture Diagram Card */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-slate-900/95 dark:bg-[#070b14]/95 backdrop-blur-xl text-slate-100 border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                    <Cpu className="w-4 h-4" />
                    System Architecture
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                    3-Tier Design
                  </span>
                </div>

                {/* Tier 1: UI */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3 shadow-xs">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">Presentation Layer</div>
                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5 break-words">
                      Java Swing &amp; AWT Event Listeners
                    </div>
                  </div>
                </div>

                {/* Flow Connector 1 */}
                <div className="flex items-center justify-center gap-2 py-0.5">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                  <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400/90 bg-emerald-950/60 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30 text-center">
                    ↓ JDBC API Calls • Data Validation
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                </div>

                {/* Tier 2: Business & Bridge */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3 shadow-xs">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">Business &amp; Connectivity</div>
                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5 break-words">
                      PreparedStatements &amp; Exception Handling
                    </div>
                  </div>
                </div>

                {/* Flow Connector 2 */}
                <div className="flex items-center justify-center gap-2 py-0.5">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                  <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400/90 bg-cyan-950/60 dark:bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30 text-center">
                    ↓ Optimized SQL Queries (20% Faster)
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                </div>

                {/* Tier 3: Database */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3 shadow-xs">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">Persistence Layer</div>
                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5 break-words">
                      MySQL Relational Ledger &amp; User DB
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-slate-400">Validation: Aadhaar (12) &amp; PAN (10)</span>
                <span className="text-emerald-400 font-semibold font-mono">Active Repo</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
}
