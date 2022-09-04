import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { Grid, Paper, Box } from "@mui/material";

import {styled} from "@mui/system";

export default function Dashboard() {

    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)


    
    return (
        <div>
            <Header 
                openSidebar={toggleSidebar} />
            <Sidebar
                toggle={sidebar}
                navCurrent = "Dashboard"/>

            <div className= {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                </div>

                <Grid item xs = {12}>
                    <Box
                        component={Paper}
                        sx = {{
                            height: '25em'
                        }}
                    >
                        <h2>Project Name</h2>
                    </Box>
                </Grid>

            </div>  
        </div>
    );
}