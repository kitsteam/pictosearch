import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import React from 'react';
import languages from '../data/languages';

const availableLanguages = languages.map(language => language.code);

type Props = {
    selected: string,
    onChange: (language: string) => void,
}

const LanguageSelection: React.FC<Props> = ({selected, onChange}) => {

    if (!availableLanguages.includes(selected)) {
        onChange('de');
    }

    return (
        <FormControl size="small">
            <InputLabel id="">Sprache</InputLabel>
            <Select labelId="" value={selected} label="Sprache" onChange={ev => onChange(ev.target.value)}>
                {languages.map(language => <MenuItem key={language.code} value={language.code}>{language.text}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default LanguageSelection;