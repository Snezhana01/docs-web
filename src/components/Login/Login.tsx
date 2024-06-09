import React, { useState } from 'react';
import { TextField, Button, Container, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Используйте useNavigate вместо useHistory
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {login} = useAuth()
  const [loginStr, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: loginStr, password }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError('Invalid login or password');
        } else {
          setError('Login failed');
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.token.accessToken);
      login()
      navigate('/my-works');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed');
      setLoading(false);
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

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
            value={loginStr}
            onChange={handleLoginChange}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!loginStr || !password || loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
          {error && (
            <Box sx={{ mt: 2, color: 'red' }}>
              {error}
            </Box>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default Login;
