import { Alert, Box, Button, CircularProgress, IconButton, List as MUIList, Paper, Stack, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ArchiveIcon from '@mui/icons-material/Archive';
import PDFIcon from '@mui/icons-material/PictureAsPdf';
import { Trans, useTranslation } from "react-i18next";
import ListItem from "./ListItem";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { ImageCache } from "../../utils/Cache";
import { Collection } from "../../hooks/collection";

type Props = {
    collection: Collection,
}

const List: React.FC<Props> = ({ collection }) => {
    const { t } = useTranslation();
    const cache = ImageCache.get();

    const [error, setError] = useState('');
    const [progressZip, setProgressZip] = useState(false);
    const [progressPdf, setProgressPdf] = useState(false);
    const [isDeletingAll, setIsDeletingAll] = useState(false);
    const [currentRenderKey, setCurrentRenderKey] = useState('');

    const onDownloadAsZip = async () => {
        setProgressZip(true);
        setError('');

        const archive = new JSZip();
        const entries = Object.entries(collection.content);

        for (const [key, item] of entries) {
            let content = cache.get(key);

            if (!content) {
                setCurrentRenderKey(key);

                content = await cache.waitAndGet(key);

                if (!content) {
                    console.log(`No cached version of pictogram ${key} available.`);
                    continue;
                }
            }

            content = content.replace(/^data:image\/png;base64,/, '');

            archive.file(`${item.id}_${item.title}_${item.version}.png`, content, {
                base64: true,
                date: item.modified,
            });
        }

        archive.file('COPYING', t('config.clipboardLicense'));

        archive.generateAsync({ type: 'blob' }).then(content => {
            saveAs(content, 'pictograms.zip');
        }).catch(err => {
            console.log('Could not create zip file', err);

            setError(t('collection.archive-error'));
        }).finally(() => {
            setProgressZip(false);
        });
    }

    const onDownloadAsPdf = async () => {
        setProgressPdf(true);
        setError('');

        const doc = new jsPDF();
        const entries = Object.entries(collection.content).sort((a, b) => a[1].created > b[1].created ? 1 : -1);

        let index = 0;
        for (const [key] of entries) {
            let content = cache.get(key);

            if (!content) {

                setCurrentRenderKey(key);

                content = await cache.waitAndGet(key);

                if (!content) {
                    console.log(`No cached version of pictogram ${key} available.`);
                    continue;
                }
            }

            if (index > 0 && index % 6 === 0) {
                doc.addPage();
            }

            const size = 90;
            const left = (index % 2) * 100 + 10;
            const top = (Math.floor((index % 6) / 2) * 98) + 5;

            doc.addImage(content, 'PNG', left, top, size, size);

            index++;
        }

        doc.save('pictograms');

        setProgressPdf(false);
    }

    const deleteItem = useCallback((key: number, version: string) => collection.delete(key.toString(), version), [collection]);
    const entries = useMemo(() => Object.entries(collection.content).sort((a, b) => a[1].created > b[1].created ? 1 : -1), [collection.content]);

    return (
        <Paper sx={{ padding: { xs: 1, sm: 3 } }}>
            <Typography variant="h5" mb={5}>{t('collection.header')}</Typography>

            {collection.size === 0 &&
                <Alert severity="info">
                    <Trans i18nKey="collection.empty">Keine gespeicherten Piktogramme gefunden.</Trans>
                    <Box mt={1}>
                        <Button component={RouterLink} to="/" variant="outlined" size="small" startIcon={<SearchIcon />}>{t('browse')}</Button>
                    </Box>
                </Alert>}
            <MUIList>
                {entries.map(([key, item]) => {
                    return <ListItem
                        key={key}
                        id={key}
                        item={item}
                        deleteItem={deleteItem}
                        shouldRender={key === currentRenderKey} />;
                })}
            </MUIList>
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
    )
}

export default List;