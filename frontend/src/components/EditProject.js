import ReactDom from 'react-dom'
import { useState, useEffect } from 'react'




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
} from '../functions/TableStyles'

import { 
    Button, 
    IconButton,
    Table, 
    TableBody, 
    TableRow, 
    Paper
} from '@mui/material'
import {BsX} from 'react-icons/bs'

import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default function EditProject ({open, onClose, project}) {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [ticketpage, setTicketPage] = useState(0);
    const [rowsPerTicketPage, setRowsPerTicketPage] = useState(4);
    const [tickets, setTickets] = useState([{}])


    const handleTicketChangePage = (event, newPage) => {
        setTicketPage(newPage);
    }
    const handleTicketChangeRowsPerPage = (event) => {
        setRowsPerTicketPage(parseInt(event.targe.value, 10));
        setTicketPage(0)
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        
    }

    console.log(project)

    useEffect(() => {
        api.get('/projects/gettickets', { params : {project_id : project.project_id}}).then((res) => {
            
            const newState = [{}]
            let i = 0;

            res.data.map((ticket) => {
                api.get('/tickets/get', { params : { ticket_id : ticket}}).then((res) => {
                    newState[i] = {
                        ticket_id : ticket.ticket_id,
                        title : ticket.title,
                        description : ticket.description,
                        type : ticket.type,
                        priority : ticket.priority,
                        status : ticket.status
                    }
                })
                i = i + 1
                .catch((err) => {
                    console.log(err.request.responseText);
                })
            })

            setTimeout(() => {
                setTickets(newState)
                console.log(tickets)
            }, 800)
        })
        .catch((err) => {
            console.log(err.request.responseText)
        })

    }, [])

    if (!open) return null

    const emptyTicketRows =
        ticketpage > 0 ? Math.max(0, (1 + ticketpage) * rowsPerTicketPage - tickets.length) : 0;

    return ReactDom.createPortal(
        <>
            <div className="portal-background"/>
            <div className='project-edit'>

                <div className='profile-edit-header'>
                    <h3>Edit Project</h3>
                    <IconButton aria-label="delete" size="large" sx={{color: 'red'}} onClick={onClose}>
                        <BsX />
                    </IconButton>
                </div>

                <div className='profile-edit-body'>

                    <div className="profile-form">
                        <label>Description:</label>
                        <input
                            type="text"
                            id="desc"
                            name="desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={project.description}
                        />
                    </div>

                    <div className='profile-form'>
                        <label>Tickets:</label>
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
                                {tickets.slice(ticketpage * rowsPerTicketPage, ticketpage * rowsPerTicketPage + rowsPerTicketPage)
                                .map((row) => (
                                    <TableRow
                                        key={row.ticket_id}
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
                                count={tickets.length}
                                rowsPerPage={rowsPerTicketPage}
                                page={ticketpage}
                                onPageChange={handleTicketChangePage}
                                onRowsPerPageChange={handleTicketChangeRowsPerPage}
                                rowsPerPageOptions={[4]}
                                labelRowsPerPage={<span>Rows:</span>}
                            />
                        </Table>

                    </div>

                </div>

                <div className= "profile-edit-footer">
                    <Button 
                        type ="submit"
                        variant= "contained"
                        color="success"
                        onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}