import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Alert,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  AccessTime,
  QuestionAnswer,
  Category,
  PlayArrow,
  Refresh,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import api from '../config/api';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        console.log('Fetching quizzes for category:', categoryId);
        const response = await api.get('/quizzes', {
          params: {
            category_id: parseInt(categoryId)
          }
        });
        console.log('API Response:', response.data);
        setQuizzes(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError('Failed to load quizzes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchQuizzes();
    }
  }, [categoryId]);

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  if (loading) {
    return <LoadingSpinner message="Loading quizzes..." />;
  }

  if (error) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}>
        <Alert 
          severity="error" 
          sx={{ 
            maxWidth: '600px',
            width: '100%',
            borderRadius: 2,
            boxShadow: 1,
          }}
          action={
            <Button
              color="inherit"
              size="small"
              startIcon={<Refresh />}
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100%',
      bgcolor: 'background.default',
      py: 4,
      px: { xs: 2, sm: 4, md: 6 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: quizzes.length === 1 ? 'center' : 'flex-start',
    }}>
      <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1
          }}
        >
          Back to Categories
        </Button>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          {categoryId ? `${quizzes[0]?.category?.name || 'Category'} Quizzes` : 'All Quizzes'}
        </Typography>
      </Box>
      {quizzes.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No quizzes available in this category.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ minHeight: '60vh' }}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={10} md={8} lg={6} key={quiz.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Fade in timeout={500}>
                <Card 
                  sx={{ 
                    width: '100%',
                    maxWidth: 600,
                    minHeight: 320,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px) scale(1.03)',
                      boxShadow: 8,
                    },
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: 6,
                    p: 4,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, width: '100%', p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography 
                      variant="h4" 
                      component="div" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: 2,
                        textAlign: 'center',
                      }}
                    >
                      {quiz.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      paragraph
                      sx={{ mb: 3, fontSize: 20, textAlign: 'center' }}
                    >
                      {quiz.description}
                    </Typography>
                    <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                      <Chip
                        icon={<Category />}
                        label={quiz.category?.name || 'Uncategorized'}
                        size="medium"
                        sx={{ 
                          mr: 1, 
                          mb: 1,
                          bgcolor: quiz.category?.color || 'primary.main',
                          color: 'white',
                          fontSize: 18,
                        }}
                      />
                      <Chip
                        icon={<QuestionAnswer />}
                        label={`${quiz.total_questions} Questions`}
                        size="medium"
                        sx={{ mr: 1, mb: 1, fontSize: 18 }}
                      />
                      <Chip
                        icon={<AccessTime />}
                        label={`${Math.floor(quiz.time_limit / 60)} min`}
                        size="medium"
                        sx={{ mb: 1, fontSize: 18 }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleStartQuiz(quiz.id)}
                      size="large"
                      startIcon={<PlayArrow />}
                      sx={{
                        borderRadius: 3,
                        py: 2,
                        px: 6,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: 22,
                        boxShadow: 3,
                        mt: 2,
                      }}
                    >
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default QuizList;
