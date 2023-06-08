import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({stateoflogin, userWelcome}) => {
    return (
        <ul className='flex bg-blue-500 h-16 justify-around items-center'>
            <li className='flex-1'>
                <Link to='/'>HOME</Link>
            </li>
            <li className='flex-1'>
                <Link to='Login'>{stateoflogin ? "Welcome " + userWelcome.name : "Login" }</Link>
            </li>
            <li className='flex-1   '> 
                <Link to='Cart'>CART</Link>
            </li>
            <li className='flex-1'>
                <Link to='Sell Items'>{userWelcome.name}'s' Store</Link>
            </li>
        </ul>
    )
}

export default Navbar