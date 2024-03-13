import { Button, Grid, List, ListItem, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useContext, useState } from 'react'
import { ProfileContext } from '../../../Context/Context'
import axios from 'axios'
import apis from '../../../apis'
import { toast } from 'react-toastify'


const SkillInfo = ({studentSkills, skillList}) => {
    const token = localStorage.getItem("token")
    const { change, setChange, studentId} = useContext(ProfileContext)
    const [searchList, setSearchList] = useState([])
    const [skillName, setSkillName] = useState('')

    const skillInputChange = (event) => {
        setSkillName(event.target.value)
        // console.log(skillList);
        setSearchList(skillList.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    const addNewSkill = async () => {
        let skillId = null
        await axios.get(`${apis.getSkillByName}/${skillName}`, { headers: { Authorization: token } })
            .then((res) => {
                if (res.data != '')
                    skillId = res.data.id
            })
            .catch((err) => {
                console.log(err);
            })


        if (skillId == null) {
            await axios.post(apis.registerSkill, { "skillName": skillName }, { headers: { Authorization: token } })
                .then((res) => {
                    skillId = res.data.id;
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Error while addding skill, " + err.code)
                    return;
                })
        }

        await axios.post(apis.registerStudentSkill, { "studentId": studentId, "skillId": skillId }, { headers: { Authorization: token } })
            .then((res) => {
                toast.success("Skill added successfully")
                setSkillName('')
                setChange(!change)
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Server error: " + err.code)
            })

    }

    const deleteStudentSkill = (item) => {
        console.log(item);
        axios.delete(`${apis.deleteStudentSkill}/${item.id}`, { headers: { Authorization: token } }).then((res) => {
            toast.success("Skill removed successfully")
            setChange(!change)
        })
            .catch((err) => {
                toast.error("Error in removing skill")
            })

    }
    return (
        <Grid item xs={12}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>SKILLS</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} xl={8}>
                            <TextField
                                variant="standard"
                                name="skillName"
                                fullWidth
                                value={skillName}
                                onChange={skillInputChange}
                            />
                            {
                                skillName !== '' && searchList.length > 0 ?
                                    searchList.length === 1 && searchList[0].name === skillName ?
                                        <></> :
                                        <List sx={{ boxShadow: 2 }}>
                                            {
                                                searchList.map((item, index) => (
                                                    <ListItem key={index}
                                                        onClick={() => { setSkillName(item.name) }}
                                                        sx={{ cursor: "pointer" }}
                                                    >{item.name}</ListItem>
                                                ))
                                            }
                                        </List> : <></>
                            }
                        </Grid>
                        <Grid item xs={6} sm={6} xl={3}>
                            <Button variant="contained" sx={{ backgroundColor: "#3C0753", ":hover": { bgcolor: "#030637" } }} fullWidth
                                onClick={addNewSkill}
                            >Add Skill</Button>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <List sx={{ display: "flex" }}>
                        {
                            studentSkills.map((item, index) => (
                                <ListItem key={index} sx={{ boxShadow: 10, width: "fit-content", marginX: 1 }}>
                                    {item.skill.name} <CloseIcon sx={{ marginLeft: 2, cursor: "pointer" }}
                                        onClick={() => {
                                            deleteStudentSkill(item)
                                        }} />
                                </ListItem>

                            ))
                        }
                    </List>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SkillInfo