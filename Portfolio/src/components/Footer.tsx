"use client";

import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { portfolioData } from "@/data/portfolio-data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-white/20 dark:border-white/10 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl text-slate-600 dark:text-slate-400 text-xs relative overflow-hidden">
      {/* Ambient Light Diffusion in Footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-16 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 blur-3xl rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Monogram */}
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs backdrop-blur-xs">
              RK
            </span>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {portfolioData.personal.name}
              </div>
              <div className="text-[11px] text-slate-500">
                Software Developer • MCA @ IIT Patna × IIIT Ranchi
              </div>
            </div>
          </div>

          {/* Socials & Center Info */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioData.personal.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs border border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:scale-110 transition-all shadow-xs"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personal.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs border border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:scale-110 transition-all shadow-xs"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="p-2 rounded-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs border border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:scale-110 transition-all shadow-xs"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top & Copyright */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} Ritesh Kumar. All rights reserved.
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md hover:bg-white/90 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-500 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
              aria-label="Back to top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
