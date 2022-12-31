import { FC } from 'react';

import {
  OutlinedInput, Box, Button,
  Divider, MenuItem, MenuList, Paper, ListItem,
} from '@mui/material';

import { rulesData } from '../../data';
import image from '../../assets/post.jpg';
import './style.css';

const AddPost: FC = () => (
  <Box className="add-post-container">
    <Box className="add-post-details">
      <h1>Create a post</h1>

      <Box className="add-post-form">
        <OutlinedInput
          className="add-post-title"
          placeholder="Title"
          style={{ width: '90%' }}
        />
        <OutlinedInput
          className="text-area"
          placeholder="text(optional)"
          style={{ width: '90%' }}
          multiline
          minRows={6}
          maxRows={6}
        />

        <Box className="add-post-buttons">
          <Button variant="outlined" className="add-post-btn">Add Image</Button>
          <Button variant="outlined" className="add-post-btn">Save</Button>
        </Box>
      </Box>

    </Box>
    <Paper className="add-post-paper">
      <MenuList>
        <MenuItem>
          <ListItem className="add-post-menu-item">
            <img src={image} alt="rules" style={{ width: '40px' }} />
            Posting To Reddit
          </ListItem>
        </MenuItem>
        <Divider />

        { rulesData.map((rule) => (
          <>
            <MenuItem style={{ height: '30px' }}>
              <ListItem className="listItem-rules">
                <p>{rule}</p>
              </ListItem>
            </MenuItem>
            <Divider />
          </>
        ))}
      </MenuList>
    </Paper>
  </Box>
);

export default AddPost;
