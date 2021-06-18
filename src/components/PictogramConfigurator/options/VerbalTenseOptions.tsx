import { Box, Stack, FormLabel, FormControl, InputLabel, MenuItem, Select, Collapse, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();

    return (
        <Box>
            <Typography variant="subtitle2">{t('config.verbalTenses')}</Typography>

            <Stack spacing={2} sx={{ marginLeft: 3, marginTop: 2 }}>
                <FormControl fullWidth size="small">
                    <InputLabel id="">{t('config.verbalTense')}</InputLabel>
                    <Select labelId="" value={tense} label={t('config.verbalTense')} onChange={ev => setTense(ev.target.value)}>
                        <MenuItem value={Tense.past}>{t('config.past')}</MenuItem>
                        <MenuItem value={Tense.present}>{t('config.present')}</MenuItem>
                        <MenuItem value={Tense.future}>{t('config.future')}</MenuItem>
                    </Select>
                </FormControl>
                <Collapse in={tense !== Tense.present}>
                    <Box>
                        <FormLabel>{t('config.color')}</FormLabel>
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