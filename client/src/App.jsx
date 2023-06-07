import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Homepage/Navbar';
import Homepage from './Homepage/Homepage';
import Cart from './Login/Cart';
import Login from './Login/Login';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='Login' element={<Login />} />
        <Route path='Cart' element={<Cart />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App
