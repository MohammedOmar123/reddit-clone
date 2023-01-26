import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { commentProvider } from './comments.provider';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
@Module({
  imports: [UserModule, PostModule],
  controllers: [CommentsController],
  providers: [CommentsService, commentProvider],
  exports: [CommentsService, commentProvider],
})
export class CommentsModule {}
