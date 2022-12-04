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
  ForbiddenException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtGuard } from '../auth/Guard/jwt.Guard';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/auth/entity/user.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @GetUser() userId: number,
  ) {
    const result = await this.postService.create(createPostDto, userId);
    if (!result)
      throw new ForbiddenException(
        'You can just add 5 posts per day, Please try again in 24 jours',
      );
    return { message: 'Post created successfully' };
  }

  @Get()
  async getRandomPosts() {
    return await this.postService.getRandomPosts();
  }

  @UseGuards(JwtGuard)
  @Get('myPosts/')
  async getUserPosts(@GetUser() userId: number) {
    return await this.postService.getUserPosts(userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    const post = await this.postService.findOne(+id);
    if (!post) throw new NotFoundException('This post does not exist anymore');
    return post;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const [affectedRows, result] = await this.postService.update(
      +id,
      updatePostDto,
    );

    if (!affectedRows) throw new NotFoundException();
    return result[0];
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string, @GetUser() user: User) {
    const affectedRows = await this.postService.remove(+id, user.dataValues.id);
    if (!affectedRows) throw new NotFoundException();
    return { message: 'Post deleted Successfully' };
  }
}
