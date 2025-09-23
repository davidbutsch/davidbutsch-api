import { env, errorHandler, NotFoundError } from "@/common";
import express from "express";

import cors from "cors";
import helmet from "helmet";
import { Logger } from "./winston";

export const app = express();

app.enable("trust proxy");
app.use(helmet());
app.use(cors());

// Health check endpoint
app.get("/health", (_request, response) => {
  response.status(200).send();
});

// Handle undefined routes
app.use((request, _response, next) =>
  next(new NotFoundError(`${request.method} ${request.url} not found.`))
);

app.use(errorHandler);

app.listen(env.keys.PORT, (error) => {
  if (error) throw error;
  Logger.info(`Listening on port ${env.keys.PORT}`);
});
