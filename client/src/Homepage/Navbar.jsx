import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';

const Navbar = ({login, userWelcome}) => {
    return (
        <ul className='flex bg-blue-500 h-8 text-center'>
            <li className='flex-1'>
                <Link to='/'>FLATBUY</Link>
            </li>
            <li className='flex-1'>
                <Link to='Login'>{login ? 'Welcome ' + userWelcome.name : "Login"}</Link>
            </li>
            <li className='flex-1'>
                <Link to='Cart'>CART</Link>
            </li>
        </ul>
    )
}

export default Navbar