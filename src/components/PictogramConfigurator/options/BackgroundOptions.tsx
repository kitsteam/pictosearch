import { Box, Typography, Stack, FormLabel } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { backgroundColors } from '../../../data/colors';
import ColorSelection from '../ColorSelection';

type Props = {
  backgroundColor: string,
  setBackgroundColor: (bgColor: string) => void,
}

const BackgroundOptions: React.FC<Props> = ({ backgroundColor, setBackgroundColor }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="subtitle2">{t('config.background')}</Typography>

      <Stack spacing={2} sx={{ marginLeft: 3, marginTop: 2 }}>
        <Box>
          <FormLabel>{t('config.backgroundColor')}</FormLabel>
          <Box sx={{ maxWidth: 550, marginTop: 1 }}>
            <ColorSelection colors={backgroundColors} color={backgroundColor} onChangeComplete={color => setBackgroundColor(color.hex.toLowerCase())} />
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default BackgroundOptions;