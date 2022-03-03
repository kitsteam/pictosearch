import { Box, Typography } from "@mui/material";
import React from 'react';
import { Link } from "react-router-dom";

type Props = {
    size: 'small' | 'normal',
}

const Header: React.FC<Props> = ({ size }) => {
    return (
        <Box textAlign={size === 'normal' ? 'center' : 'left'} sx={{ maxWidth: size === 'normal' ? '500px' : 'auto', paddingBottom: 5 }}>
            <Link to="/" style={{ display: 'inline-block' }}>
                <img src={`${process.env.PUBLIC_URL}/assets/pictosearch-logo.svg`} width="280" alt="Logo PictoSearch" />
            </Link>
            {size === 'normal' && <Typography mt={3}>Finde Piktogramme, passe sie an deine Bedarfe an und nutze diese in Kita
                und Schule. Unser Pool umfasst mehr als 10.000 Piktogramme, die alle offen
                lizenziert sind.</Typography>}
        </Box>
    )
}

export default Header;