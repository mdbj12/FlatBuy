import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Homepage';
import Cart from './Items/Cart';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='Cart' element={<Cart />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App
