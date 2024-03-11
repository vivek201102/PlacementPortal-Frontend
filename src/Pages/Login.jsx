import { Avatar, Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import React, { useState } from "react";
import axios from "axios";
import apis from "../apis";
import { useDispatch } from "react-redux";
import { storeToken } from "../redux/tokenSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [isTFAEnabled, setIsTFAEnabled] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState()
  const [email, setEmail] = useState();
  const [id, setId] = useState();

  const changeCode = (e) => {
    setCode(e.target.value)
  }

  const verifyCode = (e) => {
    e.preventDefault();
    const data = {
      "email": email,
      "code": code
    }
    
    axios.post(apis.verifyCode, data)
    .then((res) => {
      localStorage.setItem("token", "Bearer " + res.data.token)
      localStorage.setItem("studentId", id)
      if(res.data.role === 'STUDENT_ROLE')
        navigate('/student')
      else 
        navigate('/admin')
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    setId(data.id)
    console.log(data.id)
    axios.post(apis.authenticate, data)
    .then((res) => {
      if(res.data.tfaenabled){
        setEmail(res.data.email)
        setIsTFAEnabled(true)
      }
      else{
        localStorage.setItem("studentId", data.id)
        localStorage.setItem("token", "Bearer " + res.data.token)
        if(res.data.role === 'STUDENT_ROLE')
          navigate('/student')
        else
          navigate('/admin')
      }
    })
    .catch((err) => {
      if(err.response != undefined)
      toast.error(err.response.data)
      else
      toast.error("Server error")
      console.log(err);
    })
  }
  
  return (
    <Grid container sx={{height:"100vh"}}>
      <Grid item md={8} 
        sx={{
            display: {sm: "none", lg:"block"},
            backgroundImage:`url(/static/image/ddu.avif)`,
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover",
            backgroundPosition:"center",
            height:"100vh"
          }}
      
      />
      {
        !isTFAEnabled ? 
      <Grid item sm={12} lg={4} 
      sx={{
        display: "flex", 
        justifyContent:"center", 
        alignItems:"center"
      }}>
        <Box sx={{
          display: "flex", 
          justifyContent:"center", 
          alignItems:"center", 
          flexDirection: "column",     
          width:"100%" 
        }}>

          <Avatar sx={{bgcolor: 'black'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Sign In
          </Typography>
          <Box component="form" noValidate="false" onSubmit={handleSubmit} sx={{width:"70%"}}>
            <TextField 
              variant="standard"
              label="Id"
              name="id"
              sx={{ marginY: 1}}
              required
              fullWidth
              />
            <TextField 
              variant="standard"
              label="Password"
              name="password"
              sx={{ marginY: 1}}
              required
              fullWidth
              />
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginY: 4}}
              >
              Sign In
            </Button>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
              <Typography variant="subtitle1">
                <Link href="forget-password">Forgot Password?</Link>
              </Typography>
              <Typography variant="subtitle1">
                <Link href="/signup">Don't have account?</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      :
      <Grid item xs={12} lg={4} sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column"
    }}>
        <Typography variant='h5' sx={{ fontWeight: "bold", textAlign: "center" }}>Verify your self</Typography>
        
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width:"100%" }}>

            <TextField name='code' variant='filled' label="Enter 6 digit code" sx={{ width: "80%" }} autoComplete={false} onChange={changeCode}/>

            <Button
                type="submit"
                onClick={verifyCode}
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
  );
}

export default Login;