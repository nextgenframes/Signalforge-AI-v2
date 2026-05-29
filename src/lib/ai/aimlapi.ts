type GenerateAIResponseInput = {
  systemPrompt: string;
  userPrompt: string;
  model?: string;
};

type AIMLAPIResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const AIMLAPI_BASE_URL = "https://api.aimlapi.com/v1";
const FALLBACK_MODEL = "gpt-4o-mini";

export async function generateAIResponse({
  systemPrompt,
  userPrompt,
  model,
}: GenerateAIResponseInput) {
  const apiKey = process.env.AIMLAPI_KEY;
  const selectedModel = model || process.env.AIMLAPI_MODEL || FALLBACK_MODEL;

  if (!apiKey) {
    return JSON.stringify({
      mock: true,
      reason: "AIMLAPI_KEY missing. Local mock response used.",
    });
  }

  try {
    const response = await fetch(`${AIMLAPI_BASE_URL}/chat/completions`, {
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
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      return JSON.stringify({
        mock: true,
        reason: `AIMLAPI request failed: ${response.status}`,
      });
    }

    const data = (await response.json()) as AIMLAPIResponse;
    return data.choices?.[0]?.message?.content ?? "{}";
  } catch {
    return JSON.stringify({
      mock: true,
      reason: "AIMLAPI request failed. Local mock response used.",
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
