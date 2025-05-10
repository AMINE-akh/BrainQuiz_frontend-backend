import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  BarChart as BarChartIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/my-quizzes', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      setQuizzes(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError('Failed to load quizzes. Please try again later.');
      console.error('Quizzes fetch error:', err);
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (quizId) => {
    navigate(`/edit-quiz/${quizId}`);
  };

  const handleDelete = (quiz) => {
    setSelectedQuiz(quiz);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/quizzes/${selectedQuiz.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      setQuizzes(quizzes.filter(quiz => quiz.id !== selectedQuiz.id));
      setDeleteDialogOpen(false);
      setSelectedQuiz(null);
    } catch (err) {
      setError('Failed to delete quiz. Please try again later.');
      console.error('Delete quiz error:', err);
    }
  };

  const handleViewStats = (quizId) => {
    navigate(`/quiz-stats/${quizId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          My Quizzes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/create-quiz')}
          sx={{ borderRadius: 2 }}
        >
          Create New Quiz
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Quizzes Grid */}
      <Grid container spacing={3}>
        {Array.isArray(quizzes) && quizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} key={quiz.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {quiz.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {quiz.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={quiz.category?.name || 'Uncategorized'}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip
                    icon={<PeopleIcon />}
                    label={`${quiz.attempts_count || 0} attempts`}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip
                    icon={<BarChartIcon />}
                    label={`${quiz.average_score || 0}% avg`}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(quiz.created_at).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Box>
                  <Tooltip title="Edit Quiz">
                <IconButton
                  size="small"
                  onClick={() => handleEdit(quiz.id)}
                      sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                  </Tooltip>
                  <Tooltip title="View Stats">
                    <IconButton
                      size="small"
                      onClick={() => handleViewStats(quiz.id)}
                      sx={{ mr: 1 }}
                    >
                      <BarChartIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Quiz">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(quiz)}
                >
                  <DeleteIcon />
                </IconButton>
                  </Tooltip>
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                >
                  Preview
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {(!Array.isArray(quizzes) || quizzes.length === 0) && (
          <Grid item xs={12}>
            <Alert severity="info">
              You haven't created any quizzes yet. Click "Create New Quiz" to get started!
            </Alert>
          </Grid>
        )}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Quiz</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedQuiz?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyQuizzes; 