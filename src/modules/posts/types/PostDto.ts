import { z } from "zod";

export const postDtoTagSchema = z.strictObject({
  color: z.string(),
  icon: z.string(),
});

export type PostDtoTag = z.infer<typeof postDtoTagSchema>;

export type PostDto = {
  url: string;
  tags: PostDtoTag[];
};
