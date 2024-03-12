import { Box, Button, FormControlLabel, Grid, IconButton, InputAdornment, Link, Switch, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import apis from '../../apis'
import { useSelector } from 'react-redux'
import CustomButton from '../../Component/CustomButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const AddAdmin = () => {
    
    const token = localStorage.getItem("token");
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPasswordToggle = () => {
        setShowPassword(!showPassword)
    }
    const [error, setError] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    })

    const validate = (data) => {
        let isError = false
        if (data.id == '') {
            setError({ ...error, id: 'Id is required' })
            isError = true
        }
        if (data.firstName == '') {
            setError({ ...error, firstName: 'First Name is required' })
            isError = true
        }
        if (data.lastName == '') {
            setError({ ...error, lastName: 'Last Name is required' })
            isError = true
        }
        if (data.email == '') {
            setError({ ...error, email: 'Email is required' })
            isError = true
        }
        if (data.phone == '') {
            setError({ ...error, phone: 'Mobile No. is required' })
            isError = true
        }
        if (data.address == '') {
            setError({ ...error, address: 'Address is required' })
            isError = true
        }
        if (data.password == '') {
            setError({ ...error, password: 'Password is required' })
            isError = true
        }
        return isError
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        let data = Object.fromEntries(formData.entries());
        const newData = {...data, isTFAEnabled: false}
        
        if(validate(data)){
            return ;
        }
        
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
                        error={error.id}
                        helperText={error.id}
                        onChange={() => { setError({...error, id: ''}) }}
                        required
                        fullWidth
                    />
                    <Box sx={{ display: "flex" }}>

                        <TextField
                            variant="standard"
                            label="First Name"
                            name="firstName"
                            sx={{ marginY: 1, marginRight: 1 }}
                            error={error.firstName}
                            helperText={error.firstName}
                            onChange={() => { setError({...error, firstName: ''}) }}
                            required
                            fullWidth
                        />
                        <TextField
                            variant="standard"
                            label="Last Name"
                            name="lastName"
                            sx={{ marginY: 1, marginLeft: 1 }}
                            error={error.lastName}
                            helperText={error.lastName}
                            onChange={() => { setError({...error, lastName: ''}) }}
                            required
                            fullWidth
                        />
                    </Box>

                    <TextField
                        variant="standard"
                        label="Email"
                        name="email"
                        sx={{ marginY: 1 }}
                        error={error.email}
                        helperText={error.email}
                        onChange={() => { setError({...error, email: ''}) }}
                        required
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        label="Mobile No"
                        name="phone"
                        sx={{ marginY: 1 }}
                        error={error.phone}
                        helperText={error.phone}
                        onChange={() => { setError({...error, phone: ''}) }}
                        required
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        label="Address"
                        name="address"
                        sx={{ marginY: 1 }}
                        error={error.address}
                        helperText={error.address}
                        onChange={() => { setError({...error, address: ''}) }}
                        required
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        label="Password"
                        type={ showPassword ? "text" : "password" }
                        name="password"
                        sx={{ marginY: 1 }}
                        error={error.password}
                        helperText={error.password}
                        onChange={() => { setError({...error, password: ''}) }}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton 
                                        onClick={handleShowPasswordToggle}>
                                        { showPassword ? <VisibilityOffIcon /> : <VisibilityIcon /> }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
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