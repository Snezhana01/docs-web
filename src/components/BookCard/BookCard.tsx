import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface Book {
    id: string;
    name: string;
    genre: string;
    annotations: string;
    authorPreferences: string;
}

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    return (

        <>
            <Typography variant="h6" gutterBottom>
                {book.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Жанр: {book.genre}
            </Typography>
            <Typography variant="body2" gutterBottom>
                Аннотация: {book.annotations.length > 10 ? `${book.annotations.slice(0, 10)}...` : book.annotations}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Примечания: {book.authorPreferences.length > 10 ? `${book.authorPreferences.slice(0, 10)}...` : book.authorPreferences}
            </Typography>
            <Box mt={2}>
                <Button variant="contained" color="primary" fullWidth>
                    Редактировать
                </Button>
            </Box>
        </>
    );
};

export default BookCard;
