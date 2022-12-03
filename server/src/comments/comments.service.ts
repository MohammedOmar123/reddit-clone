import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('Comment_REPOSITORY') private commentRepository: typeof Comment,
    private postService: PostService,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
    postId: number,
  ) {
    const { content } = createCommentDto;
    const post = await this.postService.findOne(postId);
    if (!post) return null;
    return await this.commentRepository.create({
      content,
      postId,
      userId,
    });
  }

  async findAll(postId: number) {
    return await this.commentRepository.findAll({
      where: { postId },
      order: [['createdAt', 'ASC']],
    });
  }

  async findOne(postId: number) {
    return await this.commentRepository.findOne({
      where: { postId },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number) {
    const { content } = updateCommentDto;
    return await this.commentRepository.update(
      { content },
      { where: { id, userId }, returning: true },
    );
  }

  remove(id: number, userId: number) {
    return this.commentRepository.destroy({ where: { id, userId } });
  }
}
