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
  CardMedia,
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
import Lottie from 'lottie-react';
import playQuizLottie from '../assets/PlayQuiz.json';
import loadingAnimation from '../assets/loading1.json';

const QUIZ_TIME_LIMIT = 60; // 1 minute in seconds

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_LIMIT);
  const [showResults, setShowResults] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
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
        if (prev <= 1) {
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
    setIsNavigating(true);
    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
      } else {
        handleSubmit();
      }
      setIsNavigating(false);
    }, 500);
  };

  const handlePrevious = () => {
    setIsNavigating(true);
    setTimeout(() => {
      if (currentQuestion > 0) {
        setCurrentQuestion((prev) => prev - 1);
      }
      setIsNavigating(false);
    }, 500);
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
                  color: '#FFD700'
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
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex',
      bgcolor: 'background.default'
    }}>
      {/* Loading Overlay */}
      {isNavigating && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            zIndex: 9999,
          }}
        >
          <Box sx={{ width: 200, height: 200 }}>
            <Lottie
              animationData={loadingAnimation}
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
        </Box>
      )}

      {/* Animation Section - Full Left Screen */}
      <Box sx={{ 
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#FFD700',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1
      }}>
        <Lottie 
          animationData={playQuizLottie} 
          style={{ 
            width: '100%', 
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%'
          }} 
          loop={true} 
        />
      </Box>

      {/* Quiz Content Section - Right Half */}
      <Box sx={{ 
        width: '50%',
        ml: '50%',
        p: 4,
        position: 'relative',
        zIndex: 2
      }}>
        <Paper
          elevation={3}
          sx={{ 
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper',
            height: '100%'
          }}
        >
          {/* Timer and Progress */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="primary">
                Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </Typography>
              <Typography variant="h6" color="primary">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>

          {/* Question Content */}
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            {currentQ.question}
          </Typography>

          {/* Media Content */}
          {currentQ.type !== 'text' && currentQ.mediaUrl && (
            <Box sx={{ mb: 4 }}>
              {currentQ.type === 'image' && (
                <Card sx={{ maxWidth: '100%', mb: 2 }}>
                  <CardMedia
                    component="img"
                    image={currentQ.mediaUrl}
                    alt="Question image"
                    sx={{ maxHeight: 400, objectFit: 'contain' }}
                  />
                </Card>
              )}
              {currentQ.type === 'video' && (
                <Box sx={{ mb: 2 }}>
                  <video
                    controls
                    src={currentQ.mediaUrl}
                    style={{ maxWidth: '100%', maxHeight: 400 }}
                  />
                </Box>
              )}
              {currentQ.type === 'audio' && (
                <Box sx={{ mb: 2 }}>
                  <audio controls src={currentQ.mediaUrl} style={{ width: '100%' }} />
                </Box>
              )}
            </Box>
          )}

          {/* Answer Options */}
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
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: selectedAnswer === option.text ? 'primary.main' : 'divider',
                    bgcolor: selectedAnswer === option.text ? 'primary.light' : 'background.paper',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              startIcon={<ArrowBack />}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              endIcon={<ArrowForward />}
              sx={{ borderRadius: 2, px: 3 }}
            >
              {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Quiz;
