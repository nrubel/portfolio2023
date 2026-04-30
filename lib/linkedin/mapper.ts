/**
 * LinkedIn Data Mapper
 *
 * Converts raw parsed LinkedIn CSV data into the normalized portfolio
 * JSON schema used throughout the application.
 *
 * Run after parser.ts: npx ts-node lib/linkedin/mapper.ts
 */

import type { SkillCategory } from "@/types/portfolio";

// Skill categorization map — extend as needed
const SKILL_CATEGORY_MAP: Record<string, string> = {
  // Frontend
  React: "Frontend",
  "React.js": "Frontend",
  TypeScript: "Frontend",
  JavaScript: "Frontend",
  "Next.js": "Frontend",
  "Remix.run": "Frontend",
  HTML5: "Frontend",
  CSS3: "Frontend",
  TailwindCSS: "Frontend",
  Redux: "Frontend",
  "Framer Motion": "Frontend",
  jQuery: "Frontend",

  // Backend
  "Node.js": "Backend",
  "Express.js": "Backend",
  NestJS: "Backend",
  "REST API": "Backend",
  GraphQL: "Backend",
  "Socket.io": "Backend",

  // Database
  MongoDB: "Database",
  PostgreSQL: "Database",
  Prisma: "Database",
  TypeORM: "Database",
  Firebase: "Database",
  MySQL: "Database",
  SQLite: "Database",
  Supabase: "Database",

  // Mobile
  Flutter: "Mobile",
  Dart: "Mobile",
  "React Native": "Mobile",

  // DevOps
  Docker: "DevOps & Cloud",
  Git: "DevOps & Cloud",
  "GitHub Actions": "DevOps & Cloud",
  Vercel: "DevOps & Cloud",
  AWS: "DevOps & Cloud",

  // Tools
  WordPress: "Tools & Practices",
  Microservices: "Tools & Practices",
  Sequelize: "Tools & Practices",
};

const CATEGORY_CONFIG: Record<
  string,
  { icon: string; color: SkillCategory["color"] }
> = {
  Frontend: { icon: "monitor", color: "cyan" },
  Backend: { icon: "server", color: "blue" },
  Database: { icon: "database", color: "violet" },
  Mobile: { icon: "smartphone", color: "emerald" },
  "DevOps & Cloud": { icon: "cloud", color: "orange" },
  "Tools & Practices": { icon: "wrench", color: "pink" },
};

export function mapSkillsToCategories(rawSkills: string[]): SkillCategory[] {
  const grouped: Record<string, string[]> = {};

  for (const skill of rawSkills) {
    const category = SKILL_CATEGORY_MAP[skill] ?? "Tools & Practices";
    if (!grouped[category]) grouped[category] = [];
    grouped[category]!.push(skill);
  }

  return Object.entries(grouped).map(([category, skills]) => ({
    category,
    icon: CATEGORY_CONFIG[category]?.icon ?? "code",
    color: CATEGORY_CONFIG[category]?.color ?? "cyan",
    skills: skills.map((name) => ({
      name,
      proficiency: 75, // Default — update manually
      years: 1,
    })),
  }));
}

export function groupPositionsByCompany(
  positions: {
    company: string;
    companyUrl: string;
    logo: string;
    industry: string;
    title: string;
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
    isRemote: boolean;
    location: string;
    employmentType: string;
    description: string;
    highlights: string[];
    technologies: string[];
  }[],
) {
  const companies: Record<string, typeof positions> = {};

  for (const pos of positions) {
    if (!companies[pos.company]) companies[pos.company] = [];
    companies[pos.company]!.push(pos);
  }

  return Object.entries(companies).map(([company, posArr], idx) => ({
    id: `exp-${idx + 1}`,
    company,
    companyUrl: posArr[0]?.companyUrl ?? "",
    logo: posArr[0]?.logo ?? "",
    industry: posArr[0]?.industry ?? "",
    positions: posArr.map(
      ({ company: _c, companyUrl: _cu, logo: _l, industry: _i, ...rest }) =>
        rest,
    ),
  }));
}
