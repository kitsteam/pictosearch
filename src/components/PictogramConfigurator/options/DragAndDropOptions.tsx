import { Box } from '@material-ui/core';
import React from 'react';
import WideSwitchLabel from '../WideSwitchLabel';

type Props = {
    dragAndDrop: boolean,
    setDragAndDrop: (dragAndDrop: boolean) => void,
}

const DragAndDropOptions: React.FC<Props> = ({ dragAndDrop, setDragAndDrop }) => {
    return (
        <Box>
            <WideSwitchLabel label="Ziehen und ablegen" checked={dragAndDrop} onChange={checked => setDragAndDrop(checked)} />
        </Box>
    )
}

export default DragAndDropOptions;