import './App.css';
import Navbar from './Navbar/Navbar';
import Homepage from './Homepage/Homepage';

function App() {
  return (
    <div>
      <Navbar />
      <h1>
        <Homepage />
      </h1>
    </div>
  );
}

export default App

// import './App.css';
// import Navbar from './Navbar/Navbar';
// import Homepage from './Homepage/Homepage';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// const App = () => {
//   return (
//     <div>
//       <BrowserRouter>
//       <Navbar/>
//         <Routes>
//           <Route path='/' element={<Homepage/>} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App