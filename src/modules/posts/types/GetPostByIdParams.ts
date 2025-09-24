import { z } from "zod";

export const getPostByIdParamsSchema = z.strictObject({
  postId: z.string(),
});

export type GetPostByIdParams = z.infer<typeof getPostByIdParamsSchema>;
