import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DesktopDatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import apis from '../../apis';
import { toast } from 'react-toastify';

const AddDrive = () => {
    const token = localStorage.getItem("token")
    const [deadLine, setDeadLine] = useState()
    const navigate = useNavigate();

    const onSubmitButton = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data ={...Object.fromEntries(formData.entries()), deadlineForApplication: new Date(deadLine)}
        
        axios.post(apis.registerDrive, data, 
            {headers:{Authorization: token}})
            .then((res) => {
                toast.success("Drive added successfully")
                navigate("/admin/drives")
            })
            .catch((err) => {
                toast.error(err.response.data)
                console.log(err);
            })
    }

  return (
    <React.Fragment>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold'}}>
        Placement Drive Details
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmitButton} sx={{ mt: 1 }}>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="companyName"
            name="companyName"
            label="Company name"
            fullWidth
            autoComplete="companyName"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            multiline
            rows={12}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ctc"
            name="ctc"
            label="CTC (Per Enum)"
            fullWidth
            autoComplete="ctc"
            variant="standard"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="jobRole"
            name="jobRole"
            label="Job Role"
            fullWidth
            autoComplete="role"
            variant="standard"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="criteria"
            name="criteria"
            label="Criteria"
            fullWidth
            autoComplete="criteria"
            variant="standard"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="qualification"
            name="qualification"
            label="Qualification Required"
            fullWidth
            variant="standard"
            />
        </Grid>
        <Grid item xs={12} sm={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DatePicker']} >
              <DesktopDatePicker label="Deadline for application" name='deadLineForApplication' onChange={(value) => { setDeadLine(value.toISOString()) }} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
        <div className='w-fit ms-auto'>
          <Button variant="contained"  
            sx={{background:'#910A67', marginRight: 2,
            ":hover":{
              bgcolor:"#720455"
                }
                }}  
                >
            Cancel
          </Button>  
          <Button variant="contained" type='submit'  sx={{background:'#910A67', ":hover":{
            bgcolor:"#720455"
          }
                }}>
            Add Drive
          </Button>
        </div>
        </Grid>
      </Grid>
      </Box>
    </React.Fragment>
  )
}

export default AddDrive