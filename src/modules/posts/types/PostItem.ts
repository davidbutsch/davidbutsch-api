export type PostItemTag = {
  color: string;
  label: string;
  icon: string;
};

export type PostItem = {
  id: string;
  jotId: string;
  tags: PostItemTag[];
  createdAt: number;
};
