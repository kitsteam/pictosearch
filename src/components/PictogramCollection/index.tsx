import { Box, Button, Stack } from "@mui/material";
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowLeft';
import { useTranslation } from "react-i18next";
import { useCollection } from "../../hooks/collection";
import List from "./List";

type Props = {

}

const PictogramCollection: React.FC<Props> = () => {
    const { t } = useTranslation();
    const collection = useCollection();

    return (
        <Box>
            <Stack direction="row" mb={3}>
                <Button component={RouterLink} to="/search" variant="outlined" size="small" startIcon={<BackIcon />}>{t('browse')}</Button>
            </Stack>
            <List collection={collection} />
        </Box>
    )
}

export default PictogramCollection;