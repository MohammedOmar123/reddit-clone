import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { likeProvider } from './like.provider';
import { postProvider } from '../post/post.provider';
import { PostService } from '../post/post.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService, ...likeProvider, ...postProvider, PostService],
})
export class LikesModule {}
