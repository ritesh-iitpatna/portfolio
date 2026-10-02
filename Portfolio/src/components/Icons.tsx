import React from "react";
import Image from "next/image";

export function IITPatnaLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative p-1 rounded-2xl bg-white border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center shrink-0 overflow-hidden ${className}`}>
      <Image
        src="/images/iit-patna-logo.png"
        alt="IIT Patna Logo"
        width={64}
        height={64}
        className="object-contain w-full h-full"
      />
    </div>
  );
}

export function IIITRanchiLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative p-1 rounded-2xl bg-white border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center shrink-0 overflow-hidden ${className}`}>
      <Image
        src="/images/iiit-ranchi-logo.png"
        alt="IIIT Ranchi Logo"
        width={64}
        height={64}
        className="object-contain w-full h-full"
      />
    </div>
  );
}

export function JointIITIIITLogo({ className = "h-12" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 shrink-0 ${className}`}>
      <div className="relative w-11 h-11 p-1 rounded-xl bg-white border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center overflow-hidden hover:scale-105 transition-transform" title="IIT Patna">
        <Image
          src="/images/iit-patna-logo.png"
          alt="IIT Patna"
          width={44}
          height={44}
          className="object-contain w-full h-full"
        />
      </div>
      <span className="text-slate-400 font-bold text-xs">×</span>
      <div className="relative w-11 h-11 p-1 rounded-xl bg-white border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center overflow-hidden hover:scale-105 transition-transform" title="IIIT Ranchi">
        <Image
          src="/images/iiit-ranchi-logo.png"
          alt="IIIT Ranchi"
          width={44}
          height={44}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}

export function DelhiUniversityLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative p-1 rounded-2xl bg-white border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center shrink-0 overflow-hidden hover:scale-105 transition-transform ${className}`}>
      <Image
        src="/images/delhi-university-logo.png"
        alt="University of Delhi Logo"
        width={64}
        height={64}
        className="object-contain w-full h-full"
      />
    </div>
  );
}

export function ICICIAwardLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm font-bold text-xs p-1.5 ${className}`}>
      <span>ICICI</span>
    </div>
  );
}

// ==========================================
// OFFICIAL MULTI-COLOR BRAND LOGOS (DEVICON)
// ==========================================

export function JavaIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/java-logo.png"
        alt="Java Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function MySQLIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" role="img">
      <path fill="#00758F" d="M38.1 27.2c-.3-.2-.7-.4-1.1-.4-.5 0-1 .2-1.3.6-.7.7-.7 1.8 0 2.5.3.3.8.5 1.3.5.4 0 .8-.1 1.1-.3.7-.4.9-1.3.5-2-.1-.4-.4-.7-.5-.9zm-20.2 0c-.3-.2-.7-.4-1.1-.4-.5 0-1 .2-1.3.6-.7.7-.7 1.8 0 2.5.3.3.8.5 1.3.5.4 0 .8-.1 1.1-.3.7-.4.9-1.3.5-2-.1-.4-.4-.7-.5-.9z"/>
      <path fill="#F29111" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm14 26.5c-1 1.8-2.5 3.3-4.3 4.4-1.8 1.1-3.9 1.7-6 1.7h-7.5c-2.1 0-4.2-.6-6-1.7-1.8-1.1-3.3-2.6-4.3-4.4-1-1.8-1.6-3.8-1.6-5.9 0-2.9 1-5.6 2.9-7.8 1.8-2.2 4.4-3.5 7.3-3.8V12c0-1 .4-1.9 1.1-2.6C20.3 8.7 21.2 8.3 22.2 8.3c1 0 1.9.4 2.6 1.1.7.7 1.1 1.6 1.1 2.6v.6c2.8.3 5.5 1.7 7.3 3.8 1.8 2.2 2.9 4.9 2.9 7.8 0 2.1-.6 4.1-2.1 6.3z"/>
    </svg>
  );
}

export function PythonIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 110" role="img">
      <path
        fill="#3776AB"
        d="M54.3 0C26.5 0 28.2 12.1 28.2 12.1l.03 12.5h26.5v3.8H17.4S0 26.4 0 54.3c0 27.9 15.3 26.9 15.3 26.9h9.1v-12.7s-.5-15.3 15-15.3h25.8v-3.9H39.3s-15.1.5-15.1-14.7c0-15.2 13.2-14.8 13.2-14.8h32s14.4-.3 14.4 14.8v9.5h-7.7V28.4H54.3zm-9.3 8a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8z"
      />
      <path
        fill="#FFD438"
        d="M55.7 110c27.8 0 26.1-12.1 26.1-12.1l-.03-12.5H55.3v-3.8h37.3s17.4 2 17.4-25.9c0-27.9-15.3-26.9-15.3-26.9h-9.1v12.7s.5 15.3-15 15.3H44.8v3.9h25.9s15.1-.5 15.1 14.7c0 15.2-13.2 14.8-13.2 14.8h-32s-14.4.3-14.4-14.8v-9.5h7.7v5.7h26.8zm9.3-8a4.4 4.4 0 1 1 0-8.8 4.4 4.4 0 0 1 0 8.8z"
      />
    </svg>
  );
}

export function KotlinIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img">
      <defs>
        <linearGradient id="kotlinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7F52FF" />
          <stop offset="50%" stopColor="#C711E1" />
          <stop offset="100%" stopColor="#E44857" />
        </linearGradient>
      </defs>
      <path fill="url(#kotlinGrad)" d="M24 24H0V0h24L12 12z" />
    </svg>
  );
}

export function HtmlIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" role="img">
      <path fill="#E44D26" d="M71 460L30 0h452l-41 460-185 52z" />
      <path fill="#F16529" d="M256 472l149-41 35-391H256v432z" />
      <path fill="#EBEBEB" d="M109 97h147v64H115zm11 128h136v64H180l6 64 70 19v67l-123-34z" />
      <path fill="#FFF" d="M256 97h147l-6 64H256zm0 128h136l-14 156-122 34v-67l70-19 8-84H256z" />
    </svg>
  );
}

export function VSCodeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img">
      <path fill="#0065A9" d="M17.2 24l5.3-2.6c.9-.4 1.5-1.3 1.5-2.3V4.9c0-1-.6-1.9-1.5-2.3L17.2 0l-7.7 7.2L4.3 3.2c-.7-.5-1.7-.4-2.3.2L.4 4.8c-.5.5-.5 1.4 0 1.9l4.5 4.1L.4 15c-.5.5-.5 1.4 0 1.9l1.6 1.4c.6.6 1.6.7 2.3.2l5.2-4 7.7 9.5z" />
      <path fill="#007ACC" d="M18.8 3.5L8.5 12l10.3 8.5c.8.7 2 .1 2-1V4.5c0-1.1-1.2-1.7-2-1z" />
      <path fill="#1F8AD2" d="M23.1 2.6L18.2.2c-1-.5-2.2.2-2.2 1.3v21c0 1.1 1.2 1.8 2.2 1.3l4.9-2.4c.6-.3.9-.9.9-1.5V4.1c0-.6-.3-1.2-.9-1.5z" />
    </svg>
  );
}

export function IntelliJIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" role="img">
      <defs>
        <linearGradient id="ijGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FE315D" />
          <stop offset="100%" stopColor="#FF318C" />
        </linearGradient>
        <linearGradient id="ijGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#087CFA" />
          <stop offset="100%" stopColor="#21D789" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="6" fill="#000" />
      <path fill="url(#ijGrad1)" d="M4 4h11v11H4z" />
      <path fill="url(#ijGrad2)" d="M17 17h11v11H17z" />
      <rect x="7" y="22" width="10" height="2" fill="#FFF" />
      <text x="6" y="16" fill="#FFF" fontSize="9" fontFamily="monospace" fontWeight="bold">IJ</text>
    </svg>
  );
}

export function EclipseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img">
      <circle cx="12" cy="12" r="10" fill="#2C2255" />
      <circle cx="15" cy="9" r="6" fill="#F7941E" opacity="0.85" />
      <circle cx="9" cy="15" r="4" fill="#FFF" opacity="0.2" />
    </svg>
  );
}

export function AndroidStudioIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img">
      <path
        fill="#3DDC84"
        d="M17.5 15.3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1m-11 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1m11.4-6l2-3.5a.4.4 0 0 0-.2-.6.4.4 0 0 0-.5.2l-2 3.5C15.6 8.2 13.9 7.9 12 7.9s-3.6.3-5.1 1.1L4.8 5.4a.4.4 0 0 0-.6-.2.4.4 0 0 0-.1.6l2 3.5C2.7 11.2.3 14.7 0 18.8h24c-.3-4.1-2.7-7.6-6.1-9.5"
      />
    </svg>
  );
}

export function GitIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img">
      <path
        fill="#F05032"
        d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.124 0L8.831 2.564l3.125 3.125a2.25 2.25 0 0 1 2.825 2.84l3.011 3.012a2.25 2.25 0 1 1-1.065 1.065l-2.82-2.82a2.25 2.25 0 0 1-2.826-.375L8.01 12.48a2.25 2.25 0 1 1-1.06-1.06l3.072-3.073a2.25 2.25 0 0 1 .374-2.826L7.271 2.4l-6.82 6.82a1.5 1.5 0 0 0 0 2.125l10.479 10.478a1.5 1.5 0 0 0 2.124 0l10.492-10.493a1.5 1.5 0 0 0 0-2.125z"
      />
    </svg>
  );
}

export function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="#0A66C2" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}
