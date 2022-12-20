import { FC } from 'react';
import { Stack, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import CreatePostLabel from '../CreatePostLabel/CreatePostLabel';
import TopPost from '../TopPost/TopPost';
import 'react-toastify/dist/ReactToastify.css';
import Post from './Post';
import './style.css';

const PostList: FC = () => (
  <Box style={{
    backgroundColor: '#DAE0E6',
    display: 'flex',
    justifyContent: 'center',
    // border: '2px solid black',
  }}
  >
    <ToastContainer />
    <Box
      style={{
        backgroundColor: '#DAE0E6',
        display: 'flex',
        flexDirection: 'column',
        // border: '2px solid blue',
        alignItems: 'center',
        marginLeft: '300px',
      }}
    >
      <CreatePostLabel />
      <Stack
        spacing={2}
        alignContent="center"
        alignItems="center"
        sx={{
          margin: 'auto', marginTop: '20px', width: '600px',
        }}
      >
        <Post />
        <Post />
      </Stack>
    </Box>

    <TopPost />
  </Box>
);

export default PostList;
