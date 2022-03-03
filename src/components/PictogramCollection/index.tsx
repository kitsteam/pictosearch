import { Alert, Box, Button, CircularProgress, IconButton, List, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowLeft';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ArchiveIcon from '@mui/icons-material/Archive';
import PDFIcon from '@mui/icons-material/PictureAsPdf';
import { Trans, useTranslation } from "react-i18next";
import { useCollection } from "../../hooks/collection";
import ListItem from "./ListItem";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

class Cache<Type = any> {
    protected static instance: Cache = new Cache();

    protected cache: { [key: string]: Type } = {};

    protected constructor() {

    }

    public static get() {
        return this.instance;
    }

    public add(key: string, entry: Type) {
        this.cache[key] = entry;
    }

    public remove(key: string) {
        delete this.cache[key];
    }

    public get(key: string): Type | undefined {
        return this.cache[key];
    }

    public getAll(): [string, Type][] {
        return Object.entries(this.cache);
    }
}

class ImageCache extends Cache<string> {

}

type Props = {

}

const PictogramCollection: React.FC<Props> = () => {
    const { t } = useTranslation();
    const collection = useCollection();
    const cache = ImageCache.get();

    const [error, setError] = useState('');
    const [progressZip, setProgressZip] = useState(false);
    const [progressPdf, setProgressPdf] = useState(false);
    const [isDeletingAll, setIsDeletingAll] = useState(false);

    const onDownloadAsZip = () => {
        setProgressZip(true);
        setError('');

        const archive = new JSZip();

        Object.entries(collection.content).forEach(([key, item]) => {
            const content = cache.get(key).replace(/^data:image\/png;base64,/, '');

            archive.file(`${item.id}_${item.title}_${item.version}.png`, content, {
                base64: true,
                date: item.modified,
            });
        });

        archive.generateAsync({ type: 'blob' }).then(content => {
            saveAs(content, 'pictograms.zip');
        }).catch(err => {
            console.log('Could not create zip file', err);

            setError(t('collection.archive-error'));
        }).finally(() => {
            setProgressZip(false);
        });
    }

    const onDownloadAsPdf = () => {
        setProgressPdf(true);
        setError('');

        const doc = new jsPDF();

        Object.entries(collection.content).sort((a, b) => a[1].created > b[1].created ? 1 : -1).forEach(([key], index) => {
            if (index > 0 && index % 6 === 0) {
                doc.addPage();
            }

            const size = 90;
            const left = (index % 2) * 100 + 10;
            const top = (Math.floor((index % 6) / 2) * 98) + 5;

            doc.addImage(cache.get(key), 'PNG', left, top, size, size);
        });

        doc.save('pictograms');

        setProgressPdf(false);
    }

    return (
        <Box>
            <Stack direction="row" mb={3}>
                <Button component={RouterLink} to="/search" variant="outlined" size="small" startIcon={<BackIcon />}>{t('browse')}</Button>
            </Stack>
            <Paper sx={{ padding: { xs: 1, sm: 3 } }}>
                <Typography variant="h5" mb={5}>{t('collection.header')}</Typography>

                {collection.size === 0 &&
                    <Alert severity="info">
                        <Trans i18nKey="collection.empty">Keine gespeicherten Piktogramme gefunden.</Trans>
                        <Box mt={1}>
                            <Button component={RouterLink} to="/" variant="outlined" size="small" startIcon={<SearchIcon />}>{t('browse')}</Button>
                        </Box>
                    </Alert>}
                <List>
                    {Object.entries(collection.content).sort((a, b) => a[1].created > b[1].created ? 1 : -1).map(([key, item]) => {
                        return <ListItem {...{ key, item }} onLoaded={(image) => cache.add(key, image)} deleteItem={() => collection.delete(item.id.toString(), item.version)} />;
                    })}
                </List>
                <Stack direction={{ xs: 'column', sm: 'row' }} mt={3} spacing={1}>
                    <Button
                        disabled={progressZip || progressPdf || collection.size === 0}
                        variant="contained"
                        color="primary"
                        onClick={onDownloadAsZip}
                        startIcon={progressZip ? <CircularProgress size="1em" /> : <ArchiveIcon />}>
                        {t('Download as ZIP')}
                    </Button>
                    <Button
                        disabled={progressZip || progressPdf || collection.size === 0}
                        variant="contained"
                        color="primary"
                        onClick={onDownloadAsPdf}
                        startIcon={progressPdf ? <CircularProgress size="1em" /> : <PDFIcon />}>{t('Download as PDF')}</Button>

                    <Box flexGrow={1}></Box>

                    {isDeletingAll ?
                        <Stack direction="row" spacing={1}>
                            <Button
                                sx={{ flexGrow: { xs: 1, sm: 0 } }}
                                disabled={progressZip || progressPdf}
                                variant="contained"
                                color="error"
                                onClick={() => { collection.deleteAll(); setIsDeletingAll(false); }}
                                startIcon={<DeleteIcon />}>{t('Confirm deletion')}</Button>
                            <IconButton size="small" onClick={() => setIsDeletingAll(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                        :
                        <Button
                            disabled={progressZip || progressPdf || collection.size === 0}
                            variant="outlined"
                            color="error"
                            onClick={() => setIsDeletingAll(true)}
                            startIcon={<DeleteIcon />}>{t('delete all')}</Button>}
                </Stack>
                {error && <Box mt={3}><Alert severity="warning">{error}</Alert></Box>}
            </Paper>
        </Box>
    )
}

export default PictogramCollection;