import { v6 } from "uuid";

export function generateItemId() {
  const id = v6();

  return id.replaceAll("-", "");
}
