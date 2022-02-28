import { createTheme } from "@mui/material";
import { primary, secondary } from "../data/colors";

const theme = createTheme({
    palette: {
        primary,
        secondary,
    },
    typography: {
        htmlFontSize: parseInt(window.getComputedStyle(document.documentElement).fontSize, 10),
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                input: {
                    border: '0 !important',
                },
            }
        }
    }
});

export default theme;