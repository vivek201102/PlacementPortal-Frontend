import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add"
import React, { useContext, useState } from 'react'
import apis from '../../../apis';
import axios from 'axios';
import { ProfileContext } from '../../../Context/Context';
import { toast } from 'react-toastify';
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

const EducationInfo = ({ education }) => {
    const {change, setChange, studentId} = useContext(ProfileContext)
    const token = localStorage.getItem("token")
    const [open, setOpen] = useState(false)
    const [editEducation, setEditEducation] = useState(false)
    const [newEducation, setNewEducation] = useState({
        degree: '',
        fieldOfStudy: '',
        result: '',
        institute: '',
        fromDate: '',
        toDate: '',
        studentId: studentId
    })

    const onChangeNewEducation = (event) => {
        setNewEducation({ ...newEducation, [event.target.name]: event.target.value })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (editEducation) {
            setNewEducation({
                degree: '',
                fieldOfStudy: '',
                institute: '',
                result: '',
                fromDate: '',
                toDate: '',
                studentId: studentId
            })
            setEditEducation(false)
        }
    };

    const submitEducation = (event) => {
        event.preventDefault();
        console.log(newEducation);
        if (editEducation) {
            axios.put(`${apis.updateEducation}/${newEducation.id}`, newEducation, { headers: { Authorization: token } })
                .then((res) => {
                    toast.success("Education updated successfully")
                    setChange(!change)
                    handleClose();
                })
                .catch((err) => {
                    toast.error("Server error: " + err.code)
                })
        }
        else {
            axios.post(apis.registerEducation, newEducation, { headers: { Authorization: token } })
                .then((res) => {
                    toast.success("Education added successfully");
                    setChange(!change)
                    setNewEducation({
                        degree: '',
                        fieldOfStudy: '',
                        institute: '',
                        result: '',
                        fromDate: '',
                        toDate: '',
                        studentId: studentId
                    })
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Server error" + err.code)
                })
        }
        handleClose();
    }

    const deleteEducation = (id) => {
        axios.delete(`${apis.deleteEducation}/${id}`, { headers: { Authorization: token } })
            .then((res) => {
                toast.success("Education deleted successfully")
                setChange(!change)
            })
            .catch((err) => {
                console.log(err);
                toast.error("Server error: " + err.code)
            })
    }

    return (
        <Grid item xs={12} sx={{ marginTop: 5 }}>
            <div className="flex items-center my-5">
                <div >
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginY: 5 }}>EDUCATION</Typography>
                </div>
                <div className="w-fit ms-auto">
                    <Button variant="contained" onClick={handleClickOpen} sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" } }} startIcon={<AddIcon />}>Add Education</Button>
                </div>
            </div>
            <Dialog
                onSubmit={submitEducation}
                open={open}
                onClose={handleClose}
                fullWidth
                component="form"
            >
                <DialogTitle>Add Education</DialogTitle>
                <DialogContent>

                    {
                        open ?
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Degree"
                                        variant="standard"
                                        name="degree"
                                        value={newEducation.degree}
                                        onChange={onChangeNewEducation}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Field of Study"
                                        variant="standard"
                                        name="fieldOfStudy"
                                        value={newEducation.fieldOfStudy}
                                        onChange={onChangeNewEducation}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Institute"
                                        variant="standard"
                                        name="institute"
                                        value={newEducation.institute}
                                        onChange={onChangeNewEducation}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Result"
                                        variant="standard"
                                        name="result"
                                        value={newEducation.result}
                                        onChange={onChangeNewEducation}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="From"
                                        variant="standard"
                                        name="fromDate"
                                        value={newEducation.fromDate}
                                        onChange={onChangeNewEducation}
                                        helperText="MON-YYYY"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="To"
                                        variant="standard"
                                        name="toDate"
                                        value={newEducation.toDate}
                                        onChange={onChangeNewEducation}
                                        helperText="MON-YYYY"
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
                        editEducation ?
                            <Button variant="contained" type="submit" sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" } }}>Update Education</Button>
                            :
                            <Button variant="contained" type="submit" sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" } }}>Add Education</Button>
                    }
                </DialogActions>
            </Dialog>
            <Grid container spacing={4} >
                {
                    education.map((item, index) => (
                        <Grid item xs={10} sm={4} sx={{ boxShadow: 2, paddingY: 3 }} key={index}>
                            <div className="ms-auto me-4 w-fit">
                                <EditIcon onClick={() => {
                                    setNewEducation(item)
                                    setEditEducation(true)
                                    handleClickOpen()
                                }} sx={{ cursor: "pointer" }} />

                                <DeleteIcon sx={{ color: "red", marginX: 2, cursor: "pointer" }}
                                    onClick={() => { deleteEducation(item.id) }}
                                />

                            </div>
                            <Typography variant="h6">{item.degree}</Typography>
                            <Typography variant="h6">{item.fieldOfStudy}</Typography>
                            <div className="flex">
                                <span>{item.institute}</span>
                                <span className="ms-8">{item.fromDate} - {item.toDate}</span>
                            </div>
                            <p>
                                {item.result}
                            </p>
                        </Grid>
                    ))}
            </Grid>
        </Grid>
    )
}

export default EducationInfo