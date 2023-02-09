import { createTheme } from "@mui/material";
import { primary, secondary } from "../data/colors";

const theme = createTheme({
    palette: {
        primary,
        secondary,
    },
    typography: {
        fontFamily: "FiraSans",
        htmlFontSize: parseInt(window.getComputedStyle(document.documentElement).fontSize, 10),
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                input: {
                    border: 'none !important',
                },
            }
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    boxShadow: 'none !important',
                },
            }
        },
        MuiPaper: {
            styleOverrides: {
                rounded: { 
                  boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 0px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
                }
            }
        }
    }
});

export default theme;