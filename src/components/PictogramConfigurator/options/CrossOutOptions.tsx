import { Box } from '@material-ui/core';
import React from 'react';
import WideSwitchLabel from '../WideSwitchLabel';

type Props = {
    crossedOut: boolean,
    setCrossedOut: (crossedOut: boolean) => void,
}

const CrossOutOptions: React.FC<Props> = ({ crossedOut, setCrossedOut }) => {
    return (
        <Box>
            <WideSwitchLabel label="Durchgestrichen" checked={crossedOut} onChange={checked => setCrossedOut(checked)} />
        </Box>
    )
}

export default CrossOutOptions;