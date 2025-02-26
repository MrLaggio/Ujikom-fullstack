import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './page/Home.jsx'
import Navbar from './component/Navbar.jsx'
import Movies from './page/Movies.jsx'
import Login from './page/Login.jsx'
import Register from './page/Register.jsx'
import backgroundImage from './assets/pngtree-film-strp-3d-background-with-roll-projector-picture-image_1979677.jpg'
import ProtectedRoute from './component/ProtectedRoute.jsx'
import ChoseFilm from './page/ChoseFilm.jsx'
import Booking from './page/Booking.jsx'




function App() {

  const [count, setCount] = useState(0)
  
  return (
    <div>
    <Router>
    <Navbar/>
    <Routes>
      <Route path="/FE_YAKA" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }/>
      <Route path="/FE_YAKA/adminmovies" element={
        <ProtectedRoute>
          <Movies/>
        </ProtectedRoute>
      }/>
    
      <Route path="/FE_YAKA/login" element={<Login/>}/>
      <Route path="/FE_YAKA/register" element={<Register/>}/>
      <Route path="/FE_YAKA/choosefilm" element={<ChoseFilm/>}/>
      <Route path="/FE_YAKA/booking/:movieId" element={<Booking />} />
      
      
    </Routes>
    </Router>
    </div>
  )
}

export default App