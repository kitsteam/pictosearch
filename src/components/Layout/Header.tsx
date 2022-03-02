import { Box, Typography } from "@mui/material";
import React from 'react';
import { Link } from "react-router-dom";

type Props = {

}

const Header: React.FC<Props> = () => {
    return (
        <Box textAlign="center" sx={{maxWidth: '500px', margin: '0 auto'}}>
            <Link to="/" style={{display: 'inline-block'}}>
                <img src={`${process.env.PUBLIC_URL}/assets/pictosearch-logo.svg`} width="280" alt="Logo PictoSearch" />
            </Link>
            <Typography mt={3} mb={5}>Finde Piktogramme, passe sie an deine Bedarfe an und nutze diese in Kita
                und Schule. Unser Pool umfasst mehr als 10.000 Piktogramme, die alle offen
                lizenziert sind.</Typography>
        </Box>
    )
}

export default Header;