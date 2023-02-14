import { Box, Button, FormControlLabel, FormGroup, Grid, Switch } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Collection } from "../../hooks/collection";
import { useQuery } from "../../hooks/location";
import PictogramPreview from './PictogramPreview';
import SearchIcon from '@mui/icons-material/Search';
import { t } from 'i18next';

const itemsPerPageSelection = [12, 36, 48, 96];

type Props = {
    items: { id: number, title: string }[]
    language: string
    collection: Collection,
}

const PictogramGallery: React.FC<Props> = ({ items, language, collection }) => {
    const [previewOnly, setPreviewOnly] = useState(false);
    const navigate = useNavigate();
    const queryParams = useQuery();
    const itemsPerPage = parseInt(queryParams.get('itemsPerPage') || '', 10) || itemsPerPageSelection[0];
    const page = parseInt(queryParams.get('page') || '', 10) || 1;

    const pageItems = items.slice((page - 1) * itemsPerPage, ((page - 1) * itemsPerPage) + itemsPerPage);

    const changeItemsPerPage = useCallback((value: string | number) => {
        const searchParams = new URLSearchParams(queryParams.toString());
        const newNumberOfPages = Math.ceil(items.length / parseInt(value.toString(), 10));

        searchParams.set('itemsPerPage', value.toString());

        if (page > newNumberOfPages) {
            searchParams.set('page', newNumberOfPages.toString());
        }

        navigate({
            search: '?' + searchParams.toString(),
        });
    }, [items, page, queryParams, navigate]);
    
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            if (scrollTop + clientHeight >= scrollHeight) {
                changeItemsPerPage(itemsPerPage + 12);
            }
        }

        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [items, itemsPerPage, changeItemsPerPage, page, queryParams])

    return (
        <Box paddingTop={3} paddingBottom={3}>
            <Box>
                <FormGroup>
                    <FormControlLabel control={<Switch checked={previewOnly} onChange={(ev) => setPreviewOnly(ev.target.checked)} />} label="TeamMapper Drag'n'Drop" />
                </FormGroup>
            </Box>
            <Grid spacing={3} container mt={1} mb={3}>
                {pageItems.map(item => <Grid key={item.id} xs={6} sm={6} md={4} lg={3} item>
                    <PictogramPreview id={item.id} title={item.title} language={language} collection={collection} onlyPreview={previewOnly} />
                </Grid>)}
            </Grid>
            <Button
                variant="contained"
                type="submit"
                startIcon={<SearchIcon />}
                onClick={() => changeItemsPerPage(itemsPerPage + 12)}>
                {t('More')}
            </Button>
        </Box>
    )
}

export default PictogramGallery;