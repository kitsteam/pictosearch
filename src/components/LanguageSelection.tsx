import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import languages from '../data/languages';

const availableLanguages = languages.map(language => language.code);

type Props = {
    selected: string,
    onChange: (language: string) => void,
}

const LanguageSelection: React.FC<Props> = ({ selected, onChange }) => {
    const { t, i18n } = useTranslation();

    if (!availableLanguages.includes(selected)) {
        onChange('en');
    }

    const onChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);

        onChange(lang);
    }

    return (
        <FormControl size="small">
            <InputLabel id="">{t('language')}</InputLabel>
            <Select labelId="" value={selected} label={t('language')} onChange={ev => onChangeLanguage(ev.target.value)}>
                {languages.map(language => <MenuItem key={language.code} value={language.code}>{language.text}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default LanguageSelection;