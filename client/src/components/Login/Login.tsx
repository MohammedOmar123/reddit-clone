import { FC, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import {
  TextField, Button, Typography, Box,
} from '@mui/material';
import { useFormik } from 'formik';

import { ApiService, JwtService } from '../../services';
import { loginValidation } from '../../validations';
import Loading from '../Loading/Loading';
import image from '../../assets/accountImage.png';
import './style.css';

const Login: FC = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const fontSize = '15px';

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await ApiService.post('/api/v1/auth/login', values);
        JwtService.setToken(response.data.accessToken);
        setError('');
        navigate('/');
        setIsLoading(false);
      } catch (err: any) {
        setError(err.response.data.message);
      }
    },
  });

  return (
    <Box className="login-container">
      <img className="account-image" src={image} alt="signup" />
      <form onSubmit={(e): void => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      >
        <Box>
          <h1 className="login-title">
            Log in
          </h1>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: '11px',
              marginTop: '10px',
            }}
          >
            By continuing, you agree to our User Agreement and Privacy Policy.
          </Typography>

        </Box>
        <Box className="fields">
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            size="small"
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            InputLabelProps={{ style: { fontSize } }}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            fullWidth
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputLabelProps={{ style: { fontSize } }}
          />
          <Button type="submit" variant="contained" size="small" fullWidth>Login</Button>
          { error && <p className="signup-error">{error}</p> }
          <p className="login-noAccount">
            Already a redditor ?
            {' '}
            <Link to="/signup" className="link-signup">Sign up</Link>
          </p>
        </Box>
        { isLoading && <Loading /> }
      </form>
    </Box>
  );
};

export default Login;
