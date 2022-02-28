import { Paper, CircularProgress, Box, Typography, Stack, IconButton } from '@mui/material';
import { experimentalStyled as styled, alpha } from '@mui/material/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import CopyIcon from '@mui/icons-material/FileCopy';
import Clipboard from '../../utils/Clipboard';

const TitleBox = styled(Box)(({ theme }) => `
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    z-index: 100;
    transition: opacity 0.5s;
    background-color: ${alpha(theme.palette.primary.light, 0.9)};
    opacity: 0;

    h4 {
        color: ${theme.palette.primary.contrastText};
        padding: ${theme.spacing(1)};
        text-overflow: ellipsis;
        overflow: hidden;
    }

    :hover {
        opacity: 1;
    }

    button:hover {
        background-color: rgba(255,255,255,0.3);
    }
`);

type Props = {
    id: number,
    title: string,
    language: string
}

const PictogramPreview: React.FC<Props> = ({ id, title, language }) => {
    const [isLoading, setLoading] = useState(true);
    const src = `https://api.arasaac.org/api/pictograms/${id}`;

    const onDownload = (ev: React.MouseEvent) => {
        ev.stopPropagation();
        ev.preventDefault();

        fetch(src).then((response) => response.blob()).then((blob) => {
            const linkElement = document.createElement('a');

            linkElement.href = URL.createObjectURL(blob);
            linkElement.setAttribute('download', [id, title || 'pictogram'].join('-') + '.png');
            linkElement.click();
        });

    }

    const onCopyToClipboard = (ev: React.MouseEvent) => {
        ev.stopPropagation();
        ev.preventDefault();

        Clipboard.copyImage(src);
    }

    return (
        <Paper>
            <Box sx={{ paddingTop: '100%', position: 'relative' }}>
                <Link to={`/pictogram/${language}/${id}`} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, textDecoration: 'none' }}>
                    <img
                        src={src}
                        alt={title}
                        crossOrigin="anonymous"
                        onLoad={() => setLoading(false)}
                        style={{ position: 'absolute', top: 0, left: 0, maxWidth: '100%' }} />
                    <TitleBox>
                        <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h4" align="center">{title}</Typography>
                        </Box>
                        <Box p={1} sx={{ position: 'absolute', bottom: 0, left: 0 }}>
                            <Stack spacing={1} direction="row">
                                <IconButton onClick={onDownload}><DownloadIcon style={{ color: 'white' }} /></IconButton>
                                {Clipboard.hasSupport() && <IconButton onClick={onCopyToClipboard}><CopyIcon style={{ color: 'white' }} /></IconButton>}
                            </Stack>
                        </Box>
                    </TitleBox>
                </Link>
                {isLoading && <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', marginLeft: '-20px', marginTop: '-20px' }} />}
            </Box>
        </Paper>
    )
}

export default PictogramPreview;