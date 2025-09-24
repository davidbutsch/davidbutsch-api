import { PostDto, PostItem } from "@/modules/posts";

export function postItemToDto(postItem: PostItem): PostDto {
  // Item is equivalent to data transfer object
  return postItem;
}
