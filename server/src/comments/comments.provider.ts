import { Comment } from './entities';
export const commentProvider = [
  {
    provide: 'Comment_REPOSITORY',
    useValue: Comment,
  },
];
