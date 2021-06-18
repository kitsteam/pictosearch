import { Box, Stack, FormLabel, Collapse } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { pluralColors } from '../../../data/colors';
import ColorSelection from '../ColorSelection';
import WideSwitchLabel from '../WideSwitchLabel';



type Props = {
  plural: boolean,
  setPlural: (plural: boolean) => void,
  pluralColor: string,
  setPluralColor: (color: string) => void,
}

const PluralOptions: React.FC<Props> = ({ plural, setPlural, pluralColor, setPluralColor }) => {
  const { t } = useTranslation();

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