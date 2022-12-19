import {
  Injectable,
  Inject,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreatePostDto, UpdatePostDto } from './dto';
import { Post } from './entities';
import { User } from '../auth/entity';
import { POST_REPOSITORY, USER_REPOSITORY, Messages } from 'src/core/constants';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY) private postRepository: typeof Post,
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const userPosts = await this.getUserPosts(userId);

    // Get the difference time between the first and the fifth post
    if (userPosts.length > 4 && !this.getDiffTime(userPosts[4].createdAt))
      throw new ForbiddenException(Messages.FORBIDDEN_POST);

    const { title, content, image } = createPostDto;
    try {
      const post = await this.postRepository.create({
        title,
        content,
        image,
        userId,
      });
      return { message: Messages.SUCCESS_ADD, post };
    } catch (error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new BadRequestException('This account is not valid');
      }
    }
  }

  getDiffTime(createdAt: Date): boolean {
    const currentDate = new Date();
    const postDate = new Date(createdAt);
    let diffTime = Math.abs(postDate.getTime() - currentDate.getTime()) / 1000;
    diffTime /= 60 * 60;
    if (diffTime < 24) return false;
    return true;
  }

  async getRandomPosts() {
    const posts = this.postRepository.findAll({
      attributes: { exclude: ['updatedAt'] },
      order: Sequelize.literal('random()'),
      limit: 100,
      include: {
        model: this.userRepository,
        attributes: ['id', 'username', 'image'],
        required: true,
      },
    });
    return posts;
  }

  async getUserPosts(userId: number) {
    const userPosts = this.postRepository.findAll({
      attributes: {
        exclude: ['updatedAt'],
      },
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 5,
    });
    return userPosts;
  }

  async findOne(id: number) {
    const post = this.postRepository.findOne({
      attributes: { exclude: ['updatedAt'] },
      where: { id },
      include: {
        model: this.userRepository,
        attributes: ['id', 'username', 'image'],
        required: true,
      },
    });
    return post;
  }

  async checkPostExist(id: number) {
    const post = await this.postRepository.findByPk(id);
    if (!post) throw new NotFoundException('this post does not exist anymore');
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const { title, image, content } = updatePostDto;
    const [affectedRows] = await this.postRepository.update(
      { title, content, image },
      { where: { id, userId } },
    );
    if (!affectedRows) throw new BadRequestException(Messages.FAILED_DELETED);
    return { message: Messages.SUCCESS_UPDATED };
  }

  async remove(id: number, userId: number) {
    const affectedRows = await this.postRepository.destroy({
      where: { id, userId },
    });
    if (!affectedRows) throw new BadRequestException(Messages.FAILED_DELETED);
    return { message: Messages.SUCCESS_DELETED };
  }
}
