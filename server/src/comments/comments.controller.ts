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
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtGuard } from '../auth/Guard/jwt.Guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtGuard)
  @Post(':postId')
  async create(
    @Param('postId', ParseIntPipe) postId: string,
    @Body()
    createCommentDto: CreateCommentDto,
    @GetUser() userId: number,
  ) {
    const result = await this.commentsService.create(
      createCommentDto,
      userId,
      +postId,
    );
    if (!result)
      throw new NotFoundException('This Post does not exist anymore');
    return 'Comment added successfully';
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
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() userId: number,
  ) {
    const [affectedRows, post] = await this.commentsService.update(
      +id,
      updateCommentDto,
      userId,
    );

    if (!affectedRows) throw new NotFoundException();
    return post[0];
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() userId: number) {
    const result = await this.commentsService.remove(+id, userId);
    if (!result) throw new NotFoundException();
    return 'Comment Deleted Successfully';
  }
}
