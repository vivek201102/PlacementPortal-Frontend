import React, { useEffect, useState } from 'react'
import Statistics from '../Statistics/index'
import axios from 'axios'
import apis from '../../apis'

const StudentStat = () => {
  const [studentCnt, setStudentCnt] = useState(0)
  const [driveCnt, setDriveCnt] = useState(0)

  const [data, setData] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchData = async () => {

      let rows = [];
      await axios.get(apis.getStudentCount, { headers: { Authorization: token } })
      .then((res) => {
        rows.push({title: "Total Student", detail: res.data})
      })
      .catch((err) => {
        console.log(err);
      })
      
     await axios.get(apis.getDriveCount, { headers: { Authorization: token } })
      .then((res) => {
        rows.push({title: "Total Placement Drives", detail: res.data})
      })
      .catch((err) => {
        console.log(err);
      })
     
    await axios.get(apis.getApplicationsCount, { headers: { Authorization: token } })
      .then((res) => {
        rows.push({title: "Total Application", detail: res.data})
      })
      .catch((err) => {
        console.log(err);
      })
      
      await axios.get(apis.getPendingApplicationCount, { headers: { Authorization: token } })
      .then((res) => {
        rows.push({title: "Pending Applications", detail: res.data})
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