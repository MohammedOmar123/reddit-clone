import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { JwtGuard } from '../auth/Guard';
import { GetUser } from 'src/auth/decorator';

@Controller('likes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @UseGuards(JwtGuard)
  @Post(':postId')
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser() userId: number,
  ) {
    await this.voteService.create(postId, userId);
    return { message: 'like added successfully' };
  }

  @Get(':postId')
  async findLikesCount(@Param('postId', ParseIntPipe) postId: number) {
    return { likes: await this.voteService.findLikesCount(postId) };
  }

  @UseGuards(JwtGuard)
  @Delete(':postId')
  async remove(
    @Param('postId', ParseIntPipe) postId: string,
    @GetUser() userId: number,
  ) {
    await this.voteService.remove(+postId, userId);
    return { message: 'Like deleted successfully' };
  }
}
