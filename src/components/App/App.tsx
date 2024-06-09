import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Header } from '../Header';
import Home from '../Home/Home';
import Register from '../Register/Register';
import Login from '../Login/Login';
import MyWorks from '../MyWorks/MyWorks'; // Импортируем компонент MyWorks
import './App.css';
import Footer from '../Footer/Footer';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth(); // Получаем isAuthenticated, login и logout из контекста аутентификации
  const navigate = useNavigate(); // Используйте useNavigate вместо useHistory
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      login(); // Вход пользователя, если есть токен доступа в локальном хранилище
      navigate('/my-works');
    }
  }, [login]); // Вызываем useEffect только при изменении функции login

  return (
    <div className="container">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {isAuthenticated ? (
              <Route path="/my-works" element={<MyWorks />} /> // Отображаем MyWorks, если пользователь аутентифицирован
            ) : (
              <Route path="/my-works" element={<Navigate to="/login" />} /> // Перенаправляем на страницу входа, если пользователь не аутентифицирован
            )}
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
