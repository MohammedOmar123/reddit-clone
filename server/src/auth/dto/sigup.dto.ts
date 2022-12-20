import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
// https://docs.nestjs.com/pipes#class-validator

export class signupDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 21)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  confirmPassword: string;
}
