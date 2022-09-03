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
    Button
} from "@mui/material"

import {BsFillDashSquareFill, BsFillTrashFill} from 'react-icons/bs'
import { styled } from '@mui/system'


export default function Projects() {

    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);


    function createData(name, desc, numtickets, numusers) {
        return { name, desc, numtickets, numusers};
    }

    const rows = [
        createData('Demo Project 1', "This is project 1", 0, 1),
        createData('Demo Project 2', "This is project 2", 1, 0),
        createData('Demo Project 3', "This is project 3", 1, 0),
        createData('Demo Project 4', "This is project 4", 1, 0),
        createData('Demo Project 5', "This is project 5", 1, 0),
        createData('Demo Project 6', "This is project 9", 1, 0),
        createData('Demo Project 7', "This is project 7", 1, 0),
        createData('Demo Project 8', "This is project 8", 1, 0),
        createData('Demo Project 9', "This is project 9", 1, 0),
        createData('Demo Project 10', "This is project 9", 1, 0),
        createData('Demo Project 11', "This is project 9", 1, 0),
        createData('Demo Project 12', "This is project 9", 1, 0),
    ];

    
    const HeaderTableCell = styled(TableCell)({
        color: '#ffff',
        height: '50px',
        fontWeight: 'bolder',
        fontSize: '18px',
        fontFamily: 'Nunito',
    })

    const StyledTableCell = styled(TableCell)({
        color: '#012970',
        fontWeight: 'bold',
        fontSize: '14px',
        fontFamily: 'Nunito',
        borderWidth: '2px',
        borderColor: 'black'
    })

  
    const SyleTablePag = styled(TablePagination)({
        backgroundColor: '#ffff',
        fontWeight: 'bold',
        fontFamily: 'Nunito',
        borderWidth: '2px',
        borderColor: 'black'
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    
    return (
        <div>
            <Header openSidebar={toggleSidebar} />
            <Sidebar toggle={sidebar} navCurrent = "Project"/>

            <div className= {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>Projects</h1>
                </div>

                <div className="btn-add">
                    <Button
                        variant="contained"
                        color="success"
                        size="medium">
                        Create new Project
                    </Button>
                </div>

                <TableContainer 
                    component={Paper} 
                    sx ={{
                        backgroundColor: '#ffff', 
                        margin: '10px 10px',
                        borderWidth: '2px',
                        borderColor: 'black',
                    }}>
                    <Table sx={{minWidth: 750}}  aria-label="simple table">
                        <TableHead
                            sx = {{
                            backgroundColor: '#012970',
                            color: '#ffff',
                            borderWidth: '2px',
                            borderColor: 'black'
                            }}>
                            <TableRow>
                                <HeaderTableCell>Project Name</HeaderTableCell>
                                <HeaderTableCell sx = {{paddingRight: '10em'}}>Description</HeaderTableCell>
                                <HeaderTableCell align = "center"># of Tickets</HeaderTableCell>
                                <HeaderTableCell align = "center"># of Users</HeaderTableCell>
                                <HeaderTableCell align = "center" >Actions</HeaderTableCell> 
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow
                                    key={row.name}
                                    >
                                    <StyledTableCell component="th" scope="row" sx={{fontSize: '20px'}}>{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.desc}</StyledTableCell>
                                    <StyledTableCell align = "center">{row.numtickets}</StyledTableCell>
                                    <StyledTableCell align = "center">{row.numusers}</StyledTableCell>
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
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <StyledTableCell />
                                    <StyledTableCell />
                                    <StyledTableCell />
                                    <StyledTableCell />
                                    <StyledTableCell />
                                </TableRow>
                            )}
                        </TableBody>
                        <SyleTablePag  
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[10]}
                            labelRowsPerPage={<span>Rows:</span>}
                        />
                    </Table>             
                </TableContainer>
            
            </div>
        </div>  
    );
}   