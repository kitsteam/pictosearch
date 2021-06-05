import { Box, FormLabel, Grid, InputAdornment, Slider, Stack, TextField, Typography } from '@material-ui/core';
import React from 'react';

type Props = {
    zoom: number,
    setZoom: (zoom: number) => void,
}

const ZoomOptions: React.FC<Props> = ({ zoom, setZoom }) => {
    return (
        <Box>
            <Typography variant="subtitle2">Zoom</Typography>

            <Stack spacing={2} sx={{ marginLeft: 3, marginTop: 2 }}>
                <Box>
                    <FormLabel>Zoomstufe</FormLabel>
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