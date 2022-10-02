import ReactDom from 'react-dom'
import { useState } from 'react'
import { getRoleString } from '../functions/HashCodes'
import { Button, Checkbox, IconButton } from '@mui/material'
import {BsX} from 'react-icons/bs'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default function AssignUser({open, onClose, user, tickets}) {

    const [checked, setChecked] = useState(false)

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        

    }

    console.log(tickets.length)

    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className='portal-background'/>
            <div className='profile-edit'>

                <div className='profile-edit-header'>
                    <h3>Assign User to Tickets</h3>
                    <IconButton aria-label="delete" size="large" sx={{color: 'red'}} onClick={onClose}>
                        <BsX />
                    </IconButton>
                </div>

                <div className='profile-edit-body'>

                    <div className="profile-form">
                        <Checkbox name = "here" />
                    </div>
                </div>
                    
                

                <div className= "profile-edit-footer">
                    <Button 
                        type ="submit"
                        variant= "contained"
                        color="success"
                        onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </div>

            </div>
        </>,
        document.getElementById('portal')
    )
}