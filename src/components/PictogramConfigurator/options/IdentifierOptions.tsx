import { Box, Stack, FormControl, InputLabel, Select, MenuItem, FormLabel, Collapse } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { identifierColors } from '../../../data/colors';
import ColorSelection from '../ColorSelection';
import { Action, updateIdentifier } from "../state/actions";
import WideSwitchLabel from '../WideSwitchLabel';


export enum Identifier {
    none,
    classroom,
    health,
    health_color,
    library,
    office,
}

export enum IdentifierPosition {
    left,
    right,
}

type Props = {
    identifier: Identifier,
    identifierPosition: IdentifierPosition,
    identifierColor: string,
    dispatch: React.Dispatch<Action>,
}

const IdentifierOptions: React.FC<Props> = ({ identifier, identifierPosition, identifierColor, dispatch }) => {
    const { t } = useTranslation();

    const setIdentifier = (type: Identifier) => dispatch(updateIdentifier(type, identifierPosition, identifierColor));
    const setIdentifierPosition = (position: IdentifierPosition) => dispatch(updateIdentifier(identifier, position, identifierColor));
    const setIdentifierColor = (color: string) => dispatch(updateIdentifier(identifier, identifierPosition, color));

    return (
        <Box>
            <WideSwitchLabel label={t('config.label')}checked={identifier !== Identifier.none} onChange={checked => setIdentifier(checked ? Identifier.classroom : Identifier.none)} />

            <Collapse in={identifier !== Identifier.none}>
                <Stack spacing={2} sx={{ marginLeft: 3, marginTop: 2 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="">{t('config.identifier')}</InputLabel>
                        <Select labelId="" value={identifier === Identifier.none ? '' : identifier} onChange={ev => setIdentifier(ev.target.value as Identifier)} label="Bezeichnung">
                            <MenuItem value={Identifier.classroom}>{t('config.identifiers.classroom')}</MenuItem>
                            <MenuItem value={Identifier.health}>{t('config.identifiers.health')}</MenuItem>
                            <MenuItem value={Identifier.health_color}>{t('config.identifiers.healthColor')}</MenuItem>
                            <MenuItem value={Identifier.library}>{t('config.identifiers.library')}</MenuItem>
                            <MenuItem value={Identifier.office}>{t('config.identifiers.office')}</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                        <InputLabel id="">{t('config.position')}</InputLabel>
                        <Select labelId="" value={identifierPosition} onChange={ev => setIdentifierPosition(ev.target.value as IdentifierPosition)} label={t('config.position')}>
                            <MenuItem value={IdentifierPosition.left}>{t('config.left')}</MenuItem>
                            <MenuItem value={IdentifierPosition.right}>{t('config.right')}</MenuItem>
                        </Select>
                    </FormControl>
                    <Collapse in={identifier !== Identifier.health_color}>
                        <Box>
                            <FormLabel>{t('config.color')}</FormLabel>
                            <Box sx={{ marginTop: 1 }}>
                                <ColorSelection colors={identifierColors} color={identifierColor} onChangeComplete={color => setIdentifierColor(color.hex)} />
                            </Box>
                        </Box>
                    </Collapse>
                </Stack>
            </Collapse>
        </Box>
    )
}

export default IdentifierOptions;