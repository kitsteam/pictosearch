import { Box, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Theme, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { Collection } from "../../hooks/collection";
import PictogramPreview from './PictogramPreview';

const itemsPerPageSelection = [12, 36, 48, 96];

type Props = {
    items: { id: number, title: string }[]
    language: string
    collection: Collection,
}

const PictogramGallery: React.FC<Props> = ({ items, language, collection }) => {
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageSelection[0]);
    const [page, setPage] = useState(1);
    const largeScreen = useMediaQuery<Theme>(theme => theme.breakpoints.up('sm'));

    const numberOfPages = Math.ceil(items.length / itemsPerPage);
    const pageItems = items.slice((page - 1) * itemsPerPage, ((page - 1) * itemsPerPage) + itemsPerPage);

    return (
        <Box paddingTop={3} paddingBottom={3}>
            {numberOfPages > 1 && <Box display="flex" justifyContent="center">
                <Pagination count={numberOfPages} page={page} siblingCount={1} boundaryCount={largeScreen ? 1 : 0} onChange={(ev, page) => { page && setPage(page) }} />
            </Box>}
            <Grid spacing={3} container mt={1} mb={3}>
                {pageItems.map(item => <Grid key={item.id} xs={6} sm={6} md={4} lg={3} item>
                    <PictogramPreview id={item.id} title={item.title} language={language} collection={collection} />
                </Grid>)}
            </Grid>
            {numberOfPages > 1 && <Box mt={3} mb={3} display="flex" justifyContent="center">
                <Pagination count={numberOfPages} page={page} siblingCount={1} boundaryCount={largeScreen ? 1 : 0} onChange={(ev, page) => { page && setPage(page) }} />
            </Box>}
            {items.length > itemsPerPageSelection[0] && <Box display="flex" justifyContent="flex-end" sx={{ marginTop: { xs: 0, sm: -3 } }}>
                <FormControl size="small" sx={{ minWidth: '80px' }}>
                    <InputLabel id="per-page-label">Pro Seite</InputLabel>
                    <Select labelId="per-page-label" value={itemsPerPage} onChange={ev => setItemsPerPage(parseInt(ev.target.value.toString(), 10))} label="Pro Seite">
                        {itemsPerPageSelection.map(count => <MenuItem key={count} value={count}>{count}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>}
        </Box>
    )
}

export default PictogramGallery;