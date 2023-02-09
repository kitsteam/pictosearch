import { Paper, CircularProgress, Box, Typography, Stack, IconButton } from '@mui/material';
import { experimentalStyled as styled, alpha } from '@mui/material/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import CopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from '@mui/icons-material/AddToPhotos';
import Clipboard from '../../utils/Clipboard';
import { apiBaseUrl } from "../../hooks/network";
import { Collection } from "../../hooks/collection";

const TitleBox = styled(Box)(({ theme }) => `
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    z-index: 100;
    transition: opacity 0.5s;
    background-color: ${alpha(theme.palette.primary.light, 0.9)};
    opacity: 0;
    user-select: none;
    border-radius: 4px;

    h4 {
        color: ${theme.palette.primary.contrastText};
        padding: ${theme.spacing(1)};
        text-overflow: ellipsis;
        overflow: hidden;
    }

    :hover {
        opacity: 1;
    }

    button:hover, a:hover {
        background-color: rgba(255,255,255,0.3);
    }

    .toolbar {
        position: absolute;
        bottom: 0;
        left: 0;
    }

    &.small {
        opacity: 1;
        height: auto;
        position: absolute;
        bottom: 0;
        width: 100%;

        h4 {
            display: none;
        }

        .toolbar {
            position: static;
        }
    }
`);

type Props = {
    id: number,
    title: string,
    language: string,
    collection: Collection,
    onlyPreview: boolean,
}

const PictogramPreview: React.FC<Props> = ({ id, title, language, collection, onlyPreview }) => {
    const [isLoading, setLoading] = useState(true);
    const src = `${apiBaseUrl}/pictograms/${id}`;

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

    const onAddToCollection = (ev: React.MouseEvent) => {
        ev.stopPropagation();
        ev.preventDefault();

        collection.storeNew(id, title, src);
    }

    const image = <img
        src={src}
        alt={title}
        title={title}
        crossOrigin="anonymous"
        onLoad={() => setLoading(false)}
        style={{ position: 'absolute', top: 0, left: 0, maxWidth: '100%' }} />;

    const titleBox = <TitleBox className={onlyPreview ? 'small' : ''}>
        <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" align="center">{title}</Typography>
        </Box>
        <Box p={1} className="toolbar">
            <Stack spacing={1} direction="row">
                <IconButton onClick={onDownload}><DownloadIcon style={{ color: 'white' }} /></IconButton>
                {Clipboard.hasSupport() && <IconButton onClick={onCopyToClipboard}><CopyIcon style={{ color: 'white' }} /></IconButton>}
                <IconButton disabled={collection.count(id) > 0} onClick={onAddToCollection}><AddIcon style={{ color: 'white', opacity: collection.count(id) > 0 ? 0.4 : 1 }} /></IconButton>
            </Stack>
        </Box>
    </TitleBox>;

    return (
        <Paper>
            <Box sx={{ paddingTop: '100%', position: 'relative' }}>
                {onlyPreview
                    ?
                    <Box>
                        {image}
                        {titleBox}
                    </Box>
                    :
                    <Link to={`/pictogram/${language}/${id}`} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, textDecoration: 'none' }}>
                        {image}
                        {titleBox}
                    </Link>
                }
                {isLoading && <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', marginLeft: '-20px', marginTop: '-20px' }} />}
            </Box>
        </Paper>
    )
}

export default PictogramPreview;