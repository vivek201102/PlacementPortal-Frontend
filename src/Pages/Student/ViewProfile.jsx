import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, InputLabel, List, ListItem, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import apis from "../../apis";
import BasicInfo from "./Profile/BasicInfo";
import SkillInfo from "./Profile/SkillInfo";
import EducationInfo from "./Profile/EducationInfo";
import { ProfileContext } from "../../Context/Context";
import ExperienceInfo from "./Profile/ExperienceInfo";
import ProjectInfo from "./Profile/ProjectInfo";

const ViewProfile = () => {
    const { studentId } = useParams();
    const token = localStorage.getItem("token")
    const [studentInfo, setStudentInfo] = useState()
    const [skillList, setSkillList] = useState([])
    const [studentSkills, setStudentSkills] = useState([])
    const [change, setChange] = useState(true)
    const [education, setEducation] = useState([])
    const [studentExperience, setStudentExperience] = useState([])
    const [projects, setProjects] = useState([])

    

    

    

    

    

    useEffect(() => {
        axios.get(`${apis.getStudent}/${studentId}`, {
            headers: {Authorization: token}
        })
        .then((res) => {
            console.log(res.data);
            setStudentInfo(res.data)
        })
        .catch((err) => {
            console.log(err);
        })

        axios.get(apis.getAllSkills, {headers: {Authorization: token }})
        .then((res) => {
            setSkillList(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
        
        axios.get(`${apis.getStudentSkills}/${studentId}`, {headers: {Authorization: token }})
        .then((res) => {
            console.log(res.data);
            setStudentSkills(res.data)
        })
        .catch((err) => {
            console.log(err);
        })

        axios.get(`${apis.getAllEducations}/${studentId}`, 
        { headers: {Authorization: token}})
        .then((res) => {
            setEducation(res.data)
        })
        .catch((err) => {
            console.log(err);
        })

        axios.get(`${apis.getAllExperiences}/${studentId}`, 
        { headers: {Authorization: token}})
        .then((res) => {
            setStudentExperience(res.data)
        })
        .catch((err) => {
            console.log(err);
        })

        axios.get(`${apis.getAllProjects}/${studentId}`, {headers: {Authorization: token}})
        .then((res) => {
            console.log(res.data);
            setProjects(res.data)
        })
        .catch((err) => {
            console.log(err);
        })

    }, [change])

    

    

    

    

    return (
        studentInfo ?
        <div>
            <ProfileContext.Provider value={{change, setChange, studentId}}>
                
                <BasicInfo studentInfo={studentInfo} />
                
                <SkillInfo studentSkills={studentSkills} skillList={skillList} />
                
                <EducationInfo education={education} />

                
                <ExperienceInfo studentExperience={studentExperience}/>

                <ProjectInfo projects={projects} />
            
        </ProfileContext.Provider>
        </div> 
        :
        <div>
        </div>
    )
}

export default ViewProfile