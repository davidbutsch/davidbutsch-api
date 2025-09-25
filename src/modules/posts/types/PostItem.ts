export type PostItemTag = {
  color: string;
  label: string;
  icon: string;
};

export type PostItem = {
  id: string;
  tags: PostItemTag[];
};
