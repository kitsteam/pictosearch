import { Box, Button, Stack, Typography } from "@mui/material";
import React from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowLeft';
import { Trans, useTranslation } from "react-i18next";
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
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
            <Trans i18nKey="search.license">
                Sergio Palao (Urheber), ARASAAC (<Link to="http://www.arasaac.org">arasaac.org</Link>),
                Regierung von Aragón in Spanien (Eigentümer), <Link to="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en">CC BY-SA-NC 4.0</Link>
            </Trans>
            </Typography>
            </Box>
    )
}

export default PictogramCollection;