import { Box, Stack, FormLabel, FormControl, InputLabel, MenuItem, Select, Collapse, Typography } from '@material-ui/core';
import React from 'react';
import { tenseColors } from '../../../data/colors';
import ColorSelection from '../ColorSelection';

export enum Tense { past, present, future };

type Props = {
    tense: Tense,
    setTense: (tense: Tense) => void,
    tenseColor: string,
    setTenseColor: (color: string) => void,
}

const VerbalTenseOptions: React.FC<Props> = ({ tense, setTense, tenseColor, setTenseColor }) => {
    return (
        <Box>
            <Typography variant="subtitle2">Zeitformen</Typography>

            <Stack spacing={2} sx={{ marginLeft: 3, marginTop: 2 }}>
                <FormControl fullWidth size="small">
                    <InputLabel id="">Zeitform</InputLabel>
                    <Select labelId="" value={tense} label="Zeitform" onChange={ev => setTense(ev.target.value)}>
                        <MenuItem value={Tense.past}>Vergangenheit</MenuItem>
                        <MenuItem value={Tense.present}>Gegenwart</MenuItem>
                        <MenuItem value={Tense.future}>Zukunft</MenuItem>
                    </Select>
                </FormControl>
                <Collapse in={tense !== Tense.present}>
                    <Box>
                        <FormLabel>Farbe</FormLabel>
                        <Box sx={{ maxWidth: 550, marginTop: 1 }}>
                            <ColorSelection colors={tenseColors} color={tenseColor} onChangeComplete={color => setTenseColor(color.hex)} />
                        </Box>
                    </Box>
                </Collapse>
            </Stack>
        </Box>
    )
}

export default VerbalTenseOptions;