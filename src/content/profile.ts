type Experience = {
  id: string;
  company: string;
  title: string;
  start: { value: string; label: string };
  end: { value: string; label: string } | null;
  summary?: string;
  arrangement?: string;
  location?: string;
  responsibilities: string[];
  resumeDetails?: string[];
};

type Project = {
  id: string;
  title: string;
  category: string;
  period?: string;
  summary: string;
  technologies: string[];
  details: string[];
  problem?: string;
  note?: string;
  collaboration?: string;
  links: { label: string; href: string }[];
};

type SocialLink = {
  label: string;
  href: string;
  description: string;
  featured: boolean;
  resume?: boolean;
  icon: "github" | "linkedin" | "x" | "instagram" | "leetcode" | "codechef" | "hackerrank" | "substack" | "medium";
};

const currentResponsibilities = [
  "Developed a Go-based PostgreSQL high-availability service for Windows and Linux virtual machines.",
  "Built an agent for automated failover and failback using Raft consensus to coordinate active-standby PostgreSQL clusters.",
  "Configured NGINX on Windows and HAProxy on Linux for server-side load balancing.",
  "Integrated PgBouncer for PostgreSQL connection pooling.",
  "Worked with engineering teams on high-availability and disaster-recovery design and validation.",
  "Developed a Go Windows service that collected system and application metadata and communicated with a Spring Boot backend through Windows Named Pipes.",
  "Implemented IPC connection lifecycle management, buffered reads and writes, structured error handling, and retries.",
];

export const currentRole: Experience = {
  id: "flexera",
  company: "Flexera",
  title: "Associate Software Engineer",
  start: { value: "2025-08", label: "Aug 2025" },
  end: null,
  summary:
    "Backend services and database high-availability tooling in Go and Java, including cross-platform communication and disaster recovery.",
  arrangement: "Hybrid",
  location: "Bengaluru, India",
  responsibilities: currentResponsibilities,
  resumeDetails: currentResponsibilities,
};

export const profile = {
  name: "Sonupatel A L",
  email: "19358sonupatel@gmail.com",
  location: "Bengaluru, India",
  introduction:
    `I'm an ${currentRole.title.toLowerCase()} at ${currentRole.company} in Bengaluru. I work on backend services, PostgreSQL high availability and microservices with Go and Java.`,
  education: {
    institution: "PES University",
    degree: "B.Tech in Computer Science",
    gpa: "7.92 / 10",
    coursework: [
      "Data structures and algorithms",
      "Operating systems",
      "Computer networks",
      "Database management systems",
      "Software engineering",
    ],
  },
};

type Education = {
  id: string;
  institution: string;
  qualification: string;
  start: { value: string; label: string };
  end: { value: string; label: string };
  details: string[];
  coursework?: string[];
};

export const educationHistory: Education[] = [
  {
    id: "pes-university",
    institution: profile.education.institution,
    qualification: profile.education.degree,
    start: { value: "2021-12", label: "Dec 2021" },
    end: { value: "2025-05", label: "May 2025" },
    details: [`Cumulative GPA: ${profile.education.gpa}`],
    coursework: profile.education.coursework,
  },
  {
    id: "jnanasudha-pu-college",
    institution: "Jnanasudha PU College",
    qualification: "Pre-university, Science (Classes XI and XII)",
    start: { value: "2019-06", label: "Jun 2019" },
    end: { value: "2021-07", label: "Jul 2021" },
    details: [
      "Board examination: 98.5%",
      "JEE Main: 97.36 percentile",
      "CET Engineering rank: 501",
    ],
  },
  {
    id: "aradhana-school",
    institution: "Aradhana School",
    qualification: "CBSE, Class X",
    start: { value: "2018-06", label: "Jun 2018" },
    end: { value: "2019-03", label: "Mar 2019" },
    details: ["Board examination: 95.4%"],
  },
];

export const resume = {
  fileName: "Sonupatel-AL-Resume.pdf",
  href: "/Sonupatel-AL-Resume.pdf",
  sha256: "065840b4e549b15d8320ffd3b842c2edbd2391b20979a36fb2733565b3a49109",
  phone: "+91 8861220135",
  phoneHref: "tel:+918861220135",
  downloadLabel: "Download PDF",
};

export const experience: Experience[] = [
  currentRole,
  {
    id: "ribbon",
    company: "Ribbon Communications",
    title: "Software Developer Intern",
    start: { value: "2025-04", label: "Apr 2025" },
    end: { value: "2025-07", label: "Jul 2025" },
    summary: "Worked on cloud redundancy for communications software.",
    arrangement: "On-site",
    location: "Bengaluru, India",
    responsibilities: [
      "Contributed to geographically redundant systems on AWS cloud infrastructure, with a focus on availability and fault tolerance.",
    ],
  },
  {
    id: "hal",
    company: "Hindustan Aeronautics Limited",
    title: "Summer Intern",
    start: { value: "2024-06", label: "Jun 2024" },
    end: { value: "2024-07", label: "Jul 2024" },
    arrangement: "On-site",
    location: "Bengaluru, India",
    responsibilities: ["Worked on real-time operating systems (RTOS)."],
  },
];

type JournalMilestone = {
  id: string;
  title: string;
  date: { value: string; label: string };
  details: string[];
  href?: string;
};

export const journalMilestones: JournalMilestone[] = [
  ...educationHistory.flatMap((education): JournalMilestone[] => {
    const completion: JournalMilestone = {
      id: `completed-${education.id}`,
      title: education.id === "aradhana-school"
        ? "Passed Class X (CBSE)"
        : education.id === "jnanasudha-pu-college"
          ? "Passed Class XII"
          : `Completed ${education.qualification}`,
      date: education.end,
      details: [education.institution, ...education.details],
      href: `/about/#${education.id}`,
    };
    return education.id === "pes-university"
      ? [{
        id: "joined-pes-university",
        title: `Joined ${education.institution}`,
        date: education.start,
        details: [education.qualification],
        href: `/about/#${education.id}`,
      }, completion]
      : [completion];
  }),
  ...experience.flatMap((role): JournalMilestone[] => {
    const milestones: JournalMilestone[] = [{
      id: `joined-${role.id}`,
      title: role.id === currentRole.id ? `Joined ${role.company}` : `Started ${role.company} internship`,
      date: role.start,
      details: [role.title],
      href: `/about/#experience-${role.id}`,
    }];
    if (role.end) {
      milestones.push({
        id: `completed-${role.id}`,
        title: `Completed ${role.company} internship`,
        date: role.end,
        details: [role.title],
        href: `/about/#experience-${role.id}`,
      });
    }
    return milestones;
  }),
  {
    id: "inter-department-kabaddi",
    title: "Won inter-department kabaddi",
    date: { value: "2024-04", label: "Apr 2024" },
    details: [],
  },
  {
    id: "flexera-rookie-of-the-year",
    title: "Flexera Rookie of the Year",
    date: { value: "2026-08", label: "Aug 2026" },
    details: [],
  },
].sort((a, b) => b.date.value.localeCompare(a.date.value));

export const projects: Project[] = [
  {
    id: "linkedin-profile-analyzer",
    title: "LinkedIn profile scraper and analyzer",
    category: "Data tooling",
    period: "Sep to Oct 2025",
    summary: "A Streamlit application for profile lookups, CSV batch processing, caching, and AI-assisted summaries.",
    problem: "Bring individual and bulk profile lookups into one interface with structured, reviewable results.",
    technologies: ["Python", "Streamlit", "StaffSpy", "CSV processing"],
    details: [
      "Supports searches by name and filters, direct profile URLs, and CSV uploads.",
      "Separates single-profile, bulk-processing, scraping, and summarization services.",
      "Caches profile data using a configurable freshness window to avoid repeated fetching.",
      "Displays profile skills, experience, certifications, and generated summaries in Streamlit.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Sonupatel15/Linkedin-Profile-Scrapper",
      },
    ],
  },
  {
    id: "metro-ticketing",
    title: "Metro ticketing system",
    category: "Microservices",
    period: "Jan to Mar 2025",
    summary:
      "Java services for metro journeys, fares and payments, with event-driven processing.",
    technologies: ["Java", "Spring Boot", "Kafka", "Redis", "Docker Compose"],
    details: [
      "Worked on payment processing, peak-hour fares and penalty handling.",
      "Used Kafka for event-driven transaction processing and Redis for caching.",
      "Containerized the services and used Docker Compose for local setup.",
    ],
    collaboration: "Team project",
    links: [
      {
        label: "Payment service",
        href: "https://github.com/Sonupatel15/payment-service",
      },
      {
        label: "Metro service",
        href: "https://github.com/Sonupatel15/metro-service",
      },
    ],
  },
  {
    id: "distributed-task-management",
    title: "Distributed task management",
    category: "Distributed systems",
    period: "Feb to Apr 2024",
    summary:
      "A task management application using Raft consensus and a MySQL data store.",
    technologies: ["Raft", "MySQL", "Distributed systems"],
    details: [
      "Built task create, read, update and delete operations.",
      "Used Raft consensus to coordinate task state across multiple nodes.",
      "Stored and retrieved task data with MySQL.",
    ],
    links: [],
  },
  {
    id: "departmental-store",
    title: "Departmental store API",
    category: "REST API",
    period: "Sep to Nov 2023",
    summary:
      "An API for store user accounts, with registration, authentication and PostgreSQL storage.",
    technologies: ["Node.js", "Express", "PostgreSQL"],
    details: [
      "Built RESTful endpoints to manage user data.",
      "Implemented user registration and authentication flows.",
      "Used PostgreSQL for application data and worked on database queries.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Sonupatel15/departmental_store",
      },
    ],
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["Go", "Rust", "Java", "C++", "Python", "TypeScript", "JavaScript"],
  },
  {
    category: "Backend and web",
    items: ["Gin", "Spring Boot", "Node.js", "Express", "React", "Kafka"],
  },
  {
    category: "Databases and caching",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    category: "Infrastructure and tools",
    items: ["Docker", "AWS", "Kubernetes"],
  },
  {
    category: "CI/CD",
    items: ["GitHub Actions"],
  },
  {
    category: "Data and machine learning",
    items: ["Spark", "TensorFlow", "PyTorch", "scikit-learn"],
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Substack",
    icon: "substack",
    href: "https://sonupatelal.substack.com/",
    description: "Articles and newsletter",
    featured: false,
    resume: false,
  },
  {
    label: "Medium",
    icon: "medium",
    href: "https://medium.com/@sonupatelal",
    description: "Writing profile",
    featured: false,
    resume: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/Sonupatel15",
    description: "Source code and repositories",
    featured: true,
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sonupatel-a-l/",
    description: "Professional profile",
    featured: true,
    icon: "linkedin",
  },
  {
    label: "X (Twitter)",
    icon: "x",
    href: "https://x.com/sonupatel_a_l",
    description: "@sonupatel_a_l",
    featured: false,
  },
  {
    label: "Instagram",
    icon: "instagram",
    href: "https://www.instagram.com/sonupatel_a_l/",
    description: "@sonupatel_a_l",
    featured: false,
    resume: false,
  },
  {
    label: "LeetCode",
    icon: "leetcode",
    href: "https://leetcode.com/u/Sonupatel15/",
    description: "Coding practice",
    featured: false,
  },
  {
    label: "CodeChef",
    icon: "codechef",
    href: "https://www.codechef.com/users/sonupatel15",
    description: "Programming contests and practice",
    featured: false,
  },
  {
    label: "HackerRank",
    icon: "hackerrank",
    href: "https://www.hackerrank.com/profile/19358sonupatel",
    description: "Skills and coding profile",
    featured: false,
  },
];

export const featuredSocialLinks = socialLinks.filter((link) => link.featured);
export const footerSocialLinks = socialLinks.filter(
  (link) => ["github", "linkedin", "x"].includes(link.icon),
);
export const resumeSocialLinks = socialLinks.filter((link) => link.resume !== false);
export const publishingLinks = socialLinks.filter(
  (link) => ["substack", "medium", "x"].includes(link.icon),
);
