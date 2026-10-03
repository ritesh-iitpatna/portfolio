"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Database,
  Cpu,
  Wrench,
  Sparkles,
  Layers,
  ShieldCheck,
  Monitor,
  Zap,
  Star,
  Brain,
  MessageSquare,
  Users,
} from "lucide-react";
import {
  JavaIcon,
  MySQLIcon,
  PythonIcon,
  KotlinIcon,
  HtmlIcon,
  VSCodeIcon,
  IntelliJIcon,
  EclipseIcon,
  AndroidStudioIcon,
  GitIcon,
} from "./Icons";
import { portfolioData } from "@/data/portfolio-data";

export function Skills() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = [
    "All",
    "Programming Languages",
    "Core Concepts & Architecture",
    "Developer Tools & IDEs",
    "Currently Learning",
    "Soft Skills & Mindset",
  ];

  const getSkillIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("java (core") || lower.includes("java")) {
      return <JavaIcon className="w-7 h-7 object-contain" />;
    }
    if (lower.includes("mysql workbench") || lower.includes("mysql")) {
      return <MySQLIcon className="w-7 h-7 object-contain" />;
    }
    if (lower.includes("python")) {
      return <PythonIcon className="w-7 h-7 object-contain" />;
    }
    if (lower.includes("kotlin")) {
      return <KotlinIcon className="w-7 h-7 object-contain" />;
    }
    if (lower.includes("html")) {
      return <HtmlIcon className="w-7 h-7 object-contain" />;
    }
    if (lower.includes("visual studio code") || lower.includes("vs code")) {
      return <VSCodeIcon className="w-7 h-7 object-contain" />;
    }
    if (lower.includes("intellij")) {
      return <IntelliJIcon className="w-7 h-7 object-contain" />;
    }
    if (lower.includes("eclipse")) {
      return <EclipseIcon className="w-7 h-7 object-contain" />;
    }
    if (lower.includes("android studio")) {
      return <AndroidStudioIcon className="w-7 h-7 object-contain" />;
    }
    if (lower.includes("git")) {
      return <GitIcon className="w-7 h-7 object-contain" />;
    }
    if (lower.includes("data structures") || lower.includes("algorithms")) {
      return <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
    }
    if (lower.includes("oop")) {
      return <Layers className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
    }
    if (lower.includes("jdbc")) {
      return <Database className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
    }
    if (lower.includes("collections")) {
      return <Code className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
    }
    if (lower.includes("exception")) {
      return <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
    }
    if (lower.includes("swing") || lower.includes("awt")) {
      return <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
    }
    if (lower.includes("problem solving") || lower.includes("logic")) {
      return <Brain className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
    }
    if (lower.includes("collaboration")) {
      return <Users className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
    }
    if (lower.includes("communication")) {
      return <MessageSquare className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
    }
    if (lower.includes("learning") || lower.includes("adaptive")) {
      return <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
    }
    return <Code className="w-6 h-6 text-slate-600 dark:text-slate-400" />;
  };

  const getFilteredSkills = () => {
    if (activeTab === "All") {
      return portfolioData.skills.flatMap((cat) =>
        cat.skills.map((s) => ({ ...s, category: cat.category }))
      );
    }
    const match = portfolioData.skills.find((cat) => cat.category === activeTab);
    return match ? match.skills.map((s) => ({ ...s, category: match.category })) : [];
  };

  const filtered = getFilteredSkills();

  return (
    <section id="skills" className="scroll-mt-24 py-20 relative bg-slate-50/40 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 mb-3 border border-emerald-200 dark:border-emerald-800">
            <Cpu className="w-3.5 h-3.5" />
            Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Skills &amp; Competencies
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            A comprehensive overview of programming languages, foundational computer science concepts, developer tools, and ongoing learning.
          </p>
        </div>

        {/* Filter Tabs in Glass Dock */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xs max-w-fit mx-auto">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 font-semibold"
                  : "bg-white/50 dark:bg-slate-800/50 backdrop-blur-xs text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-white/40 dark:border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Skills Grid (GPU compositor optimized, zero layout-thrashing) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((skill, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18, delay: Math.min(index * 0.015, 0.2) }}
                key={`${skill.category}-${skill.name}`}
                className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 backdrop-blur-md ${
                  skill.highlight
                    ? "bg-gradient-to-br from-emerald-500/10 via-white/70 to-emerald-500/15 dark:from-emerald-950/30 dark:via-slate-900/60 dark:to-emerald-950/40 border-emerald-500/40 dark:border-emerald-500/30 shadow-md hover:shadow-emerald-500/25 hover:shadow-lg"
                    : "bg-white/60 dark:bg-slate-900/60 border-white/50 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 shadow-xs hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Official Icon Box */}
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm shrink-0 flex items-center justify-center p-1.5 group-hover:scale-110 transition-transform">
                      {getSkillIcon(skill.name)}
                    </div>

                    <div className="space-y-0.5">
                      <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {skill.name}
                      </div>
                      {skill.subtitle && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                          {skill.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  {skill.highlight && (
                    <span title="Core Strength" className="text-emerald-500 shrink-0 mt-0.5">
                      <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    </span>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[150px]">{skill.category}</span>
                  {skill.highlight && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[10px] uppercase">
                      Core Focus
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Structured Category Bento Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Core Backend & DB */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-1.5 shadow-sm">
                <JavaIcon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Core Java &amp; Backend
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Deep expertise in object-oriented paradigms, thread-safe collections, JDBC connection pooling, and optimized query execution with zero unhandled exceptions.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                <JavaIcon className="w-4 h-4" /> Java
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                <MySQLIcon className="w-4 h-4" /> MySQL
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                <Database className="w-4 h-4 text-emerald-500" /> JDBC
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                <Layers className="w-4 h-4 text-cyan-500" /> OOPs
              </span>
            </div>
          </div>

          {/* Card 2: Algorithms & Problem Solving */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-1.5 shadow-sm">
                <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                DSA &amp; Database Optimization
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Rigorous analytical foundation from DU Electronics and IIT Patna × IIIT Ranchi MCA. Skilled in designing clean relational schemas and optimizing query latency.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                <Cpu className="w-4 h-4 text-purple-500" /> Data Structures
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                <Zap className="w-4 h-4 text-amber-500" /> Algorithms
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                <MySQLIcon className="w-4 h-4" /> Query Tuning
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                <Brain className="w-4 h-4 text-emerald-500" /> Logic Building
              </span>
            </div>
          </div>

          {/* Card 3: Continuous Learning & Tooling */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-1.5 shadow-sm">
                <Wrench className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Tools &amp; Active Growth
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Proficient in modern IDEs and version control workflows. Actively expanding technical scope with Kotlin and modern web engineering paradigms.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                <IntelliJIcon className="w-4 h-4" /> IntelliJ IDEA
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                <VSCodeIcon className="w-4 h-4" /> VS Code
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                <GitIcon className="w-4 h-4" /> Git &amp; GitHub
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
                <KotlinIcon className="w-4 h-4" /> Kotlin
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
