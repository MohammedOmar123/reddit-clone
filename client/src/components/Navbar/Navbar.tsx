import React, { FC, useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Button, Toolbar, Box, AppBar, OutlinedInput, InputAdornment, Typography,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import { Home, KeyboardArrowDown, Search } from '@mui/icons-material';

import { AuthContext } from '../context/AuthContext';
import { JwtService } from '../../services/JwtServices';
import logo from '../../assets/logo.jpg';
import avatar from '../../assets/avatar.png';
import './style.css';

const Navbar:FC = () => {
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement >();
  const [open, setOpen] = useState<boolean>(false);
  const user = useContext(AuthContext);

  const handleClose = ():void => {
    setAnchorEl(null);
    setOpen(false);
    window.location.reload();
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>):void => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleLogout = ():void => {
    JwtService.removeToken();
  };

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
          <Box className="title-container">
            <Box className="logo-box">
              <img src={logo} alt="logo" className="navbar-logo" />
              <Typography variant="h2" className="reddit">
                reddit
              </Typography>
            </Box>
            { user && (
            <Box className="home-box">
              { user && <Home className="home-icon" /> }
              <Typography variant="caption" className="home-caption">Home</Typography>
            </Box>
            ) }

          </Box>

          <OutlinedInput
            placeholder="Search Reddit"
            sx={{ borderRadius: '10px' }}
            endAdornment={
              <InputAdornment position="end"><Search /></InputAdornment>
          }
          />
          { user ? (
            <Box className="navbar-userContainer">
              <Box className="navbar-userInfo">
                <img src={avatar} alt="" className="navbar-userImage" />
                <Box>
                  <p className="username">Ahmed Omar</p>
                  <p className="karma">1 Karma</p>
                </Box>
              </Box>
              <button type="button" className="button-menu" onClick={handleOpen}>
                <KeyboardArrowDown className="KeyboardArrowDownIcon" />
              </button>
              <Menu
                onClose={handleClose}
                anchorEl={anchorEl}
                open={open}
                PaperProps={{ style: { backgroundColor: '#fff', width: '150px' } }}
              >
                <MenuItem
                  onClick={handleClose}
                  style={{
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontFamily: 'Trebuchet MS',
                  }}
                >
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={handleClose}
                  style={{
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontFamily: 'Trebuchet MS',

                  }}
                >
                  Add Post
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={():void => {
                    handleClose();
                    handleLogout();
                  }}
                  style={{
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontFamily: 'Trebuchet MS',
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )
            : (
              <Box className="navbar-buttons-container">
                <Button
                  onClick={():void => { Navigate('login'); }}
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
                  onClick={():void => { Navigate('signup'); }}
                  variant="contained"
                  className="navbar-buttons"
                  sx={buttonsStyle}
                >
                  Sign up
                </Button>
              </Box>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
