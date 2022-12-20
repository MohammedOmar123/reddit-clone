import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
// https://docs.nestjs.com/pipes#class-validator

export class signupDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
