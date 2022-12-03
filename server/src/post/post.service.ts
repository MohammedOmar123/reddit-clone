import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@Inject('Post_REPOSITORY') private postRepository: typeof Post) {}
  async create(createPostDto: CreatePostDto, userId: number) {
    const { title, content, image } = createPostDto;
    return await this.postRepository.create({
      title,
      content,
      image,
      userId,
    });
  }

  async findAll() {
    return await this.postRepository.findAll({
      attributes: { exclude: ['updatedAt'] },
      order: [['createdAt', 'ASC']],
    });
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
