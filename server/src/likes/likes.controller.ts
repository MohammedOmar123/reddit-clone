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
import { JwtGuard } from '../auth/Guard/jwt.Guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '../auth/entity/user.entity';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @UseGuards(JwtGuard)
  @Post(':postId')
  async create(
    @Param('postId', ParseIntPipe) postId: string,
    @GetUser() user: User,
  ) {
    const result = await this.likesService.create(+postId, user.dataValues.id);
    if (!result) throw new NotFoundException();
    return result[0];
  }

  @Get()
  findAll() {
    return this.likesService.findLikesCount();
  }

  @UseGuards(JwtGuard)
  @Delete(':postId')
  async remove(
    @Param('postId', ParseIntPipe) postId: string,
    @GetUser() user: User,
  ) {
    await this.likesService.remove(+postId, user.dataValues.id);
    return { message: 'Like deleted successfully' };
  }
}
