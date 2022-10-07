import ReactDom from 'react-dom'
import { useState, useEffect } from 'react'
import { getRoleString } from '../functions/HashCodes'
import { Button, Checkbox, IconButton, FormGroup } from '@mui/material'
import {BsX} from 'react-icons/bs'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default function RemoveUser({open, onClose, user_id, project_id}) {

    console.log(user_id, project_id)

    const handleSubmit = (e) => {
        e.preventDefault();

        api.delete('/projects/remove', { data: {
            "user_id" : user_id,
            "project_id" : project_id
        }})
        .then((res) => {
            window.location.reload(false)
        })
        .catch((err) => {
            console.log(err.request.responseText)
        })
    }

    if (!open) return null

    return ReactDom.createPortal(
        <div>
            <div className='portal-background'/>
            <div className='profile-edit'>

                <div className='profile-edit-header'>
                    <h3>Remove User:</h3>
                    <IconButton aria-label="delete" size="large" sx={{color: 'red'}} onClick={onClose}>
                        <BsX />
                    </IconButton>
                </div>

                <h4>Are you sure you want to remove this user?</h4>

                <div className= "profile-edit-footer">
                    <Button 
                        type ="submit"
                        variant= "contained"
                        color="error"
                        onClick={handleSubmit}>
                        Remove
                    </Button>
                </div>
                
            </div>
        </div>,
        document.getElementById('portal')
    )
}