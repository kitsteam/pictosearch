import { IconButton, ListItem as MUIListItem, ListItemButton, Avatar, ListItemText, ListItemIcon } from "@mui/material";
import Konva from "konva";
import React, { useCallback, useRef } from 'react';
import { useTranslation } from "react-i18next";
import RemoveIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { CollectionItem } from "../../hooks/collection";
import { getPictogramUrl } from "../../hooks/network";
import { Box } from "@mui/system";
import Pictogram from "../PictogramConfigurator/Pictogram";
import { Resolution } from "../PictogramConfigurator/state";
import { ImageCache } from "../../utils/Cache";

type Props = {
    id: string,
    item: CollectionItem,
    deleteItem: (id: number, version: string) => void,
    shouldRender: boolean,
}

const ListItem: React.FC<Props> = React.memo(({ id, item, deleteItem, shouldRender }) => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    const options = item.state.options;
    const url = getPictogramUrl(item.id, options.colorized, options.resolution, options.skinColor, options.hairColor);
    const stageRef = useRef<Konva.Stage>(null);

    const onLoadedPictogram = useCallback(() => {
        const pixelRatio = item.state.options.resolution === Resolution.high
            ? Math.ceil(Resolution.high / Resolution.low)
            : 1

        const image = stageRef.current?.getStage().toDataURL({ pixelRatio });

        image && ImageCache.get().add(id, image);
    }, [item.state.options.resolution, id]);

    return (
        <MUIListItem secondaryAction={
            <IconButton onClick={() => deleteItem(item.id, item.version)}><RemoveIcon /></IconButton>
        } disablePadding>
            <ListItemButton onClick={() => navigate(`/pictogram/${i18n.language}/${item.id}/${item.version}`)}>
                <ListItemIcon>
                    <Avatar src={url.href} sx={{ borderRadius: 0 }}></Avatar>
                    {shouldRender && <Box sx={{ position: 'absolute', top: -9999, left: -9999 }}>
                        <Pictogram
                            url={url.href}
                            stageRef={stageRef}
                            onLoaded={onLoadedPictogram}
                            {...item.state.customizations}
                        />
                    </Box>}
                </ListItemIcon>
                <ListItemText primary={item.title} secondary={item.modified.toLocaleString()} />
            </ListItemButton>
        </MUIListItem>
    )
});

export default ListItem;