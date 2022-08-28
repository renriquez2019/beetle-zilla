import { useState } from 'react';
import { useNavigate } from 'react-router';
import background from '../img/space.png';
import Header from '../components/Header';

export default function SignIn() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        navigate('/dashboard');
        
    }

    const myBackground = {
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    }

    return (
        <div style={myBackground}>
            <div className="Auth-form-container" onSubmit={handleSubmit}>
                <Header></Header>
                <form className="Auth-form" >
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Don't have an account?{" "}
                            <a href="/signup"> Sign Up</a>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
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