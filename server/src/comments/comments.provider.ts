import { Comment } from './entities';
import { COMMENT_REPOSITORY } from 'src/constants';

export const commentProvider = {
  provide: COMMENT_REPOSITORY,
  useValue: Comment,
};
