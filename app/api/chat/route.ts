import experienceData from "@/data/experience.json";
import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import type { Experience, Project, SkillCategory } from "@/types/portfolio";
import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

function buildSystemPrompt(): string {
  const experience = experienceData as Experience[];
  const skills = skillsData as SkillCategory[];
  const projects = projectsData as Project[];

  const expText = experience
    .flatMap((exp) =>
      exp.positions.map(
        (pos) =>
          `- ${pos.title} at ${exp.company} (${pos.startDate} to ${pos.isCurrent ? "present" : pos.endDate}): ${pos.description.slice(0, 200)}`,
      ),
    )
    .join("\n");

  const skillsText = skills
    .map(
      (cat) => `${cat.category}: ${cat.skills.map((s) => s.name).join(", ")}`,
    )
    .join("\n");

  const projectsText = projects
    .map(
      (p) => `- ${p.title}: ${p.shortDesc} (Stack: ${p.techStack.join(", ")})`,
    )
    .join("\n");

  return `You are an intelligent portfolio assistant for ${profileData.name}.
Your role is to help visitors — recruiters, clients, and developers — learn about Nasir's professional background.
Be concise, professional, and accurate. Keep responses to 2-4 sentences unless more detail is requested.
Never fabricate information. If you don't know something, say so and suggest contacting Nasir directly.
Always maintain a professional tone that reflects well on Nasir's brand.

=== PROFILE ===
Name: ${profileData.name}
Headline: ${profileData.headline}
Location: ${profileData.location}
Email: ${profileData.email}
Availability: ${profileData.availability.replace(/_/g, " ")}
Summary: ${profileData.summary}

=== EXPERIENCE ===
${expText}

=== SKILLS ===
${skillsText}

=== PROJECTS ===
${projectsText}

=== SOCIAL ===
GitHub: https://github.com/nrubel
LinkedIn: https://linkedin.com/in/nasir-uddin
Email: ${profileData.email}`;
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "AI chatbot is not configured. The portfolio owner needs to set OPENAI_API_KEY.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const { messages } = (await req.json()) as {
    messages: Omit<UIMessage, "id">[];
  };

  // Basic rate limiting via message count
  if (!Array.isArray(messages) || messages.length > 50) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 400,
    temperature: 0.7,
  });

  return result.toUIMessageStreamResponse();
}
