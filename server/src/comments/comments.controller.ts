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
import { ParamDto } from '../core/index';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtGuard)
  @Post(':postId')
  async create(
    @Param() dto: ParamDto,
    @Body()
    createCommentDto: CommentDto,
    @GetUser() userId: number,
  ) {
    return await this.commentsService.create(
      createCommentDto,
      userId,
      dto.postId,
    );
  }

  // Get All comments in the post
  @Get(':postId')
  findAll(@Param() dto: ParamDto) {
    return this.commentsService.findAll(+dto.postId);
  }

  @Get(':id')
  findOne(@Param('id') dto: ParamDto) {
    return this.commentsService.findOne(dto.id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') dto: ParamDto,
    @Body() updateCommentDto: CommentDto,
    @GetUser() userId: number,
  ) {
    return await this.commentsService.update(dto.id, updateCommentDto, userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') dto: ParamDto, @GetUser() userId: number) {
    return await this.commentsService.remove(dto.id, userId);
  }
}
