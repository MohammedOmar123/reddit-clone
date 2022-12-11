import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentDto } from './dto';
import { Comment } from './entities/';
import { User } from '../auth/entity';
import { PostService } from '../post/post.service';
import { COMMENT_REPOSITORY } from 'src/constants';
import { USER_REPOSITORY } from '../constants';
@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENT_REPOSITORY) private commentRepository: typeof Comment,
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    private postService: PostService,
  ) {}

  async create(createCommentDto: CommentDto, userId: number, postId: number) {
    const { content } = createCommentDto;
    const post = await this.postService.findOne(postId);
    if (!post) throw new NotFoundException();
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
      include: {
        model: this.userRepository,
        required: true,
        attributes: ['id', 'username', 'image'],
      },
    });
  }

  async findOne(postId: number) {
    return await this.commentRepository.findOne({
      where: { postId },
    });
  }

  async findOneById(id: number) {
    return await this.commentRepository.findByPk(id);
  }

  async update(id: number, updateCommentDto: CommentDto, userId: number) {
    const { content } = updateCommentDto;
    return await this.commentRepository.update(
      { content },
      { where: { id, userId } },
    );
  }

  async remove(id: number, userId: number) {
    return this.commentRepository.destroy({ where: { id, userId } });
  }
}
