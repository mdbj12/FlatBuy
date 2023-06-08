import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Homepage/Navbar';
import Homepage from './Homepage/Homepage';
import Cart from './Login/Cart';
import Login from './Login/Login';
import Sellitems from './Items/SellItem';

function App() {
  const [userData, setUserData] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionData = urlParams.get('session_data');

    if (sessionData){
      const userData = JSON.parse(sessionData);
      setUserData(userData);
      setLogin(true);
    }
  }, []);
  console.log(userData)

  return (
    <BrowserRouter>
    <Navbar login={login} userWelcome={userData} />
    <Routes>
        <Route path='/' element={<Homepage userData={userData} />} />
        <Route path='Login' element={<Login />} />
        <Route path='Cart' element={<Cart userData={userData} />} />
        <Route path='Sell Items' element={<Sellitems />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App
