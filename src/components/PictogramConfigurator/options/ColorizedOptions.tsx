import { Box, Stack, FormLabel } from '@mui/material';
import React from 'react';
import { Color } from 'react-color';
import { useTranslation } from 'react-i18next';
import { SkinColor, HairColor } from '../../../data/colors';
import ColorSelection from '../ColorSelection';
import WideSwitchLabel from '../WideSwitchLabel';

type Props = {
    colorized: boolean,
    skinColor: SkinColor,
    skin: boolean,
    hairColor: HairColor,
    hair: boolean,
    setColorized: (colorized: boolean) => void,
    setSkinColor: (skinColor: SkinColor) => void,
    setHairColor: (hairColor: HairColor) => void,
}

const ColorizedOptions: React.FC<Props> = ({ colorized, skinColor, skin, hairColor, hair, setColorized, setSkinColor, setHairColor }) => {
    const { t } = useTranslation();

    return (
        <Box>
            <WideSwitchLabel checked={colorized} onChange={setColorized} label={t('config.colorized')}/>

            {colorized && (skin || hair) && <Stack spacing={2} sx={{ marginLeft: 3, marginTop: 2 }}>
                {skin && <Box>
                    <FormLabel>{t('config.skinColor')}</FormLabel>
                    <Box sx={{ maxWidth: 550, marginTop: 1 }}>
                        <ColorSelection
                            color={skinColor as unknown as Color}
                            colors={Object.values<string>(SkinColor as any).filter(color => color.startsWith('#'))}
                            onChangeComplete={(color) => setSkinColor(color.hex.toUpperCase() as unknown as SkinColor)} />
                    </Box>
                </Box>}
                {hair && <Box>
                    <FormLabel>{t('config.hairColor')}</FormLabel>
                    <Box sx={{ maxWidth: 550, marginTop: 1 }}>
                        <ColorSelection
                            color={hairColor as unknown as Color}
                            colors={Object.values<string>(HairColor as any).filter(color => color.startsWith('#'))}
                            onChangeComplete={(color) => setHairColor(color.hex.toUpperCase() as unknown as HairColor)} />
                    </Box>
                </Box>}
            </Stack>}
        </Box>
    )
}

export default ColorizedOptions;