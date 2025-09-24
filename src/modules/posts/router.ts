import { validateRequestBody, validateRequestParams } from "@/common";
import {
  createPostBodySchema,
  deletePostParamsSchema,
  getPostByIdParamsSchema,
  PostController,
  updatePostBodySchema,
  updatePostParamsSchema,
} from "@/modules/posts";
import { Router } from "express";

export const postRouter = Router();
const postController = new PostController();

postRouter.get("/", postController.getAllPosts);

postRouter.get(
  "/:postId",
  validateRequestParams(getPostByIdParamsSchema),
  postController.getPostById
);

postRouter.post(
  "/",
  validateRequestBody(createPostBodySchema),
  postController.createPost
);

postRouter.patch(
  "/:postId",
  validateRequestParams(updatePostParamsSchema),
  validateRequestBody(updatePostBodySchema),
  postController.updatePost
);

postRouter.delete(
  "/:postId",
  validateRequestParams(deletePostParamsSchema),
  postController.deletePost
);
