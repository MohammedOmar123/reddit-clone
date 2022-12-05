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
import { CreatePostDto } from './dto';
import { UpdatePostDto } from './dto';
import { JwtGuard } from '../auth/Guard';
import { GetUser } from 'src/auth/decorator';
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
        'You can just add 5 posts per day, Please try again in 24 hours',
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
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.findOne(id);
    if (!post) throw new NotFoundException('This post does not exist anymore');
    return post;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() userId: number,
  ) {
    const [affectedRows] = await this.postService.update(
      +id,
      updatePostDto,
      userId,
    );

    if (!affectedRows) throw new NotFoundException();
    return { message: 'Post updated Successfully' };
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() userId: number,
  ) {
    const affectedRows = await this.postService.remove(id, userId);
    if (!affectedRows) throw new NotFoundException();
    return { message: 'Post deleted Successfully' };
  }
}
