import { env, errorHandler, NotFoundError } from "@/common";
import express from "express";

import { postRouter } from "@/modules/posts";
import cors from "cors";
import helmet from "helmet";
import { Logger } from "./winston";

export const app = express();

app.enable("trust proxy");
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (_request, response) => {
  response.status(200).send();
});

// Routes
app.use("/posts/", postRouter);

// Handle undefined routes
app.use((request, _response, next) =>
  next(new NotFoundError(`${request.method} ${request.url} not found.`))
);

app.use(errorHandler);

app.listen(env.keys.PORT, (error) => {
  if (error) throw error;
  Logger.info(`Listening on port ${env.keys.PORT}`);
});
