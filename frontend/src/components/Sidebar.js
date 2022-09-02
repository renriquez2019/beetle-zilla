
import {BsColumns, BsFolder, BsFillPersonFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'


export const Sidebar = ({toggle, navCurrent, isAdmin}) => {


    return (
        <div className= {toggle ? "sidebar sidebar--open" : "sidebar"}>
            <ul className='sidebar-nav'>
                
                <li className= "nav-item">
                    <Link to = "/dashboard">
                        <a className={(navCurrent === "Dashboard") ? "nav-link nav-current" : "nav-link"}>
                            <BsColumns className='nav-logo'/>
                            <span>Dashboard</span>
                        </a>
                    </Link>               
                </li>

                <li className='nav-item'>
                    <Link to = "/projects">
                        <a className={(navCurrent === "Project") ? "nav-link nav-current" : "nav-link"}>
                            <BsFolder className='nav-logo'/>
                            <span>My Projects</span>
                        </a>
                    </Link>
                </li>

                <li className='nav-item'>
                    <Link to = "/tickets">
                        <a className={(navCurrent === "Ticket") ? "nav-link nav-current" : "nav-link"}>
                            <BsFolder className='nav-logo'/>
                            <span>My Tickets</span>
                        </a>
                    </Link>  
                </li>

                <li className='nav-item'>
                    <Link to = "/profile">
                        <a className={(navCurrent === "Profile") ? "nav-link nav-current" : "nav-link"}>
                            <BsFillPersonFill className='nav-logo'/>
                            <span>User Profile</span>
                        </a>
                    </Link> 
                </li>

            </ul>
        </div>
    )
}

export default Sidebar