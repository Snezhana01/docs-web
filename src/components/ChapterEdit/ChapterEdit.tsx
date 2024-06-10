import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ChapterEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [chapter, setChapter] = useState<any>({ name: '', text: '' });

    useEffect(() => {
        fetchChapter();
    }, [id]);

    const fetchChapter = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/v1/chapters/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch chapter');
            }
            const data = await response.json();
            setChapter(data);
        } catch (error) {
            console.error('Error fetching chapter:', error);
        }
    };

    const handleSave = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/v1/chapters/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(chapter),
            });
            if (response.ok) {
                enqueueSnackbar('Глава успешно обновлена', { variant: 'success' });
                navigate(`/books/${chapter.bookId}`);
            } else {
                enqueueSnackbar('Ошибка при обновлении главы', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error updating chapter:', error);
            enqueueSnackbar('Ошибка при обновлении главы', { variant: 'error' });
        }
    };

    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <TextField
                    label="Название главы"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={chapter.name}
                    onChange={(e) => setChapter({ ...chapter, name: e.target.value })}
                />
                <ReactQuill
                    value={chapter.text}
                    onChange={(value) => setChapter({ ...chapter, text: value })}
                    style={{ height: '400px', marginBottom: '40px' }}
                />

            </Box>
            <Box mt={5} alignItems={'center'} justifyContent={'center'} display={'flex'} paddingTop={2}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Сохранить
                </Button>
            </Box>
        </Container>
    );
};

export default ChapterEdit;
