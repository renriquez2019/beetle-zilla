import { useState } from 'react';
import { useNavigate } from 'react-router';
import background from '../img/space.png';
import Title from '../components/Title';
import AlertPopup from '../components/AlertPopup'
import {Button} from '@mui/material'
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

    

    const myBackground = {
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    }

    return (
        <div style={myBackground}>
            <div className="auth-form-container" onSubmit={handleSubmit}>
                <Title/>
                <form className="auth-form" >
                    <div className="auth-form-content">
                            <div>
                                {alert ? <AlertPopup content={{
                                    message: alertContent.message, error: alertContent.error
                                }}/> : <></> }
                            </div>
                        <h3 className="auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Don't have an account?{" "}
                            <a href="/register"> Sign Up</a>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email Address</label>
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
                        <div className="form-group mt-3">
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
                        <div className="d-grid gap-2 mt-3">
                            <Button 
                                variant="contained"
                                type ="submit">
                                Login
                            </Button>
                        </div>
                        <p className="forgot-password text-center mt-2">
                            Forgot password
                        </p>
                    </div>  
                </form> 
            </div>
        </div>
    );
}