import { useState } from 'react';
import { useNavigate } from 'react-router';
import background from '../img/space.png';
import Title from '../components/Title';
import {Button} from '@mui/material'

export default function Login() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const handleSubmit = (event) => {
        event.preventDefault();

        navigate('/dashboard');
        
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
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
                                    value={email}
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
                                    value={password}
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
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>  
                </form> 
            </div> 
        </div>
    );
}