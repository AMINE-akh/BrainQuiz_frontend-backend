import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import Lottie from 'lottie-react';
import historyAnimation from '../assets/History.json';
import scienceAnimation from '../assets/Science.json';
import mathematicsAnimation from '../assets/Mathematics.json';
import languageAnimation from '../assets/Language.json';
import psychologyAnimation from '../assets/Psychology.json';
import generalKnowledgeAnimation from '../assets/General Knowledge.json';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryId) => {
    navigate(`/quiz/${categoryId}`);
  };

  const getAnimationForCategory = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'history':
        return historyAnimation;
      case 'science':
        return scienceAnimation;
      case 'mathematics':
        return mathematicsAnimation;
      case 'language':
        return languageAnimation;
      case 'psychology':
        return psychologyAnimation;
      case 'know it all':
        return generalKnowledgeAnimation;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {user && (
        <Box mb={4}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#FFD700', fontWeight: 'bold', fontSize: { xs: '2rem', md: '2.8rem', lg: '3.5rem' } }}>
            Welcome, {user.name}!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Choose a category to start your quiz journey
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card
              sx={{
                height: 470,
                minHeight: 470,
                maxWidth: 550,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  cursor: 'pointer',
                },
              }}
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', p: 4 }}>
                <Box sx={{ width: '100%', mb: 2 }}>
                  <Typography gutterBottom variant="h4" component="h2" sx={{ color: '#FFD700', textAlign: 'center', mb: 2, fontSize: '50px', lineHeight: 1.1, wordBreak: 'break-word', maxWidth: '100%' }}>
                    {category.name}
                  </Typography>
                  <Box sx={{ 
                    width: '100%', 
                    height: 170,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 1,
                    '& > div': {
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }
                  }}>
                    <Lottie
                      animationData={getAnimationForCategory(category.name)}
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                      loop={true}
                    />
                  </Box>
                </Box>
                <Typography color="text.secondary" sx={{ mb: 2, textAlign: 'center', minHeight: 40, fontSize: { xs: '1rem', md: '1.1rem' }, maxWidth: '100%' }}>
                  {category.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#FFD700',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    py: 1.5,
                    mt: 'auto',
                    '&:hover': {
                      backgroundColor: '#FFC300',
                      color: '#FFFFFF',
                    }
                  }}
                  fullWidth
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories; 