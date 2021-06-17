import { createTheme } from "@material-ui/core";
import { primary, secondary } from "../data/colors";

const theme = createTheme({
    palette: {
        primary,
        secondary,
    },
    typography: {
        htmlFontSize: parseInt(window.getComputedStyle(document.documentElement).fontSize, 10),
    },
});

export default theme;