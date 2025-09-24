import {
  CreatePostBody,
  DeletePostParams,
  PostService,
  UpdatePostBody,
  UpdatePostParams,
} from "@/modules/posts";
import { RequestHandler } from "express";

export class PostController {
  private postService = new PostService();

  /**
   * Get post by id with `GetPostByIdParams`.
   *
   * Returns post dto.
   */
  getPostById: RequestHandler = async (request, response) => {
    const { postId } = request.params;

    const postDto = await this.postService.getPostById(postId);

    response.json(postDto);
  };

  /**
   * Get all posts.
   *
   * Responds with array of post dtos.
   */
  getAllPosts: RequestHandler = async (_request, response) => {
    const posts = await this.postService.getAllPosts();

    response.json(posts);
  };

  /**
   * Create post with `CreatePostBody`.
   *
   * Responds with post dto.
   */
  createPost: RequestHandler = async (request, response) => {
    const body: CreatePostBody = request.body;

    const newPostDto = await this.postService.createPost(body);

    response.json(newPostDto);
  };

  /**
   * Update post with `UpdatePostParams` and `UpdatePostBody`.
   *
   * Responds with post dto.
   */
  updatePost: RequestHandler = async (request, response) => {
    const { postId } = request.params as UpdatePostParams;
    const body: UpdatePostBody = request.body;

    const updatedPostDto = await this.postService.updatePostById(postId, body);

    response.json(updatedPostDto);
  };

  /**
   * Delete post with `DeletePostParams`.
   *
   * Responds with no content.
   */
  deletePost: RequestHandler = async (request, response) => {
    const { postId } = request.params as DeletePostParams;

    await this.postService.deletePostById(postId);

    response.sendStatus(204);
  };
}
