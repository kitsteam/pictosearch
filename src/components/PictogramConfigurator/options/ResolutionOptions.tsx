import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import WideSwitchLabel from '../WideSwitchLabel';

type Props = {
    enabled: boolean,
    onChange: (enabled: boolean) => void,
}

const ResolutionOptions: React.FC<Props> = ({enabled, onChange}) => {
    const { t } = useTranslation();

    return (
        <Box>
            <WideSwitchLabel label={t('config.highResolution')} checked={enabled} onChange={onChange} />
        </Box>
    )
}

export default ResolutionOptions;