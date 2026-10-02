"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-full border border-white/50 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-400 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
      aria-label="Toggle Theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-emerald-400" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
