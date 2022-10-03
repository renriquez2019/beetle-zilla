import ReactDom from 'react-dom'
import { useState, useEffect } from 'react'
import { getRoleString } from '../functions/HashCodes'
import { Button, Checkbox, IconButton, FormGroup } from '@mui/material'
import {BsX} from 'react-icons/bs'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default function AssignUser({open, onClose, users, ticket}) {

    const [checked, setChecked] = useState()

    console.log("help", ticket.user_id)

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // Add/Remove checked item from list
    const handleCheck = (e) => { 
        setChecked(e.target.value);
    };

    useEffect (() => {

        setTimeout(() => {
            users.map((user) => {
                if (ticket.user_id == user.user_id) {
                     setChecked(ticket.user_id)  
                }  
             })
        }, 500)

        
    }, [])

    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className='portal-background'/>
            <div className='profile-edit'>

                <div className='profile-edit-header'>
                    <h3>Assign User to {ticket.title}:</h3>
                    <IconButton aria-label="delete" size="large" sx={{color: 'red'}} onClick={onClose}>
                        <BsX />
                    </IconButton>
                </div>

    
                <div className="check-title">Your CheckList:</div>
                <div className="check-container">
                    {users.map((user) => (
                        <div key={user.user_id}>
                            <input value={user.user_id} type="checkbox" checked={checked == user.user_id ? true : false} onChange={handleCheck} />
                            <span className={checked == user.user_id ? "checked-item" : "not-checked-item"}>{user.display_name}</span>
                        </div>
                    ))}
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