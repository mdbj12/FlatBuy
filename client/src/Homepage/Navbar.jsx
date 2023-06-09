import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({stateoflogin, userWelcome , logout}) => {
    console.log(stateoflogin, userWelcome)
    return (
        <ul className="flex bg-blue-500 h-16 justify-around items-center">
          <li className="flex-1">
            <Link to="/">HOME</Link>
          </li>
          <li className="flex-1">
            <Link to="Login">
              {stateoflogin ? (
                <span>
                    Welcome {userWelcome.name}!!
                    <button
                    onClick={logout}
                    className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline flex-1"
                    type="button"
                    >
                    Logout
                    </button>
                </span>
              ) : (
                "Login"
              )}
            </Link>
          </li>
          <li className="flex-1">
            <Link to="Cart">CART</Link>
          </li>
          <li className="flex-1">
            <Link to="Sell Items">SELL ITEMS</Link>
          </li>
        </ul>
      );
    };
    export default Navbar;