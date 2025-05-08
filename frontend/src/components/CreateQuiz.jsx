import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Grid,
  MenuItem,
  Divider,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const categories = [
  'History',
  'Science',
  'Mathematics',
  'Language',
  'Psychology',
  'General Knowledge',
];

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: '',
    category: '',
    description: '',
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ],
  });

  const handleQuizChange = (field, value) => {
    setQuiz((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuiz((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value,
      };
      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuiz((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].options[optionIndex] = value;
      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    setQuiz((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].correctAnswer = optionIndex;
      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  const addQuestion = () => {
    setQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to save quiz
    console.log('Quiz data:', quiz);
    navigate('/categories');
  };

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
            Create New Quiz
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Quiz Title"
                  value={quiz.title}
                  onChange={(e) => handleQuizChange('title', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={quiz.category}
                  onChange={(e) => handleQuizChange('category', e.target.value)}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={quiz.description}
                  onChange={(e) => handleQuizChange('description', e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Questions
                </Typography>
              </Grid>

              {quiz.questions.map((question, questionIndex) => (
                <Grid item xs={12} key={questionIndex}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 3,
                      position: 'relative',
                    }}
                  >
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                      }}
                      onClick={() => removeQuestion(questionIndex)}
                      disabled={quiz.questions.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>

                    <TextField
                      fullWidth
                      label={`Question ${questionIndex + 1}`}
                      value={question.question}
                      onChange={(e) =>
                        handleQuestionChange(questionIndex, 'question', e.target.value)
                      }
                      required
                      sx={{ mb: 3 }}
                    />

                    {question.options.map((option, optionIndex) => (
                      <Box
                        key={optionIndex}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        <TextField
                          fullWidth
                          label={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(questionIndex, optionIndex, e.target.value)
                          }
                          required
                        />
                        <Button
                          variant={question.correctAnswer === optionIndex ? 'contained' : 'outlined'}
                          onClick={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                          sx={{ ml: 2, minWidth: 100 }}
                        >
                          Correct
                        </Button>
                      </Box>
                    ))}
                  </Paper>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  startIcon={<AddIcon />}
                  onClick={addQuestion}
                  variant="outlined"
                  fullWidth
                >
                  Add Question
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/categories')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                  >
                    Create Quiz
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateQuiz; 