/* eslint-disable react/jsx-closing-tag-location */
import { FC, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  TextField, Button, Box,
  IconButton, InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

import { SignupValidation } from '../../validations';
import { ApiService } from '../../services/ApiServices';
import image from '../../assets/accountImage.png';
import './style.css';

const Signup:FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const width = '20px';
  const fontSize = '15px';

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
        await ApiService.post('/api/v1/auth/signup', values);
        setError('');
        navigate('/');
        toast.success(
          'Your account has been created successfully',
          { position: 'bottom-center', style: { width: '400px' } },
        );
      } catch (err: any) {
        setError(err.response.data.message);
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
        <Box className="signup-box">
          <Box className="signup-intro">
            <h1>Sign up</h1>
            <p>
              By continuing, you are setting up a Reddit
              <br />
              account and agree to our User Agreement and Privacy Policy.
            </p>
          </Box>
          <Box className="signup-boxInputs">
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ style: { fontSize } }}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ style: { fontSize } }}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ style: { fontSize } }}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                  >
                    { showPassword ? <Visibility sx={{ width }} />
                      : <VisibilityOff sx={{ width }} />}
                  </IconButton>
                </InputAdornment>,
              }}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              onChange={formik.handleChange}
              variant="outlined"
              size="small"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputLabelProps={{ style: { fontSize } }}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                  >
                    { showPassword ? (<Visibility sx={{ width }} />)
                      : (<VisibilityOff sx={{ width }} />
                      )}
                  </IconButton>
                </InputAdornment>,
              }}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Box>
        </Box>
        <Button type="submit" variant="contained" size="small" fullWidth>Signup</Button>
        { error && (
        <p className="signup-error">
          { error }
        </p>
        )}
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
