import { Box, Button, Grid, InputLabel, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { ProfileContext } from '../../../Context/Context'

const BasicInfo = ({studentInfo}) => {
    const {change, setChange, studentId} = useContext(ProfileContext)

    const updateProfileInfo = (event) => {
        event.preventDefault();
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        console.log(data);
    }
    return (
        <Box component="form" noValidate onSubmit={updateProfileInfo} sx={{ mt: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <InputLabel forHtml="Id" sx={{ fontWeight: "bold" }} className="uppercase">Student Id</InputLabel>
                    <TextField
                        disabled
                        variant="standard"
                        value={studentId}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel forHtml="name" sx={{ fontWeight: "bold" }} className="uppercase">First Name</InputLabel>
                    <TextField
                        name="firstName"
                        variant="standard"
                        defaultValue={studentInfo.firstName}
                        fullWidth
                        id="firstName"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel forHtml="lastName" sx={{ fontWeight: "bold" }} className="uppercase">Lastname</InputLabel>
                    <TextField
                        name="lastName"
                        variant="standard"
                        defaultValue={studentInfo.lastName}
                        fullWidth
                        id="lastName"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel forHtml="email" sx={{ fontWeight: "bold" }} className="uppercase">Email</InputLabel>
                    <TextField
                        name="email"
                        variant="standard"
                        defaultValue={studentInfo.email}
                        fullWidth
                        id="email"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel forHtml="phone" sx={{ fontWeight: "bold" }} className="uppercase">Phone</InputLabel>
                    <TextField
                        name="phone"
                        variant="standard"
                        defaultValue={studentInfo.phone}
                        fullWidth
                        id="phone"
                    />
                </Grid>
                <Grid item xs={12} >
                    <InputLabel forHtml="address" sx={{ fontWeight: "bold" }} className="uppercase">Address</InputLabel>
                    <TextField
                        name="address"
                        variant="standard"
                        defaultValue={studentInfo.address}
                        fullWidth
                        id="address"
                    />
                </Grid>
                <Grid item sx={{ marginLeft: "auto" }}>
                    <Button  variant="contained" sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" } }}>Update Profile</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BasicInfo