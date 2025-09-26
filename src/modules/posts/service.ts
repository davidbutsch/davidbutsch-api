import { NotFoundError } from "@/common";
import {
  CreatePostBody,
  PostDto,
  postItemToDto,
  PostRepository,
  UpdatePostBody,
} from "@/modules/posts";

export class PostService {
  private postRepository = new PostRepository();

  getPostById = async (postId: string): Promise<PostDto> => {
    const postItem = await this.postRepository.getPostItemById(postId);

    if (!postItem) throw new NotFoundError("Post not found.");

    const postDto = postItemToDto(postItem);

    return postDto;
  };

  getAllPosts = async (): Promise<PostDto[]> => {
    const postItems = await this.postRepository.getAllPostItems();

    // Map items to dtos
    const postDtos = postItems.map((item) => postItemToDto(item));

    return postDtos;
  };

  createPost = async (body: CreatePostBody): Promise<PostDto> => {
    const now = Date.now();

    // Assume jot with post id exists (should implement validation logic but i dont care)
    const postItem = await this.postRepository.createPostItem({
      id: body.id,
      tags: body.tags,
      createdAt: now,
    });

    // Map item to dto
    const postDto = postItemToDto(postItem);
    console.log(postDto);

    return postDto;
  };

  updatePostById = async (
    postId: string,
    body: UpdatePostBody
  ): Promise<PostDto> => {
    // Get post and throw if not found
    await this.getPostById(postId);

    // Update post item
    const updatedPostItem = await this.postRepository.updatePostItemById(
      postId,
      body
    );

    // Map item to dto
    const updatedPostDto = postItemToDto(updatedPostItem);

    return updatedPostDto;
  };

  deletePostById = async (postId: string): Promise<void> => {
    // Get post and throw if not found
    await this.getPostById(postId);

    await this.postRepository.deletePostItemById(postId);

    return;
  };
}
