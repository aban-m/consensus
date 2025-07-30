import {
  createOpenRouter,
  type LanguageModelV1,
} from "@openrouter/ai-sdk-provider";
import {
  phrasingSchema,
  phrasingsResultSchema,
  type Phrasing,
  type PhrasingsResult,
} from "./schema";
import { generateObject, streamObject, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import chalk from "chalk";

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export type Config = Partial<Parameters<typeof generateObject>[0]> & {
  model: LanguageModelV1;
};
const phrasingConfig: Config = {
  model: openrouter("openai/gpt-4.1-nano"),
  seed: Number(process.env.CONSENSUS_SEED) || 42,
  temperature: 1,
  system: `
  The user will provide a query and you will generate a list of phrasings that are EQUIVALENT to the query.
  Please just follow the schema. For every phrasing, you wrap it in a key called phrasing, and just make up an ID and save it in the field id.
  The ids must be random and unrelated. The phrasings should be as unique and distinct as possible.
  `,
};
const answeringConfig: Config = {
  model: openrouter("openai/gpt-4.1"),
  temperature: 0.8,
  system: "A",
};

export const generatePhrasings = async (query: string): Promise<Phrasing[]> => {
  const result = await generateObject<Phrasing>({
    ...phrasingConfig,
    schema: phrasingSchema,
    output: "array",
    mode: "json",
    prompt: query,
  });
  return result.object;
};

export const answer = async (phrasings: Phrasing[]): Promise<string[]> => {
  for (const [index, phrasing] of phrasings.entries()) {
    const data = await streamText({
      ...answeringConfig,
      prompt: phrasing.phrasing,
    });
    console.log(
      chalk.gray(`${phrasing.id}`),
      `${index + 1} out of ${phrasings.length}`,
      chalk.bold(phrasing.phrasing),
      "\n"
    );
    for await (const chunk of data.textStream) {
      process.stdout.write(chunk);
    }
    console.log(chalk.greenBright("\n--------------------------\n"));
  }
  return [];
};
