import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { usersProviders } from '../auth/auth.providers';
import { UserServices } from './user.service';
@Module({
  controllers: [UserController],
  providers: [...usersProviders, UserServices],
})
export class UserModule {}
