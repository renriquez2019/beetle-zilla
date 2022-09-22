import ReactDom from 'react-dom'
import { useState } from 'react'
import { getRoleString } from '../functions/HashCodes'
import { Button, IconButton } from '@mui/material'
import {BsX} from 'react-icons/bs'
import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default function EditProfile ({open, onClose, user}) {

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [about, setAbout] = useState();

    console.log(name)

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(user.user_id)

        api.put('/users/update', {
            "user_id": user.user_id,
            "display_name": name,
            "phone": phone,
            "about": about
        })
            .then((res) => {
                console.log(res.data);
                window.location.reload(false)
            })
            .catch((err) => {

            })
    }

    if (!open) return null

    return ReactDom.createPortal(
        <>  
            <div className="portal-background"/>
            <div className="profile-edit">

                <div className="profile-edit-header">
                    <h3>Edit Profile</h3>
                    <IconButton aria-label="delete" size="large" sx={{color: 'red'}} onClick={onClose}>
                        <BsX  />
                    </IconButton>
                </div>

                <div className="profile-edit-body">
                    
                    <div className="profile-form">
                        <label>About Me:</label>
                        <input
                            type="text"
                            id="about"
                            name="about"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            placeholder={user.about}
                        />
                    </div>

                    <div className="profile-form">
                        <label>Display Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={user.display_name}
                        />
                    </div>

                    <div className="profile-form">
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={user.phone}
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
        </>,
        document.getElementById('portal')
        
    )
}