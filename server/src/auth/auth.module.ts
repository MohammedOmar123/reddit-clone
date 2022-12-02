import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { usersProviders } from './auth.providers';
import { UserController } from './auth.controller';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWTKEY })],
  controllers: [UserController],
  providers: [AuthService, ...usersProviders, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
// We imported JWtModule to generate the access token, and because we use it just in the auth use case,
// We don't have to import it globally as the config module.

// Every module has services, so we can import jwt services inside the auth.services.
// And we use injection dependency to imported it, because it's injectable as other services.
