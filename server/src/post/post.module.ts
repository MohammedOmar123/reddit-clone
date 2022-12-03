import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { postProvider } from './post.provider';

@Module({
  controllers: [PostController],
  providers: [PostService, ...postProvider],
})
export class PostModule {}
