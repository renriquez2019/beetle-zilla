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

    const [userRows, setuserRows] = useState([]);
    const [userpage, setUserPage] = useState(0);
    const [rowsPerUserPage, setRowsPerUserPage] = useState(4);
    const [ticketpage, setTicketPage] = useState(0);
    const [rowsPerTicketPage, setRowsPerTicketPage] = useState(4);

    
    
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
                api.get('/projects/getusers',  { params : { project_id : obj.id}}).then((res) => {
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
                api.get('/projects/gettickets',  { params : { project_id : obj.id }}).then((res) => {
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
            
            console.log(newState[visible].title)
            setActiveProjects(newState);


        })
        .then(

        )
        .catch((err) => {
            console.log(err.request.responseText);
        })

        return () => {
            
        }

    }, [])
    
    const handleLeftClick = (e) => {
        if (visible != 0)
            setVisible(visible-1)
    }

    const handleRightClick = (e) => {
        if (visible < (activeProjects.length - 1))
            setVisible(visible+1)
    }

    function createUserData(user, email, role) {
        return { user, email, role };
    }

    function createTicketData(title, type, priority, status) {
        return { title, type, priority, status };
    }


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
                            <h3>Users:</h3>
                            <h3>Tickets:</h3>
                        </div>

                        <div className="dash-tables">
                            <Table
                                
                                size = "small"
                                sx = {{
                                    maxHeight: '20rem',
                                    maxWidth: '48%',
                                }}>
                                <HeaderTableRow>
                                    <TableRow size = "small">
                                        <HeaderTableCell>User</HeaderTableCell>
                                        <HeaderTableCell>Email</HeaderTableCell>
                                        <HeaderTableCell align = "center">Role</HeaderTableCell>
                                    </TableRow>
                                </HeaderTableRow>
                                <TableBody >
                                    {activeProjects[visible].users.length != 0 ? activeProjects[visible].users.slice(userpage * rowsPerUserPage, userpage * rowsPerUserPage + rowsPerUserPage)
                                    .map((row) => (
                                        <TableRow
                                            key={row.display_name}
                                            size = "small"
                                            >
                                            <StyledTableCell scope="row">{row.display_name}</StyledTableCell>
                                            <StyledTableCell>{row.email}</StyledTableCell>
                                            <StyledTableCell align = "center">{row.role}</StyledTableCell>
                                        </TableRow>
                                    )) : console.log("sdkldsklds")}
                                    {emptyUserRows > 0 && (
                                    <TableRow
                                        sx={{
                                            height: 30 * emptyUserRows,
                                        }}
                                    >
                                        <StyledTableCell />
                                        <StyledTableCell />
                                        <StyledTableCell />
                                    </TableRow>
                                    )}  
                                </TableBody>
                                
                                <StyledTablePag
                                    count={activeProjects[visible].users.length}
                                    rowsPerPage={rowsPerUserPage}
                                    page={userpage}
                                    onPageChange={handleUserChangePage}
                                    onRowsPerPageChange={handleUserChangeRowsPerPage}
                                    rowsPerPageOptions={[4]}
                                    labelRowsPerPage={<span>Rows:</span>}
                                    size = "small"
                                />
                            </Table>
                            <Table 
                                size = "small"
                                >
                                <HeaderTableRow>
                                    <TableRow size = "small">
                                        <HeaderTableCell>Title</HeaderTableCell>
                                        <HeaderTableCell align = "center">Type</HeaderTableCell>
                                        <HeaderTableCell align = "center">Priority</HeaderTableCell>
                                        <HeaderTableCell align = "center">Status</HeaderTableCell>
                                    </TableRow>
                                </HeaderTableRow>
                                <TableBody>
                                    {ticketRows.slice(ticketpage * rowsPerTicketPage, ticketpage * rowsPerTicketPage + rowsPerTicketPage)
                                    .map((row) => (
                                        <TableRow
                                            key={row.user}
                                            size = "small"
                                            >
                                            <StyledTableCell scope="row">{row.title}</StyledTableCell>
                                            <StyledTableCell align = "center">{row.type}</StyledTableCell>
                                            <StyledTableCell align = "center">{row.priority}</StyledTableCell>
                                            <StyledTableCell align = "center">{row.status}</StyledTableCell>
                                        </TableRow>
                                    ))}
                                    {emptyTicketRows > 0 && (
                                    <TableRow
                                        sx={{
                                            height: 30 * emptyTicketRows,
                                        }}
                                    >
                                        <StyledTableCell />
                                        <StyledTableCell />
                                        <StyledTableCell />
                                        <StyledTableCell />
                                    </TableRow>
                                    )}  
                                </TableBody>
                                
                                <StyledTablePag
                                    count={ticketRows.length}
                                    rowsPerPage={rowsPerTicketPage}
                                    page={ticketpage}
                                    onPageChange={handleTicketChangePage}
                                    onRowsPerPageChange={handleTicketChangeRowsPerPage}
                                    rowsPerPageOptions={[4]}
                                    labelRowsPerPage={<span>Rows:</span>}
                                />
                            </Table>
                         
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