import { FC } from 'react';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import PostList from './PostList';
import TopPost from '../TopPost/TopPost';

const Home:FC = () => (
  <Box className="home">
    <ToastContainer />
    <PostList />
    <TopPost />
  </Box>
);

export default Home;
