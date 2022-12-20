import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { JwtGuard } from '../auth/Guard';
import { GetUser } from 'src/auth/decorator';
import { ParamPipe } from 'src/core';
import { CreateVoteDto } from './dto/createVote.dto';
@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @UseGuards(JwtGuard)
  @Post(':postId')
  async create(
    @Param('postId', ParamPipe) postId: number,
    @GetUser() userId: number,
    @Body() vote: CreateVoteDto,
  ) {
    return await this.voteService.create(postId, userId, +vote.value);
  }

  @Get(':postId')
  async findVotesCount(@Param('postId', ParamPipe) postId: number) {
    return await this.voteService.findVotesCount(postId);
  }

  @UseGuards(JwtGuard)
  @Delete(':postId')
  async remove(
    @Param('postId', ParamPipe) postId: string,
    @GetUser() userId: number,
  ) {
    return await this.voteService.remove(+postId, userId);
  }
}
