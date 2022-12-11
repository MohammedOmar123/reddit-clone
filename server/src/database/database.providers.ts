import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { User } from '../auth/entity';
import { Post } from '../post/entities';
import { Comment } from '../comments/entities';
import { Like } from '../likes/entities';
import { Replay } from '../replies/entities';
import { SEQUELIZE } from 'src/constants';

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
    sequelize.addModels([User, Post, Comment, Like, Replay]);
    await sequelize.sync();
    return sequelize;
  },
};
