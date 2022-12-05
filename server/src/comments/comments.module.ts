import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { commentProvider } from './comments.provider';
import { PostModule } from '../post/post.module';
@Module({
  imports: [PostModule],
  controllers: [CommentsController],
  providers: [CommentsService, ...commentProvider],
  exports: [CommentsService],
})
export class CommentsModule {}
