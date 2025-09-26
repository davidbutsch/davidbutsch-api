import { z } from "zod";

export const createPostBodySchema = z.strictObject({
  jotId: z.string(),
  tags: z.array(z.string()),
});

export type CreatePostBody = z.infer<typeof createPostBodySchema>;
