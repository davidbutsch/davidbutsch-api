export type PostItemTag = {
  color: string;
  icon: string;
};

export type PostItem = {
  id: string;
  url: string;
  tags: PostItemTag[];
};
