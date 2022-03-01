import { Alert, Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material";
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Delete';
import BackIcon from '@mui/icons-material/ArrowLeft';
import SearchIcon from '@mui/icons-material/Search';
import { Trans, useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useCollection } from "../../hooks/collection";
import { getPictogramUrl } from "../../hooks/network";

type Props = {

}

const PictogramCollection: React.FC<Props> = () => {
    const { t, i18n } = useTranslation();
    const collection = useCollection();
    const history = useHistory();

    return (
        <Box>
            <Stack direction="row" mb={3}>
                <Button component={RouterLink} to="/" variant="outlined" size="small" startIcon={<BackIcon />}>{t('browse')}</Button>
            </Stack>
            <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" mb={5}>{t('collection.header')}</Typography>

                {collection.size === 0 &&
                    <Alert severity="info">
                        <Trans i18nKey="collection.empty">Keine gespeicherten Piktogramme gefunden.</Trans>
                        <Box mt={1}>
                            <Button component={RouterLink} to="/" variant="outlined" size="small" startIcon={<SearchIcon />}>{t('browse')}</Button>
                        </Box>
                    </Alert>}
                <List>
                    {Object.entries(collection.content).map(([key, item]) => {
                        const options = item.state.options;
                        const url = getPictogramUrl(item.id, options.colorized, options.resolution, options.skinColor, options.hairColor);

                        return (
                            <ListItem key={key} secondaryAction={
                                <IconButton onClick={() => collection.delete(item.id.toString(), item.version)}><RemoveIcon /></IconButton>
                            } disablePadding>
                                <ListItemButton onClick={() => history.push(`/pictogram/${i18n.language}/${item.id}/${item.version}`)}>
                                    <ListItemAvatar>
                                        <Avatar src={url.href} sx={{ borderRadius: 0 }}></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.title} secondary={item.modified.toLocaleString()} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
        </Box>
    )
}

export default PictogramCollection;