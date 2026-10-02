"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Trophy,
  CheckCircle2,
  Medal,
} from "lucide-react";
import { JointIITIIITLogo, DelhiUniversityLogo, ICICIAwardLogo } from "./Icons";
import { portfolioData } from "@/data/portfolio-data";

export function Timeline() {
  const { education, awards } = portfolioData;

  const getInstitutionLogo = (name: string) => {
    if (name.includes("IIT Patna")) {
      return <JointIITIIITLogo className="shrink-0" />;
    }
    if (name.includes("Delhi")) {
      return <DelhiUniversityLogo className="w-12 h-12 shrink-0" />;
    }
    return (
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
        <GraduationCap className="w-6 h-6" />
      </div>
    );
  };

  return (
    <section id="education" className="scroll-mt-24 py-20 relative bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 mb-3 border border-emerald-200 dark:border-emerald-800">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Foundation &amp; Honors
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Education &amp; Achievements
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Formal degrees from premier institutions, academic excellence awards, and competitive recognitions.
          </p>
        </div>

        {/* 2-Column Grid: Education vs Awards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Column 1: Education */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card p-6 sm:p-7 rounded-2xl relative border-l-4 border-l-emerald-500 border-white/60 dark:border-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      {getInstitutionLogo(edu.institution)}
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                          {edu.degree}
                        </h4>
                        <div className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          {edu.institution}
                        </div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-white/60 dark:bg-slate-800/60 backdrop-blur-xs text-slate-700 dark:text-slate-300 border border-white/40 dark:border-white/10 shrink-0">
                      <Calendar className="w-3 h-3 text-emerald-500" />
                      {edu.period}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 pl-0 sm:pl-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      {edu.location}
                    </span>
                    {edu.score && (
                      <>
                        <span className="text-slate-400">•</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                          {edu.score}
                        </span>
                      </>
                    )}
                  </div>

                  <ul className="space-y-2 pl-0 sm:pl-2">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Awards & Honors */}
          <div id="awards" className="scroll-mt-24 lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Honors &amp; Achievements
              </h3>
            </div>

            <div className="space-y-6">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl relative border border-white/60 dark:border-white/10 transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      {award.issuer.includes("ICICI") && (
                        <ICICIAwardLogo className="w-9 h-7 text-[10px]" />
                      )}
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        {award.badge}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {award.date}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1 mb-1">
                    {award.title}
                  </h4>

                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                    {award.issuer}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {award.description}
                  </p>
                </motion.div>
              ))}

              {/* Extra Soft Skills / Value Card */}
              <div className="p-5 rounded-2xl glass-card backdrop-blur-xl border border-emerald-500/30 shadow-xs">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-2">
                  <Medal className="w-4 h-4 text-emerald-500" />
                  Engineering Values
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Continuous learner driven by curiosity, mathematical logic, and disciplined software craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
