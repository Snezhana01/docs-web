import React, { useEffect, useState } from 'react';
import { Container, Box, Button, Grid, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BookCard from '../BookCard/BookCard';
import Popup from '../Popup/Popup';

const MyWorks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/v1/books/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleBookCreated = () => {
    fetchBooks(); // Обновляем список книг после успешного создания
  };

  return (
    <Container maxWidth="lg">
      <Box mt={5} mb={5}>
        <Typography variant="h4" gutterBottom>
          Мои работы
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper onClick={handleOpenPopup} elevation={3} style={{ padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', cursor: 'pointer' }}>
              <AddIcon style={{ fontSize: 60 }} />
            </Paper>
          </Grid>
          {books.map((book) => (
            <Grid key={book.id} item xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3} style={{ padding: '10px', borderRadius: '10px', minHeight: '200px' }}>
                <BookCard book={book} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Popup open={isPopupOpen} onClose={handleClosePopup} onBookCreated={handleBookCreated} />
    </Container>
  );
};

export default MyWorks;
