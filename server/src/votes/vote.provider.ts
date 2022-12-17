import { Vote } from './entities';
import { VOTE_REPOSITORY } from 'src/constants';

export const voteProvider = {
  provide: VOTE_REPOSITORY,
  useValue: Vote,
};
