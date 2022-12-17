/* eslint-disable max-len */
import { FC } from 'react';
import {
  Box, Typography, Avatar, ListItemAvatar, ListItemText, Divider, ListItem, List,
} from '@mui/material';
import Trends from '../Trends/Trends';
import './style.css';

const TopPost:FC = () => (
// set boolean state if is the last post don't create divider.
// because we want to remove it from last one.
  <Box className="top-post-container">
    <Trends />
    <List
      sx={{
        maxWidth: 300,
        bgcolor: 'background.paper',
      }}
      className="top-posts-list"
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://www.deutschland.de/sites/default/files/media/image/2018-fif-world-cup-toni-kroos.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={(
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors-
              </Typography>
              <p style={{ display: 'inline' }}>
                {" I'll be in your neighborhood doing errands this…"}
              </p>

            </>
            )}
        />
      </ListItem>
      <Divider
        variant="inset"
        component="li"
        style={{
          width: '100%',
          marginLeft: '0px',
        }}
      />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://img.a.transfermarkt.technology/portrait/big/28003-1631171950.jpg?lm=1" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={(
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors-
              </Typography>
              <p style={{ display: 'inline' }}>
                {' '}
                {" I'll be in your neighborhood doing errands this…"}

              </p>

            </>
            )}
        />
      </ListItem>
      <Divider
        variant="inset"
        component="li"
        style={{
          width: '100%',
          marginLeft: '0px',
        }}
      />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="data:image/jpeg;base64,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" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={(
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors-
              </Typography>
              <p style={{ display: 'inline' }}>
                {' '}
                {" I'll be in your neighborhood doing errands this…"}

              </p>

            </>
            )}
        />
      </ListItem>
      <Divider
        variant="inset"
        component="li"
        style={{
          width: '100%',
          marginLeft: '0px',
        }}
      />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://people.com/thmb/VBdG06GGvCn2rCm03zAC-j97zpw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x349:751x351)/david-beckham-db59d398bd70483e806bfc847ec699de.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={(
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors-
              </Typography>
              <p style={{ display: 'inline' }}>
                {' '}
                {" I'll be in your neighborhood doing errands this…"}

              </p>

            </>
            )}
        />
      </ListItem>
    </List>
  </Box>
);

export default TopPost;
