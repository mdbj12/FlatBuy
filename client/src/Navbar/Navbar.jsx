import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/Searchbar';

const Navbar = () => {
    return (
        <div>
            <ul className='place-items-center self-center list-none'>
                <li className='flex-1'>
                    <Link to='/'>HOME</Link>
                </li>
                <li className='flex-1'>
                    <Link to='Login'>LOGIN</Link>
                </li>
            </ul>
            <div>
                <SearchBar />
            </div>
        </div>
    )
}

export default Navbar