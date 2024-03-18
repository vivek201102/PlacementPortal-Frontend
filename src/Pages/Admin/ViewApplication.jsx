import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apis from '../../apis';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon  from '@mui/icons-material/CheckCircle';
import CancelIcon from "@mui/icons-material/Cancel"
import { toast } from 'react-toastify';
const ViewApplication = () => {
    const navigate = useNavigate();
    const [change, setChange] = useState(false)
    const [rows, setRows] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get(apis.getAllPendingApplications, 
            { headers: { Authorization: token }})
            .then((res) => {
                console.log(res.data);
                let data = [];
                res.data.forEach(element => {
                    let obj = {
                        id: element.id,
                        studentId: element.student.user.id,
                        driveId: element.placementDrive.id,
                        companyName: element.placementDrive.companyName,
                        status: element.status
                    }
                    data.push(obj)
                });
                setRows(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [change])

    const approve = (id) => {
        axios.put(`${apis.approveApplication}/${id}`, {}, {headers: {Authorization: token}})
        .then((res) => {
            toast.success("Application Approved")
            setChange(!change)
        })
        .catch((err) => {
            toast.error("Server Error")
            console.log(err);
        })
    }
    
    const reject = (id) => {
        axios.put(`${apis.rejectApplication}/${id}`, {}, {headers: {Authorization: token}})
        .then((res) => {
            setChange(!change)
            toast.success("Application Rejected")
        })
        .catch((err) => {
            toast.error("Server Error")
            console.log(err);
        })
    }

    const placedColumns = [
        { field: 'id', headerName: 'ID', width: 120 },
        {
            field: 'studentId',
            headerName: 'Student ID',
            width: 250,
        },
        {
            field: 'View Student',
            headerName: 'View Student',
            width: 150,
            renderCell: (param) => (
                <VisibilityIcon sx={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => { navigate('/admin/student/' + param.row.studentId) }}
                />
            )
        },
        {
            field: 'driveId',
            headerName: 'Placement Drive ID',
            type: 'string',
            width: 200,
            editable: true,
        },
        {
            field: 'companyName',
            headerName: 'Company Name',
            type: 'string',
            width: 250,
        },
        {
            field: 'View Drive',
            headerName: 'View Drive',
            width: 150,
            renderCell: (param) => (
                <VisibilityIcon sx={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => { navigate('/admin/drive/edit/' + param.row.driveId) }}
                />
            )
        },

        {
            field: 'Actions',
            headerName: 'Actions',
            renderCell: (param) => (
                param.row.status === "APPLIED" ?
                    <div>
                        <Button variant="contained" startIcon={<CheckCircleIcon />} sx={{ backgroundColor: "#3C0753", marginRight: 2, ":hover": { bgcolor: "#030637" } }}
                            onClick={() => {
                                approve(param.row.id)
                            }}>Approve</Button>
                        <Button variant="contained" startIcon={<CancelIcon />} sx={{ backgroundColor: "#D0312D", marginX: 2, ":hover": { bgcolor: "#990F02" } }} 
                        onClick={() => {
                            reject(param.row.id)
                        }}>Reject</Button>
                    </div>
                    :
                    <div>
                        <Button variant="contained" sx={{ backgroundColor: "#D0312D", marginX: 2, ":hover": { bgcolor: "#990F02" } }} disabled>APPROVED</Button>
                    </div>
            ),
            width: 300
        },
        {
            field: "Offers",
            headerName: "Offers"
        }
    ]

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        {
            field: 'studentId',
            headerName: 'Student ID',
            width: 250,
        },
        {
            field: 'View Student',
            headerName: 'View Student',
            width: 150,
            renderCell: (param) => (
                <VisibilityIcon sx={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => { navigate('/admin/student/' + param.row.studentId) }}
                />
            )
        },
        {
            field: 'driveId',
            headerName: 'Placement Drive ID',
            type: 'string',
            width: 200,
            editable: true,
        },
        {
            field: 'companyName',
            headerName: 'Company Name',
            type: 'string',
            width: 250,
        },
        {
            field: 'View Drive',
            headerName: 'View Drive',
            width: 150,
            renderCell: (param) => (
                <VisibilityIcon sx={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => { navigate('/admin/drive/edit/' + param.row.driveId) }}
                />
            )
        },

        {
            field: 'Actions',
            headerName: 'Actions',
            renderCell: (param) => (
                param.row.status === "APPLIED" ?
                    <div>
                        <Button variant="contained" startIcon={<CheckCircleIcon />} sx={{ backgroundColor: "#3C0753", marginRight: 2, ":hover": { bgcolor: "#030637" } }}
                            onClick={() => {
                                approve(param.row.id)
                            }}>Approve</Button>
                        <Button variant="contained" startIcon={<CancelIcon />} sx={{ backgroundColor: "#D0312D", marginX: 2, ":hover": { bgcolor: "#990F02" } }} 
                        onClick={() => {
                            reject(param.row.id)
                        }}>Reject</Button>
                    </div>
                    :
                    <div>
                        <Button variant="contained" sx={{ backgroundColor: "#D0312D", marginX: 2, ":hover": { bgcolor: "#990F02" } }} disabled>APPROVED</Button>
                    </div>
            ),
            width: 300
        }

    ];

    const updateStatusOfApplication = (id, status) => {
        axios.put(`${apis.updateApplicationStatus}/${id}`, status, { headers: { 'Content-Type': 'application/json' } })
            .then((res) => {
                toast.success("Status updated successfully")
                change ? setChange(false) : setChange(true)
            })
            .catch((err) => {
                console.log(err);
                toast.error("Server Error: " + err.code)
            })
    }

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Typography variant='h5' sx={{ textAlign: "center", fontWeight: "bold" }}>Pending Approvals</Typography>
            <DataGrid
            autoHeight
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    )
}

export default ViewApplication