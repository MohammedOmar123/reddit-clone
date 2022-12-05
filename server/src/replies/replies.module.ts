import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { replayProvider } from './replay.provider';
import { PostModule } from '../post/post.module';
import { CommentsModule } from '../comments/comments.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PostModule, CommentsModule, UserModule],
  controllers: [RepliesController],
  providers: [RepliesService, ...replayProvider],
})
export class RepliesModule {}
