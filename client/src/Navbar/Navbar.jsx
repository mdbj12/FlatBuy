import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <ul className='flex bg-blue-500 h-8'>
            <li className='flex-1'>
                <Link to='/'>HOME</Link>
            </li>
            <li className='flex-1'>
                <Link to='Login'>{false ? "Login" : "SignOut"}</Link>
            </li>
            <li>
                <Link to='Cart'>CART</Link>
            </li>
        </ul>
    )
}

export default Navbar