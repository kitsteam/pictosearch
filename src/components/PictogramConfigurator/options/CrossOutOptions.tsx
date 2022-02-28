import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import WideSwitchLabel from '../WideSwitchLabel';

type Props = {
    crossedOut: boolean,
    setCrossedOut: (crossedOut: boolean) => void,
}

const CrossOutOptions: React.FC<Props> = ({ crossedOut, setCrossedOut }) => {
    const { t } = useTranslation();

    return (
        <Box>
            <WideSwitchLabel label={t('config.crossOut')} checked={crossedOut} onChange={checked => setCrossedOut(checked)} />
        </Box>
    )
}

export default CrossOutOptions;