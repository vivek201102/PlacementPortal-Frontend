import { Box, Button, FormControlLabel, Grid, Link, Switch, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import apis from '../../apis'
import { useSelector } from 'react-redux'

const AddAdmin = () => {
    
    const token = localStorage.getItem("token");
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        let data = Object.fromEntries(formData.entries());
        const newData = {...data, isTFAEnabled: false}
        console.log(newData);
        
        axios.post(apis.registerAdmin, newData, {headers: { Authorization: token }})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <Box>
            <Grid item xs={12} lg={4}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>

                <Box component="form" noValidate="false" onSubmit={handleSubmit} sx={{ width: "70%" }}>
                    <TextField
                        variant="standard"
                        label="Id"
                        name="id"
                        sx={{ marginY: 1 }}
                        required
                        fullWidth
                    />
                    <Box sx={{ display: "flex" }}>

                        <TextField
                            variant="standard"
                            label="First Name"
                            name="firstName"
                            sx={{ marginY: 1, marginRight: 1 }}
                            required
                            fullWidth
                        />
                        <TextField
                            variant="standard"
                            label="Last Name"
                            name="lastName"
                            sx={{ marginY: 1, marginLeft: 1 }}
                            required
                            fullWidth
                        />
                    </Box>

                    <TextField
                        variant="standard"
                        label="Email"
                        name="email"
                        sx={{ marginY: 1 }}
                        required
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        label="Mobile No"
                        name="phone"
                        sx={{ marginY: 1 }}
                        required
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        label="Address"
                        name="address"
                        sx={{ marginY: 1 }}
                        required
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        label="Password"
                        name="password"
                        sx={{ marginY: 1 }}
                        required
                        fullWidth
                    />
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ 
                            marginY: 4,
                            backgroundColor: "#3C0753",
                            ":hover":{
                                backgroundColor: "#3C0753"
                            }
                        }}
                    >
                        Register
                    </Button>
                </Box>

            </Grid>
            
        </Box>
    )
}

export default AddAdmin