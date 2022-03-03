import { Button, ButtonProps, IconButton } from "@mui/material";
import React from 'react';

const ResponsiveIconButton: React.FC<ButtonProps> = (props) => {
    const { children, sx, ...buttonProps } = props;

    return (
        <>
            <Button sx={{ display: { xs: 'none', sm: 'inline-flex' }, ...sx }} {...buttonProps}>{children}</Button>
            <IconButton sx={{
                display: { xs: 'inline-flex', sm: 'none' },
                borderRadius: 1,
                backgroundColor: buttonProps.color ? buttonProps.color + '.main' : undefined,
                color: buttonProps.color ? '#ffffff' : undefined,
                boxShadow: 2,
                ...sx
            }} {...buttonProps}>{buttonProps.startIcon}</IconButton>
        </>
    )
}

export default ResponsiveIconButton;