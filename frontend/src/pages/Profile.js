import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
    Grid, 
    Box, 
    Paper,
    Button,
} from '@mui/material'
import bug from '../img/bug.png'

export default function Profile() {

    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)

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

                <Grid container spacing = {2} className = "profile-section">
                    <Grid item xs = {4}>
                        <Box
                            component = {Paper}
                            sx = {{
                                backgroundColor: 'white',
                                height: '20rem',
                                border: 2,
                            }}
                        >
                            <img src ={bug}/>
                            <h2>Current User</h2>
                            <h3>Role: CurentRole</h3>
                        </Box>

                        <Button
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
                                height: '30rem',
                                marginLeft: 5,
                                border: 2,
                            }}
                        >
                            <h2>Overview</h2>
                            <h5>About</h5>
                            <p>Lorem ipsum dolor sit amet, mea id dicit sententiae, usu id civibus consequuntur, vero congue est no. 
                            Ad feugiat lobortis concludaturque his. 
                            Duo paulo affert voluptatibus at. Sed an quando maiorum definitionem, erant zril mel an.</p>
                            <h5>Profile Details</h5>

                            <div className="row">
                                <span>Display Name</span>
                                <span>Ryan Enriquez</span>
                            </div>
                            <div className="row">
                                <span>Role</span>
                                <span>Admin</span>
                            </div>
                            <div className="row">
                                <span>Phone</span>
                                <span>561-555-3232</span>
                            </div>
                            <div className="row">
                                <span>Email</span>
                                <span>ryrydddde@gmail.com</span>
                            </div>
                        </Box>
                    </Grid>
                </Grid>

                
            </div>

        </div>
    );
}