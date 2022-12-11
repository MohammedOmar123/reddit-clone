import { Length, IsNotEmpty, IsEmail } from 'class-validator';
// https://docs.nestjs.com/pipes#class-validator

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(2, 30)
  password: string;
}
