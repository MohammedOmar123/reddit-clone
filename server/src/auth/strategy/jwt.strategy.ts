import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '../entity/user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  async validate(payload: any) {
    try {
      const user = await User.findOne({
        where: { id: payload.id },
      });
      delete user.id;
      return user;
    } catch (error) {
      throw new BadRequestException('This is not valid account');
    }
  }
}

// Explanation for validate function:
// After validating the request, the token will be parsed into the object and
// will be passed into this function, So payload argument here is an object represents the data that
// extracted from the token.
// Then, It will append the values into the user object in the request object
// So you can access the data in the token from the controller using req.user.
// Exactly as we did before in the express.
