import { createTheme } from "@material-ui/core";
import { primary, secondary } from "../data/colors";

const theme = createTheme({
    palette: {
        primary,
        secondary,
    },
});

export default theme;