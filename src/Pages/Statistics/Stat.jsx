import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const Stat = (props) => {
  return (
    <Card variant='outlined' 
                sx={{ boxShadow: 10}}
            >
                <CardContent>
                    <Typography variant='subtitle1'
                        className='uppercase'
                        sx={{
                            fontWeight: "bold",
                            fontSize: "20px"
                        }}
                    >
                        {props.data.title}
                    </Typography>
                    <Typography>
                        {props.data.detail}
                    </Typography>
                </CardContent>
            </Card>
  )
}

export default Stat