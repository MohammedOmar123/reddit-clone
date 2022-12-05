import { Injectable, Inject } from '@nestjs/common';
import { CreateReplyDto } from './dto';
import { UpdateReplyDto } from './dto';
import { Replay } from './entities/';
import { CommentsService } from '../comments/comments.service';
import { User } from '../auth/entity';
import { Op } from 'sequelize';

@Injectable()
export class RepliesService {
  constructor(
    @Inject('Replay_REPOSITORY')
    private replayRepository: typeof Replay,
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
    private commentService: CommentsService,
  ) {}

  async create(createReplyDto: CreateReplyDto, userId: number) {
    const { commentId, replayId, content } = createReplyDto;
    if (!commentId && !replayId) throw new Error('400');
    // check the comment and the replay if they are still exist
    if (replayId) {
      const replay = await this.findOne(replayId);
      if (!replay) throw new Error('404');
    } else {
      const comment = await this.commentService.findOneById(commentId);
      if (!comment) throw new Error('404');
    }

    return await this.replayRepository.create({
      userId,
      content,
      commentId,
      replayId,
    });
  }

  async findAllReplies(CommRepId: number) {
    return this.replayRepository.findAll({
      attributes: { exclude: ['updatedAt', 'replayId'] },
      where: {
        [Op.or]: [
          {
            commentId: CommRepId,
          },
          {
            replayId: CommRepId,
          },
        ],
      },
      include: {
        model: this.userRepository,
        attributes: ['id', 'username'],
      },
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number) {
    return this.replayRepository.findByPk(id);
  }

  async update(id: number, updateReplyDto: UpdateReplyDto, userId: number) {
    const { content } = updateReplyDto;
    return this.replayRepository.update(
      {
        content,
      },
      {
        where: { id, userId },
      },
    );
  }

  async remove(id: number, userId: number) {
    return this.replayRepository.destroy({
      where: { id, userId },
    });
  }
}
