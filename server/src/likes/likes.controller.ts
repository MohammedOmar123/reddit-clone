import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtGuard } from '../auth/Guard';
import { GetUser } from 'src/auth/decorator';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @UseGuards(JwtGuard)
  @Post(':postId')
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser() userId: number,
  ) {
    await this.likesService.create(postId, userId);
    return { message: 'like added successfully' };
  }

  @Get(':postId')
  async findLikesCount(@Param('postId', ParseIntPipe) postId: number) {
    return { likes: await this.likesService.findLikesCount(postId) };
  }

  @UseGuards(JwtGuard)
  @Delete(':postId')
  async remove(
    @Param('postId', ParseIntPipe) postId: string,
    @GetUser() userId: number,
  ) {
    await this.likesService.remove(+postId, userId);
    return { message: 'Like deleted successfully' };
  }
}
