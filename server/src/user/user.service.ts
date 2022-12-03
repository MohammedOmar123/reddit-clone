import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class UserServices {
  constructor(@Inject('USER_REPOSITORY') private UserRepository: typeof User) {}
  async getMe(id: number) {
    return this.UserRepository.findOne({
      where: { id },
    });
  }
}
