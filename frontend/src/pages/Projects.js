import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AssignProject from "../components/AssignProject";
import {Link} from "react-router-dom"

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

    //set Sidebar
    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)

    // role for permissions
    const [role, setRole] = useState(1);

    // main projects
    const [projects, setProjects] = useState([{}]);
    const [selectProject, setSelectProject] = useState({})
    const [users, setUsers] = useState([{}]) 

    // if user has no assigned projects
    const [isEmpty, setIsEmpty] = useState()
    const [assignOpen, setAssignOpen] = useState()

    // for table pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    // token configuration
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

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects.length) : 0;


    function handleAssign(project) {
        api.get('/projects/getusers', { params : { project_id : project.project_id}}).then((res) => {

            const assigned = res.data;
            const users = [{}]
            let i = 0

            api.get('/users/getall').then((res) => {
                res.data.map((user) => {
                    if (!assigned.includes(user.user_id)) {
                        users[i] = {
                            user_id : user.user_id,
                            display_name : user.display_name,
                        }
                        i = i + 1
                    }
                })
            })
            .catch((err) => {
                console.log(err.request.responseText);
            })
            setTimeout(() => {
                setUsers(users)
            }, 500)
        })
        .catch((err) => {
            console.log(err.request.responseText);

            const users = [{}]
            let i = 0

            api.get('/users/getall').then((res) => {
                res.data.map((user) => {
                    users[i] = {
                        user_id : user.user_id,
                        display_name : user.display_name,
                    }
                    i = i + 1
                })
            })
            .catch((err) => {
                console.log(err.request.responseText);
            })

            setTimeout(() => {
                setUsers(users)
            }, 500)
        })
    }
    
    // fetches projects assigned to user
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
                            project_id: res.data.project_id,
                            title: res.data.title,
                            description: res.data.description,
                            status: res.data.status
                        }
                        i = i + 1;
                    })
                    .catch((error) => {
                        console.log("error");
                        setIsEmpty(true)
                    })
                })

                setTimeout(() => {
                    setProjects(newState)
                    setIsEmpty(false)
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
                            <HeaderTableCell align = "center" className = {role === 1 ? "" : ""}>Actions</HeaderTableCell> 
                        </TableRow>
                    </HeaderTableRow>
                    <TableBody>
                        {projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow
                                key={row.project_id}
                                size = "small"
                                >
                                <StyledTableCell component="th" scope="row" sx={{fontSize: '20px'}}>{row.title}</StyledTableCell>
                                <StyledTableCell size = "small">{row.description}</StyledTableCell>
                                <StyledTableCell align = "center" sx = {{color : `${row.status}` ? '#008000' : 'red'}}>{row.status ? "Active" : "Inactive"}</StyledTableCell>
                                <StyledTableCell>
                                    <div className="actions-icon">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick = {() => {
                                                handleAssign(row);
                                                setSelectProject(row);
                                                setAssignOpen(true)
                                            }}>
                                            Assign User
                                        </Button>

                                        <Link to = "/viewusers" state = {{project_id: row.project_id, title: row.title, role: role}}>
                                            <Button variant="contained">Users</Button>
                                        </Link>

                                        <Link to = "/viewtickets" state = {{project_id: row.project_id, title: row.title, role: role}}>
                                            <Button variant="contained">Tickets</Button>
                                        </Link>
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

                <AssignProject
                    open = {assignOpen}
                    onClose = {() => setAssignOpen(false)}
                    users = {users}
                    project = {selectProject}>
                </AssignProject>
                
                <div className= {isEmpty ? "no-items" : "no-items no-items--false"}>
                    <h2>No projects assigned!</h2>
                </div>   

            </div>
        </div>  
    );
}   