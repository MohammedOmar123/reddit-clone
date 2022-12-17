import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { voteProvider } from './vote.provider';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  controllers: [VoteController],
  providers: [VoteService, voteProvider],
})
export class VoteModule {}
