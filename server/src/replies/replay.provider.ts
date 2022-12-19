import { Replay } from './entities';
import { REPLAY_REPOSITORY } from '../core/constants';

export const replayProvider = [
  {
    provide: REPLAY_REPOSITORY,
    useValue: Replay,
  },
];
