import AlertPopup from '../components/AlertPopup'
import {
    Box,
    Button,
    Paper,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

        api.post('/users/login', {
            "email": formData.email,
            "password": formData.password

        })
        .then((res) => {
            setAlertContent("Login", false);
            setAlert(true);
            localStorage.setItem('token', res.data.token)
            console.log(res.data.token)

            navigate('/dashboard');
        })
        .catch((err) => {
            setAlertContent({message: err.request.responseText, error: true});
            setAlert(true);
            console.log(err.request.responseText)
        })
    }

    
    return (
        <div className="login" onSubmit={handleSubmit}>
            <div className="auth-alert">
                {alert ? <AlertPopup content={{
                    message: alertContent.message, error: alertContent.error
                }}/> : <></> }
            </div>
            <Box
                component={Paper}
                className = "auth-box"
                sx = {{
                    height: '32rem',
                    width:  '25rem',
                }}
            >
                <h1>Sign In</h1>
                <div className='text-center'>
                    Don't have an account? {" "}
                    <a > Sign Up</a>
                </div>
                
                <div className="login-form">
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

                <div className="login-form">
                    <label>Password</label>
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

                <div className='login-form'>
                    <label>Demo Login:</label>
                    <p>Email: demo.user@gmail.com  
                    <br/> Password: 9E9wd8YNs@l</p>
                </div>

                <div className='login-form'>
                    <Button 
                        variant="contained"
                        onClick={handleSubmit}
                        sx = {{
                            margin: '1rem 1rem',
                            width: '20rem',                    
                        }}>
                        Login
                    </Button>
                </div>
                
            </Box>
        </div>
    );
}