import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { commentProvider } from './comments.provider';
import { PostService } from 'src/post/post.service';
import { postProvider } from 'src/post/post.provider';
@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService,
    ...commentProvider,
    PostService,
    ...postProvider,
  ],
})
export class CommentsModule {}
