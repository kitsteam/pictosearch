import { Box } from "@mui/material";
import React from 'react';
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <Box textAlign='left' sx={{ maxWidth: 'auto', paddingBottom: 5 }}>
            <Link to="/" style={{ display: 'inline-block' }}>
                <img src={`${process.env.PUBLIC_URL}/assets/pictosearch-logo.svg`} width="280" alt="Logo PictoSearch" />
            </Link>
        </Box>
    )
}

export default Header;