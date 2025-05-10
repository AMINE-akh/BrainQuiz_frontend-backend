import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  BarChart as BarChartIcon,
  Timer as TimerIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const QuizStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/quizzes/${id}/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        setStats(response.data);
        setError(null);
      } catch (err) {
        console.error('Stats fetch error:', err);
        setError('Failed to load quiz statistics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
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
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/my-quizzes')}
          startIcon={<ArrowBackIcon />}
        >
          Back to My Quizzes
        </Button>
      </Container>
    );
  }

  if (!stats) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>No statistics available for this quiz.</Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/my-quizzes')}
          startIcon={<ArrowBackIcon />}
        >
          Back to My Quizzes
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            Quiz Statistics
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/my-quizzes')}
          >
            Back to My Quizzes
          </Button>
        </Box>

        {/* Quiz Info */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {stats.quizTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {stats.quizDescription}
          </Typography>
        </Box>

        {/* Overview Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" color="text.secondary">
                    Total Attempts
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {stats.totalAttempts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <BarChartIcon sx={{ mr: 1, color: 'success.main' }} />
                  <Typography variant="h6" color="text.secondary">
                    Average Score
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {stats.averageScore}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TimerIcon sx={{ mr: 1, color: 'warning.main' }} />
                  <Typography variant="h6" color="text.secondary">
                    Average Time
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {stats.averageTime}m
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon sx={{ mr: 1, color: 'info.main' }} />
                  <Typography variant="h6" color="text.secondary">
                    Completion Rate
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {stats.completionRate}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Question Statistics */}
        <Typography variant="h5" gutterBottom>
          Question Statistics
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell align="right">Correct Answers</TableCell>
                <TableCell align="right">Wrong Answers</TableCell>
                <TableCell align="right">Success Rate</TableCell>
                <TableCell align="right">Average Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.questionStats.map((question, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {question.text}
                  </TableCell>
                  <TableCell align="right">{question.correctAnswers}</TableCell>
                  <TableCell align="right">{question.wrongAnswers}</TableCell>
                  <TableCell align="right">{question.successRate}%</TableCell>
                  <TableCell align="right">{question.averageTime}s</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Recent Attempts */}
        <Typography variant="h5" gutterBottom>
          Recent Attempts
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="right">Score</TableCell>
                <TableCell align="right">Time Spent</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.recentAttempts.map((attempt, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {attempt.userName}
                  </TableCell>
                  <TableCell align="right">{attempt.score}%</TableCell>
                  <TableCell align="right">{attempt.timeSpent}m</TableCell>
                  <TableCell align="right">
                    {new Date(attempt.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default QuizStats; 