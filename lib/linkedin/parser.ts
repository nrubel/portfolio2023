/**
 * LinkedIn Archive CSV Parser
 *
 * Usage:
 *   1. Export your data from LinkedIn: Settings → Data privacy → Get a copy of your data
 *   2. Download the archive ZIP and extract it
 *   3. Place the CSV files in /linkedin-export/ at the root of this project
 *   4. Run: npx ts-node lib/linkedin/parser.ts
 *   5. Normalized JSON files will be written to /data/
 *
 * Supported CSV files: Profile.csv, Positions.csv, Education.csv,
 *   Skills.csv, Certifications.csv, Recommendations_Received.csv, Projects.csv
 */

import fs from "fs";
import path from "path";

// ─── Minimal CSV parser (no dependencies) ─────────────────────────────────

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]!);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]!);
    const row: Record<string, string> = {};
    headers.forEach((header, idx) => {
      row[header.trim()] = (values[idx] ?? "").trim();
    });
    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i]!;
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// ─── Parsers ───────────────────────────────────────────────────────────────

function readCSV(
  exportDir: string,
  filename: string,
): Record<string, string>[] {
  const filePath = path.join(exportDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${filename} not found in ${exportDir}`);
    return [];
  }
  return parseCSV(fs.readFileSync(filePath, "utf-8"));
}

export function parsePositions(exportDir: string) {
  const rows = readCSV(exportDir, "Positions.csv");
  return rows.map((row, idx) => ({
    id: `exp-${idx + 1}`,
    company: row["Company Name"] ?? "",
    companyUrl: row["Company URL"] ?? "",
    logo: "",
    industry: "",
    title: row["Title"] ?? "",
    startDate: normalizeDate(row["Started On"] ?? ""),
    endDate: row["Finished On"] ? normalizeDate(row["Finished On"]) : null,
    isCurrent: !row["Finished On"],
    isRemote: false,
    location: row["Location"] ?? "",
    employmentType: "Full-time",
    description: row["Description"] ?? "",
    highlights: [],
    technologies: [],
  }));
}

export function parseEducation(exportDir: string) {
  const rows = readCSV(exportDir, "Education.csv");
  return rows.map((row, idx) => ({
    id: `edu-${idx + 1}`,
    institution: row["School Name"] ?? "",
    degree: row["Degree Name"] ?? "",
    fieldOfStudy: row["Notes"] ?? "",
    startDate: normalizeDate(row["Start Date"] ?? ""),
    endDate: row["End Date"] ? normalizeDate(row["End Date"]) : null,
    grade: "",
    logo: "",
    description: row["Activities"] ?? "",
    activities: [],
  }));
}

export function parseSkills(exportDir: string) {
  const rows = readCSV(exportDir, "Skills.csv");
  return rows.map((row) => row["Name"] ?? "").filter(Boolean);
}

export function parseCertifications(exportDir: string) {
  const rows = readCSV(exportDir, "Certifications.csv");
  return rows.map((row, idx) => ({
    id: `cert-${idx + 1}`,
    title: row["Name"] ?? "",
    issuer: row["Authority"] ?? "",
    issueDate: normalizeDate(row["Started On"] ?? ""),
    expiryDate: row["Finished On"] ? normalizeDate(row["Finished On"]) : null,
    credentialId: row["License Number"] ?? "",
    credentialUrl: row["Url"] ?? "",
    logo: "",
    description: "",
  }));
}

export function parseRecommendations(exportDir: string) {
  const rows = readCSV(exportDir, "Recommendations_Received.csv");
  return rows.map((row, idx) => ({
    id: `rec-${idx + 1}`,
    author: row["Recommender"] ?? "",
    authorTitle: "",
    authorAvatar: "",
    relationship: row["Relationship"] ?? "",
    date: normalizeDate(row["Creation Date"] ?? ""),
    text: row["Text"] ?? "",
    linkedinUrl: "",
  }));
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function normalizeDate(raw: string): string {
  // LinkedIn exports dates like "Jan 2020" or "2020-01-01"
  if (!raw) return "";
  const monthNames: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const match = raw.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const month = monthNames[match[1]!] ?? "01";
    return `${match[2]}-${month}`;
  }
  // Already ISO-ish
  const isoMatch = raw.match(/^(\d{4})-(\d{2})/);
  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}`;
  return raw;
}

// ─── CLI runner ────────────────────────────────────────────────────────────

if (require.main === module) {
  const exportDir = path.join(process.cwd(), "linkedin-export");
  const dataDir = path.join(process.cwd(), "data");

  if (!fs.existsSync(exportDir)) {
    console.error(
      `❌ linkedin-export/ directory not found. Extract your LinkedIn archive there.`,
    );
    process.exit(1);
  }

  const write = (filename: string, data: unknown) => {
    fs.writeFileSync(
      path.join(dataDir, filename),
      JSON.stringify(data, null, 2),
    );
    console.log(`✅ Wrote ${filename}`);
  };

  write("experience.json", parsePositions(exportDir));
  write("education.json", parseEducation(exportDir));
  write("certifications.json", parseCertifications(exportDir));
  write("recommendations.json", parseRecommendations(exportDir));

  const skills = parseSkills(exportDir);
  if (skills.length > 0) {
    console.log(
      `✅ Found ${skills.length} skills: run mapper.ts to categorize them`,
    );
  }

  console.log(
    "\n✨ Done. Review the generated JSON files and enrich with descriptions.",
  );
}
