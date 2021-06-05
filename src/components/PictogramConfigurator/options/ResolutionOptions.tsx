import { Box } from '@material-ui/core';
import React from 'react';
import WideSwitchLabel from '../WideSwitchLabel';

type Props = {
    enabled: boolean,
    onChange: (enabled: boolean) => void,
}

const ResolutionOptions: React.FC<Props> = ({enabled, onChange}) => {
    return (
        <Box>
            <WideSwitchLabel label="Hohe Auflösung" checked={enabled} onChange={onChange} />
        </Box>
    )
}

export default ResolutionOptions;