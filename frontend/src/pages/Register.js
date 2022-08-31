import { useState } from 'react';
import { useNavigate } from 'react-router';
import background from '../img/water.png';
import Title from '../components/Title';


export default function Register() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const handleSubmit = (e) => {
        e.preventDefault();
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
            <div className="auth-form-container"  onSubmit={handleSubmit}>
                <Title/>
                <form className="auth-form">
                    <div className="auth-form-content">
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
                                value={name}
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
                        <div className="form-group mt-3">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                id="password2"
                                name="password2"
                                value={password2}
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