import ReactDom from 'react-dom'
import { useState, useEffect } from 'react'
import { getRoleString } from '../functions/HashCodes'
import { Button, Checkbox, IconButton, FormGroup } from '@mui/material'
import {BsX} from 'react-icons/bs'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://beetle-serve.onrender.com/api'
})



export default function AssignProject({open, onClose, users, project}) {
    
    const [checked, setChecked] = useState([])
    console.log(project.project_id)

    const handleSubmit = (e) => {
        e.preventDefault();

        checked.map((user) => {

            api.post('/projects/assign', {
                "user_id" : user,
                "project_id" : project.project_id
            })
            .then((res) => {
                window.location.reload(false)
            })
            .catch((err) => {
                console.log(err.request.responseText)
            })
        })
       
    }

    const handleCheck = (e) => {
        var updatedList = [...checked];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value];
        } else {
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedList);
    }

    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className='portal-background'/>
            <div className='profile-edit'>

                <div className='profile-edit-header'>
                    <h3>Assign Users to {project.title}:</h3>
                    <IconButton aria-label="delete" size="large" sx={{color: 'red'}} onClick={onClose}>
                        <BsX />
                    </IconButton>
                </div>
                
                <div className="check-container">
                    {users.map((user) => (
                        <div key={user.user_id}>
                            <input
                                value={user.user_id}
                                type="checkbox"
                                onChange={handleCheck}/>
                            <span 
                                className="not-checked-item">
                                {user.display_name}
                            </span>
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