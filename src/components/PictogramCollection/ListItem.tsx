import { IconButton, ListItem as MUIListItem, ListItemButton, Avatar, ListItemText, ListItemIcon } from "@mui/material";
import Konva from "konva";
import React, { useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import RemoveIcon from '@mui/icons-material/Delete';
import { useHistory } from "react-router-dom";
import { CollectionItem } from "../../hooks/collection";
import { getPictogramUrl } from "../../hooks/network";
import { Box } from "@mui/system";
import Pictogram from "../PictogramConfigurator/Pictogram";
import { Resolution } from "../PictogramConfigurator/state";

type Props = {
    item: CollectionItem,
    onLoaded: (image: string) => void,
    deleteItem: () => void,
}

const ListItem: React.FC<Props> = ({ item, onLoaded, deleteItem }) => {
    const { i18n } = useTranslation();
    const history = useHistory();
    const [image, setImage] = useState<string>();

    const options = item.state.options;
    const url = getPictogramUrl(item.id, options.colorized, options.resolution, options.skinColor, options.hairColor);
    const stageRef = useRef<Konva.Stage>(null);

    const onLoadedPictogram = () => {
        const pixelRatio = item.state.options.resolution === Resolution.high
            ? Math.ceil(Resolution.high / Resolution.low)
            : 1

        const image = stageRef.current?.getStage().toDataURL({ pixelRatio });

        setImage(image);
        image && onLoaded(image);
    }

    return (
        <MUIListItem secondaryAction={
            <IconButton onClick={() => deleteItem()}><RemoveIcon /></IconButton>
        } disablePadding>
            <ListItemButton onClick={() => history.push(`/pictogram/${i18n.language}/${item.id}/${item.version}`)}>
                <ListItemIcon>
                    <Avatar src={image || url.href} sx={{ borderRadius: 0 }}></Avatar>
                    <Box sx={{ position: 'absolute', top: -9999, left: -9999 }}>
                        <Pictogram {...{ url: url.href, stageRef, onLoaded: onLoadedPictogram, ...item.state.customizations }} />
                    </Box>
                </ListItemIcon>
                <ListItemText primary={item.title} secondary={item.modified.toLocaleString()} />
            </ListItemButton>
        </MUIListItem>
    )
}

export default ListItem;