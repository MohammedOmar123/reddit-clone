import { Post } from './entities';
export const postProvider = [
  {
    provide: 'Post_REPOSITORY',
    useValue: Post,
  },
];
