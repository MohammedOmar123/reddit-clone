import { FC } from 'react';

import { Stack, Box } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import CreatePostLabel from '../CreatePostLabel/CreatePostLabel';
import Post from './Post';
import './style.css';

const PostList: FC = () => (
  <Box className="post-section">
    <CreatePostLabel />
    <Stack
      spacing={2}
      alignContent="center"
      alignItems="center"
      className="post-list"
    >
      <Post />
      <Post />
    </Stack>
  </Box>

);

export default PostList;
