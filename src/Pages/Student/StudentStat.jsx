import React, { useEffect, useState } from 'react'
import Statistics from '../Statistics/index'
import axios from 'axios'
import apis from '../../apis'

const StudentStat = () => {
  const [data, setData] = useState([])
  const token = localStorage.getItem("token")
  const studentId = localStorage.getItem("studentId")

  useEffect(() => {
    const fetchData = async () => {
      let rows = []

      await axios.get(apis.getDriveCount, { headers: { Authorization: token } })
        .then((res) => {
          rows.push({ title: "Total Placement Drives", detail: res.data })
        })
        .catch((err) => {
          console.log(err);
        })

      await axios.get(`${apis.getStudentApplicationCount}/${studentId}`, { headers: { Authorization: token } })
        .then((res) => {
          rows.push({ title: "Your Applications", detail: res.data })
        })
        .catch((err) => {
          console.log(err);
        })
      
      await axios.get(`${apis.getStudentPendingApplicationCount}/${studentId}`, { headers: { Authorization: token } })
        .then((res) => {
          rows.push({ title: "Your Pending Applications", detail: res.data })
        })
        .catch((err) => {
          console.log(err);
        })

      setData(rows)
    }

    fetchData()
  }, [])

  return (
    <Statistics data={data} />
  )
}

export default StudentStat