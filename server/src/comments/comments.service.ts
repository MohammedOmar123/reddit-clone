import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentDto } from './dto';
import { Comment } from './entities/';
import { User } from '../auth/entity';
import { PostService } from '../post/post.service';
import { COMMENT_REPOSITORY } from 'src/constants';
import { USER_REPOSITORY, MESSAGES } from '../constants';
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
    const data = await this.commentRepository.create(
      {
        content,
        postId,
        userId,
      },
      { returning: true },
    );
    return { message: MESSAGES.SUCCESS_ADD, data };
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

  async findOne(postId: number) {
    const comment = await this.commentRepository.findOne({
      where: { postId },
    });
    return comment;
  }

  async findOneById(id: number) {
    const comment = await this.commentRepository.findByPk(id);
    return comment;
  }

  async update(id: number, updateCommentDto: CommentDto, userId: number) {
    const { content } = updateCommentDto;
    const [affectedRows, [comment]] = await this.commentRepository.update(
      { content },
      { where: { id, userId }, returning: ['content'] },
    );
    if (!affectedRows) throw new NotFoundException();
    return { message: MESSAGES.SUCCESS_UPDATED, comment };
  }

  async remove(id: number, userId: number) {
    await this.commentRepository.destroy({ where: { id, userId } });
    return { message: MESSAGES.SUCCESS_DELETED };
  }
}
