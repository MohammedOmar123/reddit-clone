/* eslint-disable max-len */
import { FC } from 'react';
import { Box, Avatar } from '@mui/material';
import './style.css';
import downFilled from '../../assets/down-filled.png';
import upOutline from '../../assets/outline-up.png';
import imageTest from '../../assets/real.jpg';

const Post: FC = () => (
  <Box className="single-post">
    <Box className="vote-container">
      <img
        src={upOutline}
        alt="vote-up"
        className="vote-up"
      />
      <p>60</p>
      <img
        src={downFilled}
        alt="vote-down"
        className="vote-down"
      />
    </Box>
    <Box className="post-content">
      <Box className="post-author">
        <Avatar className="post-avatar" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/220px-Cristiano_Ronaldo_2018.jpg" alt="" />
        <span>Ahmed Saeed</span>

        <span className="post-date">5 hour ago</span>
      </Box>
      <p className="post-title">
        Lorem ipsum dolor sit, amet consectetur adipisicing.
      </p>
      <p className="post-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque atque voluptatibus alias a, vel nostrum error ut expedita vitae facilis rem, molestiae eos, aspernatur quae minima tempore doloremque omnis quos?</p>
      <Box>
        <img className="post-image" src={imageTest} alt="" />
      </Box>
    </Box>
  </Box>
);

export default Post;
