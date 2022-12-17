import { Length, IsString, IsNotEmpty, IsEmail } from 'class-validator';
// https://docs.nestjs.com/pipes#class-validator

export class signupDto {
  @IsString()
  @Length(2, 30)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(2, 30)
  password: string;

  @IsString()
  @Length(2, 30)
  confirmPassword: string;
}
