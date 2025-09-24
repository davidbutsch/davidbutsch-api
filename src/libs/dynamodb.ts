import { env } from "@/common";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const ddbClient = new DynamoDBClient({
  region: "us-east-2",
  credentials: {
    accessKeyId: env.keys.ACCESS_KEY_ID,
    secretAccessKey: env.keys.SECRET_ACCESS_KEY,
  },
});

export const docClient = DynamoDBDocumentClient.from(ddbClient);
