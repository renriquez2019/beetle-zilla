
import { Button } from "@mui/material";
import { useState } from "react";
import { BsFillPersonFill } from 'react-icons/bs'



export const Dropdown = ({currentUser}) => {

    const [menu, setMenu] = useState(false);
    const toggleMenu = () => setMenu(!menu)

    return (
        <div className= "drop">
            <Button endIcon={<BsFillPersonFill/>} onClick={toggleMenu}>
                {currentUser}
            </Button>
            <ul className= {menu ? "drop-menu drop-menu--open" : "drop-menu"}>
                <li>Dropdown Content</li>
                <li>Dropdown Content</li>
                <li>Dropdown Content</li>
            </ul>
        </div>
    );
}

Dropdown.defautProps = {
    currentUser: "DEMO"
}

export default Dropdown