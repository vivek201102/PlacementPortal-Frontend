import React, { useContext, useState } from 'react'
import { ProfileContext } from '../../../Context/Context';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import apis from '../../../apis';
import axios from 'axios';
import { toast } from 'react-toastify';

const ExperienceInfo = ({ studentExperience }) => {
    const { change, setChange, studentId } = useContext(ProfileContext)
    const token = localStorage.getItem("token")
    const [open, setOpen] = useState(false)
    const [editExperience, setEditExperience] = useState(false)
    const [newExperience, setNewExperience] = useState({
        title: '',
        organization: '',
        description: '',
        fromDate: '',
        toDate: '',
        studentId: studentId
    })

    const onChangeNewExperience = (event) => {
        setNewExperience({ ...newExperience, [event.target.name]: event.target.value })
    }

    const handleClose = () => {
        setOpen(false)
        if (editExperience) {
            setEditExperience(false)
            setNewExperience({
                title: '',
                organization: '',
                description: '',
                fromDate: '',
                toDate: '',
                studentId: studentId
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editExperience) {
            axios.put(`${apis.updateExperience}/${newExperience.id}`, newExperience, { headers: { Authorization: token } })
                .then((res) => {
                    toast.success("Experience updated successfully")
                    setChange(!change)
                    handleExperienceClose();
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Server error: " + err.code)
                })
        }
        else {
            axios.post(apis.registerExperience, newExperience,
                { headers: { Authorization: token } })
                .then((res) => {
                    toast.success("Experience added successfully");
                    setChange(!change)
                    setNewExperience({
                        title: '',
                        organization: '',
                        description: '',
                        start: '',
                        end: '',
                        studentId: studentId
                    })
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Server error")
                })
        }
        handleClose();
    }

    const deleteExperience = (id) => {
        axios.delete(`${apis.deleteExperience}/${id}`,
        { headers: {Authorization: token }})
            .then((res) => {
                toast.success("Education deleted successfully")
                change ? setChange(false) : setChange(true)
            })
            .catch((err) => {
                toast.error("Server error: " + err.code)
            })
    }
    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Grid item xs={12}>
            <div className="flex items-center my-5">

            <Typography variant="h5" sx={{ fontWeight: "bold", marginY: 5 }}>EXPERIENCE</Typography>
            <div className="w-fit ms-auto">
                <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" } }} startIcon={<AddIcon />}>Add Experience</Button>
            </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                component="form"
                onSubmit={handleSubmit}
            >
                <DialogTitle>Add Experience</DialogTitle>
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
                                        value={newExperience.title}
                                        onChange={onChangeNewExperience}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Organization"
                                        variant="standard"
                                        name="organization"
                                        value={newExperience.organization}
                                        onChange={onChangeNewExperience}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        variant="standard"
                                        name="description"
                                        multiline
                                        rows={6}
                                        value={newExperience.description}
                                        onChange={onChangeNewExperience}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="From"
                                        variant="standard"
                                        name="fromDate"
                                        value={newExperience.fromDate}
                                        onChange={onChangeNewExperience}
                                        helperText="MON-YYYY"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="To"
                                        variant="standard"
                                        name="toDate"
                                        value={newExperience.toDate}
                                        onChange={onChangeNewExperience}
                                        helperText="MON-YYYY"
                                    />
                                </Grid>
                            </Grid>

                            : <></>
                    }
                </DialogContent>
                <DialogActions>
                    <Button sx={{ backgroundColor: "#910A67", ":hover": { bgcolor: "#720455" } }} variant="contained" onClick={handleClose}>Cancel</Button>
                    {
                        editExperience ?
                            <Button variant="contained" type="submit" sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" } }}>
                                Update Experience
                            </Button>
                            :
                            <Button variant="contained" type="submit" sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" } }}>
                                Add Experience
                            </Button>
                    }
                </DialogActions>
            </Dialog>
            <Grid container spacing={4} >
                {
                    studentExperience.map((item, index) => (
                        <Grid item xs={10} sm={4} sx={{ boxShadow: 2, paddingY: 3 }} key={index}>
                            <div className="ms-auto me-4 w-fit">
                                <EditIcon onClick={() => {
                                    setNewExperience(item)
                                    setEditExperience(true)
                                    handleOpen()
                                }} sx={{ cursor: "pointer" }} />

                                <DeleteIcon sx={{ color: "red", marginX: 2, cursor: "pointer" }}
                                    onClick={() => {
                                        deleteExperience(item.id)
                                    }}
                                />

                            </div>
                            <Typography variant="h6">{item.title}</Typography>
                            <div className="flex">
                                <span>{item.organization}</span>
                                <span className="ms-8">{item.start} - {item.end}</span>
                            </div>
                            <p>
                                {item.description}
                            </p>
                        </Grid>
                    ))}
            </Grid>
        </Grid>
    )
}

export default ExperienceInfo