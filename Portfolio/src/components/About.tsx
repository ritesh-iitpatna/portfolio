"use client";

import { motion } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";
import { JointIITIIITLogo, DelhiUniversityLogo, ICICIAwardLogo } from "./Icons";

export function About() {
  const highlights = [
    {
      logo: <JointIITIIITLogo className="shrink-0" />,
      title: "IIT Patna × IIIT Ranchi",
      subtitle: "MCA in Software Engineering",
      detail: "Advancing knowledge in enterprise software architecture, distributed systems, and algorithmic engineering.",
    },
    {
      logo: <DelhiUniversityLogo className="w-12 h-12 shrink-0" />,
      title: "University of Delhi",
      subtitle: "B.Sc. Physical Science with Electronics",
      detail: "Graduated with 7.28 CGPA. Strong core in mathematics, microprocessors & electronics.",
    },
    {
      logo: <ICICIAwardLogo className="w-12 h-12 shrink-0 text-sm font-black" />,
      title: "Gold Medalist",
      subtitle: "ICICI Student of the Year",
      detail: "Awarded 1st Rank and Gold Medal for outstanding academic dedication and excellence.",
    },
  ];

  return (
    <section id="about" className="scroll-mt-24 py-20 bg-slate-50/50 dark:bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 mb-3 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            Background &amp; Profile
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About Me
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Passionate software developer focused on Core Java, backend optimization, and algorithmic problem-solving.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Detailed Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-5"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Bridging Rigorous Fundamentals with Scalable Software
            </h3>
            
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              I am an aspiring Software Developer currently pursuing my <strong>MCA in Software Engineering</strong> from the collaborative program at <strong>IIT Patna × IIIT Ranchi</strong>.
            </p>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              My engineering journey began with a <strong>B.Sc. in Physical Science with Electronics from the University of Delhi</strong> (CGPA 7.28), giving me a rigorous foundation in mathematics, logical reasoning, and microprocessors. Since transitioning full-time into software engineering, I have focused deeply on <strong>Core Java</strong>, <strong>Object-Oriented Programming (OOP)</strong>, <strong>Data Structures &amp; Algorithms (DSA)</strong>, and <strong>MySQL database optimization</strong>.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Analytical Problem Solver:</strong> Experienced in writing optimized SQL queries, safe JDBC transactions, and robust exception handling.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Fast Learner &amp; Adaptable:</strong> Actively expanding into Kotlin and modern full-stack web technologies to broaden my engineering versatility.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Collaborative Team Player:</strong> Strong communication, eager to contribute to forward-thinking engineering teams and enterprise projects.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Key Milestones Cards with University & Award Logos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 grid grid-cols-1 gap-4"
          >
            {highlights.map((item, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Ambient Glow Aura on hover */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                />
                <div className="relative glass-card p-6 rounded-2xl transition-all duration-300 group-hover:-translate-y-1 border border-white/60 dark:border-white/10 shadow-sm group-hover:shadow-xl">
                  <div className="flex items-start gap-4">
                    {item.logo}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {item.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
