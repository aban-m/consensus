import { z } from "zod";

export const phrasingSchema = z.object({
  phrasing: z.string().describe("A phrasing of the question"),
  id: z.string().describe("An arbitrary id, unique, for the phrasing"),
});
export const thoughtSchema = z.object({
  thought: z.string().describe("A thought about the question"),
  result: z.string().describe("The result of the thought"),
});
export const phrasingsResultSchema = z.array(phrasingSchema);
export const thoughtsResultSchema = z.array(thoughtSchema);
export type Phrasing = z.infer<typeof phrasingSchema>;
export type Thought = z.infer<typeof thoughtSchema>;
export type PhrasingsResult = z.infer<typeof phrasingsResultSchema>;
export type Answer = string;
export type OutputResult = (Phrasing & { answer: Answer })[];
