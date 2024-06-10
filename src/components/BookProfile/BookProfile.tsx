import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Grid, Paper, Button, CircularProgress, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSnackbar } from 'notistack';
import debounce from 'lodash.debounce';
import ChaptersList from '../ChaptersList/ChaptersList';

const BookProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { enqueueSnackbar } = useSnackbar();
    const [book, setBook] = useState<any>(null);
    const [chapters, setChapters] = useState<any[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchBook();
    }, [id]);

    useEffect(() => {
        fetchChapters();
    }, [id]);

    const fetchBook = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/v1/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch book');
            }
            const data = await response.json();
            setBook(data);
        } catch (error) {
            console.error('Error fetching book:', error);
        }
    };

    const fetchChapters = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/v1/books/${id}/chapters`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch chapters');
            }
            const data = await response.json();
            setChapters(data.data);
        } catch (error) {
            console.error('Error fetching chapters:', error);
        }
    };

    const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('COVER', file);

            try {
                const accessToken = localStorage.getItem('accessToken');
                const uploadResponse = await fetch('http://localhost:5000/v1/upload/files', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    throw new Error('Failed to upload cover');
                }

                const uploadData = await uploadResponse.json();
                const coverId = uploadData[0].id;

                const patchResponse = await fetch(`http://localhost:5000/v1/books/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ coverId }),
                });

                if (!patchResponse.ok) {
                    throw new Error('Failed to update cover');
                }

                // Fetch the updated book data
                fetchBook();
                enqueueSnackbar('Обложка успешно обновлена', { variant: 'success' });

            } catch (error) {
                console.error('Error uploading cover:', error);
                enqueueSnackbar('Ошибка при загрузке обложки', { variant: 'error' });
            }
        }
    };

    const handleDeleteChapter = async (chapterId: number) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/v1/chapters/${chapterId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.ok) {
                setChapters(chapters.filter(chapter => chapter.id !== chapterId));
                enqueueSnackbar('Глава успешно удалена', { variant: 'success' });
            } else {
                enqueueSnackbar('Ошибка при удалении главы', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error deleting chapter:', error);
            enqueueSnackbar('Ошибка при удалении главы', { variant: 'error' });
        }
    };

    const handleAddChapter = async (chapterName: string) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/v1/books/${id}/chapters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ name: chapterName }),
            });
            if (response.ok) {
                const newChapter = await response.json();
                setChapters([...chapters, newChapter]);
                enqueueSnackbar('Глава успешно добавлена', { variant: 'success' });
            } else {
                enqueueSnackbar('Ошибка при добавлении главы', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error adding chapter:', error);
            enqueueSnackbar('Ошибка при добавлении главы', { variant: 'error' });
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setBook((prevBook: any) => ({
            ...prevBook,
            [field]: value,
        }));
        debouncedSave();
    };

    const saveBook = async () => {
        try {
            setIsSaving(true);
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/v1/books/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    name: book.name,
                    genre: book.genre,
                    annotations: book.annotations,
                    authorPreferences: book.authorPreferences,
                }),
            });
            if (response.ok) {
                enqueueSnackbar('Данные успешно сохранены', { variant: 'success' });
            } else {
                enqueueSnackbar('Ошибка при сохранении данных', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error saving book:', error);
            enqueueSnackbar('Ошибка при сохранении данных', { variant: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    const debouncedSave = useCallback(debounce(saveBook, 500), [book]);

    if (!book) return <CircularProgress size={24} color="inherit" />;

    return (
        <Container maxWidth="lg">
            <Box mt={5} mb={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} style={{ height: 450, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            {book.cover ? (
                                <>
                                    <img src={book.cover.url} alt="Обложка книги" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="upload-cover"
                                        type="file"
                                        onChange={handleCoverChange}
                                    />
                                    <label htmlFor="upload-cover">
                                        <IconButton component="span" style={{ position: 'absolute', top: 10, right: 10, color: '#fff' }}>
                                            <CloudUploadIcon />
                                        </IconButton>
                                    </label>
                                </>
                            ) : (
                                <Box style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="contained-button-file"
                                        type="file"
                                        onChange={handleCoverChange}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button component="span">
                                            <AddIcon style={{ fontSize: 60 }} />
                                        </Button>
                                    </label>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField
                            label="Название"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={book.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <TextField
                            label="Жанр"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={book.genre}
                            onChange={(e) => handleInputChange('genre', e.target.value)}
                        />
                        <TextField
                            label="Аннотации"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={book.annotations}
                            onChange={(e) => handleInputChange('annotations', e.target.value)}
                        />
                        <TextField
                            label="Примечания автора"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={book.authorPreferences}
                            onChange={(e) => handleInputChange('authorPreferences', e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <ChaptersList
                        chapters={chapters}
                        onDelete={handleDeleteChapter}
                        onAddChapter={handleAddChapter}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default BookProfile;
