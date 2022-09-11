import { useState } from 'react';
import { useNavigate } from 'react-router';
import background from '../img/water.png';
import Title from '../components/Title';
import AlertPopup from '../components/AlertPopup';
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
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
                navigate('/dashboard')
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
            <div className="auth-form-container"  onSubmit={handleSubmit}>
                <Title/>
                <form className="auth-form">
                    <div className="auth-form-content">
                            <div>
                                {alert ? <AlertPopup content={{
                                    message: alertContent.message, error: alertContent.error
                                }}/> : <></> }
                            </div>
                        <h3 className="auth-form-title">Sign Up</h3>
                        <div className="text-center">
                            Already have an account?{" "}
                            <a href="/login"> Sign In</a>
                        </div>
                        <div className="form-group mt-3">
                            <label>Display Name</label>
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
                            <label>Phone Number</label>
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
                        <div className="form-group mt-3">
                            <label>Confirm Password</label>
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
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                            
                            
                        </div>
                    </div>  
                </form> 
            </div> 
        </div>
    );
}