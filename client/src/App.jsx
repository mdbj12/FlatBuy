import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Login from './LogIn/Login';
import Homepage from './Homepage/Homepage';
import Cart from './Cart/Cart';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='LogIn' element={<Login />} />
        <Route path='Cart' element={<Cart />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App
