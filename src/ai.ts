import { phrasingSchema, type Phrasing } from "./schema";
import { generateObject, streamText } from "ai";
import chalk from "chalk";
import { makeConfig } from "./config";

const config = makeConfig();

export const generatePhrasings = async (query: string): Promise<Phrasing[]> => {
  const result = await generateObject<Phrasing>({
    model: config.tasks.phrasing.model,
    schema: phrasingSchema,
    system: config.tasks.phrasing.system,
    output: "array",
    mode: "json",
    prompt: query,
  });
  return [{ id: "main", phrasing: query }, ...result.object];
};

export const answer = async (phrasings: Phrasing[]): Promise<string[]> => {
  const answers: string[] = [];
  for (const [index, phrasing] of phrasings.entries()) {
    const data = await streamText({
      model: config.tasks.answering.model,
      temperature: config.tasks.answering.temperature,
      maxTokens: config.tasks.answering.maxTokens,
      system: config.tasks.answering.system,
      prompt: phrasing.phrasing,
    });
    console.log(chalk.greenBright(`[${index + 1}/${phrasings.length}]`));
    console.log(chalk.blue(phrasing.phrasing), "\n");
    for await (const chunk of data.textStream) {
      process.stdout.write(`${chunk}`);
    }
    console.log(chalk.greenBright("\n--------------------------\n"));
    answers.push(await data.text);
  }
  return answers;
};

export const summarize = async (answers: string[]): Promise<string> => {
  const result = await streamText({
    model: config.tasks.summarizing.model,
    temperature: config.tasks.summarizing.temperature,
    maxTokens: config.tasks.summarizing.maxTokens,
    system: config.tasks.summarizing.system,
    prompt: answers.join("\n"),
  });
  for await (const chunk of result.textStream) {
    process.stdout.write(chalk.hex(config.colors.summary)(chunk));
  }
  return result.text;
};

export const pipeline = async (query: string) => {
  const phrasings = await generatePhrasings(query);
  const answers = await answer(phrasings);
  const summary = await summarize(answers);
  return summary;
};
