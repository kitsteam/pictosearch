import { Box } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import WideSwitchLabel from '../WideSwitchLabel';

type Props = {
    dragAndDrop: boolean,
    setDragAndDrop: (dragAndDrop: boolean) => void,
}

const DragAndDropOptions: React.FC<Props> = ({ dragAndDrop, setDragAndDrop }) => {
    const { t } = useTranslation();

    return (
        <Box>
            <WideSwitchLabel label={t('config.dragAndDrop')} checked={dragAndDrop} onChange={checked => setDragAndDrop(checked)} />
        </Box>
    )
}

export default DragAndDropOptions;