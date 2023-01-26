import { Module, forwardRef } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { voteProvider } from './vote.provider';
import { PostModule } from '../post/post.module';

@Module({
  imports: [forwardRef(() => PostModule)],
  controllers: [VoteController],
  providers: [VoteService, voteProvider],
  exports: [VoteService, voteProvider],
})
export class VoteModule {}
