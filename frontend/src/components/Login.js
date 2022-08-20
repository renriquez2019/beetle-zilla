import React from 'react';

export const Login = () => {
    return (
        <div className='container'>
            <h1>Welcome</h1>
            <input type='text' value= 'Email'></input>
            <br></br>
            <input type='text'  value= 'Password'></input>
            <br></br>
            <input type='submit' value = 'Submit'></input>
        </div>
    )
};

export default Login;
