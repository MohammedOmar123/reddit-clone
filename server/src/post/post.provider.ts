import { Post } from './entities/post.entity';
export const postProvider = [
  {
    provide: 'Post_REPOSITORY',
    useValue: Post,
  },
];
