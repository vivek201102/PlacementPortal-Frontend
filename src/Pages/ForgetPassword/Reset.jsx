import { Box, Button, Link, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import apis from '../../apis';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Reset = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        axios.post(apis.sendResetToken, {"email": data.email})
        .then((res) => {
            console.log(res.data);
            navigate("/forget-password/token", {state: { email: data.email }})
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.response.data)
        })
    }
  return (
    <div>
      <Typography variant='h4' sx={{ fontWeight: "bold", marginY: 10, textAlign: "center"}}>
          Forget Password
      </Typography>
        <Box component={"form"} onSubmit={handleSubmit}
        sx={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            width:"100%"
        }}
        >

        <TextField 
            label="Enter you email"
            name='email'
            id='email'
            variant="outlined"
            sx={{width: "50%"}}
            />
        <Button variant='contained' type='submit' 
            sx={{
                marginY: 5,
                width: "50%"
            }}
        >Next</Button>
        <img src='/static/image/ddu_logo.png' height="45" width="45" />
        <Typography variant='subtitle1'>Copyright ©️ &ensp;
        
        <Link color="inherit" href="https://ddu.ac.in">
            Dharmsinh Desai University
        </Link>
        </Typography>
    </Box>
    <ToastContainer />
    </div>
  )
}

export default Reset