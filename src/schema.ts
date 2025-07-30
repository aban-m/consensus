import { z } from "zod";

export const phrasingSchema = z.object({
  phrasing: z.string().describe("A phrasing of the question"),
  id: z.string().describe("An arbitrary id, unique, for the phrasing"),
});
export type Phrasing = z.infer<typeof phrasingSchema>;
