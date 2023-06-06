import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <ul className='place-items-center self-center list-none'>
                <li className='flex-1'>
                    <Link to='/'>HOME</Link>
                </li>
                <li className='flex-1'>
                    <Link to='Login'>SIGNUP/LOGIN</Link>
                </li>
                <li>
                    <Link to='Cart'>CART</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar