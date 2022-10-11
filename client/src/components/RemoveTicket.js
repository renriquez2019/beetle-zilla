import ReactDom from 'react-dom'
import { useState, useEffect } from 'react'
import { getRoleString } from '../functions/HashCodes'
import { Button, Checkbox, IconButton, FormGroup } from '@mui/material'
import {BsX} from 'react-icons/bs'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://beetle-serve.onrender.com/api'
})

export default function RemoveTicket({open, onClose, ticket_id}) {

    const handleSubmit = (e) => {
        e.preventDefault();

        api.delete('/tickets/delete', { data: {
            "ticket_id" : ticket_id
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
                    <h3>Delete Ticket:</h3>
                    <IconButton aria-label="delete" size="large" sx={{color: 'red'}} onClick={onClose}>
                        <BsX />
                    </IconButton>
                </div>

                <h4>Are you sure you want to delete this Ticket?</h4>

                <div className= "profile-edit-footer">
                    <Button 
                        type ="submit"
                        variant= "contained"
                        color="error"
                        onClick={handleSubmit}>
                        Delete
                    </Button>
                </div>
                
            </div>
        </div>,
        document.getElementById('portal')
    )
}