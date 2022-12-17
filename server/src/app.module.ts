import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentsModule } from './comments/comments.module';
import { VoteModule } from './votes/vote.module';
import { RepliesModule } from './replies/replies.module';

@Module({
  // setting isGlobal true will make the Config Module available in all other modules.
  // So You don't have to import it every time in other modules.
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    PostModule,
    CommentsModule,
    VoteModule,
    RepliesModule,
  ],
})
export class AppModule {}
