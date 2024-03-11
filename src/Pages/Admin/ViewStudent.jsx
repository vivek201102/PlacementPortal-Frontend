import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, CircularProgress, Container, Grid, InputLabel, List, ListItem, TextField, Typography } from '@mui/material';
import axios from 'axios';
import apis from '../../apis';
import GitHubIcon from '@mui/icons-material/GitHub';

const ViewStudent = () => {
    const { id } = useParams()
    const [studentData, setStudentData] = useState()
    const [loadingState, setLoadingState] = useState(true);
    const [errorState, setErrorState] = useState(false);
    const [skillList, setSkillList] = useState([]);
    const [experienceList, setExperienceList] = useState([]);
    const [educationList, setEducationList] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get(`${apis.getStudentByAdmin}/${id}`,
            { headers: { Authorization: token } })
            .then((res) => {
                console.log(res);
                setStudentData(res.data)
                setLoadingState(false)
            })
            .catch((err) => {
                setErrorState(true)
                console.log(err);
            })

        axios.get(`${apis.getStudentSkillByAdmin}/${id}`,
            { headers: { Authorization: token } })
            .then((res) => {
                setSkillList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get(`${apis.getStudentEducationByAdmin}/${id}`,
            { headers: { Authorization: token } })
            .then((res) => {
                setEducationList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get(`${apis.getStudentExperienceByAdmin}/${id}`,
            { headers: { Authorization: token } })
            .then((res) => {
                setExperienceList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get(`${apis.getStudentProjectByAdmin}/${id}`,
            { headers: { Authorization: token } })
            .then((res) => {
                setProjectList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })



    }, [])

    return (
        <div>
            {
                loadingState ?
                    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                        {
                            errorState ? <div className='text-3xl'>Server Error</div> :
                                <CircularProgress />
                        }
                    </Container>

                    :
                    <Box sx={{ boxShadow: 15, padding: 5 }}>
                        <Grid container>
                            <Container >
                                <Typography variant='h4' sx={{ fontWeight: "bold", marginY: 2 }}>{studentData.firstName + " " + studentData.lastName}</Typography>
                                <Grid container spacing={6}>

                                    <Grid item xs={12} sm={6}>

                                        <InputLabel htmlFor="email" sx={{ fontWeight: "bold" }}>Email</InputLabel>
                                        <TextField
                                            variant='standard'
                                            id='email'
                                            disabled
                                            fullWidth
                                            value={studentData.email}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                        <InputLabel htmlFor="phone" sx={{ fontWeight: "bold" }}>Phone</InputLabel>
                                        <TextField
                                            variant='standard'
                                            id='phone'
                                            disabled
                                            fullWidth
                                            value={studentData.phone}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="address" sx={{ fontWeight: "bold" }}>Address</InputLabel>
                                        <TextField
                                            variant='standard'
                                            id='address'
                                            disabled
                                            fullWidth
                                            value={studentData.address}

                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={6} sx={{ marginTop: 5 }}>
                                    <Grid item sm={12} md={6}>
                                        <Typography variant='h6' sx={{ fontWeight: 'bold' }} >SKILLS</Typography>
                                        <List>
                                            {
                                                skillList.map((item, index) =>
                                                    <ListItem key={index}>
                                                        <Typography variant='subtitle1'>{item.skill.name}</Typography>
                                                    </ListItem>)
                                            }
                                        </List>
                                    </Grid>
                                    <Grid item sm={12} md={6}>
                                        <Typography variant='h6' sx={{ fontWeight: 'bold' }} >EXPERIENCE</Typography>

                                        {
                                            experienceList.map((item, index) =>

                                                <div key={index} className='my-3'>
                                                    <Typography sx={{ fontSize: 20 }}>{item.title}</Typography>
                                                    <div className='flex'>
                                                        <Typography sx={{ fontSize: 15 }}>{item.organization}</Typography>
                                                        <Typography sx={{ fontSize: 15, marginLeft: 5 }}>{item.fromDate} &ensp; {item.toDate}</Typography>

                                                    </div>
                                                    <p>{item.description}</p>
                                                </div>
                                            )
                                        }

                                    </Grid>
                                    <Grid item sm={12} md={6}>
                                        <Typography variant='h6' sx={{ fontWeight: 'bold' }} >EDUCATION</Typography>
                                        {
                                            educationList.map((item, index) =>

                                                <div key={index} className='my-3'>
                                                    <Typography sx={{ fontSize: 20 }}>{item.degree}</Typography>

                                                    <Typography sx={{ fontSize: 20 }}>{item.fieldOfStudy}</Typography>

                                                    <div className='flex'>
                                                        <Typography sx={{ fontSize: 15 }}>{item.institute}</Typography>
                                                        <Typography sx={{ fontSize: 15, marginLeft: 5 }}>{item.fromDate} &ensp; {item.toDate}</Typography>

                                                    </div>
                                                    <p>{item.result}</p>
                                                </div>
                                            )
                                        }
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Typography variant='h6' sx={{ fontWeight: 'bold' }} >PROJECTS</Typography>
                                        {
                                            projectList.map((item, index) => (
                                                <div key={index} className='my-3'>

                                                    <Typography sx={{ fontSize: 20 }}>
                                                        <a target='_blank' href={item.url}>
                                                            {item.title}
                                                        </a>
                                                        <a target='_blank' href={item.sourceCodeUrl}>

                                                            <GitHubIcon sx={{ fontSize: 18, marginBottom: 1, marginLeft: 2 }} />
                                                        </a>
                                                    </Typography>

                                                    <Typography sx={{ fontSize: 20 }}>{item.description}</Typography>

                                                    <Typography sx={{ fontSize: 20 }}>{item.technologies}</Typography>

                                                </div>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>

                        <Button variant='contained'
                            sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" } }}
                            onClick={() => { window.history.back() }}
                        >Close</Button>
                    </Box>
            }
        </div>
    )
}

export default ViewStudent