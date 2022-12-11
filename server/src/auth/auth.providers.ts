import { User } from './entity';
import { USER_REPOSITORY } from 'src/constants';

export const usersProviders = {
  provide: USER_REPOSITORY,
  useValue: User,
};
