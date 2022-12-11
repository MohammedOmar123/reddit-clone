import { Post } from './entities';
import { POST_REPOSITORY } from 'src/constants';

export const postProvider = {
  provide: POST_REPOSITORY,
  useValue: Post,
};
