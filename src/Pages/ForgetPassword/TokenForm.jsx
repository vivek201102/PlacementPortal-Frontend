import { Box, Button, Link, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import apis from '../../apis';
import { ToastContainer, toast } from 'react-toastify';

const TokenForm = () => {
    const navigate = useNavigate();
    const email = useLocation().state.email;

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries())
        axios.post(apis.confirmToken, {"email": email, "token": data.token})
        .then((res) => {
            console.log(res.data.body);
            if(res.data.body === true){
                navigate("/forget-password/reset", {state:{email: email, token:data.token}})
            }
            else{
                toast.error("Invalid Token!!");
            }
        })
        .catch((err) => {
            toast.error(err);
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
            label="Enter token"
            name='token'
            variant="outlined"
            sx={{width: "50%"}}
            />
        <Button variant='contained' type='submit' 
            sx={{
                marginY: 5,
                width: "50%"
            }}
        >Verify Token</Button>
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

export default TokenForm