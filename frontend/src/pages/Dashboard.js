import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import {
    BsFillArrowLeftSquareFill,
    BsFillArrowRightSquareFill
} from 'react-icons/bs'

import { 
    IconButton,
    Table, 
    TableBody, 
    TableRow, 
    Paper,
    Grid,
    Box,
    Icon
} from "@mui/material"

import {
    HeaderTableRow, 
    HeaderTableCell, 
    StyledTableCell, 
    StyledTablePag,
} from '../components/TableConsts'
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default function Dashboard() {

    // Sidebar
    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar);

    // All projects retrieved HTTP GET
    const [activeProjects, setActiveProjects] = useState([{
        id: 0,
        title: '',
        description: '',
        users: [{
            display_name: '',
            email: '',
            role: ''
        }],
        tickets: [{
            title: '',
            type: -1,
            priority: -1,
            status: -1
        }]
    }]);
    // Project visible on dashboard
    const [visible, setVisible] = useState(0)

    // Page consts for the tables
    const [userpage, setUserPage] = useState(0);
    const [rowsPerUserPage, setRowsPerUserPage] = useState(4);
    const [ticketpage, setTicketPage] = useState(0);
    const [rowsPerTicketPage, setRowsPerTicketPage] = useState(4);

    function createUserData(user, email, role) {
        return { user, email, role };
    }

    function createTicketData(title, type, priority, status) {
        return { title, type, priority, status };
    }

    
    // hook on for filling projects
    useEffect(() => { 

        api.get('/projects/active', {responseType: 'json'}).then((res) => {
            const temp = res.data;

            const newState = temp.map(obj => {
                return {
                    id: obj.project_id,
                    title: obj.title,
                    description: obj.description,
                    users: [],
                    tickets: []
                }
            })

            // mapping to user
            newState.map(obj => {
                api.get('/projects/getusers', { params : { project_id : obj.id}}).then((res) => {
                    let user_ids = res.data;

                    user_ids.map((user) => {
                        api.get('/users/get', { params : { user_id : user}}).then((res) => {
                            obj.users.push(res.data)
                        })
                        .catch((err) => {
                            console.log(err.request.responseText);
                        })
                    })
                })
                .catch((err) => {
                    console.log(err.request.responseText);
                })
            })

            // mapping to tickets
            newState.map(obj => {
                api.get('/projects/gettickets', { params : { project_id : obj.id }}).then((res) => {
                    let ticket_ids = res.data;

                    ticket_ids.map((ticket) => {
                        api.get('/tickets/get', { params : { ticket_id : ticket}}).then((res) => {
                            obj.tickets.push(res.data)
                        })
                        .catch((err) => {
                            console.log(err.request.responseText);
                        })
                    })
                })
                .catch((err) => {
                    console.log(err.request.responseText);
                })
            })

            setActiveProjects(newState);
            setVisible(0);
        })
        .catch((err) => {
            console.log(err.request.responseText);
        })

        // set first project to be visible on dashboard
        

    }, [])
    
    const handleLeftClick = (e) => {
        if (visible != 0)
            setVisible(visible-1)
    }

    const handleRightClick = (e) => {
        if (visible < (activeProjects.length - 1))
            setVisible(visible+1)
    }

    const userRows = [
        createUserData('Ryan', 'ryandenriquez@gmail.com', 'Admin'),
        createUserData('Daniel', 'ryandenriquez@gmail.com', 'Admin'),
        createUserData('ff', 'ryandenriquez@gmail.com', 'Admin'),
        createUserData('dd', 'ryandenriquez@gmail.com', 'Admin'),
        createUserData('ddd', 'ryandenriquez@gmail.com', 'Admin'),
        
    ];
    const ticketRows = [
        createTicketData('Ticket#1', 'Bug', 'High', 1),
        createTicketData('Ticket#2', 'Bug', 'High', 1),
        createTicketData('Ticket#3', 'Bug', 'High', 1),
        createTicketData('Ticket#4', 'Bug', 'High', 1),
        createTicketData('Ticket#5', 'Bug', 'High', 1),
        createTicketData('Ticket#6', 'Bug', 'High', 1),
    ]

    

    const handleUserChangePage = (event, newPage) => {
        setUserPage(newPage);
    }
    const handleTicketChangePage = (event, newPage) => {
        setTicketPage(newPage);
    }
    
    const handleUserChangeRowsPerPage = (event) => {
        setRowsPerUserPage(parseInt(event.targe.value, 10));
    }
    const handleTicketChangeRowsPerPage = (event) => {
        setRowsPerTicketPage(parseInt(event.targe.value, 10));
    }

    const emptyUserRows =
        userpage > 0 ? Math.max(0, (1 + userpage) * rowsPerUserPage - userRows.length) : 0; 
    const emptyTicketRows =
        ticketpage > 0 ? Math.max(0, (1 + ticketpage) * rowsPerTicketPage - ticketRows.length) : 0;

    console.log("visible", visible);

    return (
        <div>
            <Header 
                openSidebar={toggleSidebar} />
            <Sidebar
                toggle={sidebar}
                navCurrent = "Dashboard"/>

            <div className= {sidebar ? "main" : "main main-side"}>
                
                <div className="dash-title">
                    <h1>All Active Projects</h1>
                    
                    <div>
                        <IconButton size = "large" onClick={handleLeftClick}>
                            <BsFillArrowLeftSquareFill className= {(visible == 0) ? "dash-btn" : "dash-btn-open"}/>
                        </IconButton>
                        
                        <IconButton size = "large" onClick={handleRightClick}>
                            <BsFillArrowRightSquareFill className= {(visible >= (activeProjects.length-1)) ? "dash-btn" : "dash-btn-open"}/>
                        </IconButton>
                    </div>
                    
                </div>

                <Grid item xs = {12}  sx = {{paddingBottom: '10px'}}>
                    <Box
                        className="dash-project"
                        component={Paper}
                        sx = {{
                            height: '30rem',
                            border: 2,
                        }}
                    >   
        
                        <h2>{activeProjects[visible] ? activeProjects[visible].title : ' '}</h2>
                        
                        <div className="dash-desc">
                            <h4>Description:</h4>
                            <p>{activeProjects[visible] ? activeProjects[visible].description : ' '}</p>
                        </div>

                        <div className="dash-tables-titles">
                            <h3>Users</h3>
                            <h3>Tickets</h3>
                        </div>
                        
                        
                        <div className="dash-tables">
                            
                         
                        </div>
                    </Box>
                </Grid>

                <Grid container spacing = {2}>
                    <Grid item xs = {4}>
                        <Box
                            component={Paper}
                            sx = {{
                                backgroundColor: 'white',
                                height: '15rem'
                            }}
                        >
                            bruh
                        </Box>
                    </Grid>
                    <Grid item xs = {4}>
                        <Box
                            component={Paper}
                            sx = {{
                                backgroundColor: 'white',
                                height: '15rem'
                            }}
                        >
                            bruh
                        </Box>
                    </Grid>
                    <Grid item xs = {4}>
                        <Box
                            component={Paper}
                            sx = {{
                                backgroundColor: 'white',
                                height: '15rem'
                            }}
                        >
                            bruh
                        </Box>
                    </Grid>
                </Grid>

            </div>  
        </div>
    );
}