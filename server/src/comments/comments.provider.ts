import { Comment } from './entities';
import { COMMENT_REPOSITORY } from 'src/core/constants';

export const commentProvider = {
  provide: COMMENT_REPOSITORY,
  useValue: Comment,
};
