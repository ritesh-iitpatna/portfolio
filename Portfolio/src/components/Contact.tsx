"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  ArrowUpRight,
  Briefcase,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { portfolioData } from "@/data/portfolio-data";

export function Contact() {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const fireConfetti = async (options: { particleCount: number; spread: number; origin: { y: number } }) => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti(options);
    } catch {
      // Silent fallback
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    fireConfetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const endpoint = personal.formspreeEndpoint || "https://formspree.io/f/mdekqkvb";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          _subject: formData.subject ? `[Portfolio Contact] ${formData.subject}` : `[Portfolio Contact] New message from ${formData.name}`,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        fireConfetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        const data = await response.json().catch(() => null);
        if (data && data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          const formatted = data.errors.map((err: { message?: string }) => err.message).filter(Boolean).join(", ");
          setErrorMessage(formatted || "There was an issue sending your message. Please try again.");
        } else {
          setErrorMessage("Failed to send message. Please try again or reach out directly via email.");
        }
      }
    } catch {
      setErrorMessage("Network error occurred. Please check your connection or reach out directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 relative bg-slate-50/70 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 mb-3 border border-emerald-200 dark:border-emerald-800">
            <Mail className="w-3.5 h-3.5" />
            Let&apos;s Connect
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Get In Touch
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Interested in discussing opportunities, engineering projects, or referrals? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Preferences */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Work Preferences Banner */}
            <div className="glass-card p-6 rounded-2xl space-y-3 border-l-4 border-l-emerald-500 border-white/60 dark:border-white/10 shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Briefcase className="w-4 h-4 text-emerald-500" />
                Work Preferences & Availability
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Actively seeking Software Engineering roles across multiple modes:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {personal.workPreferences.map((pref) => (
                  <span
                    key={pref}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-xs"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Email 1-Click Copy Card */}
            <div className="glass-card p-6 rounded-2xl space-y-4 border border-white/60 dark:border-white/10 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Direct Contact
              </div>

              {/* Email Button */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/40 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Email Address</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white font-mono">
                      {personal.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 transition-all cursor-pointer shadow-xs"
                  title="Copy Email to Clipboard"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <a
                href={`tel:${personal.phoneRaw}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/40 dark:border-white/10 hover:border-emerald-500/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Phone Number</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white font-mono">
                      {personal.phone}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/40 dark:border-white/10">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Location</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    {personal.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={personal.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3.5 rounded-xl glass-card flex items-center justify-between gap-3 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-500 hover:border-emerald-500/40 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div>GitHub</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-normal">@ritesh-iitpatna</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <a
                href={personal.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3.5 rounded-xl glass-card flex items-center justify-between gap-3 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-500 hover:border-emerald-500/40 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div>LinkedIn</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-normal">in/ritesh-iitpatna</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </motion.div>

          {/* Right: Interactive Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 relative group"
          >
            {/* Ambient Glow Aura */}
            <div
              aria-hidden="true"
              className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-emerald-500/20 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            />

            <div className="relative glass-card p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/60 dark:border-white/10">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out, {formData.name || "friend"}. I will get back to your email ({formData.email || personal.email}) shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setErrorMessage(null);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold bg-white/60 dark:bg-slate-800/60 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  action={personal.formspreeEndpoint || "https://formspree.io/f/mdekqkvb"}
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        disabled={isSubmitting}
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/60 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        disabled={isSubmitting}
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/60 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      disabled={isSubmitting}
                      placeholder="Role Opportunity / Collaboration / Referral"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/60 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      disabled={isSubmitting}
                      placeholder="Hi Ritesh, I came across your portfolio and would love to connect..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/60 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all resize-none shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span>{errorMessage}</span>
                        <div className="mt-1">
                          <a
                            href={`mailto:${personal.email}?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}`}
                            className="underline hover:text-rose-500 font-semibold"
                          >
                            Click here to email me directly ({personal.email})
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/45 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
