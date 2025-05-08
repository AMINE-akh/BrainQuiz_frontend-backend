import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Container,
  Box,
  LinearProgress,
  Paper,
  Fade,
  IconButton,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Timer,
  CheckCircle,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/quizzes/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });
        setQuiz(response.data);
        setTimeLeft(response.data.time_limit);
        setError(null);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        if (error.response?.status === 401) {
          setError('Please log in to access this quiz.');
          navigate('/login');
        } else {
          setError('Failed to load quiz. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchQuiz();
    } else {
      setLoading(false);
      setError('Please log in to access this quiz.');
      navigate('/login');
    }
  }, [id, user, navigate]);

  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      const selectedOption = selectedAnswer === question.options.find((opt) => opt.is_correct)?.text;
      const correctOption = question.options.find((opt) => opt.is_correct)?.text;
      if (selectedOption === correctOption) {
        correctAnswers++;
      }
    });
    return (correctAnswers / quiz.questions.length) * 100;
  };

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
              onClick={() => navigate('/')}
            >
              Go Back
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        bgcolor: 'background.default'
      }}>
        <Fade in timeout={500}>
          <Card sx={{ 
            maxWidth: '600px',
            width: '100%',
            borderRadius: 2,
            boxShadow: 3,
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Quiz Results
              </Typography>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
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
              <LinearProgress 
                variant="determinate" 
                value={score} 
                sx={{ 
                  height: 10,
                  borderRadius: 5,
                  mb: 4,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: score >= 70 ? 'success.main' : score >= 40 ? 'warning.main' : 'error.main'
                  }
                }}
              />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/')}
                  startIcon={<ArrowBack />}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Back to Home
                </Button>
                <Button
                  variant="contained"
                  onClick={() => window.location.reload()}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Try Again
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    );
  }

  if (!quiz) return null;

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

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
          <Typography variant="h4" gutterBottom>
            {quiz.title}
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </Typography>
          </Box>

          <Typography variant="h5" gutterBottom>
              {currentQ.question}
            </Typography>

          <FormControl component="fieldset" sx={{ width: '100%', mb: 4 }}>
            <RadioGroup
              value={selectedAnswer}
              onChange={handleAnswerSelect}
            >
              {currentQ.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.text}
                  control={<Radio />}
                  label={option.text}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: selectedAnswer === option.text ? 'primary.main' : 'divider',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
              size="large"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
      </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Quiz;
