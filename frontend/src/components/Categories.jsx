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
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  cursor: 'pointer',
                },
              }}
              onClick={() => handleCategorySelect(category.id)}
            >
              {category.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={category.image}
                  alt={category.name}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                  <span style={{ fontSize: '1.5rem' }}>{category.name}</span>
                </Typography>
                <Typography color="text.secondary">
                  {category.description}
                </Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#FFD700',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#FFC300',
                        color: '#FFFFFF',
                      }
                    }}
                    fullWidth
                  >
                    Start Quiz
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories; 