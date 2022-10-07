import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { 
    getRoleString,
    getRoleColor,
    getTypeString,
    getTypeColor,
    getPriorityString,
    getPriorityColor
} from "../functions/HashCodes";
import {
    HeaderTableRow, 
    HeaderTableCell, 
    StyledTableCell, 
    StyledTablePag,
} from '../functions/TableStyles';

import { useState, useEffect } from "react";
import {PieChart, Pie, Legend, Cell} from 'recharts'
import {
    BsFillArrowLeftSquareFill,
    BsFillArrowRightSquareFill
} from 'react-icons/bs';
import { 
    IconButton,
    Table, 
    TableBody, 
    TableRow, 
    Paper,
    Grid,
    Box,
} from "@mui/material";
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

    // handling table pagination
    const handleUserChangePage = (event, newPage) => {
        setUserPage(newPage);
    }
    const handleTicketChangePage = (event, newPage) => {
        setTicketPage(newPage);
    }
    const handleUserChangeRowsPerPage = (event) => {
        setRowsPerUserPage(parseInt(event.targe.value, 10));
        setUserPage(0);
    }
    const handleTicketChangeRowsPerPage = (event) => {
        setRowsPerTicketPage(parseInt(event.targe.value, 10));
        setTicketPage(0)
    }

    // calculate number of empty rows per table
    const emptyUserRows =
        userpage > 0 ? Math.max(0, (1 + userpage) * rowsPerUserPage - activeProjects[visible].users.length) : 0; 
    const emptyTicketRows =
        ticketpage > 0 ? Math.max(0, (1 + ticketpage) * rowsPerTicketPage - activeProjects[visible].tickets.length) : 0;
    
    // handle arrow clicks
    const handleLeftClick = (e) => {
        if (visible !== 0) {
            setVisible(prev=>prev-1)
            setUserPage(0)
            setTicketPage(0)
        }     
    }
    const handleRightClick = (e) => {
        if (visible < (activeProjects.length - 1)) {
            setVisible(prev=>prev+1)
            setUserPage(0)
            setTicketPage(0)
        }
    }
    
    // functions for pie charts
    function getRoleCount()  {

        let dev = 0;
        let manager = 0;
        let admin = 0;

        for (let i = 0; i < activeProjects[visible].users.length; i++) {

            switch (activeProjects[visible].users[i].role) {
                case 1:
                    dev = dev + 1;
                    break;
                case 2:
                    manager = manager + 1;
                    break;
                case 3:
                    admin = admin + 1;
                    break;
                default:
            }
        }

        return [
            {role: "Developer", count: dev}, 
            {role: "Manager", count: manager},
            {role: "Admin", count: admin}
        ]
    }
    function getTicketPriorities() {
        let veryhigh = 0;
        let high = 0;
        let medium = 0;
        let low = 0;

        for (let i = 0; i < activeProjects[visible].tickets.length; i++) {

            switch (activeProjects[visible].tickets[i].priority) {
                case 1:
                    veryhigh = veryhigh + 1;
                    break;
                case 2:
                    high = high + 1;
                    break;
                case 3:
                    medium = medium + 1;
                    break;
                case 4:
                    low = low +1;
                    break;
                default:
            }
        }

        return [
            {priority: "Very High", count: veryhigh}, 
            {priority: "High", count: high},
            {priority: "Medium", count: medium},
            {priority: "Low", count: low}
        ]
    }
    function getTicketTypes() {
        let bug = 0;
        let issue = 0;
        let feature = 0;

        for (let i = 0; i < activeProjects[visible].tickets.length; i++) {

            switch (activeProjects[visible].tickets[i].type) {
                case 1:
                    bug = bug + 1;
                    break;
                case 2:
                    issue = issue + 1;
                    break;
                case 3:
                    feature = feature + 1;
                    break;
                default:
            }
        }

        return [
            {type: "Bug", count: bug}, 
            {type: "Issue", count: issue},
            {type: "Feature", count: feature},
        ]
        
    }

    // hook on for filling projects tables
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
            
            // getting user data
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

            // getting ticket data
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
            // set to projects array
            setTimeout(() => {
                setActiveProjects(newState)
            }, 1500)
        })
        .catch((err) => {
            console.log(err.request.responseText);
        })

    }, [])

    return (
        <div>
            <Header 
                openSidebar={toggleSidebar}/>
            <Sidebar
                toggle={sidebar}
                navCurrent = "Dashboard"/>

            <div className= {sidebar ? "main" : "main main-side"}>
                
                <div className="dash-title">
                    <h1>All Active Projects</h1>
                    
                    <div> {/*Handle the change in project*/}
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
                        }}>   

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
                                    {activeProjects[visible].users.slice(userpage * rowsPerUserPage, userpage * rowsPerUserPage + rowsPerUserPage)
                                    .map((row) => (
                                        <TableRow
                                            key={row.email}
                                            size = "small"
                                            >
                                            <StyledTableCell scope="row">{row.display_name}</StyledTableCell>
                                            <StyledTableCell>{row.email}</StyledTableCell>
                                            <StyledTableCell align = "center" sx= {{color: `${getRoleColor(row.role)}`, fontWeight: '800'}}>{getRoleString(row.role)}</StyledTableCell>
                                        </TableRow>
                                    ))}
                                    {console.log(emptyUserRows)}
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
                                    {activeProjects[visible].tickets.slice(ticketpage * rowsPerTicketPage, ticketpage * rowsPerTicketPage + rowsPerTicketPage)
                                    .map((row) => (
                                        <TableRow
                                            key={row.user}
                                            size = "small"
                                            >
                                            <StyledTableCell scope="row">{row.title}</StyledTableCell>
                                            <StyledTableCell align = "center" sx= {{color: `${getTypeColor(row.type)}`, fontWeight: '800'}}>{getTypeString(row.type)}</StyledTableCell>
                                            <StyledTableCell align = "center" sx= {{color: `${getPriorityColor(row.priority)}`, fontWeight: '800'}}>{getPriorityString(row.priority)}</StyledTableCell>
                                            <StyledTableCell align = "center" sx = {{color : `${row.status}` ? '#008000' : 'red'}}>{row.status ? "Active" : "Inactive"}</StyledTableCell>
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
                                    count={activeProjects[visible].tickets.length}
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
                        <h4>User Roles:</h4>
                        <PieChart height = {250} width = {500} className = "pie-container">
                            <Legend layout="vertical" verticalAlign="middle" align="left"/>
                            <Pie data={getRoleCount()} nameKey='role' dataKey='count' outerRadius={100} >
                                <Cell fill="#012970"/>
                                <Cell fill="#FFA400"/>
                                <Cell fill="#ff3333"/>
                            </Pie>
                        </PieChart>
                        
                    </Grid>
                    <Grid item xs = {4}>
                        <h4>Ticket Types:</h4>
                        <PieChart height = {250} width = {500} className = "pie-container">
                            <Legend layout="vertical" verticalAlign="middle" align="left"/>
                            <Pie data={getTicketTypes()}  nameKey='type' dataKey='count' outerRadius={100}>
                                <Cell fill="#012970"/>
                                <Cell fill="#FFA400"/>
                                <Cell fill="#ff3333"/>
                            </Pie>
                        </PieChart>
                    </Grid>
                    <Grid item xs = {4}>
                        <h4>Ticket Priorities:</h4>
                        <PieChart height = {250} width = {500} className = "pie-container">
                            <Legend layout="vertical" verticalAlign="middle" align="left"/>
                            <Pie data={getTicketPriorities()} nameKey='priority'  dataKey='count' outerRadius={100}>
                                <Cell fill="#012970"/>
                                <Cell fill="#FFA400"/>
                                <Cell fill="#ff3333"/>
                                <Cell fill="#5E9129"/>
                            </Pie>
                        </PieChart>
                    </Grid>
                </Grid>

            </div>  
        </div>
    );
}