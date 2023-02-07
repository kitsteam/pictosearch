import { Box, IconButton, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import logoArasaac from './logo_ARASAAC.png';
import { Trans, useTranslation } from 'react-i18next';
import Clipboard from "../../utils/Clipboard";
import ClipboardIcon from '@mui/icons-material/ContentPasteGo';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const [copiedLicenseToClipboard, setCopiedLicenseToClipboard] = useState(false);
    const onCopyLicenseToClipboard = () => {
      Clipboard.copyText(t('search.clipboardLicense'));
      setCopiedLicenseToClipboard(true);
      setTimeout(() => setCopiedLicenseToClipboard(false), 2000);
    }

    return (
        <Box className="app-footer">
            <Link href="http://www.arasaac.org">
              <img src={logoArasaac} alt="Logo ARASSAC" />
            </Link>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              {Clipboard.hasSupport() && <IconButton sx={{ marginLeft: -1 }} size="small" onClick={onCopyLicenseToClipboard} color={copiedLicenseToClipboard ? 'success' : 'default'}><ClipboardIcon /></IconButton>}

              <Trans i18nKey="search.license">
                Sergio Palao (Urheber), ARASAAC (<Link href="http://www.arasaac.org">arasaac.org</Link>),
                Regierung von Aragón in Spanien (Eigentümer), <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en">CC BY-SA-NC 4.0</Link>.
              </Trans>
            </Typography>
        </Box>
    );
}


export default Footer;