import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import image from '../../assets/accountImage.png';
import './style.css';

const Signup:FC = () => (
  <Box className="signup-container">
    <img className="account-image" src={image} alt="signup" />
    <form>
      <div className="signup-intro">
        <h1>Sign up</h1>
        <p>
          By continuing, you are setting up a Reddit
          <br />
          account and agree to our User Agreement and Privacy Policy.
        </p>
      </div>
      <TextField variant="outlined" label="Username" size="small" fullWidth />
      <TextField variant="outlined" label="Email" size="small" fullWidth />
      <TextField variant="outlined" label="Password" size="small" fullWidth />
      <TextField variant="outlined" label="Confirm Password" size="small" fullWidth />

      <Button variant="contained" size="small" fullWidth>Signup</Button>
      <p>
        Already a redditor ?
        {' '}
        <Link to="/login" className="link-login">Log In</Link>
      </p>
    </form>
  </Box>
);

export default Signup;
