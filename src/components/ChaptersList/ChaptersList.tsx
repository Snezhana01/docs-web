import React, { useState } from 'react';
import { Grid, Box, TextField, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ChapterCard from '../ChapterCard/ChapterCard';

interface Chapter {
    id: number;
    name: string;
}

interface ChaptersListProps {
    chapters: Chapter[];
    onDelete: (chapterId: number) => void;
    onAddChapter: (chapterName: string) => void;
}

const ChaptersList: React.FC<ChaptersListProps> = ({ chapters, onDelete, onAddChapter }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newChapterName, setNewChapterName] = useState('');

    const handleSaveNewChapter = () => {
        if (newChapterName.trim()) {
            onAddChapter(newChapterName);
            setNewChapterName('');
            setIsAdding(false);
        }
    };

    return (
        <Box>
            <Box mb={2}>
                {isAdding ? (
                    <Box display="flex" alignItems="center">
                        <TextField
                            value={newChapterName}
                            onChange={(e) => setNewChapterName(e.target.value)}
                            fullWidth
                            placeholder="Введите название главы"
                        />
                        <IconButton onClick={handleSaveNewChapter} disabled={!newChapterName.trim()}>
                            <SaveIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100px" border="1px dashed gray">
                        <IconButton onClick={() => setIsAdding(true)}>
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </Box>
                )}
            </Box>
            <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
                <Grid container spacing={3}>
                    {chapters.map((chapter, index) => (
                        <Grid key={chapter.id} item xs={12}>
                            <ChapterCard
                                chapterNumber={index + 1}
                                chapter={chapter}
                                onDelete={onDelete}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
};

export default ChaptersList;
