import { useState } from "react";
import { Card } from "react-bootstrap";
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
} from "@mui/material";

import {
    HeaderTableRow, 
    HeaderTableCell, 
    StyledTableCell, 
    StyledTablePag,
} from '../components/TableConsts';

import {styled} from "@mui/system"

export default function Tickets() {

    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);


    function createData(name, desc, project, type, priority, status) {
        return { name, desc, project, type, priority, status};
    }

    const rows = [
        createData('Demo ticket 1', "This is ticket 1", 'Demo project 1','Bug', 'High', 'Open'),
        createData('Demo ticket 2', "This is ticket 2", 'Demo project 2', 'Bug','Medium','Open'),
        createData('Demo ticket 3', "This is ticket 3", 'Demo project 3','Bug', 'Medium','Open'),
        createData('Demo ticket 4', "This is ticket 4", 'Demo project 4','Bug', 'Medium','Open'),
        createData('Demo ticket 5', "This is ticket 5", 'Demo project 5','Bug', 'Medium','Open'),
        createData('Demo ticket 6', "This is ticket 9", 'Demo project 6','Bug', 'Medium','Open'),
        createData('Demo ticket 7', "This is ticket 7", 'Demo project 7','Bug', 'Medium','Open'),
        createData('Demo ticket 8', "This is ticket 8", 'Demo project 8','Bug', 'Medium','Open'),
        createData('Demo ticket 9', "This is ticket 9", 'Demo project 9','Bug', 'Medium','Open'),
        createData('Demo ticket 10', "This is ticket 9", 'Demo project 10','Bug', 'Low','Open'),
        createData('Demo ticket 11', "This is ticket 9", 'Demo project 11','Bug', 'Low','Open'),
        createData('Demo ticket 12', "This is ticket 9", 'Demo project 12','Bug', 'Low','Open'),
    ];

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
            <Header 
                openSidebar={toggleSidebar} />
            <Sidebar
                toggle={sidebar}
                navCurrent = "Ticket"/>

            <div className= {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>Tickets</h1>
                </div> 
                <Table
                    component={Paper} 
                    sx ={{
                        border: 2,
                        maxHeight: 900,
                        minWidth: 750
                    }}>
                    <HeaderTableRow>
                        <TableRow>
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow
                                key={row.name}
                                >
                                <StyledTableCell component="th" scope="row" sx={{fontSize: '20px'}}>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.desc}</StyledTableCell>
                                <StyledTableCell align = "center">{row.project}</StyledTableCell>
                                <StyledTableCell align = "center">{row.type}</StyledTableCell>
                                <StyledTableCell align = "center">{row.priority}</StyledTableCell>
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
                                <StyledTableCell />
                                <StyledTableCell />
                                <StyledTableCell />
                            </TableRow>
                        )}
                    </TableBody>
                    <StyledTablePag  
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10]}
                        labelRowsPerPage={<span>Rows:</span>}
                    />
                </Table>             
            </div>
        </div>
    );
}