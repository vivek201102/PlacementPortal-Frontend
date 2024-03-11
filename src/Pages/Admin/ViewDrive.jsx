import { Box, CircularProgress, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apis from '../../apis'
import { DataGrid } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'

const ViewDrive = () => {
    const { id } = useParams()
    const token = localStorage.getItem("token")
    const [driveDetail, setDriveDetail] = useState()
    const [row, setRow] = useState([])
    const navigate = useNavigate()

    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'firstName', headerName: 'First Name', width: 180 },
        { field: 'lastName', headerName: 'Last Name', width: 180 },
        { field: 'email', headerName: 'Email', width: 280 },
        {
            field: 'phone',
            headerName: 'Phone',
            type: 'string',
            width: 200
        },
        {
            headerName: 'View Student',
            width: 150,
            renderCell: (param) => (
                <VisibilityIcon sx={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => { navigate('/admin/student/' + param.row.id) }}
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
                const data = res.data.map(item => item.student.user);
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
            </React.Fragment>


    )
}

export default ViewDrive