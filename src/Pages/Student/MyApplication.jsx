import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apis from '../../apis';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'react-toastify';

const MyApplication = () => {
    const navigate = useNavigate();
    const [change, setChange] = useState(false)
    const [rows, setRows] = useState([])
    const token = localStorage.getItem("token")
    const studentId = localStorage.getItem("studentId")

    useEffect(() => {
        axios.get(`${apis.getAllApplications}/${studentId}`, 
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

    const widthDrawApplication = (id) => {
        axios.delete(`${apis.deleteApplication}/${id}`, {headers: {Authorization: token}})
        .then((res) => {
            toast.success("Application deleted successfully")
            setChange(!change)
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error while deleting application")
        })
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        {
            field: 'studentId',
            headerName: 'Student ID',
            width: 250,
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
                    onClick={() => { navigate('/student/drive/' + param.row.driveId) }}
                />
            )
        },

        {
            field: 'Actions',
            headerName: 'Actions',
            renderCell: (param) => (
                param.row.status === "APPLIED" ?
                    <div>
                        <Button variant="contained" sx={{ backgroundColor: "#3C0753", marginRight: 2, ":hover": { bgcolor: "#030637" } }}
                            onClick={() => {
                                widthDrawApplication(param.row.id)
                            }}>WithDraw Application</Button>
                    </div>
                    :
                    <div>
                        <Button variant="contained" sx={{ backgroundColor: "#D0312D", marginX: 2, ":hover": { bgcolor: "#990F02" } }} disabled>{param.row.status}</Button>
                    </div>
            ),
            width: 300
        }

    ];
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Typography variant='h5' sx={{ textAlign: "center", fontWeight: "bold" }}>Your Application</Typography>
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

export default MyApplication