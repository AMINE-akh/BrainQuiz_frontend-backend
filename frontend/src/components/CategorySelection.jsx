import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Fade,
} from '@mui/material';
import {
  History,
  Science,
  Calculate,
  Language,
  Psychology,
  School,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'History',
    icon: <History sx={{ fontSize: 40 }} />,
    color: '#FF6B6B',
  },
  {
    id: 2,
    name: 'Science',
    icon: <Science sx={{ fontSize: 40 }} />,
    color: '#4ECDC4',
  },
  {
    id: 3,
    name: 'Mathematics',
    icon: <Calculate sx={{ fontSize: 40 }} />,
    color: '#45B7D1',
  },
  {
    id: 4,
    name: 'Language',
    icon: <Language sx={{ fontSize: 40 }} />,
    color: '#96CEB4',
  },
  {
    id: 5,
    name: 'Psychology',
    icon: <Psychology sx={{ fontSize: 40 }} />,
    color: '#FFEEAD',
  },
  {
    id: 6,
    name: 'Know It All',
    icon: <School sx={{ fontSize: 40 }} />,
    color: '#D4A5A5',
  },
];

const CategorySelection = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId) => {
    navigate(`/quizzes/${categoryId}`);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100%',
      bgcolor: 'background.default',
      py: 4,
      px: { xs: 2, sm: 4, md: 6 }
    }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        sx={{ 
          textAlign: 'center',
          fontWeight: 'bold',
          mb: 6,
          color: 'primary.main',
        }}
      >
        Choose a Category
      </Typography>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Fade in timeout={500}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <CardActionArea 
                  onClick={() => handleCategorySelect(category.id)}
                  sx={{ height: '100%' }}
                >
                  <CardContent 
                    sx={{ 
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 2,
                    }}
                  >
                    <Box 
                      sx={{ 
                        color: category.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: `${category.color}15`,
                        mb: 2,
                      }}
                    >
                      {category.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="div"
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'text.primary',
                      }}
                    >
                      {category.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorySelection; 