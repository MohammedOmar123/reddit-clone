import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Like } from './entities';
import { PostService } from '../post/post.service';
import { LIKE_REPOSITORY } from 'src/constants';

@Injectable()
export class LikesService {
  constructor(
    @Inject(LIKE_REPOSITORY) private likeRepository: typeof Like,
    private postService: PostService,
  ) {}
  async create(postId: number, userId: number) {
    const post = await this.postService.findOne(postId);
    if (!post) throw new NotFoundException();
    return await this.likeRepository.upsert({
      postId,
      userId,
    });
  }

  async findLikesCount(postId: number) {
    return this.likeRepository.count({
      where: { postId },
    });
  }

  async remove(postId: number, userId: number) {
    return this.likeRepository.destroy({ where: { postId, userId } });
  }
}
