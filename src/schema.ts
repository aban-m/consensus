import { z } from "zod";

export const phrasingSchema = z.object({
  phrasing: z.string().describe("A phrasing of the question"),
  id: z.string().describe("An arbitrary id, unique, for the phrasing"),
});
export const phrasingsResultSchema = z.array(phrasingSchema);
export type Phrasing = z.infer<typeof phrasingSchema>;
export type PhrasingsResult = z.infer<typeof phrasingsResultSchema>;
export type Answer = string;
export type OutputResult = (Phrasing & { answer: Answer })[];
