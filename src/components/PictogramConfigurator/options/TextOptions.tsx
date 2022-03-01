import { Autocomplete, Box, Collapse, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Select, Slider, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import WideSwitchLabel from '../WideSwitchLabel';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { fontColors } from '../../../data/colors';
import { useTranslation } from 'react-i18next';
import { TextState } from "../state";

const isFontSupported = (font: string) => (document as any).fonts?.check ? (document as any).fonts.check(`12px ${font}`) : true;

export const fontFamilies = ['Arial', 'Roboto', 'Times New Roman', 'Palatino', 'Garamond', 'Bookman', 'Avant Garde', 'Verdana', 'Georgia', 'Helvetica New'].filter(isFontSupported);

export type FontStyle = {
    fontSize: number,
    fontFamily: string,
    color: string,
    uppercase: boolean,
};

type Props = {
    label: string
    keywords: string[],
    state: TextState,
    onChange: (textState: TextState) => void,
}

const TextOptions: React.FC<Props> = ({ label, keywords, state, onChange }) => {
    const { enabled, style, value } = state;

    const { t } = useTranslation();

    const setEnabled = (enabled: boolean) => onChange({...state, enabled});
    const setStyle = (style: FontStyle) => onChange({...state, style});
    const setValue = (value: string) => onChange({...state, value});

    const [showFormatting, setShowFormatting] = useState(false);

    const setFontSize = (fontSize: number) => setStyle({ ...style, fontSize });
    const setFontFamily = (fontFamily: string) => setStyle({ ...style, fontFamily });
    const setColor = (color: string) => setStyle({ ...style, color });
    const setUppercase = (uppercase: boolean) => setStyle({ ...style, uppercase });

    return (
        <Box>
            <WideSwitchLabel label={label} checked={enabled} onChange={checked => setEnabled(checked)} />

            <Collapse in={enabled}>
                <Box sx={{ marginTop: 2 }}>
                    <Autocomplete
                        freeSolo
                        size="small"
                        value={value}
                        onChange={(ev, newValue) => setValue(newValue || '')}
                        options={keywords}
                        renderInput={(params) => <TextField {...params} label={t('config.writeText')} value={value} onChange={(ev) => setValue(ev.target.value)} />}
                    />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <FormControlLabel control={<Switch checked={style.uppercase} onChange={ev => setUppercase(ev.target.checked)} />} label={t('config.upperCase') as string} />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Typography onClick={() => setShowFormatting(!showFormatting)} sx={{ cursor: 'pointer', ...style, fontSize: 'inherit' }}>
                        {showFormatting ? <CloseIcon fontSize="inherit" /> : <EditIcon fontSize="inherit" />} {t('config.formatting')} ({style.fontFamily}, {style.fontSize}, {style.color})
                    </Typography>
                    <Collapse in={showFormatting}>
                        <Box sx={{ marginTop: 2 }}>
                            <FormLabel>{t('config.fontColor')}</FormLabel>
                            <Box sx={{ maxWidth: 550, marginTop: 1, backgroundColor: '#f1f1f1', borderRadius: 3, padding: 2 }}>
                                <CirclePicker width="100%" colors={fontColors} color={style.color} onChangeComplete={color => setColor(color.hex)} />
                            </Box>
                        </Box>
                        <Box sx={{ marginTop: 2 }}>
                            <FormLabel>{t('config.fontSize')}</FormLabel>
                            <Box sx={{ marginTop: 1 }}>
                                <Slider value={style.fontSize} onChange={(ev, newValue) => setFontSize(newValue as number)} step={1} min={1} max={100} />
                            </Box>
                        </Box>
                        <Box sx={{ marginTop: 2 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="">{t('config.fontFamily')}</InputLabel>
                                <Select labelId="" value={style.fontFamily} onChange={ev => setFontFamily(ev.target.value)} label={t('config.fontFamily')}>
                                    {fontFamilies.map(font => <MenuItem key={font} style={{ fontFamily: font }} value={font}>{font}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Box>
                    </Collapse>
                </Box>
            </Collapse>
        </Box>
    )
}

export default TextOptions;