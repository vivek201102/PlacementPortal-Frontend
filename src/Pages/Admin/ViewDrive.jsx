import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apis from '../../apis'
import { DataGrid } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { toast } from 'react-toastify'

const ViewDrive = () => {
    const { id } = useParams()
    const token = localStorage.getItem("token")
    const [driveDetail, setDriveDetail] = useState()
    const [row, setRow] = useState([])
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [placedInfo, setPlacedInfo] = useState([])


    const handlePlacementChange = (rowData, event) => {
        const newRows = row.map(obj => {
            if (obj.id == rowData.id) {
                return { ...obj, placed: event.target.value }
            }
            else {
                return { ...obj }
            }
        })
        setRow(newRows)
        const index = placedInfo.findIndex(item => item.id == rowData.user.id)

        if(index != -1){
            let updatedInfo = [...placedInfo]
            updatedInfo.splice(index)
            setPlacedInfo(updatedInfo)
        }

    };

    const handleChange = (rowData, event) => {
        const { id } = rowData.user;
        const { value } = event.target;
        const index = placedInfo.findIndex(item => item.id === id);
        if (index !== -1) {
            const updatedInfo = [...placedInfo];
            updatedInfo[index] = { ...updatedInfo[index], offer: value };
            setPlacedInfo(updatedInfo);
        } else {
            setPlacedInfo(prevPlacedInfo => [...prevPlacedInfo, { id, offer: value }]);
        }
    };

    const handleClose = () => {
        setPlacedInfo([])
        setOpen(false)
    }

    const completeDrive = () => {
        setOpen(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(placedInfo);
        axios.post(apis.placeStudents, {"offers": placedInfo, "placementDriveId": id}, {headers: {Authorization: token}})
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const listColumns = [
        { field: 'user.id', headerName: 'ID', width: 140, valueGetter: (params) => params.row.user.id },
        { field: 'user.firstName', headerName: 'First Name', width: 200, valueGetter: (params) => params.row.user.firstName },
        { field: 'user.lastName', headerName: 'Last Name', width: 200, valueGetter: (params) => params.row.user.lastName },
        {
            field: 'placement status', width: 250, renderCell: (param) => (
                <Select value={param.row.placed} fullWidth onChange={(e) => { handlePlacementChange(param.row, e) }}>
                    <MenuItem value={false}>Not Placed</MenuItem>
                    <MenuItem value={true}>Placed</MenuItem>
                </Select>
            )
        },
        {
            field: 'offer amount', width: 250, renderCell: (param) => (
                param.row.placed ?
                    <TextField
                        type='number'
                        variant='standard'
                        onChange={(e) => {
                            handleChange(param.row, e)
                        }}
                    /> : <></>
            )
        }
    ]

    const columns = [
        { field: 'user.id', headerName: 'ID', width: 250, valueGetter: (params) => params.row.user.id },
        { field: 'user.firstName', headerName: 'First Name', width: 180, valueGetter: (params) => params.row.user.firstName },
        { field: 'user.lastName', headerName: 'Last Name', width: 180, valueGetter: (params) => params.row.user.lastName },
        { field: 'user.email', headerName: 'Email', width: 280, valueGetter: (params) => params.row.user.email },
        {
            field: 'user.phone',
            headerName: 'Phone',
            type: 'string',
            width: 200,
            valueGetter: (params) => params.row.user.phone
        },
        {
            headerName: 'View Student',
            width: 150,
            renderCell: (param) => (
                <VisibilityIcon sx={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => { navigate('/admin/student/' + param.row.user.id) }}
                />
            )
        },

    ];

    useEffect(() => {
        axios.get(`${apis.getDrive}/${id}`, { headers: { Authorization: token } })
            .then((res) => {
                setDriveDetail(res.data)
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get(`${apis.getDriveApplication}/${id}`, { headers: { Authorization: token } })
            .then((res) => {
                console.log(res.data);
                const data = res.data.map(item => item.student);
                console.log(data);
                setRow(data)
            })
            .catch((err) => {
                console.log(err);
                toast.error("Server error ");
            })
    }, [])
    return (

        driveDetail == null ?
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
                width: "90vw"
            }}>
                <CircularProgress />
            </Box>
            :
            <React.Fragment>

                <Typography
                    variant='h5'
                    sx={{
                        fontWeight: "bold"
                    }}
                >
                    {driveDetail.companyName}
                </Typography>
                <Box
                    sx={{
                        boxShadow: 3,
                        padding: 4,
                        display: "flex"
                    }}
                >
                    <div className='w-1/2'>

                        <Typography variant='subtitle1' fontWeight="bold" marginY={1}>
                            Description:
                        </Typography>
                        <Typography
                            variant='subtitle1'>
                            <TextField
                                multiline
                                variant='standard'
                                fullWidth
                                value={driveDetail.description}
                            />
                        </Typography>
                    </div>
                    <div>

                        <Typography variant='subtitle1' fontWeight="bold" marginY={1}>
                            CTC: {driveDetail.ctc}
                        </Typography>
                        <Typography variant='subtitle1' fontWeight="bold" marginY={1}>
                            Job Role: {driveDetail.jobRole}
                        </Typography>
                        <Typography variant='subtitle1' fontWeight="bold" marginY={1}>
                            Qualification: {driveDetail.qualification}
                        </Typography>
                        <Typography variant='subtitle1' fontWeight="bold" marginY={1}>
                            Criteria: {driveDetail.criteria}
                        </Typography>
                    </div>
                </Box>
                <Box>
                    <Typography
                        variant='h5'
                        sx={{
                            fontWeight: "bold",
                            marginY: 4
                        }}
                    >Applications</Typography>
                    <DataGrid
                        columns={columns}
                        rows={row}
                        autoHeight
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 15]}
                    />
                </Box>
        
                <Box
                    sx={{
                        textAlign: "right",
                        marginY: 4
                    }}
                >
                    <Button variant='contained'
                        sx={{
                            marginX: 3,
                            backgroundColor: "#910A67",
                            ":hover": {
                                bgcolor: "#910A67"
                            }
                        }}
                        onClick={() => { window.history.back() }}    
                    >Close</Button>
                    {
                        driveDetail.deadlineForApplication < new Date().toISOString()
                        ? 
                    <Button
                        onClick={completeDrive}
                        variant='contained'
                        sx={{
                            backgroundColor: "#910A67",
                            ":hover": {
                                bgcolor: "#910A67"
                            }
                        }}
                    >
                        Complete Drive
                    </Button>
                    :
                    <></>
                    }
                    
                </Box>
                <Dialog
                    component="form"
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    fullWidth
                    maxWidth="lg"
                >
                    <DialogTitle>
                        <Typography variant='h6' fontWeight="bold">
                            Select Placed Students
                        </Typography>
                    </DialogTitle>
                    <DialogContent sx={{ marginY: 2 }}>
                        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                            <DataGrid columns={listColumns} rows={row} />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>


    )
}

export default ViewDrive