import React, { useState } from 'react';
import { TextField, Button, Container, Box, CircularProgress, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Используйте useNavigate вместо useHistory
import { useAuth } from '../../contexts/AuthContext';

const Register: React.FC = () => {
  const navigate = useNavigate(); // Используйте useNavigate вместо useHistory
  const { login } = useAuth();
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/v1/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: loginValue, password }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          setError('User with this login already exists');
        } else {
          setError('Registration failed');
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.token.accessToken);
      setSuccess(true);
      login();
      navigate('/my-works'); // Используйте navigate для перехода на другую страницу
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValue(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(true);
    setError('');
  };

  if (success) {
    return null;
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoFocus
            value={loginValue}
            onChange={handleLoginChange}
            error={!!error}
            helperText={error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            error={!passwordsMatch}
            helperText={!passwordsMatch && "Passwords don't match"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!loginValue || !password || !confirmPassword || !passwordsMatch || loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
