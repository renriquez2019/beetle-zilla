import {BsColumns, BsFolder, BsFillPersonFill} from 'react-icons/bs'


export const Sidebar = ({toggle, navCurrent, isAdmin}) => {


    return (
        <div className= {toggle ? "sidebar sidebar--open" : "sidebar"}>
            <ul className='sidebar-nav'>
                <li className= "nav-item">
                    <a 
                    className={(navCurrent === "Dashboard") ? "nav-link nav-current" : "nav-link"}
                    href='/dashboard'>
                        <BsColumns className='nav-logo'/>
                        <span>Dashboard</span>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                    className={(navCurrent === "Project") ? "nav-link nav-current" : "nav-link"}
                    href='/projects'>
                        <BsFolder className='nav-logo'/>
                        <span>My Projects</span>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                    className={(navCurrent === "Ticket") ? "nav-link nav-current" : "nav-link"}
                    href='/tickets'>
                        <BsFolder className='nav-logo'/>
                        <span>My Tickets</span>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                    className={(navCurrent === "Profile") ? "nav-link nav-current" : "nav-link"}
                    href='/profile'>
                        <BsFillPersonFill className='nav-logo'/>
                        <span>User Profile</span>
                    </a>
                </li>

            </ul>
        </div>
    )
}

export default Sidebar