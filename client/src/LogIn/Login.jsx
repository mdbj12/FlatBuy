import './Login.css';
import React from "react";
import { Link } from 'react-router-dom';
import NewUser from './NewUser/NewUser';
// import Vendor from './Vendor/Vendor';
// import Consumer from './Consumer/Consumer';

const Login = () => {
    return (
        <>
            <div>
                <NewUser />
            </div>
            <div>
                <p>
                    Already have an account?
                </p>
                <Link to='./Consumer'>Login here!</Link>
                <p>
                    Business Account?
                </p>
                <Link to='./Vendor'>Vendor Login</Link>
            </div>
        </>
    )
}

export default Login