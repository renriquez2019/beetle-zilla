import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material"

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

    return (
        <div>
            <Header openSidebar={toggleSidebar} />
            <Sidebar toggle={sidebar} navCurrent = "Project"/>

            <div className= {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>Projects</h1>
                </div>
                
                <TableContainer component={Paper} sx ={{backgroundColor: '#ffff'}}>
                    <Table sx={{ minWidth: 650}}  aria-label="simple table">
                        <TableHead className="table-head">
                            <TableRow>
                                <TableCell>Project Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell># of Tickets</TableCell>
                                <TableCell># of Users</TableCell> 
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx ={{ '&:last-child td, &:last-child th': {border: 0}}} 
                                >
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell>{row.desc}</TableCell>
                                    <TableCell>{row.numtickets}</TableCell>
                                    <TableCell>{row.numusers}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>
    );
}   