import { Like } from './entities/like.entity';
export const likeProvider = [
  {
    provide: 'LIKE_REPOSITORY',
    useValue: Like,
  },
];
