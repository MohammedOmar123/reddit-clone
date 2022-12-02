import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  validate(payload: any) {
    return payload;
  }
}
// Explanation for validate function:
// After validating the request, the token will be parsed into the object and
// will be passed into this function, So payload argument here is an object represents the data that
// extracted from the token.
// Then, It will append the values into the user object in the request object
// So you can access the data in the token from the controller using req.user.
// Exactly as we did before in the express.
