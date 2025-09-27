import { RequestHandler } from "express";
import { UnauthorizedError } from "../errors";

export const requireUserGroup = (group: string): RequestHandler => {
  return async (_request, response, next) => {
    if (!response.locals.tokenPayload)
      return next(new UnauthorizedError("Missing token payload."));

    // If group exists in token payload, move to next
    if (response.locals.tokenPayload["cognito:groups"].includes(group)) next();
    else return next(new UnauthorizedError("Missing user group."));
  };
};
