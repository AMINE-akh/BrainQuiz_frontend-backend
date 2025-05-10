import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
  Alert,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Results = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchResults = async () => {
      if (!id) {
        setError('No quiz ID provided');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/quiz-results/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!response.data) {
          throw new Error('No results data received');
        }

        setResults(response.data);
        setError(null);
      } catch (err) {
        console.error('Results fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load results. Please try again later.');
      } finally {
      setLoading(false);
      }
    };

    if (user) {
      fetchResults();
    }
  }, [id, user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          startIcon={<ArrowBack />}
        >
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  if (!results) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>No results found for this quiz.</Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          startIcon={<ArrowBack />}
        >
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  const score = (results.correctAnswers / results.totalQuestions) * 100;
  const timePerQuestion = results.timeSpent / results.totalQuestions;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Quiz Results
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {results.quizTitle}
          </Typography>
        </Box>

        {/* Score Display */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h2" component="div" sx={{ 
            fontWeight: 'bold',
            color: score >= 70 ? 'success.main' : score >= 40 ? 'warning.main' : 'error.main'
          }}>
            {score.toFixed(1)}%
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
            {score >= 70 ? 'Excellent!' : score >= 40 ? 'Good job!' : 'Keep practicing!'}
          </Typography>
        </Box>

        {/* Progress Bar */}
          <Box sx={{ mb: 4 }}>
                <LinearProgress
                  variant="determinate"
            value={score} 
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                bgcolor: score >= 70 ? 'success.main' : score >= 40 ? 'warning.main' : 'error.main'
              }
                  }}
                />
              </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Total Questions
              </Typography>
              <Typography variant="h4">
                {results.totalQuestions}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Correct Answers
              </Typography>
              <Typography variant="h4" color="success.main">
                {results.correctAnswers}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Wrong Answers
              </Typography>
              <Typography variant="h4" color="error.main">
                {results.wrongAnswers}
              </Typography>
                </Paper>
              </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Time Spent
              </Typography>
              <Typography variant="h4">
                {results.timeSpent}m
              </Typography>
                </Paper>
              </Grid>
            </Grid>

        {/* Question Review */}
          <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Question Review
          </Typography>
          <List>
            {results.questions && results.questions.map((question, index) => (
              <React.Fragment key={question.id || index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" component="span">
                          Question {index + 1}:
                        </Typography>
                        <Chip
                          icon={question.isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
                          label={question.isCorrect ? 'Correct' : 'Incorrect'}
                          color={question.isCorrect ? 'success' : 'error'}
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                          {question.text}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Your answer: {question.userAnswer}
                        </Typography>
                        {!question.isCorrect && (
                          <Typography variant="body2" color="success.main">
                            Correct answer: {question.correctAnswer}
            </Typography>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <TimerIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            Time spent: {question.timeSpent}s
            </Typography>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                {index < results.questions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
          </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
            onClick={() => navigate('/dashboard')}
            startIcon={<ArrowBack />}
            sx={{ borderRadius: 2, px: 3 }}
            >
            Back to Dashboard
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(`/quiz/${id}`)}
            startIcon={<RefreshIcon />}
            sx={{ borderRadius: 2, px: 3 }}
            >
            Try Again
            </Button>
          </Box>
        </Paper>
      </Container>
  );
};

export default Results; 