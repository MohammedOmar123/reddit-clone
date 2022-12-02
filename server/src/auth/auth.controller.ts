import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, signupDto } from './dto';

@Controller('auth')
export class UserController {
  constructor(private AuthService: AuthService) {}
  @Post('/signup')
  signup(@Body() user: signupDto) {
    return this.AuthService.signup(user);
  }
  @Post('/login')
  login(@Body() user: LoginDto) {
    return this.AuthService.login(user);
  }
}
// Pipes
// https://docs.nestjs.com/pipes
// There is two cases to use pipes:- First for validation and we can use ValidationPipe for that.
// or transforming data and there is many built in pipes for that like ParseIntPipe.
// https://docs.nestjs.com/techniques/validation
// So, We can use Pipes for transforming the data
