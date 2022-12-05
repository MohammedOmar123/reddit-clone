import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { likeProvider } from './like.provider';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  controllers: [LikesController],
  providers: [LikesService, ...likeProvider],
})
export class LikesModule {}
