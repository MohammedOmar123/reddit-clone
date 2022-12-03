import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/auth/entity/user.entity';
import { JwtGuard } from 'src/auth/Guard';
import { UserServices } from './user.service';
@Controller('users')
export class UserController {
  constructor(private userServices: UserServices) {}
  @UseGuards(JwtGuard)
  @Get('me')
  // Here we will create a custom decorator that will go in the request object and get that user object
  // and return it back to us
  GetMe(@GetUser() id: number) {
    return this.userServices.getMe(id);
  }
}
// This is a protected route so we need to verify the token when the user sends a request to this endpoint.
// So here we need to use UseGuard because it determines whether a given request will be handled by the route handler or not.
// And the condition that will be set in the useGuard is AuthGuard that provided from nestjs/passport
// and we will pass our strategy name to AuthGuard to implement it.

// Strategy Name class JwtStrategy extends PassportStrategy(Strategy, 'jwt') ;
// the second argument is the strategy name and is optional and the default name here is jwt

// Request interface from express and @Req from nest
