import { Accordion, AccordionDetails, AccordionSummary, Box, Collapse, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Select, Slider, Switch, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import WideSwitchLabel from '../WideSwitchLabel';
import { fontColors } from '../../../data/colors';
import { useTranslation } from 'react-i18next';
import { TextState } from "../state";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const fontFamilies = ['FiraSans']

// Font style corresponds to font-weight in CSS
// Check `kits.css` for available font weights
export enum FontStyle {
    light = '300',
    normal = '400',
    bold = '700',
}

type FontProps = {
    fontSize: number,
    fontStyle: FontStyle,
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

    const setEnabled = (enabled: boolean) => onChange({ ...state, enabled });
    const setStyle = (style: FontProps) => onChange({ ...state, style });
    const setValue = (value: string) => onChange({ ...state, value });

    const [showFormatting, setShowFormatting] = useState(false);

    const setFontSize = (fontSize: number) => setStyle({ ...style, fontSize });
    const setFontFamily = (fontFamily: string) => setStyle({ ...style, fontFamily });
    const setFontStyle = (fontStyle: FontStyle) => setStyle({ ...style, fontStyle });
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
                        multiple={false}
                        value={value}
                        onChange={(ev, newValue) => setValue(newValue || '')}
                        options={keywords}
                        renderInput={(params) => <TextField {...params} label={t('config.writeText')} value={value} onChange={(ev) => setValue(ev.target.value || '')} />}
                    />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <FormControlLabel control={<Switch checked={style.uppercase} onChange={ev => setUppercase(ev.target.checked)} />} label={t('config.upperCase') as string} />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Accordion expanded={showFormatting} onChange={() => setShowFormatting(!showFormatting)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ cursor: 'pointer', ...style, fontSize: 'inherit' }}>
                                {t('config.formatting')} ({style.fontSize})
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
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

                            {fontFamilies.length > 1 && (
                                <Box sx={{ marginTop: 2 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="FontFamily">{t('config.fontFamily')}</InputLabel>
                                        <Select labelId="FontFamily" value={style.fontFamily} onChange={ev => setFontFamily(ev.target.value)} label={t('config.fontFamily')}>
                                            {fontFamilies.map(font => <MenuItem key={font} style={{ fontFamily: font }} value={font}>{font}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}

                            <Box sx={{ marginTop: 2 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="FontStyle">{t('config.fontStyle')}</InputLabel>
                                    <Select labelId="FontStyle" value={style.fontStyle} onChange={ev => setFontStyle(ev.target.value as FontStyle)} label={t('config.fontStyle')}>
                                        {Object.entries(FontStyle).map(([key, fontStyle]) =>
                                            <MenuItem key={key} value={fontStyle}>{key}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Box>
                        </AccordionDetails>

                    </Accordion>
                </Box>
            </Collapse>
        </Box>
    )
}

export default TextOptions;