import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleClose();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigation = (path) => {
    handleClose();
    navigate(path);
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#FFFFFF' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#FFD700',
              fontWeight: 'bold',
              fontSize: '2rem',
              letterSpacing: '1px',
            }}
          >
            BrainQuiz
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {user ? (
              <>
                <Button
                  component={RouterLink}
                  to="/categories"
                  sx={{
                    color: '#FFD700',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 215, 0, 0.1)'
                    }
                  }}
                  startIcon={<QuizIcon sx={{ color: '#FFD700', fontSize: '1.5rem' }} />}
                >
                  Categories
                </Button>
                <Button
                  component={RouterLink}
                  to="/create-quiz"
                  sx={{
                    color: '#FFD700',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 215, 0, 0.1)'
                    }
                  }}
                  startIcon={<QuizIcon sx={{ color: '#FFD700', fontSize: '1.5rem' }} />}
                >
                  Create Quiz
                </Button>
                <IconButton
                  onClick={handleMenu}
                  size="large"
                  edge="end"
                  sx={{ ml: 1, color: '#FFD700' }}
                >
                  {user.avatar ? (
                    <Avatar src={user.avatar} alt={user.name} sx={{ width: 45, height: 45 }} />
                  ) : (
                    <AccountCircleIcon sx={{ fontSize: '2.5rem', color: '#FFD700' }} />
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 40,
                        height: 40,
                        ml: -0.5,
                        mr: 1,
                      },
                      '& .MuiMenuItem-root': {
                        fontSize: '1.1rem',
                        py: 1.5,
                      },
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.5rem',
                      }
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                      {user.email}
                    </Typography>
                  </Box>
                  <Divider />
                  <MenuItem onClick={() => handleNavigation('/dashboard')}>
                    <DashboardIcon sx={{ mr: 2, color: '#FFD700' }} />
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigation('/my-quizzes')}>
                    <QuizIcon sx={{ mr: 2, color: '#FFD700' }} />
                    My Quizzes
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigation('/results')}>
                    <EmojiEventsIcon sx={{ mr: 2, color: '#FFD700' }} />
                    Results
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 2, color: '#FFD700' }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: '#FFD700',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 215, 0, 0.1)'
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  sx={{
                    backgroundColor: '#FFD700',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    px: 3,
                    py: 1,
                    '&:hover': {
                      backgroundColor: '#FFC300',
                      color: '#FFFFFF',
                    }
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 