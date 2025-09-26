import { z } from "zod";

export const updatePostBodySchema = z
  .strictObject({
    jotId: z.string(),
    tags: z.array(z.string()),
  })
  .partial();

export type UpdatePostBody = z.infer<typeof updatePostBodySchema>;
