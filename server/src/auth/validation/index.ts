import * as Joi from 'joi';
import { signupDto } from '../dto/sigup.dto';
import { LoginDto } from '../dto/login.dto';
import { Messages } from 'src/core/constants';

export const signupValidation = (user: signupDto) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),

    password: Joi.string().min(2).max(30).required(),

    email: Joi.string().email().required(),

    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({
        'any.only': 'Passwords are not matched',
      }),
  });

  return schema.validateAsync(user);
};

export const loginValidation = (user: LoginDto) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required().messages({
      'string.min': Messages.FAILED_LOGIN,
      'string.max': Messages.FAILED_LOGIN,
    }),
  });
  return schema.validateAsync(user);
};
