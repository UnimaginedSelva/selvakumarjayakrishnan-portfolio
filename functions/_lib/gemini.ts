// Shared Gemini call for the alongside agents (Job Intelligence, Change Readiness).
// gemini-flash-latest sometimes stalls under heavy demand instead of failing fast, and
// Cloudflare cuts any request off at ~100s with an HTML error page the browser can't parse.
// So each attempt gets its own timeout, and busy/timeout errors fall back to the lite model.

const ATTEMPTS = [
  { model: 'gemini-flash-latest', timeoutMs: 50_000 },
  { model: 'gemini-flash-lite-latest', timeoutMs: 40_000 },
];
const RETRYABLE = new Set([429, 500, 503, 504]);

export type GeminiResult = { ok: true; text: string; model: string } | { ok: false; status: number; error: string };

export async function generateWithFallback(apiKey: string, body: unknown): Promise<GeminiResult> {
  let last: GeminiResult = { ok: false, status: 502, error: 'Assessment service unavailable.' };

  for (const { model, timeoutMs } of ATTEMPTS) {
    let response: Response;
    try {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(timeoutMs),
        }
      );
    } catch {
      last = { ok: false, status: 504, error: 'Gemini is busy right now and took too long to respond. Please try again in a minute.' };
      continue;
    }

    if (!response.ok) {
      const errText = await response.text();
      last = { ok: false, status: 502, error: `Assessment service unavailable (Gemini ${response.status}): ${errText.slice(0, 300)}` };
      if (RETRYABLE.has(response.status)) continue;
      return last;
    }

    const data = await response.json() as {
      candidates?: { content: { parts: { text: string }[] } }[];
    };
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) {
      last = { ok: false, status: 502, error: 'Empty response from Gemini. Please try again.' };
      continue;
    }
    return { ok: true, text, model };
  }
  return last;
}
