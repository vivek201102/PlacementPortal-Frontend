import { Grid } from '@mui/material'
import React from 'react'
import Stat from './Stat'

const index = (props) => {
  return (
    <Grid container spacing={4}>
        {
            props.data.map((item, index) => (
                <Grid key={index} 
                    item 
                    lg={4} xs={12} sm={6}>
                    <Stat data={item}/>
                </Grid>
            ))
        }
    </Grid>
  )
}

export default index