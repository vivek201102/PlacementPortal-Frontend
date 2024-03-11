import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useContext, useState } from 'react'
import { ProfileContext } from '../../../Context/Context'
import axios from 'axios'
import apis from '../../../apis'
import { toast } from 'react-toastify'

const ProjectInfo = ({ projects }) => {
    const { change, setChange, studentId } = useContext(ProfileContext)
    const token = localStorage.getItem("token")
    const [editProject, setEditProject] = useState(false)
    const [open, setOpen] = useState(false)
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        url: '',
        sourceCodeUrl: '',
        technologies: '',
        studentId: studentId
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const onChangenewProject = (e) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value })
    }

    const handleClose = () => {
        if (editProject) {
            setNewProject({
                title: '',
                description: '',
                url: '',
                sourceCodeUrl: '',
                technologies: '',
                studentId: studentId
            })
        }
        setOpen(false)
    }
    const submitProject = (event) => {
        event.preventDefault();
        console.log(newProject);
        if (editProject) {
            axios.put(`${apis.updateProject}/${newProject.id}`, newProject, { headers: { Authorization: token } })
                .then((res) => {
                    setChange(!change)
                    toast.success("Updated successfully")
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            axios.post(apis.registerProject, newProject,
                { headers: { Authorization: token } })
                .then((res) => {
                    toast.success("Project added successfully")
                    setChange(!change)
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Server error")
                })
        }
        setNewProject({
            title: '',
            description: '',
            url: '',
            sourceCodeUrl: '',
            technologies: '',
            studentId: studentId
        })
        handleClose();
    }

    const deleteProject = (id) => {
        axios.delete(`${apis.deleteProject}/${id}`, { headers: { Authorization: token } })
            .then((res) => {
                toast.success("Deleted Successfully")
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Grid item xs={12} sx={{ marginTop: 5 }}>
            <div className="flex items-center my-5">
                <div >
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginY: 5 }}>PROJECTS</Typography>
                </div>
                <div className="w-fit ms-auto">
                    <Button variant="contained" onClick={handleClickOpen} sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" } }} startIcon={<AddIcon />}>Add Project</Button>
                </div>
            </div>
            <Dialog
                onSubmit={submitProject}
                open={open}
                onClose={handleClose}
                fullWidth
                component="form"
            >
                <DialogTitle>Add Project</DialogTitle>
                <DialogContent>

                    {
                        open ?
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Title"
                                        variant="standard"
                                        name="title"
                                        value={newProject.title}
                                        onChange={onChangenewProject}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        variant="standard"
                                        name="description"
                                        value={newProject.description}
                                        onChange={onChangenewProject}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Technologies"
                                        variant="standard"
                                        name="technologies"
                                        value={newProject.technologies}
                                        onChange={onChangenewProject}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Sourcecode URL"
                                        variant="standard"
                                        name="sourceCodeUrl"
                                        value={newProject.sourceCodeUrl}
                                        onChange={onChangenewProject}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Project Url"
                                        variant="standard"
                                        name="url"
                                        value={newProject.url}
                                        onChange={onChangenewProject}
                                    />
                                </Grid>


                            </Grid>
                            :
                            <></>
                    }

                </DialogContent>
                <DialogActions>
                    <Button sx={{ backgroundColor: "#910A67", ":hover": { bgcolor: "#720455" } }} variant="contained" onClick={handleClose}>Cancel</Button>
                    {
                        editProject ?
                            <Button variant="contained" type="submit" sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" } }}>Update Project</Button>
                            :
                            <Button variant="contained" type="submit" sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" } }}>Add Project</Button>
                    }
                </DialogActions>
            </Dialog>
            <Grid container spacing={4} >
                {
                    projects.map((item, index) => (
                        <Grid item xs={10} sm={4} sx={{ boxShadow: 2, paddingY: 3 }} key={index}>
                            <div className="ms-auto me-4 w-fit">
                                <EditIcon onClick={() => {
                                    setNewProject(item)
                                    setEditProject(true)
                                    handleClickOpen()
                                }} sx={{ cursor: "pointer" }} />

                                <DeleteIcon sx={{ color: "red", marginX: 2, cursor: "pointer" }}
                                    onClick={() => { deleteProject(item.id) }}
                                />

                            </div>
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography variant="subtitle1">{item.description}</Typography>
                            <Typography variant='subtitle1'>{item.technologies}</Typography>
                            <div className="flex flex-col">
                                {
                                    item.url == '' ?
                                        <></> :
                                        <a target='_blank' href={item.url}>Project</a>
                                }
                                {
                                    item.sourceCodeUrl == ''
                                        ? <></> :
                                        <a target='_blank' href={item.sourceCodeUrl}>Source Code</a>
                                }
                            </div>

                        </Grid>
                    ))}
            </Grid>
        </Grid>
    )
}

export default ProjectInfo