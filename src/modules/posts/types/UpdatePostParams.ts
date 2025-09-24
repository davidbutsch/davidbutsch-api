import { z } from "zod";

export const updatePostParamsSchema = z.strictObject({
  postId: z.string(),
});

export type UpdatePostParams = z.infer<typeof updatePostParamsSchema>;
