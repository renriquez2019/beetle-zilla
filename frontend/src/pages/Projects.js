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
    Paper,
    createTheme
} from "@mui/material"

import {fontSize, height, styled} from '@mui/system'

import {Button} from '@mui/material';


export default function Projects() {

    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)


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

    return (
        <div>
            <Header openSidebar={toggleSidebar} />
            <Sidebar toggle={sidebar} navCurrent = "Project"/>

            <div className= {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>Projects</h1>
                </div>
                
                <TableContainer 
                    component={Paper} 
                    sx ={{
                        backgroundColor: '#ffff',
                        borderRadius: 10,
                        margin: '10px 10px',
                    }}>
                    <Table sx={{ minWidth: 650, borderCollapse: 'separate', }}  aria-label="simple table">
                        <TableHead
                            sx = {{
                            backgroundColor: '#012970',
                            color: '#ffff'
                        }}>
                            <TableRow>
                                <HeaderTableCell>Project Name</HeaderTableCell>
                                <HeaderTableCell sx = {{paddingRight: 90}}>Description</HeaderTableCell>
                                <HeaderTableCell align = "center"># of Tickets</HeaderTableCell>
                                <HeaderTableCell align = "center"># of Users</HeaderTableCell>
                                <HeaderTableCell align = "center" sx = {{paddingRight: 5}}>Actions</HeaderTableCell> 
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
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                
                <Button>
                    Add new Project
                </Button>
            </div>
        </div>
    );
}   