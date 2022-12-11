import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField, Button, Typography, Box,
} from '@mui/material';

import image from '../../assets/accountImage.png';
import './style.css';

const Login: FC = () => (
  <Box className="login-container">
    <img className="account-image" src={image} alt="signup" />
    <form>
      <Box>
        <Typography
          variant="h1"
          className="login-title"
          sx={{
            fontSize: '18px',
          }}
        >
          Log in
        </Typography>
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
        <TextField variant="outlined" label="Email" size="small" fullWidth />
        <TextField variant="outlined" label="Password" size="small" fullWidth />
        <Button variant="contained" size="small" fullWidth>Login</Button>
        <p>
          Already a redditor ?
          {' '}
          <Link to="/signup" className="link-signup">Sign up</Link>
        </p>
      </Box>
    </form>
  </Box>
);

export default Login;
