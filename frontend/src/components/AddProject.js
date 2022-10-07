import ReactDom from 'react-dom'
import { useState } from 'react'
import {BsX} from 'react-icons/bs'
import { Button, IconButton } from '@mui/material'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default function AddProject({open, onClose}) {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    if (!open) return null

    return ReactDom.createPortal(
        <div>
            <div className='portal-background'/>
            <div className='profile-edit'>

                <div className='profile-edit-header'>
                    <h3>Add Project:</h3>
                    <IconButton aria-label="delete" size="large" sx={{color: 'red'}} onClick={onClose}>
                        <BsX />
                    </IconButton>
                </div>

                <div className='profile-edit-body'>
                    <div className="profile-form">
                        <label>Project Name:</label>
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