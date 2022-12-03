import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { User } from '../auth/entity/user.entity';
import { Post } from '../post/entities/post.entity';
import { Comment } from '../comments/entities/comment.entity';
import { Like } from '../likes/entities/like.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
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
      sequelize.addModels([User, Post, Comment, Like]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
