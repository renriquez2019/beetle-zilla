import ReactDom from 'react-dom'
import { useState } from 'react'
import {BsX} from 'react-icons/bs'
import { Button, IconButton } from '@mui/material'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://beetle-serve.onrender.com/api'
})

export default function AddTicket({open, onClose, project_id}) {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [priority, setPriority] = useState();
    const [type, setType] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        api.post('/tickets/add', {
            "title" : title,
            "description" : description,
            "type" : type,
            "priority" : priority,
            "project_id" : project_id
        })
        .then((res) => {
            window.location.reload(false);
        })
        .catch((err) => {
            console.log(err.request.responseText)
        })
    }

    console.log(title)
    if (!open) return null;

    return ReactDom.createPortal(
        <div>
            <div className='portal-background'/>
            <div className='profile-edit'>

                <div className='profile-edit-header'>
                    <h3>Add Ticket:</h3>
                    <IconButton aria-label="delete" size="large" sx={{color: 'red'}} onClick={onClose}>
                        <BsX />
                    </IconButton>
                </div>

                <div className= "profile-edit-body">
                    <div className="profile-form">
                        <label>Ticket Name:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder= "Enter name:"
                        />
                    </div>

                    <div className="profile-form">
                        <label>Description:</label>
                        <input
                            type="text"
                            id="desc"
                            name="desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder= "Enter description:"
                        />
                    </div>

                    <div className="profile-form">
                        <label>Type:</label>
                        <select className="type-dropdown" onChange={(e) => setType(e.target.value)}>
                            <option selected></option>
                            <option value = "1">Bug</option>
                            <option value = "2">Issue</option>
                            <option value = "3">Feature</option>
                        </select>
                    </div>

                    <div className= "profile-form">
                        <label>Priority:</label>
                        <select className="priority-dropdown" onChange={(e) => setPriority(e.target.value)}>
                            <option selected></option>
                            <option value = "4">Low</option>
                            <option value = "3">Medium</option>
                            <option value = "2">High</option>
                            <option value = "1">Very High</option>
                        </select>
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
            
        </div>,
        document.getElementById('portal')
    )
}