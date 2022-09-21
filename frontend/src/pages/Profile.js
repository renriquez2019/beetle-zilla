import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getRoleString } from "../functions/HashCodes"
import blue from "../img/blue-user-icon.png"
import yellow from "../img/yellow-user-icon.png"
import red from "../img/red-user-icon.png"

import { useEffect, useState } from "react";
import {
    Grid, 
    Box, 
    Paper,
    Button,
} from '@mui/material';


import bug from '../img/bug.png'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default function Profile() {

    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)

    const [currentUser, setCurrentUser] = useState({
        display_name: "DEMO",
        email: "demo@mail.com",
        phone: '555-555-5555',
        role: 1
    })
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    function userIcon()  {
        switch (currentUser.role) {
            case 1:
                return blue;
            case 2:
                return yellow;
            case 3:
                return red;
            break;
            default:
        }
    }

    useEffect(() => {

        api.get('/users/getloggedin', config).then((res) => {
            console.log(res.data)
            setCurrentUser(res.data)
        })
        .catch((err) => {
            console.log("no user found")
        })

    }, [])


    return (
        <div>
            <Header 
                openSidebar={toggleSidebar} />
            <Sidebar
                toggle={sidebar}
                navCurrent = "Profile"/>
            
            <div className= {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>User Profile</h1>
                </div>

                <Grid container spacing = {2} className = "profile">
                    <Grid item xs = {4}>
                        <Box
                            component = {Paper}
                            sx = {{
                                backgroundColor: 'white',
                                height: '20rem',
                                border: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <img src= {userIcon()}/>
                            <h2>{currentUser.display_name}</h2>
                            <h5>Role: {getRoleString(currentUser.role)}</h5>
                        </Box>
                        
                        <Button
                            className="profile-btn"
                            variant="contained"
                            size="large">
                            Edit Profile
                        </Button>
                    </Grid>
                    <Grid item xs = {8}>
                        <Box
                            component = {Paper}
                            sx = {{
                                backgroundColor: 'white',
                                height: '20rem',
                                marginLeft: 4,
                                border: 2, 
                            }}
                        >
                            <div className="profile-overview">
                                <h2>Overview</h2>
                                <h4>About</h4>
                                <p>Lorem ipsum dolor sit amet, mea id dicit sententiae, usu id civibus consequuntur, vero congue est no. 
                                Ad feugiat lobortis concludaturque his. 
                                Duo paulo affert voluptatibus at. Sed an quando maiorum definitionem, erant zril mel an.</p>
                                <h4>Profile Details</h4>

                                <div className="overview-body">
                                    <div className="overview-row">
                                        <label>Display Name:</label>
                                        <label>Role:</label>
                                        <label>Phone:</label>
                                        <label>Email:</label>
                                        
                                    </div>
                                    <div className="overview-row">
                                        <span>{currentUser.display_name}</span>
                                        <span>{getRoleString(currentUser.role)}</span>
                                        <span>{currentUser.phone}</span>
                                        <span>{currentUser.email}</span>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Grid>
                </Grid>

                
            </div>

        </div>
    );
}