export interface Posts {
  id: number;
  title: string;
  body: string;
  published: boolean;
  createdAt: string;
}

export interface PostsGraphData {
  month: string;
  count: number;
}
