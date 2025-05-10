import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  Star as StarIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    timeSpent: 0,
    improvement: 0
  });
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch stats
        try {
          const statsResponse = await axios.get('http://127.0.0.1:8000/api/dashboard/stats', {
          headers: {
              'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
          if (statsResponse.data) {
            setStats(statsResponse.data);
          }
        } catch (statsError) {
          console.warn('Stats fetch error:', statsError);
          // Keep default stats values
        }

        // Fetch recent quizzes
        try {
          const quizzesResponse = await axios.get('http://127.0.0.1:8000/api/dashboard/recent-quizzes', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          });
          if (quizzesResponse.data) {
            setRecentQuizzes(Array.isArray(quizzesResponse.data) ? quizzesResponse.data : []);
          }
        } catch (quizzesError) {
          console.warn('Recent quizzes fetch error:', quizzesError);
          setRecentQuizzes([]);
        }

        setError(null);
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError('Some data could not be loaded. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
    fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.name || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your progress and continue learning
      </Typography>
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
            }}
          >
            <QuizIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" component="div">
              {stats.totalQuizzes}
              </Typography>
            <Typography variant="body2">Total Quizzes</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'success.light',
              color: 'success.contrastText',
            }}
          >
            <StarIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" component="div">
              {stats.averageScore}%
            </Typography>
            <Typography variant="body2">Average Score</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'warning.light',
              color: 'warning.contrastText',
            }}
          >
            <TimerIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" component="div">
              {stats.timeSpent}m
            </Typography>
            <Typography variant="body2">Time Spent</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'info.light',
              color: 'info.contrastText',
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" component="div">
              {stats.improvement}%
            </Typography>
            <Typography variant="body2">Improvement</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => navigate('/categories')}
              startIcon={<QuizIcon />}
            >
              Start New Quiz
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => navigate('/my-quizzes')}
              startIcon={<QuizIcon />}
            >
              My Quizzes
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => navigate('/create-quiz')}
              startIcon={<QuizIcon />}
            >
              Create Quiz
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Recent Quizzes */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Grid container spacing={3}>
          {recentQuizzes.length > 0 ? (
            recentQuizzes.map((quiz) => (
              <Grid item xs={12} sm={6} md={4} key={quiz.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {quiz.category?.name}
              </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip
                        label={`Score: ${quiz.score}%`}
                        color={quiz.score >= 70 ? 'success' : quiz.score >= 40 ? 'warning' : 'error'}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={`Time: ${quiz.timeSpent}m`}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
            </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => navigate(`/quiz/${quiz.id}`)}
                    >
                      Retake Quiz
                    </Button>
                    <Button
                      size="small"
                      onClick={() => navigate(`/results/${quiz.id}`)}
                    >
                      View Results
                    </Button>
                  </CardActions>
          </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info">
                No recent quiz activity. Start a new quiz to begin your learning journey!
              </Alert>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 