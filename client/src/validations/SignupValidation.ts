import * as yup from 'yup';

const signupValidation = yup.object({
  username: yup.string().max(21).min(4).required(),
  email: yup.string().email().required(),
  password: yup.string().max(21).min(5).required(),
  confirmPassword: yup.string().required('Confirm Password')
    .oneOf([yup.ref('password'), null], 'Password must be match'),
});

export default signupValidation;
