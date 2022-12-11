import { Like } from './entities';
import { LIKE_REPOSITORY } from 'src/constants';

export const likeProvider = {
  provide: LIKE_REPOSITORY,
  useValue: Like,
};
