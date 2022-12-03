import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { usersProviders } from '../auth/auth.providers';
@Module({
  controllers: [UserController],
  providers: [...usersProviders],
})
export class UserModule {}
