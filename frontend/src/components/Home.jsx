import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import Lottie from 'lottie-react';
import animation1 from '../assets/animation1.json';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/categories');
    } else {
      navigate('/login');
    }
  };

  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)', // Subtract navbar height
      width: '100%',
      bgcolor: 'background.default',
      position: 'fixed',
      top: '64px', // Navbar height
      left: 0,
      overflow: 'hidden'
    }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Grid container spacing={4} alignItems="center" sx={{ height: '100%' }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#FFD700',
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                lineHeight: 1.1,
              }}
            >
              Welcome to BrainQuiz
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              paragraph
              sx={{ mb: 4 }}
            >
              Create and take interactive quizzes on any topic. Challenge yourself and others with BrainQuiz!
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                backgroundColor: '#FFD700',
                color: '#FFFFFF',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#FFC300',
                  color: '#FFFFFF',
                }
              }}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Lottie animationData={animation1} style={{ width: '100%', maxWidth: 500, height: 'auto' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 