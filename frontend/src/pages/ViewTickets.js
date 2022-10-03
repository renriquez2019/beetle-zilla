import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EditTicket from "../components/EditTicket";
import AssignUser from "../components/AssignUser";
import {Link, useLocation} from "react-router-dom"

import { 
    Table, 
    TableBody, 
    TableRow,  
    Paper,
    Button
} from "@mui/material";

import {
    HeaderTableRow, 
    HeaderTableCell, 
    StyledTableCell, 
    StyledTablePag,
} from '../functions/TableStyles';

import {
    getTypeColor,
    getTypeString,
    getPriorityColor,
    getPriorityString
} from "../functions/HashCodes"

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default function ViewTickets() {

    // handleling sidebar
    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)

    const location = useLocation()
    const project = location.state

    const [isEmpty, setIsEmpty] = useState()
    const [isOpen, setIsOpen] = useState()
    const [assignOpen, setAssignOpen] = useState()

    const [tickets, setTickets] = useState([{}])
    const [selectTicket, setSelectTicket] = useState()
    const [users, setUsers] = useState([{}]) 

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tickets.length) : 0;

    function handleAssign() {
        api.get('/projects/getusers', { params : { project_id : project.project_id }}).then((res) => {

            const users = [{}]
            let i = 0

            res.data.map((user) => {
                api.get('/users/get', { params : { user_id : user}}).then((res) => {
                    tickets[i] = {
                        user_id : res.data.user_id,
                        display_name : res.data.display_name
                    }
                    i = i + 1
                })
                .catch((err) => {
                    console.log(err.request.responseText);
                })
            })

            setTimeout(() => {
                setUsers(users)
            }, 500)
        })
        .catch((err) => {
            console.log(err.request.responseText)
        })
    }

    useEffect(() => {

        api.get('/projects/gettickets', { params : { project_id : project.project_id}}).then((res) => {
            
            const newState = [{}]
            let i = 0

            res.data.map((ticket) => {
                api.get('/tickets/get', { params : {ticket_id : ticket}}).then((res) => {
                    console.log(res.data)
                    newState[i] = {
                        ticket_id : res.data.ticket_id,
                        title : res.data.title,
                        description : res.data.description,
                        type : res.data.type,
                        priority : res.data.priority,
                        status : res.data.status,
                        register_date : res.data.register_date
                    }
                    i = i + 1
                })
                .catch((err) => {
                    console.log(err.request.responseText);
                    setIsEmpty(true)
                }) 
            })
            
            setTimeout(() => {
                setTickets(newState)
                setIsEmpty(false)
            }, 800)
        })
        .catch((err) => {
            console.log(err.request.responseText);
            setIsEmpty(true)
        })
        
    }, [])

    console.log(tickets)

    return (
        <div>
            <Header 
                openSidebar={toggleSidebar} />
            <Sidebar
                toggle={sidebar}
                navCurrent = "Project"/>
            
            <div className = {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>{project.title}</h1>
                    <hr/>
                </div>

                <div className="table-divider"/>

                <Table
                    className = {isEmpty ? "no-table" : ""}
                    component={Paper} 
                    size = "small">
                    <HeaderTableRow>
                        <TableRow size = "small">
                            <HeaderTableCell>Ticket Name</HeaderTableCell>
                            <HeaderTableCell sx = {{ paddingRight: '10em'}} align = "left">Description</HeaderTableCell>
                            <HeaderTableCell align = "center">Type</HeaderTableCell>
                            <HeaderTableCell align = "center" >Priority</HeaderTableCell>
                            <HeaderTableCell align = "center" >Status</HeaderTableCell> 
                            <HeaderTableCell align = "center" >Actions</HeaderTableCell>  
                        </TableRow>
                    </HeaderTableRow>
                    <TableBody>
                        {tickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow
                                key={row.title}
                                size = "small"
                                >
                                <StyledTableCell component="th" scope="row" sx={{fontSize: '20px'}}>{row.title}</StyledTableCell>
                                <StyledTableCell>{row.description}</StyledTableCell>
                                <StyledTableCell align = "center" sx = {{color : `${getTypeColor(row.type)}`, fontWeight: '800'}}>{getTypeString(row.type)}</StyledTableCell>
                                <StyledTableCell align = "center" sx = {{color : `${getPriorityColor(row.priority)}`, fontWeight: '800'}}>{getPriorityString(row.priority)}</StyledTableCell>
                                <StyledTableCell align = "center" sx = {{color : `${row.status}` ? '#008000' : 'red'}}>{row.status ? "Active" : "Inactive"}</StyledTableCell>
                                <StyledTableCell>
                                    <div className="actions-icon">
                                        <Button 
                                            variant="contained" 
                                            size="small"
                                            onClick = {() => {
                                                handleAssign()
                                                setSelectTicket(row)
                                                setAssignOpen(true)
                                            }}>
                                            Assign
                                            </Button>
                                        <Button
                                            variant="contained" 
                                            size="small" 
                                            onClick = {() => {
                                                setSelectTicket(row);
                                                setIsOpen(true);
                                            }}>
                                            Edit
                                        </Button>
                                    </div>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow
                                sx={{
                                    height: 65 * emptyRows,
                                }}
                            >
                                <StyledTableCell />
                                <StyledTableCell />
                                <StyledTableCell />
                                <StyledTableCell />
                                <StyledTableCell />
                                <StyledTableCell />
                                <StyledTableCell />
                            </TableRow>
                        )}
                    </TableBody>
                    <StyledTablePag  
                        count={tickets.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10]}
                        labelRowsPerPage={<span>Rows:</span>}
                    />
                </Table>
                
                <EditTicket
                    open = {isOpen}
                    onClose = {() => setIsOpen(false)}
                    ticket = {selectTicket}>
                </EditTicket>

                <AssignUser
                    open = {assignOpen}
                    onClose = {() => setAssignOpen(false)}
                    users = {users}
                    ticket = {selectTicket}>
                </AssignUser>
                
                <div className= {isEmpty ? "no-items" : "no-items no-items--false"}>
                    <h2>No tickets assigned!</h2>
                </div>  

            </div>
        </div>
    );
}