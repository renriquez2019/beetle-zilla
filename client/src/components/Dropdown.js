
import { getRoleString } from "../functions/HashCodes";
import { Link } from 'react-router-dom'

import { Button } from "@mui/material";
import { useState } from "react";
import { BsFillPersonFill, BsFillNutFill, BsBoxArrowUp } from 'react-icons/bs'



export const Dropdown = ({userName, userEmail, userRole}) => {

    const [menu, setMenu] = useState(false);

    return (
        <div className= "drop" >
            <Button
                className="drop-btn"
                endIcon={<BsFillPersonFill/>} 
                onMouseEnter={() => setMenu(true)}>
                {userEmail}
            </Button>
            <ul className= {menu ? "drop-menu drop-menu--open" : "drop-menu"} onMouseLeave={() => setMenu(false)}>
                <li className="drop-header">
                    <h6>{userName}</h6>
                    <span>{getRoleString(userRole)}</span>
                </li>
                <hr/>
                <li>
                    <Link to= "/profile" className="drop-link" >
                        <div className="drop-item">
                            <i><BsFillPersonFill/></i>
                            <span>My Profile</span>
                        </div>
                    </Link>
                </li>
                <hr/>
                <li>
                    <Link to= "/profile" className="drop-link" >
                        <div className="drop-item">
                            <i><BsFillNutFill/></i>
                            <span>Roles [to be added]</span>
                        </div>
                    </Link>
                </li>
                <hr/>
                <li>
                    <Link to= "/" className="drop-link" >
                        <div className="drop-item">
                            <i><BsBoxArrowUp/></i>
                            <span>Sign Out</span>
                        </div>
                    </Link>
                </li>
                <hr/>
            </ul>
        </div>
    );
}

Dropdown.defautProps = {
    currentUser: "DEMO"
}

export default Dropdown