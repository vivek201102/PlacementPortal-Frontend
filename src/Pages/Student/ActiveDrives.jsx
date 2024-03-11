import { Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apis from '../../apis';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const ActiveDrives = () => {
    const [currentDrives, setCurrentDrives] = useState([]);
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    
    useEffect(() => {
      axios.get(apis.getAllDriveStudent, {
        headers: { Authorization: token }
      })
      .then((res) => {
        console.log(res);
        setCurrentDrives(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
    }, [])


    const columns = [
        { field: 'id', headerName:'ID', width: 100},
        { field: 'companyName', headerName: 'Company Name', width: 230 },
        { field: 'jobRole', headerName: 'Role', width: 210 },
        { field: 'ctc', headerName: 'CTC', width: 220 },
        {
          field: 'createdAt',
          headerName: 'Posted on',
          type: 'string',
          width: 220,
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
          width: 240,
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
          headerName: 'View Drive',
          width: 200,
          renderCell: (param) => (
            <VisibilityIcon onClick = {() => {navigate("/student/drive/" + param.row.id)}} sx={{color: 'blue', cursor:'pointer'}} />
          )
        }
      ];

    return (
        <div style={{ width: '100%', minHeight: 200, marginBottom: 100 }}>
            <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Current Drives
            </Typography>
            <DataGrid
                rows={currentDrives}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 15]}
                sx={{minHeight: 200}}
            />
        </div>
    )
}

export default ActiveDrives