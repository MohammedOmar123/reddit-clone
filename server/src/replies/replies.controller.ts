import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto, UpdateReplyDto } from './dto';
import { JwtGuard } from '../auth/Guard';
import { GetUser } from 'src/auth/decorator';
import { ParamPipe } from '../core/ParamPipe';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() createReplyDto: CreateReplyDto,
    @GetUser() userId: number,
  ) {
    return await this.repliesService.create(createReplyDto, userId);
  }

  @Get('comment/:commentId')
  async findAllRepliesForComment(
    @Param('commentId', ParamPipe) commentId: number,
  ) {
    return await this.repliesService.findAllReplies(commentId);
  }

  @Get(':replayId')
  findAllRepliesForReplay(@Param('replayId', ParamPipe) replayId: number) {
    return this.repliesService.findAllReplies(replayId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id', ParamPipe) id: number,
    @Body() updateReplyDto: UpdateReplyDto,
    @GetUser() userId: number,
  ) {
    return await this.repliesService.update(id, updateReplyDto.content, userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id', ParamPipe) id: number, @GetUser() userId: number) {
    const affectedRows = await this.repliesService.remove(id, userId);
    if (!affectedRows) throw new NotFoundException();
    return { message: 'replay deleted successfully' };
  }
}
