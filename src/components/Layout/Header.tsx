import { Box } from "@mui/material";
import React from 'react';
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <>
          <Box textAlign='left' className="app-header-left">
            <Link to="/" style={{ display: 'inline-block' }}>
                <h1 className="header-kits-h">PictoSearch</h1>
            </Link>
          </Box>
          <Box textAlign='right' className="app-header-right">
            <Link to="/" style={{ display: 'inline-block' }}>
              <img src="/assets/kits-logo.svg" alt="PictoSearch Logo" />
            </Link>
          </Box>
        </>
    )
}

export default Header;