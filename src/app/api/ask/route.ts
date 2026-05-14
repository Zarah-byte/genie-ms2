import Anthropic from "@anthropic-ai/sdk";
import { demoMemories, demoPeople, demoRelationships } from "@/lib/mock/demoFamily";

function buildFamilyContext() {
  const lines: string[] = ["FAMILY ARCHIVE — DEMO\n"];

  lines.push("PEOPLE:");
  for (const person of demoPeople) {
    lines.push(`\n• ${person.name} (${person.relationship})`);
    lines.push(`  Dates: ${person.dates}`);
    lines.push(`  Place: ${person.place}`);
    lines.push(`  Story: "${person.story}"`);
    if (person.memories.length) {
      lines.push(`  Memories: ${person.memories.join(", ")}`);
    }
  }

  lines.push("\n\nRELATIONSHIPS:");
  for (const rel of demoRelationships) {
    const from = demoPeople.find((p) => p.id === rel.from);
    const to = demoPeople.find((p) => p.id === rel.to);
    if (from && to) lines.push(`• ${from.name} ↔ ${to.name}`);
  }

  lines.push("\n\nMEMORIES:");
  for (const memory of demoMemories) {
    lines.push(`\n• "${memory.title}" (${memory.dateOrPlace})`);
    lines.push(`  ${memory.excerpt}`);
    if (memory.relatedPeople.length) {
      lines.push(`  Related people: ${memory.relatedPeople.join(", ")}`);
    }
  }

  return lines.join("\n");
}

const SYSTEM_PROMPT = `You are a thoughtful AI assistant for Genie, a private family archive app. You help users explore their family lineage by answering questions about the people, memories, places, and stories in the archive.

Here is the complete family archive you have access to:

${buildFamilyContext()}

Guidelines:
- Answer warmly and thoughtfully, as if helping someone reconnect with their heritage
- Keep answers concise: 2–4 sentences unless the question needs more
- If asked about someone not in the archive, acknowledge what you don't know
- Surface interesting connections between people or memories when relevant
- You may speculate gently about history or context if clearly framed as speculation
- Do not make up names, dates, or facts not present in the archive`;

export async function POST(req: Request) {
  const { question } = await req.json();

  if (!question || typeof question !== "string" || question.trim().length === 0) {
    return new Response("Question is required", { status: 400 });
  }

  const client = new Anthropic();

  const stream = client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 400,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: question.trim() }]
  });

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(new TextEncoder().encode(event.delta.text));
          }
        }
      } finally {
        controller.close();
      }
    }
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache"
    }
  });
}
