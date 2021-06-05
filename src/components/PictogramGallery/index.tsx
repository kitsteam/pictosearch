import { Box, FormControl, Grid, InputLabel, MenuItem, Pagination, Select } from '@material-ui/core';
import React, { useState } from 'react';
import PictogramPreview from './PictogramPreview';

const itemsPerPageSelection = [12, 36, 48, 96];

type Props = {
    items: { id: number, title: string }[]
    language: string
}

const PictogramGallery: React.FC<Props> = ({ items, language }) => {
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageSelection[0]);
    const [page, setPage] = useState(1);

    const numberOfPages = Math.ceil(items.length / itemsPerPage);
    const pageItems = items.slice((page - 1) * itemsPerPage, ((page - 1) * itemsPerPage) + itemsPerPage);

    return (
        <Box paddingTop={3} paddingBottom={3}>
            {numberOfPages > 1 && <Box display="flex" justifyContent="center">
                <Pagination count={numberOfPages} page={page} onChange={(ev, page) => setPage(page)} />
            </Box>}
            <Grid spacing={3} container mt={1} mb={3}>
                {pageItems.map(item => <Grid key={item.id} xs={6} sm={6} md={4} lg={3} item>
                    <PictogramPreview id={item.id} title={item.title} language={language} />
                </Grid>)}
            </Grid>
            {numberOfPages > 1 && <Box m={3} display="flex" justifyContent="center">
                <Pagination count={numberOfPages} page={page} onChange={(ev, page) => setPage(page)} />
            </Box>}
            {items.length > itemsPerPageSelection[0] && <Box display="flex" justifyContent="flex-end" mt={-3}>
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