export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  category: string;
  description: string;
  bullets: string[];
  technologies: string[];
  architecture?: {
    ui: string;
    bridge: string;
    database: string;
  };
  metrics: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score?: string;
  highlights: string[];
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
  badge: string;
}

export interface SkillItem {
  name: string;
  subtitle?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export const portfolioData = {
  personal: {
    name: "Ritesh Kumar",
    title: "Aspiring Software Developer",
    focus: "Core Java • DSA • MySQL • Backend Development",
    email: "ritesh.iitpatna@gmail.com",
    phone: "+91 7217845884",
    phoneRaw: "7217845884",
    location: "New Delhi - 110020, India",
    workPreferences: [
      "Open to Remote",
      "Open to Hybrid",
      "Open to Travel",
      "Open to On-Site",
    ],
    socialLinks: {
      github: "https://github.com/ritesh-iitpatna",
      linkedin: "https://www.linkedin.com/in/ritesh-iitpatna",
      email: "mailto:ritesh.iitpatna@gmail.com",
    },
    resumeUrl: "/Ritesh_Kumar_Resume.pdf",
    resumeFilename: "Ritesh_Kumar_Resume.pdf",
    summary:
      "Aspiring Software Developer with a strong foundation in Core Java, Data Structures & Algorithms, and MySQL. Skilled in problem-solving and backend development, with a focus on building efficient, scalable applications and continuously enhancing technical expertise.",
    highlights: [
      "Pursuing MCA in Software Engineering from IIT Patna × IIIT Ranchi",
      "Specialized in Core Java, JDBC, Object-Oriented Programming & MySQL",
      "Built ATM & Bank Transaction Simulation with 20% optimized JDBC query latency",
      "Gold Medalist & Student of the Year (ICICI Sponsored)",
    ],
  },

  skills: [
    {
      category: "Programming Languages",
      skills: [
        { name: "Java (Core & Adv)", subtitle: "OOP, Collections, Concurrency", highlight: true },
        { name: "MySQL", subtitle: "Schema & Query Optimization", highlight: true },
        { name: "Python", subtitle: "Scripting & Basics", highlight: false },
      ],
    },
    {
      category: "Core Concepts & Architecture",
      skills: [
        { name: "Data Structures & Algorithms", subtitle: "Problem Solving & Logic", highlight: true },
        { name: "OOPs Architecture", subtitle: "Encapsulation, Polymorphism, Inheritance", highlight: true },
        { name: "JDBC Connectivity", subtitle: "PreparedStatements & DB Bridge", highlight: true },
        { name: "Collections Framework", subtitle: "Lists, Sets, Maps, Queues", highlight: true },
        { name: "Exception Handling", subtitle: "Try-Catch & Custom Exceptions", highlight: false },
        { name: "Java Swing & AWT", subtitle: "Desktop Event-Driven GUI", highlight: false },
      ],
    },
    {
      category: "Developer Tools & IDEs",
      skills: [
        { name: "IntelliJ IDEA", subtitle: "Primary Enterprise IDE", highlight: true },
        { name: "Visual Studio Code", subtitle: "Code & Script Editing", highlight: true },
        { name: "MySQL Workbench", subtitle: "Relational DB Management", highlight: true },
        { name: "Git & GitHub", subtitle: "Version Control & Collaboration", highlight: true },
        { name: "Eclipse", subtitle: "Java Development Tools", highlight: false },
        { name: "Android Studio", subtitle: "Mobile Development IDE", highlight: false },
      ],
    },
    {
      category: "Currently Learning",
      skills: [
        { name: "Kotlin", subtitle: "Modern JVM & Android Language", highlight: true },
        { name: "HTML & Modern Web", subtitle: "Frontend Foundations", highlight: false },
      ],
    },
    {
      category: "Soft Skills & Mindset",
      skills: [
        { name: "Problem Solving", subtitle: "Analytical & Algorithmic", highlight: true },
        { name: "Logic Building", subtitle: "Structured Engineering Thought", highlight: true },
        { name: "Quick Learner", subtitle: "Fast Knowledge Adoption", highlight: false },
        { name: "Team Collaboration", subtitle: "Cross-functional Teamwork", highlight: false },
        { name: "Good Communication", subtitle: "Clear Technical Dialogue", highlight: false },
        { name: "Adaptive Mindset", subtitle: "Resilient in Dynamic Environments", highlight: false },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "bank-management-system",
      title: "Bank Management System (ATM Simulation)",
      subtitle: "Desktop Banking & Transaction Processing Application",
      period: "Mar 2026 – May 2026",
      category: "Desktop & Backend System",
      description:
        "A full-fledged desktop ATM simulation system engineered with Java Swing and AWT for GUI, integrated with MySQL via optimized JDBC drivers for secure transaction handling, pin verification, and account ledger management.",
      bullets: [
        "Designed an intuitive desktop GUI using Java Swing and AWT to handle multi-step user workflows including login, deposit, fast cash, pin change, and withdrawals.",
        "Integrated Java application layer with MySQL database using robust JDBC architecture for persistent record keeping and secure transaction processing.",
        "Improved transaction processing speed by 20% through optimized SQL queries, prepared statements, and targeted exception handling blocks.",
        "Engineered real-time input verification for sensitive data including Aadhaar (12-digit format), PAN (10-character alphanumeric), and positive cash balance limits.",
        "Managed source control workflow using Git and deployed the production-ready repository to GitHub.",
      ],
      technologies: [
        "Java",
        "Java Swing",
        "Java AWT",
        "MySQL",
        "JDBC",
        "OOP Principles",
        "Git",
        "GitHub",
      ],
      architecture: {
        ui: "Java Swing / AWT Event-Driven UI",
        bridge: "JDBC Driver & Connection Pooling",
        database: "MySQL Relational Schema (Transactions & Accounts)",
      },
      metrics: [
        "⚡ 20% Query Latency Reduction",
        "🔒 Strict Aadhaar/PAN Data Validation",
        "🛡️ Zero Unhandled SQL Exceptions",
      ],
      githubUrl: "https://github.com/riteshkumar999097-afk/bank-management-system",
      featured: true,
    },
    {
      id: "personal-portfolio",
      title: "Personal Developer Portfolio",
      subtitle: "Interactive Modern Portfolio & Cinematic Experience",
      period: "2026",
      category: "Fullstack Web & Frontend",
      description:
        "Built a responsive personal portfolio using Next.js, React, TypeScript, and Tailwind CSS, showcasing projects, technical skills, and academic background with cinematic animations and responsive interactions.",
      bullets: [
        "Built a responsive personal portfolio using Next.js, React, TypeScript, and Tailwind CSS, showcasing projects, technical skills, and academic background.",
        "Created an interactive cinematic intro and responsive animations using Framer Motion, with dark/light themes, glassmorphism UI, Web Audio API, and interactive browser features.",
        "Leveraged AI-assisted development tools throughout the project for implementation, debugging, UI/UX refinement, and problem-solving.",
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Web Audio API",
      ],
      architecture: {
        ui: "React 19 & Framer Motion UI Components",
        bridge: "Turbopack Bundler & Next.js App Router",
        database: "Client-side State & Edge Runtime",
      },
      metrics: [
        "🚀 100% Responsive Micro-interactions",
        "✨ 60fps GPU Acceleration",
        "📄 Interactive CV Rollout & Flight Animation",
      ],
      githubUrl: "https://github.com/ritesh-iitpatna",
      liveUrl: "https://portfolio-one-phi-bh3n1xdisv.vercel.app/",
      featured: true,
    },
  ] as Project[],

  education: [
    {
      degree: "MCA in Software Engineering",
      institution: "IIT Patna × IIIT Ranchi",
      location: "Patna, India",
      period: "Present",
      score: "In Progress",
      highlights: [
        "Specializing in Advanced Software Engineering, Data Structures, Distributed Systems, and System Design.",
        "Collaborative academic curriculum combining top engineering pedagogies of IIT Patna and IIIT Ranchi.",
      ],
    },
    {
      degree: "B.Sc. in Physical Science with Electronics",
      institution: "University of Delhi",
      location: "Delhi, India",
      period: "Graduated Aug 2025",
      score: "CGPA: 7.28 / 10",
      highlights: [
        "Developed solid fundamentals in Mathematics, Electronics, Microprocessor Architecture, and Modern Physics.",
        "Consistently maintained high academic standing (CGPA above 8.0 in 3 consecutive semesters) before focusing on software engineering.",
      ],
    },
  ] as Education[],

  awards: [
    {
      title: "Academic Excellence Award — Gold Medal & Student of the Year",
      issuer: "ICICI-Sponsored Academic Recognition",
      date: "May 2019",
      description:
        "Conferred the Gold Medal and Student of the Year Award for securing First Rank in Class XI and demonstrating outstanding academic dedication.",
      badge: "🥇 Gold Medalist",
    },
    {
      title: "School-Level Mental Mathematics Quiz – 2nd Place",
      issuer: "District Mathematics Competition",
      date: "Oct 2016",
      description:
        "Secured 2nd Position in a competitive district-level Mental Mathematics Quiz against top students across multiple participating schools.",
      badge: "🥈 2nd Place District",
    },
  ] as Award[],

  navLinks: [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Achievements", href: "#awards" },
    { name: "Contact", href: "#contact" },
  ],
};
