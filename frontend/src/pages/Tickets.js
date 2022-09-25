import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

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

export default function Tickets() {

    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)
    const [role, setRole] = useState(1);
    const [isEmpty, setIsEmpty] = useState()
    const [tickets, setTickets] = useState([{}]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    useEffect(() => {

        api.get('/users/getloggedin', config).then((res) => {
            let user_id = res.data.user_id
            
            console.log(user_id)
            setRole(res.data.role)

            api.get('/users/tickets', { params : { user_id : user_id }}).then((res) => {

                let i = 0
                const newState = [{}]
                
                res.data.map(ticket => {
                    api.get('/projects/get', { params : { project_id : ticket.project_id}}).then((res) => {
                        
                        console.log(i)
                        newState[i] = {
                            id : ticket.ticket_id,
                            title : ticket.title,
                            description : ticket.description,
                            type : ticket.type,
                            priority : ticket.priority,
                            status : ticket.status,
                            project_id : ticket.project_id,
                            project_title : res.data.title,
                            register_date : ticket.register_date
                        }
                        i = i + 1;
                    })
                    .catch((err) => {
                        console.log(err.request.responseText)
                    })
                })

                setTimeout(() => {
                    setTickets(newState)
                    setIsEmpty(false)
                    console.log(tickets)
                }, 500)
            })
            .catch((err) => {
                console.log(err.request.responseText)
                setIsEmpty(true)
            })
        })
        .catch((err) => {
            console.log(err.request.responseText)
            setIsEmpty(true)
        })

    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tickets.length) : 0;

    return (
        <div>
            <Header 
                openSidebar={toggleSidebar} />
            <Sidebar
                toggle={sidebar}
                navCurrent = "Ticket"/>

            <div className= {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>Assigned Tickets</h1>
                    <hr/>
                </div>

                <div className="table-divider"/>
                
                <Table
                    className = {isEmpty ? "no-table" : ""}
                    component={Paper} 
                    size = "small"
                    >
                    <HeaderTableRow>
                        <TableRow size = "small">
                            <HeaderTableCell>Ticket Name</HeaderTableCell>
                            <HeaderTableCell sx = {{ paddingRight: '10em'}} align = "left">Description</HeaderTableCell>
                            <HeaderTableCell >Project</HeaderTableCell>
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
                                <StyledTableCell align = "center">{row.project_title}</StyledTableCell>
                                <StyledTableCell align = "center" sx = {{color : `${getTypeColor(row.type)}`, fontWeight: '800'}}>{getTypeString(row.type)}</StyledTableCell>
                                <StyledTableCell align = "center" sx = {{color : `${getPriorityColor(row.priority)}`, fontWeight: '800'}}>{getPriorityString(row.priority)}</StyledTableCell>
                                <StyledTableCell align = "center" sx = {{color : `${row.status}` ? '#008000' : 'red'}}>{row.status ? "Active" : "Inactive"}</StyledTableCell>
                                <StyledTableCell>
                                    <div className="actions-icon">
                                        <Button variant="contained" size="small">Edit</Button>
                                        <Button variant="contained" size="small" color="error">Delete</Button>
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
                <div className= {isEmpty ? "no-items" : "no-items no-items--false"}>
                    <h2>No tickets assigned!</h2>
                </div>             
            </div>
        </div>
    );
}