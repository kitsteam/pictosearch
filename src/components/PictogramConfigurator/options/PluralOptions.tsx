import { Box, Stack, FormLabel, Collapse } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { pluralColors } from '../../../data/colors';
import ColorSelection from '../ColorSelection';
import { Action, updatePlural } from "../state/actions";
import WideSwitchLabel from '../WideSwitchLabel';



type Props = {
  plural: boolean,
  pluralColor: string,
  dispatch: React.Dispatch<Action>,
}

const PluralOptions: React.FC<Props> = ({ plural, pluralColor, dispatch }) => {
  const { t } = useTranslation();

  const setPlural = (enabled: boolean) => dispatch(updatePlural(enabled, pluralColor));
  const setPluralColor = (color: string) => dispatch(updatePlural(plural, color));

  return (
    <Box>
      <WideSwitchLabel label={t('config.plural')} checked={plural} onChange={checked => setPlural(checked)} />

      <Collapse in={plural}>
        <Stack spacing={2} sx={{ marginLeft: 3, marginTop: 2 }}>
          <Box>
            <FormLabel>{t('config.color')}</FormLabel>
            <Box sx={{ maxWidth: 550, marginTop: 1 }}>
              <ColorSelection colors={pluralColors} color={pluralColor} onChangeComplete={color => setPluralColor(color.hex)} />
            </Box>
          </Box>
        </Stack>
      </Collapse>
    </Box>
  )
}

export default PluralOptions;