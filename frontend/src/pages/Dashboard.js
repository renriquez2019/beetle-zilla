import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { 
    Table, 
    TableBody, 
    TableRow, 
    Paper,
    Grid,
    Box
} from "@mui/material"

import {
    HeaderTableRow, 
    HeaderTableCell, 
    StyledTableCell, 
    StyledTablePag,
} from '../components/TableConsts'
import axios from "axios";
import { setUseProxies } from "immer";

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default function Dashboard() {

    // Sidebar
    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar);

    // Actual data retrieved from HTTP GET
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
   // const [users, setUsers] = useState([]);
   // const [tickets, setTickets] = useState([]);

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

    
    // hook on startup
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
                    })
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
                    })
                })
            })

            setActiveProjects(newState);
        })

        console.log(activeProjects);
        //console.log(activeProjects)
        // note make GET body to query on server
    }, [])
    
    
    console.log(activeProjects);
    
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
                        <h2>{activeProjects[2] ? activeProjects[2].title : ' '}</h2>
                        <div>
                            <h5>Description:</h5>
                            <p>{activeProjects[2] ? activeProjects[2].description : ' '}</p>
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