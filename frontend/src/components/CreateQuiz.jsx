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
  Select,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const categories = [
  'History',
  'Science',
  'Mathematics',
  'Language',
  'Psychology',
  'General Knowledge',
];

const questionTypes = [
  { value: 'text', label: 'Text Question' },
  { value: 'image', label: 'Image Question' },
  { value: 'video', label: 'Video Question' },
  { value: 'audio', label: 'Audio Question' },
];

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: '',
    category: '',
    description: '',
    questions: [
      {
        type: 'text',
        question: '',
        mediaUrl: '',
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

  const handleMediaUpload = async (questionIndex, file) => {
    // TODO: Implement actual file upload to server
    // For now, we'll just create a local URL
    const mediaUrl = URL.createObjectURL(file);
    handleQuestionChange(questionIndex, 'mediaUrl', mediaUrl);
  };

  const addQuestion = () => {
    setQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          type: 'text',
          question: '',
          mediaUrl: '',
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

  const renderMediaPreview = (question) => {
    if (!question.mediaUrl) return null;

    switch (question.type) {
      case 'image':
        return (
          <Card sx={{ mt: 2, mb: 2 }}>
            <CardMedia
              component="img"
              image={question.mediaUrl}
              alt="Question image"
              sx={{ maxHeight: 300, objectFit: 'contain' }}
            />
          </Card>
        );
      case 'video':
        return (
          <Box sx={{ mt: 2, mb: 2 }}>
            <video
              controls
              src={question.mediaUrl}
              style={{ maxWidth: '100%', maxHeight: 300 }}
            />
          </Box>
        );
      case 'audio':
        return (
          <Box sx={{ mt: 2, mb: 2 }}>
            <audio controls src={question.mediaUrl} style={{ width: '100%' }} />
          </Box>
        );
      default:
        return null;
    }
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

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Question Type</InputLabel>
                      <Select
                        value={question.type}
                        label="Question Type"
                        onChange={(e) => handleQuestionChange(questionIndex, 'type', e.target.value)}
                      >
                        {questionTypes.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

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

                    {question.type !== 'text' && (
                      <Box sx={{ mb: 3 }}>
                        <input
                          accept={
                            question.type === 'image'
                              ? 'image/*'
                              : question.type === 'video'
                              ? 'video/*'
                              : 'audio/*'
                          }
                          style={{ display: 'none' }}
                          id={`media-upload-${questionIndex}`}
                          type="file"
                          onChange={(e) => handleMediaUpload(questionIndex, e.target.files[0])}
                        />
                        <label htmlFor={`media-upload-${questionIndex}`}>
                          <Button
                            variant="outlined"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            fullWidth
                          >
                            Upload {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
                          </Button>
                        </label>
                        {renderMediaPreview(question)}
                      </Box>
                    )}

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