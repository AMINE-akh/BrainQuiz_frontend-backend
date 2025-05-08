import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
  LinearProgress,
  Grid,
} from '@mui/material';

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);

  // Mock results data - replace with actual API call
  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setResults({
        score: 8,
        totalQuestions: 10,
        timeTaken: '5:30',
        correctAnswers: 8,
        wrongAnswers: 2,
        category: 'General Knowledge',
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const percentage = (results.score / results.totalQuestions) * 100;

  return (
    <Box sx={{ py: 8, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Quiz Results
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              {results.category}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ flexGrow: 1, mr: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: percentage >= 70 ? 'success.main' : 'error.main',
                    },
                  }}
                />
              </Box>
              <Typography variant="h5" color="primary">
                {percentage}%
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'success.light',
                    color: 'success.contrastText',
                  }}
                >
                  <Typography variant="h6">Correct</Typography>
                  <Typography variant="h4">{results.correctAnswers}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'error.light',
                    color: 'error.contrastText',
                  }}
                >
                  <Typography variant="h6">Incorrect</Typography>
                  <Typography variant="h4">{results.wrongAnswers}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" gutterBottom>
              Time taken: {results.timeTaken}
            </Typography>
            <Typography variant="body1">
              Total questions: {results.totalQuestions}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/categories')}
            >
              Back to Categories
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(`/quiz/${id}`)}
            >
              Retry Quiz
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Results; 