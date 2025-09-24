import { postDtoTagSchema } from "@/modules/posts";
import { z } from "zod";

export const createPostBodySchema = z.strictObject({
  url: z.string(),
  tags: z.array(postDtoTagSchema),
});

export type CreatePostBody = z.infer<typeof createPostBodySchema>;
