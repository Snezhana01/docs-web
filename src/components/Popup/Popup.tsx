import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';

const Popup: React.FC<{ open: boolean; onClose: () => void; onBookCreated: () => void }> = ({ open, onClose, onBookCreated }) => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [annotations, setAnnotations] = useState('');
  const [authorPreferences, setAuthorPreferences] = useState('');

  const isFormValid = name && genre && annotations && authorPreferences;

  const handleSave = async () => {
    if (!isFormValid) return;

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/v1/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, genre, annotations, authorPreferences }),
      });
      if (response.ok) {
        onBookCreated(); // Обновляем список книг после успешного создания
        onClose(); // Закрываем модальное окно
      } else {
        console.error('Ошибка при создании книги');
      }
    } catch (error) {
      console.error('Ошибка при создании книги:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Создать новую книгу</DialogTitle>
      <DialogContent>
        <TextField
          label="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Жанр"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Аннотации"
          value={annotations}
          onChange={(e) => setAnnotations(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        <TextField
          label="Примечания автора"
          value={authorPreferences}
          onChange={(e) => setAuthorPreferences(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        <Box display="flex" justifyContent="center" mt={3} mb={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!isFormValid}
          >
            Сохранить
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
