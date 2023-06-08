import React, {useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Login from './LogIn/Login';
import Homepage from './Homepage/Homepage';
import Cart from './Cart/Cart';
import SellerStore from './SellPage/SellerStore';

function App() {
  const [userData, setUserData] = useState(null);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionData = urlParams.get('session_data');

    if (sessionData) {
      const userData = JSON.parse(sessionData);
      setUserData(userData);
      setLogin(true);

      // Cache the session data in localStorage
      localStorage.setItem('sessionData', sessionData);
    } else {
      // Check if session data is cached in localStorage
      const cachedSessionData = localStorage.getItem('sessionData');

      if (cachedSessionData) {
        const cachedUserData = JSON.parse(cachedSessionData);
        setUserData(cachedUserData);
        setLogin(true);
      }
    }
  }, []);

  return (
    <BrowserRouter>
    <Navbar stateoflogin={login} userWelcome={userData}/>
    <Routes>
        <Route path='/' element={<Homepage userData={userData} />} />
        <Route path='LogIn' element={<Login/>} />
        <Route path='Cart' element={<Cart userData={userData}/>}/>
        <Route path='Sell Items' element={<SellerStore/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App
