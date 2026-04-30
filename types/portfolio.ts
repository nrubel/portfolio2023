// ─── Profile ───────────────────────────────────────────────────────────────

export interface ProfileStats {
  yearsOfExperience: number;
  projectsDelivered: number;
  technologiesMastered: number;
  companiesServed: number;
}

export interface Profile {
  name: string;
  headline: string;
  taglines: string[];
  location: string;
  email: string;
  phone: string;
  website: string;
  avatar: string;
  resume: string;
  summary: string;
  about: string;
  stats: ProfileStats;
  availability: "open_to_opportunities" | "not_looking" | "freelance_only";
  preferredRoles: string[];
  twitter: string;
  googleSiteVerification: string;
}

// ─── Experience ────────────────────────────────────────────────────────────

export interface Position {
  title: string;
  startDate: string; // YYYY-MM
  endDate: string | null;
  isCurrent: boolean;
  isRemote: boolean;
  location: string;
  employmentType: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Experience {
  id: string;
  company: string;
  companyUrl: string;
  logo: string;
  industry: string;
  positions: Position[];
}

// ─── Education ─────────────────────────────────────────────────────────────

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null;
  grade: string;
  logo: string;
  description: string;
  activities: string[];
}

// ─── Projects ──────────────────────────────────────────────────────────────

export type ProjectStatus =
  | "production"
  | "archived"
  | "in_progress"
  | "concept";
export type ProjectCategory =
  | "Enterprise Web App"
  | "Web Platform"
  | "Marketing Website"
  | "Mobile Application"
  | "Open Source"
  | "Side Project";

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  featured: boolean;
  status: ProjectStatus;
  thumbnail: string;
  liveUrl: string;
  githubUrl: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  techStack: string[];
}

// ─── Skills ────────────────────────────────────────────────────────────────

export interface Skill {
  name: string;
  proficiency: number; // 0–100
  years: number;
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: "cyan" | "blue" | "violet" | "emerald" | "orange" | "pink";
  skills: Skill[];
}

// ─── Recommendations ───────────────────────────────────────────────────────

export interface Recommendation {
  id: string;
  author: string;
  authorTitle: string;
  authorAvatar: string;
  relationship: string;
  date: string;
  text: string;
  linkedinUrl: string;
}

// ─── Certifications ────────────────────────────────────────────────────────

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string;
  credentialUrl: string;
  logo: string;
  description: string;
}

// ─── Socials ───────────────────────────────────────────────────────────────

export interface Social {
  platform: string;
  handle: string;
  url: string;
  icon: string;
  primary: boolean;
}

// ─── Blog ──────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  readingTime: string;
  content: string;
}

// ─── Terminal Commands ─────────────────────────────────────────────────────

export interface TerminalCommand {
  command: string;
  description: string;
  handler: (args: string[]) => string | string[];
}

// ─── Chat ──────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: Date;
}
