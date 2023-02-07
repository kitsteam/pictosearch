import { Box, Typography, Stack, FormLabel } from '@mui/material';
import React from 'react';
import { CirclePicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import { backgroundColors } from '../../../data/colors';
import { Action, updateBackground } from "../state/actions";

type Props = {
  backgroundColor: string,
  dispatch: React.Dispatch<Action>,
}

const BackgroundOptions: React.FC<Props> = ({ backgroundColor, dispatch }) => {
  const { t } = useTranslation();

  const setBackgroundColor = (bgColor: string) => dispatch(updateBackground(bgColor));

  return (
    <Box>
      <Typography variant="subtitle2">{t('config.background')}</Typography>

      <Stack spacing={2} sx={{ marginLeft: 3, marginTop: 2 }}>
        <Box>
          <FormLabel>{t('config.backgroundColor')}</FormLabel>
          <Box sx={{ maxWidth: 550, marginTop: 1 }}>
            <CirclePicker colors={backgroundColors} color={backgroundColor} onChangeComplete={color => setBackgroundColor(color.hex.toLowerCase())} />
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default BackgroundOptions;