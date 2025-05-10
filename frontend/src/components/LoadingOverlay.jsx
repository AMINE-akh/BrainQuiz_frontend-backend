import React from 'react';
import { Box } from '@mui/material';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json';

const LoadingOverlay = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 9999,
      }}
    >
      <Box sx={{ width: 200, height: 200 }}>
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
    </Box>
  );
};

export default LoadingOverlay; 