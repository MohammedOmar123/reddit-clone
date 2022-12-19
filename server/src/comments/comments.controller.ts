import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { JwtGuard } from '../auth/Guard';
import { GetUser } from '../auth/decorator';
import { CommentDto } from './dto';
import { ParamPipe } from 'src/core';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtGuard)
  @Post(':postId')
  async create(
    @Param('postId', ParamPipe) postId: number,
    @Body()
    createCommentDto: CommentDto,
    @GetUser() userId: number,
  ) {
    return await this.commentsService.create(createCommentDto, userId, postId);
  }

  // Get All comments in the post
  @Get(':postId')
  async findAll(@Param('postId', ParamPipe) postId: number) {
    return await this.commentsService.findAll(postId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.commentsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id', ParamPipe) id: number,
    @Body() updateCommentDto: CommentDto,
    @GetUser() userId: number,
  ) {
    return await this.commentsService.update(id, updateCommentDto, userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id', ParamPipe) id: number, @GetUser() userId: number) {
    return await this.commentsService.remove(id, userId);
  }
}
