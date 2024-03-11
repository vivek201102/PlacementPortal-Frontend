import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, Typography, createTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import apis from '../../apis';

const Students = () => {
    const theme = createTheme();
    const [change, setChange] = useState(false)
    const [students, setStudents] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get(apis.getStudents, { headers: {Authorization: token}})
        .then((res) => {
            setStudents(res.data)
        })
        .catch((err) => {
            console.log(err);
            toast.error("Server error ");
        })
    }, [change])

    const columns = [
        { field: 'id', headerName:'ID', width: 250},
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
            <VisibilityIcon  sx={{color: 'blue', cursor:'pointer'}} 
                onClick = { () => { navigate('/admin/student/' + param.row.id)} }
            />
          )
        },
        {
          headerName: 'Delete',
          field:'Delete',
          width: 150,
          renderCell: (param) => (
            <DeleteIcon  
              sx={{color: 'red', cursor:'pointer'}} 
              onClick = {() => { deleteStudent(param.row.id) }}
              />
          ),
          sortable:false
        },
      ];

      const deleteStudent = (id) => {
        axios.delete(`${apis.deleteStudent}/${id}`, { headers: { Authorization: token } })
        .then((res) => {
            toast.success("Student with ID: " + res.data.id + " deleted successfully");
            setChange(!change)
        })
        .catch((err) => {
            console.log(err);
            toast.error("Server Error")
        })
      }

  return (
    <ThemeProvider theme={theme}>
        <div style={{ width: '100%', marginBottom:100 }}>
        <Typography variant='h5' sx={{textAlign: 'center', fontWeight:'bold'}}>
          Student List
        </Typography>
        <DataGrid
            rows={students}
            columns={columns}
            autoHeight
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

export default Students