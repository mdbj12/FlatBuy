import React, {useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComplexNavbar from './Navbar/ComplexNavbar';
import Login from './LogIn/Login';
import Homepage from './Homepage/Homepage';
import Cart from './Cart/Cart';
import SellItems from './SellPage/Sellitems';

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

  const handleLogout = () => {
    // Clear the session data from state
    setUserData(null);
    setLogin(false);
    // Remove the session data from localStorage
    localStorage.removeItem('sessionData');
  };

  return (
    <BrowserRouter>
    <ComplexNavbar stateoflogin={login} logout={handleLogout} userWelcome={userData}/>
    <Routes>
        <Route path='/' element={<Homepage userData={userData} />} />
        <Route path='LogIn' element={<Login/>} />
        <Route path='Cart' element={<Cart userData={userData}/>}/>
        <Route path='Sell Items' element={<SellItems/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App
