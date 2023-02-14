import { Box, Typography } from "@mui/material";
import React from 'react';
import { Trans } from "react-i18next";
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
          <Box className="app-footer">
            <Link to="http://www.arasaac.org">
              <img src="/assets/logo_arasaac.svg" alt="Logo ARASSAC"/>
            </Link>
            <Typography variant="body2" sx={{ opacity: 0.6, paddingLeft: 2 }}>
              <Trans i18nKey="search.license">
                Sergio Palao (Urheber), ARASAAC (<Link to="http://www.arasaac.org">arasaac.org</Link>),
                Regierung von Aragón in Spanien (Eigentümer), <Link to="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en">CC BY-SA-NC 4.0</Link>
              </Trans>
            </Typography>
        </Box>
          </Box>
        </>
    )
}

export default Header;