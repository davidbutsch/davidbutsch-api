import { z } from "zod";
import { postDtoTagSchema } from "./PostDto";

export const createPostBodySchema = z.strictObject({
  id: z.string(),
  tags: z.array(postDtoTagSchema),
});

export type CreatePostBody = z.infer<typeof createPostBodySchema>;
