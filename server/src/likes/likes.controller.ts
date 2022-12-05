import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
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
    @Param('postId', ParseIntPipe) postId: string,
    @GetUser() userId: number,
  ) {
    const result = await this.likesService.create(+postId, userId);
    if (!result) throw new NotFoundException();
    return result[0];
  }

  @Get(':postId')
  findAll(@Param('postId', ParseIntPipe) postId: string) {
    return this.likesService.findLikesCount(+postId);
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
