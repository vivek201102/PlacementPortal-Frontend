import { Box, Button, CircularProgress, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import apis from '../../apis'

const EditDrive = () => {
    const [deadLine, setDeadLine] = useState()
    const { id } = useParams()
    const [driveDetail, setDriveDetail] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const token = localStorage.getItem("token")

    const onSubmitButton = (e) => {
        e.preventDefault()
        console.log(driveDetail);
        axios.put(`${apis.updateDrive}/${driveDetail.id}`, driveDetail, { headers: { Authorization: token }})
        .then((res) => {
            toast.success("Updated Successfully")

            window.history.back();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const onDriveDataChange = (e) => {
        setDriveDetail({...driveDetail, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        axios.get(`${apis.getDrive}/${id}`, {
          headers: { Authorization: token }
        })
        .then((res) => {
            setLoading(false)
            setDriveDetail({...res.data, driveApplications:[]})
            const deadline = dayjs(res.data.deadLineForApplication)
            setDeadLine(deadline)
        })
        .catch((err) => {
            setError(true)
            console.log(err);
        })
    }, [])

  return (
    loading ? 
    <Box sx={{ display: "flex", justifyContent:"center", alignItems: "center", height:"100vh"}}>
      <CircularProgress />
    </Box>
    :
    error ? 
    <Box sx={{ display: "flex", justifyContent:"center", alignItems: "center", height:"100vh"}}>
      <h1 className='font-bold text-2xl'>Error</h1>
    </Box>
    :
    <React.Fragment>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold'}}>
        Placement Drive Details
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmitButton} sx={{ mt: 1 }}>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
        <InputLabel htmlFor='companyName'>Company Name</InputLabel>
          <TextField
            required
            id="companyName"
            name="companyName"
            fullWidth
            autoComplete="companyName"
            variant="standard"
            value={driveDetail.companyName}
            onChange={onDriveDataChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
        <InputLabel htmlFor='companyName'>Description</InputLabel>
          <TextField
            required
            id="description"
            name="description"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            multiline
            rows={12}
            onChange={onDriveDataChange}
            value={driveDetail.description}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
        <InputLabel htmlFor="ctc">CTC</InputLabel>
          <TextField
            required
            id="ctc"
            name="ctc"
            fullWidth
            autoComplete="ctc"
            variant="standard"
            value={driveDetail.ctc}
            onChange={onDriveDataChange}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="role">ROLE</InputLabel>
          <TextField
            required
            id="jobRole"
            name="jobRole"
            fullWidth
            autoComplete="jobRole"
            variant="standard"
            value={driveDetail.jobRole}
            onChange={onDriveDataChange}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="eligibilityCriteria">Eligibility Criteria</InputLabel>
          <TextField
            required
            id="criteria"
            name="criteria"
            fullWidth
            autoComplete="criteria"
            variant="standard"
            value={driveDetail.criteria}
            onChange={onDriveDataChange}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="requiredQualification">Qualification Required</InputLabel>
          <TextField
            required
            id="qualification"
            name="qualification"
            fullWidth
            variant="standard"
            value={driveDetail.qualification}
            onChange={onDriveDataChange}
            />
        </Grid>
        <Grid item xs={12} sm={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DatePicker']} >
              <DesktopDatePicker name='deadlineForApplication' onChange={(value) => { setDeadLine(value); setDriveDetail({...driveDetail, "deadlineForApplication": value }) }}  value={deadLine} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
        <div className='w-fit ms-auto'>
          <Button variant="contained" 
            onClick={() => { window.history.back()}}
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
            Update Details
          </Button>
        </div>
        </Grid>
      </Grid>
      </Box>
    </React.Fragment>
  )
}

export default EditDrive