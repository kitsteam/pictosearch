import { Box, Stack, FormControl, InputLabel, Select, MenuItem, FormLabel, Collapse } from '@material-ui/core';
import React from 'react';
import { identifierColors } from '../../../data/colors';
import ColorSelection from '../ColorSelection';
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
    setIdentifier: (identifier: Identifier) => void,
    identifierPosition: IdentifierPosition,
    setIdentifierPosition: (position: IdentifierPosition) => void,
    identifierColor: string,
    setIdentifierColor: (color: string) => void,
}

const IdentifierOptions: React.FC<Props> = ({ identifier, identifierPosition, identifierColor, setIdentifier, setIdentifierPosition, setIdentifierColor }) => {
    return (
        <Box>
            <WideSwitchLabel label="Bezeichner" checked={identifier !== Identifier.none} onChange={checked => setIdentifier(checked ? Identifier.classroom : Identifier.none)} />

            <Collapse in={identifier !== Identifier.none}>
                <Stack spacing={2} sx={{ marginLeft: 3, marginTop: 2 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="">Bezeichnung</InputLabel>
                        <Select labelId="" value={identifier === Identifier.none ? '' : identifier} onChange={ev => setIdentifier(ev.target.value as Identifier)} label="Bezeichnung">
                            <MenuItem value={Identifier.classroom}>Klassenzimmer</MenuItem>
                            <MenuItem value={Identifier.health}>Gesundheit</MenuItem>
                            <MenuItem value={Identifier.health_color}>Gesundheit mit Farbe</MenuItem>
                            <MenuItem value={Identifier.library}>Bibliothek</MenuItem>
                            <MenuItem value={Identifier.office}>Büro</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                        <InputLabel id="">Position</InputLabel>
                        <Select labelId="" value={identifierPosition} onChange={ev => setIdentifierPosition(ev.target.value)} label="Position">
                            <MenuItem value={IdentifierPosition.left}>Links</MenuItem>
                            <MenuItem value={IdentifierPosition.right}>Rechts</MenuItem>
                        </Select>
                    </FormControl>
                    <Collapse in={identifier !== Identifier.health_color}>
                        <Box>
                            <FormLabel>Farbe</FormLabel>
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