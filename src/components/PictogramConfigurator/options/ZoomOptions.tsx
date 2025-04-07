import { Box, FormLabel, GridLegacy as Grid, InputAdornment, Slider, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Action, updateZoom } from "../state/actions";

type Props = {
    zoom: number,
    dispatch: React.Dispatch<Action>
}

const ZoomOptions: React.FC<Props> = ({ zoom, dispatch }) => {
    const { t } = useTranslation();

    const setZoom = (zoom: number) => dispatch(updateZoom(zoom));

    return (
        <Box>
            <Typography variant="subtitle2">{t('config.zoom')}</Typography>

            <Stack spacing={2} sx={{ marginLeft: 3, marginTop: 2 }}>
                <Box>
                    <FormLabel>{t('config.zoomStep')}</FormLabel>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Slider value={zoom} onChange={(ev, newValue) => setZoom(newValue as number)} step={10} min={-90} max={200} />
                        </Grid>
                        <Grid item>
                            <TextField
                                value={zoom}
                                onChange={ev => setZoom(parseInt(ev.target.value, 10))}
                                size="small"
                                inputProps={{
                                    step: 10,
                                    min: -90,
                                    max: 200,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                                }}>
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Box>
    )
}

export default ZoomOptions;