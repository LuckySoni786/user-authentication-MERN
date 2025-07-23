import React, { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import RefreshHandler from './RefreshHandler';
const App = () => {

  const [IsAuthenticate, setIsAuthenticate] = useState(false);

  const PrivateRoute = ({ element }) => {
    console.log(IsAuthenticate);
    return IsAuthenticate ? element : <Navigate to={'/login'} />

  }
  return (
    <>
      <BrowserRouter>
      <RefreshHandler setIsAuthenticate={setIsAuthenticate} />
        <Routes>

          <Route path='/' element={<Navigate to={'/login'} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<PrivateRoute element={<Home/>} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App