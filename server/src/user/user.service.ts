import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/auth/entity';

@Injectable()
export class UserServices {
  constructor(@Inject('USER_REPOSITORY') private UserRepository: typeof User) {}
  async getMe(id: number) {
    return this.UserRepository.findOne({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      where: { id },
    });
  }
}
