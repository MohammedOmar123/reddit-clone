import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Vote } from './entities';
import { PostService } from '../post/post.service';
import { VOTE_REPOSITORY } from 'src/constants';

@Injectable()
export class VoteService {
  constructor(
    @Inject(VOTE_REPOSITORY) private voteRepository: typeof Vote,
    private postService: PostService,
  ) {}

  async create(postId: number, userId: number) {
    const post = await this.postService.findOne(postId);
    if (!post) throw new NotFoundException();
    return await this.voteRepository.upsert({
      postId,
      userId,
    });
  }

  async findLikesCount(postId: number) {
    return this.voteRepository.count({
      where: { postId },
    });
  }

  async remove(postId: number, userId: number) {
    return this.voteRepository.destroy({ where: { postId, userId } });
  }
}
