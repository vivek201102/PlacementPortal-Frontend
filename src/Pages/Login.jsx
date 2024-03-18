import { Avatar, Box, Button, CircularProgress, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import React, { useState } from "react";
import axios from "axios";
import apis from "../apis";
import { useDispatch } from "react-redux";
import { storeToken } from "../redux/tokenSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [isTFAEnabled, setIsTFAEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [code, setCode] = useState()
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState({
    id: '',
    password: ''
  })

  const changeCode = (e) => {
    setCode(e.target.value)
  }
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword)
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
        if (res.data.role === 'STUDENT_ROLE')
          navigate('/student')
        else
          navigate('/admin')
      })
      .catch((err) => {
        console.log(err.response.response.data);
        toast.error(err.response.data)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (validate(data)) {
      return;
    }
    setLoading(true)
    setId(data.id)
    axios.post(apis.authenticate, data)
      .then((res) => {
        if (res.data.tfaenabled) {
          setEmail(res.data.email)
          setIsTFAEnabled(true)
        }
        else {
          localStorage.setItem("studentId", data.id)
          localStorage.setItem("token", "Bearer " + res.data.token)
          if (res.data.role === 'STUDENT_ROLE')
            navigate('/student')
          else
            navigate('/admin')
        }
      })
      .catch((err) => {
        setLoading(false)
        if (err.response != undefined)
          toast.error(err.response.data)
        else
          toast.error("Server error")
      })
  }

  const validate = (data) => {
    let isError = false
    if (data.id === '') {
      setError({ ...error, id: 'Id is required' })
      isError = true
    }
    if (data.password === '') {
      setError({ ...error, password: 'Password is required' })
      isError = true
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
        loading ?
          <Grid item xs={12} lg={4} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <CircularProgress />
          </Grid> 
          :
        !isTFAEnabled ?
      <Grid item sm={12} lg={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
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
            Sign In
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
            <TextField
              variant="standard"
              label="Password"
              name="password"
              sx={{ marginY: 1 }}
              type={showPassword ? "text" : "password"}
              required
              onChange={() => { setError({ ...error, password: '' }) }}
              error={error.password}
              helperText={error.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPasswordToggle}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
              sx={{ marginY: 4 }}
            >
              Sign In
            </Button>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
        flexDirection: "column"
      }}>
        <Typography variant='h5' sx={{ fontWeight: "bold", textAlign: "center" }}>Verify your self</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>

          <TextField name='code' variant='filled' label="Enter 6 digit code" sx={{ width: "80%" }} autoComplete={false} onChange={changeCode} />

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