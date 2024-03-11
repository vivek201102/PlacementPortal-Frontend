import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import apis from '../../apis';
import { ToastContainer, toast } from 'react-toastify';

export const ResetForm = () => {
    const [error, setError] = useState("");
    const state = useLocation().state;
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        if(data.password !== data.cpassword){
            setError("Password and Confirm password is not same")
            return;
        }

        axios.post(apis.resetPassword, {"email": state.email, "token": state.token, "password": data.password})
        .then((res) => {
            toast.success(res.data.body);
            navigate("/")
        })
        .catch((err) => {
            console.log(err);
            toast.error("Server error!!")
        })
        
    }   
  return (
    <Box component="form"
    onSubmit={handleSubmit}
        sx={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            margin: 5
        }}
    >
        <Typography variant='h3' sx={{fontWeight: 'bold', margin: 5}}>
            Reset Password
        </Typography>
        <TextField 
            label="New Password"
            name='password'
            variant='outlined'
            onChange={() => {setError("")}}
            fullWidth
            sx={{
                marginY: 2,
                width:"60%"
            }}
        />
        <TextField 
            label="Confirm New Password"
            name='cpassword'
            variant='outlined'
            onChange={() => {setError("")}}
            fullWidth
            sx={{
                marginY: 2,
                width:"60%"
            }}
        />
        <Button variant='contained' type='submit'>RESET PASSWORD</Button>
        <ToastContainer />
    </Box>
  )
}

export default ResetForm;