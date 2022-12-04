import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@Inject('Post_REPOSITORY') private postRepository: typeof Post) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const userPosts = await this.getUserPosts(userId);
    // Get the difference time between the first and the fifth post
    if (!this.getDiffTime(userPosts[4].createdAt)) return null;

    const { title, content, image } = createPostDto;
    return await this.postRepository.create({
      title,
      content,
      image,
      userId,
    });
  }

  async getRandomPosts() {
    return await this.postRepository.findAll({
      attributes: { exclude: ['updatedAt'] },
      order: Sequelize.literal('random()'),
      limit: 100,
    });
  }

  async getUserPosts(userId: number) {
    return await this.postRepository.findAll({
      attributes: {
        exclude: ['updatedAt'],
      },
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 5,
    });
  }

  getDiffTime(createdAt: Date): boolean {
    const date = new Date();
    const date2 = new Date(createdAt);
    let diffTime = Math.abs(date2.getTime() - date.getTime()) / 1000;
    diffTime /= 60 * 60;
    if (diffTime < 24) return false;
    return true;
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({
      attributes: { exclude: ['updatedAt'] },
      where: { id },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { title, image, content } = updatePostDto;
    return await this.postRepository.update(
      { title, content, image },
      { where: { id }, returning: true },
    );
  }

  async remove(id: number, userId: number) {
    return await this.postRepository.destroy({
      where: { id, userId },
    });
  }
}
