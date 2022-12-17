import { Length, IsString, IsNotEmpty, IsEmail } from 'class-validator';
// https://docs.nestjs.com/pipes#class-validator

export interface signupDto {
  username: string;
  email: string;

  password: string;

  confirmPassword: string;
}
