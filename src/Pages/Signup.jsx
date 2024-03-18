import { Avatar, Box, Button, CircularProgress, FormControlLabel, Grid, IconButton, InputAdornment, Link, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import apis from '../apis'
import { redirect, useNavigate } from 'react-router-dom'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

const Signup = () => {
    const [qrVisible, setQrVisble] = useState(false)
    const [url, setUrl] = useState()
    const [code, setCode] = useState();
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    })

    const handleShowPasswordToggle = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries())
        if(validate(data)){
            return
        }
        setLoading(true)
        const newData = {
            "id": data.id,
            "firstName": data.firstName,
            "lastName": data.lastName,
            "email": data.email,
            "phone": data.phone,
            "address": data.address,
            "password": data.password,
            "isTFAEnabled": !!data.isTFAEnabled
        }
        setEmail(data.email)
        axios.post(apis.register, newData)
            .then((res) => {

                if (res.data.tfaenabled) {
                    setUrl(res.data.secretImageUri)
                    setQrVisble(true)
                    setLoading(false)
                }
                else {
                    navigate("/")
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            })
    }

    const changeCode = (e) => {
        setCode(e.target.value)
    }

    const verfiyCode = (e) => {
        e.preventDefault()
        const data = {
            "email": email,
            "code": code
        };
        console.log(data);
        axios.post(apis.verifyCode, data)
            .then((res) => {
                console.log(res);
                navigate("/")
            })
            .catch((err) => {
                toast.error(err);
                console.log(err);
            })
    }

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
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if(emailRegex.test(data.email) == false){
            setError({...error, email: 'Email is not in format'})
            isError = true
        }

        const pattern = new RegExp(/^\d{1,10}$/);
        if(!pattern.test(data.phone)){
            setError({...error, phone: 'Phone number is not valid'})
            isError = true
        }
        
        if(data.password != ''){
            if(data.password.length < 8){
                setError({...error, password: 'Password must contain at least 8 characters'})
                isError = true
            }
            else if(!/\d/.test(data.password)){
                setError({...error, password: 'Password must contain at least 1 digit'})
                isError = true
            }
            else if(!/[A-Z]/.test(data.password) || !/[a-z]/.test(data.password)){
                setError({...error, password: 'Password must contain uppercase and lowercase letters'})
                isError = true
            }
            else if(!/[^A-Za-z0-9]/.test(data.password)){
                setError({...error, password: 'Password must contain at least one special character'})
                isError = true    
            }
        }
        return isError
    }

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid item md={8}
                sx={{
                    display: { sm: "none", lg: "block" },
                    backgroundImage: `url(/static/image/ddu.avif)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh"
                }}

            />
            {
                !qrVisible ? !loading ?
                    <Grid item xs={12} lg={4}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%"
                        }}>

                            <Avatar sx={{ bgcolor: 'black' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" fontWeight="bold">
                                Sign Up
                            </Typography>
                            <Box component="form" noValidate="false" onSubmit={handleSubmit} sx={{ width: "70%" }}>
                                <TextField
                                    variant="standard"
                                    label="Id"
                                    name="id"
                                    sx={{ marginY: 1 }}
                                    required
                                    error={error.id}
                                    helperText={error.id}
                                    onChange={() => { setError({ ...error, id: '' }) }}
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
                                        error={error.firstName}
                                        helperText={error.firstName}
                                        onChange={() => { setError({ ...error, firstName: '' }) }}
                                    />
                                    <TextField
                                        variant="standard"
                                        label="Last Name"
                                        name="lastName"
                                        sx={{ marginY: 1, marginLeft: 1 }}
                                        required
                                        fullWidth
                                        error={error.lastName}
                                        helperText={error.lastName}
                                        onChange={() => { setError({ ...error, lastName: '' }) }}
                                    />
                                </Box>

                                <TextField
                                    variant="standard"
                                    label="Email"
                                    name="email"
                                    sx={{ marginY: 1 }}
                                    required
                                    error={error.email}
                                    helperText={error.email}
                                    onChange={() => { setError({ ...error, email: '' }) }}
                                    fullWidth
                                />
                                <TextField
                                    variant="standard"
                                    label="Mobile No"
                                    name="phone"
                                    sx={{ marginY: 1 }}
                                    error={error.phone}
                                    helperText={error.phone}
                                    onChange={() => { setError({ ...error, phone: '' }) }}
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
                                    error = {error.address}
                                    helperText = {error.address}
                                    onChange={ () => { setError({...error, address: '' })} }
                                />
                                <TextField
                                    variant="standard"
                                    label="Password"
                                    name="password"
                                    type= { showPassword ? "text" : "password"}
                                    sx={{ marginY: 1 }}
                                    InputProps={{
                                        endAdornment:(
                                            <InputAdornment position='end'>
                                                <IconButton aria-label='toggle password visibility' 
                                                    onClick={handleShowPasswordToggle}>
                                                    { showPassword ? <VisibilityOffIcon /> : <VisibilityIcon /> }
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    required
                                    fullWidth
                                    error = {error.password}
                                    helperText = {error.password}
                                    onChange={ () => { setError({...error, password: '' })} }
                                />
                                
                                <FormControlLabel name='isTFAEnabled' control={<Switch />} label="Enable Two Factor Authentication" />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ marginY: 4 }}
                                >
                                    Register
                                </Button>
                                <Box>
                                    <Typography variant="subtitle1">
                                        <Link href="/">Already have account?</Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    :
                    <Grid item xs={12} lg={4} sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <CircularProgress />
                    </Grid>

                    :
                    <Grid item xs={12} lg={4} sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}>
                        <Typography variant='h5' sx={{ fontWeight: "bold", textAlign: "center" }}>Set Up Two Factor Authentication</Typography>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <img src={url} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>

                            <TextField name='code' variant='filled' label="Enter 6 digit code" sx={{ width: "80%" }} onChange={changeCode} />

                            <Button
                                type="submit"
                                onClick={verfiyCode}
                                variant="contained"
                                sx={{ marginY: 4, width: "80%" }}
                            >
                                Verify
                            </Button>
                        </Box>
                    </Grid>
            }
            <ToastContainer />
        </Grid>
    )
}

export default Signup