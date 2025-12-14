// ============================================
// AI Service (OpenAI)
// AI Features: Gamer Identity, Community Architect, Auto-Tagger, Shoutcaster
// ============================================

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

// Retry configuration (exponential backoff)
const MAX_RETRIES = 3;
const BASE_DELAY = 1000;

/**
 * Call OpenAI API with exponential backoff retry logic
 */
export async function callGemini(prompt: string): Promise<string> {
  const payload = {
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 200,
    temperature: 0.8,
  };

  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content;

      if (text) {
        return text;
      }

      throw new Error("No text in response");
    } catch (error) {
      lastError = error as Error;
      attempt++;

      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) =>
          setTimeout(resolve, BASE_DELAY * Math.pow(2, attempt))
        );
      }
    }
  }

  console.error("OpenAI API Error:", lastError);
  throw new Error("AI Comms Offline. Try again.");
}

// ============================================
// AI Feature Prompts
// ============================================

/**
 * Generate a gamer bio based on player stats
 * AI Feature: "Gamer Identity" Generator
 */
export async function generateGamerBio(
  mainGame: string,
  role?: string,
  rank?: string
): Promise<string> {
  const prompt = `
    Write a badass, 2-sentence bio for a ${mainGame} player. 
    ${role ? `Mention they play ${role} role.` : ""} 
    ${rank ? `and aim for ${rank} rank.` : ""} 
    Use gamer slang.
  `;
  return callGemini(prompt);
}

/**
 * Generate community description
 * AI Feature: "Community Architect"
 */
export async function generateCommunityDescription(
  name: string,
  game: string
): Promise<string> {
  const prompt = `
    Write a short, engaging description (max 180 characters) for a gaming community named "${name}" that focuses on the game "${game}".
    Tone: Competitive but welcoming. Use gaming lingo appropriate for the genre.
  `;
  return callGemini(prompt);
}

/**
 * Generate tags for a community based on game
 * AI Feature: "Auto-Tagger"
 */
export async function generateCommunityTags(game: string): Promise<string[]> {
  const prompt = `Generate 4 short, single-word tags (e.g., Competitive, Casual, FPS, MOBA, Scrims) for a gaming community playing "${game}". Return them as a comma-separated list. No numbering.`;

  const response = await callGemini(prompt);
  return response
    .split(",")
    .map((t) => t.trim().replace(".", ""))
    .slice(0, 4);
}

/**
 * Generate esports shoutcast commentary
 * AI Feature: "Esports Shoutcaster"
 */
export async function generateShoutcast(bracketState: string): Promise<string> {
  const prompt = `
    You are a professional esports shoutcaster like Tasteless or Artosis. 
    Analyze this tournament bracket state: ${bracketState}.
    Write a short, high-energy 3-sentence summary of the action. 
    Highlight the biggest upset or closest match. Use gamer terminology (GG, clutch, macro, micro).
    Do not use emojis.
  `;
  return callGemini(prompt);
}
