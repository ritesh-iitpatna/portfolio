"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Mail,
  ArrowUpRight,
  ArrowRight,
  RotateCcw,
  User,
  Cpu,
  FolderGit2,
  GraduationCap,
  Trophy,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { portfolioData } from "@/data/portfolio-data";

interface NavbarProps {
  onReplayIntro?: () => void;
}

// Icon dictionary for navigation sections
const navIcons: Record<string, React.ElementType> = {
  About: User,
  Skills: Cpu,
  Projects: FolderGit2,
  Education: GraduationCap,
  Achievements: Trophy,
  Contact: Mail,
};

export function Navbar({ onReplayIntro }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Programmatic scroll-lock to prevent smooth scrolling from triggering intermediate highlights
  const isManualScroll = useRef(false);
  const manualScrollTimer = useRef<NodeJS.Timeout | null>(null);

  // Scroll detection & active section spy (Throttled for mobile performance)
  useEffect(() => {
    let ticking = false;
    let lastSpyTime = 0;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        const nextScrolled = window.scrollY > 20;
        setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));

        // Don't override activeSection if user just clicked a nav link
        if (isManualScroll.current) return;

        const now = Date.now();
        // Throttle expensive getBoundingClientRect calculations to once per 120ms
        if (now - lastSpyTime < 120) return;
        lastSpyTime = now;

        // 1. Top of page (Hero section)
        if (window.scrollY < 120) {
          setActiveSection((prev) => (prev !== "" ? "" : prev));
          return;
        }

        // 2. Reached bottom of page (Contact section)
        const scrollBottom = window.innerHeight + window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        if (scrollBottom >= pageHeight - 70) {
          setActiveSection((prev) => (prev !== "#contact" ? "#contact" : prev));
          return;
        }

        // 3. Section detection based on scroll position
        const isDesktop = window.innerWidth >= 1024;
        const sectionList = [
          { id: "about", href: "#about" },
          { id: "skills", href: "#skills" },
          { id: "projects", href: "#projects" },
          { id: "education", href: "#education" },
          { id: "awards", href: "#awards" },
          { id: "contact", href: "#contact" },
        ];

        const threshold = 180;

        if (isDesktop) {
          const eduEl = document.getElementById("education");
          if (eduEl) {
            const eduRect = eduEl.getBoundingClientRect();
            if (eduRect.top <= threshold && eduRect.bottom > threshold) {
              setActiveSection((prev) =>
                prev === "#awards" ? "#awards" : "#education"
              );
              return;
            }
          }
        }

        let targetSection = "";
        for (const item of sectionList) {
          const el = document.getElementById(item.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= threshold && rect.bottom > threshold) {
              targetSection = item.href;
              break;
            }
          }
        }

        if (!targetSection) {
          let minDistance = Infinity;
          for (const item of sectionList) {
            const el = document.getElementById(item.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= threshold && rect.bottom > 0) {
                const distance = threshold - rect.top;
                if (distance < minDistance) {
                  minDistance = distance;
                  targetSection = item.href;
                }
              }
            }
          }
        }

        if (targetSection) {
          setActiveSection((prev) => (prev !== targetSection ? targetSection : prev));
        }
      });
    };

    const handleUserInteraction = () => {
      // User interacted manually (wheel, touch), release programmatic lock
      if (isManualScroll.current) {
        isManualScroll.current = false;
        if (manualScrollTimer.current) {
          clearTimeout(manualScrollTimer.current);
          manualScrollTimer.current = null;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });

    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      if (manualScrollTimer.current) {
        clearTimeout(manualScrollTimer.current);
      }
    };
  }, []);

  // Bulletproof navigation handler for both mobile touch and desktop
  const handleNavigation = useCallback(
    (e: React.MouseEvent<HTMLElement>, href: string) => {
      if (e) {
        e.preventDefault();
      }

      // Immediately set active section on click
      if (href === "#" || href === "" || href === "#hero") {
        setActiveSection("");
      } else if (href.startsWith("#")) {
        setActiveSection(href);
      }

      // Lock scroll spy during smooth scroll transition
      isManualScroll.current = true;
      if (manualScrollTimer.current) {
        clearTimeout(manualScrollTimer.current);
      }
      manualScrollTimer.current = setTimeout(() => {
        isManualScroll.current = false;
      }, 850);

      // Close mobile drawer immediately
      setMobileMenuOpen(false);

      const scrollToTarget = () => {
        if (href === "#" || href === "" || href === "#hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        if (href.startsWith("#")) {
          const targetId = href.replace("#", "");
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            // Native scrollIntoView respecting scroll-margin-top (scroll-mt-24)
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      };

      // 1. Immediate scroll invocation
      scrollToTarget();

      // 2. Delayed fallback runs as drawer collapse unmounts, preventing mobile browser animation aborts
      setTimeout(scrollToTarget, 100);
      setTimeout(scrollToTarget, 260);
    },
    []
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-white/70 dark:bg-[#090d16]/75 backdrop-blur-xl md:backdrop-blur-2xl backdrop-saturate-180 border-b border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* YouTube-Style Ambient Glow Diffusion */}
      <div
        aria-hidden="true"
        className={`ambient-glow-header transition-opacity duration-500 pointer-events-none ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Luminous Specular Light Streak along the bottom border */}
      <div
        aria-hidden="true"
        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 dark:via-emerald-400/40 to-transparent transition-opacity duration-500 pointer-events-none ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Monogram */}
          <button
            type="button"
            onClick={(e) => handleNavigation(e, "#hero")}
            className="flex items-center gap-2 font-mono text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white group cursor-pointer touch-manipulation focus:outline-none"
          >
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 group-hover:border-emerald-500/50 backdrop-blur-sm transition-all font-bold">
              RK
            </span>
            <span>
              Ritesh<span className="text-emerald-500 font-extrabold">.dev</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {portfolioData.navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={(e) => handleNavigation(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer touch-manipulation focus:outline-none ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-lg bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30 dark:border-emerald-500/25 backdrop-blur-md shadow-xs shadow-emerald-500/10 pointer-events-none"
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Theme Toggle (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                title="Replay Cinematic Intro"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 bg-slate-100/70 dark:bg-slate-900/60 backdrop-blur-md hover:bg-slate-200/70 dark:hover:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800/80 transition-all cursor-pointer group shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300 text-emerald-500" />
                <span className="hidden lg:inline">Intro</span>
              </button>
            )}

            <a
              href={portfolioData.personal.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all hover:scale-110 cursor-pointer"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href={portfolioData.personal.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all hover:scale-110 cursor-pointer"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>

            <ThemeToggle />

            <button
              type="button"
              onClick={(e) => handleNavigation(e, "#contact")}
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-md shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer touch-manipulation group"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            {onReplayIntro && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                title="Replay Intro"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-500 rounded-lg hover:bg-slate-100/70 dark:hover:bg-slate-800/60 backdrop-blur-sm transition-all cursor-pointer active:scale-95 touch-manipulation"
              >
                <RotateCcw className="w-4 h-4 text-emerald-500" />
              </button>
            )}
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 backdrop-blur-sm transition-colors cursor-pointer active:scale-95 touch-manipulation focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-emerald-500 animate-in fade-in" />
              ) : (
                <Menu className="w-6 h-6 animate-in fade-in" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden border-b border-white/20 dark:border-white/10 bg-white/80 dark:bg-[#090d16]/85 backdrop-blur-2xl backdrop-saturate-180 px-4 pt-2 pb-6 space-y-4 shadow-2xl overflow-hidden"
          >
            {/* Navigation Section Buttons */}
            <div className="flex flex-col space-y-1.5 pt-1">
              {portfolioData.navLinks.map((link, idx) => {
                const Icon = navIcons[link.name] || ArrowRight;
                const isActive = activeSection === link.href;

                return (
                  <motion.button
                    key={link.name}
                    type="button"
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.035 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleNavigation(e, link.href)}
                    className={`w-full group px-3.5 py-3 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer touch-manipulation text-left backdrop-blur-md ${
                      isActive
                        ? "bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs"
                        : "bg-white/60 dark:bg-slate-900/60 hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-white/40 dark:border-slate-800/80 hover:border-emerald-500/30 shadow-xs"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-105 ${
                          isActive
                            ? "bg-emerald-500 text-slate-950 font-bold shadow-xs"
                            : "bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-xs"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="font-semibold text-sm tracking-wide group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {link.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Bar: Social Icons & Hire Me CTA */}
            <div className="pt-3 border-t border-white/20 dark:border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <a
                  href={portfolioData.personal.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-900/70 backdrop-blur-md border border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:scale-110 active:scale-95 transition-all cursor-pointer touch-manipulation shadow-xs"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4.5 h-4.5" />
                </a>
                <a
                  href={portfolioData.personal.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-900/70 backdrop-blur-md border border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:scale-110 active:scale-95 transition-all cursor-pointer touch-manipulation shadow-xs"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4.5 h-4.5" />
                </a>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-900/70 backdrop-blur-md border border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:scale-110 active:scale-95 transition-all cursor-pointer touch-manipulation shadow-xs"
                  aria-label="Email"
                >
                  <Mail className="w-4.5 h-4.5" />
                </a>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={(e) => handleNavigation(e, "#contact")}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-md shadow-emerald-500/25 transition-all cursor-pointer touch-manipulation group"
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
