import { Post } from './entities';
import { POST_REPOSITORY } from 'src/core/constants';

export const postProvider = {
  provide: POST_REPOSITORY,
  useValue: Post,
};
