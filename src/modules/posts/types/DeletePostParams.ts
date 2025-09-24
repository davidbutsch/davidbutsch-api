import { z } from "zod";

export const deletePostParamsSchema = z.strictObject({
  postId: z.string(),
});

export type DeletePostParams = z.infer<typeof deletePostParamsSchema>;
