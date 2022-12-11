import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { USER_REPOSITORY } from 'src/constants';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    private jwt: JwtService, // We injected jwt service by using dependency injection from JWTModule
  ) {}

  async signup(user: any): Promise<{ accessToken: string }> {
    const isEmailExist = await this.checkEmail(user.email);
    if (isEmailExist)
      throw new BadRequestException('This email is already used');

    const hash = await bcrypt.hash(user.password, 10);

    const result = await this.userRepository.create<User>({
      ...user,
      password: hash,
    });

    return this.createToken(result.id, result.email);
  }

  async login(user: LoginDto): Promise<{ accessToken: string }> {
    const result = await this.checkEmail(user.email);

    if (!result) throw new BadRequestException('Invalid email');

    const isPasswordMatched = await bcrypt.compare(
      user.password,
      result.password,
    );
    if (!isPasswordMatched) throw new BadRequestException('Invalid Password');

    return this.createToken(result.id, result.email);
  }

  async checkEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      attributes: ['id', 'email', 'password'],
      where: { email },
    });
    return user;
  }

  async createToken(
    id: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    console.log('Create token function');
    const token = await this.jwt.signAsync({ id, email });
    return { accessToken: token };
  }
}
