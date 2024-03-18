import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import apis from '../../apis'
import { toast } from 'react-toastify'

const Drives = () => {
    const theme = createTheme();
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [currentDrives, setCurrentDrives] = useState([])
    const [unfinished, setUnfinished] = useState([])
    const [finished, setFinished] = useState([])
    const [change, setChange] = useState(false)
    const token = localStorage.getItem("token")
    const [open, setOpen] = useState(false)
    const [selectedDrive, setSelectedDrive] = useState()
    const [loading, setLoading] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [id, setId] = useState()


    useEffect(() => {
        axios.get(apis.getAllDrive,
            { headers: { Authorization: token } })
            .then((res) => {
                setData(res.data)
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get(apis.getUnfinished, { headers: { Authorization: token }})
        .then((res) => {
            setUnfinished(res.data)
        })
        .catch((err) => {
            console.log(err);
        })

        axios.get(apis.getFinished, { headers: { Authorization: token }})
        .then((res) => {
            setFinished(res.data)
        })
        .catch((err) => {
            console.log(err);
        })

        axios.get(apis.getAllCurrentDrive,
            { headers: { Authorization: token } })
            .then((res) => {
                setCurrentDrives(res.data)
            })
            .catch((err) => {
                toast.error(err.response.data)
                console.log(err);
            })
    }, [change])

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'companyName', headerName: 'Company Name', width: 200 },
        { field: 'jobRole', headerName: 'Role', width: 180 },
        { field: 'ctc', headerName: 'CTC', width: 150 },
        {
            field: 'createdAt',
            headerName: 'Posted on',
            type: 'string',
            width: 150,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
            sortComparator: (a, b, order) => {
                const dateA = new Date(a).getTime();
                const dateB = new Date(b).getTime();

                return order === 'asc' ? dateA - dateB : dateB - dateA;
            },
            renderCell: (params) => (
                <div>{new Date(params.value).toLocaleDateString()}</div>
            ),
        },
        {
            field: 'deadlineForApplication',
            headerName: 'Apply before',
            sortable: true,
            width: 200,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
            sortComparator: (a, b, order) => {
                const dateA = new Date(a).getTime();
                const dateB = new Date(b).getTime();

                return order === 'asc' ? dateA - dateB : dateB - dateA;
            },
            renderCell: (params) => (
                <div>{new Date(params.value).toLocaleDateString()}</div>
            ),
        },
        {
            headerName: 'Edit',
            width: 150,
            renderCell: (param) => (
                <EditIcon sx={{ color: 'blue', cursor: 'pointer' }}
                    onClick={(e) => {
                        e.stopPropagation()
                        navigate('/admin/drive/edit/' + param.row.id)
                    }} />
            )
        },
        {
            headerName: 'Delete',
            field: 'Delete',
            width: 150,
            renderCell: (param) => (
                <DeleteIcon
                    sx={{ color: 'red', cursor: 'pointer' }}
                    onClick={(e) => { e.stopPropagation(); 
                        openAlert(param.row.id) }}
                />
            ),
            sortable: false
        },
        {
            headerName: 'Send Notification',
            field: 'Send Notification',
            width: 200,
            renderCell: (param) => (
                <Button variant='contained' sx={{ background: '#3C0753', ":hover": { bgcolor: "#3C0753" } }}
                    onClick={() => {
                        setSelectedDrive(param.row.id)
                        setOpen(true)
                    }}
                >Send Notification</Button>
            )
        }
    ];

    const unfinishedColumns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'companyName', headerName: 'Company Name', width: 200 },
        { field: 'jobRole', headerName: 'Role', width: 180 },
        { field: 'ctc', headerName: 'CTC', width: 150 },
        {
            field: 'createdAt',
            headerName: 'Posted on',
            type: 'string',
            width: 150,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
            sortComparator: (a, b, order) => {
                const dateA = new Date(a).getTime();
                const dateB = new Date(b).getTime();

                return order === 'asc' ? dateA - dateB : dateB - dateA;
            },
            renderCell: (params) => (
                <div>{new Date(params.value).toLocaleDateString()}</div>
            ),
        },
        {
            field: 'deadlineForApplication',
            headerName: 'Apply before',
            sortable: true,
            width: 200,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
            sortComparator: (a, b, order) => {
                const dateA = new Date(a).getTime();
                const dateB = new Date(b).getTime();

                return order === 'asc' ? dateA - dateB : dateB - dateA;
            },
            renderCell: (params) => (
                <div>{new Date(params.value).toLocaleDateString()}</div>
            ),
        },
        {
            headerName: 'Send Notification',
            field: 'Send Notification',
            width: 200,
            renderCell: (param) => (
                <Button variant='contained' sx={{ background: '#3C0753', ":hover": { bgcolor: "#3C0753" } }}
                    onClick={() => {
                        setSelectedDrive(param.row.id)
                        setOpen(true)
                    }}
                >Send Notification</Button>
            )
        }
    ];

    const finishedCol = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'companyName', headerName: 'Company Name', width: 200 },
        { field: 'jobRole', headerName: 'Role', width: 180 },
        { field: 'ctc', headerName: 'CTC', width: 150 },
        {
            field: 'createdAt',
            headerName: 'Posted on',
            type: 'string',
            width: 150,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
            sortComparator: (a, b, order) => {
                const dateA = new Date(a).getTime();
                const dateB = new Date(b).getTime();

                return order === 'asc' ? dateA - dateB : dateB - dateA;
            },
            renderCell: (params) => (
                <div>{new Date(params.value).toLocaleDateString()}</div>
            ),
        },
        {
            field: 'deadlineForApplication',
            headerName: 'Apply before',
            sortable: true,
            width: 200,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
            sortComparator: (a, b, order) => {
                const dateA = new Date(a).getTime();
                const dateB = new Date(b).getTime();

                return order === 'asc' ? dateA - dateB : dateB - dateA;
            },
            renderCell: (params) => (
                <div>{new Date(params.value).toLocaleDateString()}</div>
            ),
        },
        {
            headerName: 'Generate Report',
            field: 'Generate Report',
            width: 200,
            renderCell: (param) => (
                <Button variant='contained' sx={{ background: '#3C0753', ":hover": { bgcolor: "#3C0753" } }}
                    onClick={() => {
                        setSelectedDrive(param.row.id)
                        setOpen(true)
                    }}
                >Generate Report</Button>
            )
        }
    ];


    const openAlert = async (id) => {
        setId(id)
        setAlertOpen(true)
    }

    const deletePlacementDrive = async () => {
        setLoading(true)
        await axios.delete(`${apis.deleteDrive}/${id}`, { headers: { Authorization: token } })
            .then((res) => {
                toast.success("Deleted Successfully")
                setChange(!change)
            })
            .catch((err) => {
                toast.error(err.response.data);
                console.log(err);
            })
        setLoading(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())

        await axios.post(`${apis.sendNotification}/${selectedDrive}`, { "subject": data.subject, "text": data.text }, { headers: { Authorization: token } })
            .then((res) => {
                toast.success("Email sent successfully")
            })
            .catch((err) => {
                console.log(err);
            })
        setOpen(false)
        setLoading(false)
    }

    return (
        <ThemeProvider theme={theme}>

            <Dialog
                open={alertOpen}
            >
                <DialogTitle>Please confirm that you want to delete placement drive?</DialogTitle>
                <DialogActions>
                    <Button
                        sx={{ background: '#910A67', ":hover": { bgcolor: "#910A67" } }}
                        onClick={ () => {
                            setId()
                            setAlertOpen(false)
                        }}
                        variant='contained'>
                        Cancel
                    </Button>
                    
                    <Button 
                        sx={{ background: '#3C0753', ":hover": { bgcolor: "#3C0753" } }}
                        onClick={() => {
                            setAlertOpen(false)
                            deletePlacementDrive()
                        }}
                        variant='contained'>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open}
                component="form"
                onSubmit={handleSubmit}
                fullWidth
            >
                <DialogTitle>Send Message</DialogTitle>
                {
                    loading ?
                        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>

                            <CircularProgress />
                        </DialogContent>
                        :
                        <DialogContent>

                            <TextField
                                name='subject'
                                label='Subject'
                                fullWidth
                                variant='standard'
                                required
                                sx={{ marginY: 2 }}
                            />
                            <TextField
                                name='text'
                                fullWidth
                                variant='standard'
                                label='Message'
                                multiline
                                rows={8}
                                required
                                sx={{ marginY: 2 }}
                            />
                        </DialogContent>
                }
                <DialogActions>
                    <Button
                        variant='contained'
                        sx={{
                            background: '#720455',
                            ":hover": { bgcolor: "#720455" }
                        }}
                        onClick={() => {
                            setSelectedDrive();
                            setOpen(false)
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant='contained'
                        sx={{
                            background: '#3C0753',
                            ":hover": { bgcolor: "#3C0753" }
                        }}
                        type='submit'
                    >Send Email</Button>
                </DialogActions>
            </Dialog>
            <div className='w-fit ms-auto'>
                <Button variant="contained" startIcon={<AddIcon />} sx={{ background: '#720455', ":hover": { bgcolor: "#3C0753" } }} href='/admin/add-drive'>
                    Add Drive
                </Button>
            </div>
            <div style={{ width: '100%', minHeight: 200, marginBottom: 100 }}>
                <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Accepting Applications
                </Typography>
                <DataGrid
                    onCellClick={(e)=>{ navigate('/admin/drive/' + e.id ) }}
                    rows={currentDrives}
                    columns={columns}
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15]}
                    loading={loading}
                />
            </div>
            <div style={{ width: '100%', marginTop: 40 }}>
                <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Unfinished Drives
                </Typography>
                <DataGrid
                    onCellClick={(e)=>{ navigate('/admin/drive/' + e.id ) }}
                    autoHeight
                    rows={unfinished}
                    columns={unfinishedColumns}
                    sx={{
                        minHeight: 20
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15]}

                />
            </div>

            <div style={{ width: '100%', marginTop: 40 }}>
                <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Finished Drives
                </Typography>
                <DataGrid
                    onCellClick={(e)=>{ navigate('/admin/drive/' + e.id ) }}
                    autoHeight
                    rows={finished}
                    columns={finishedCol}
                    sx={{
                        minHeight: 20
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15]}

                />
            </div>
        </ThemeProvider>

    )
}

export default Drives