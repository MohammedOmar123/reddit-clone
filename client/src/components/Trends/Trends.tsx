import { FC } from 'react';
import { Box } from '@mui/material';

import banner from '../../assets/banner.png';
import trendsImg from '../../assets/trends.png';
import './style.css';

const Trends:FC = () => (
  <Box className="trends-container">
    <img
      src={banner}
      alt="banner"
      className="trends-banner"
    />
    <Box className="trends-box">
      <img
        src={trendsImg}
        alt=""
      />
      <p> Trends </p>
    </Box>
  </Box>
);

export default Trends;
