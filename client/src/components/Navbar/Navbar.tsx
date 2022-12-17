import { FC } from 'react';
import {
  Button, Toolbar, Box, AppBar, OutlinedInput, InputAdornment, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../assets/logo.jpg';
import './style.css';

const Navbar:FC = () => {
  const Navigate = useNavigate();
  const buttonsStyle = {
    backgroundColor: '#d93a00',
    color: 'white',
    width: '120px',
    borderRadius: '20px',
    textTransform: 'capitalize',
    fontSize: '14px',
    height: '35px',
    fontWeight: '700',
    fontFamily: 'sans-serif',
    ':hover': {
      background: '#dd3822',
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" className="navbar-appBar">
        <Toolbar className="navbar-toolbar">
          <Box className="logo-container">
            <img src={logo} alt="logo" className="navbar-logo" />
            <Typography variant="h2" className="reddit">
              reddit
            </Typography>
          </Box>

          <OutlinedInput
            placeholder="Search Reddit"
            sx={{ borderRadius: '10px' }}
            endAdornment={
              <InputAdornment position="end"><SearchIcon /></InputAdornment>
          }
          />

          <Box className="navbar-buttons-container">
            <Button
              onClick={():void => {
                Navigate('login');
              }}
              className="navbar-buttons"
              variant="contained"
              sx={{
                ...buttonsStyle,
                backgroundColor: '#edeff1',
                color: 'black',
                ':hover': {
                  background: '#edeff1',
                },
              }}
            >
              Log in
            </Button>

            <Button
              onClick={():void => {
                Navigate('signup');
              }}
              variant="contained"
              className="navbar-buttons"
              sx={buttonsStyle}
            >
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
