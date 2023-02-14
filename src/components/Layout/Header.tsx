import { Box, Typography } from "@mui/material";
import React from 'react';
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <>
          <Box textAlign='left' className="app-header-left">
            <Link to="/" style={{ display: 'inline-block' }}>
            <h1 className="header-kits-h"><img src="/assets/kits-logo.svg" alt="Logo Kits"/> PictoSearch</h1>
            </Link>
          </Box>
          <Box textAlign='right' className="app-header-right">
          <Link to="http://www.arasaac.org">
              <img src="/assets/logo_arasaac.svg" alt="Logo ARASSAC" />
            </Link>
          </Box>
        </>
    )
}

export default Header;