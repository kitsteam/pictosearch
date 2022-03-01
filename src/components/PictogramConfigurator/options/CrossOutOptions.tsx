import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Action, updateCrossedOut } from "../state/actions";
import WideSwitchLabel from '../WideSwitchLabel';

type Props = {
    crossedOut: boolean,
    dispatch: React.Dispatch<Action>,
}

const CrossOutOptions: React.FC<Props> = ({ crossedOut, dispatch }) => {
    const { t } = useTranslation();

    const setCrossedOut = (crossedOut: boolean) => dispatch(updateCrossedOut(crossedOut));

    return (
        <Box>
            <WideSwitchLabel label={t('config.crossOut')} checked={crossedOut} onChange={checked => setCrossedOut(checked)} />
        </Box>
    )
}

export default CrossOutOptions;