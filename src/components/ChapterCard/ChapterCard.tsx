import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface Chapter {
    id: number;
    name: string;
}

interface ChapterCardProps {
    chapterNumber: number;
    chapter: Chapter;
    onDelete: (chapterId: number) => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapterNumber, chapter, onDelete }) => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/chapters/${chapter.id}/edit`);
    };

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">Глава {chapterNumber}: {chapter.name}</Typography>
                    <Box>
                        <IconButton onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onDelete(chapter.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ChapterCard;
