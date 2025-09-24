import { docClient } from "@/libs";
import { PostItem } from "@/modules/posts";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

export class PostRepository {
  getAllPostItems = async (): Promise<PostItem[]> => {
    const command = new ScanCommand({
      TableName: "Posts",
    });

    const result = await docClient.send(command);

    return result.Items as PostItem[];
  };

  getPostItemById = async (postId: string): Promise<PostItem> => {
    const command = new GetCommand({
      TableName: "Posts",
      Key: { id: postId },
    });

    const result = await docClient.send(command);
    return result.Item as PostItem;
  };

  createPostItem = async (postItem: PostItem): Promise<PostItem> => {
    const command = new PutCommand({
      TableName: "Posts",
      Item: postItem,
    });

    await docClient.send(command);

    return postItem;
  };

  updatePostItemById = async (postId: string, updates: Partial<PostItem>) => {
    // Strings that describe what attributes to set, remove, etc
    const updateExpressions = [];
    // Placeholder mappings for attribute names (#name -> name)
    const expressionAttributeNames: Record<string, string> = {};
    // Placeholder mappings for new values
    const expressionAttributeValues: Record<string, any> = {};

    // Generate command properties from update object
    for (const key of Object.keys(updates)) {
      updateExpressions.push(`#${key} = :${key}`);
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = updates[key as keyof PostItem];
    }

    const command = new UpdateCommand({
      TableName: "Posts",
      Key: { id: postId },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW", // Return the item after update
      ConditionExpression: "attribute_exists(id)", // Prevent creation if item doesn't exist
    });

    const result = await docClient.send(command);

    return result.Attributes as PostItem;
  };

  deletePostItemById = async (postId: string): Promise<void> => {
    const command = new DeleteCommand({
      TableName: "Posts",
      Key: { id: postId },
    });

    await docClient.send(command);

    return;
  };
}
