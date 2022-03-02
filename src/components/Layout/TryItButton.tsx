import { Box } from "@mui/system";
import React from 'react';
import { Link } from "react-router-dom";

type Props = {

}

const TryItButton: React.FC<Props> = () => {
    return (
        <Box
            sx={{
                display: 'block',
                textDecoration: 'none',
                textAlign: 'center',
                fontSize: '20px',
                lineHeight: 1.8,
                color: '#fff',
                backgroundColor: '#00a3d3',
                borderRadius: '3px',
                padding: '8px 20px',
                width: '300px',
                maxWidth: '100%',
                border: 0,
                margin: 'auto',
            }}
            component={Link}
            to="/search">Try it</Box>
    )
}

export default TryItButton;