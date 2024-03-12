import { Button } from '@mui/material'
import React from 'react'

const CustomButton = (props) => {
    return (
        <Button
            variant='contained'
            sx={{
                backgroundColor: props.bgColor,
                ":hover": {
                    backgroundColor: props.hoverBgColor
                },
                marginY: props.marginY || 2
            }}
            type={props.type}
            fullWidth={props.fullWidth || false}
        >{props.label}</Button>
    )
}

export default CustomButton