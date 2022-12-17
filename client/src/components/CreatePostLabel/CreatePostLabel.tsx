/* eslint-disable max-len */
import { FC } from 'react';
import { TextField, Box, Avatar } from '@mui/material';
import './style.css';

const CreatePostLabel:FC = () => (
  <Box
    className="create-post-label-box"
    width="600px"
    height="60px"
    maxHeight="60px"
  >
    <Avatar
      sx={{ marginLeft: '5px' }}
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/220px-Cristiano_Ronaldo_2018.jpg"
      alt=""
    />
    <TextField
      placeholder="Create Post"
      fullWidth
      variant="outlined"
      sx={{ paddingRight: '10px' }}

    />
  </Box>
);

export default CreatePostLabel;
