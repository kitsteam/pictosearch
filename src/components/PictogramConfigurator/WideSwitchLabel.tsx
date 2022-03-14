import { Grid, Switch, Typography } from '@mui/material';
import React from 'react';

type Props = {
    label: string
    checked?: boolean,
    onChange?: (checked: boolean) => void,
}

const WideSwitchLabel: React.FC<Props> = ({ label, checked, onChange = (foo) => undefined }) => {
    return (
        <Grid component="label" container alignItems="center" justifyContent="space-between" sx={{ cursor: 'pointer' }}>
            <Grid item>
                <Typography variant="subtitle2">{label}</Typography>
            </Grid>
            <Grid item >
                <Switch checked={checked} onChange={ev => onChange(ev.target.checked)} edge="end" />
            </Grid>
        </Grid>
    )
}

export default WideSwitchLabel;