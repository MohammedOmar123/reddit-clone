import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  BadRequestException,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto';
import { UpdateReplyDto } from './dto';
import { JwtGuard } from '../auth/Guard';
import { GetUser } from 'src/auth/decorator';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() createReplyDto: CreateReplyDto,
    @GetUser() userId: number,
  ) {
    try {
      await this.repliesService.create(createReplyDto, userId);
      return 'Replay added successfully';
    } catch (error) {
      if (error == 400) throw new BadRequestException();
      throw new NotFoundException();
    }
  }

  @Get('comment/:commentId')
  async findAllRepliesForComment(
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return await this.repliesService.findAllReplies(commentId);
  }

  @Get(':replayId')
  findAllRepliesForReplay(@Param('replayId', ParseIntPipe) replayId: number) {
    return this.repliesService.findAllReplies(replayId);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReplyDto: UpdateReplyDto,
    @GetUser() userId: number,
  ) {
    const [affectedRows] = await this.repliesService.update(
      id,
      updateReplyDto,
      userId,
    );
    if (!affectedRows) throw new NotFoundException();
    return { message: 'replay updated successfully' };
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() userId: number,
  ) {
    const affectedRows = await this.repliesService.remove(id, userId);
    if (!affectedRows) throw new NotFoundException();
    return { message: 'replay deleted successfully' };
  }
}
