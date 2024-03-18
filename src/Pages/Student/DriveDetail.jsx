import { Box, Button, CircularProgress, Grid, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apis from '../../apis';
import { toast } from 'react-toastify';

const DriveDetail = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token")
    const studentId = localStorage.getItem("studentId")
    const [driveDetail, setDriveDetail] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [application, setApplication] = useState()
    const [applicationStatus, setApplicationStatus] = useState()
    const [change, setChange] = useState(false)
    const [student, setStudent] = useState()
    const [offer, setOffer] = useState()

    useEffect(() => {
        const fetchData = async () => {

            let data = ''
            await axios.get(`${apis.getDriveStudent}/${id}`, { headers: { Authorization: token } })
                .then((res) => {
                    data = res.data
                    setDriveDetail(res.data)
                    setLoading(false)

                })
                .catch((err) => {
                    console.log(err);
                    setError(true)
                })

            await axios.get(`${apis.getStudentApplication}/${data.id}/${studentId}`, {
                headers: { Authorization: token }
            })
                .then((res) => {
                    if (res.data == '')
                        setApplicationStatus("Not Applied")
                    else {
                        setApplication(res.data)
                        setApplicationStatus(res.data.status)
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

                await axios.get(`${apis.getStudentsOffer}/${studentId}`, { headers: { Authorization: token }})
                .then((res) => {
                    
                    const maxOffer = res.data.reduce((prev, curr) => {
                        return (prev.offerAmount > curr.offerAmount) ? prev : curr
                    })
                    setOffer(maxOffer)
                })
                .catch((err) => {
                    console.log(err);
                })
                
                await axios.get(`${apis.getStudentData}/${studentId}`,
                 {headers: {Authorization: token}})
                 .then((res) => {
                    setStudent(res.data)
                 })
                 .catch((err) => {
                    console.log(err);
                 })
        }
        fetchData()
        
    }, [change])

    const applyForDrive = (studentStatus) => {
        axios.post(apis.registerApplication,
            { "studentId": studentId, "driveId": driveDetail.id, "studentStatus": studentStatus }, {
            headers: { Authorization: token }
        }
        )
            .then((res) => {
                toast.success("Applied successfully")
                setChange(!change)

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const deleteApplication = () => {
        axios.delete(`${apis.deleteApplication}/${application.id}`, { headers: { Authorization: token } })
            .then((res) => {
                setApplication()
                setApplicationStatus("Not Applied")
                toast.success("Application deleted successfully")
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error while deleting application")
            })
    }

    return (
        loading || error ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", width: "90vw" }}>
                {
                    loading ? <CircularProgress /> : <h1>Server Error</h1>
                }
            </Box> :
            <React.Fragment>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Placement Drive Details
                </Typography>
                <Box component="div" sx={{ mt: 1 }}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <InputLabel forHtml="companyName"
                                sx={{ fontWeight: "bold", fontSize: 20 }}>Company Name</InputLabel>
                            <TextField
                                disabled
                                id="companyName"
                                name="companyName"
                                fullWidth
                                variant="standard"
                                value={driveDetail.companyName}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <InputLabel forHtml="description"
                                sx={{ fontWeight: "bold", fontSize: 20 }}>Description</InputLabel>
                            <TextField
                                disabled
                                id="description"
                                name="description"
                                fullWidth
                                variant="standard"
                                value={driveDetail.description}
                                multiline

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel forHtml="ctc"
                                sx={{ fontWeight: "bold", fontSize: 20 }}>CTC(Per Enum)</InputLabel>
                            <TextField
                                disabled
                                id="ctc"
                                name="ctc"
                                fullWidth
                                variant="standard"
                                value={driveDetail.ctc}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel forHtml="role"
                                sx={{ fontWeight: "bold", fontSize: 20 }}>Role</InputLabel>
                            <TextField
                                disabled
                                id="role"
                                name="role"
                                fullWidth
                                variant="standard"
                                value={driveDetail.jobRole}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel forHtml="eligibilityCriteria"
                                sx={{ fontWeight: "bold", fontSize: 20 }}>Criteria</InputLabel>
                            <TextField
                                disabled
                                id="eligibilityCriteria"
                                name="eligibilityCriteria"
                                fullWidth
                                variant="standard"
                                value={driveDetail.criteria}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel forHtml="requiredQualification"
                                sx={{ fontWeight: "bold", fontSize: 20 }}>Qualification Required</InputLabel>
                            <TextField
                                disabled
                                id="state"
                                name="requiredQualification"
                                fullWidth
                                variant="standard"
                                value={driveDetail.qualification}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <InputLabel forHtml="deadline"
                                sx={{ fontWeight: "bold", fontSize: 20 }}>Dealine to Apply</InputLabel>
                            <TextField
                                disabled
                                id="state"
                                name="deadline"
                                fullWidth
                                variant="standard"
                                value={new Date(driveDetail.deadlineForApplication).toLocaleDateString()}
                            />
                        </Grid>
                        {
                            student == null ?
                            <Grid item>
                            <Button variant="contained" sx={{ background: '#910A67', marginY: 5, ":hover": { bgcolor: "#720455" } }} onClick={() => { window.history.back() }}>
                                        Close
                                    </Button>
                            </Grid>
                            :
                            student.placed ? 
                            <Grid item>
                                <Typography variant='h6' sx={{ fontWeight: "bold"}}>You are already placed</Typography>
                                {
                                    parseInt(driveDetail.ctc) >= (offer.offerAmount * 1.5)
                                    ?
                                    <Button variant="contained" sx={{ background: '#910A67', marginY: 5, marginRight:3, ":hover": { bgcolor: "#720455" } }}>You can apply for drive</Button>
                                    :
                                    <></>
                                }
                                <Button variant="contained" sx={{ background: '#910A67', marginY: 5, ":hover": { bgcolor: "#720455" } }} onClick={() => { window.history.back() }}>
                                        Close
                                    </Button>
                            </Grid>
                                :
                                <Grid item>
                                    {
                                        applicationStatus === "Not Applied" ?
                                            <Button variant="contained" sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" }, marginRight: 3 }} onClick={() => { applyForDrive("NOT PLACED") }}
                                            >
                                                Apply For Drive
                                            </Button>
                                            : applicationStatus === "APPLIED" ?
                                                <Button variant="contained" sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" }, marginRight: 3 }} onClick={deleteApplication}>Widthdraw Application</Button>
                                                :
                                                <Button variant="contained" sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" }, marginRight: 3 }} disabled>
                                                    Application Approved
                                                </Button>
                                    }

                                    <Button variant="contained" sx={{ background: '#910A67', ":hover": { bgcolor: "#720455" } }} onClick={() => { window.history.back() }}>
                                        Close
                                    </Button>
                                </Grid>
                        }
                    </Grid>
                </Box>
            </React.Fragment>
    )
}

export default DriveDetail