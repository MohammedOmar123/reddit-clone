import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CommentDto } from './dto';
import { Comment } from './entities/';
import { User } from '../auth/entity';
import { PostService } from '../post/post.service';
import { COMMENT_REPOSITORY } from 'src/core/constants';
import { USER_REPOSITORY, Messages } from '../core/constants';
@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENT_REPOSITORY) private commentRepository: typeof Comment,
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    private postService: PostService,
  ) {}

  async create(createCommentDto: CommentDto, userId: number, postId: number) {
    const { content } = createCommentDto;
    await this.postService.checkPostExist(postId);

    try {
      const comment = await this.commentRepository.create(
        {
          content,
          postId,
          userId,
        },
        { returning: true },
      );
      return { message: Messages.SUCCESS_ADD, comment };
    } catch (error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new BadRequestException('This account is not valid');
      }
    }
  }

  async findAll(postId: number) {
    const comments = await this.commentRepository.findAll({
      where: { postId },
      order: [['createdAt', 'ASC']],
      include: {
        model: this.userRepository,
        required: true,
        attributes: ['id', 'username', 'image'],
      },
    });
    return comments;
  }

  async findCommentCount(postId: number) {
    const commentCount = await this.commentRepository.count({
      where: { postId },
    });
    return commentCount;
  }

  async findOne(postId: number) {
    const comment = await this.commentRepository.findOne({
      where: { postId },
    });
    return comment;
  }

  async checkCommentExists(id: number) {
    const comment = await this.commentRepository.findByPk(id);
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(id: number, updateCommentDto: CommentDto, userId: number) {
    const { content } = updateCommentDto;
    const [affectedRows, [comment]] = await this.commentRepository.update(
      { content },
      { where: { id, userId }, returning: ['content'] },
    );
    if (!affectedRows) throw new NotFoundException();
    return { message: Messages.SUCCESS_UPDATED, comment };
  }

  async remove(id: number, userId: number) {
    const affectedRows = await this.commentRepository.destroy({
      where: { id, userId },
    });
    if (!affectedRows) throw new NotFoundException();
    return { message: Messages.SUCCESS_DELETED };
  }
}
