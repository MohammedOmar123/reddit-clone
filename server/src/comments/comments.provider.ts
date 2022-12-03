import { Comment } from './entities/comment.entity';
export const commentProvider = [
  {
    provide: 'Comment_REPOSITORY',
    useValue: Comment,
  },
];
