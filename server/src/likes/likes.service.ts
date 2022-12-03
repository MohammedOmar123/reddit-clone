import { Inject, Injectable } from '@nestjs/common';
import { Like } from './entities/like.entity';
import { PostService } from '../post/post.service';

@Injectable()
export class LikesService {
  constructor(
    @Inject('LIKE_REPOSITORY') private likeRepository: typeof Like,
    private postService: PostService,
  ) {}
  async create(postId: number, userId: number) {
    const post = await this.postService.findOne(postId);
    if (!post) return null;
    return await this.likeRepository.upsert({
      postId,
      userId,
    });
  }

  async findLikesCount(postId: number) {
    const result = await this.likeRepository.findAndCountAll({
      where: { postId },
    });
    return result.count;
  }

  remove(postId: number, userId: number) {
    return this.likeRepository.destroy({ where: { postId, userId } });
  }
}
