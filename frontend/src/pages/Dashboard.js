import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { 
    Table, 
    TableHead,
    TableBody, 
    TableRow, 
    TableCell,
    TableContainer,
    TablePagination,  
    Paper,
    Grid,
    Box
} from "@mui/material"

import {styled} from "@mui/system";
import {
    HeaderTableRow, 
    HeaderTableCell, 
    StyledTableCell, 
    StyledTablePag,
} from '../components/TableConsts'


export default function Dashboard() {

    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)
    const [userpage, setUserPage] = useState(0);
    const [rowsPerUserPage, setRowsPerUserPage] = useState(3);
    const [ticketpage, setTicketPage] = useState(0);
    const [rowsPerTicketPage, setRowsPerTicketPage] = useState(3);

    function createUserData(user, email, role) {
        return { user, email, role };
    }

    function createTicketData(title, type, priority, status) {
        return { title, type, priority, status };
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

                <Grid item xs = {12}  sx = {{paddingBottom: '10px'}}>
                    <Box
                        className="dash-project"
                        component={Paper}
                        sx = {{
                            height: '30rem',
                            border: 2,
                        }}
                    >
                        <h2>Project Name</h2>
                        <h5>Description:</h5>
                        <p>Lorem ipsum dolor sit amet, mea id dicit sententiae, usu id civibus consequuntur, vero congue est no. 
                            Ad feugiat lobortis concludaturque his. 
                            Duo paulo affert voluptatibus at. Sed an quando maiorum definitionem, erant zril mel an.</p>
                        
                        <div className="dash-tables">
                            <Table
                                component={Paper}
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
                                <TableBody>
                                    {userRows.slice(userpage * rowsPerUserPage, userpage * rowsPerUserPage + rowsPerUserPage)
                                    .map((row) => (
                                        <TableRow
                                            key={row.user}
                                            size = "small"
                                            >
                                            <StyledTableCell component="th" scope="row">{row.user}</StyledTableCell>
                                            <StyledTableCell>{row.email}</StyledTableCell>
                                            <StyledTableCell align = "center">{row.role}</StyledTableCell>
                                        </TableRow>
                                    ))}  
                                </TableBody>
                                {emptyUserRows > 0 && (
                                <TableRow
                                    sx={{
                                        height: 45 * emptyUserRows,
                                    }}
                                >
                                    <StyledTableCell />
                                    <StyledTableCell />
                                    <StyledTableCell />
                                </TableRow>
                                )}
                                <StyledTablePag  
                                    count={userRows.length}
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
                                component={Paper}
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
                                            <StyledTableCell component="th" scope="row">{row.title}</StyledTableCell>
                                            <StyledTableCell align = "center">{row.type}</StyledTableCell>
                                            <StyledTableCell align = "center">{row.priority}</StyledTableCell>
                                            <StyledTableCell align = "center">{row.status}</StyledTableCell>
                                        </TableRow>
                                    ))}  
                                </TableBody>
                                {emptyTicketRows > 0 && (
                                <TableRow
                                    sx={{
                                        height: 45 * emptyTicketRows,
                                    }}
                                >
                                    <StyledTableCell />
                                    <StyledTableCell />
                                    <StyledTableCell />
                                    <StyledTableCell />
                                </TableRow>
                                )}
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