import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <ul className='flex bg-blue-500 h-8 text-center'>
            <li className='flex-1'>
                <Link to='/'>HOME</Link>
            </li>
            <li className='flex-1'>
                <Link to='Login'>{true ? "Login":"Logout"}</Link>
            </li>
            <li className='flex-1'>
                <Link to='Cart'>CART</Link>
            </li>
        </ul>
    )
}

export default Navbar