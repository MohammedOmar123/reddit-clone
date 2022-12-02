import { User } from './entity/user.entity';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
