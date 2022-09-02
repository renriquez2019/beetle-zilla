import logo from '../img/bug.png'
import {BsList, BsSearch, BsFillBellFill, BsFillPersonFill} from 'react-icons/bs'
import { TextField, InputAdornment, Button} from '@mui/material'

export const Header = ({openSidebar}) => {

    return (
        <div className="header">
        
            {/* Top-left Logo*/}
            <div className="logo-container">
                <a href="/dashboard">
                    <img src={logo} alt="" />
                    <span class="d-none d-lg-block">BugTracker</span>
                </a>
                <BsList
                    className='toggle-sidebar'
                    type='button'
                    onClick={openSidebar}
                />
            </div>


            <div className="search-container">
                <TextField
                    sx= {{'& legend': {display:'none'}, '& fieldset': {top:0}}}
                    label={null}
                    variant='outlined'
                    size='small'
                    InputProps={{endAdornment: <InputAdornment position="end"><BsSearch/></InputAdornment>}}
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