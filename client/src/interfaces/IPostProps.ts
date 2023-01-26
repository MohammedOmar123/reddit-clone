export interface IPostProps {
  post:{
    id: number;
    title: string;
    content: string;
    image: null | string;
    userId: number;
    createdAt: string;

  }

  user: {
    id: string;
    username: string;
    image: null | string;
  };

  comments: Array<{
    id: number;
    content: string;
    userId: number;
    postId: number;
    createdAt: string;
  }>;
}
