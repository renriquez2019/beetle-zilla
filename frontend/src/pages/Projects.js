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
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    function createData(name, desc, numtickets, numusers) {
        return { name, desc, numtickets, numusers};
    }

    const rows = [
        createData('Demo Project 1', "This is project 1", 0, 1),
        createData('Demo Project 2', "This is project 2", 1, 0),
        createData('Demo Project 2', "This is project 2", 1, 0),
        createData('Demo Project 2', "This is project 2", 1, 0),
        createData('Demo Project 2', "This is project 2", 1, 0),
        createData('Demo Project 2', "This is project 2", 1, 0),
        createData('Demo Project 2', "This is project 2", 1, 0),
        createData('Demo Project 2', "This is project 2", 1, 0),
        createData('Demo Project 2', "This is project 2", 1, 0),
    ];

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    }
      
    function getComparator(order, orderBy) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
    }
      

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

    const StyledButton = styled(Button)({
        borderRadius: 10,
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Header openSidebar={toggleSidebar} />
            <Sidebar toggle={sidebar} navCurrent = "Project"/>

            <div className= {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>Projects</h1>
                </div>

                <div className="btn-add">
                    <StyledButton
                        variant="contained"
                        color="success"
                        size="medium">
                        Create new Project
                    </StyledButton>
                </div>
                
                <TableContainer 
                    component={Paper} 
                    sx ={{
                        backgroundColor: '#ffff',
                        borderRadius: 10,
                        margin: '10px 10px',
                    }}>
                    <Table sx={{}}  aria-label="simple table">
                        <TableHead
                            sx = {{
                            backgroundColor: '#012970',
                            color: '#ffff',
                            borderWidth: '2px',
                            borderColor: 'black'
                            }}>
                            <TableRow>
                                <HeaderTableCell>Project Name</HeaderTableCell>
                                <HeaderTableCell sx = {{paddingRight: 90}}>Description</HeaderTableCell>
                                <HeaderTableCell align = "center"># of Tickets</HeaderTableCell>
                                <HeaderTableCell align = "center"># of Users</HeaderTableCell>
                                <HeaderTableCell align = "center">Actions</HeaderTableCell> 
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    >
                                    <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.desc}</StyledTableCell>
                                    <StyledTableCell align = "center">{row.numtickets}</StyledTableCell>
                                    <StyledTableCell align = "center">{row.numusers}</StyledTableCell>
                                    <StyledTableCell>
                                        <div className="actions-icon">
                                            <BsFillDashSquareFill className="details"/>
                                            <BsFillTrashFill className="trash"/>
                                        </div>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
}   