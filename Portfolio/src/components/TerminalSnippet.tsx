"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Play, Terminal, Sparkles } from "lucide-react";

export function TerminalSnippet() {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(true);

  const codeString = `public class RiteshKumar {
    public static void main(String[] args) {
        Developer ritesh = new Developer();
        ritesh.setName("Ritesh Kumar");
        ritesh.setEducation("MCA @ IIT Patna × IIIT Ranchi");
        ritesh.setLocation("New Delhi, India");
        
        // Core Specializations
        ritesh.addSkill("Core Java", "OOPs", "JDBC", "DSA");
        ritesh.addDatabase("MySQL", "Optimized Query Execution");
        
        // Status & Availability
        boolean isOpenToWork = true;
        String[] modes = {"Remote", "Hybrid", "On-Site"};
        
        ritesh.deployProject("Bank Management System");
        System.out.println("Ready to build scalable backend systems 🚀");
    }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 600);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 bg-slate-900/85 dark:bg-[#070b14]/85 backdrop-blur-xl text-slate-100 font-mono text-xs md:text-sm">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/60 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-slate-400 flex items-center gap-1.5 font-sans font-medium">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            RiteshKumar.java
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-xs transition-colors cursor-pointer"
            title="Execute Code"
          >
            <Play className={`w-3 h-3 ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Compiling..." : "Run"}</span>
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Copy Code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 md:p-5 overflow-x-auto bg-[#0a0f1d] leading-relaxed select-text">
        <pre className="text-slate-300">
          <code>
            <span className="text-purple-400">public class</span>{" "}
            <span className="text-amber-300 font-semibold">RiteshKumar</span> {"{\n"}
            {"    "}<span className="text-purple-400">public static void</span>{" "}
            <span className="text-blue-400">main</span>
            <span className="text-slate-400">(String[] args)</span> {"{\n"}
            {"        "}<span className="text-emerald-400">Developer</span> ritesh ={" "}
            <span className="text-purple-400">new</span>{" "}
            <span className="text-emerald-400">Developer</span>();{"\n"}
            {"        "}ritesh.<span className="text-blue-300">setName</span>(
            <span className="text-emerald-300">&quot;Ritesh Kumar&quot;</span>);{"\n"}
            {"        "}ritesh.<span className="text-blue-300">setEducation</span>(
            <span className="text-emerald-300">&quot;MCA @ IIT Patna × IIIT Ranchi&quot;</span>);{"\n"}
            {"        "}ritesh.<span className="text-blue-300">setLocation</span>(
            <span className="text-emerald-300">&quot;New Delhi, India&quot;</span>);{"\n"}
            {"\n"}
            {"        "}<span className="text-slate-500">{"// Core Specializations"}</span>{"\n"}
            {"        "}ritesh.<span className="text-blue-300">addSkill</span>(
            <span className="text-emerald-300">&quot;Core Java&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;OOPs&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;JDBC&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;DSA&quot;</span>);{"\n"}
            {"        "}ritesh.<span className="text-blue-300">addDatabase</span>(
            <span className="text-emerald-300">&quot;MySQL&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;Optimized Query Execution&quot;</span>);{"\n"}
            {"\n"}
            {"        "}<span className="text-slate-500">{"// Status & Availability"}</span>{"\n"}
            {"        "}<span className="text-purple-400">boolean</span> isOpenToWork ={" "}
            <span className="text-amber-400">true</span>;{"\n"}
            {"        "}<span className="text-purple-400">String</span>[] modes = {"{"}
            <span className="text-emerald-300">&quot;Remote&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;Hybrid&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;On-Site&quot;</span>{"}"};{"\n"}
            {"\n"}
            {"        "}ritesh.<span className="text-blue-300">deployProject</span>(
            <span className="text-emerald-300">&quot;Bank Management System&quot;</span>);{"\n"}
            {"        "}System.out.<span className="text-blue-300">println</span>(
            <span className="text-emerald-300">&quot;Ready to build scalable backend systems 🚀&quot;</span>);{"\n"}
            {"    "}{"}\n"}
            {"}"}
          </code>
        </pre>
      </div>

      {/* Output Console */}
      {showOutput && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-3 bg-slate-950 border-t border-slate-800 text-xs flex flex-col gap-1 font-mono"
        >
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-emerald-400">❯</span> javac RiteshKumar.java && java RiteshKumar
          </div>
          <div className="text-emerald-400 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 inline" />
            [JVM SUCCESS] Ready to build scalable backend systems 🚀
          </div>
          <div className="text-slate-400 text-[11px]">
            Status: Active candidate • Open for Software Engineering Roles
          </div>
        </motion.div>
      )}
    </div>
  );
}
