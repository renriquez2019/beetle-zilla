import { useState, useEffect } from "react";
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

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default function Projects() {

    // Sidebar
    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)
    const [role, setRole] = useState(1);
    const [projects, setProjects] = useState([{}]);
    const [isEmpty, setIsEmpty] = useState(true)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    useEffect(() => {

        api.get('/users/getloggedin', config).then((res) => {
            let user_id = res.data.user_id

            setRole(res.data.role)

            api.get('/users/projects', { params : { user_id : user_id}}).then((res) => {
                let proj_ids = res.data
                let i = 0
    
                const newState = [{}]
    
                proj_ids.map(obj => {
                    api.get('/projects/get', { params : { project_id : obj}}).then((res) => {
                        newState[i] = {
                            id: res.data.project_id,
                            title: res.data.title,
                            description: res.data.description,
                            status: res.data.status,
                            users: [],
                            tickets: []
                        }
                        i = i + 1;
                    })
                    .catch((error) => {
                        console.log("error");
                    })
                })

                setTimeout(() => {
                    setProjects(newState)
                    setIsEmpty(false)
                    console.log(projects)
                }, 500)
            })
        })
        .catch((err) => {
            console.log(err.request.responseText)
        })

    }, [])

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects.length) : 0;

    return (
        <div>
            <Header openSidebar={toggleSidebar} />
            <Sidebar toggle={sidebar} navCurrent = "Project"/>

            <div className= {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>Assigned Projects</h1>
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
                            <HeaderTableCell>Project Name</HeaderTableCell>
                            <HeaderTableCell sx = {{ paddingRight: '20em'}} align ="left">Description</HeaderTableCell>
                            <HeaderTableCell align = "center">Status</HeaderTableCell>
                            <HeaderTableCell align = "center" >Actions</HeaderTableCell> 
                        </TableRow>
                    </HeaderTableRow>
                    <TableBody>
                        {projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow
                                key={row.title}
                                size = "small"
                                >
                                <StyledTableCell component="th" scope="row" sx={{fontSize: '20px'}}>{row.title}</StyledTableCell>
                                <StyledTableCell size = "small">{row.description}</StyledTableCell>
                                <StyledTableCell align = "center">{row.status}</StyledTableCell>
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
                            </TableRow>
                        )}
                    </TableBody>
                    <StyledTablePag  
                        count={projects.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10]}
                        labelRowsPerPage={<span>Rows:</span>}
                    />
                </Table>
                <div className= {isEmpty ? "no-items" : "no-items no-items--false"}>
                    <h2>No projects assigned!</h2>
                </div>              
            </div>
        </div>  
    );
}   