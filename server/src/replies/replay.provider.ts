import { Replay } from './entities';

export const replayProvider = [
  {
    provide: 'Replay_REPOSITORY',
    useValue: Replay,
  },
];
