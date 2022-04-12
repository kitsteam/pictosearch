import { Box, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Pagination, Select, Switch, Theme, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Collection } from "../../hooks/collection";
import { useQuery } from "../../hooks/location";
import PictogramPreview from './PictogramPreview';

const itemsPerPageSelection = [12, 36, 48, 96];

type Props = {
    items: { id: number, title: string }[]
    language: string
    collection: Collection,
}

const PictogramGallery: React.FC<Props> = ({ items, language, collection }) => {
    const [previewOnly, setPreviewOnly] = useState(false);
    const history = useHistory();
    const queryParams = useQuery();
    const itemsPerPage = parseInt(queryParams.get('itemsPerPage') || '', 10) || itemsPerPageSelection[0];
    const page = parseInt(queryParams.get('page') || '', 10) || 1;

    const largeScreen = useMediaQuery<Theme>(theme => theme.breakpoints.up('sm'));

    const numberOfPages = Math.ceil(items.length / itemsPerPage);
    const pageItems = items.slice((page - 1) * itemsPerPage, ((page - 1) * itemsPerPage) + itemsPerPage);

    const changeQuery = (name: string, value: string | number) => {
        const searchParams = new URLSearchParams(queryParams.toString());
        value = typeof value === 'string' ? parseInt(value, 10) : value;

        if (value) {
            searchParams.set(name, value.toString());
        } else {
            searchParams.delete(name);
        }

        history.push({
            search: '?' + searchParams.toString(),
        });
    };

    const changeItemsPerPage = (value: string | number) => {
        const searchParams = new URLSearchParams(queryParams.toString());
        const newNumberOfPages = Math.ceil(items.length / parseInt(value.toString(), 10));

        searchParams.set('itemsPerPage', value.toString());

        if (page > newNumberOfPages) {
            searchParams.set('page', newNumberOfPages.toString());
        }

        history.push({
            search: '?' + searchParams.toString(),
        });
    };

    return (
        <Box paddingTop={3} paddingBottom={3}>
            {numberOfPages > 1 && <Box display="flex" justifyContent="center">
                <Pagination count={numberOfPages} page={page} siblingCount={1} boundaryCount={largeScreen ? 1 : 0} onChange={(ev, page) => { page && changeQuery('page', page) }} />
            </Box>}
            <Grid spacing={3} container mt={1} mb={3}>
                {pageItems.map(item => <Grid key={item.id} xs={6} sm={6} md={4} lg={3} item>
                    <PictogramPreview id={item.id} title={item.title} language={language} collection={collection} onlyPreview={previewOnly} />
                </Grid>)}
            </Grid>
            {numberOfPages > 1 && <Box mt={3} mb={3} display="flex" justifyContent="center">
                <Pagination count={numberOfPages} page={page} siblingCount={1} boundaryCount={largeScreen ? 1 : 0} onChange={(ev, page) => { page && changeQuery('page', page) }} />
            </Box>}
            <Box display="flex" justifyContent="space-between" sx={{ marginTop: { xs: 0, sm: -3 } }}>
                <Box>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={previewOnly} onChange={(ev) => setPreviewOnly(ev.target.checked)} />} label="Nur Vorschau, ohne Editor." />
                    </FormGroup>
                </Box>
                {items.length > itemsPerPageSelection[0] &&
                    <FormControl size="small" sx={{ minWidth: '80px' }}>
                        <InputLabel id="per-page-label">Pro Seite</InputLabel>
                        <Select labelId="per-page-label" value={itemsPerPage} onChange={ev => changeItemsPerPage(ev.target.value)} label="Pro Seite">
                            {itemsPerPageSelection.map(count => <MenuItem key={count} value={count}>{count}</MenuItem>)}
                        </Select>
                    </FormControl>
                }
            </Box>
        </Box>
    )
}

export default PictogramGallery;