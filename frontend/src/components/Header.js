import logo from '../img/bug.png'
import Title from './Title'
import {BsList, BsSearch, BsFillBellFill, BsFillPersonFill} from 'react-icons/bs'
import { TextField, InputAdornment, Button} from '@mui/material'

export const Header = ({openSidebar}) => {

    return (
        <div className="header">
        
            {/* Top-left Logo*/}
            <div className="logo-container">
                <a href="/dashboard">
                    <Title variant= "h4"/>
                </a>
                <BsList
                    className='toggle-sidebar'
                    type='button'
                    onClick={openSidebar}
                />
            </div>


            


            <div className="end-container">
                <Button endIcon={<BsFillBellFill/>}>
                    Notifications
                </Button>

                <Button endIcon={<BsFillPersonFill/>}>
                    User Actions
                </Button>
                    
                
            </div>
        </div>
    )
}

Header.defaultProps = {
    openSidebar: true
}

export default Header