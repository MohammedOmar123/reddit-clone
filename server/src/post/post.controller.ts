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
import { PostService } from './post.service';
import { CreatePostDto } from './dto';
import { UpdatePostDto } from './dto';
import { JwtGuard } from '../auth/Guard';
import { GetUser } from 'src/auth/decorator';
import { ParamPipe } from '../core';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @GetUser() userId: number,
  ) {
    return await this.postService.create(createPostDto, userId);
  }

  @Get()
  async getRandomPosts() {
    return await this.postService.getRandomPosts();
  }

  @UseGuards(JwtGuard)
  @Get('myPosts')
  async getUserPosts(@GetUser() userId: number) {
    return await this.postService.getUserPosts(userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParamPipe) id: number) {
    return await this.postService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() userId: number,
  ) {
    return await this.postService.update(+id, updatePostDto, userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() userId: number) {
    return await this.postService.remove(id, userId);
  }
}
