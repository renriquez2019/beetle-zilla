import AlertPopup from '../components/AlertPopup';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Button,
    Paper
} from '@mui/material';

import axios from 'axios'

const api = axios.create({
    baseURL: 'https://beetle-serve.onrender.com/api'
})

export default function Register() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password2: ''
    })
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState({
        message: '',
        error: false
    })

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        setAlert(false);

        api.post('/users/register', {
            "display_name": formData.name,
            "email": formData.email.toLowerCase(),
            "phone": formData.phone,
            "password": formData.password,
            "confirm_password":formData.password2
        })
            .then((res) => {
                setAlertContent({message: "You have registered successfully!", error: false})
                setAlert(true);
                navigate('/login')
            }) 
            .catch((err) => {
                setAlertContent({message: err.request.responseText, error: true});
                setAlert(true);
                console.log(err.request.responseText)
            })       
    }

    return (
        <div className='register'>
            <div className='auth-alert'>
                {alert ? <AlertPopup content={{
                    message: alertContent.message, error: alertContent.error
                }}/> : <></> }
            </div>
            <Box
                component={Paper}
                className = "auth-box"
                sx = {{
                    height: '42rem',
                    width:  '25rem',
                }}
            >
                <h1>Sign Up</h1>
                <div className='text-center'>
                    Already have an account? {" "}
                    <a href="/login"> Sign In</a>
                </div>

                <div className="register-form">
                    <label>Display Name:</label>
                    <input
                        type="text"
                        className="form-control mt-1"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter name"
                    />
                </div>

                <div className="register-form">
                    <label>Email Address:</label>
                    <input
                        type="email"
                        className="form-control mt-1"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />
                </div>

                <div className="register-form">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        className="form-control mt-1"
                        id="phone"
                        name="phone"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="555-555-5555"
                    />
                </div>

                <div className="register-form">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control mt-1"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />
                </div>

                <div className="register-form">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        className="form-control mt-1"
                        id="password2"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        placeholder="Confirm password"
                    />
                </div>

                <div className='register-form'>
                    <Button 
                        variant="contained"
                        onClick={handleSubmit}
                        sx = {{
                            marginLeft: '1rem',
                            width: '20rem',
                            
                        }}
                    >
                        Register
                    </Button>
                </div>
            </Box>
        </div>
    );
}