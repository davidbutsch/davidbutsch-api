import {
  requireUserGroup,
  validateCognitoToken,
  validateRequestBody,
  validateRequestParams,
} from "@/common";
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
  validateCognitoToken,
  requireUserGroup("admins"),
  validateRequestBody(createPostBodySchema),
  postController.createPost
);

postRouter.patch(
  "/:postId",
  validateCognitoToken,
  requireUserGroup("admins"),
  validateRequestParams(updatePostParamsSchema),
  validateRequestBody(updatePostBodySchema),
  postController.updatePost
);

postRouter.delete(
  "/:postId",
  validateCognitoToken,
  requireUserGroup("admins"),
  validateRequestParams(deletePostParamsSchema),
  postController.deletePost
);
