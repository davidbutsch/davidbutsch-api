import { postDtoTagSchema } from "@/modules/posts";
import { z } from "zod";

export const updatePostBodySchema = z
  .strictObject({
    id: z.string(),
    tags: z.array(postDtoTagSchema),
  })
  .partial();

export type UpdatePostBody = z.infer<typeof updatePostBodySchema>;
