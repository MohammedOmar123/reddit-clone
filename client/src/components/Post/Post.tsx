/* eslint-disable max-len */
import { FC } from 'react';

import { Box, Avatar } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import downFilled from '../../assets/down-filled.png';
import upOutline from '../../assets/outline-up.png';
import imageTest from '../../assets/real.jpg';
import './style.css';
import { IPostProps } from '../../interfaces/IPostProps';

const Post: FC<IPostProps> = ({ user }:IPostProps) => (
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
        {user?.image ? <Avatar className="post-avatar" src={user?.image} />
          : <Avatar className="post-avatar">{user?.username[0]}</Avatar>}
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
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '4px',
        marginBottom: '5px',
      }}
      >
        <ChatBubbleOutlineIcon
          className="commentIcon"
        />
        <p className="post-comments">
          77
          Comments
        </p>
      </Box>
    </Box>
  </Box>
);
export default Post;
