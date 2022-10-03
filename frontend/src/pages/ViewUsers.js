import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Link, useLocation} from "react-router-dom";
import AssignUser from "../components/AssignUser";

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
    getRoleColor,
    getRoleString
} from "../functions/HashCodes"

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})


export default function ViewUsers() {

    // handleling sidebar
    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)

    const location = useLocation()
    const project = location.state

    const [isEmpty, setIsEmpty] = useState()
    const [isOpen, setIsOpen] = useState()

    const [users, setUsers] = useState([{}])
    const [selectUser, setSelectUser] = useState()
    const [tickets, setTickets] = useState([{}])

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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;


    function handleAssign() {
        api.get('/projects/gettickets', { params : { project_id : project.project_id }}).then((res) => {

            const tickets = [{}]
            let i = 0

            res.data.map((ticket) => {
                api.get('/tickets/get', { params : { ticket_id : ticket}}).then((res) => {
                    tickets[i] = {
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
                })
            })

            setTimeout(() => {
                setTickets(tickets)
            }, 500)
        })
        .catch((err) => {
            console.log(err.request.responseText)
        })
    }

    useEffect(() => {

        api.get('/projects/getusers', { params : { project_id : project.project_id }}).then((res) => {

            const newState = [{}]
            let i = 0

            res.data.map((user) => {
                api.get('/users/get', { params : { user_id : user }}).then((res) => {
                    newState[i] = {
                        user_id : res.data.user_id,
                        display_name : res.data.display_name,
                        email : res.data.email,
                        role : res.data.role
                    }
                    i = i + 1
                })
                .catch((err) => {
                    console.log(err.request.responseText);
                    setIsEmpty(true)
                })
            })

            setTimeout(() => {
                setUsers(newState)
                setIsEmpty(false)
            }, 800)
        })
        .catch((err) => {
            console.log(err.request.responseText);
            setIsEmpty(true)
        })

    }, [])

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
                    className = {isEmpty ? "non-table" : ""}
                    component = {Paper}            
                    size = "small">
                    <HeaderTableRow>
                        <TableRow size = "small">
                            <HeaderTableCell>User</HeaderTableCell>
                            <HeaderTableCell>Email</HeaderTableCell>
                            <HeaderTableCell align = "center">Role</HeaderTableCell>
                            <HeaderTableCell align = "center" >Actions</HeaderTableCell>
                        </TableRow>
                    </HeaderTableRow>
                    <TableBody >
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow
                                key={row.user_id}
                                size = "small"
                                >
                                <StyledTableCell scope="row">{row.display_name}</StyledTableCell>
                                <StyledTableCell>{row.email}</StyledTableCell>
                                <StyledTableCell align = "center" sx= {{color: `${getRoleColor(row.role)}`, fontWeight: '800'}}>{getRoleString(row.role)}</StyledTableCell>
                                <StyledTableCell>
                                    <div className="actions-icon">
                                        <Button variant="contained" size="small" color="error">Remove</Button>
                                    </div>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                        <TableRow
                            sx={{
                                height: 30 * emptyRows,
                            }}
                        >
                            <StyledTableCell />
                            <StyledTableCell />
                            <StyledTableCell />
                        </TableRow>
                        )}  
                    </TableBody>
                    <StyledTablePag
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[4]}
                        labelRowsPerPage={<span>Rows:</span>}
                        size = "small"
                    />
                </Table>

              

                <div className= {isEmpty ? "no-items" : "no-items no-items--false"}>
                    <h2>No users assigned!</h2>
                </div>
            </div>
        </div>
    )
}