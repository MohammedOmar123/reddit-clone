import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServices } from './user.services';
import { usersProviders } from '../auth/auth.providers';
@Module({
  controllers: [UserController],
  providers: [UserServices, ...usersProviders],
})
export class UserModule {}
