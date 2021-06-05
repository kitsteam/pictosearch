import { Box, Typography, Stack, FormLabel } from '@material-ui/core';
import React from 'react';
import { backgroundColors } from '../../../data/colors';
import ColorSelection from '../ColorSelection';

type Props = {
  backgroundColor: string,
  setBackgroundColor: (bgColor: string) => void,
}

const BackgroundOptions: React.FC<Props> = ({ backgroundColor, setBackgroundColor }) => {

  return (
    <Box>
      <Typography variant="subtitle2">Hintergrund</Typography>

      <Stack spacing={2} sx={{ marginLeft: 3, marginTop: 2 }}>
        <Box>
          <FormLabel>Hintergrundfarbe</FormLabel>
          <Box sx={{ maxWidth: 550, marginTop: 1 }}>
            <ColorSelection colors={backgroundColors} color={backgroundColor} onChangeComplete={color => setBackgroundColor(color.hex.toLowerCase())} />
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default BackgroundOptions;