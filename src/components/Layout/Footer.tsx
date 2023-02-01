import { Box } from "@mui/material";
import React from 'react';
const Footer: React.FC = () => {

        return (
            <Box sx={{
                background: '#ffffff',
                margin: '80px auto 30px auto',
                textAlign: 'center',
            }}>
                <Box component="ul" sx={{
                    padding: 0,
                    textAlign: 'center',
                    margin: '5px',
                    color: '#999999',
                    '& li': { display: 'inline-block', padding: '5px 10px' },
                    '& a': {
                        color: 'inherit',
                        fontSize: '12px',
                        textDecoration: 'none',
                        '&:hover': {
                            color: '#555555',
                        }
                    }
                }}>
                    <li>
                        <a href="https://kits.blog/impressum/" target="_blank" rel="noopener noreferrer">Impressum</a>
                    </li>
                    <li>
                        <a href="https://kits.blog/datenschutzerklaerung/" target="_blank" rel="noopener noreferrer">Datenschutz</a>
                    </li>
                    <li>
                        <a href="https://github.com/kitsteam/wp-pictogram-viewer" target="_blank" rel="noopener noreferrer">PictoSearch@Github</a>
                    </li>
                </Box>
            </Box>
        );
}


export default Footer;