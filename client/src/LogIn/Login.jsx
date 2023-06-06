import React from "react";
import { Link } from 'react-router-dom';
import NewUser from './NewUser/NewUser';
import Vendor from './Vendor/Vendor';
import Consumer from './Consumer/Consumer';

const Login = () => {
    return (
        <>
            <div>
                <NewUser />
            </div>
            <div>
                {/* <button> */}
                <Vendor />
                {/* </button> */}
            </div>
            <div>
                <Consumer />
            </div>
        </>
    )
}

export default Login