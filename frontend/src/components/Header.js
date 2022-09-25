import Title from './Title'

import Dropdown from './Dropdown';
import {useState, useEffect } from "react";
import {BsList, BsSearch, BsFillBellFill, BsFillPersonFill} from 'react-icons/bs'
import {Button} from '@mui/material'
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export const Header = ({openSidebar}) => {

    const [currentUser, setCurrentUser] = useState({})

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    useEffect(() => {

        api.get('/users/getloggedin', config).then((res) => {
            console.log(res.data)
            setCurrentUser(res.data)
        })
        .catch((err) => {
            console.log('no user found')
        })

    }, [])

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

                <Dropdown 
                    userName={currentUser.display_name}
                    userEmail={currentUser.email}
                    userRole={currentUser.role}/>

            </div>
        </div>
    )
}

Header.defaultProps = {
    openSidebar: true,
    openDropdown: false
}

export default Header