import { z } from "zod";
import { postDtoTagSchema } from "./PostDto";

export const createPostBodySchema = z.strictObject({
  jotId: z.string(),
  tags: z.array(postDtoTagSchema),
});

export type CreatePostBody = z.infer<typeof createPostBodySchema>;
