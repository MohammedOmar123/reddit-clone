import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreatePostDto } from './dto';
import { UpdatePostDto } from './dto';
import { Post } from './entities';
import { User } from '../auth/entities';

@Injectable()
export class PostService {
  constructor(
    @Inject('Post_REPOSITORY') private postRepository: typeof Post,
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const userPosts = await this.getUserPosts(userId);

    // Get the difference time between the first and the fifth post
    if (userPosts.length > 4 && !this.getDiffTime(userPosts[4].createdAt))
      return null;

    const { title, content, image } = createPostDto;

    return await this.postRepository.create({
      title,
      content,
      image,
      userId,
    });
  }

  async getRandomPosts() {
    return this.postRepository.findAll({
      attributes: { exclude: ['updatedAt'] },
      order: Sequelize.literal('random()'),
      limit: 100,
      include: {
        model: this.userRepository,
        attributes: ['id', 'username', 'image'],
        required: true,
      },
    });
  }

  async getUserPosts(userId: number) {
    return this.postRepository.findAll({
      attributes: {
        exclude: ['updatedAt'],
      },
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 5,
    });
  }

  getDiffTime(createdAt: Date): boolean {
    const currentDate = new Date();
    const postDate = new Date(createdAt);
    let diffTime = Math.abs(postDate.getTime() - currentDate.getTime()) / 1000;
    diffTime /= 60 * 60;
    if (diffTime < 24) return false;
    return true;
  }

  async findOne(id: number) {
    return this.postRepository.findOne({
      attributes: { exclude: ['updatedAt'] },
      where: { id },
      include: {
        model: this.userRepository,
        attributes: ['id', 'username', 'image'],
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const { title, image, content } = updatePostDto;
    return this.postRepository.update(
      { title, content, image },
      { where: { id, userId } },
    );
  }

  async remove(id: number, userId: number) {
    return this.postRepository.destroy({
      where: { id, userId },
    });
  }
}
