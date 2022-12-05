import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { postProvider } from './post.provider';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PostController],
  providers: [PostService, ...postProvider],
  exports: [...postProvider, PostService],
})
export class PostModule {}
