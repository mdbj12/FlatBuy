import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Homepage from '../Homepage/Homepage';
import Login from '../LogIn/Login';

// const Navbar = () => {
//     return (
//         <nav>
//             <div className='flex flex-wrap items-center justify-between mx-auto p4'>
//                 <p>NAVBAR WITH LINKS</p>
                
//             </div>
//         </nav>
//     )   
// }

// export default Navbar

const Navbar = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='Log-In' element={<Login />} />
        </Routes>
        </BrowserRouter>
    )
}

export default Navbar