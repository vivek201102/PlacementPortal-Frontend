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
import dayjs from 'dayjs';

const AddDrive = () => {
  const token = localStorage.getItem("token")
  const [deadLine, setDeadLine] = useState()
  const navigate = useNavigate();
  const [error, setError] = useState({
    'companyName': '',
    'description': '',
    'ctc': '',
    'jobRole': '',
    'criteria': '',
    'qualification': ''
  })

  const onSubmitButton = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = { ...Object.fromEntries(formData.entries()), deadlineForApplication: new Date(deadLine) }
    if (validate(data)) {
      return;
    }
    axios.post(apis.registerDrive, data,
      { headers: { Authorization: token } })
      .then((res) => {
        toast.success("Drive added successfully")
        navigate("/admin/drives")
      })
      .catch((err) => {
        toast.error(err.response.data)
        console.log(err);
      })
  }

  const validate = (data) => {
    let isError = false
    if (data.companyName == '') {
      setError({ ...error, companyName: 'Company Name is required' })
      isError = true
    }
    if (data.description == '') {
      setError({ ...error, description: 'Description is required' })
      isError = true
    }
    if (data.ctc == '') {
      setError({ ...error, ctc: 'CTC is required' })
      isError = true
    }
    if (data.jobRole == '') {
      setError({ ...error, jobRole: 'Job Role is required' })
      isError = true
    }
    if (data.criteria == '') {
      setError({ ...error, criteria: 'Criteria is required' })
      isError = true
    }
    if (data.qualification == '') {
      setError({ ...error, qualification: 'Qualification is required' })
      isError = true
    }
    return isError
  }

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
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
              error={error.companyName}
              helperText={error.companyName}
              onChange={() => { setError({ ...error, companyName: '' }) }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              error={error.description}
              helperText={error.description}
              onChange={() => { setError({ ...error, description: '' }) }}
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
              error={error.ctc}
              helperText={error.ctc}
              onChange={() => { setError({ ...error, ctc: '' }) }}
              fullWidth
              autoComplete="ctc"
              variant="standard"
              type='number'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="jobRole"
              name="jobRole"
              label="Job Role"
              error={error.jobRole}
              helperText={error.jobRole}
              onChange={() => { setError({ ...error, jobRole: '' }) }}
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
              error={error.criteria}
              helperText={error.criteria}
              onChange={() => { setError({ ...error, criteria: '' }) }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="qualification"
              name="qualification"
              label="Qualification Required"
              error={error.qualification}
              helperText={error.qualification}
              onChange={() => { setError({ ...error, qualification: '' }) }}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DemoContainer components={['DatePicker']} >
                <DesktopDatePicker
                  label="Deadline for application"
                  defaultValue={dayjs()}
                  disablePast
                  name='deadLineForApplication'
                  onChange={(value) => { setDeadLine(value.toISOString()) }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <div className='w-fit ms-auto'>
              <Button variant="contained"
                sx={{
                  background: '#910A67', marginRight: 2,
                  ":hover": {
                    bgcolor: "#720455"
                  }
                }}
                onClick={ () => { window.history.back() }}
              >
                Cancel
              </Button>
              <Button variant="contained" type='submit' sx={{
                background: '#910A67', ":hover": {
                  bgcolor: "#720455"
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