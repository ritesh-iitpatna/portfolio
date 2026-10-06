import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ritesh Kumar | Software Developer Portfolio",
  description:
    "Portfolio of Ritesh Kumar — Aspiring Software Developer specializing in Core Java, Data Structures & Algorithms, MySQL, and scalable Backend Systems. Pursuing MCA at IIT Patna × IIIT Ranchi.",
  keywords: [
    "Ritesh Kumar",
    "Software Developer",
    "Java Developer",
    "Backend Developer",
    "IIT Patna",
    "IIIT Ranchi",
    "Data Structures",
    "MySQL",
    "JDBC",
    "Portfolio",
  ],
  authors: [{ name: "Ritesh Kumar" }],
  openGraph: {
    title: "Ritesh Kumar | Software Developer",
    description:
      "Core Java, DSA, MySQL & Backend Engineering Portfolio. MCA student at IIT Patna × IIIT Ranchi.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=sessionStorage.getItem('rk_intro_seen_session')==='true';var p=new URLSearchParams(window.location.search);var f=p.get('intro')==='true'||p.get('intro')==='1';var k=p.get('skipIntro')==='true'||p.get('skipIntro')==='1';var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if((!s||f)&&!k&&!r){document.documentElement.classList.add('intro-active');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen flex flex-col antialiased selection:bg-emerald-500/20 selection:text-emerald-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
