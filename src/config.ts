import { openrouter } from "@openrouter/ai-sdk-provider";

const COUNT = 3;

export const makeConfig = () => ({
  seed: Number(process.env.CONSENSUS_SEED) || 42,
  tasks: {
    phrasing: {
      model: openrouter("openai/gpt-4.1-mini"),
      temperature: 1,
      maxTokens: 150,
      system: `
  The user will provide a query and you will generate a list of phrasings that are EQUIVALENT to the query.
  Please just follow the schema. For every phrasing, you wrap it in a key called phrasing, and just make up an ID and save it in the field id.
  The ids must be random and unrelated. The phrasings should be as unique and distinct as possible.
  Generate exactly ${COUNT} phrasings.
  z.object({
  phrasing: z.string().describe("A phrasing of the question"),
  id: z.string().describe("An arbitrary id, unique, for the phrasing"),
}); I want an ARRAY of this.
  `,
    },
    answering: {
      model: openrouter("openai/gpt-4.1"),
      temperature: 1,
      maxTokens: 200,
      system: `
  Answer concisely. No Markdown.
  `,
    },
    summarizing: {
      model: openrouter("google/gemini-2.5-flash"),
      temperature: 0,
      maxTokens: 80,
      system: `
      Summarize the answers and decide whether a consensus has been reached.
      A consensus is reached when the answers are THE SAME (not similar).
      The last line should just display the final result, and should be separate from the rest of the answer.
      If there is a consensus, summarize the answer. Otherwise, clearly indicate that.
      `,
    },
  },
  colors: {
    phrasing: "#3498db", // Blue color for phrasings
    progress: "#2ecc71", // Green color for progress indicators
    separator: "#2ecc71", // Green color for separators
    summary: "#9b59b6", // Purple color for summary
    default: "#ffffff", // Default white text
  },
});
