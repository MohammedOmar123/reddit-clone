import { FC } from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading:FC = () => (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
);

export default Loading;
