import React, {useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
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
    }
  }, []);

  return (
    <BrowserRouter>
    <Navbar stateoflogin={login} userWelcome={userData}/>
    <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='LogIn' element={<Login/>} />
        <Route path='Cart' element={<Cart userData={userData}/>}/>
        <Route path='Sell Items' element={<SellItems/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App
