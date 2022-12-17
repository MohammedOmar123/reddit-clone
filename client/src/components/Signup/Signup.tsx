/* eslint-disable react/jsx-closing-tag-location */
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  TextField, Button, Box,
  IconButton, InputAdornment,
} from '@mui/material';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SignupValidation } from '../../validations';
import image from '../../assets/accountImage.png';
import './style.css';

const Signup:FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = ():void => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/auth/signup', values);
        console.log(response);
      } catch (error) {
        console.log('error');
        console.log(error);
      }
    },
  });
  return (
    <Box className="signup-container">
      <img className="account-image" src={image} alt="signup" />
      <form onSubmit={(e): void => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      >
        <div className="signup-intro">
          <h1>Sign up</h1>
          <p>
            By continuing, you are setting up a Reddit
            <br />
            account and agree to our User Agreement and Privacy Policy.
          </p>
        </div>
        <TextField
          id="username"
          name="username"
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          variant="outlined"
          label="username"
          size="small"
          fullWidth
        />
        <TextField
          id="email"
          name="email"
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant="outlined"
          label="email"
          size="small"
          fullWidth
        />
        <TextField
          id="password"
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
              >
                { showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>,
          }}
          name="password"
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          variant="outlined"
          label="password"
          size="small"
          type={showPassword ? 'text' : 'password'}
          fullWidth
        />
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
              >
                { showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>,
          }}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          variant="outlined"
          label="confirm password"
          size="small"
          type={showPassword ? 'text' : 'password'}
          fullWidth
        />

        <Button type="submit" variant="contained" size="small" fullWidth>Signup</Button>
        <p>
          Already a redditor ?
          {' '}
          <Link to="/login" className="link-login">Log In</Link>
        </p>
      </form>
    </Box>
  );
};

export default Signup;
