import './App.css';
import Navbar from './Navbar/Navbar';
import Login from './LogIn/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage/Homepage';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='LogIn' element={<Login />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App
