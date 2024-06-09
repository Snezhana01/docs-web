// Header.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Импортируем хук useAuth

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
  },
});

export const Header: React.FC = () => {
  const classes = useStyles();
  const { isAuthenticated, logout } = useAuth(); // Получаем isAuthenticated и logout из контекста аутентификации

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title} component={RouterLink} to="/">
          О нас
        </Typography>
        {isAuthenticated && (
          <Button color="inherit" component={RouterLink} to="/my-works">
            Мои работы
          </Button>
        )}
        {isAuthenticated ? (
          <Button color="inherit" onClick={logout}>Выход</Button> // Кнопка "Выход"
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/register">
              Регистрация
            </Button>
            <Button color="inherit" component={RouterLink} to="/login">
              Вход
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
