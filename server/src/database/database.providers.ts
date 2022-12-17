import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { User } from '../auth/entity';
import { Post } from '../post/entities';
import { Comment } from '../comments/entities';
import { Vote } from '../votes/entities';
import { Replay } from '../replies/entities';
import { SEQUELIZE } from 'src/core/constants';

export const databaseProviders = {
  provide: SEQUELIZE,
  useFactory: async () => {
    let config;
    switch (process.env.NODE_ENV) {
      case 'development':
        console.log('development');
        config = databaseConfig.development;
        break;
      case 'test':
        config = databaseConfig.test;
        break;
      case 'production':
        config = databaseConfig.production;
        break;
      default:
        databaseConfig.development;
    }
    const sequelize = new Sequelize(config);
    sequelize.addModels([User, Post, Comment, Vote, Replay]);
    await sequelize.sync({ force: false });
    return sequelize;
  },
};
