import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateReplyDto } from './dto';
import { Replay } from './entities/';
import { User } from '../auth/entity';
import { REPLAY_REPOSITORY, USER_REPOSITORY } from 'src/core/constants';
import { CommentsService } from '../comments/comments.service';
import { Op } from 'sequelize';
import { Messages } from '../core/constants';

@Injectable()
export class RepliesService {
  constructor(
    @Inject(REPLAY_REPOSITORY)
    private replayRepository: typeof Replay,
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    private commentService: CommentsService,
  ) {}

  async create(createReplyDto: CreateReplyDto, userId: number) {
    const { commentId, replayId, content } = createReplyDto;

    // check the comment and the replay if they are still exist
    if (replayId) {
      const replay = await this.findOne(replayId);
      if (!replay) throw new NotFoundException();
    }
    if (commentId) await this.commentService.checkCommentExists(commentId);

    const replay = await this.replayRepository.create({
      userId,
      content,
      commentId,
      replayId,
    });
    return { replay, message: Messages.SUCCESS_ADD };
  }

  async findAllReplies(CommRepId: number) {
    const replies = await this.replayRepository.findAll({
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
        attributes: ['username', 'image'],
      },
      order: [['createdAt', 'DESC']],
    });
    return replies;
  }

  async findOne(id: number) {
    const replay = this.replayRepository.findByPk(id);
    return replay;
  }

  async update(id: number, content: string, userId: number) {
    const [affectedRows, [replay]] = await this.replayRepository.update(
      {
        content,
      },
      {
        where: { id, userId },
        returning: true,
      },
    );
    if (!affectedRows) throw new NotFoundException();
    return { message: Messages.SUCCESS_UPDATED, replay };
  }

  async remove(id: number, userId: number) {
    const affectedRows = this.replayRepository.destroy({
      where: { id, userId },
    });
    if (!affectedRows) throw new NotFoundException();
    return { message: Messages.SUCCESS_UPDATED };
  }
}
