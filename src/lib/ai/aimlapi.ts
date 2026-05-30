type GenerateAIResponseInput = {
  systemPrompt: string;
  userPrompt: string;
  model?: string;
};

type FeatherlessResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const FEATHERLESS_BASE_URL = "https://api.featherless.ai/v1";
const DEFAULT_MODEL = "deepseek-ai/DeepSeek-V3-0324";

export async function generateAIResponse({
  systemPrompt,
  userPrompt,
  model,
}: GenerateAIResponseInput) {
  const apiKey = process.env.FEATHERLESS_API_KEY;
  const selectedModel = model || process.env.FEATHERLESS_MODEL || DEFAULT_MODEL;

  if (!apiKey) {
    return JSON.stringify({
      mock: true,
      reason: "FEATHERLESS_API_KEY missing. Local mock response used.",
    });
  }

  try {
    const response = await fetch(`${FEATHERLESS_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => response.status.toString());
      return JSON.stringify({
        mock: true,
        reason: `Featherless request failed (${response.status}): ${detail}`,
      });
    }

    const data = (await response.json()) as FeatherlessResponse;
    return data.choices?.[0]?.message?.content ?? "{}";
  } catch (err) {
    return JSON.stringify({
      mock: true,
      reason: `Featherless request error: ${err instanceof Error ? err.message : "unknown"}`,
    });
  }
}

export function parseAIJSON<T>(content: string, fallback: T): T {
  try {
    const parsed = JSON.parse(content) as Partial<T> & { mock?: boolean };
    if (parsed.mock) return fallback;
    const fallbackRecord = fallback as Record<string, unknown>;
    const parsedRecord = parsed as Record<string, unknown>;
    const meta =
      isRecord(fallbackRecord.meta) && isRecord(parsedRecord.meta)
        ? { meta: { ...fallbackRecord.meta, ...parsedRecord.meta } }
        : {};

    return {
      ...fallback,
      ...parsed,
      ...meta,
    };
  } catch {
    return fallback;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
