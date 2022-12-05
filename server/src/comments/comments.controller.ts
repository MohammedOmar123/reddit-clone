import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto';

import { JwtGuard } from '../auth/Guard';
import { GetUser } from '../auth/decorator';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtGuard)
  @Post(':postId')
  async create(
    @Param('postId', ParseIntPipe) postId: string,
    @Body()
    createCommentDto: CommentDto,
    @GetUser() userId: number,
  ) {
    try {
      await this.commentsService.create(createCommentDto, userId, +postId);
      return { message: 'Comment added successfully' };
    } catch (error) {
      throw new NotFoundException('This Post does not exist anymore');
    }
  }

  // Get All comments in the post
  @Get(':postId')
  findAll(@Param('postId', ParseIntPipe) postId: string) {
    return this.commentsService.findAll(+postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: CommentDto,
    @GetUser() userId: number,
  ) {
    const [affectedRows] = await this.commentsService.update(
      +id,
      updateCommentDto,
      userId,
    );

    if (!affectedRows) throw new NotFoundException();
    return { message: 'Comment updated successfully' };
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() userId: number) {
    const result = await this.commentsService.remove(+id, userId);
    if (!result) throw new NotFoundException();
    return { message: 'Comment deleted successfully' };
  }
}
