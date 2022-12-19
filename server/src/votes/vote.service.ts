import { Inject, Injectable } from '@nestjs/common';
import { Vote } from './entities';
import { PostService } from '../post/post.service';
import { VOTE_REPOSITORY } from 'src/core/constants';

@Injectable()
export class VoteService {
  constructor(
    @Inject(VOTE_REPOSITORY) private voteRepository: typeof Vote,
    private postService: PostService,
  ) {}

  async create(postId: number, userId: number, vote: number) {
    this.postService.checkPostExist(postId);
    const existingVote = await this.voteRepository.findOne({
      where: { postId, userId },
    });

    if (existingVote?.vote === vote) {
      console.log('are you here');
      return await this.remove(postId, userId);
    }

    await this.voteRepository.upsert({
      postId,
      userId,
      vote,
    });
    return this.findVotesCount(postId);
  }

  async findVotesCount(postId: number) {
    const voteCount = await this.voteRepository.sum('vote', {
      where: { postId },
    });
    return { votes: voteCount || 0 };
  }

  async remove(postId: number, userId: number) {
    await this.voteRepository.destroy({ where: { postId, userId } });
    return this.findVotesCount(postId);
  }
}
