import { Typography, Box, Chip } from '@mui/material';
import React from 'react';
import { IPictogramResponse } from '../../hooks/network';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LinkChip: React.FC<{ label: string }> = ({ label }) => <Chip label={label} variant="outlined" style={{ marginRight: 8, marginBottom: 8 }} clickable component={RouterLink} to={`/search?q=${encodeURIComponent(label)}`} />

type Props = {
    data: IPictogramResponse
}

const MetaData: React.FC<Props> = ({ data }) => {
    const { t, i18n } = useTranslation();

    if (!data) {
        return <></>;
    }

    const { categories, tags } = data;

    return (
        <>
            {categories.length > 0 && <>
                <Typography variant="subtitle2" gutterBottom={true} sx={{marginTop: 3}}>{t('meta.categories')}</Typography>
                <Box mb={2}>
                    {categories.map(category => {
                        const categoryKey = `category.${category.replaceAll(' ', '-')}`;
                        const hasTranslation = i18n.exists(categoryKey) && !!t(categoryKey);

                        return <LinkChip key={category} label={hasTranslation ? t(categoryKey) : category} />;
                    })}
                </Box>
            </>}
            {tags.length > 0 && <>
                <Typography variant="subtitle2" gutterBottom={true}>{t('meta.tags')}</Typography>
                <Box mb={2}>
                    {tags.map(tag => {
                        const categoryKey = `category.${tag.replaceAll(' ', '-')}`;
                        const hasTranslation = i18n.exists(categoryKey) && !!t(categoryKey);

                        return <LinkChip key={tag} label={hasTranslation ? t(categoryKey) : tag} />;
                    })}
                </Box>
            </>}
        </>
    )
}

export default MetaData;