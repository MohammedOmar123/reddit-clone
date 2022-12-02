import { Inject, Injectable } from '@nestjs/common';
import { User } from '../auth/entity/user.entity';
@Injectable()
export class UserServices {
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User) {}
  async getMe(user: Partial<User>) {
    return await this.userRepository.findOne({
      attributes: ['id', 'username', 'email', 'gender'],
      where: {
        id: user.id,
      },
    });
  }
}
